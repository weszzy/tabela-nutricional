import { VALORES_DIARIOS, NutrienteKey } from "./constants";

export function formatarValor(valor: number): string {
    if (valor < 0.1) return "0";
    if (Number.isInteger(valor)) return valor.toString();
    return valor.toFixed(1).replace('.', ',');
}

export function calcularVD(valor: number, nutriente: string): string {
    if (nutriente === "gordurasTrans" || nutriente === "acucaresTotais") return "";
    const base = VALORES_DIARIOS[nutriente as NutrienteKey];
    if (!base) return "";
    const percentual = (valor / base) * 100;
    const resultado = Math.round(percentual);
    return resultado.toString();
}