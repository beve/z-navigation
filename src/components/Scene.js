import React, { useContext, useEffect, useRef, useState } from "react"
import Background from './Background'
import Card from "./Card"
import SVG from "./SVG"
import Text from "./Text"
import { a, useSpring } from '@react-spring/three'
import * as THREE from 'three'
import { useFrame, Dom, useThree, extend } from "react-three-fiber"
import useYScroll from '../utils/useYScroll'
import groups from "../groups"
import { DispatchContext } from './AnimationContext'
import Effects from './Effects'
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'
extend({ DeviceOrientationControls })


const Scene = ({ isMobile }) => {

  const ambiances = [];
  const xPos = [-4, -3, 6, 6];
  const yPos = [-4, 4, 3, -5];

  const controlsRef = useRef()

  const cardsContainerRef = useRef()

  const dispatch = useContext(DispatchContext)

  const [{ color: fogColor }, setFogColor] = useSpring(() => ({ color: groups[0].backgroundColor }))

  // const { type: deviceOrientation } = useOrientation()
  // const deviceMotion = useMotion()

  useEffect(() => void dispatch({ type: 'setCardsContainer', cardsContainerRef }), [])

  // const [dom, setDom] = useState()

  const motion = useRef([0, 0])

  const motionprocess = (event) => {
    motion.current = [event.alpha, event.beta]
  }

  useEffect(() => {
    if (isMobile) {
      window.addEventListener('devicemotion', motionprocess, true)
      return () => {
        window.removeEventListener('devicemotion', motionprocess)
      }
    }
  }, [])

  useFrame(({ camera, mouse, scene }) => {
    const currentZ = -y.value * 0.05;
    if (ambiances.length === 0) return;
    ambiances.forEach(amb => {
      if (Math.round(Math.round(currentZ) === amb.z && fogColor !== amb.backgroundColor)) {
        setFogColor({ color: amb.backgroundColor })
        // scene.fog.color = fogColor.value
      }
    })
    if (isMobile) {
      // camera.rotation.y = camera.rotation.y + (motion.current.beta * 0.01);
      // camera.rotation.y = lerp(camera.rotation.x, deviceMotion.rotationRate.beta, 0.01);
      // camera.rotation.y = deviceMotion.rotationRate.beta * 0.01;
      // setDom(deviceMotion.rotationRate.beta)
    } else {
      camera.rotation.x = mouse.y * 0.15;
      camera.rotation.y = -mouse.x * 0.15;
    }
  })

  const { camera } = useThree();

  // On device orientation change, adapt camera fov
  // useEffect(() => {
  // setDom(JSON.stringify(deviceOrientation))
  // if (typeof deviceOrientation === 'string' && deviceOrientation.match(/portrait/)) {
  //   camera.fov = 120;
  // } else {
  //   camera.fov = 190;
  // }
  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix()
  // document.getElementsByName('canvas').style.rotation = 90;
  // }, [deviceOrientation])


  // fogColor.interpolate(c => {console.log(`ici ${c}`); scene.background = new THREE.Color('#fff')})
  // if (scene.fog) scene.fog.color = fogColor.interpolate(c => new THREE.Color(c))


  // fogColor.interpolate(c => scene.background = new THREE.Color(c))

  // z is position assigned to ambiances and components
  let z = 0;
  // Process groups and define ambiances and components to be displayed in scene
  const components = groups.map((group) => {
    let cardNum = 0;
    const { backgroundColor } = group;
    ambiances.push({ backgroundColor, z: z || 5 });
    // Calculate ambiance Z pos
    const tmp = group.children.map(({ type, props }, i) => {
      // Calculate components Z pos
      switch (type) {
        case "text":
          const t = (
            <Text
              key={i}
              {...props}
              color={group.textColor}
              position={[0, 0, z + i]}
            />
          );
          z -= 5;
          return t;
        case "svg":
          const s = (
            <SVG
              key={i}
              {...props}
              position={[0, 0, z + i]}
            />
          );
          z -= 5;
          return s;
        default:
          const c = (
            <Card
              key={i}
              {...props}
              position={[xPos[cardNum % 4], yPos[cardNum % 4], z]}
              // y={y * 0.05}
              maskColor={group.maskColor}
              iconColor={group.iconColor}
            />
          );
          z -= (++cardNum === group.children.length - 1) ? 12 : 1;
          return c;
      }
    });
    return tmp;
  });

  let [y] = useYScroll([-100, (z * -17)], { domTarget: window })

  dispatch({ type: 'setMinZ', value: z + 10 })

  useFrame(() => {
    if (isMobile) {
      controlsRef.current.update()
    }
  })

  useEffect(() => {
    camera.setRotationFromEuler(new THREE.Euler(0, 0, 0))
  }, [camera])

  return (
    <>
      <ambientLight />
      {isMobile && <deviceOrientationControls ref={controlsRef} args={[camera]} />}
      <Background color={fogColor} />
      <a.fog attach="fog" color={fogColor} args={[fogColor.value, 10, 25]} />
      <a.group ref={cardsContainerRef} position-z={y.to(y => y * 0.05)}>
        {[components]}
      </a.group>
      <Dom>
        <SVG src="/assets/eye.png" position={[-1, -1, 0]} />
      </Dom>
    </>
  );
};

export default Scene;
