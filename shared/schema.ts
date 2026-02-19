import { pgTable, text, serial, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tutorApplications = pgTable("tutor_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  city: text("city").notNull(),
  area: text("area").notNull(),
  subjects: text("subjects").array().notNull(), // stored as array of strings
  teachingMode: text("teaching_mode").notNull(), // 'online', 'physical', 'both'
  qualification: text("qualification").notNull(),
  experienceYears: integer("experience_years").notNull(),
  expectedSalary: text("expected_salary").notNull(),
  cnicFile: text("cnic_file"), // Optional file path/url
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  email: text("email"),
  createdAt: text("created_at").default("NOW()"),
});

export const insertTutorApplicationSchema = createInsertSchema(tutorApplications).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email().optional().or(z.literal('')),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  experienceYears: z.number().min(0),
});

export type TutorApplication = typeof tutorApplications.$inferSelect;
export type InsertTutorApplication = z.infer<typeof insertTutorApplicationSchema>;
