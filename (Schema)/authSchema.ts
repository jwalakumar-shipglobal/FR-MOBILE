import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Enter Email Id")
    .email("Must be a valid email address"),
  password: z
    .string()
    .nonempty("Enter Password")
    .min(6, "Password Must be 6 or more characters longs"),
});

export default LoginSchema;
