import { Outlet } from 'react-router-dom'
import { AuthenticatedHeader } from './AuthenticatedHeader'
import { AppSidebar } from './AppSidebar'

export const AppLayout = () => {
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
