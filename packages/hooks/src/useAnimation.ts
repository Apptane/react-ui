import { useEffect, useState } from "react";
import raf from "raf";

// https://github.com/streamich/ts-easing/blob/master/src/index.ts
type EasingType = "linear" | "elastic" | "inExpo";
const easing = {
  linear: (n: number) => n,
  elastic: (n: number) => n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n: number) => Math.pow(2, 10 * (n - 1)),
};

/**
 * Hook that animates the value between 0 and 1 according
 * the specified animation parameters.
 *
 * @param {string} easingName name of the easing function
 * @param {number} duration total duration
 * @param {number} delay delay to start animation
 */
export function useAnimation(easingName: EasingType = "linear", duration = 500, delay = 0) {
  // useAnimationTimer hook calls useState every animation frame
  // giving us elapsed time and causing a re-render as frequently
  // as possible for a smooth animation.
  const elapsed = useAnimationTimer(duration, delay);

  // amount of specified duration elapsed on a scale from 0 - 1
  const value = Math.min(1, elapsed / duration);

  // return altered value based on our specified easing function
  return easing[easingName](value);
}

/**
 * Hook that produces animation based on timer.
 *
 * @param {number} duration total duration
 * @param {number} delay delay to start animation
 */
export function useAnimationTimer(duration = 1000, delay = 0) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(
    () => {
      let animationFrame: ReturnType<typeof raf>;
      let timerStop: ReturnType<typeof setTimeout>;
      let start: number;

      // executed on each animation frame
      function onFrame() {
        setElapsed(Date.now() - start);
        loop();
      }

      // call onFrame() on next animation frame
      function loop() {
        animationFrame = raf(onFrame);
      }

      function onStart() {
        // timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          raf.cancel(animationFrame);
          setElapsed(Date.now() - start);
        }, duration);

        // start the loop
        start = Date.now();
        loop();
      }

      // start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        raf.cancel(animationFrame);
      };
    },
    [duration, delay] // re-run on duration, delay change
  );

  return elapsed;
}
