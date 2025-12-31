"use client";

import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { Download, FileText, Info } from "lucide-react";

import { nutriSchema, NutriFormData } from "@/lib/schema";
import { NutritionalTable } from "@/components/NutritionalTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
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
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: 'white',
        style: { margin: '0' }
      });
      const link = document.createElement("a");
      link.download = `tabela-${data.medidaCaseira || 'nutricional'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erro PNG:", err);
    }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById("tabela-export");
    if (!element) return;

    try {
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: 'white',
        style: { margin: '0' }
      });

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

    } catch (err) {
      console.error("Erro PDF:", err);
      alert("Erro ao gerar PDF.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-slate-900">Tabela Nutricional</h1>
            <p className="text-slate-500">Padrão ANVISA (RDC 429/2020)</p>
          </div>

          <Card className="p-6 border-slate-200 shadow-sm">
            <Form {...form}>
              <form className="space-y-6">
                <div className="bg-slate-100 p-4 rounded-lg space-y-4">
                  <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Dados da Porção
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField control={form.control} name="porcaoQtd" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Qtd.</FormLabel>
                        <FormControl>
                          <Input {...field} value={typeof field.value === 'number' ? field.value : ''} onChange={(e) => field.onChange(e.target.valueAsNumber || e.target.value)} type="number" />
                        </FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="porcaoUnidade" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unidade</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className="bg-white"><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent><SelectItem value="g">Gramas (g)</SelectItem><SelectItem value="ml">Mililitros (ml)</SelectItem></SelectContent>
                        </Select>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="porcoesPorEmbalagem" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Porções/Emb.</FormLabel>
                        <FormControl>
                          <Input {...field} value={typeof field.value === 'number' ? field.value : ''} onChange={(e) => field.onChange(e.target.valueAsNumber || e.target.value)} type="number" />
                        </FormControl>
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="medidaCaseira" render={({ field }) => (
                    <FormItem><FormLabel>Medida Caseira</FormLabel><FormControl><Input {...field} value={field.value ?? ''} placeholder="Ex: 1 fatia" className="bg-white" /></FormControl></FormItem>
                  )} />
                </div>
                <Separator />

                <div>
                  <h3 className="font-semibold text-slate-700 mb-4">Nutrientes (na porção)</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <InputNumber label="Valor Energético (kcal)" name="valorEnergetico" control={form.control} />
                    <InputNumber label="Carboidratos (g)" name="carboidratos" control={form.control} />
                    <InputNumber label="Açúcares Totais (g)" name="acucaresTotais" control={form.control} />
                    <InputNumber label="Açúcares Adic. (g)" name="acucaresAdicionados" control={form.control} />
                    <InputNumber label="Proteínas (g)" name="proteinas" control={form.control} />
                    <InputNumber label="Gorduras Totais (g)" name="gordurasTotais" control={form.control} />
                    <InputNumber label="Gorduras Saturadas (g)" name="gordurasSaturadas" control={form.control} />
                    <InputNumber label="Gorduras Trans (g)" name="gordurasTrans" control={form.control} />
                    <InputNumber label="Fibras (g)" name="fibrasAlimentares" control={form.control} />
                    <InputNumber label="Sódio (mg)" name="sodio" control={form.control} />
                  </div>
                </div>
              </form>
            </Form>
          </Card>
        </div>

        <div className="flex flex-col items-center gap-8 lg:sticky lg:top-8 h-fit">
          <div className="w-full max-w-[400px]">
            <div className="bg-white p-1 rounded-sm shadow-xl border border-slate-200 overflow-hidden">
              <NutritionalTable data={data} id="tabela-export" />
            </div>
            <p className="text-center text-xs text-slate-400 mt-2">Pré-visualização em tempo real</p>
          </div>

          <Card className="w-full max-w-[400px] p-6 bg-slate-900 text-white border-none">
            <h3 className="font-bold text-lg mb-2">Exportar Tabela</h3>
            <p className="text-slate-300 text-sm mb-4">
              Escolha o formato desejado para o rótulo.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleExportPNG}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
              >
                <Download className="mr-2 h-4 w-4" /> PNG
              </Button>
              <Button
                onClick={handleExportPDF}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                <FileText className="mr-2 h-4 w-4" /> PDF
              </Button>
            </div>
          </Card>

          <p className="text-[10px] text-center text-slate-400 max-w-xs leading-relaxed">
            *Os cálculos de %VD e arredondamentos seguem a RDC 429/2020.
          </p>
        </div>
      </div>
    </main>
  );
}

interface InputNumberProps {
  label: string;
  name: string;
  control: Control<any>;
}

const InputNumber = ({ label, name, control }: InputNumberProps) => (
  <FormField control={control} name={name} render={({ field }) => (
    <FormItem className="space-y-1">
      <FormLabel className="text-xs font-medium text-slate-500 uppercase">{label}</FormLabel>
      <FormControl>
        <Input
          {...field}
          value={typeof field.value === 'number' ? field.value : ''}
          onChange={(e) => field.onChange(e.target.valueAsNumber || e.target.value)}
          type="number"
          step="any"
          className="h-9"
          placeholder="0"
        />
      </FormControl>
    </FormItem>
  )} />
);