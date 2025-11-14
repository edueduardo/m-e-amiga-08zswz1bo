import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from './contexts/AuthContext'
import { ConversationsProvider } from './contexts/ConversationsContext'
import { SupportCircleProvider } from './contexts/SupportCircleContext'
import { AiResponseProvider } from './contexts/AiResponseContext'
import { UserPreferencesProvider } from './contexts/UserPreferencesContext'
import { GamificationProvider } from './contexts/GamificationContext'

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
import VerifyPhoneNumberByEmailPage from './pages/VerifyPhoneNumberByEmail'
import DashboardPage from './pages/app/Dashboard'
import ConversationsPage from './pages/app/Conversations'
import CarePage from './pages/app/Care'
import ResponsePage from './pages/app/Response'
import SupportCirclePage from './pages/app/SupportCircle'
import CoursesPage from './pages/app/Courses'
import CourseDetailPage from './pages/app/CourseDetail'
import SummaryPage from './pages/app/Summary'
import SettingsPage from './pages/app/Settings'
import MeditationsPage from './pages/app/Meditations'
import PlannerPage from './pages/app/Planner'
import ChallengesPage from './pages/app/Challenges'
import CommunityChallengesPage from './pages/app/CommunityChallenges'
import LibraryPage from './pages/app/Library'
import HooponoponoJournalPage from './pages/app/HooponoponoJournal'
import ProfilePage from './pages/app/Profile'
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
        <UserPreferencesProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route
                  path="/verify-phone-by-email"
                  element={<VerifyPhoneNumberByEmailPage />}
                />

                <Route
                  path="/app"
                  element={
                    <ProtectedRoute>
                      <ConversationsProvider>
                        <SupportCircleProvider>
                          <AiResponseProvider>
                            <GamificationProvider>
                              <AppLayout />
                            </GamificationProvider>
                          </AiResponseProvider>
                        </SupportCircleProvider>
                      </ConversationsProvider>
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardPage />} />
                  <Route path="conversations" element={<ConversationsPage />} />
                  <Route path="care" element={<CarePage />} />
                  <Route path="response" element={<ResponsePage />} />
                  <Route path="journal" element={<HooponoponoJournalPage />} />
                  <Route path="meditations" element={<MeditationsPage />} />
                  <Route
                    path="support-circle"
                    element={<SupportCirclePage />}
                  />
                  <Route path="courses" element={<CoursesPage />} />
                  <Route path="courses/:slug" element={<CourseDetailPage />} />
                  <Route path="planner" element={<PlannerPage />} />
                  <Route path="challenges" element={<ChallengesPage />} />
                  <Route
                    path="community-challenges"
                    element={<CommunityChallengesPage />}
                  />
                  <Route path="library" element={<LibraryPage />} />
                  <Route path="summary" element={<SummaryPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </UserPreferencesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
