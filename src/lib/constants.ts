export const VALORES_DIARIOS = {
    valorEnergetico: 2000,
    carboidratos: 300,
    acucaresAdicionados: 50,
    proteinas: 75,
    gordurasTotais: 55,
    gordurasSaturadas: 20,
    fibrasAlimentares: 25,
    sodio: 2000,
};

export type NutrienteKey = keyof typeof VALORES_DIARIOS;