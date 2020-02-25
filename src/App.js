import React from 'react';
import './App.css';
import AnimationCanvas from './components/AnimationCanvas'

function App() {

  return (
    <>
      <video id="video1" crossOrigin="anonymous" playsInline loop preload="true" controls={false} style={{ display: 'none' }}>
        <source src="/assets/video1.mp4" type="video/mp4" />
      </video>
      <AnimationCanvas />
    </>
  );
}

export default App;