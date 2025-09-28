import { Connection, PublicKey, Keypair, Transaction, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { Program, AnchorProvider, Wallet, web3 } from '@coral-xyz/anchor';
import BN from 'bn.js';

// Environment variables
const STAKING_PROGRAM_ID = process.env.STAKING_PROGRAM_ID || '';
const ESG_PROGRAM_ID = process.env.ESG_PROGRAM_ID || '';
const NFT_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

/** Interfaces for program accounts */
interface StakingAccount {
  owner: PublicKey;
  nftMint: PublicKey;
  stakedAt: BN;
  esgPoints: BN;
  lastClaimed: BN;
}

interface ESGAccount {
  owner: PublicKey;
  points: BN;
  carbonOffset: BN;
  lastUpdated: BN;
}

export class PolymersSolanaClient {
  private connection: Connection;
  private provider: AnchorProvider;
  private stakingProgram: Program;
  private esgProgram: Program | null;
  private metaplex: Metaplex;

  constructor(wallet: Keypair, rpcUrl?: string) {
    this.connection = new Connection(rpcUrl || process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
    this.provider = new AnchorProvider(this.connection, new Wallet(wallet), { commitment: 'confirmed' });

    // Anchor programs
    this.stakingProgram = new Program(require('../idl/staking.json'), new PublicKey(STAKING_PROGRAM_ID), this.provider);
    this.esgProgram = ESG_PROGRAM_ID
      ? new Program(require('../idl/esg.json'), new PublicKey(ESG_PROGRAM_ID), this.provider)
      : null;

    // Metaplex client
    this.metaplex = Metaplex.make(this.connection).use(keypairIdentity(wallet));
  }

  /** Helper: derive PDA for staking account */
  private async getStakingPDA(user: PublicKey, nftMint: PublicKey) {
    return PublicKey.findProgramAddress(
      [Buffer.from('staking'), nftMint.toBuffer(), user.toBuffer()],
      new PublicKey(STAKING_PROGRAM_ID)
    );
  }

  /** Helper: derive PDA for ESG account */
  private async getESGPDA(user: PublicKey) {
    return PublicKey.findProgramAddress([Buffer.from('esg'), user.toBuffer()], new PublicKey(ESG_PROGRAM_ID));
  }

  /** Helper: send and confirm transaction */
  private async sendTransaction(transaction: Transaction, signers: Keypair[]): Promise<string> {
    const signature = await this.connection.sendTransaction(transaction, signers);
    await this.connection.confirmTransaction(signature, 'confirmed');
    return signature;
  }

  /** Fetch NFT Twins for a user */
  async getNFTTwins(owner: PublicKey) {
    const nfts = await this.metaplex.nfts().findAllByOwner({ owner });
    return nfts.filter(
      nft => nft.collection?.address.toString() === process.env.NFT_TWIN_COLLECTION_ADDRESS
    );
  }

  /** Stake an NFT Twin */
  async stakeNFT(user: Keypair, nftMint: PublicKey): Promise<string> {
    const [stakingPDA] = await this.getStakingPDA(user.publicKey, nftMint);
    const instruction = this.stakingProgram.instruction.stakeNft({
      accounts: {
        stakingAccount: stakingPDA,
        nftMint,
        user: user.publicKey,
        tokenProgram: new PublicKey(TOKEN_PROGRAM_ID),
        systemProgram: SystemProgram.programId,
      },
      signers: [user],
    });

    return this.sendTransaction(new Transaction().add(instruction), [user]);
  }

  /** Claim rewards for a staked NFT */
  async claimRewards(user: Keypair, nftMint: PublicKey): Promise<{ signature: string; rewards: BN }> {
    const [stakingPDA] = await this.getStakingPDA(user.publicKey, nftMint);
    const account: StakingAccount = await this.stakingProgram.account.stakingAccount.fetch(stakingPDA);

    const durationDaysBN = new BN(Math.floor((Date.now() / 1000 - account.stakedAt.toNumber()) / (24 * 60 * 60)));
    const baseRewardBN = durationDaysBN.mul(new BN(10));
    const esgRewardBN = account.esgPoints.div(new BN(100)).mul(new BN(5));
    const totalRewardBN = baseRewardBN.add(esgRewardBN);

    const instruction = this.stakingProgram.instruction.claimRewards(totalRewardBN, {
      accounts: {
        stakingAccount: stakingPDA,
        user: user.publicKey,
        tokenProgram: new PublicKey(TOKEN_PROGRAM_ID),
      },
      signers: [user],
    });

    const signature = await this.sendTransaction(new Transaction().add(instruction), [user]);
    return { signature, rewards: totalRewardBN };
  }

  /** Unstake an NFT Twin */
  async unstakeNFT(user: Keypair, nftMint: PublicKey): Promise<string> {
    const [stakingPDA] = await this.getStakingPDA(user.publicKey, nftMint);
    const instruction = this.stakingProgram.instruction.unstakeNft({
      accounts: {
        stakingAccount: stakingPDA,
        nftMint,
        user: user.publicKey,
        tokenProgram: new PublicKey(TOKEN_PROGRAM_ID),
        systemProgram: SystemProgram.programId,
      },
      signers: [user],
    });

    return this.sendTransaction(new Transaction().add(instruction), [user]);
  }

  /** Log ESG data to on-chain ESG program (optional) */
  async logESGData(user: Keypair, carbonOffset: number, esgPoints: number): Promise<string | null> {
    if (!this.esgProgram) return null;

    const [esgPDA] = await this.getESGPDA(user.publicKey);
    const account = await this.esgProgram.account.esgAccount.fetchNullable(esgPDA);

    let instruction: TransactionInstruction;

    if (!account) {
      instruction = this.esgProgram.instruction.initializeEsg({
        accounts: {
          esgAccount: esgPDA,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [user],
      });
    } else {
      instruction = this.esgProgram.instruction.updateEsg(new BN(esgPoints), new BN(Math.floor(carbonOffset * 1_000_000)), {
        accounts: {
          esgAccount: esgPDA,
          user: user.publicKey,
        },
        signers: [user],
      });
    }

    return this.sendTransaction(new Transaction().add(instruction), [user]);
  }

  /** Fetch staking account */
  async getStakingAccount(user: PublicKey, nftMint: PublicKey): Promise<StakingAccount | null> {
    try {
      const [stakingPDA] = await this.getStakingPDA(user, nftMint);
      return await this.stakingProgram.account.stakingAccount.fetchNullable(stakingPDA);
    } catch {
      return null;
    }
  }

  /** Fetch ESG account */
  async getESGAccount(user: PublicKey): Promise<ESGAccount | null> {
    if (!this.esgProgram) return null;

    try {
      const [esgPDA] = await this.getESGPDA(user);
      return await this.esgProgram.account.esgAccount.fetchNullable(esgPDA);
    } catch {
      return null;
    }
  }
}

export default PolymersSolanaClient;
