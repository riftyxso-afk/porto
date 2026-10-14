"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

// Resolved once per environment, not per render. A layout effect runs before
// the first paint, so the count starts at zero without the server-rendered
// total ever reaching the screen first.
const usePaintEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function decimalPlaces(n: number) {
  const str = n.toString();
  if (str.includes(".")) {
    const decimals = str.split(".")[1];
    if (parseInt(decimals) !== 0) return decimals.length;
  }
  return 0;
}

export function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const motionValue = useMotionValue(direction === "down" ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });

  const isInView = useInView(ref, { once: true, margin: "0px" });
  const maxDecimals = Math.max(decimalPlaces(from), decimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: maxDecimals,
        maximumFractionDigits: maxDecimals,
      };
      const formatted = Intl.NumberFormat("en-US", options).format(latest);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [maxDecimals, separator],
  );

  const start = direction === "down" ? to : from;
  const end = direction === "down" ? from : to;

  usePaintEffect(() => {
    if (ref.current && !reduced) ref.current.textContent = formatValue(start);
  }, [start, formatValue, reduced]);

  useEffect(() => {
    if (!isInView || !startWhen) return;

    // Without motion the number is simply the total, so it is written once and
    // the spring is never started.
    if (reduced) {
      if (ref.current) ref.current.textContent = formatValue(end);
      onEnd?.();
      return;
    }

    onStart?.();
    const settle = setTimeout(() => motionValue.set(end), delay * 1000);
    const done = setTimeout(() => onEnd?.(), delay * 1000 + duration * 1000);
    return () => {
      clearTimeout(settle);
      clearTimeout(done);
    };
  }, [isInView, startWhen, motionValue, from, to, delay, duration, reduced, formatValue, end, onStart, onEnd]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) ref.current.textContent = formatValue(latest);
      }),
    [springValue, formatValue],
  );

  // The finished number is what the server sends, so the value is right before
  // any script runs and stays right when motion is reduced.
  return <span className={className} ref={ref}>{formatValue(end)}</span>;
}