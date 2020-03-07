import React, { useContext, useEffect, useRef } from "react"
import Background from './Background'
import Card from "./Card"
import SVG from "./SVG"
import Text from "./Text"
import { a, useSpring } from '@react-spring/three'
import { useFrame, useThree } from "react-three-fiber"
import useYScroll from '../utils/useYScroll'
import groups from "../groups"
import { DispatchContext } from './AnimationContext'
import Effects from './Effects'

const Scene = () => {

  const ambiances = [];
  const xPos = [-4, -3, 6, 6];
  const yPos = [-4, 4, 3, -5];

  const [y] = useYScroll([-100, 2400], { domTarget: window })

  const cardsContainerRef = useRef()

  const dispatch = useContext(DispatchContext)

  const [{ color: fogColor }, setFogColor] = useSpring(() => ({ color: groups[0].backgroundColor }))

  useEffect(() => void dispatch({ type: 'setCardsContainer', cardsContainerRef }), [])

  useFrame(({camera, mouse, scene }) => {
    const currentZ = -y.value * 0.05;
    if (ambiances.length === 0) return;
    ambiances.forEach(amb => {
      if (Math.round(Math.round(currentZ) === amb.z && fogColor !== amb.backgroundColor)) {
        setFogColor({color: amb.backgroundColor})
        // scene.fog.color = fogColor.value
      }
    })
    camera.rotation.x = mouse.y * 0.15;
    camera.rotation.y = -mouse.x * 0.15;
  })


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
              y={y * 0.05}
              maskColor={group.backgroundColor}
            />
          );
          z -= (++cardNum === group.children.length - 1) ? 12 : 1;
          return c;
      }
    });
    return tmp;
  });

  dispatch({ type: 'setMinZ', value: z + 10 })

  return (
    <>
      <ambientLight />
      <Background color={fogColor} />
      <a.fog attach="fog" color={fogColor} args={[fogColor.value, 10, 25]} />
      <a.group ref={cardsContainerRef} position-z={y.to(y => y * 0.05)}>
        {[components]}
      </a.group>
    </>
  );
};

export default Scene;
