import { NutriFormData } from "@/lib/schema";
import { calcularVD, formatarValor } from "@/lib/calculations";

interface Props {
    data: NutriFormData;
    id?: string;
    layout?: "vertical" | "linear";
}

export const NutritionalTable = ({ data, id, layout = "vertical" }: Props) => {
    const fator100 = data.porcaoQtd > 0 ? (100 / data.porcaoQtd) : 0;

    const calc100 = (val: number) => {
        if (val === 0) return "0";
        return formatarValor(val * fator100);
    };

    const calcPorcao = (val: number) => formatarValor(val);

    // --- MODELO LINEAR (HORIZONTAL) ---
    if (layout === "linear") {
        return (
            <div
                id={id}
                className="bg-white p-6 min-w-[600px] w-fit font-sans text-black mx-auto leading-tight select-none"
                style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
                <div className="border-[3px] border-black p-3 text-sm">
                    <div className="flex flex-wrap items-baseline gap-1 mb-2 font-bold">
                        <span className="uppercase">Informação Nutricional:</span>
                        <span>Porção: {data.porcaoQtd} {data.porcaoUnidade} ({data.medidaCaseira}).</span>
                    </div>
                    <div className="text-[11px] text-gray-500 mb-2 italic">
                        (Valores na ordem: 100 {data.porcaoUnidade} / Porção / %VD*)
                    </div>
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

    // --- MODELO VERTICAL (PADRÃO COM GRADE) ---
    return (
        <div
            id={id}
            className="bg-white p-8 min-w-[350px] w-fit font-sans text-black mx-auto leading-none select-none"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
            {/* Borda Externa Grossa */}
            <div className="border-[3px] border-black">
                
                {/* Título e Porção (Sem grid ainda) */}
                <div className="p-1 border-b border-black">
                    <h2 className="text-lg font-bold mb-1">INFORMAÇÃO NUTRICIONAL</h2>
                    <div className="text-xs">
                        <p className="mb-0.5">Porções por emb.: {data.porcoesPorEmbalagem}</p>
                        <p>Porção: {data.porcaoQtd} {data.porcaoUnidade} ({data.medidaCaseira})</p>
                    </div>
                </div>

                {/* Cabeçalho da Tabela (Com Grid) */}
                <div className="flex text-[11px] font-bold border-b border-black bg-gray-50/50">
                    <div className="flex-1 p-1 flex items-end"></div> {/* Espaço vazio acima dos nomes */}
                    <div className="w-14 p-1 text-center border-l border-black flex items-end justify-center">100 {data.porcaoUnidade}</div>
                    <div className="w-14 p-1 text-center border-l border-black flex items-end justify-center">{data.porcaoQtd} {data.porcaoUnidade}</div>
                    <div className="w-10 p-1 text-center border-l border-black flex items-end justify-center">%VD*</div>
                </div>
                
                {/* Linhas de Dados (Com Grid) */}
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
                    <Row label="Sódio (mg)" val={data.sodio} vd="sodio" calc100={calc100} calcPorcao={calcPorcao} isLast /> {/* isLast remove a borda inferior */}
                </div>

                {/* Rodapé dentro da borda */}
                <div className="p-1 text-[9px] leading-tight border-t border-black">
                    *Percentual de valores diários fornecidos pela porção.
                </div>
            </div>
        </div>
    );
};

// Row atualizada com bordas verticais (border-l)
const Row = ({ label, val, vd, isBold, indent, calc100, calcPorcao, isLast }: any) => (
    <div className={`flex items-center ${!isLast ? 'border-b border-black' : ''} ${isBold ? 'font-bold' : ''}`}>
        <div className={`flex-1 p-1 ${indent ? 'pl-4' : ''}`}>
            {label}
        </div>
        
        {/* Coluna 100g */}
        <div className="w-14 p-1 text-center border-l border-black flex items-center justify-center h-full">
            {calc100(val)}
        </div>
        
        {/* Coluna Porção */}
        <div className="w-14 p-1 text-center border-l border-black flex items-center justify-center h-full">
            {calcPorcao(val)}
        </div>
        
        {/* Coluna %VD */}
        <div className="w-10 p-1 text-center border-l border-black flex items-center justify-center font-bold h-full">
            {calcularVD(val, vd)}
        </div>
    </div>
);

// Helper Linear (mantido igual)
const LinearItem = ({ label, val, vd, isBold, calc100, calcPorcao, isLast }: any) => {
    const vdValue = calcularVD(val, vd);
    const vdDisplay = vdValue ? `${vdValue}%` : '';
    return (
        <span className={`mr-1 ${isBold ? 'font-bold' : ''}`}>
            {label} {calc100(val)} <span className="text-gray-400">/</span> {calcPorcao(val)} <span className="text-gray-400">/</span> {vdDisplay}
            {!isLast && <span className="mx-1">;</span>}
        </span>
    )
}