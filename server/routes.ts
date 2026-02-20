import type { Express } from "express";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export function registerRoutes(app: Express) {
  
  app.post(api.applications.create.path, async (req, res) => {
    try {
      const input = api.applications.create.input.parse(req.body);
      const application = await storage.createApplication(input);
      
      // Log for debugging (in production, you might want to use a proper logging service)
      console.log("New Tutor Application Received:", application.id);

      res.status(201).json(application);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      
      // Handle unexpected errors
      console.error("Application creation error:", err);
      res.status(500).json({ 
        message: "Failed to create application" 
      });
    }
  });

  app.get(api.applications.list.path, async (req, res) => {
    try {
      const applications = await storage.getApplications();
      res.json(applications);
    } catch (err) {
      console.error("Error fetching applications:", err);
      res.status(500).json({ 
        message: "Failed to fetch applications" 
      });
    }
  });

  // No return value needed
}