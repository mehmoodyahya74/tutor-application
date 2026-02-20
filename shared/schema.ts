import { pgTable, text, serial, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tutorApplications = pgTable("tutor_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  city: text("city").notNull(),
  area: text("area").notNull(),
  subjects: text("subjects").array().notNull(),
  teachingMode: text("teaching_mode").notNull(), // 'online', 'physical', 'both'
  qualification: text("qualification").notNull(),
  experienceYears: integer("experience_years").notNull(),
  expectedSalary: text("expected_salary").notNull(),
  cnicFile: text("cnic_file"),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  email: text("email"),
  createdAt: text("created_at").default("NOW()"),
});

export const insertTutorApplicationSchema = createInsertSchema(tutorApplications)
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    email: z.string().email("Invalid email address").optional().or(z.literal('')),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    subjects: z.array(z.string()).min(1, "Select at least one subject"),
    experienceYears: z.number().min(0, "Experience years cannot be negative"),
    teachingMode: z.enum(['online', 'physical', 'both'], {
      errorMap: () => ({ message: "Please select a valid teaching mode" })
    }),
  });

export type TutorApplication = typeof tutorApplications.$inferSelect;
export type InsertTutorApplication = z.infer<typeof insertTutorApplicationSchema>;

// Optional: Add validation for file uploads if needed
export const cnicFileSchema = z.object({
  filename: z.string(),
  path: z.string(),
  size: z.number().max(5 * 1024 * 1024, "File too large (max 5MB)"),
  mimetype: z.string().refine(
    (type) => ['image/jpeg', 'image/png', 'application/pdf'].includes(type),
    "Only JPEG, PNG, or PDF files are allowed"
  ),
});