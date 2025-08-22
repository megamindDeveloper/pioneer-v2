import { ModelOneKeyframe } from '@/types/animationTypes';
import React from 'react';

// Define the props for the component using TypeScript
interface TimelineProps {
  scrollProgress: number;
  rawProgress?: number;
  animationData: ModelOneKeyframe[]; // Pass the animation data as a prop
  lookAtRange?: [number, number]; // Optional prop for the "LOOKAT ACTIVE" range
}

/**
 * A debug component that visualizes the scroll-based animation timeline.
 */
const Timeline: React.FC<TimelineProps> = ({
  scrollProgress,
  rawProgress,
  animationData,
  lookAtRange = [0.0417, 0.0833], // Default value for the look-at range
}) => {
  // Guard against missing animation data to prevent crashes
  if (!animationData || animationData.length === 0) {
    return null;
  }

  const totalFrames = animationData.length;
  const frameIndex = scrollProgress * (totalFrames - 1);
  const frame1 = Math.floor(frameIndex);
  const t = frameIndex - frame1;

  const isLookAtActive = scrollProgress >= lookAtRange[0] && scrollProgress <= lookAtRange[1];

  return (
    <div
      style={{
        position: 'fixed',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(0,0,0,0.8)',
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 1000,
        minWidth: '120px',
      }}
    >
      <div style={{ marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>Timeline</div>

      {animationData.map((keyframe, index) => {
        const isActive = index === frame1;
        const keyframeTime = index / (totalFrames - 1);
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
              padding: '4px',
              borderRadius: '4px',
              background: isActive ? 'rgba(255, 255, 0, 0.3)' : 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isActive ? '#ffff00' : '#666',
                marginRight: '8px',
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontWeight: isActive ? 'bold' : 'normal' }}>
                {keyframeTime.toFixed(4)}
              </div>
              <div style={{ fontSize: '10px', color: '#aaa', marginTop: '2px' }}>
                KF {index + 1}
              </div>
            </div>
          </div>
        );
      })}

      {/* Display for Mapped Animation Progress */}
      <div
        style={{
          marginTop: '15px',
          padding: '8px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{scrollProgress.toFixed(4)}</div>
        <div style={{ fontSize: '10px', color: '#aaa' }}>Mapped Progress</div>
      </div>

      {/* Display for Raw Scroll Progress */}
      {rawProgress !== undefined && (
        <div
          style={{
            marginTop: '10px',
            padding: '8px',
            background: 'rgba(150, 150, 255, 0.15)',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#aaccff' }}>{rawProgress.toFixed(4)}</div>
          <div style={{ fontSize: '10px', color: '#aaa' }}>Raw Scroll</div>
        </div>
      )}
      
      {/* "LOOKAT ACTIVE" Indicator */}
      <div
        style={{
          marginTop: '10px',
          padding: '8px',
          background: isLookAtActive ? 'rgba(255,0,0,0.3)' : 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
          textAlign: 'center',
          border: isLookAtActive ? '2px solid #ff0000' : '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <div style={{ fontSize: '10px', fontWeight: 'bold' }}>
          {isLookAtActive ? '🚨 LOOKAT ACTIVE' : 'Normal Mode'}
        </div>
        <div style={{ fontSize: '9px', color: '#aaa' }}>
          {lookAtRange[0]} → {lookAtRange[1]}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
