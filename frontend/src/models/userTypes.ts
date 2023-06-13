import z from "zod";

const UserLoginSchema = z.object({
    hashedPassword: z.string({required_error: 'Missing `password` parameter'}).nonempty(),
    email: z.string({required_error: 'Missing `email` parameter'}).nonempty(),
})

const UserRegistraionFormSchema = z.object({
    firstName: z.string({ required_error: 'Missing `firstName` parameter'}).nonempty(),
    lastName: z.string({ required_error: 'Missing `lastName` parameter'}).nonempty(),
    phoneNumber: z.string({required_error: 'Missing `phoneNumber` parameter'}).nonempty(),
    email: z.string({required_error: 'Missing `email` parameter'}).nonempty(),
    password: z.string({required_error: 'Missing `password` parameter'}).nonempty(),
    passwordAgain: z.string({required_error: 'Missing `passwordAgain` parameter'}).nonempty(),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserRegistraionForm = z.infer<typeof UserRegistraionFormSchema>;