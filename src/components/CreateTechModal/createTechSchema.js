import { z } from "zod";


export const createTechSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório!"),
    status: z.string().min(1, "Status é obrigatório!"),
})