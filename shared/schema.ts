import { pgTable, text, serial, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tutorApplications = pgTable("tutor_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  gender: text("gender").notNull(), // NEW: Male/Female
  city: text("city").notNull(),
  area: text("area").notNull(),
  subjects: text("subjects").array().notNull(),
  teachingMode: text("teaching_mode").notNull(), // 'online', 'physical', 'both'
  travelDistance: text("travel_distance"), // NEW: Only for physical/both (5 km, 10 km, 20 km)
  preferredStudents: text("preferred_students"), // NEW: 'Male Students', 'Female Students', 'Both'
  islamicQualification: text("islamic_qualification").notNull(), // NEW: Hafiz-e-Quran, Qari, etc.
  otherQualification: text("other_qualification"), // NEW: For "Other" option
  instituteName: text("institute_name"), // NEW: Optional
  experienceYears: integer("experience_years").notNull(),
  demoClassAvailable: text("demo_class_available").notNull(), // NEW: 'yes', 'no', 'uponRequest'
  daysAvailable: text("days_available").array().notNull(), // NEW: Array of weekdays
  preferredTimeMorning: boolean("preferred_time_morning").default(false).notNull(), // NEW
  preferredTimeAfternoon: boolean("preferred_time_afternoon").default(false).notNull(), // NEW
  preferredTimeEvening: boolean("preferred_time_evening").default(false).notNull(), // NEW
  ratePerHour: text("rate_per_hour"), // NEW
  ratePerMonth: text("rate_per_month"), // NEW
  shortBio: text("short_bio").notNull(), // NEW
  confirmAccuracy: boolean("confirm_accuracy").default(false).notNull(), // NEW
  expectedSalary: text("expected_salary").notNull(), // Keeping for backward compatibility
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
    
    // New validations
    gender: z.enum(['male', 'female'], {
      errorMap: () => ({ message: "Please select your gender" })
    }),
    
    teachingMode: z.enum(['online', 'physical', 'both'], {
      errorMap: () => ({ message: "Please select a valid teaching mode" })
    }),
    
    travelDistance: z.string().optional(),
    
    preferredStudents: z.enum(['Male Students', 'Female Students', 'Both']).optional(),
    
    islamicQualification: z.enum([
      'Hafiz-e-Quran',
      'Qari',
      'Alim / Alima',
      'Tajweed Certified',
      'Other'
    ], {
      errorMap: () => ({ message: "Please select your qualification" })
    }),
    
    otherQualification: z.string().optional(),
    
    instituteName: z.string().optional(),
    
    demoClassAvailable: z.enum(['yes', 'no', 'uponRequest'], {
      errorMap: () => ({ message: "Please select demo class availability" })
    }),
    
    daysAvailable: z.array(z.enum([
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ])).min(1, "Select at least one day"),
    
    preferredTimeMorning: z.boolean().default(false),
    preferredTimeAfternoon: z.boolean().default(false),
    preferredTimeEvening: z.boolean().default(false),
    
    ratePerHour: z.string().optional(),
    ratePerMonth: z.string().optional(),
    
    shortBio: z.string().min(20, "Please write at least 20 characters").max(500, "Bio too long"),
    
    confirmAccuracy: z.boolean().refine(val => val === true, {
      message: "You must confirm that the information is accurate"
    }),
    
    expectedSalary: z.string().optional(),
  })
  // Conditional validation: If "Other" qualification is selected, otherQualification is required
  .refine(data => {
    if (data.islamicQualification === 'Other' && !data.otherQualification) {
      return false;
    }
    return true;
  }, {
    message: "Please specify your qualification",
    path: ["otherQualification"]
  })
  // At least one time slot must be selected
  .refine(data => {
    return data.preferredTimeMorning || data.preferredTimeAfternoon || data.preferredTimeEvening;
  }, {
    message: "Select at least one preferred time slot",
    path: ["preferredTimeMorning"]
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
