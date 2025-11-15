import { useState } from 'react'
import { useSupportCircle } from '@/contexts/SupportCircleContext'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MessageCircle, PlusCircle, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const SupportCirclePage = () => {
  const { rooms, posts, addPost, addReply } = useSupportCircle()
  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0]?.id)
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newReplyContent, setNewReplyContent] = useState('')
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false)

  const roomPosts = posts.filter((p) => p.roomId === selectedRoomId)
  const selectedPost = posts.find((p) => p.id === selectedPostId)

  const handleAddPost = async () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      await addPost(selectedRoomId, newPostTitle, newPostContent)
      setNewPostTitle('')
      setNewPostContent('')
      setIsNewPostDialogOpen(false)
    }
  }

  const handleAddReply = async () => {
    if (newReplyContent.trim() && selectedPostId) {
      await addReply(selectedPostId, newReplyContent)
      setNewReplyContent('')
    }
  }

  return (
    <div className="grid md:grid-cols-[350px_1fr] gap-6 h-[calc(100vh-8rem)]">
      <Card className="flex flex-col">
        <CardHeader className="p-4 border-b">
          <CardTitle className="text-lg">Salas Temáticas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-20rem)]">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  setSelectedRoomId(room.id)
                  setSelectedPostId(null)
                }}
                className={cn(
                  'w-full text-left p-4 hover:bg-secondary flex items-center gap-3',
                  selectedRoomId === room.id && 'bg-secondary',
                )}
              >
                <room.icon className="h-5 w-5 text-primary" />
                <span>{room.name}</span>
              </button>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <Dialog
            open={isNewPostDialogOpen}
            onOpenChange={setIsNewPostDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Nova Publicação
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Publicação</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Título do seu tópico"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Compartilhe o que está sentindo..."
                  rows={6}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button onClick={handleAddPost}>Publicar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <div className="grid grid-rows-[auto_1fr] gap-6 h-full">
        <Card>
          <CardHeader>
            <CardTitle>
              Publicações em "{rooms.find((r) => r.id === selectedRoomId)?.name}
              "
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[200px]">
              {roomPosts.map((post) => (
                <button
                  key={post.id}
                  className={cn(
                    'w-full text-left p-3 border-b hover:bg-secondary',
                    selectedPostId === post.id && 'bg-secondary',
                  )}
                  onClick={() => setSelectedPostId(post.id)}
                >
                  <p className="font-semibold truncate">{post.title}</p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                    <span>por {post.authorAlias}</span>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {post.replies.length}
                    </div>
                  </div>
                </button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          {selectedPost ? (
            <>
              <CardHeader className="p-4 border-b">
                <CardTitle className="text-xl">{selectedPost.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-sm pt-1">
                  <span>por {selectedPost.authorAlias}</span>
                  <span>·</span>
                  <span>
                    {formatDistanceToNow(new Date(selectedPost.created_at), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                </CardDescription>
              </CardHeader>
              <ScrollArea className="flex-grow p-6">
                <p className="whitespace-pre-wrap mb-6 prose dark:prose-invert">
                  {selectedPost.content}
                </p>
                <Separator />
                <div className="py-4 space-y-6">
                  {selectedPost.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {reply.authorAlias.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 bg-secondary p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">
                            {reply.authorAlias}
                          </span>
                          <span className="text-muted-foreground">
                            {formatDistanceToNow(new Date(reply.created_at), {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <p className="mt-1 text-sm">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <CardFooter className="p-4 border-t bg-background">
                <div className="w-full flex items-center gap-2">
                  <Textarea
                    placeholder="Escreva uma resposta de apoio..."
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                    rows={1}
                    className="resize-none"
                  />
                  <Button onClick={handleAddReply}>Responder</Button>
                </div>
              </CardFooter>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
              <Users className="h-16 w-16 mb-4 text-primary" />
              <h3 className="text-xl font-semibold">
                Bem-vinda ao Círculo de Apoio
              </h3>
              <p>
                {roomPosts.length > 0
                  ? 'Escolha uma conversa na lista para ler e participar.'
                  : 'Seja a primeira a compartilhar algo nesta sala!'}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default SupportCirclePage
