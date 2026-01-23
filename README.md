# React

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **AI Support Chat** - Integrated Google Gemini AI for human-like conversational support
- **Enhanced Reading Library** - Comprehensive mental health and wellness articles with immersive reading experience
- **Testing** - Jest and React Testing Library setup

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 🤖 AI Support Chat

The application includes an integrated AI support chat powered by Google Gemini AI. The chat provides:

- **Human-like conversations** - Natural, empathetic responses
- **Mental health support** - Guidance for wellness and motivation
- **Goal setting assistance** - Help with productivity and habit formation
- **24/7 availability** - Always accessible support
- **Context awareness** - Remembers conversation history

### Setup

1. Get a Google AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add your API key to the `.env` file:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
3. The chat will appear as a floating button in the bottom-right corner of all pages

## � Enhanced Reading Library

The Motivation Library provides a comprehensive collection of mental health and wellness resources with an immersive reading experience:

### Features
- **Full-Article Reading** - Modal reading view with formatted content and navigation
- **Advanced Search** - Search by title, description, and tags
- **Category Filtering** - Filter by Mental Health, Physical Health, Sleep, Nutrition, Motivation, and Productivity
- **Bookmarking System** - Save articles for later reading
- **Sharing Functionality** - Share articles via native sharing or clipboard
- **Reading Statistics** - View counts, ratings, and estimated reading times
- **Tag-Based Organization** - Articles tagged for easy discovery
- **Responsive Design** - Optimized for all device sizes

### Available Content
- **Mindfulness Meditation Guide** - Complete beginner's guide to meditation
- **Building Healthy Sleep Habits** - Comprehensive sleep improvement strategies
- **Nutrition for Mental Wellness** - Food-mood connection and dietary recommendations
- **Overcoming Procrastination** - Practical productivity techniques
- **Daily Exercise Routines** - Mental health-focused fitness programs
- **Gratitude Practice** - Evidence-based gratitude exercises

### Reading Experience
- **Immersive Modal View** - Distraction-free reading environment
- **Progress Tracking** - Visual reading progress indicators
- **Typography Optimized** - Professional typography for comfortable reading
- **Interactive Elements** - Clickable tags, bookmark buttons, and sharing options
- **Navigation Controls** - Easy navigation between articles

## �📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 📦 Deployment

Build the application for production:

```bash
npm run build
```

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by React and Vite
- Styled with Tailwind CSS

Built with ❤️ on Rocket.new
