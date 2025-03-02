# Weather App UI (Frontend)

This project is a frontend implementation of the [Weather App UI Design](https://www.figma.com/community/file/1100826294536456295/weather-app-ui-design) from Figma. It's built with Next.js, TypeScript, and SASS (SCSS). Currently, only a single page from the original Figma design has been partially implemented, focusing mainly on the mobile view. Desktop view remains incomplete, populated largely with placeholder components.

## 🚀 Live Demo

The application is deployed on the following platforms:

- **Vercel:** [weather-app-two-xi-55.vercel.app](https://weather-app-two-xi-55.vercel.app/)
- **VPS (Dockerized):** [weather-app.celilaltiparmak.dev](https://weather-app.celilaltiparmak.dev/)

**Note:** Mobile view is recommended for evaluation, as desktop view is currently incomplete.

---

## 📌 Project Overview

This repository contains the frontend codebase of a responsive weather application. The goal was to replicate a Weather App UI from a provided Figma design, focusing primarily on mobile responsiveness and best practices of SASS architecture.

### Current Implementation Details:

- ✅ Partially implemented single-page mobile view as per [Figma design](https://www.figma.com/community/file/1100826294536456295/weather-app-ui-design).
- ✅ Responsive design optimized for mobile screens.
- ✅ SASS modules (`.module.scss`) for component styling, structured using best practices to enhance modularity and maintainability.
- ✅ Deployed using Docker on a personal VPS and Vercel for hosting convenience.
- ✅ Dummy data (JSON) currently used for weather information (`src/data/turkeyWeather.json`).

### Planned Features (Not Fully Implemented Due to Time Constraints):

- ⚠️ Redux Toolkit integration for managing theme switching and favorite locations (currently scaffolded but incomplete).
- ⚠️ Complete desktop view implementation.
- ⚠️ Dynamic weather data fetching from a real API.

---

## 🗂️ Project Structure

```
├── public                      # Static assets (icons, images, etc.)
├── src
│   ├── app                     # Next.js app files and global styles
│   ├── components              # Reusable React components
│   │   ├── Layout              # Structural layout components
│   │   ├── SearchBar           # Search input component
│   │   ├── StarryBackground    # Animated background effect
│   │   ├── ThemeProvider       # Theme context provider (incomplete)
│   │   └── WeatherCard         # Main weather card component (mobile optimized)
│   ├── data                    # Dummy data source (JSON)
│   ├── store                   # Redux Toolkit setup (incomplete)
│   └── styles                  # Global styling utilities (mixins, variables)
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies and scripts
```

---

## ⚙️ Technology Stack

- **Next.js** (React Framework)
- **TypeScript** (Static Typing)
- **SASS (SCSS Modules)** (CSS Preprocessor)
- **Docker** (Containerization)
- **Vercel** (Deployment Platform)
- **Redux Toolkit** (State Management - planned but not completed)

---

## 👩‍💻 Development Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd weather-app
```

2. **Install dependencies**

```bash
npm install
# OR
bun install
```

3. **Run development server**

```bash
npm run dev
# OR
bun run dev
```

4. **Open the application**

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🚧 Known Limitations & Future Improvements

- Desktop view incomplete; placeholders used extensively.
- Redux Toolkit setup incomplete; favorite locations and theme management not yet functional.
- Currently uses static dummy data; future integration with a real weather API is planned.

---

## 📱 Recommended Evaluation

For the best experience and accurate evaluation of the implemented UI, please test primarily using mobile devices or mobile view in browser developer tools. The most effort has been dedicated to optimizing the responsive mobile layout, particularly within the `WeatherCard` component (`src/components/WeatherCard/WeatherCard.tsx`).

---

## 🌐 Deployed Links

- **Vercel:** [weather-app-two-xi-55.vercel.app](https://weather-app-two-xi-55.vercel.app/)
- **Docker (VPS):** [weather-app.celilaltiparmak.dev](https://weather-app.celilaltiparmak.dev/)

---

## 🙌 Acknowledgements

- Original UI Design: [Weather App UI Design (Figma Community)](https://www.figma.com/community/file/1100826294536456295/weather-app-ui-design)

---

© 2025 WeatherApp