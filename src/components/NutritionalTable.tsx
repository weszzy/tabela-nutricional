import { memo, useMemo } from "react";
import { NutriFormData } from "@/lib/schema";
import { calcularVD, formatarValor } from "@/lib/calculations";

interface Props {
    data: NutriFormData;
    id?: string;
    layout?: "vertical" | "linear";
}

interface RowProps {
    label: string;
    val: number;
    vd: string;
    isBold?: boolean;
    indent?: boolean;
    calc100: (val: number) => string;
    calcPorcao: (val: number) => string;
}

interface LinearItemProps {
    label: string;
    val: number;
    vd: string;
    isBold?: boolean;
    calc100: (val: number) => string;
    calcPorcao: (val: number) => string;
    isLast?: boolean;
}

export const NutritionalTable = memo(({ data, id, layout = "vertical" }: Props) => {
    const fator100 = useMemo(
        () => (data.porcaoQtd > 0 ? 100 / data.porcaoQtd : 0),
        [data.porcaoQtd]
    );

    const calc100 = useMemo(
        () => (val: number) => {
            if (val === 0) return "0";
            return formatarValor(val * fator100);
        },
        [fator100]
    );

    const calcPorcao = useMemo(
        () => (val: number) => formatarValor(val),
        []
    );

    if (layout === "linear") {
        return (
            <div
                id={id}
                className="bg-white w-full font-sans text-black mx-auto leading-tight select-none"
                style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
                <div className="border-[3px] border-black p-3 text-sm">
                    {/* Cabeçalho Linear */}
                    <div className="flex flex-wrap items-baseline gap-1 mb-2 font-bold">
                        <span className="uppercase">Informação Nutricional:</span>
                        <span>Porção: {data.porcaoQtd} {data.porcaoUnidade} ({data.medidaCaseira}).</span>
                    </div>

                    {/* Legenda Explicativa */}
                    <div className="text-[11px] text-gray-500 mb-2 italic">
                        (Valores na ordem: 100 {data.porcaoUnidade} / Porção / %VD*)
                    </div>

                    {/* Lista de Nutrientes */}
                    <div className="text-xs leading-5 text-justify">
                        <LinearItem label="Valor energético (kcal)" val={data.valorEnergetico} vd="valorEnergetico" calc100={calc100} calcPorcao={calcPorcao} isBold />
                        <LinearItem label="Carboidratos (g)" val={data.carboidratos} vd="carboidratos" calc100={calc100} calcPorcao={calcPorcao} />
                        <LinearItem label="Açúcares totais (g)" val={data.acucaresTotais} vd="acucaresTotais" calc100={calc100} calcPorcao={calcPorcao} />
                        <LinearItem label="Açúcares adic. (g)" val={data.acucaresAdicionados} vd="acucaresAdicionados" calc100={calc100} calcPorcao={calcPorcao} />
                        <LinearItem label="Proteínas (g)" val={data.proteinas} vd="proteinas" calc100={calc100} calcPorcao={calcPorcao} />
                        <LinearItem label="Gorduras totais (g)" val={data.gordurasTotais} vd="gordurasTotais" calc100={calc100} calcPorcao={calcPorcao} />
                        <LinearItem label="Gorduras saturadas (g)" val={data.gordurasSaturadas} vd="gordurasSaturadas" calc100={calc100} calcPorcao={calcPorcao} />
                        <LinearItem label="Gorduras trans (g)" val={data.gordurasTrans} vd="gordurasTrans" calc100={calc100} calcPorcao={calcPorcao} />
                        <LinearItem label="Fibras alimentares (g)" val={data.fibrasAlimentares} vd="fibrasAlimentares" calc100={calc100} calcPorcao={calcPorcao} />
                        <LinearItem label="Sódio (mg)" val={data.sodio} vd="sodio" calc100={calc100} calcPorcao={calcPorcao} isLast />
                    </div>

                    <div className="mt-2 text-[10px]">
                        *Percentual de valores diários fornecidos pela porção.
                    </div>
                </div>
            </div>
        )
    }

    // --- MODELO VERTICAL  ---
    return (
        <div
            id={id}
            className="bg-white min-w-[350px] w-fit font-sans text-black mx-auto leading-none select-none"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
            <div className="border-[3px] border-black p-1">
                <h2 className="text-lg font-bold border-b border-black pb-1 mb-1">INFORMAÇÃO NUTRICIONAL</h2>
                <div className="text-xs border-b border-black pb-1 mb-1">
                    <p className="mb-1">
                        Porção: {data.porcaoQtd} {data.porcaoUnidade} ({data.medidaCaseira})
                    </p>
                    <p className="text-[9px] text-gray-700">
                        {data.porcoesPorEmbalagem} porções por embalagem
                    </p>
                </div>
                <div className="flex items-end text-[11px] font-bold border-b-2 border-black mb-1 pb-1">
                    <span className="flex-1"></span>
                    <span className="w-12 text-center">100 {data.porcaoUnidade}</span>
                    <span className="w-12 text-center">{data.porcaoQtd} {data.porcaoUnidade}</span>
                    <span className="w-8 text-center">%VD*</span>
                </div>
                <div className="flex flex-col text-xs">
                    <Row label="Valor energético (kcal)" val={data.valorEnergetico} vd="valorEnergetico" calc100={calc100} calcPorcao={calcPorcao} isBold />
                    <Row label="Carboidratos (g)" val={data.carboidratos} vd="carboidratos" calc100={calc100} calcPorcao={calcPorcao} />
                    <Row label="Açúcares totais (g)" val={data.acucaresTotais} vd="acucaresTotais" calc100={calc100} calcPorcao={calcPorcao} indent />
                    <Row label="Açúcares adic. (g)" val={data.acucaresAdicionados} vd="acucaresAdicionados" calc100={calc100} calcPorcao={calcPorcao} indent />
                    <Row label="Proteínas (g)" val={data.proteinas} vd="proteinas" calc100={calc100} calcPorcao={calcPorcao} />
                    <Row label="Gorduras totais (g)" val={data.gordurasTotais} vd="gordurasTotais" calc100={calc100} calcPorcao={calcPorcao} />
                    <Row label="Gorduras saturadas (g)" val={data.gordurasSaturadas} vd="gordurasSaturadas" calc100={calc100} calcPorcao={calcPorcao} indent />
                    <Row label="Gorduras trans (g)" val={data.gordurasTrans} vd="gordurasTrans" calc100={calc100} calcPorcao={calcPorcao} indent />
                    <Row label="Fibras alimentares (g)" val={data.fibrasAlimentares} vd="fibrasAlimentares" calc100={calc100} calcPorcao={calcPorcao} />
                    <Row label="Sódio (mg)" val={data.sodio} vd="sodio" calc100={calc100} calcPorcao={calcPorcao} />
                </div>
                <div className="mt-1 text-[9px] leading-tight border-t-2 border-black pt-1">
                    *Percentual de valores diários fornecidos pela porção.
                </div>
            </div>
        </div>
    );
});

const Row = memo(({ label, val, vd, isBold, indent, calc100, calcPorcao }: RowProps) => (
    <div className={`flex items-center border-b border-gray-300 py-[2px] ${isBold ? 'font-bold' : ''}`}>
        <span className={`flex-1 ${indent ? 'pl-3' : ''}`}>{label}</span>
        <span className="w-12 text-center text-gray-600">{calc100(val)}</span>
        <span className="w-12 text-center">{calcPorcao(val)}</span>
        <span className="w-8 text-center font-bold">{calcularVD(val, vd)}</span>
    </div>
));

const LinearItem = memo(({ label, val, vd, isBold, calc100, calcPorcao, isLast }: LinearItemProps) => {
    const vdValue = calcularVD(val, vd);
    const vdDisplay = vdValue ? `${vdValue}%` : '';

    return (
        <span className={`mr-1 ${isBold ? 'font-bold' : ''}`}>
            {label} {calc100(val)} <span className="text-gray-400">/</span> {calcPorcao(val)} <span className="text-gray-400">/</span> {vdDisplay}
            {!isLast && <span className="mx-1">;</span>}
        </span>
    )
});