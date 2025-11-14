import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!user?.is_email_verified) {
    return <Navigate to="/verify-email" state={{ from: location }} replace />
  }

  return <>{children}</>
}
