import { useState } from "react";

export function useExport() {
    const [isExporting, setIsExporting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const exportPNG = async (elementId: string, filename = "tabela-nutricional.png") => {
        setIsExporting(true);
        setError(null);

        try {
            const { toPng } = await import('html-to-image');
            const element = document.getElementById(elementId);

            if (!element) {
                throw new Error(`Elemento com ID "${elementId}" não encontrado`);
            }

            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 2
            });

            const link = document.createElement("a");
            link.download = filename;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Erro desconhecido ao exportar PNG");
            setError(error);
            throw error;
        } finally {
            setIsExporting(false);
        }
    };

    const exportPDF = async (elementId: string, filename = "tabela-nutricional.pdf") => {
        setIsExporting(true);
        setError(null);

        try {
            const [{ toPng }, { default: jsPDF }] = await Promise.all([
                import('html-to-image'),
                import('jspdf')
            ]);

            const element = document.getElementById(elementId);

            if (!element) {
                throw new Error(`Elemento com ID "${elementId}" não encontrado`);
            }

            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 2
            });

            const img = new Image();
            img.src = dataUrl;

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const pdf = new jsPDF({
                orientation: img.width > img.height ? "landscape" : "portrait",
                unit: "px",
                format: [img.width, img.height],
            });

            pdf.addImage(dataUrl, "PNG", 0, 0, img.width, img.height);
            pdf.save(filename);
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Erro desconhecido ao exportar PDF");
            setError(error);
            throw error;
        } finally {
            setIsExporting(false);
        }
    };

    return { exportPNG, exportPDF, isExporting, error };
}
