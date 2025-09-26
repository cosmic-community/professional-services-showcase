import { TeamMember } from '@/types'

interface TeamMemberCardProps {
  member: TeamMember
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const { metadata } = member
  
  return (
    <div className="card text-center group hover:border-primary-200 transition-all duration-300">
      {metadata?.photo && (
        <div className="mb-6">
          <img
            src={`${metadata.photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={metadata.name || member.title}
            width="100"
            height="100"
            className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary-100 group-hover:border-primary-200 transition-colors duration-300"
          />
        </div>
      )}
      
      <h3 className="text-xl font-bold text-gray-900 mb-1">
        {metadata?.name || member.title}
      </h3>
      
      {metadata?.title && (
        <p className="text-primary-600 font-medium mb-4">
          {metadata.title}
        </p>
      )}
      
      {metadata?.bio && (
        <p className="text-gray-600 text-sm mb-6">
          {metadata.bio}
        </p>
      )}
      
      {metadata?.skills && metadata.skills.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {metadata.skills.slice(0, 6).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-center space-x-4">
        {metadata?.email && (
          <a
            href={`mailto:${metadata.email}`}
            className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
            aria-label="Email"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </a>
        )}
        {metadata?.linkedin && (
          <a
            href={metadata.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}