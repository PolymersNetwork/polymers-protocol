## Troubleshooting and Best Practices

This section addresses common issues in the Helium, Hivemapper, and Polymers integration, with a focus on local simulation, Hivemapper edge cases, and OTA rollback testing to ensure a robust development and deployment experience.

### Common Issues and Fixes

1. **Solana RPC Latency**:
   - **Symptom**: Slow or failed transactions in `/api/iot/smartbins.ts` or `/api/wallet/swap.ts`.
   - **Fix**: Use a premium RPC provider like [Helius.dev](https://helius.dev) for stable devnet access. Alternatively, run a local validator:
     ```bash
     solana-test-validator --rpc-port 8899
     ```
   - **Tip**: Set `maxRetries: 3` in `connection.sendTransaction` to handle transient failures.

2. **Hivemapper API Errors**:
   - **401 Unauthorized**: Regenerate API key in [Map Data Console](https://hivemapper.com/map-data-console).
   - **429 Rate Limit Exceeded**: Implement exponential backoff:
     ```typescript
     import { setTimeout } from 'timers/promises';
     async function retryHivemapper(fn: () => Promise<any>, retries = 3) {
       for (let i = 0; i < retries; i++) {
         try {
           return await fn();
         } catch (e) {
           if (e.message.includes('429')) await setTimeout(1000 * Math.pow(2, i));
           else throw e;
         }
       }
       throw new Error('Max retries exceeded');
     }
     ```
   - **No Coverage**: Fallback to Helium-only validation and log to Supabase:
     ```typescript
     await supabase.from('validation_logs').insert({ binId, status: 'no_coverage' });
     ```

3. **Supabase Query Failures**:
   - **Symptom**: Errors in `/api/iot/smartbins.ts` or `/lib/lstm_model.ts` due to query limits or timeouts.
   - **Fix**: Check Supabase connection limits and increase timeouts:
     ```typescript
     const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
       db: { queryTimeout: 10000 },
     });
     ```
   - **Tip**: Shard telemetry data for large datasets using TimescaleDB or Supabase partitioning.

4. **Hivemapper Simulation Edge Cases**:
   - **No Recent Device Update**: Mock `/scripts/simulate_hivemapper.ts` to test stale updates:
     ```typescript
     import { hivemapperClient } from '../lib/hivemapper';
     async function simulateHivemapperEdgeCases() {
       const mock = require('msw').setupServer({
         '/devices/hm_bin_test': { lastUpdate: '2023-01-01T00:00:00Z' }, // Stale
       });
       const isValid = await hivemapperClient.get('/devices/hm_bin_test').catch(() => false);
       console.log('Stale update test:', !isValid);
     }
     ```
   - **Low Coverage**: Simulate low coverage areas (e.g., rural):
     ```typescript
     const mock = require('msw').setupServer({
       '/coverage': { coverage: 0.1 },
     });
     ```
   - **Fix**: Log edge cases to Supabase and fallback to Helium telemetry:
     ```typescript
     await supabase.from('validation_logs').insert({ binId, status: 'low_coverage_simulation' });
     ```

5. **OTA Rollback Failures**:
   - **Symptom**: Rollback in `/scripts/ota_utils.ts` fails due to network issues or invalid firmware.
   - **Fix**: Test rollback locally with a mock firmware file:
     ```typescript
     async function testOTARollback(binId: string) {
       const result = await sendOTAUpdate(binId, './firmware/test.bin');
       if (!result.success) await rollbackFirmware(binId);
       await supabase.from('ota_logs').insert({ binId, status: result.success ? 'success' : 'rollback' });
       console.log('OTA rollback test:', result);
     }
     ```
   - **Tip**: Simulate failed telemetry or Hivemapper validation post-OTA:
     ```typescript
     const mockTelemetry = { fill: -1, weight: -1 }; // Invalid
     await supabase.from('telemetry').insert({ binId, ...mockTelemetry });
     ```

6. **LSTM Prediction Errors**:
   - **Symptom**: `/scripts/test_lstm.ts` fails due to insufficient data or ML service errors.
   - **Fix**: Ensure `/scripts/sample_data/sample_telemetry.json` has at least 100 records. Mock ML service responses:
     ```typescript
     const mock = require('msw').setupServer({
       'https://ml-service/predict': { prediction: { fill: 0.75 } },
     });
     ```

### Best Practices

- **Security**:
  - Store `.env` in a secrets manager (e.g., Doppler).
  - Validate hotspot and Hivemapper device IDs:
    ```typescript
    const isValidHotspot = await helium.hotspots.isValid(process.env.HELIUM_HOTSPOT_ADDRESS);
    ```
  - Rate-limit APIs:
    ```typescript
    import rateLimit from 'express-rate-limit';
    app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
    ```

- **Scalability**:
  - Shard telemetry data for large fleets.
  - Cache Hivemapper coverage and LSTM preprocessed data in Supabase:
    ```typescript
    const cacheKey = `coverage_${binId}`;
    await supabase.from('cache').upsert({ key: cacheKey, value: coverage });
    ```

- **Monitoring**:
  - Use Solana Explorer for transaction debugging.
  - Log Hivemapper and OTA events to Supabase for audit trails.
  - Monitor Data Credits (~$0.00001 per 24KB) and HONEY credits.

- **CI Integration**:
  - Add simulation scripts to CI pipeline (e.g., GitHub Actions):
    ```yaml
    jobs:
      test:
        runs-on: ubuntu-latest
        steps:
          - run: npm run simulate:iot
          - run: npm run simulate:hivemapper
          - run: npm run simulate:rewards
          - run: npm run test:lstm
          - run: npm run ota:deploy --bin test_bin --file ./firmware/test.bin
    ```
