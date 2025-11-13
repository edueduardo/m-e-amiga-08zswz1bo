import { Outlet, useLocation } from 'react-router-dom'
import { PublicHeader } from './PublicHeader'
import { Footer } from './Footer'
import { useAuth } from '@/hooks/useAuth'

export default function Layout() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  // AppLayout handles its own header/sidebar for /app/* routes
  const isAppRoute = location.pathname.startsWith('/app')
  if (isAppRoute) {
    return <Outlet />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
