# HR Dashboard

A modern HR dashboard built with Next.js, Tailwind CSS, and Zustand for managing employee performance and analytics.

## 📋 Features Implemented

### Core Features
- **Dashboard Homepage** - View all employees with performance ratings and action buttons
- **Employee Details** - Detailed employee profiles with tabbed interface (Overview, Projects, Feedback)
- **Bookmarks System** - Save and manage employees of interest
- **Search & Filtering** - Filter employees by name, department, and performance rating
- **Analytics Dashboard** - View department performance metrics and bookmark trends

### Technical Features
- Responsive design (mobile to desktop)
- Dark/Light mode support
- Custom hooks for search and bookmarks
- Zustand state management
- Dynamic charting with Chart.js
- Component-level loading and error states

## 🚀 Setup Instructions

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/krishna-nishant/hr-dashboard.git
cd hr-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
hr-dashboard/
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── page.tsx           # Dashboard homepage
│   │   ├── bookmarks/         # Bookmarked employees
│   │   ├── employee/          # Employee details
│   │   ├── analytics/         # Analytics dashboard
│   │   └── ...
│   ├── components/            # Reusable UI components
│   │   ├── UserCard.tsx       # Employee card component
│   │   ├── FilterBar.tsx      # Search and filter component
│   │   ├── employee/          # Employee page components
│   │   └── ...
│   ├── hooks/                 # Custom React hooks
│   │   ├── useSearch.ts       # Search and filter logic
│   │   └── ...
│   ├── store/                 # Zustand state management
│   │   └── useBookmarks.ts    # Bookmark state management
│   ├── services/              # API services
│   │   └── api.ts             # API calls for fetching data
│   ├── types/                 # TypeScript type definitions
│   │   └── user.ts            # User and related types
│   └── utils/                 # Utility functions
│       └── mockDataGenerator.ts # Generate mock data
├── public/                    # Static assets
│   └── screenshots/           # Application screenshots
├── tailwind.config.ts         # Tailwind CSS configuration
└── package.json               # Project dependencies
```

## 📸 Screenshots

### Dashboard Homepage
![Dashboard Homepage](/public/screenshots/dashboard.png)

### Employee Details
![Employee Details Page](/public/screenshots/employee-details.png)

### Bookmarks Page
![Bookmarks Page](/public/screenshots/bookmarks.png)

### Analytics Dashboard
![Analytics Dashboard](/public/screenshots/analytics.png)

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Chart.js](https://www.chartjs.org/) - Charting library
- [React Chartjs 2](https://react-chartjs-2.js.org/) - React wrapper for Chart.js

