import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

// Generate consistent particle positions based on index
const getParticle = (index: number): Particle => {
  const seed = index * 137.5; // Golden angle for distribution
  return {
    x: ((seed * 1.618) % 100),
    y: ((seed * 0.618) % 100),
    size: 3 + (index % 5) * 4,
    speed: 0.5 + (index % 3) * 0.3,
    opacity: 0.1 + (index % 10) * 0.03,
  };
};

export const ParticleBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const totalParticles = 30;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {Array.from({ length: totalParticles }).map((_, index) => {
        const particle = getParticle(index);
        const floatOffset = Math.sin(frame * 0.03 * particle.speed + index) * 30;
        const translateY = floatOffset;
        const translateX = Math.cos(frame * 0.02 * particle.speed + index * 0.5) * 20;
        
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,255,255,${particle.opacity + 0.3}) 0%, rgba(255,255,255,0) 70%)`,
              transform: `translate(${translateX}px, ${translateY}px)`,
              filter: 'blur(2px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
