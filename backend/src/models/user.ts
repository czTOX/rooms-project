import z from "zod";

export const UserLoginSchema = z.object({
    hashedPassword: z.string({required_error: 'Missing `password` parameter'}).nonempty(),
    email: z.string({required_error: 'Missing `email` parameter'}).nonempty(),
})

export const UserRegisterSchema = z.object({
    firstName: z.string({ required_error: 'Missing `firstName` parameter'}).nonempty(),
    lastName: z.string({ required_error: 'Missing `lastName` parameter'}).nonempty(),
    phoneNumber: z.string({required_error: 'Missing `phoneNumber` parameter'}).nonempty(),
}).merge(UserLoginSchema);

export const UserSchema = z.object({
    id: z.string().nonempty()
}).merge(UserRegisterSchema);

export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type User = z.infer<typeof UserSchema>;