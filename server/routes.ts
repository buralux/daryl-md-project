import type { Express } from "express";
import { createServer, type Server } from "http";
import { contactFormSchema } from "@shared/schema";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.post("/api/contact", (req, res) => {
    const validationResult = contactFormSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      });
    }

    console.log("Contact form submission:", validationResult.data);

    res.json({ success: true, message: "Message received" });
  });

  return httpServer;
}
