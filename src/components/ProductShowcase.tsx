import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Img } from 'remotion';

export const ProductShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Ken Burns effect - slow zoom and pan
  const kenBurnsScale = interpolate(frame, [0, 210], [1.0, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const kenBurnsX = interpolate(frame, [0, 105, 210], [0, 2, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const kenBurnsY = interpolate(frame, [0, 105, 210], [0, 1, 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Entrance animation
  const containerOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const containerScale = interpolate(frame, [0, 40], [0.85, 1], {
    extrapolateRight: 'clamp',
  });
  
  // Rotation micro-animation for subtle movement
  const rotation = Math.sin(frame * 0.02) * 0.3;
  
  // Text reveal animations
  const headingOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });
  const headingY = interpolate(frame, [20, 50], [40, 0], { extrapolateRight: 'clamp' });
  
  const subheadingOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: 'clamp' });
  const subheadingY = interpolate(frame, [50, 80], [30, 0], { extrapolateRight: 'clamp' });
  
  // Phone/device frame container
  const phoneScale = interpolate(frame, [0, 60], [0.9, 1], { extrapolateRight: 'clamp' });
  
  // Glowing effect behind product
  const glowScale = interpolate(frame % 90, [0, 45], [1, 1.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glowOpacity = interpolate((frame % 90), [0, 45, 90], [0.3, 0.6, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Animated background gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: -50,
          background: `radial-gradient(circle at ${50 + kenBurnsX * 2}% ${50 + kenBurnsY * 2}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
          opacity: 0.5,
          transform: `scale(${1 + Math.sin(frame * 0.03) * 0.1})`,
        }}
      />
      
      {/* Content container */}
      <div
        style={{
          textAlign: 'center',
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          zIndex: 10,
          padding: 40,
        }}
      >
        {/* Animated text overlay */}
        <h2
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 15,
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <span style={{ display: 'inline-block' }}>Conversational AI</span>
        </h2>
        
        <p
          style={{
            fontSize: 32,
            color: '#ffe0e0',
            maxWidth: 800,
            lineHeight: 1.5,
            opacity: subheadingOpacity,
            transform: `translateY(${subheadingY}px)`,
            fontWeight: 300,
          }}
        >
          Transform static forms into dynamic AI-powered conversations
        </p>
        
        {/* Product showcase with device frame */}
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Pulse glow behind product */}
          <div
            style={{
              position: 'absolute',
              width: 920,
              height: 620,
              borderRadius: 30,
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
              transform: `scale(${glowScale})`,
              opacity: glowOpacity,
            }}
          />
          
          {/* Device frame / browser window */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: 24,
              padding: 12,
              boxShadow: `
                0 30px 80px rgba(0,0,0,0.5),
                0 10px 40px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.2)
              `,
              transform: `
                scale(${kenBurnsScale * phoneScale})
                translate(${kenBurnsX * 3}px, ${kenBurnsY * 3}px)
                rotate(${rotation}deg)
              `,
              transformOrigin: 'center center',
            }}
          >
            {/* Browser window header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #2a2a3e 0%, #26334d 100%)',
                borderRadius: 16,
                padding: '10px 16px',
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {/* Window control dots */}
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27ca40' }} />
              
              {/* URL bar simulation */}
              <div
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 6,
                  padding: '4px 12px',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'system-ui',
                }}
              >
                rumiform.com/form/xZSpA2eZq7Evo
              </div>
            </div>
            
            {/* Product screenshot */}
            <div
              style={{
                background: 'white',
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              <Img
                src="./public/product-screenshot.png"
                style={{
                  width: 900,
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Floating badge */}
        <div
          style={{
            marginTop: 30,
            display: 'inline-block',
            background: 'rgba(255,255,255,0.2)',
            padding: '12px 30px',
            borderRadius: 30,
            backdropFilter: 'blur(10px)',
            fontSize: 18,
            color: '#ffffff',
            fontWeight: 500,
            opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(frame, [100, 130], [20, 0], { extrapolateRight: 'clamp' })}px)`,
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          ✨ Beautifully Branded
        </div>
      </div>
    </AbsoluteFill>
  );
};
