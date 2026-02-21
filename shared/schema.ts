import { pgTable, text, serial, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tutorApplications = pgTable("tutor_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  gender: text("gender").notNull(), 
  city: text("city").notNull(),
  area: text("area").notNull(),
  subjects: text("subjects").array().notNull(),
  teachingMode: text("teaching_mode").notNull(), 
  travelDistance: text("travel_distance"), 
  preferredStudents: text("preferred_students"),
  islamicQualification: text("islamic_qualification").notNull(),
  otherQualification: text("other_qualification"),
  instituteName: text("institute_name"),
  experienceYears: integer("experience_years").notNull(),
  demoClassAvailable: text("demo_class_available").notNull(),
  daysAvailable: text("days_available").array().notNull(),
  // Replaced three boolean fields with one array field
  preferredTimeSlots: text("preferred_time_slots").array().default([]).notNull(),
  ratePerHour: text("rate_per_hour"),
  ratePerMonth: text("rate_per_month"),
  shortBio: text("short_bio").notNull(),
  confirmAccuracy: boolean("confirm_accuracy").default(false).notNull(),
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
    
    // New: Combined time slots as array
    preferredTimeSlots: z.array(z.enum(['Morning', 'Afternoon', 'Evening']))
      .min(1, "Select at least one preferred time slot"),
    
    ratePerHour: z.string().optional(),
    ratePerMonth: z.string().optional(),
    
    shortBio: z.string().min(20, "Please write at least 20 characters").max(500, "Bio too long"),
    
    confirmAccuracy: z.boolean().refine(val => val === true, {
      message: "You must confirm that the information is accurate"
    }),
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
  });

export type TutorApplication = typeof tutorApplications.$inferSelect;
export type InsertTutorApplication = z.infer<typeof insertTutorApplicationSchema>;
