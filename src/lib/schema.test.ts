import { describe, it, expect } from 'vitest';
import { nutriSchema } from './schema';

describe('nutriSchema', () => {
    it('deve validar dados corretos', () => {
        const validData = {
            porcaoQtd: 100,
            porcaoUnidade: "g" as const,
            medidaCaseira: "1 fatia",
            porcoesPorEmbalagem: 10,
            valorEnergetico: 200,
            carboidratos: 30,
            acucaresTotais: 10,
            acucaresAdicionados: 5,
            proteinas: 8,
            gordurasTotais: 5,
            gordurasSaturadas: 2,
            gordurasTrans: 0,
            fibrasAlimentares: 3,
            sodio: 150,
        };

        const result = nutriSchema.safeParse(validData);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validData);
        }
    });

    it('deve rejeitar porção menor que 0.1', () => {
        const invalidData = {
            porcaoQtd: 0.05,
            porcaoUnidade: "g" as const,
            medidaCaseira: "1 fatia",
            porcoesPorEmbalagem: 10,
        };

        const result = nutriSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('deve aceitar porção igual a 0.1', () => {
        const validData = {
            porcaoQtd: 0.1,
            porcaoUnidade: "g" as const,
            medidaCaseira: "1 fatia",
            porcoesPorEmbalagem: 1,
        };

        const result = nutriSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('deve rejeitar unidade inválida', () => {
        const invalidData = {
            porcaoQtd: 100,
            porcaoUnidade: "kg",
            medidaCaseira: "1 fatia",
            porcoesPorEmbalagem: 10,
        };

        const result = nutriSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('deve aceitar unidade "g"', () => {
        const validData = {
            porcaoQtd: 100,
            porcaoUnidade: "g" as const,
            medidaCaseira: "1 fatia",
            porcoesPorEmbalagem: 1,
        };

        const result = nutriSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('deve aceitar unidade "ml"', () => {
        const validData = {
            porcaoQtd: 200,
            porcaoUnidade: "ml" as const,
            medidaCaseira: "1 copo",
            porcoesPorEmbalagem: 1,
        };

        const result = nutriSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('deve usar valores padrão para nutrientes não fornecidos', () => {
        const minimalData = {
            porcaoQtd: 100,
            porcaoUnidade: "g" as const,
            medidaCaseira: "1 fatia",
            porcoesPorEmbalagem: 10,
        };

        const result = nutriSchema.safeParse(minimalData);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.valorEnergetico).toBe(0);
            expect(result.data.carboidratos).toBe(0);
            expect(result.data.proteinas).toBe(0);
            expect(result.data.gordurasTotais).toBe(0);
        }
    });

    it('deve rejeitar medida caseira vazia', () => {
        const invalidData = {
            porcaoQtd: 100,
            porcaoUnidade: "g" as const,
            medidaCaseira: "",
            porcoesPorEmbalagem: 10,
        };

        const result = nutriSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });

    it('deve converter strings numéricas para números', () => {
        const dataWithStrings = {
            porcaoQtd: "100",
            porcaoUnidade: "g" as const,
            medidaCaseira: "1 fatia",
            porcoesPorEmbalagem: "10",
            valorEnergetico: "200",
        };

        const result = nutriSchema.safeParse(dataWithStrings);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(typeof result.data.porcaoQtd).toBe("number");
            expect(result.data.porcaoQtd).toBe(100);
        }
    });
});
