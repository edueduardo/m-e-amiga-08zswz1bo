import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import {
  getReminders,
  addReminder,
  deleteReminder,
  updateReminder,
} from '@/services/reminders'
import { CustomReminder } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Trash2, PlusCircle, Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const CustomReminders = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [reminders, setReminders] = useState<CustomReminder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newMessage, setNewMessage] = useState('')
  const [newSchedule, setNewSchedule] = useState('0 9 * * *') // Default to 9 AM every day

  useEffect(() => {
    const fetchReminders = async () => {
      if (!user) return
      setIsLoading(true)
      const data = await getReminders(user.id)
      setReminders(data)
      setIsLoading(false)
    }
    fetchReminders()
  }, [user])

  const handleAddReminder = async () => {
    if (!user || !newMessage.trim() || !newSchedule.trim()) return
    const newReminder = await addReminder({
      user_id: user.id,
      message: newMessage,
      cron_schedule: newSchedule,
    })
    if (newReminder) {
      setReminders([newReminder, ...reminders])
      setNewMessage('')
      toast({ title: 'Lembrete adicionado!' })
    } else {
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar o lembrete.',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteReminder = async (id: string) => {
    const success = await deleteReminder(id)
    if (success) {
      setReminders(reminders.filter((r) => r.id !== id))
      toast({ title: 'Lembrete removido.' })
    }
  }

  const handleToggleReminder = async (id: string, isActive: boolean) => {
    const updatedReminder = await updateReminder(id, { is_active: isActive })
    if (updatedReminder) {
      setReminders(reminders.map((r) => (r.id === id ? updatedReminder : r)))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lembretes Personalizados</CardTitle>
        <CardDescription>
          Crie lembretes para suas atividades de autocuidado.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Mensagem do lembrete (ex: 'Respire fundo por 1 min')"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={handleAddReminder}>
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar
          </Button>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <p className="text-sm">{reminder.message}</p>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={reminder.is_active}
                    onCheckedChange={(checked) =>
                      handleToggleReminder(reminder.id, checked)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteReminder(reminder.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
