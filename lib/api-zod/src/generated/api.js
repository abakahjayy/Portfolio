/**
 * API specification schemas.
 * Hand-maintained JS port of the orval-generated zod schemas.
 */
import * as zod from "zod";

/**
 * Returns server health status
 * @summary Health check
 */
export const HealthCheckResponse = zod.object({
  status: zod.string(),
});
