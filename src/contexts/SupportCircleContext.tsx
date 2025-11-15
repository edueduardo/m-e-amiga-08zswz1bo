import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { SupportPost, SupportReply, ThematicRoom } from '@/types'
import { moderateSupportPost } from '@/lib/motherAi'
import { useAuth } from './AuthContext'
import {
  getRooms,
  getPosts,
  addPost as addPostService,
  addReply as addReplyService,
} from '@/services/supportCircle'
import { anonymousAliases } from '@/lib/data'

interface SupportCircleContextType {
  rooms: ThematicRoom[]
  posts: SupportPost[]
  isLoading: boolean
  fetchPostsForRoom: (roomId: string) => Promise<void>
  addPost: (roomId: string, title: string, content: string) => Promise<void>
  addReply: (postId: string, content: string) => Promise<void>
}

export const SupportCircleContext = createContext<
  SupportCircleContextType | undefined
>(undefined)

const getRandomAlias = () =>
  anonymousAliases[Math.floor(Math.random() * anonymousAliases.length)]

export function SupportCircleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [rooms, setRooms] = useState<ThematicRoom[]>([])
  const [posts, setPosts] = useState<SupportPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true)
      const data = await getRooms()
      setRooms(data)
      if (data.length > 0) {
        await fetchPostsForRoom(data[0].id)
      }
      setIsLoading(false)
    }
    fetchRooms()
  }, [])

  const fetchPostsForRoom = useCallback(async (roomId: string) => {
    setIsLoading(true)
    const data = await getPosts(roomId)
    setPosts(data)
    setIsLoading(false)
  }, [])

  const addPost = useCallback(
    async (roomId: string, title: string, content: string) => {
      if (!user) return
      const moderationResult = await moderateSupportPost(content)
      if (!moderationResult.isSafe) {
        alert(`Conteúdo inadequado: ${moderationResult.reason}`)
        return
      }
      const newPost = await addPostService(user.id, {
        roomId,
        authorAlias: getRandomAlias(),
        title,
        content,
      })
      if (newPost) {
        setPosts((prev) => [newPost, ...prev])
      }
    },
    [user],
  )

  const addReply = useCallback(
    async (postId: string, content: string) => {
      if (!user) return
      const moderationResult = await moderateSupportPost(content)
      if (!moderationResult.isSafe) {
        alert(`Conteúdo inadequado: ${moderationResult.reason}`)
        return
      }
      const newReply = await addReplyService(user.id, {
        postId,
        authorAlias: getRandomAlias(),
        content,
      })
      if (newReply) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, replies: [...p.replies, newReply] } : p,
          ),
        )
      }
    },
    [user],
  )

  const value = useMemo(
    () => ({
      rooms,
      posts,
      isLoading,
      fetchPostsForRoom,
      addPost,
      addReply,
    }),
    [rooms, posts, isLoading, fetchPostsForRoom, addPost, addReply],
  )

  return (
    <SupportCircleContext.Provider value={value}>
      {children}
    </SupportCircleContext.Provider>
  )
}

export const useSupportCircle = () => {
  const context = useContext(SupportCircleContext)
  if (context === undefined) {
    throw new Error(
      'useSupportCircle must be used within a SupportCircleProvider',
    )
  }
  return context
}
