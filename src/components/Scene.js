import React, { useContext } from "react"
import Card from "./Card"
import SVG from "./SVG"
import Text from "./Text"
import * as THREE from 'three'
import {
  apply as applySpring,
  useSpring,
  a,
  interpolate
} from "react-spring/three";
import { useFrame } from "react-three-fiber"
import groups from "../groups"
import { DispatchContext } from './AnimationContext'

const ambiances = [];
const xPos = [-2, -1.5, 3, 3];
const yPos = [-2, 2, 1.5, -2.5];

const Scene = () => {

  let fogColor = '#fff';

  const dispatch = useContext(DispatchContext)

  useFrame(({ scene, camera }) => {
    if (ambiances.length === 0) return;
    ambiances.forEach(amb => {
      if (Math.round(camera.position.z <= amb.z + 13)) {
        const c = new THREE.Color(amb.backgroundColor)
        scene.background = c
        if (scene.fog) scene.fog.color = c
      }
    })
  })

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
              color
            />
          );
          z -= (++cardNum === group.children.length - 1) ? 12 : 1;
          return c;
      }
    });
    return tmp;
  });

  dispatch({ type: 'setMinZ', value: z + 10})

  return (
    <>
      <ambientLight />
      <fog attach="fog" args={[fogColor, 10, 15]} />
      {[components]}
    </>
  );
};

export default Scene;
