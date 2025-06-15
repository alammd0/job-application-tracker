import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createJobSchema: z.ZodObject<{
    company: z.ZodString;
    role: z.ZodString;
    status: z.ZodEnum<["Applied", "Interview", "Offer", "Rejected", "Accepted"]>;
    notes: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "Applied" | "Interview" | "Offer" | "Rejected" | "Accepted";
    company: string;
    role: string;
    notes: string;
}, {
    status: "Applied" | "Interview" | "Offer" | "Rejected" | "Accepted";
    company: string;
    role: string;
    notes: string;
}>;
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateJobInput = z.infer<typeof createJobSchema>;
