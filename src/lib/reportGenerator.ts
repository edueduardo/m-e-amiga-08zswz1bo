import { VoiceEntry } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Formats conversation entries into a readable string for the report.
 * @param entries - Array of voice entries.
 * @returns A formatted string containing the report content.
 */
export const generateReportContent = (entries: VoiceEntry[]): string => {
  let content = `Relatório de Conversas - Mãe Amiga\n`
  content += `Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}\n`
  content += `==================================================\n\n`

  if (entries.length === 0) {
    return 'Nenhuma conversa registrada.'
  }

  const sortedEntries = [...entries].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  )

  sortedEntries.forEach((entry, index) => {
    content += `---------- Conversa #${index + 1} ----------\n`
    content += `Data: ${format(new Date(entry.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}\n`
    content += `Emoção Detectada: ${entry.mood_label}\n\n`
    content += `Seu Desabafo:\n"${entry.transcript}"\n\n`
    content += `Resposta da Mãe Amiga:\n"${entry.mother_reply}"\n\n`
    if (entry.feedback?.rating) {
      content += `Seu Feedback: ${entry.feedback.rating === 'helpful' ? 'Útil' : 'Não foi útil'}\n`
      if (entry.feedback.comment) {
        content += `Comentário: "${entry.feedback.comment}"\n`
      }
    }
    content += `-----------------------------------------\n\n`
  })

  return content
}

/**
 * Simulates the creation and download of a password-protected PDF.
 * In this mock, it downloads a text file.
 * @param content - The string content of the report.
 * @param password - The password for the report.
 */
export const downloadReport = (content: string, password: string): void => {
  const protectedContent =
    `Este é um relatório protegido por senha.\n` +
    `Senha utilizada: ${password}\n\n` +
    `-----------------------------------------\n\n` +
    content

  const blob = new Blob([protectedContent], {
    type: 'text/plain;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `relatorio-mae-amiga-${format(new Date(), 'yyyy-MM-dd')}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  console.log(
    `Simulating download of report protected with password: ${password}`,
  )
}
