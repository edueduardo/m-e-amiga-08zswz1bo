import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { HomePageLayoutItem } from '@/types'
import {
  getUserPreferences,
  updateUserHomePageLayout,
} from '@/services/userPreferences'
import { useAuth } from '@/contexts/AuthContext'

export const defaultDashboardCards = [
  { id: 'care', title: 'Cuidar de mim hoje', visible: true },
  { id: 'coaching', title: 'Coaching com IA', visible: true },
  { id: 'self-knowledge', title: 'Autoconhecimento', visible: true },
  { id: 'journal', title: 'Diário Hoʻoponopono', visible: true },
  { id: 'music', title: 'Músicas e Meditações', visible: true },
  { id: 'support-circle', title: 'Círculo de Apoio', visible: true },
  { id: 'courses', title: 'Minicursos', visible: true },
  { id: 'planner', title: 'Meu Plano', visible: true },
  { id: 'challenges', title: 'Desafios', visible: true },
  {
    id: 'community-challenges',
    title: 'Desafios da Comunidade',
    visible: true,
  },
  { id: 'growth-garden', title: 'Jardim do Crescimento', visible: true },
  { id: 'library', title: 'Biblioteca', visible: true },
  { id: 'summary', title: 'Como foi minha semana?', visible: true },
  { id: 'profile', title: 'Minha Jornada', visible: true },
  { id: 'settings', title: 'Configurações', visible: true },
]

interface LayoutContextType {
  layout: HomePageLayoutItem[]
  isLoading: boolean
  updateLayout: (newLayout: HomePageLayoutItem[]) => Promise<void>
  resetLayout: () => Promise<void>
}

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined,
)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [layout, setLayout] = useState<HomePageLayoutItem[]>(
    defaultDashboardCards.map(({ id, visible }) => ({ id, visible })),
  )
  const [isLoading, setIsLoading] = useState(true)

  const fetchLayout = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    const prefs = await getUserPreferences(user.id)
    if (prefs.home_page_layout && prefs.home_page_layout.length > 0) {
      const savedLayoutMap = new Map(
        prefs.home_page_layout.map((item) => [item.id, item]),
      )
      const mergedLayout = defaultDashboardCards.map((card) => ({
        id: card.id,
        visible: savedLayoutMap.get(card.id)?.visible ?? card.visible,
      }))
      setLayout(mergedLayout)
    } else {
      setLayout(
        defaultDashboardCards.map(({ id, visible }) => ({ id, visible })),
      )
    }
    setIsLoading(false)
  }, [user])

  useEffect(() => {
    fetchLayout()
  }, [fetchLayout])

  const updateLayout = useCallback(
    async (newLayout: HomePageLayoutItem[]) => {
      if (!user) return
      setLayout(newLayout) // Optimistic update
      await updateUserHomePageLayout(user.id, newLayout)
    },
    [user],
  )

  const resetLayout = useCallback(async () => {
    const defaultLayout = defaultDashboardCards.map(({ id, visible }) => ({
      id,
      visible,
    }))
    await updateLayout(defaultLayout)
  }, [updateLayout])

  const value = useMemo(
    () => ({
      layout,
      isLoading,
      updateLayout,
      resetLayout,
    }),
    [layout, isLoading, updateLayout, resetLayout],
  )

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}
