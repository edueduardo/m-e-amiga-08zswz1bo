import { Bell, CheckCheck, Sparkles, Users, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useNotifications } from '@/contexts/NotificationContext'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { NotificationType } from '@/types'

const notificationTypeMap: Record<
  NotificationType,
  { icon: React.ElementType; color: string }
> = {
  new_challenge: { icon: Sparkles, color: 'text-yellow-500' },
  circle_message: { icon: Users, color: 'text-blue-500' },
  app_update: { icon: Info, color: 'text-indigo-500' },
  generic: { icon: Bell, color: 'text-gray-500' },
}

export const NotificationCenter = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notificações</h3>
          {unreadCount > 0 && (
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={markAllAsRead}
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <ScrollArea className="h-96">
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const { icon: Icon, color } =
                notificationTypeMap[notification.notification_type] ||
                notificationTypeMap.generic
              return (
                <div
                  key={notification.id}
                  className={cn(
                    'p-4 border-b flex items-start gap-4 hover:bg-secondary cursor-pointer',
                    !notification.is_read && 'bg-primary/5',
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  {!notification.is_read && (
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  )}
                  <Icon
                    className={cn(
                      'h-5 w-5 mt-1 flex-shrink-0',
                      color,
                      notification.is_read && 'opacity-50',
                    )}
                  />
                  <div className="flex-grow">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(
                        new Date(notification.scheduled_at),
                        {
                          addSuffix: true,
                          locale: ptBR,
                        },
                      )}
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>Nenhuma notificação por aqui.</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
