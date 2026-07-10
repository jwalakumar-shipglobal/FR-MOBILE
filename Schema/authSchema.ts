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

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=\[\]{};:'",.<>\/\\|`~]).{6,}$/;

export const changePassSchema = z
  .object({
    curr_password: z.string().min(1, "Current password is required"),
    new_password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least one uppercase letter, one number, and one special character",
      ),
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
