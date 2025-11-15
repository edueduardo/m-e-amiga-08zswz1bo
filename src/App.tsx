/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

// Context Providers
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ConversationsProvider } from './contexts/ConversationsContext'
import { AiResponseProvider } from './contexts/AiResponseContext'
import { SelfCareProvider } from './contexts/SelfCareContext'
import { CoachingProvider } from './contexts/CoachingContext'
import { SelfKnowledgeProvider } from './contexts/SelfKnowledgeContext'
import { SupportCircleProvider } from './contexts/SupportCircleContext'
import { PlannerProvider } from './contexts/PlannerContext'
import { ChallengesProvider } from './contexts/ChallengesContext'
import { GamificationProvider } from './contexts/GamificationContext'
import { GrowthGardenProvider } from './contexts/GrowthGardenContext'
import { PlaylistProvider } from './contexts/PlaylistContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { UserPreferencesProvider } from './contexts/UserPreferencesContext'
import { VirtualManProvider } from './contexts/VirtualManContext'
import { LayoutProvider } from './contexts/LayoutContext'

// Layouts
import Layout from './components/Layout'
import { AppLayout } from './components/AppLayout'

// Pages
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import CookiePolicyPage from './pages/CookiePolicy'
import ForgotPasswordPage from './pages/ForgotPassword'
import LoginPage from './pages/Login'
import PricingPage from './pages/Pricing'
import ResetPasswordPage from './pages/ResetPassword'
import SignupPage from './pages/Signup'
import TermsOfUsePage from './pages/TermsOfUse'
import VerifyEmailPage from './pages/VerifyEmail'
import VerifyPhoneNumberByEmailPage from './pages/VerifyPhoneNumberByEmail'

// App Pages
import AdminPage from './pages/app/Admin'
import CarePage from './pages/app/Care'
import ChallengesPage from './pages/app/Challenges'
import CoachingPage from './pages/app/Coaching'
import CommunityChallengesPage from './pages/app/CommunityChallenges'
import ConversationsPage from './pages/app/Conversations'
import CourseDetailPage from './pages/app/CourseDetail'
import CoursesPage from './pages/app/Courses'
import DashboardPage from './pages/app/Dashboard'
import GrowthGardenPage from './pages/app/GrowthGarden'
import HooponoponoJournalPage from './pages/app/HooponoponoJournal'
import LibraryPage from './pages/app/Library'
import MusicPage from './pages/app/Music'
import PlannerPage from './pages/app/Planner'
import ProfilePage from './pages/app/Profile'
import ResponsePage from './pages/app/Response'
import SelfKnowledgePage from './pages/app/SelfKnowledge'
import SettingsPage from './pages/app/Settings'
import SummaryPage from './pages/app/Summary'
import SupportCirclePage from './pages/app/SupportCircle'
import VirtualManPage from './pages/app/VirtualMan'

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="mae-amiga-ui-theme">
    <AuthProvider>
      <UserPreferencesProvider>
        <NotificationProvider>
          <ConversationsProvider>
            <AiResponseProvider>
              <SelfCareProvider>
                <CoachingProvider>
                  <SelfKnowledgeProvider>
                    <SupportCircleProvider>
                      <PlannerProvider>
                        <ChallengesProvider>
                          <GamificationProvider>
                            <GrowthGardenProvider>
                              <PlaylistProvider>
                                <VirtualManProvider>
                                  <LayoutProvider>
                                    <BrowserRouter>
                                      <TooltipProvider>
                                        <Toaster />
                                        <Sonner />
                                        <Routes>
                                          <Route element={<Layout />}>
                                            <Route
                                              path="/"
                                              element={<Index />}
                                            />
                                            <Route
                                              path="/about"
                                              element={<AboutPage />}
                                            />
                                            <Route
                                              path="/contact"
                                              element={<ContactPage />}
                                            />
                                            <Route
                                              path="/cookie-policy"
                                              element={<CookiePolicyPage />}
                                            />
                                            <Route
                                              path="/forgot-password"
                                              element={<ForgotPasswordPage />}
                                            />
                                            <Route
                                              path="/login"
                                              element={<LoginPage />}
                                            />
                                            <Route
                                              path="/pricing"
                                              element={<PricingPage />}
                                            />
                                            <Route
                                              path="/reset-password"
                                              element={<ResetPasswordPage />}
                                            />
                                            <Route
                                              path="/signup"
                                              element={<SignupPage />}
                                            />
                                            <Route
                                              path="/terms-of-use"
                                              element={<TermsOfUsePage />}
                                            />
                                            <Route
                                              path="/verify-email"
                                              element={<VerifyEmailPage />}
                                            />
                                            <Route
                                              path="/verify-phone-by-email"
                                              element={
                                                <VerifyPhoneNumberByEmailPage />
                                              }
                                            />
                                          </Route>
                                          <Route
                                            path="/app"
                                            element={<AppLayout />}
                                          >
                                            <Route
                                              index
                                              element={<DashboardPage />}
                                            />
                                            <Route
                                              path="admin"
                                              element={<AdminPage />}
                                            />
                                            <Route
                                              path="care"
                                              element={<CarePage />}
                                            />
                                            <Route
                                              path="challenges"
                                              element={<ChallengesPage />}
                                            />
                                            <Route
                                              path="coaching"
                                              element={<CoachingPage />}
                                            />
                                            <Route
                                              path="community-challenges"
                                              element={
                                                <CommunityChallengesPage />
                                              }
                                            />
                                            <Route
                                              path="conversations"
                                              element={<ConversationsPage />}
                                            />
                                            <Route
                                              path="courses"
                                              element={<CoursesPage />}
                                            />
                                            <Route
                                              path="courses/:slug"
                                              element={<CourseDetailPage />}
                                            />
                                            <Route
                                              path="growth-garden"
                                              element={<GrowthGardenPage />}
                                            />
                                            <Route
                                              path="journal"
                                              element={
                                                <HooponoponoJournalPage />
                                              }
                                            />
                                            <Route
                                              path="library"
                                              element={<LibraryPage />}
                                            />
                                            <Route
                                              path="music"
                                              element={<MusicPage />}
                                            />
                                            <Route
                                              path="planner"
                                              element={<PlannerPage />}
                                            />
                                            <Route
                                              path="profile"
                                              element={<ProfilePage />}
                                            />
                                            <Route
                                              path="response"
                                              element={<ResponsePage />}
                                            />
                                            <Route
                                              path="self-knowledge"
                                              element={<SelfKnowledgePage />}
                                            />
                                            <Route
                                              path="settings"
                                              element={<SettingsPage />}
                                            />
                                            <Route
                                              path="summary"
                                              element={<SummaryPage />}
                                            />
                                            <Route
                                              path="support-circle"
                                              element={<SupportCirclePage />}
                                            />
                                            <Route
                                              path="virtual-man"
                                              element={<VirtualManPage />}
                                            />
                                          </Route>
                                          <Route
                                            path="*"
                                            element={<NotFound />}
                                          />
                                        </Routes>
                                      </TooltipProvider>
                                    </BrowserRouter>
                                  </LayoutProvider>
                                </VirtualManProvider>
                              </PlaylistProvider>
                            </GrowthGardenProvider>
                          </GamificationProvider>
                        </ChallengesProvider>
                      </PlannerProvider>
                    </SupportCircleProvider>
                  </SelfKnowledgeProvider>
                </CoachingProvider>
              </SelfCareProvider>
            </AiResponseProvider>
          </ConversationsProvider>
        </NotificationProvider>
      </UserPreferencesProvider>
    </AuthProvider>
  </ThemeProvider>
)

export default App
