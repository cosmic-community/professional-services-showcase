import { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { metadata } = service
  
  return (
    <div className="card group hover:border-primary-200 transition-all duration-300">
      {metadata?.icon && (
        <div className="mb-6">
          <img
            src={`${metadata.icon.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
            alt={metadata.name || service.title}
            width="64"
            height="64"
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>
      )}
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {metadata?.name || service.title}
      </h3>
      
      {metadata?.short_description && (
        <p className="text-gray-600 mb-4">
          {metadata.short_description}
        </p>
      )}
      
      {metadata?.features && metadata.features.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
          <ul className="space-y-1">
            {metadata.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <svg className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex items-center justify-between mt-auto">
        {metadata?.starting_price && (
          <span className="text-2xl font-bold text-primary-600">
            {metadata.starting_price}
          </span>
        )}
        <button className="btn-primary text-sm px-4 py-2 group-hover:bg-primary-700 transition-colors duration-200">
          Learn More
        </button>
      </div>
    </div>
  )
}