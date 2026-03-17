# Rumiform Launch Video

30-second animated promotional video built with Remotion for Rumiform's product launch.

## Overview

This project creates a professional product launch video featuring:
- Dynamic gradient backgrounds with color transitions
- Word-by-word text reveal animations
- Product showcase with Ken Burns effect
- Feature highlights with staggered card animations
- Call-to-action with pulsing buttons and sparkle effects
- Particle background effects throughout

## Video Specifications

- **Duration**: 30 seconds (900 frames)
- **Resolution**: 1920x1080 (Full HD)
- **Frame Rate**: 30fps
- **Composition ID**: rumiform-launch

## Quick Start

```bash
# Install dependencies
npm install

# Preview in Remotion Studio
npm start

# Render the video
npm run build
```

## Project Structure

```
rumiform-launch-video/
├── src/
│   ├── index.ts              # Entry point
│   ├── Root.tsx              # Root composition with configuration
│   └── components/
│       ├── index.ts          # Component exports
│       ├── MainComposition.tsx    # Main timeline orchestration
│       ├── TitleSection.tsx       # Opening title animation
│       ├── ProductShowcase.tsx    # Product demonstration
│       ├── FeatureHighlights.tsx  # Feature cards
│       ├── CallToAction.tsx       # Closing CTA
│       └── ParticleBackground.tsx # Ambient particles
├── public/
│   └── product-screenshot.png     # Product screenshot
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
└── RENDERING_INSTRUCTIONS.md
```

## Video Timeline

| Time | Section | Description |
|------|---------|-------------|
| 0-5s | Title Section | Animated title reveal with floating shapes |
| 5-12s | Product Showcase | Device frame with Ken Burns effect |
| 12-22s | Feature Highlights | Three feature cards with staggered entrance |
| 22-30s | Call to Action | Pulsing button with app store badges |

## Rendering Options

See [RENDERING_INSTRUCTIONS.md](./RENDERING_INSTRUCTIONS.md) for detailed rendering options including:
- Local rendering
- Remotion Cloud (Lambda)
- Docker container rendering

## Technologies

- **Remotion** v4 - Programmatic video creation
- **React** 18 - Component framework
- **TypeScript** - Type-safe development

## License

MIT
