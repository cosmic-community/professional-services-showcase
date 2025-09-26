import { getServices } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'

export default async function ServicesSection() {
  const services = await getServices()

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive digital solutions tailored to your business needs. 
            From strategy to execution, we deliver excellence at every step.
          </p>
        </div>

        {services.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}