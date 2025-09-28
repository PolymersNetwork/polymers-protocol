import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
  NftWithToken,
} from '@metaplex-foundation/js';
import fs from 'fs';
import path from 'path';

// Environment setup
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';

/** Initialize Metaplex instance */
export function initMetaplex(wallet: Keypair): Metaplex {
  const connection = new Connection(SOLANA_RPC_URL, 'confirmed');
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(
      bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: SOLANA_RPC_URL,
        timeout: 60000,
      })
    );
  return metaplex;
}

/** Mint a new NFT */
export async function mintNFT(
  wallet: Keypair,
  name: string,
  symbol: string,
  uri: string,
  sellerFeeBasisPoints: number = 500
): Promise<NftWithToken> {
  const metaplex = initMetaplex(wallet);
  const { nft } = await metaplex.nfts().create({
    uri,
    name,
    symbol,
    sellerFeeBasisPoints,
    maxSupply: 1,
  });
  return nft;
}

/** Upload a local file to Arweave via Bundlr (returns URI) */
export async function uploadFile(wallet: Keypair, filePath: string): Promise<string> {
  const metaplex = initMetaplex(wallet);
  const data = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const metaplexFile = toMetaplexFile(data, fileName);
  const uri = await metaplex.storage().upload(metaplexFile);
  return uri;
}

/** Fetch NFT metadata by mint address */
export async function getNFTMetadata(mintAddress: PublicKey): Promise<any> {
  const connection = new Connection(SOLANA_RPC_URL, 'confirmed');
  const metaplex = Metaplex.make(connection);
  const nft = await metaplex.nfts().findByMint({ mintAddress });
  return nft;
}

/** Find all NFTs owned by a wallet */
export async function findNFTsByOwner(owner: PublicKey): Promise<NftWithToken[]> {
  const connection = new Connection(SOLANA_RPC_URL, 'confirmed');
  const metaplex = Metaplex.make(connection);
  const nfts = await metaplex.nfts().findAllByOwner({ owner });
  return nfts;
}
