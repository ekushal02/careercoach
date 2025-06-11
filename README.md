# CareerCoach

CareerCoach is a modern career guidance web application built using **Next.js**, **Tailwind CSS**, and **Prisma**. It provides users with personalized career recommendations, skill-building resources, and resume management features through an intuitive UI and robust backend.

## 🚀 Features

- Personalized career recommendations based on user input
- Resume creation and editing with Markdown support
- Admin dashboard to manage resources and track engagement
- Integration with a PostgreSQL database via Prisma ORM
- Fully responsive design with Tailwind CSS
- Dynamic and animated UI for engaging user experience

## 🛠️ Tech Stack

- **Frontend**: React (Next.js), Tailwind CSS
- **Backend**: Node.js, Prisma ORM
- **Database**: PostgreSQL
- **Tooling**: ESLint, Prettier, Vercel (or similar for deployment)

## 📦 Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL (local or cloud)
- A `.env` file with proper DB connection string

### Installation

```bash
git clone https://github.com/ekushal02/careercoach.git
cd careercoach
npm install
```

### Running Locally
```bash
#Set up the database
npx prisma migrate dev

#Start the dev server
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```


