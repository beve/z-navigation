import React, { useRef, useCallback, useState } from 'react';
import { Canvas, useThree, useFrame } from 'react-three-fiber'
import './App.css';
import Scene from './components/Scene'

function App() {

  const mouse = useRef([0, 0])
  const zoomPos = useRef(0)
  const [canvasColor, setCanvasColor] = useState('blue')

  const onWheel = e => {
    if (e.deltaY > 0) {
      zoomPos.current -= 20
    } else {
      zoomPos.current += 20;
    }
  }

  const onMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])

  const onPointerMissed = () => {
  }

  return (

    <>
      <video id="video1" crossOrigin="anonymous" playsInline loop preload="true" controls={false} style={{ display: 'none' }}>
        <source src="/assets/video1.mp4" type="video/mp4" />
      </video>
      <Canvas
        style={{ backgroundColor: canvasColor }}
        // shadowMap
        camera={{ near: 1, far: 20, position: [0, 0, 8] }}
        onWheel={onWheel}
        // onTouchMove={onMove}
        onMouseMove={onMove}
        onPointerMissed={onPointerMissed}>
        <ambientLight />
        <spotLight
        intensity={0.2}
        position={[0, 0, 10]}
        angle={0.2}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
        <fog attach="fog" args={[canvasColor, 10, 15]} />
        
        <Scene mouse={mouse} zoomPos={zoomPos} />
      </Canvas>
    </>
  );
}

export default App;