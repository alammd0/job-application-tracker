"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
// signup input
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4).max(10),
});
// login input
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
// job details
exports.createJobSchema = zod_1.z.object({
    company: zod_1.z.string(),
    role: zod_1.z.string(),
    status: zod_1.z.enum(["Applied", "Interview", "Offer", "Rejected", "Accepted"]),
    // appliedDate: z.string(),
    notes: zod_1.z.string()
});
