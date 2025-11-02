import z from "zod";

// cpnst emailSchema = z
export const signUpSchema = z.object({
    name: z.string().min(2, ""),
})