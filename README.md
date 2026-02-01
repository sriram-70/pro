# Console Logs by Teja

> **A Digital Solar System** — An Awwwards-Winning Portfolio Experience

![Version](https://img.shields.io/badge/version-2026.1-cyan)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React Three Fiber](https://img.shields.io/badge/R3F-8.17-orange)

## 🌟 Overview

An immersive portfolio experience that visualizes the creative process as a single day (Sunrise → Noon → Sunset). As you scroll vertically, a custom-shader "Living Star" follows an orbital S-curve path around the content, morphing through three distinct visual phases.

## 🎨 Key Features

- **Custom GLSL Shaders**: 3D Simplex Noise vertex displacement with Oklab color space mixing
- **Orbital Animation**: GSAP ScrollTrigger-driven S-curve path synchronized with scroll
- **Liquid Scrolling**: Lenis smooth scroll with inertia
- **Brutalist Typography**: Massive viewport-based type system
- **Glassmorphism UI**: Backdrop-blur cards that let the sun's glow pass through
- **Console Aesthetic**: HUD overlay with FPS counter and system status

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **3D Engine**: React Three Fiber + Drei
- **Animation**: GSAP (ScrollTrigger)
- **Shaders**: Custom GLSL (Vertex + Fragment)
- **State**: Zustand
- **Styling**: Tailwind CSS + Sass
- **Smooth Scroll**: Lenis

## 📦 Installation

Since PowerShell script execution is restricted, install dependencies manually:

\`\`\`powershell
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the experience.

## 📁 Project Structure

\`\`\`
d:/port/
├── app/
│   ├── layout.tsx          # Root layout with SmoothScroll
│   ├── page.tsx            # Main page assembly
│   └── globals.css         # Global styles
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx       # R3F Canvas + GSAP orbital logic
│   │   ├── TheSun.tsx      # Shader material sun component
│   │   └── StarField.tsx   # Procedural star background
│   ├── ui/
│   │   ├── Hero.tsx        # Landing section
│   │   ├── About.tsx       # About section (asymmetric left)
│   │   ├── Works.tsx       # Projects (Bento grid right)
│   │   ├── Services.tsx    # Services list (left)
│   │   ├── Footer.tsx      # Contact CTA
│   │   └── HUD.tsx         # System overlay
│   └── SmoothScroll.tsx    # Lenis wrapper
├── shaders/
│   ├── sun.vertex.glsl     # Vertex shader (noise displacement)
│   └── sun.fragment.glsl   # Fragment shader (Oklab colors)
├── hooks/
│   └── useScrollStore.ts   # Zustand scroll state
└── package.json
\`\`\`

## 🎭 The Shader System

### Vertex Shader
- **3D Simplex Noise** for organic vertex displacement
- **Scroll-Driven Chaos**:
  - Sunrise (0.0): High noise strength (1.5) — Chaotic spikes
  - Noon (0.5): Low noise strength (0.3) — Geometric stability
  - Sunset (1.0): Zero noise (0.0) — Smooth sphere

### Fragment Shader
- **Oklab Color Space** for perceptually uniform mixing
- **Three-Phase Palette**:
  - Morning: Peach (#FFD1B3) + Lavender (#E6E6FA)
  - Noon: Cyan (#00F0FF) + Chrome (#FFFFFF)
  - Sunset: Magma (#FF2A00) + Void Purple (#2A0033)
- **Fresnel Rim Light** for glowing edges
- **Pulsing Glow** for subtle animation

## 🎬 Orbital Path

The sun follows a 5-position S-curve:

1. **Hero**: Center (0, 0, 0)
2. **About**: Right (4, 1, 0)
3. **Works**: Left (-4, 0, 0)
4. **Services**: Right (4, -1, 0)
5. **Contact**: Center/Down (0, -2, 0)

## 🚀 Performance

- Target: **60 FPS**
- High-poly geometry (64 subdivisions) for smooth noise
- Optimized shader uniforms updated per frame
- Efficient Lenis RAF loop

## 📝 License

MIT © Teja

---

**EXIT CODE: 0 (SUCCESS)**
