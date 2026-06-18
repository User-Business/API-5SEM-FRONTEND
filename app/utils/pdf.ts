/**
 * Gera o nome do arquivo PDF a partir de um título e da data informada.
 * Remove acentos, espaços e símbolos, deixando um slug em minúsculas.
 * Ex.: buildPdfFileName('Investimentos') -> 'investimentos-2026-06-11.pdf'
 */
export function buildPdfFileName(title: string, date: Date = new Date()): string {
  const slug = title
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const iso = date.toISOString().slice(0, 10)
  return `${slug || 'dashboard'}-${iso}.pdf`
}
