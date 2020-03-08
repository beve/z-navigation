import React, { useContext, useEffect, useRef, useCallback, useState } from "react"
import Background from './Background'
import Card from "./Card"
import SVG from "./SVG"
import Text from "./Text"
import { a, useSpring } from '@react-spring/three'
import * as THREE from 'three'
import { useFrame, useThree, extend } from "react-three-fiber"
import groups from "../groups"
import { config } from '@react-spring/core'
import { useGesture } from 'react-use-gesture'
import clamp from 'lodash/clamp'
import Cursor from './Cursor'
// import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'
// extend({ DeviceOrientationControls })


const Scene = ({ isMobile, clickOutside }) => {

  const ambiances = [];
  const xPos = [-4, -3, 6, 6];
  const yPos = [-4, 4, 3, -5];

  console.log('DRAW SCENE')

  const selectedMesh = useRef()

  const [{ color: fogColor }, setFogColor] = useSpring(() => ({ color: groups[0].backgroundColor }))

  function useYScroll(bounds, props) {
    const [{ y }, set] = useSpring(() => ({ y: 0, config: config.slow }))
    const fn = useCallback(
      ({ event, direction, distance, velocity, xy: [, cy], previous: [, py], memo = y.getValue() }) => {
        let newY
        if (!selectedMesh.current && event.type === 'touchmove') {
          const [, sign] = direction;
          newY = clamp((memo + (sign * distance) * 0.15 + 1), ...bounds)
        } else if (!selectedMesh.current && event.type === 'wheel') {
          newY = clamp(memo + cy - py, ...bounds)
        }
        set({ y: newY })
        return newY
      },
      [bounds, y, set]
    )
    const bind = useGesture({ onWheel: fn, onDrag: fn }, props)
    useEffect(() => props && props.domTarget && bind(), [props, bind])
    return [y, bind]
  }

  // const [cursor, setCursor] = useState('pointer')

  let translationObjective = new THREE.Vector3()
  let origin = null;
  const { camera } = useThree()

  const onCardClickHandle = (c) => {
    // Ignore out of view cards
    if (Math.abs(y.value * 0.05 + c.position.z) > 25) {
      return;
    }
    if (c === selectedMesh.current) {
      selectedMesh.current = null;
    } else {
      selectedMesh.current = c;
      translationObjective.setFromMatrixPosition(selectedMesh.current.matrixWorld);
      translationObjective.z += 2.5;
      if (origin === null) {
        origin = new THREE.Vector3();
        origin.copy(camera.position)
      }
    }
  }

  const onCardHoverHandle = (c) => {
    // setCursor('eye')
  }

  const onCardOutHandle = (c) => {
    // setCursor('pointer')
  }

  useFrame(({ camera, mouse, scene }) => {
    const currentZ = -y.value * 0.05;
    if (ambiances.length === 0) return;
    ambiances.forEach(amb => {
      if (Math.round(Math.round(currentZ) === amb.z && fogColor !== amb.backgroundColor)) {
        setFogColor({ color: amb.backgroundColor })
        // scene.fog.color = fogColor.value
      }
    })

    if (clickOutside.current && selectedMesh.current) {
      selectedMesh.current = null
      clickOutside.current = false;
    }

    if (selectedMesh.current) {
      if (translationObjective.distanceTo(camera.position) > 0.1) {
        camera.position.lerp(translationObjective, 0.2);
      }
    } else if (origin !== null) {
      if (camera.position.distanceTo(origin) > 0.1) {
        camera.position.lerp(origin, 0.2);
      }
    }
    if (!isMobile) {
      camera.rotation.x = mouse.y * 0.15;
      camera.rotation.y = -mouse.x * 0.15;
    }
    //   if (isMobile) {
    //     controlsRef.current.update()
    //   }
  })

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
              maskColor={group.maskColor}
              iconColor={group.iconColor}
              onClick={onCardClickHandle}
              onPointerOver={onCardHoverHandle}
              onPointerOut={onCardOutHandle}
              clickOutside={clickOutside}
            />
          );
          z -= (++cardNum === group.children.length - 1) ? 4.5 : 3;
          return c;
      }
    });
    return tmp;
  });

  let [y] = useYScroll([-100, (z * -17)], { domTarget: window }, selectedMesh.current)

  return (
    <>
      <ambientLight />
      {/* {isMobile && <deviceOrientationControls ref={controlsRef} args={[camera]} />} */}
      <Background color={fogColor} />
      <a.fog attach="fog" color={fogColor} args={[fogColor.value, 10, 25]} />
      <a.group position-z={y.to(y => y * 0.05)}>
        {[components]}
      </a.group>
      {/* <Cursor cursor={cursor} /> */}
    </>
  );
};

export default Scene;
