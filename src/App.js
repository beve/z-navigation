import React from 'react';
import './App.css';
import AnimationCanvas from './components/AnimationCanvas'

function App() {

  return (
    <>
      <video id="video1" crossOrigin="anonymous" playsInline loop preload="true" muted controls={false} style={{ display: 'none' }}>
        <source src="/assets/video1.mp4" type="video/mp4" />
      </video>
      <video id="video2" crossOrigin="anonymous" playsInline loop preload="true" muted controls={false} style={{ display: 'none' }}>
        <source src="https://ak2.picdn.net/shutterstock/videos/1029926642/preview/stock-footage-automotive-engineer-working-on-electric-car-chassis-platform-using-tablet-computer-with-augmented.mp4" type="video/mp4" />
      </video>
      <AnimationCanvas />
    </>
  );
}

export default App;