import Hero from '@/components/Hero'
import ServicesSection from '@/components/ServicesSection'
import TeamSection from '@/components/TeamSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesSection />
      <TeamSection />
      <CaseStudiesSection />
      <TestimonialsSection />
    </div>
  )
}