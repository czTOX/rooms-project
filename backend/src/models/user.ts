import z from "zod";

export const UserLoginSchema = z.object({
    hashedPassword: z.string(),
    email: z.string().nonempty("asd5"),
})

export const UserRegisterSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
}).merge(UserLoginSchema);

export const UserSchema = z.object({
    id: z.string()
}).merge(UserRegisterSchema);

export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type User = z.infer<typeof UserSchema>;