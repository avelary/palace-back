# Palace – Luxury Perfume E-commerce Platform

**Full-stack e-commerce platform** specialized in luxury perfumes, built with modern Node.js ecosystem and clean architecture principles.

### Key Features
- User authentication & registration (JWT-based)
- Role-based access control (RBAC) – Admin, Customer, Moderator
- Product catalog with search, filters, categories, and detailed views
- Shopping cart & order management
- Secure checkout with Stripe payment integration (card payments, webhooks)
- Customer dashboard: order history, profile management, saved addresses
- Admin dashboard: manage products, view orders, customer analytics, basic reports
- Responsive frontend with modern UI/UX

### Tech Stack
**Backend**
- Node.js + TypeScript
- Fastify (high-performance API framework)
- Prisma ORM + PostgreSQL
- JWT authentication & RBAC
- Swagger/OpenAPI documentation (interactive API docs)
- Clean Architecture, SOLID principles, Domain-Driven Design (DDD)

**Frontend**
- Next.js (App Router, SSR/SSG)
- React + TypeScript
- Tailwind CSS (or your styling choice)
- Zustand or Redux Toolkit (state management)
- Axios or Fetch for API calls

**DevOps & Tools**
- Docker (containerization)
- ESLint + Prettier (code quality)
- Husky + lint-staged (pre-commit hooks)
- GitHub Actions (CI/CD optional)

### Architecture Highlights
- Strict separation of concerns (DDD layers: domain, application, infrastructure, presentation)
- SOLID principles applied throughout (single responsibility, open-closed, etc.)
- Clean Code practices: meaningful names, small functions, high cohesion/low coupling
- Error handling centralized & consistent
- Input validation with Zod or class-validator

### API Documentation
Interactive Swagger docs available at:  
`/api-docs` or `/swagger` (after running the project)

### How to Run
```bash
# Backend
cd backend
npm/pnpm install
npm/pnpm run dev

# Frontend
cd frontend
npm/pnpm install
npm/pnpm run dev
