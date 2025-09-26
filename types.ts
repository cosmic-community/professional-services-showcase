// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Service interface
export interface Service extends CosmicObject {
  type: 'services';
  metadata: {
    name?: string;
    short_description?: string;
    description?: string;
    features?: string[];
    starting_price?: string;
    icon?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Team Member interface
export interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    name?: string;
    title?: string;
    bio?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    linkedin?: string;
    skills?: string[];
  };
}

// Testimonial interface
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name?: string;
    company?: string;
    position?: string;
    testimonial?: string;
    rating?: {
      key: string;
      value: string;
    };
    photo?: {
      url: string;
      imgix_url: string;
    };
    company_logo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Case Study interface
export interface CaseStudy extends CosmicObject {
  type: 'case-studies';
  metadata: {
    title?: string;
    client?: string;
    industry?: string;
    overview?: string;
    challenge?: string;
    solution?: string;
    results?: string;
    metrics?: Record<string, string>;
    images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    services?: Service[];
    duration?: string;
  };
}

// API response interface
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isService(obj: CosmicObject): obj is Service {
  return obj.type === 'services';
}

export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type === 'team-members';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}

export function isCaseStudy(obj: CosmicObject): obj is CaseStudy {
  return obj.type === 'case-studies';
}

// Rating type for testimonials
export type RatingKey = '5' | '4' | '3';
export type RatingValue = '5 Stars' | '4 Stars' | '3 Stars';