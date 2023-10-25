import { z } from "zod";


export const editTechSchema = z.object({
    title: z.string().min(1, "Nome é obrigatório!"),
    status: z.string().min(1, "Status é obrigatório!"),
})