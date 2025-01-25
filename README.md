
# Manager Web App - Fleet Tracker

Welcome to the Manager Web App, part of the **Fleet Tracker** suite. This web application provides managers with an interface to manage fleet operations, including driver and vehicle management, route tracking, and reporting.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)

## Features

- **Dashboard** for quick overviews of fleet metrics
- **Driver Management** for monitoring and assigning tasks to drivers
- **Route Tracking** with real-time updates
- **Reports & Analytics** for performance insights
- **Authorization & Authentication** for secure access

## Technologies

- **React** – for building the user interface
- **Redux** – for state management
- **React Router** – for managing navigation
- **Tailwind CSS** – for styling
- **Axios** – for API requests

## Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/smodu-organisation/fleet-tracker-school-managers.git
   cd fleet-tracker-school-managers
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Setup Environment Variables:**

   Copy `.env.example` to `.env.local` and update the values as needed:

   ```plaintext
   REACT_APP_API_URL=<Your Backend API URL>
   REACT_APP_MAP_API_KEY=<Your Map Service API Key>
   ```

4. **Run the App Locally:**

   ```bash
   npm run dev
   ```

## Project Structure

This project follows a modular folder structure for scalable development:

```plaintext
fleet-tracker-manager-frontend/
├── public/                 # Static assets
├── src/
│   ├── api/                # API request handlers
│   ├── assets/             # Images, icons, and other static assets
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom hooks for handling app logic
│   ├── pages/              # Page components mapped to routes
│   ├── redux/              # State management setup
│   ├── services/           # External service integrations (e.g., Maps)
│   ├── styles/             # Global and component styles
│   └── utils/              # Utility functions and helpers
├── .env.example            # Environment variables example file
└── README.md
```

### Folder Descriptions

- **public/**: Contains static files that won’t be processed by Webpack (e.g., `index.html`).
- **src/api/**: Contains API configurations and functions to interact with backend services.
- **src/assets/**: Stores images, icons, and other static files.
- **src/components/**: Houses reusable components that can be shared across multiple pages.
- **src/hooks/**: Contains custom hooks, such as `useAuth`, `useFetch`, etc.
- **src/pages/**: Each main route of the app corresponds to a component in this folder.
- **src/redux/**: Configuration for Redux store, slices, and actions.
- **src/services/**: Handles integration with external services (e.g., map services).
- **src/styles/**: Contains global styles and theming.
- **src/utils/**: Utility functions and helpers for various tasks.

## Environment Variables

Add the following environment variables in `.env.local` for configuration:

```plaintext
REACT_APP_API_URL=           # Backend API URL
REACT_APP_MAP_API_KEY=        # Map Service API Key
REACT_APP_ANALYTICS_ID=       # Analytics ID if used
```

## Scripts

- **Start Development Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Lint Code:** `npm run lint`
- **Test Code:** `npm run test`

## Contributing

To contribute:

1. **Fork the Repository.**
2. **Create a Feature Branch:** `git checkout -b feature/<feature-name>`
3. **Commit Changes:** Write clear and concise commit messages.
4. **Push to Feature Branch:** `git push origin feature/<feature-name>`
5. **Create a Pull Request:** Submit the PR for review.

---

This should help new developers quickly understand the setup, structure, and workflow of the **Manager Web App** for Fleet Tracker.
