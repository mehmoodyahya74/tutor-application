import { z } from 'zod';
import { insertTutorApplicationSchema, tutorApplications } from './schema.js';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  applications: {
    create: {
      method: 'POST' as const,
      path: '/api/applications' as const,
      input: insertTutorApplicationSchema,
      responses: {
        201: z.custom<typeof tutorApplications.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    // Optional: Admin list view (if needed later)
    list: {
      method: 'GET' as const,
      path: '/api/applications' as const,
      responses: {
        200: z.array(z.custom<typeof tutorApplications.$inferSelect>()),
      },
    },
  },
};
