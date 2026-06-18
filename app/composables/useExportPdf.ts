import { ref } from 'vue'

import { buildPdfFileName } from '../utils/pdf'

/**
 * Exporta um elemento da página para PDF e dispara o download automático.
 *
 * As bibliotecas (html2canvas-pro + jspdf) são importadas dinamicamente, apenas
 * no cliente, para não quebrar a renderização no servidor (SSR). Usa-se a versão
 * "pro" do html2canvas porque ela suporta as cores modernas (oklch) do Tailwind v4.
 */
export function useExportPdf() {
  const exporting = ref(false)

  async function exportToPdf(title = 'dashboard', target?: HTMLElement) {
    if (import.meta.server) return

    exporting.value = true
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas-pro'),
        import('jspdf')
      ])

      const element = target ?? document.body
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true
      })

      const image = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: canvas.width >= canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      })

      pdf.addImage(image, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save(buildPdfFileName(title))
    } finally {
      exporting.value = false
    }
  }

  return { exporting, exportToPdf }
}
