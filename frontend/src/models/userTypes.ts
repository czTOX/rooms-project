import z from "zod";

const UserLoginSchema = z.object({
    hashedPassword: z.string({required_error: 'Missing `password` parameter'}).nonempty(),
    email: z.string({required_error: 'Missing `email` parameter'}).nonempty(),
})

export type UserLogin = z.infer<typeof UserLoginSchema>;