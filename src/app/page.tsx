"use client";

import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { Download, FileText, Info, ChefHat, Scale, AlertCircle } from "lucide-react";

import { nutriSchema, NutriFormData } from "@/lib/schema";
import { NutritionalTable } from "@/components/NutritionalTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const form = useForm({
    resolver: zodResolver(nutriSchema),
    defaultValues: {
      porcaoQtd: 100,
      porcaoUnidade: "g" as const,
      medidaCaseira: "1 fatia",
      porcoesPorEmbalagem: 1,
      valorEnergetico: 0,
      carboidratos: 0,
      acucaresTotais: 0,
      acucaresAdicionados: 0,
      proteinas: 0,
      gordurasTotais: 0,
      gordurasSaturadas: 0,
      gordurasTrans: 0,
      fibrasAlimentares: 0,
      sodio: 0,
    },
    mode: "onChange",
  });

  const data = form.watch() as NutriFormData;

  const handleExportPNG = async () => {
    const element = document.getElementById("tabela-export");
    if (!element) return;
    try {
      const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 3, backgroundColor: 'white', style: { margin: '0' } });
      const link = document.createElement("a");
      link.download = `tabela-${data.medidaCaseira || 'nutricional'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { console.error(err); }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById("tabela-export");
    if (!element) return;
    try {
      const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 3, backgroundColor: 'white', style: { margin: '0' } });
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const pdf = new jsPDF({
          orientation: img.width > img.height ? "landscape" : "portrait",
          unit: "px",
          format: [img.width, img.height]
        });
        pdf.addImage(dataUrl, "PNG", 0, 0, img.width, img.height);
        pdf.save(`tabela-${data.medidaCaseira || 'nutricional'}.pdf`);
      };
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* Título */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1.5 rounded-md">
              <Scale className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">
              Gerador Nutricional <span className="text-slate-400 font-normal text-sm ml-1">v1.0</span>
            </h1>
          </div>

          {/* RDC */}
          <a
            href="https://www.in.gov.br/en/web/dou/-/resolucao-de-diretoria-colegiada-rdc-n-429-de-8-de-outubro-de-2020-282070599"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200 hover:bg-green-100 hover:border-green-300 transition-all cursor-pointer flex items-center gap-1.5"
            title="Ler a norma completa no Diário Oficial"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            RDC 429/2020 Compliant
          </a>

        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 pb-32">
        <Form {...form}>
          <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* --- FORMULÁRIO --- */}
            <div className="lg:col-span-7 space-y-6">

              <div className="space-y-1 mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Dados do Alimento</h2>
                <p className="text-slate-500 text-sm">Preencha as informações para calcular a tabela automaticamente.</p>
              </div>

              {/* CONFIGURAÇÃO DA PORÇÃO */}
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-slate-500" />
                    <CardTitle className="text-base font-semibold text-slate-700">Definição da Porção</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="porcaoQtd" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <Input {...field} value={typeof field.value === 'number' ? field.value : ''} onChange={(e) => field.onChange(e.target.valueAsNumber || e.target.value)} type="number" className="bg-slate-50 border-slate-200 focus:bg-white transition-all" />
                        </FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="porcaoUnidade" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unidade</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className="bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent><SelectItem value="g">Gramas (g)</SelectItem><SelectItem value="ml">Mililitros (ml)</SelectItem></SelectContent>
                        </Select>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="porcoesPorEmbalagem" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Porções/Emb.</FormLabel>
                        <FormControl>
                          <Input {...field} value={typeof field.value === 'number' ? field.value : ''} onChange={(e) => field.onChange(e.target.valueAsNumber || e.target.value)} type="number" className="bg-slate-50 border-slate-200" />
                        </FormControl>
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="medidaCaseira" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medida Caseira (Texto)</FormLabel>
                      <FormControl><Input {...field} value={field.value ?? ''} placeholder="Ex: 1 fatia, 2 biscoitos, 1 copo..." className="bg-slate-50 border-slate-200" /></FormControl>
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* MACRONUTRIENTES */}
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-slate-500" />
                    <CardTitle className="text-base font-semibold text-slate-700">Composição Nutricional</CardTitle>
                  </div>
                  <CardDescription>Informe os valores referentes à porção definida acima.</CardDescription>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Desktop e Mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* --- Energia, Carbo, Fibra --- */}
                    <div className="space-y-6">

                      {/* Valor Energético */}
                      <InputNumber label="Valor Energético (kcal)" name="valorEnergetico" control={form.control} highlight />
                      <Separator />

                      {/* Carboidratos e Açúcares */}
                      <div className="space-y-3">
                        <InputNumber label="Carboidratos (g)" name="carboidratos" control={form.control} />

                        {/* Açúcares */}
                        <div className="pl-4 border-l-2 border-slate-100 space-y-3 ml-1">
                          <InputNumber label="Açúcares Totais (g)" name="acucaresTotais" control={form.control} sub />
                          <InputNumber label="Açúcares Adic. (g)" name="acucaresAdicionados" control={form.control} sub />
                        </div>
                      </div>

                      <Separator />
                      <InputNumber label="Fibras Alimentares (g)" name="fibrasAlimentares" control={form.control} />
                    </div>

                    {/* --- Proteína, Gordura, Sódio --- */}
                    <div className="space-y-6">

                      {/* Proteínas */}
                      <InputNumber label="Proteínas (g)" name="proteinas" control={form.control} />
                      <Separator />

                      {/* Gorduras */}
                      <div className="space-y-3">
                        <InputNumber label="Gorduras Totais (g)" name="gordurasTotais" control={form.control} />
                        {/* Sub-grupo Gorduras */}
                        <div className="pl-4 border-l-2 border-slate-100 space-y-3 ml-1">
                          <InputNumber label="Gorduras Saturadas (g)" name="gordurasSaturadas" control={form.control} sub />
                          <InputNumber label="Gorduras Trans (g)" name="gordurasTrans" control={form.control} sub />
                        </div>
                      </div>
                      <Separator />
                      <InputNumber label="Sódio (mg)" name="sodio" control={form.control} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* --- PREVIEW & AÇÕES  --- */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 h-fit">

              {/* PREVIEW */}
              <div className="bg-slate-100/80 rounded-xl p-8 border border-slate-200 flex justify-center items-center shadow-inner min-h-[400px]">
                <div className="bg-white shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <NutritionalTable data={data} id="tabela-export" />
                </div>
              </div>

              {/* CARD DE EXPORTAÇÃO */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-slate-800">Exportar Arquivo</CardTitle>
                  <CardDescription>Pronto para impressão e embalagens.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    onClick={handleExportPNG}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium"
                  >
                    <Download className="mr-2 h-4 w-4" /> Baixar PNG
                  </Button>

                  <Button
                    type="button"
                    onClick={handleExportPDF}
                    variant="outline"
                    className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    <FileText className="mr-2 h-4 w-4" /> Baixar PDF
                  </Button>
                </CardContent>
              </Card>

              {/* DISCLAIMER */}
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Atenção:</strong> Os valores gerados são estimativas baseadas nos cálculos da RDC 429. Sempre valide com um nutricionista técnico responsável antes de imprimir seus rótulos finais.
                </p>
              </div>
            </div>
          </form>
        </Form>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-50 bg-slate-50 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400 mb-2">
            Desenvolvido para pequenos produtores e indústrias.
          </p>
          <p className="text-sm font-medium text-slate-400">
            Made by <a href="https://www.instagram.com/weszzy/" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-400">Daniel Dutra</a>
          </p>
        </div>
      </footer>
    </div>
  );
}


interface InputNumberProps {
  label: string;
  name: string;
  control: Control<any>;
  sub?: boolean;
  highlight?: boolean;
}

const InputNumber = ({ label, name, control, sub, highlight }: InputNumberProps) => (
  <FormField control={control} name={name} render={({ field }) => (
    <FormItem className="space-y-1.5">
      <FormLabel className={`text-xs uppercase tracking-wide ${sub ? 'text-slate-500 font-normal' : 'text-slate-700 font-bold'} ${highlight ? 'text-blue-600' : ''}`}>
        {label}
      </FormLabel>
      <FormControl>
        <Input
          {...field}
          value={typeof field.value === 'number' ? field.value : ''}
          onChange={(e) => field.onChange(e.target.valueAsNumber || e.target.value)}
          type="number"
          step="any"
          placeholder="0"
          className={`
            h-9 transition-all
            ${sub ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-300'}
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          `}
        />
      </FormControl>
    </FormItem>
  )} />
);