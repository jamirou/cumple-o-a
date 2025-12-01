# Walkthrough - Interactive Birthday PWA

## Overview
This application is a progressive web app designed as a birthday gift. It features a narrative journey starting from a retro terminal interface and culminating in a 3D biotech-themed celebration.

## Features

### 1. Terminal Stage (`Terminal.jsx`)
- **Retro Aesthetic**: Black background, green monospace text, and CRT scanline effects.
- **Narrative Flow**:
  - **Greeting**: "Hola Ñoña. Inicializando protocolo de cumpleaños..."
  - **Context**: Explains the origin of the gift.
  - **Quiz**: A security check requiring the answer "flo" (case-insensitive).
    - *Hint*: "Hace miau y rueda."
  - **Fake Hack**: A playful "biometric scan" sequence after a correct answer.
  - **Transition**: A final button to launch the main gift.

### 2. BioWorld Stage (`BioWorld.jsx`)
- **3D Experience**: Built with React Three Fiber.
- **DNA Helix**: A rotating double helix structure representing the biotech theme.
- **Floating Cards**: 3D floating cards for pets:
  - 🐶 Esperanza
  - 🐶 Puppy
  - 🐶 Diana
  - 🐶 Bonnie
  - 🐱 Flo (The Boss)
- **Visuals**: Soft gradients, glassmorphism UI, and particle stars.

## Tech Stack
- **Core**: React 18, Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D**: Three.js, @react-three/fiber, @react-three/drei

## How to Run
1.  Ensure dependencies are installed:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Open the browser at the provided local URL (usually `http://localhost:5173`).

## Verification Results
- **Build**: Successfully built with `npm run build`.
- **Linter**: No critical errors found during development.
