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
import {
  supportPosts as initialSupportPosts,
  anonymousAliases,
  thematicRooms,
} from '@/lib/data'
import { moderateSupportPost } from '@/lib/motherAi'

const SUPPORT_CIRCLE_KEY = 'mae-amiga-support-circle'

interface SupportCircleContextType {
  rooms: ThematicRoom[]
  posts: SupportPost[]
  addPost: (roomId: string, title: string, content: string) => Promise<void>
  addReply: (postId: string, content: string) => Promise<void>
}

export const SupportCircleContext = createContext<
  SupportCircleContextType | undefined
>(undefined)

const getRandomAlias = () =>
  anonymousAliases[Math.floor(Math.random() * anonymousAliases.length)]

export function SupportCircleProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<SupportPost[]>(() => {
    try {
      const stored = localStorage.getItem(SUPPORT_CIRCLE_KEY)
      return stored ? JSON.parse(stored) : initialSupportPosts
    } catch (error) {
      return initialSupportPosts
    }
  })

  useEffect(() => {
    localStorage.setItem(SUPPORT_CIRCLE_KEY, JSON.stringify(posts))
  }, [posts])

  const addPost = useCallback(
    async (roomId: string, title: string, content: string) => {
      const moderationResult = await moderateSupportPost(content)
      if (!moderationResult.isSafe) {
        alert(`Conteúdo inadequado: ${moderationResult.reason}`)
        return
      }
      const newPost: SupportPost = {
        id: `post-${Date.now()}`,
        roomId,
        authorAlias: getRandomAlias(),
        title,
        content,
        created_at: new Date().toISOString(),
        replies: [],
      }
      setPosts((prev) => [newPost, ...prev])
    },
    [],
  )

  const addReply = useCallback(async (postId: string, content: string) => {
    const moderationResult = await moderateSupportPost(content)
    if (!moderationResult.isSafe) {
      alert(`Conteúdo inadequado: ${moderationResult.reason}`)
      return
    }
    const newReply: SupportReply = {
      id: `reply-${Date.now()}`,
      postId,
      authorAlias: getRandomAlias(),
      content,
      created_at: new Date().toISOString(),
    }
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, replies: [...p.replies, newReply] } : p,
      ),
    )
  }, [])

  const value = useMemo(
    () => ({
      rooms: thematicRooms,
      posts,
      addPost,
      addReply,
    }),
    [posts, addPost, addReply],
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
