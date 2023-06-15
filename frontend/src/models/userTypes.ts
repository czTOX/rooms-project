import z from 'zod';

const UserLoginSchema = z.object({
  hashedPassword: z
    .string({ required_error: 'Missing `password` parameter' })
    .nonempty(),
  email: z.string({ required_error: 'Missing `email` parameter' }).nonempty(),
});

const UserRegistraionSchema = z.object({
  firstName: z
    .string({ required_error: 'Missing `firstName` parameter' })
    .nonempty(),
  lastName: z
    .string({ required_error: 'Missing `lastName` parameter' })
    .nonempty(),
  phoneNumber: z
    .string({ required_error: 'Missing `phoneNumber` parameter' })
    .nonempty(),
  email: z.string({ required_error: 'Missing `email` parameter' }).nonempty(),
  hashedPassword: z
    .string({ required_error: 'Missing `password` parameter' })
    .nonempty(),
});

const UserSchema = z.object({
  firstName: z
    .string({ required_error: 'Missing `firstName` parameter' })
    .nonempty(),
  lastName: z
    .string({ required_error: 'Missing `lastName` parameter' })
    .nonempty(),
  phoneNumber: z
    .string({ required_error: 'Missing `phoneNumber` parameter' })
    .nonempty(),
  email: z.string({ required_error: 'Missing `email` parameter' }).nonempty(),
});

export type User = z.infer<typeof UserSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserRegistraion = z.infer<typeof UserRegistraionSchema>;
