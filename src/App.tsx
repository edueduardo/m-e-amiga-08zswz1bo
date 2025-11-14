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
import { PlaylistProvider } from './contexts/PlaylistContext'
import { JournalProvider } from './contexts/JournalContext'
import { ChallengesProvider } from './contexts/ChallengesContext'
import { PlannerProvider } from './contexts/PlannerContext'
import { SelfCareProvider } from './contexts/SelfCareContext'
import { CoachingProvider } from './contexts/CoachingContext'
import { SelfKnowledgeProvider } from './contexts/SelfKnowledgeContext'
import { GrowthGardenProvider } from './contexts/GrowthGardenContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { LayoutProvider } from './contexts/LayoutContext'
import { VirtualManProvider } from './contexts/VirtualManContext'

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
import CookiePolicyPage from './pages/CookiePolicy'
import TermsOfUsePage from './pages/TermsOfUse'
import ContactPage from './pages/Contact'
import AboutPage from './pages/About'
import DashboardPage from './pages/app/Dashboard'
import ConversationsPage from './pages/app/Conversations'
import CarePage from './pages/app/Care'
import ResponsePage from './pages/app/Response'
import SupportCirclePage from './pages/app/SupportCircle'
import CoursesPage from './pages/app/Courses'
import CourseDetailPage from './pages/app/CourseDetail'
import SummaryPage from './pages/app/Summary'
import SettingsPage from './pages/app/Settings'
import MusicPage from './pages/app/Music'
import PlannerPage from './pages/app/Planner'
import ChallengesPage from './pages/app/Challenges'
import CommunityChallengesPage from './pages/app/CommunityChallenges'
import LibraryPage from './pages/app/Library'
import HooponoponoJournalPage from './pages/app/HooponoponoJournal'
import ProfilePage from './pages/app/Profile'
import CoachingPage from './pages/app/Coaching'
import SelfKnowledgePage from './pages/app/SelfKnowledge'
import GrowthGardenPage from './pages/app/GrowthGarden'
import VirtualManPage from './pages/app/VirtualMan'
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
      <ThemeProvider defaultTheme="system" storageKey="mae-amiga-ui-theme">
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
                  <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                  />
                  <Route path="/verify-email" element={<VerifyEmailPage />} />
                  <Route
                    path="/verify-phone-by-email"
                    element={<VerifyPhoneNumberByEmailPage />}
                  />
                  <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                  <Route path="/terms-of-use" element={<TermsOfUsePage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/about" element={<AboutPage />} />

                  <Route
                    path="/app"
                    element={
                      <ProtectedRoute>
                        <NotificationProvider>
                          <LayoutProvider>
                            <GamificationProvider>
                              <ConversationsProvider>
                                <GrowthGardenProvider>
                                  <SupportCircleProvider>
                                    <SelfCareProvider>
                                      <AiResponseProvider>
                                        <PlaylistProvider>
                                          <JournalProvider>
                                            <ChallengesProvider>
                                              <PlannerProvider>
                                                <CoachingProvider>
                                                  <SelfKnowledgeProvider>
                                                    <VirtualManProvider>
                                                      <AppLayout />
                                                    </VirtualManProvider>
                                                  </SelfKnowledgeProvider>
                                                </CoachingProvider>
                                              </PlannerProvider>
                                            </ChallengesProvider>
                                          </JournalProvider>
                                        </PlaylistProvider>
                                      </AiResponseProvider>
                                    </SelfCareProvider>
                                  </SupportCircleProvider>
                                </GrowthGardenProvider>
                              </ConversationsProvider>
                            </GamificationProvider>
                          </LayoutProvider>
                        </NotificationProvider>
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<DashboardPage />} />
                    <Route
                      path="conversations"
                      element={<ConversationsPage />}
                    />
                    <Route path="virtual-man" element={<VirtualManPage />} />
                    <Route path="coaching" element={<CoachingPage />} />
                    <Route
                      path="self-knowledge"
                      element={<SelfKnowledgePage />}
                    />
                    <Route path="care" element={<CarePage />} />
                    <Route path="response" element={<ResponsePage />} />
                    <Route
                      path="journal"
                      element={<HooponoponoJournalPage />}
                    />
                    <Route path="music" element={<MusicPage />} />
                    <Route
                      path="support-circle"
                      element={<SupportCirclePage />}
                    />
                    <Route path="courses" element={<CoursesPage />} />
                    <Route
                      path="courses/:slug"
                      element={<CourseDetailPage />}
                    />
                    <Route path="planner" element={<PlannerPage />} />
                    <Route path="challenges" element={<ChallengesPage />} />
                    <Route
                      path="community-challenges"
                      element={<CommunityChallengesPage />}
                    />
                    <Route
                      path="growth-garden"
                      element={<GrowthGardenPage />}
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
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
