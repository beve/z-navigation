import { useCallback, useEffect } from 'react'
import { useSpring, config } from '@react-spring/core'
import { useGesture } from 'react-use-gesture'
import clamp from 'lodash/clamp'

export default function useYScroll(bounds, props) {
  const [{ y }, set] = useSpring(() => ({ y: 0, config: config.slow }))
  const fn = useCallback(
    ({ event, direction, distance, velocity, xy: [, cy], previous: [, py], memo = y.getValue() }) => {
      let newY
      if (event.type === 'touchmove') {
        const [, sign] = direction;
        newY = clamp((memo + (sign * distance) * 0.2), ...bounds)
      } else if (event.type === 'wheel') {
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