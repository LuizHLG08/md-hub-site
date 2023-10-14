import { z } from "zod";

export const registerFormSchema = z.object({
    name:z
        .string()
        .min(1, "Nome é obrigatório!"),
    email: z
        .string()
        .min(1, "Email é obrigatório!")
        .email("Por favor, ensira um email válido"),
    password: z
        .string()
        .min(1, "Senha é obrigatória")
        .min(8, "Senha precisa ter no mínimo 8 caracteres")
        .regex(/[A-Z]+/, "É necessário pelo menos uma letra maiúscula")
        .regex(/[a-z]+/, "É necessário pelo menos uma letra minúscula")
        .regex(/[0-9]+/, "É necessário pelo menos um número"),
    confirm_password: z.string().min(1, "Confirmar senha é obrigatório!"),
    bio: z
        .string()
        .min(1, "Bio é obrigatória!"),
    contact: z
        .string()
        .min(1, "Contato é obrigatório!"),
    course_module: z
        .string()
        .min(1, "Modulo é obrigatório!"),
}).refine(({password, confirm_password}) => password === confirm_password, {
    message: "As senhas não correspondem",
    path: ["confirm_password"]
})