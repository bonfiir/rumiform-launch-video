import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

interface TitleSectionProps {
  title: string;
  subtitle: string;
}

// Word-by-word reveal animation component
const AnimatedText: React.FC<{ text: string; delay?: number; style?: React.CSSProperties }> = ({ 
  text, 
  delay = 0,
  style 
}) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  
  return (
    <div style={{ ...style, display: 'inline', whiteSpace: 'nowrap' }}>
      {words.map((word, index) => {
        const wordFrame = frame - delay - (index * 5);
        const opacity = interpolate(wordFrame, [0, 15], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const translateY = interpolate(wordFrame, [0, 15], [30, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const rotate = interpolate(wordFrame, [0, 20], [5, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              opacity,
              transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
              marginRight: '0.3em',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// Floating geometric shapes
const FloatingShape: React.FC<{ type: 'circle' | 'triangle' | 'square'; x: number; y: number; delay: number }> = ({
  type,
  x,
  y,
  delay,
}) => {
  const frame = useCurrentFrame();
  const floatY = Math.sin((frame + delay) * 0.05) * 20;
  const rotation = (frame + delay) * 0.2;
  const opacity = interpolate((frame + delay) % 120, [0, 30, 90, 120], [0, 0.3, 0.3, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const shapeStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    opacity,
    transform: `translateY(${floatY}px) rotate(${rotation}deg)`,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 100%)',
  };
  
  if (type === 'circle') {
    return <div style={{ ...shapeStyle, width: 40, height: 40, borderRadius: '50%' }} />;
  } else if (type === 'triangle') {
    return (
      <div
        style={{
          ...shapeStyle,
          width: 0,
          height: 0,
          borderLeft: '25px solid transparent',
          borderRight: '25px solid transparent',
          borderBottom: '40px solid rgba(255,255,255,0.2)',
          background: 'transparent',
        }}
      />
    );
  } else {
    return <div style={{ ...shapeStyle, width: 35, height: 35, borderRadius: '8px' }} />;
  }
};

export const TitleSection: React.FC<TitleSectionProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  
  // Main container animation
  const containerOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const containerScale = interpolate(frame, [0, 45], [0.8, 1], {
    extrapolateRight: 'clamp',
  });
  
  // Parallax background effect
  const bgPositionX = interpolate(frame, [0, 150], [0, 5], { extrapolateRight: 'clamp' });
  const bgPositionY = interpolate(frame, [0, 150], [0, -3], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Parallax overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)',
          transform: `translate(${bgPositionX}%, ${bgPositionY}%)`,
        }}
      />
      
      {/* Floating shapes */}
      <FloatingShape type="circle" x={10} y={20} delay={0} />
      <FloatingShape type="triangle" x={85} y={15} delay={40} />
      <FloatingShape type="square" x={15} y={75} delay={80} />
      <FloatingShape type="circle" x={80} y={70} delay={20} />
      
      {/* Main content */}
      <div
        style={{
          textAlign: 'center',
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          padding: 60,
        }}
      >
        {/* Animated title with word reveal */}
        <h1
          style={{
            fontSize: 100,
            fontWeight: 'bold',
            margin: 0,
            color: '#ffffff',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap',
          }}
        >
          <AnimatedText text={title} />
        </h1>
        
        {/* Tagline animation - appears at frame 45 */}
        <div
          style={{
            fontSize: 42,
            marginTop: 20,
            color: '#ffe0e0',
            fontWeight: 300,
          }}
        >
          <AnimatedText text="Forms, Reimagined" delay={45} />
        </div>
        
        {/* Subtitle with staggered reveal */}
        <p
          style={{
            fontSize: 48,
            marginTop: 30,
            color: '#e0e0e0',
            fontWeight: 300,
          }}
        >
          <AnimatedText text={subtitle} delay={30} />
        </p>
      </div>
    </AbsoluteFill>
  );
};
