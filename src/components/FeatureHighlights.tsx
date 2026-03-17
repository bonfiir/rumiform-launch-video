import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  entranceDelay: number;
  stagger: number;
  position: 'left' | 'center' | 'right';
}

// Animated icon component with pulse/bounce effect
const AnimatedIcon: React.FC<{ icon: string; frame: number; delay: number }> = ({ icon, frame, delay }) => {
  const localFrame = frame - delay;
  
  // Bounce animation
  const bounce = Math.sin(localFrame * 0.15) * 8;
  
  // Pulse scale
  const pulseScale = interpolate((localFrame % 60), [0, 30, 60], [1, 1.1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Rotation micro-animation
  const rotate = Math.sin(localFrame * 0.08) * 5;
  
  // Shimmer effect
  const shimmerOpacity = interpolate((localFrame % 40), [0, 20, 40], [0.7, 1, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  return (
    <div
      style={{
        fontSize: 56,
        marginBottom: 20,
        transform: `translateY(${bounce}px) scale(${pulseScale}) rotate(${rotate}deg)`,
        filter: `brightness(${shimmerOpacity})`,
        display: 'inline-block',
        transition: 'transform 0.1s',
      }}
    >
      {icon}
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  entranceDelay,
  stagger,
  position,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - stagger;
  
  // Slide in from different directions based on position
  const startX = position === 'left' ? -100 : position === 'right' ? 100 : 0;
  const startY = position === 'center' ? -80 : 0;
  
  const cardOpacity = interpolate(localFrame, [entranceDelay, entranceDelay + 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const translateX = interpolate(localFrame, [entranceDelay, entranceDelay + 40], [startX, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const translateY = interpolate(localFrame, [entranceDelay, entranceDelay + 40], [startY, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Scale and rotation entrance
  const scale = interpolate(localFrame, [entranceDelay, entranceDelay + 40], [0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const rotate = interpolate(localFrame, [entranceDelay, entranceDelay + 40], [8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Continuous subtle hover effect
  const floatY = Math.sin((localFrame - entranceDelay) * 0.05) * 5;
  
  // Gradient based on position (Rumiform brand colors)
  const gradients = {
    left: 'linear-gradient(135deg, rgba(255,107,107,0.3) 0%, rgba(255,159,67,0.3) 100%)',
    center: 'linear-gradient(135deg, rgba(78,205,196,0.3) 0%, rgba(255,107,107,0.3) 100%)',
    right: 'linear-gradient(135deg, rgba(170,86,208,0.3) 0%, rgba(78,205,196,0.3) 100%)',
  };
  
  const borderColors = {
    left: 'rgba(255,159,67,0.5)',
    center: 'rgba(255,107,107,0.5)',
    right: 'rgba(170,86,208,0.5)',
  };

  return (
    <div
      style={{
        background: gradients[position],
        padding: 40,
        borderRadius: 24,
        width: 320,
        textAlign: 'center',
        opacity: cardOpacity,
        transform: `translate(${translateX + 20}px, ${translateY + floatY}px) scale(${scale}) rotate(${rotate}deg)`,
        backdropFilter: 'blur(10px)',
        border: `2px solid ${borderColors[position]}`,
        boxShadow: `
          0 20px 60px rgba(0,0,0,0.3),
          0 5px 20px rgba(0,0,0,0.2),
          inset 0 1px 0 rgba(255,255,255,0.2)
        `,
      }}
    >
      {/* Animated icon */}
      <AnimatedIcon icon={icon} frame={localFrame} delay={entranceDelay} />
      
      {/* Title with letter reveal effect */}
      <h3
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: 15,
          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
        }}
      >
        {title.split('').map((letter, i) => {
          const letterFrame = localFrame - entranceDelay - 20 - (i * 3);
          const letterOpacity = interpolate(letterFrame, [0, 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const letterY = interpolate(letterFrame, [0, 10], [15, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: letterOpacity,
                transform: `translateY(${letterY}px)`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </h3>
      
      {/* Description with fade in */}
      <p
        style={{
          fontSize: 17,
          color: '#e8f4ff',
          lineHeight: 1.6,
          opacity: interpolate(localFrame, [entranceDelay + 30, entranceDelay + 50], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          fontWeight: 400,
        }}
      >
        {description}
      </p>
    </div>
  );
};

// Text overlay that appears at specific moments
const OverlayText: React.FC<{ text: string; fromFrame: number; toFrame: number; x: string; y: string }> = ({
  text,
  fromFrame,
  toFrame,
  x,
  y,
}) => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(frame, [fromFrame, fromFrame + 30, toFrame - 30, toFrame], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const scale = interpolate(frame, [fromFrame, fromFrame + 30], [0.5, 1], {
    extrapolateRight: 'clamp',
  });
  
  const floatY = Math.sin((frame - fromFrame) * 0.08) * 5;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `scale(${scale}) translateY(${floatY}px)`,
        background: 'rgba(255,255,255,0.15)',
        padding: '10px 25px',
        borderRadius: 30,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.3)',
      }}
    >
      <span
        style={{
          color: '#ffffff',
          fontSize: 16,
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const FeatureHighlights: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Background animation
  const hueShift = interpolate(frame, [0, 300], [200, 220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const features = [
    { 
      icon: '🤖', 
      title: 'AI-Powered', 
      description: 'Lumina Architect intelligently guides users through every form interaction',
      position: 'left' as const,
      stagger: 0,
      entranceDelay: 0,
    },
    { 
      icon: '🎨', 
      title: 'Fully Branded', 
      description: 'Custom gradients, colors, and visual design that matches your brand identity',
      position: 'center' as const,
      stagger: 15,
      entranceDelay: 10,
    },
    { 
      icon: '⚡', 
      title: 'Real-Time Sync', 
      description: 'Instant synchronization with ARCHITECT SYNC ACTIVE for seamless experiences',
      position: 'right' as const,
      stagger: 30,
      entranceDelay: 20,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${hueShift}, 100%, 60%) 0%, hsl(${hueShift + 40}, 100%, 70%) 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        overflow: 'hidden',
      }}
    >
      {/* Main title with reveal */}
      <h2
        style={{
          fontSize: 56,
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: 70,
          textAlign: 'center',
          opacity: interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `translateY(${interpolate(frame, [0, 40], [50, 0], { extrapolateRight: 'clamp' })}px)`,
        }}
      >
        Why Choose Rumiform?
      </h2>
      
      {/* Feature cards container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 40,
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            entranceDelay={feature.entranceDelay}
            stagger={feature.stagger}
            position={feature.position}
          />
        ))}
      </div>
      
      {/* Floating text overlays at key moments */}
      <OverlayText
        text="Conversational AI"
        fromFrame={50}
        toFrame={150}
        x="5%"
        y="15%"
      />
      
      <OverlayText
        text="Beautifully Branded"
        fromFrame={100}
        toFrame={200}
        x="85%"
        y="20%"
      />
      
      <OverlayText
        text="Zero Latency"
        fromFrame={150}
        toFrame={250}
        x="10%"
        y="85%"
      />
    </AbsoluteFill>
  );
};
