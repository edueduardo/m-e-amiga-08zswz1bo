import { HeroSection } from '@/components/landing/HeroSection'
import { PainPointsSection } from '@/components/landing/PainPointsSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { AppFeaturesGrid } from '@/components/landing/AppFeaturesGrid'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { EthicalNoticeSection } from '@/components/landing/EthicalNoticeSection'

const Index = () => {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <HowItWorksSection />
      <AppFeaturesGrid />
      <TestimonialsSection />
      <PricingSection />
      <EthicalNoticeSection />
    </>
  )
}

export default Index
