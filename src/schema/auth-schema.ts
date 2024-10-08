import z from "zod";

const emailSchema = z
    .string()
    .email({ message: "Invalid Email" });

const passwordSchema = z
    .string()
    .min(8, { message: "Minimum 8 characters required" })
    .max(18, { message: "Maximum 18 characters allowed" });



export { emailSchema, passwordSchema };
