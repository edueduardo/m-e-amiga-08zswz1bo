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
import { plannerTasks as initialTasks } from '@/lib/data'

const PLANNER_KEY = 'mae-amiga-planner-tasks'

interface PlannerContextType {
  tasks: PlannerTask[]
  addTask: (content: string) => void
  updateTaskStatus: (taskId: string, newStatus: PlannerTaskStatus) => void
}

export const PlannerContext = createContext<PlannerContextType | undefined>(
  undefined,
)

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<PlannerTask[]>(() => {
    try {
      const stored = localStorage.getItem(PLANNER_KEY)
      return stored ? JSON.parse(stored) : initialTasks
    } catch (error) {
      console.error('Failed to parse planner tasks', error)
      return initialTasks
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(PLANNER_KEY, JSON.stringify(tasks))
    } catch (error) {
      console.error('Failed to save planner tasks', error)
    }
  }, [tasks])

  const addTask = useCallback((content: string) => {
    if (content.trim()) {
      const newTask: PlannerTask = {
        id: `task-${Date.now()}`,
        content,
        status: 'todo',
        due_date: new Date().toISOString(),
      }
      setTasks((prev) => [...prev, newTask])
    }
  }, [])

  const updateTaskStatus = useCallback(
    (taskId: string, newStatus: PlannerTaskStatus) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      )
    },
    [],
  )

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      updateTaskStatus,
    }),
    [tasks, addTask, updateTaskStatus],
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
