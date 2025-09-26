import { getTestimonials } from '@/lib/cosmic'
import TestimonialCard from '@/components/TestimonialCard'

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials()

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here's what our clients have to say 
            about working with our team and the results we've delivered.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No testimonials available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}