import { PlannerTask } from '@/types'
import { format } from 'date-fns'

const formatToUTC = (date: Date) => {
  return date.toISOString().replace(/-|:|\.\d{3}/g, '')
}

export const generateGoogleCalendarLink = (task: PlannerTask): string => {
  const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE'
  const title = encodeURIComponent(task.content)
  const details = encodeURIComponent(
    `Tarefa do seu plano de cuidado no app Mãe Amiga.`,
  )

  const startDate = task.due_date ? new Date(task.due_date) : new Date()
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // Add 1 hour

  const dates = `${formatToUTC(startDate)}/${formatToUTC(endDate)}`

  return `${baseUrl}&text=${title}&details=${details}&dates=${dates}`
}

export const generateOutlookCalendarLink = (task: PlannerTask): string => {
  const baseUrl = 'https://outlook.live.com/calendar/0/deeplink/compose'
  const title = encodeURIComponent(task.content)
  const body = encodeURIComponent(
    `Tarefa do seu plano de cuidado no app Mãe Amiga.`,
  )

  const startDate = task.due_date ? new Date(task.due_date) : new Date()
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // Add 1 hour

  const start = encodeURIComponent(format(startDate, "yyyy-MM-dd'T'HH:mm:ss"))
  const end = encodeURIComponent(format(endDate, "yyyy-MM-dd'T'HH:mm:ss"))

  return `${baseUrl}?subject=${title}&body=${body}&startdt=${start}&enddt=${end}&path=/calendar/action/compose&rru=addevent`
}
