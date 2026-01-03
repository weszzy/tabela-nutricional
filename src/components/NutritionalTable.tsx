import { NutriFormData } from "@/lib/schema";
import { calcularVD, formatarValor } from "@/lib/calculations";

interface Props {
    data: NutriFormData;
    id?: string;
}

export const NutritionalTable = ({ data, id }: Props) => {
    const fator100 = data.porcaoQtd > 0 ? (100 / data.porcaoQtd) : 0;

    const calc100 = (val: number) => {
        if (val === 0) return "0";
        return formatarValor(val * fator100);
    };

    const calcPorcao = (val: number) => formatarValor(val);

    return (
        <div
            id={id}
            className="bg-white p-8 min-w-[350px] w-fit font-sans text-black mx-auto leading-none select-none"
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
};

const Row = ({ label, val, vd, isBold, indent, calc100, calcPorcao }: any) => (
    <div className={`flex items-center border-b border-black py-[1px] ${isBold ? 'font-bold' : ''}`}>
        <span className={`flex-1 ${indent ? 'pl-3' : ''}`}>{label}</span>
        <span className="w-12 text-center text-black">{calc100(val)}</span>
        <span className="w-12 text-center">{calcPorcao(val)}</span>
        <span className="w-8 text-center font-bold">{calcularVD(val, vd)}</span>
    </div>
);