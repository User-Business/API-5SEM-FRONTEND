import { describe, it, expect } from 'vitest'

import { buildPdfFileName } from '../utils/pdf'

describe('buildPdfFileName', () => {
  it('gera o nome com slug e data ISO', () => {
    // Arrange
    const date = new Date('2026-06-11T10:00:00Z')

    // Act
    const name = buildPdfFileName('Investimentos', date)

    // Assert
    expect(name).toBe('investimentos-2026-06-11.pdf')
  })

  it('remove acentos e espaços do título', () => {
    // Arrange
    const date = new Date('2026-01-05T00:00:00Z')

    // Act
    const name = buildPdfFileName('Horas Trabalhadas — Geração', date)

    // Assert
    expect(name).toBe('horas-trabalhadas-geracao-2026-01-05.pdf')
  })

  it('usa fallback "dashboard" quando o título é vazio', () => {
    // Arrange
    const date = new Date('2026-12-31T00:00:00Z')

    // Act
    const name = buildPdfFileName('   ', date)

    // Assert
    expect(name).toBe('dashboard-2026-12-31.pdf')
  })
})
