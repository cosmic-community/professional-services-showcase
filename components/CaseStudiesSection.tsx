import { getCaseStudies } from '@/lib/cosmic'
import CaseStudyCard from '@/components/CaseStudyCard'

export default async function CaseStudiesSection() {
  const caseStudies = await getCaseStudies()

  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Case Studies</h2>
          <p className="section-subtitle">
            Real results for real businesses. Discover how we've helped clients 
            overcome challenges and achieve remarkable growth through strategic solutions.
          </p>
        </div>

        {caseStudies.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No case studies available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}