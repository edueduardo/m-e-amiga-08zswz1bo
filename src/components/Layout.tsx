import { Outlet } from 'react-router-dom'
import { PublicHeader } from './PublicHeader'
import { Footer } from './Footer'
import { CookieConsentBanner } from './CookieConsentBanner'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  )
}
