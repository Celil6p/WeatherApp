## ⚠️ **WARNING** ⚠️
<span style="color: red; font-size: 1.5em;">Mobile view is recommended for evaluation, as desktop view is currently incomplete.</span>

# Weather App UI (Frontend)

This project is a frontend implementation of the [Weather App UI Design](https://www.figma.com/community/file/1100826294536456295/weather-app-ui-design) from Figma. It's built with Next.js, TypeScript, and SASS (SCSS). Currently, only a single page from the original Figma design has been partially implemented, focusing mainly on the mobile view. Desktop view remains incomplete, populated largely with placeholder components.

## 🚀 Live Demo

The application is deployed on the following platforms:

- **Vercel:** [weather-app-two-xi-55.vercel.app](https://weather-app-two-xi-55.vercel.app/)
- **VPS (Dockerized):** [weather-app.celilaltiparmak.dev](https://weather-app.celilaltiparmak.dev/)

---

## 📌 Project Overview

This repository contains the frontend codebase of a responsive weather application. The goal was to replicate a Weather App UI from a provided Figma design, focusing primarily on mobile responsiveness and best practices of SASS architecture.

### Current Implementation Details:

- ✅ Partially implemented single-page mobile view as per [Figma design](https://www.figma.com/community/file/1100826294536456295/weather-app-ui-design).
- ✅ Responsive design optimized for mobile screens.
- ✅ SASS modules (`.module.scss`) for component styling, structured using best practices to enhance modularity and maintainability.
- ✅ Deployed using Docker on a personal VPS and Vercel for hosting convenience.
- ✅ Dummy data (JSON) currently used for weather information (`src/data/DummyWeather.json`).
- ✅ Redux Toolkit integration for managing API calls and favorite locations.
- ✅ Fully functional favorites section allowing users to save and manage preferred locations.

### Planned Features (Not Fully Implemented Due to Time Constraints):

- ⚠️ ~Dynamic weather data fetching from a real API.~ (real free APIs do not provide enough data to keep Figma styling intact so I have continued with DummyWeather but simulating real API calls)

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
│   │   ├── FavoritesModal      # Favorites management component
│   │   ├── WeatherCard         # Main weather card component (mobile optimized)
│   │   └── MobileMenu          # Menu for mobile view to handle favorite cities
│   ├── data                    # Dummy data source (JSON)
│   ├── store                   # Redux Toolkit store configuration
│   │   ├── slices              # Redux slices including favorites management
│   │   ├── api                 # API services using RTK Query
│   │   └── thunks              # Async thunk actions
│   └── styles                  # Global styling utilities (mixins, variables)
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies and scripts
```

---

## 📊 Features

### Favorites Management

The application includes a fully implemented favorites system powered by Redux Toolkit:

- Add/remove locations to your favorites list with a single click
- Persistent storage of favorite locations across sessions
- Quick access to weather information for saved locations
- Visual indicators for favorite status on location cards
- Smooth transitions and animations for user interactions

This weather application uses Redux Toolkit for state management and handling API calls, treating local JSON data as if it were coming from an external API.

### Store Structure

The Redux store is organized with the following components:

1. **Store Configuration** (`src/store/index.ts`)
   - Configures the Redux store with reducers and middleware
   - Integrates RTK Query middleware

2. **Weather Slice** (`src/store/slices/weatherSlice.ts`)
   - Manages the application's weather state
   - Provides actions for updating weather data

3. **Favorites Slice** (`src/store/slices/favoritesSlice.ts`)
   - Manages user's favorite locations
   - Provides actions for adding and removing favorites
   - Persists favorites data in local storage

4. **API Service** (`src/store/api/weatherApi.ts`)
   - Uses RTK Query to provide hooks for data fetching
   - Simulates API calls using the local dummy data

5. **Thunks** (`src/store/thunks/weatherThunks.ts`)
   - Provides async actions for more complex data operations
   - Handles loading states and error handling

### API Integration

The application integrates with APIs in two ways:

1. **RTK Query**
   - Automatically handles caching, loading states, and refetching
   - Provides hooks like `useGetCurrentLocationWeatherQuery`
   - Simulates network delays and response handling

2. **Async Thunks**
   - More control over loading/error states
   - Can perform complex operations and dispatch multiple actions
   - Used for operations that affect multiple parts of the state

## Development Notes

- The JSON data in `src/data/DummyWeather.json` is used to simulate API responses
- API delays are simulated using timeouts to mimic real network requests
- Error handling is implemented to handle failed API calls

---

## ⚙️ Technology Stack

- **Next.js** (React Framework)
- **TypeScript** (Static Typing)
- **SASS (SCSS Modules)** (CSS Preprocessor)
- **Docker** (Containerization)
- **Vercel** (Deployment Platform)
- **Redux Toolkit** (State Management)

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
- Currently uses static dummy data.

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

