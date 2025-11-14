import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { SupportPost, SupportReply } from '@/types'
import {
  supportPosts as initialSupportPosts,
  anonymousAliases,
} from '@/lib/data'

const SUPPORT_CIRCLE_KEY = 'mae-amiga-support-circle'

interface SupportCircleContextType {
  posts: SupportPost[]
  addPost: (title: string, content: string) => void
  addReply: (postId: string, content: string) => void
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
      console.error('Failed to parse support posts', error)
      return initialSupportPosts
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(SUPPORT_CIRCLE_KEY, JSON.stringify(posts))
    } catch (error) {
      console.error('Failed to save support posts', error)
    }
  }, [posts])

  const addPost = useCallback((title: string, content: string) => {
    const newPost: SupportPost = {
      id: `post-${Date.now()}`,
      authorAlias: getRandomAlias(),
      title,
      content,
      created_at: new Date().toISOString(),
      replies: [],
    }
    setPosts((prevPosts) => [newPost, ...prevPosts])
  }, [])

  const addReply = useCallback((postId: string, content: string) => {
    const newReply: SupportReply = {
      id: `reply-${Date.now()}`,
      postId,
      authorAlias: getRandomAlias(),
      content,
      created_at: new Date().toISOString(),
    }
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, replies: [...post.replies, newReply] }
          : post,
      ),
    )
  }, [])

  const value = useMemo(
    () => ({
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
