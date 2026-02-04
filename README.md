# CCR Admin Dashboard

A premium, high-fidelity Next.js dashboard template designed for AI-driven applications and modern SaaS platforms. Built with a focus on aesthetics, developer experience, and scalability.

![Project Preview](https://github.com/user-attachments/assets/placeholder)

## ✨ Features

### 🤖 AI Management Suite
- **Model Providers**: centralized configuration for Anthropic, OpenAI, Google Gemini, and Groq.
- **Routing Engine**: Intelligent request dispatching using Regex and Keyword patterns.
- **Transformers**: UI for managing data transformation logic.
- **Live Logs**: Real-time monitoring of AI interactions and system performance.

### 📋 Workflow & Productivity
- **Advanced Kanban**: high-performance drag-and-drop board for task management with detailed task views and asset uploading.
- **Unified Messaging**: Professional-grade Chat and Email interfaces.
- **Calendar**: Full-featured scheduling system with event management.

### 📊 Business Intelligence
- **Real-time Analytics**: interactive dashboards tracking engagement, bounce rates, and user sessions.
- **Key Statistics**: Financial overview and demographic analysis with premium gradient styling.
- **CRM Lite**: Customer and Sales management tables powered by `@tanstack/react-table`.

### 🛠️ Developer Infrastructure
- **Component Library**: A massive gallery of UI primitives (Dialogs, Sliders, Date Pickers, Selects) in a consistent design system.
- **Database Studio**: Integrated viewer for schema migrations and table management (via Drizzle Kit).
- **Glassmorphism Design**: A custom system leveraging Tailwind 4, backdrop filters, and sleek dark mode support.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Runtime**: [React 19](https://react.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Database**: [Drizzle ORM](https://orm.drizzle.team/) with [PostgreSQL](https://www.postgresql.org/)
- **Components**: [Radix UI](https://www.radix-ui.com/) + [Lucide Icons](https://lucide.dev/)
- **State/Data**: [Sonner](https://sonner.emilkowal.ski/) (Toasts)

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18+ 
- PNPM (recommended) or NPM
- A PostgreSQL database instance

### 2. Environment Setup
Create a `.env.local` file in the root:

```env
# Database
DATABASE_URL="your_postgres_connection_string"

# Authentication
AUTH_SECRET="your_auth_secret" # Generate with: npx auth secret

# Optional: AI Provider Keys
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
```

### 3. Installation & Database
```bash
# Install dependencies
pnpm install

# Push schema to database
pnpm drizzle-kit push
```

### 4. Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components and feature-specific modules.
- `src/hooks`: Custom React hooks for file uploads, auth, etc.
- `src/lib`: Shared utilities, actions, and navigation configuration.
- `src/db`: Database schema definitions and Drizzle client.

## 🎨 Design Philosophy

This template prioritizes a **"Visual First"** approach. Every component is crafted to look premium out of the box, using:
- **Tonal Elevate**: Strategic use of shadows and borders for depth.
- **Dynamic Interactions**: Hover states and micro-animations for better UX.
- **Adaptive Layout**: Fully responsive from mobile sidebars to complex desktop grids.

---

Built with ❤️ by your AI collaborator.
