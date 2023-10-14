import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().min(1, "O email é obrigatório!").email("Email inválido"),
    password: z.string().min(1, "A senha é obrigatória!"),
})