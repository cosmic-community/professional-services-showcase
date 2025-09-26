# Professional Services Showcase

![App Preview](https://imgix.cosmicjs.com/e924e860-9adf-11f0-bd7f-6563eeca07df-photo-1460925895917-afdab827c52f-1758894688358.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive web application that showcases professional services, team expertise, client testimonials, and case studies. Built with Next.js and powered by Cosmic CMS for dynamic content management.

## Features

- **Services Portfolio** - Comprehensive service listings with descriptions, features, and pricing
- **Team Showcase** - Professional team member profiles with skills and experience
- **Client Testimonials** - Customer feedback with ratings and company information
- **Case Studies** - Detailed project breakdowns with results and metrics
- **Responsive Design** - Optimized for all devices and screen sizes
- **Modern UI/UX** - Clean, professional design with smooth animations
- **SEO Optimized** - Structured data and meta tags for search engines
- **Fast Performance** - Optimized images and efficient code structure

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d699bfe4b13704227fb84f&clone_repository=68d69b80e4b13704227fb875)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a company website with services, team members, testimonials, and case studies. "A verdadeira generosidade para com o futuro consiste em dar tudo ao presente" (Albert Camus)"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for a company website with services, team members, testimonials, and case studies. "A verdadeira generosidade para com o futuro consiste em dar tudo ao presente" (Albert Camus)", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **React** - Component-based UI library

## Getting Started

### Prerequisites

- Node.js 18+ 
- Bun package manager
- Cosmic account with content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Cosmic SDK Examples

### Fetching Services
```typescript
const services = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Getting Team Members
```typescript
const teamMembers = await cosmic.objects
  .find({ type: 'team-members' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Loading Testimonials
```typescript
const testimonials = await cosmic.objects
  .find({ type: 'testimonials' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket to display:

- **Services** - Service offerings with descriptions, features, and pricing
- **Team Members** - Team profiles with photos, bios, and skills
- **Testimonials** - Client feedback with ratings and company logos  
- **Case Studies** - Detailed project case studies with metrics and results

Content is fetched server-side for optimal performance and SEO. The application handles loading states, error conditions, and responsive image optimization.

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `bun run build`
3. Configure environment variables
4. Deploy

### Other Platforms
This Next.js application can be deployed to any platform that supports Node.js applications.

<!-- README_END -->