import React from 'react';
import './App.css';
import AnimationCanvas from './components/AnimationCanvas'

function App() {

  return (
    <>
      <video id="video1" crossOrigin="anonymous" playsInline loop preload="true" muted controls={false} style={{ display: 'none' }}>
        <source src="https://ak7.picdn.net/shutterstock/videos/1036579007/preview/stock-footage-close-up-shot-of-a-surgeon-doctor-with-augmented-reality-vr-glasses-looking-at-futuristic-medical.mp4" type="video/mp4" />
      </video>
      <video id="video2" crossOrigin="anonymous" playsInline loop preload="true" muted controls={false} style={{ display: 'none' }}>
        <source src="https://ak2.picdn.net/shutterstock/videos/1029926642/preview/stock-footage-automotive-engineer-working-on-electric-car-chassis-platform-using-tablet-computer-with-augmented.mp4" type="video/mp4" />
      </video>
      <AnimationCanvas />
    </>
  );
}

export default App;