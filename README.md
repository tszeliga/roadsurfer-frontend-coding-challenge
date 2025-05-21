
# 📆 Booking Calendar App – Technical Test

This project is a calendar-based booking viewer built using **Vue 3**, **Nuxt 3**, and **TypeScript**.

---

## 🚀 Tech Stack

- **Vue 3** + **Nuxt 3** – Application framework
- **TypeScript** – Type safety
- **TailwindCSS** – Utility-first styling
- **Pinia** – Reactive state management
- **Vitest** – Unit testing
- **Day.js** – Date manipulation (wrapped in a utility abstraction)

## Notes

**UI Design**

I put minimal effort into visual styling. The focus was on building a working and logically sound UI using TailwindCSS.

**Date Management**

Used Day.js, wrapped in a local abstraction layer (utils/date.ts) for flexibility and future swap-out potential.

**Calendar Rendering**

The calendar was custom-implemented for demonstration. In a production environment, a solution like FullCalendar could be considered.

**Architecture Approach**

Applied a modular, domain-based architecture:

```bash
components/: UI layer
stores/: state/data management
services/: business logic (e.g., booking filters, calendar generation)
api/: decoupled API layer
```


## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server
 
Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

How to run tests:

```bash
npm run test
```

How to run linter:

```bash
npm run lint
```