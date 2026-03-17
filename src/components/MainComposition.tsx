import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';
import { TitleSection } from './TitleSection';
import { ProductShowcase } from './ProductShowcase';
import { FeatureHighlights } from './FeatureHighlights';
import { CallToAction } from './CallToAction';
import { ParticleBackground } from './ParticleBackground';

interface MainCompositionProps {
  title: string;
  subtitle: string;
}

export const MainComposition: React.FC<MainCompositionProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  
  // Dynamic gradient background that shifts colors over time
  const gradientPhase = interpolate(frame, [0, 900], [0, 4], { extrapolateRight: 'clamp' });
  const hue1 = interpolate(gradientPhase, [0, 1, 2, 3, 4], [220, 330, 280, 260, 220], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const hue2 = interpolate(gradientPhase, [0, 1, 2, 3, 4], [260, 10, 340, 190, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  const backgroundStyle = {
    background: `linear-gradient(135deg, hsl(${hue1}, 100%, 60%) 0%, hsl(${hue2}, 100%, 70%) 100%)`,
  };

  return (
    <AbsoluteFill style={backgroundStyle}>
      {/* Animated particle background throughout */}
      <ParticleBackground />
      
      {/* Intro Sequence - 0-5 seconds (0-150 frames) */}
      <Sequence from={0} durationInFrames={150}>
        <TitleSection title={title} subtitle={subtitle} />
      </Sequence>
      
      {/* Product Showcase - 5-12 seconds (150-360 frames) */}
      <Sequence from={150} durationInFrames={210}>
        <ProductShowcase />
      </Sequence>
      
      {/* Feature Highlights - 12-22 seconds (360-660 frames) */}
      <Sequence from={360} durationInFrames={300}>
        <FeatureHighlights />
      </Sequence>
      
      {/* Call to Action - 22-30 seconds (660-900 frames) */}
      <Sequence from={660} durationInFrames={240}>
        <CallToAction />
      </Sequence>
    </AbsoluteFill>
  );
};
