import { CaseStudy } from '@/types'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const { metadata } = caseStudy
  
  return (
    <div className="card group hover:border-primary-200 transition-all duration-300">
      {metadata?.images && metadata.images.length > 0 && (
        <div className="mb-6 -mx-6 -mt-6">
          <img
            src={`${metadata.images[0].imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
            alt={metadata.title || caseStudy.title}
            width="600"
            height="300"
            className="w-full h-48 object-cover rounded-t-xl"
          />
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {metadata?.title || caseStudy.title}
          </h3>
          {metadata?.client && (
            <p className="text-primary-600 font-medium">
              Client: {metadata.client}
            </p>
          )}
          {metadata?.industry && (
            <p className="text-gray-500 text-sm">
              Industry: {metadata.industry}
            </p>
          )}
        </div>
        {metadata?.duration && (
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {metadata.duration}
          </span>
        )}
      </div>
      
      {metadata?.overview && (
        <p className="text-gray-600 mb-6">
          {metadata.overview}
        </p>
      )}
      
      {metadata?.metrics && Object.keys(metadata.metrics).length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Key Results:</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(metadata.metrics).slice(0, 4).map(([key, value]) => (
              <div key={key} className="text-center p-3 bg-primary-50 rounded-lg">
                <p className="font-bold text-primary-700 text-sm">{value}</p>
                <p className="text-xs text-gray-600 capitalize">
                  {key.replace(/_/g, ' ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {metadata?.services && metadata.services.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Services Used:</h4>
          <div className="flex flex-wrap gap-2">
            {metadata.services.map((service) => (
              <span
                key={service.id}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {service.metadata?.name || service.title}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <button className="btn-primary w-full group-hover:bg-primary-700 transition-colors duration-200">
        View Full Case Study
      </button>
    </div>
  )
}