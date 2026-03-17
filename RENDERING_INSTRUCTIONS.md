# Remotion Video Rendering Instructions

## Issue
The sandbox environment cannot render the video because Chrome/Chromium requires system libraries (libnspr4.so, libnss3, etc.) that require sudo privileges to install.

## Rendering Options

### Option 1: Render Locally (Recommended)
Copy the project to your local machine and render there:

```bash
# On your local machine with Node.js installed:
git clone <your-repo>  # or copy the folder
cd rumiform-launch-video
npm install
npm run build
```

The rendered video will be at: `out/launch-video.mp4`

**Requirements:**
- Node.js 18+ (already configured in package.json)
- Chrome/Chromium (Remotion will auto-download)
- macOS, Windows, or Linux with Chrome dependencies

### Option 2: Remotion Cloud Rendering
Use Remotion's cloud service:

1. Install Remotion Lambda:
```bash
npm install @remotion/lambda
npx remotion lambda deploy
```

2. Render on cloud:
```bash
npx remotion lambda render rumiform-launch out/launch-video.mp4
```

3. Download from S3 bucket

**Note:** Requires AWS account and Lambda configuration

### Option 3: Use a Container/VM with Chrome
Run the render in a Docker container with Chrome pre-installed:

```bash
# Using a pre-built container
docker run --rm -v $(pwd):/app mcr.microsoft.com/playwright:v1.42.0-jammy bash -c "
  cd /app && npm install && npm run build
"
```

### Option 4: Install Chrome Dependencies (If you have sudo)
On Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install -y \
  libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 \
  libcups2 libdrm2 libxkbcommon0 libxcomposite1 \
  libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2t64
```

Then run:
```bash
npm run build
```

## Project Files Ready
All source files are complete and TypeScript compiles successfully:
- `/home/sprite/rumiform-launch-video/src/components/MainComposition.tsx`
- `/home/sprite/rumiform-launch-video/src/components/TitleSection.tsx`
- `/home/sprite/rumiform-launch-video/src/components/ProductShowcase.tsx`
- `/home/sprite/rumiform-launch-video/src/components/FeatureHighlights.tsx`
- `/home/sprite/rumiform-launch-video/src/components/CallToAction.tsx`
- `/home/sprite/rumiform-launch-video/src/components/ParticleBackground.tsx`
- `/home/sprite/rumiform-launch-video/public/product-screenshot.png`

## Video Specification
- **Composition:** rumiform-launch
- **Duration:** 30 seconds (900 frames)
- **Resolution:** 1920x1080
- **Frame Rate:** 30fps
- **Output:** out/launch-video.mp4

## Quick Test
To verify the project works before rendering:
```bash
npm start
```
This opens Remotion Studio in your browser for preview.
