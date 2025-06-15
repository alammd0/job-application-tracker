import { z } from "zod";

// signup input
export const signupSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(4).max(10),
});

// login input
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// job details
export const createJobSchema = z.object({
  company: z.string(),
  role: z.string(),
  status: z.enum(["Applied", "Interview", "Offer", "Rejected", "Accepted"]),
  // appliedDate: z.string(),
  notes : z.string()
});


// exports all schema 
export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema> 
export type  CreateJobInput = z.infer<typeof createJobSchema>