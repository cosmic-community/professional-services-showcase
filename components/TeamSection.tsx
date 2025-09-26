import { getTeamMembers } from '@/lib/cosmic'
import TeamMemberCard from '@/components/TeamMemberCard'

export default async function TeamSection() {
  const teamMembers = await getTeamMembers()

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Talented professionals dedicated to delivering exceptional results. 
            Our diverse expertise ensures comprehensive solutions for your business challenges.
          </p>
        </div>

        {teamMembers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No team members available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}