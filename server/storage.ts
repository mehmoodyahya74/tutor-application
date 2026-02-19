import { db } from "./db";
import { tutorApplications, type InsertTutorApplication, type TutorApplication } from "@shared/schema";

export interface IStorage {
  createApplication(app: InsertTutorApplication): Promise<TutorApplication>;
  getApplications(): Promise<TutorApplication[]>;
}

export class DatabaseStorage implements IStorage {
  async createApplication(app: InsertTutorApplication): Promise<TutorApplication> {
    const [newApp] = await db.insert(tutorApplications).values(app).returning();
    return newApp;
  }

  async getApplications(): Promise<TutorApplication[]> {
    return await db.select().from(tutorApplications);
  }
}

export const storage = new DatabaseStorage();
