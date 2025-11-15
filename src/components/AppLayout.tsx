import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { AuthenticatedHeader } from './AuthenticatedHeader'
import { AppSidebar } from './AppSidebar'
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'

export const AppLayout = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <AppSidebar />
      </div>
      <div className="flex flex-col">
        <AuthenticatedHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/40">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
