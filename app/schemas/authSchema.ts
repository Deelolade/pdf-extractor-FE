import z from "zod";

const emailSchema = z.string().email("Enter a valid email address");
const passwordSchema = z.string().min(8, "Your password is too short").max(32, "Your password is too long");


export const signUpSchema = z.object({
    name: z.string().min(2, "your name must be at least 2 characters long"),
    email: emailSchema,
    password:passwordSchema,
    confirmPassword: z.string(),
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})
export const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

export type signInFormType = z.infer<typeof signInSchema>;
export type signUpFormType = z.infer<typeof signUpSchema>;