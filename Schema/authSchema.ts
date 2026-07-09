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

export const changePassSchema = z
  .object({
    curr_password: z.string().min(1, "Current password is required"),

    new_password: z
      .string()
      .min(8, "New password must be at least 8 characters"),

    confirm_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const changePassdefault = {
  curr_password: "",
  new_password: "",
  confirm_password: "",
};
