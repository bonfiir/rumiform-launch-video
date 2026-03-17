import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// Pulsing button component
const PulsingButton: React.FC<{ children: React.ReactNode; frame: number }> = ({ children, frame }) => {
  // Primary pulse animation
  const pulseFrame = frame % 40;
  const pulseScale = interpolate(pulseFrame, [0, 20, 40], [1, 1.08, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Secondary glow pulse
  const glowPulse = interpolate(pulseFrame, [0, 20, 40], [0.5, 1, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Subtle rotation
  const rotation = Math.sin(frame * 0.05) * 1;
  
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        transform: `scale(${pulseScale}) rotate(${rotation}deg)`,
      }}
    >
      {/* Outer glow rings */}
      <div
        style={{
          position: 'absolute',
          inset: -20,
          borderRadius: 50,
          background: `radial-gradient(circle, rgba(102,126,234,${glowPulse * 0.6}) 0%, transparent 70%)`,
          filter: 'blur(10px)',
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          inset: -10,
          borderRadius: 50,
          border: `2px solid rgba(255,255,255,${glowPulse * 0.5})`,
          animation: 'none',
        }}
      />
      
      {/* Main button */}
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f0ff 100%)',
          color: '#667eea',
          padding: '28px 70px',
          borderRadius: 50,
          fontSize: 34,
          fontWeight: 'bold',
          boxShadow: `
            0 15px 50px rgba(0,0,0,0.3),
            0 5px 20px rgba(102,126,234,0.3),
            inset 0 -3px 10px rgba(0,0,0,0.1),
            inset 0 3px 10px rgba(255,255,255,1)
          `,
          cursor: 'pointer',
        }}
      >
        {children}
      </div>
      
      {/* Shine effect passing through */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${interpolate(pulseFrame, [0, 40], [-100, 100])}%`,
          width: 100,
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
          borderRadius: 50,
          filter: 'blur(5px)',
        }}
      />
    </div>
  );
};

// Animated URL display
const AnimatedURL: React.FC<{ url: string; delay: number }> = ({ url, delay }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;
  
  const opacity = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const scale = interpolate(localFrame, [0, 30], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        marginTop: 30,
      }}
    >
      <span
        style={{
          fontSize: 26,
          color: 'rgba(255,255,255,0.9)',
          fontFamily: 'monospace',
          background: 'rgba(255,255,255,0.1)',
          padding: '10px 25px',
          borderRadius: 30,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        {url}
      </span>
    </div>
  );
};

// Floating arrow animation
const FloatingArrow: React.FC<{ frame: number; delay: number }> = ({ frame, delay }) => {
  const localFrame = frame - delay;
  const floatY = Math.sin(localFrame * 0.1) * 10;
  const opacity = interpolate(localFrame, [0, 30, localFrame + 100], [0, 1, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  return (
    <div
      style={{
        position: 'absolute',
        right: '15%',
        bottom: '20%',
        opacity,
        transform: `translateY(${floatY}px)`,
        fontSize: 48,
        color: '#ffffff',
        filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))',
      }}
    >
      ↓
    </div>
  );
};

// Sparkle particle effect
const Sparkle: React.FC<{ frame: number; x: number; y: number; delay: number }> = ({ frame, x, y, delay }) => {
  const localFrame = frame - delay;
  const cycle = localFrame % 60;
  
  const opacity = interpolate(cycle, [0, 30, 60], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const scale = interpolate(cycle, [0, 30], [0, 1.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const rotation = cycle * 6;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
      </svg>
    </div>
  );
};

export const CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Container entrance animation
  const containerOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const containerScale = interpolate(frame, [0, 50], [0.85, 1], {
    extrapolateRight: 'clamp',
  });
  
  // Background gradient animation
  const hueShift = interpolate(frame, [0, 240], [260, 220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Heading animation
  const headingOpacity = interpolate(frame, [10, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const headingY = interpolate(frame, [10, 50], [50, 0], {
    extrapolateRight: 'clamp',
  });
  
  // Subheading animation
  const subheadingOpacity = interpolate(frame, [50, 90], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const subheadingY = interpolate(frame, [50, 90], [30, 0], {
    extrapolateRight: 'clamp',
  });
  
  // App Store badge animation
  const badgeOpacity = interpolate(frame, [150, 190], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const badgeY = interpolate(frame, [150, 190], [20, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${hueShift}, 80%, 50%) 0%, hsl(${hueShift + 40}, 90%, 60%) 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Animated background circles */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          transform: `translate(${Math.sin(frame * 0.02) * 30}px, ${Math.cos(frame * 0.02) * 30}px)`,
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          transform: `translate(${Math.cos(frame * 0.015) * 20}px, ${Math.sin(frame * 0.015) * 20}px)`,
        }}
      />
      
      {/* Sparkle effects */}
      <Sparkle frame={frame} x={20} y={30} delay={0} />
      <Sparkle frame={frame} x={75} y={25} delay={15} />
      <Sparkle frame={frame} x={15} y={70} delay={30} />
      <Sparkle frame={frame} x={80} y={75} delay={45} />
      
      {/* Main content */}
      <div
        style={{
          textAlign: 'center',
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          zIndex: 10,
          padding: 60,
        }}
      >
        {/* Main heading with bounce */}
        <h2
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 20,
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
            textShadow: '0 4px 20px rgba(0,0,0,0.4)',
            letterSpacing: '0.05em',
          }}
        >
          Get Started Today
        </h2>
        
        <h3
          style={{
            fontSize: 38,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
            marginBottom: 40,
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
          }}
        >
          Ready to Transform Your Forms?
        </h3>
        
        {/* Subheading */}
        <p
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.85)',
            marginBottom: 60,
            opacity: subheadingOpacity,
            transform: `translateY(${subheadingY}px)`,
            fontWeight: 400,
            maxWidth: 800,
            lineHeight: 1.6,
          }}
        >
          Join the conversational form revolution with Lumina Architect
        </p>
        
        {/* Pulsing CTA button */}
        <div
          style={{
            marginBottom: 40,
            opacity: interpolate(frame, [80, 120], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <div
            style={{
              display: 'inline-block',
              transform: `translateY(${interpolate(frame, [80, 120], [30, 0], { extrapolateRight: 'clamp' })}px)`,
            }}
          >
            <PulsingButton frame={frame}>
              Get Started at Rumiform.com
            </PulsingButton>
          </div>
        </div>
        
        {/* Animated URL display */}
        <AnimatedURL url="rumiform.com" delay={100} />
        
        {/* App Store badges */}
        <div
          style={{
            marginTop: 50,
            display: 'flex',
            gap: 20,
            justifyContent: 'center',
            opacity: badgeOpacity,
            transform: `translateY(${badgeY}px)`,
          }}
        >
          {/* App Store badge mock */}
          <div
            style={{
              background: 'rgba(0,0,0,0.8)',
              padding: '12px 28px',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {/* Apple icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-.8 1.94-.8.1.92-1.11 2.47-1.99 3.3-.81.77-1.97 1.03-1.97 1.03s-.16-1.3.92-3.53z" />
            </svg>
            <div style={{ color: 'white' }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 600 }}>Download on the</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>App Store</div>
            </div>
          </div>
          
          {/* Google Play badge mock */}
          <div
            style={{
              background: 'rgba(0,0,0,0.8)',
              padding: '12px 28px',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {/* Play icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M3 2v20l18-10L3 2z" />
            </svg>
            <div style={{ color: 'white' }}>
              <div style={{ fontSize: 10 }}>GET IT ON</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Google Play</div>
            </div>
          </div>
        </div>
        
        {/* Floating arrow pointing to badges */}
        <FloatingArrow frame={frame} delay={150} />
        
        {/* Final text overlay */}
        <div
          style={{
            marginTop: 40,
            fontSize: 18,
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 400,
            opacity: interpolate(frame, [180, 220], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          Start your free trial today
        </div>
      </div>
    </AbsoluteFill>
  );
};
