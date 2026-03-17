import { Composition } from 'remotion';
import React from 'react';
import { MainComposition } from './components/MainComposition';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="rumiform-launch"
        component={MainComposition as React.FC}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Lumina Architect",
          subtitle: "Transform Forms into Conversations",
        }}
      />
    </>
  );
};
