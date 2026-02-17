import { describe, it, expect } from 'vitest';
import { formatarValor, calcularVD } from './calculations';

describe('formatarValor', () => {
    it('deve retornar "0" para valores menores que 0.1', () => {
        expect(formatarValor(0.05)).toBe("0");
        expect(formatarValor(0.09)).toBe("0");
        expect(formatarValor(0)).toBe("0");
    });

    it('deve retornar inteiros sem casas decimais', () => {
        expect(formatarValor(10)).toBe("10");
        expect(formatarValor(100)).toBe("100");
        expect(formatarValor(1)).toBe("1");
    });

    it('deve formatar decimais com vírgula', () => {
        expect(formatarValor(10.5)).toBe("10,5");
        expect(formatarValor(3.7)).toBe("3,7");
        expect(formatarValor(0.5)).toBe("0,5");
    });

    it('deve arredondar para 1 casa decimal', () => {
        expect(formatarValor(10.56)).toBe("10,6");
        expect(formatarValor(10.54)).toBe("10,5");
        expect(formatarValor(10.55)).toBe("10,6");
    });
});

describe('calcularVD', () => {
    it('deve retornar string vazia para gorduras trans', () => {
        expect(calcularVD(5, "gordurasTrans")).toBe("");
        expect(calcularVD(0, "gordurasTrans")).toBe("");
    });

    it('deve retornar string vazia para açúcares totais', () => {
        expect(calcularVD(10, "acucaresTotais")).toBe("");
        expect(calcularVD(0, "acucaresTotais")).toBe("");
    });

    it('deve calcular percentual corretamente para valor energético', () => {
        expect(calcularVD(2000, "valorEnergetico")).toBe("100");
        expect(calcularVD(1000, "valorEnergetico")).toBe("50");
        expect(calcularVD(500, "valorEnergetico")).toBe("25");
    });

    it('deve calcular percentual corretamente para carboidratos', () => {
        expect(calcularVD(300, "carboidratos")).toBe("100");
        expect(calcularVD(150, "carboidratos")).toBe("50");
        expect(calcularVD(75, "carboidratos")).toBe("25");
    });

    it('deve calcular percentual corretamente para proteínas', () => {
        expect(calcularVD(75, "proteinas")).toBe("100");
        expect(calcularVD(37.5, "proteinas")).toBe("50");
    });

    it('deve calcular percentual corretamente para gorduras totais', () => {
        expect(calcularVD(55, "gordurasTotais")).toBe("100");
        expect(calcularVD(27.5, "gordurasTotais")).toBe("50");
    });

    it('deve calcular percentual corretamente para sódio', () => {
        expect(calcularVD(2000, "sodio")).toBe("100");
        expect(calcularVD(1000, "sodio")).toBe("50");
    });

    it('deve arredondar percentual para inteiro', () => {
        expect(calcularVD(2050, "valorEnergetico")).toBe("103");
        expect(calcularVD(1999, "valorEnergetico")).toBe("100");
        expect(calcularVD(2001, "valorEnergetico")).toBe("100");
    });

    it('deve retornar string vazia para nutriente desconhecido', () => {
        expect(calcularVD(100, "nutrienteInvalido")).toBe("");
    });

    it('deve lidar com valores zero', () => {
        expect(calcularVD(0, "valorEnergetico")).toBe("0");
        expect(calcularVD(0, "carboidratos")).toBe("0");
    });
});
