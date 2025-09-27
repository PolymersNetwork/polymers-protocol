// lib/util/iot-analytics.ts

import { IoTSensorReadingSchema, IoTAnalyticsSchema } from "./schemas/recycled-items";
import { z } from "zod";

/**
 * Compute average of a numeric array safely
 */
const average = (arr: number[]): number | undefined => {
  if (!arr || arr.length === 0) return undefined;
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
};

/**
 * Determine trend for contamination: increasing, decreasing, stable
 */
const determineTrend = (arr: number[]): "increasing" | "decreasing" | "stable" | undefined => {
  if (!arr || arr.length < 2) return undefined;
  const first = arr[0];
  const last = arr[arr.length - 1];
  if (last > first) return "increasing";
  if (last < first) return "decreasing";
  return "stable";
};

/**
 * Compute IoT analytics from history array
 */
export const computeIoTAnalytics = (history: z.infer<typeof IoTSensorReadingSchema>[]): z.infer<typeof IoTAnalyticsSchema> => {
  if (!history || history.length === 0) return {};

  const fillLevels = history.map(r => r.fillLevelPercent);
  const contaminationScores = history.map(r => r.contaminationScore);

  const avgFillLevelPercent = average(fillLevels);
  const avgContaminationScore = average(contaminationScores);
  const maxFillLevelPercent = Math.max(...fillLevels);
  const minFillLevelPercent = Math.min(...fillLevels);
  const contaminationTrend = determineTrend(contaminationScores);

  // Predict next collection based on fill level threshold (example: 80%)
  const latestReading = history[history.length - 1];
  let predictedNextCollectionAt: string | undefined;
  if (avgFillLevelPercent !== undefined && latestReading) {
    const fillRemaining = 80 - latestReading.fillLevelPercent; // target threshold 80%
    if (fillRemaining > 0) {
      const avgIncreasePerReading = fillLevels.length > 1
        ? (fillLevels[fillLevels.length - 1] - fillLevels[0]) / (history.length - 1)
        : 0.5; // fallback rate
      const readingsNeeded = avgIncreasePerReading > 0 ? fillRemaining / avgIncreasePerReading : undefined;
      if (readingsNeeded !== undefined) {
        // Assuming readings are evenly spaced in time
        const lastTimestamp = new Date(latestReading.timestamp).getTime();
        const avgTimeBetweenReadings = history.length > 1
          ? (new Date(history[history.length - 1].timestamp).getTime() - new Date(history[0].timestamp).getTime()) / (history.length - 1)
          : 3600000; // default 1 hour
        predictedNextCollectionAt = new Date(lastTimestamp + readingsNeeded * avgTimeBetweenReadings).toISOString();
      }
    }
  }

  return {
    avgFillLevelPercent,
    avgContaminationScore,
    maxFillLevelPercent,
    minFillLevelPercent,
    contaminationTrend,
    predictedNextCollectionAt,
  };
};

/**
 * Update recycled item IoT data with new reading
 */
export const addIoTReading = (
  recycledItem: any,
  newReading: z.infer<typeof IoTSensorReadingSchema>
) => {
  if (!recycledItem.iotSensorData) {
    recycledItem.iotSensorData = { latest: newReading, history: [newReading] };
  } else {
    recycledItem.iotSensorData.latest = newReading;
    recycledItem.iotSensorData.history = recycledItem.iotSensorData.history || [];
    recycledItem.iotSensorData.history.push(newReading);
  }

  // Recompute analytics
  recycledItem.iotAnalytics = computeIoTAnalytics(recycledItem.iotSensorData.history);
};
