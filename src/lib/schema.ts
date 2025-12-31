import { z } from "zod";

export const nutriSchema = z.object({
    porcaoQtd: z.coerce.number().min(0.1, "Porção obrigatória"),
    porcaoUnidade: z.enum(["g", "ml"]),
    medidaCaseira: z.string().min(1, "Ex: 1 fatia, 2 colheres"),
    porcoesPorEmbalagem: z.coerce.number().min(0.1),
    valorEnergetico: z.coerce.number().default(0),
    carboidratos: z.coerce.number().default(0),
    acucaresTotais: z.coerce.number().default(0),
    acucaresAdicionados: z.coerce.number().default(0),
    proteinas: z.coerce.number().default(0),
    gordurasTotais: z.coerce.number().default(0),
    gordurasSaturadas: z.coerce.number().default(0),
    gordurasTrans: z.coerce.number().default(0),
    fibrasAlimentares: z.coerce.number().default(0),
    sodio: z.coerce.number().default(0),
});

export type NutriFormData = z.infer<typeof nutriSchema>;