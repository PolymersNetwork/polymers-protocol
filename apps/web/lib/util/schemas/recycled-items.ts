import { z } from "zod";

/**
 * Enum of supported recycled material types.
 */
export const MaterialType = z.enum([
  "PET",
  "HDPE",
  "PVC",
  "LDPE",
  "PP",
  "PS",
  "E-WASTE",
  "METAL",
  "GLASS",
]);

/**
 * Schema for Solana transaction details
 */
export const SolanaTransactionSchema = z.object({
  txSignature: z.string(),
  walletAddress: z.string(),
  timestamp: z.string().datetime(),
  tokenMint: z.string(),
  amount: z.number().nonnegative(),
  status: z.enum(["pending", "confirmed", "failed"]),
});

/**
 * Schema for reward token info
 */
export const RewardTokenSchema = z.object({
  tokenMint: z.string(),
  amount: z.number().nonnegative(),
  issuedAt: z.string().datetime(),
});

/**
 * Schema for predictive analytics
 */
export const PredictiveAnalyticsSchema = z.object({
  predictedContaminationLevel: z.number().min(0).max(100).optional(),
  predictedRecyclingValueUSD: z.number().nonnegative().optional(),
  predictedCollectionDate: z.string().datetime().optional(),
});

/**
 * Schema for a single IoT sensor reading
 */
export const IoTSensorReadingSchema = z.object({
  fillLevelPercent: z.number().min(0).max(100),
  temperatureC: z.number().optional(),
  weightKg: z.number().nonnegative(),
  contaminationScore: z.number().min(0).max(100),
  timestamp: z.string().datetime(),           // Timestamp of the reading
  alerts: z.array(z.string()).optional(),
});

/**
 * Schema for nested IoT sensor telemetry
 */
export const IoTSensorDataSchema = z.object({
  latest: IoTSensorReadingSchema,             // Latest sensor snapshot
  history: z.array(IoTSensorReadingSchema).optional(), // Historical readings
});

/**
 * Schema for automated analytics derived from IoT history
 */
export const IoTAnalyticsSchema = z.object({
  avgFillLevelPercent: z.number().min(0).max(100).optional(),
  avgContaminationScore: z.number().min(0).max(100).optional(),
  maxFillLevelPercent: z.number().min(0).max(100).optional(),
  minFillLevelPercent: z.number().min(0).max(100).optional(),
  contaminationTrend: z.enum(["increasing", "decreasing", "stable"]).optional(),
  predictedNextCollectionAt: z.string().datetime().optional(),
});

/**
 * Main schema for a single recycled item
 */
export const RecycledItemSchema = z.object({
  id: z.string().uuid(),
  batchId: z.string(),
  materialType: MaterialType,
  weightKg: z.number().positive(),
  contaminationLevel: z.number().min(0).max(100),
  recycledAt: z.string().datetime(),
  smartBinId: z.string().optional(),
  nftMintAddress: z.string().optional(),
  esgImpactScore: z.number().min(0).max(100).optional(),

  iotSensorData: IoTSensorDataSchema.optional(),
  iotAnalytics: IoTAnalyticsSchema.optional(),      // NEW: precomputed analytics

  solanaTransaction: SolanaTransactionSchema.optional(),
  rewardTokens: z.array(RewardTokenSchema).optional(),
  predictiveAnalytics: PredictiveAnalyticsSchema.optional(),
});

/**
 * TypeScript types inferred from Zod schemas
 */
export type RecycledItem = z.infer<typeof RecycledItemSchema>;
export const RecycledItemsArraySchema = z.array(RecycledItemSchema);
export type RecycledItemsArray = z.infer<typeof RecycledItemsArraySchema>;
