import { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { metadata } = testimonial
  
  // Convert rating key to number for star rendering
  const rating = metadata?.rating ? parseInt(metadata.rating.key) : 5
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < rating
      return (
        <svg
          key={index}
          className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            clipRule="evenodd"
          />
        </svg>
      )
    })
  }
  
  return (
    <div className="card group hover:border-primary-200 transition-all duration-300">
      {/* Rating Stars */}
      <div className="flex text-yellow-400 mb-4">
        {renderStars(rating)}
      </div>
      
      {/* Testimonial Text */}
      {metadata?.testimonial && (
        <blockquote className="text-gray-700 mb-6 italic">
          "{metadata.testimonial}"
        </blockquote>
      )}
      
      {/* Client Info */}
      <div className="flex items-center mt-auto">
        {metadata?.photo && (
          <img
            src={`${metadata.photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
            alt={metadata.client_name || ''}
            width="50"
            height="50"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        )}
        
        <div className="flex-1">
          {metadata?.client_name && (
            <p className="font-semibold text-gray-900">
              {metadata.client_name}
            </p>
          )}
          {metadata?.position && metadata?.company && (
            <p className="text-sm text-gray-600">
              {metadata.position} at {metadata.company}
            </p>
          )}
        </div>
        
        {metadata?.company_logo && (
          <img
            src={`${metadata.company_logo.imgix_url}?w=80&h=40&fit=crop&auto=format,compress`}
            alt={metadata.company || ''}
            width="40"
            height="20"
            className="w-10 h-5 object-contain opacity-60"
          />
        )}
      </div>
    </div>
  )
}