# SecureSight CCTV Dashboard

A modern CCTV monitoring dashboard built with Next.js 15, featuring real-time incident management, advanced timeline visualization, and professional security monitoring capabilities.

## Features Implemented

- **Navbar**: Top navigation with MANDLACX branding and user profile
- **Interactive Timeline**: 5-minute precision timeline with playbook controls and scrollable interface
- **Incident Player**: Left panel with video player and camera thumbnails
- **Incident List**: Right panel with enhanced status indicators and overlapping visual elements
- **Real-time Updates**: SWR for data fetching with optimistic UI updates
- **Incident Management**: Mark incidents as resolved with instant UI feedback
- **Professional UI**: Dark theme with golden accents and enhanced visual hierarchy
- **Responsive Design**: Tailwind CSS for responsive layout across all devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS with custom scrollbar hiding
- **Data Fetching**: SWR for client-side data management
- **Icons**: Lucide React
- **State Management**: React hooks with optimistic updates

## Database Schema

- **Camera**: ID, name, location, created timestamp
- **Incident**: ID, camera relation, type, timestamps, thumbnail, resolved status

## Tech Decisions

### Framework Choice: Next.js 15
- **Rationale**: Latest App Router provides excellent TypeScript support and server-side rendering capabilities
- **Benefits**: Built-in API routes, automatic code splitting, and optimized performance
- **Trade-offs**: Bleeding edge version may have limited community resources for edge cases

### Database: SQLite with Prisma
- **Rationale**: Simple setup for development with type-safe database operations
- **Benefits**: Zero configuration, excellent TypeScript integration, easy migrations
- **Production Consideration**: Would recommend PostgreSQL for production deployment

### Styling: Tailwind CSS
- **Rationale**: Utility-first approach enables rapid prototyping and consistent design
- **Benefits**: Built-in responsive utilities, dark mode support, and custom color schemes
- **Implementation**: Custom scrollbar hiding across all browsers for clean UI

### State Management: SWR + React Hooks
- **Rationale**: Lightweight solution for data fetching with automatic revalidation
- **Benefits**: Built-in caching, optimistic updates, and error handling
- **Alternative Considered**: React Query (now TanStack Query) - SWR chosen for simplicity

### Timeline Implementation: SVG-based
- **Rationale**: Precise positioning and scalability for time-based visualization
- **Benefits**: 9000px width supports detailed 5-minute intervals with smooth scrolling
- **Performance**: Optimized with proper viewport management and sticky positioning

## Deployment Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Database Setup for Production
```bash
# Set production database URL
export DATABASE_URL="postgresql://username:password@host:port/database"

# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed production data (optional)
npm run db:seed
```

### Environment Variables
Create `.env.local` for production:
```bash
DATABASE_URL="your_production_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="https://yourdomain.com"
```

## If I Had More Time...

### 🎯 Core Functionality
- **Real-time WebSocket Integration**: Live incident streaming and real-time notifications
- **Video Playback**: Actual video player with seek controls and frame-by-frame navigation
- **Multi-camera Views**: Picture-in-picture and grid view layouts
- **Advanced Filtering**: Filter incidents by type, camera, time range, and resolution status

### 🔐 Security & Authentication
- **Role-based Access Control**: Admin, operator, and viewer permissions
- **Authentication System**: NextAuth.js with OAuth providers and JWT tokens
- **Audit Logging**: Track all user actions and system events
- **API Rate Limiting**: Protect endpoints from abuse

### 📊 Analytics & Reporting
- **Dashboard Analytics**: Incident trends, camera health, and performance metrics
- **Export Functionality**: PDF reports and CSV data export
- **Incident Statistics**: Heat maps, time-based analysis, and pattern recognition
- **Alert System**: Email/SMS notifications for critical incidents

### 🎨 UX/UI Enhancements
- **Keyboard Shortcuts**: Quick navigation and incident management hotkeys
- **Drag & Drop**: Reorder cameras and customize layout
- **Dark/Light Mode Toggle**: User preference settings
- **Advanced Timeline**: Zoom levels, bookmarks, and incident clustering

### 🔧 Technical Improvements
- **Performance Optimization**: Virtual scrolling for large incident lists
- **Offline Support**: Progressive Web App with offline incident caching
- **Testing Suite**: Unit tests, integration tests, and E2E testing with Playwright
- **Monitoring**: Error tracking with Sentry and performance monitoring

### 🏗️ Architecture & Scalability
- **Microservices**: Separate services for video processing, notifications, and analytics
- **CDN Integration**: Optimized image and video delivery
- **Load Balancing**: Horizontal scaling for high-traffic scenarios
- **Database Optimization**: Indexing strategies and query optimization

### 📱 Mobile & Accessibility
- **Mobile App**: React Native companion app for on-the-go monitoring
- **Accessibility**: WCAG 2.1 compliance with screen reader support
- **PWA Features**: Push notifications and native app-like experience


## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

3. Seed with sample data:
   ```bash
   npm run db:seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the dashboard

## PowerShell Helpers

- `.\check-status.ps1` - Check project status and requirements
- `.\start-dev.ps1` - Quick start development server
