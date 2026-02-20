import { db } from "./db.js";
import { eq, desc } from "drizzle-orm";
import { tutorApplications, type InsertTutorApplication, type TutorApplication } from "shared/schema.js";

export interface IStorage {
  createApplication(app: InsertTutorApplication): Promise<TutorApplication>;
  getApplications(): Promise<TutorApplication[]>;
  getApplication(id: number): Promise<TutorApplication | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createApplication(app: InsertTutorApplication): Promise<TutorApplication> {
    try {
      const [newApp] = await db
        .insert(tutorApplications)
        .values(app)
        .returning();
      return newApp;
    } catch (error) {
      console.error("Error creating application:", error);
      throw new Error("Failed to create application in database");
    }
  }

  async getApplications(): Promise<TutorApplication[]> {
    try {
      return await db
        .select()
        .from(tutorApplications)
        .orderBy(desc(tutorApplications.createdAt));
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw new Error("Failed to fetch applications from database");
    }
  }

  async getApplication(id: number): Promise<TutorApplication | undefined> {
    try {
      const [application] = await db
        .select()
        .from(tutorApplications)
        .where(eq(tutorApplications.id, id));
      return application;
    } catch (error) {
      console.error(`Error fetching application ${id}:`, error);
      throw new Error("Failed to fetch application from database");
    }
  }
}

export const storage = new DatabaseStorage();
