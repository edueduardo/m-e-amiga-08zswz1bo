import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from './contexts/AuthContext'

import Layout from './components/Layout'
import { AppLayout } from './components/AppLayout'
import { ProtectedRoute } from './components/ProtectedRoute'

import Index from './pages/Index'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import PricingPage from './pages/Pricing'
import ForgotPasswordPage from './pages/ForgotPassword'
import ResetPasswordPage from './pages/ResetPassword'
import VerifyEmailPage from './pages/VerifyEmail'
import VerifyPhonePage from './pages/VerifyPhone'
import DashboardPage from './pages/app/Dashboard'
import ConversationsPage from './pages/app/Conversations'
import CarePage from './pages/app/Care'
import CoursesPage from './pages/app/Courses'
import CourseDetailPage from './pages/app/CourseDetail'
import SummaryPage from './pages/app/Summary'
import SettingsPage from './pages/app/Settings'
import NotFound from './pages/NotFound'

const App = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration)
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError)
          })
      })
    }
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/verify-phone" element={<VerifyPhonePage />} />

              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="conversations" element={<ConversationsPage />} />
                <Route path="care" element={<CarePage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="courses/:slug" element={<CourseDetailPage />} />
                <Route path="summary" element={<SummaryPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
