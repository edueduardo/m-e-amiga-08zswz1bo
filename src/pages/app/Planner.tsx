import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle, Calendar as CalendarIcon } from 'lucide-react'
import { PlannerTaskStatus } from '@/types'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  generateGoogleCalendarLink,
  generateOutlookCalendarLink,
} from '@/lib/calendar'
import { usePlanner } from '@/contexts/PlannerContext'

const statusMap: Record<
  PlannerTaskStatus,
  { title: string; bg: string; border: string }
> = {
  todo: { title: 'Para Fazer', bg: 'bg-red-50', border: 'border-red-200' },
  'in-progress': {
    title: 'Fazendo',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  done: { title: 'Feito!', bg: 'bg-green-50', border: 'border-green-200' },
}

const PlannerColumn = ({ status }: { status: PlannerTaskStatus }) => {
  const { tasks, updateTaskStatus } = usePlanner()
  const { title, bg, border } = statusMap[status]
  const columnTasks = tasks.filter((t) => t.status === status)
  const otherStatuses = (Object.keys(statusMap) as PlannerTaskStatus[]).filter(
    (s) => s !== status,
  )

  return (
    <Card className={cn('flex flex-col', bg)}>
      <CardHeader className={cn('border-b', border)}>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3 flex-grow">
        {columnTasks.map((task) => (
          <Card key={task.id} className="bg-background p-3 shadow-sm">
            <div className="flex items-start justify-between">
              <p className="flex-grow pr-2">{task.content}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <a
                      href={generateGoogleCalendarLink(task)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Adicionar ao Google Agenda
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={generateOutlookCalendarLink(task)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Adicionar ao Outlook
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-2 mt-2">
              {otherStatuses.map((newStatus) => (
                <Button
                  key={newStatus}
                  size="sm"
                  variant="outline"
                  onClick={() => updateTaskStatus(task.id, newStatus)}
                >
                  {statusMap[newStatus].title}
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}

const PlannerPage = () => {
  const { addTask } = usePlanner()
  const [newTaskContent, setNewTaskContent] = useState('')

  const handleAddTask = () => {
    addTask(newTaskContent)
    setNewTaskContent('')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Meu Plano de Cuidado</h1>
        <p className="text-muted-foreground mt-1">
          Organize suas tarefas e compromissos com carinho.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Adicionar nova tarefa</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            placeholder="Ex: Marcar 15 minutos para meditar"
          />
          <Button onClick={handleAddTask} disabled={!newTaskContent.trim()}>
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar
          </Button>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-3 gap-6">
        {(Object.keys(statusMap) as PlannerTaskStatus[]).map((status) => (
          <PlannerColumn key={status} status={status} />
        ))}
      </div>
    </div>
  )
}

export default PlannerPage
