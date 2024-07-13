import { z } from 'zod';

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(100, { message: 'Name must be at most 100 characters long' }),
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters long' })
      .max(500, { message: 'Description must be at most 500 characters long' }),
    pricePerHour: z
      .number()
      .min(0, { message: 'Price per hour must be a positive number' }),
    location: z
      .string()
      .min(5, { message: 'Location must be at least 5 characters long' })
      .max(200, { message: 'Location must be at most 200 characters long' }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

// update schema
const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(100, { message: 'Name must be at most 100 characters long' })
      .optional(),
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters long' })
      .max(500, { message: 'Description must be at most 500 characters long' })
      .optional(),
    pricePerHour: z
      .number()
      .min(0, { message: 'Price per hour must be a positive number' })
      .optional(),
    location: z
      .string()
      .min(5, { message: 'Location must be at least 5 characters long' })
      .max(200, { message: 'Location must be at most 200 characters long' })
      .optional(),
  }),
});

export const FacilityValidations = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
};
