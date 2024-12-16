// JobFormSchema.ts
import { z } from "zod";

export const JobFormSchema = z.object({
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  jobTags: z.string().min(1, { message: "Job tags are required" }),
  jobType: z.enum(["Full Time", "Part Time", "Internship", "Freelance"]),
  experience: z.number().min(0, { message: "Experience is required" }),
  minimumSalary: z.number().min(0, { message: "Minimum salary is required" }),
  maximumSalary: z.number().min(0, { message: "Maximum salary is required" }),
  region: z.enum(["New York", "London", "Los Angeles"]),
  location: z.string().min(1, { message: "Location is required" }),
});

export type JobFormValues = z.infer<typeof JobFormSchema>;
