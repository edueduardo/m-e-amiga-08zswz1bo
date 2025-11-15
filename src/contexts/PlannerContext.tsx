import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { PlannerTask, PlannerTaskStatus } from '@/types'
import { useAuth } from './AuthContext'
import {
  getPlannerTasks,
  addPlannerTask,
  updatePlannerTaskStatus as updateStatusService,
} from '@/services/planner'

interface PlannerContextType {
  tasks: PlannerTask[]
  isLoading: boolean
  addTask: (content: string) => Promise<void>
  updateTaskStatus: (
    taskId: string,
    newStatus: PlannerTaskStatus,
  ) => Promise<void>
}

export const PlannerContext = createContext<PlannerContextType | undefined>(
  undefined,
)

export function PlannerProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<PlannerTask[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        setIsLoading(true)
        const data = await getPlannerTasks(user.id)
        setTasks(data)
        setIsLoading(false)
      } else {
        setTasks([])
        setIsLoading(false)
      }
    }
    fetchTasks()
  }, [user])

  const addTask = useCallback(
    async (content: string) => {
      if (!user || !content.trim()) return
      const newTask = await addPlannerTask(user.id, content)
      if (newTask) {
        setTasks((prev) => [...prev, newTask])
      }
    },
    [user],
  )

  const updateTaskStatus = useCallback(
    async (taskId: string, newStatus: PlannerTaskStatus) => {
      const updatedTask = await updateStatusService(taskId, newStatus)
      if (updatedTask) {
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? updatedTask : task)),
        )
      }
    },
    [],
  )

  const value = useMemo(
    () => ({
      tasks,
      isLoading,
      addTask,
      updateTaskStatus,
    }),
    [tasks, isLoading, addTask, updateTaskStatus],
  )

  return (
    <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
  )
}

export const usePlanner = () => {
  const context = useContext(PlannerContext)
  if (context === undefined) {
    throw new Error('usePlanner must be used within a PlannerProvider')
  }
  return context
}
