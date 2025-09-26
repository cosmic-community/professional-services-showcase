export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Transform Your Business with
            <span className="text-primary-600 block mt-2">
              Expert Digital Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
            We combine strategic thinking with cutting-edge technology to help businesses thrive in the digital age. 
            From concept to execution, we deliver results that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <a href="#services" className="btn-primary text-lg px-8 py-4">
              Explore Our Services
            </a>
            <a href="#case-studies" className="btn-secondary text-lg px-8 py-4">
              View Case Studies
            </a>
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-20 text-center">
          <blockquote className="text-lg md:text-xl text-gray-700 italic max-w-4xl mx-auto">
            "A verdadeira generosidade para com o futuro consiste em dar tudo ao presente"
          </blockquote>
          <cite className="block mt-4 text-gray-500 font-medium">
            — Albert Camus
          </cite>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            True generosity toward the future consists in giving everything to the present. 
            We believe in creating lasting impact through dedicated expertise and innovative solutions.
          </p>
        </div>
      </div>
    </section>
  )
}