import { emailSchema, passwordSchema } from "@/schema/auth-schema";
import { ZodError } from "zod";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const zodValidator = (data: string, dataSchema: any) => {
    try {
        dataSchema.parse(data);
        return true
    } catch (error) {
        if (error instanceof ZodError) {
            return error.errors[0].message;
        }
        return false
    }
};

const validateEmail = (email: string) => zodValidator(email, emailSchema);

const validatePassword = (password: string) => zodValidator(password, passwordSchema);


export { validateEmail, validatePassword };
