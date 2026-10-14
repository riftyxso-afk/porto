"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

// Decrypted text, from React Bits.
//
// Two changes from the published component, both required by this site:
//
//  1. `animateOn="replay"` with a `replayKey`. The original reacts to hover, view
//     and click. Here the only trigger is the reader changing language, so the
//     scramble has to be startable from outside the component. Without it the
//     text would reappear on language change already decrypted, which is the one
//     moment it is worth animating.
//
//  2. `prefers-reduced-motion` short-circuits to plain text. The published
//     version ignores the setting, and a scramble is exactly the kind of repeated
//     motion it asks readers to opt out of.
//
// The rest is the original source: the scramble, the sequential reveal orders,
// and the click and hover behaviour are untouched.

const styles = {
  wrapper: {
    display: "inline-block",
    whiteSpace: "pre-wrap",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
    visibility: "hidden",
  },
} as const;

type AnimateOn = "view" | "hover" | "inViewHover" | "click" | "replay";

interface Props {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: AnimateOn;
  clickMode?: "once" | "toggle";
  /** Bumped by the parent to replay the decrypt. Only used when animateOn is "replay". */
  replayKey?: number;
  /** Milliseconds to wait before a replay starts, so blocks can cascade. */
  delay?: number;
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  clickMode = "once",
  replayKey = 0,
  delay = 0,
}: Props) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== "click");
  const [direction, setDirection] = useState("forward");
  const [reduced, setReduced] = useState(false);

  const containerRef = useRef<HTMLSpanElement>(null);
  const orderRef = useRef<number[]>([]);
  const pointerRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The animation runs on a timer, so the interval is stopped on unmount and
  // before any new run. Left running it would keep calling setState on a
  // component that no longer exists.
  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // A pending delay is cancelled the same way: a second switch arriving before
  // the first stagger has started must not run two scrambles at once.
  const clearDelay = useCallback(() => {
    if (delayRef.current !== null) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const availableChars = useMemo(
    () =>
      useOriginalCharsOnly
        ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
        : characters.split(""),
    [useOriginalCharsOnly, text, characters],
  );

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) =>
      originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join(""),
    [availableChars],
  );

  const computeOrder = useCallback(
    (len: number) => {
      const order: number[] = [];
      if (len <= 0) return order;
      if (revealDirection === "start") {
        for (let i = 0; i < len; i++) order.push(i);
        return order;
      }
      if (revealDirection === "end") {
        for (let i = len - 1; i >= 0; i--) order.push(i);
        return order;
      }
      const middle = Math.floor(len / 2);
      let offset = 0;
      while (order.length < len) {
        if (offset % 2 === 0) {
          const idx = middle + offset / 2;
          if (idx >= 0 && idx < len) order.push(idx);
        } else {
          const idx = middle - Math.ceil(offset / 2);
          if (idx >= 0 && idx < len) order.push(idx);
        }
        offset++;
      }
      return order.slice(0, len);
    },
    [revealDirection],
  );

  const fillAllIndices = useCallback(() => {
    const s = new Set<number>();
    for (let i = 0; i < text.length; i++) s.add(i);
    return s;
  }, [text]);

  const removeRandomIndices = useCallback((set: Set<number>, count: number) => {
    const arr = Array.from(set);
    for (let i = 0; i < count && arr.length > 0; i++) {
      const idx = Math.floor(Math.random() * arr.length);
      arr.splice(idx, 1);
    }
    return new Set(arr);
  }, []);

  const encryptInstantly = useCallback(() => {
    const emptySet = new Set<number>();
    setRevealedIndices(emptySet);
    setDisplayText(shuffleText(text, emptySet));
    setIsDecrypted(false);
  }, [text, shuffleText]);

  const triggerDecrypt = useCallback(() => {
    if (reduced) {
      setDisplayText(text);
      setIsDecrypted(true);
      setIsAnimating(false);
      setRevealedIndices(new Set<number>());
      return;
    }
    if (sequential) {
      orderRef.current = computeOrder(text.length);
      pointerRef.current = 0;
      setRevealedIndices(new Set<number>());
    } else {
      setRevealedIndices(new Set<number>());
    }
    setDirection("forward");
    setIsAnimating(true);
  }, [sequential, computeOrder, text.length, reduced, text]);

  const triggerReverse = useCallback(() => {
    if (reduced) {
      setDisplayText(text);
      setIsDecrypted(true);
      setIsAnimating(false);
      setRevealedIndices(new Set<number>());
      return;
    }
    if (sequential) {
      orderRef.current = computeOrder(text.length).slice().reverse();
      pointerRef.current = 0;
      setRevealedIndices(fillAllIndices());
      setDisplayText(shuffleText(text, fillAllIndices()));
    } else {
      setRevealedIndices(fillAllIndices());
      setDisplayText(shuffleText(text, fillAllIndices()));
    }
    setDirection("reverse");
    setIsAnimating(true);
  }, [sequential, computeOrder, fillAllIndices, shuffleText, text, reduced]);

  useEffect(() => {
    if (!isAnimating) return;

    let currentIteration = 0;

    const getNextIndex = (revealedSet: Set<number>) => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex =
            revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (
            nextIndex >= 0 &&
            nextIndex < textLength &&
            !revealedSet.has(nextIndex)
          ) {
            return nextIndex;
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices((prevRevealed) => {
        if (sequential) {
          if (direction === "forward") {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, newRevealed));
              return newRevealed;
            }
            clearTimer();
            setIsAnimating(false);
            setIsDecrypted(true);
            return prevRevealed;
          }
          if (direction === "reverse") {
            if (pointerRef.current < orderRef.current.length) {
              const idxToRemove = orderRef.current[pointerRef.current++];
              const newRevealed = new Set(prevRevealed);
              newRevealed.delete(idxToRemove);
              setDisplayText(shuffleText(text, newRevealed));
              if (newRevealed.size === 0) {
                clearTimer();
                setIsAnimating(false);
                setIsDecrypted(false);
              }
              return newRevealed;
            }
            clearTimer();
            setIsAnimating(false);
            setIsDecrypted(false);
            return prevRevealed;
          }
        } else if (direction === "forward") {
          setDisplayText(shuffleText(text, prevRevealed));
          currentIteration++;
          if (currentIteration >= maxIterations) {
            clearTimer();
            setIsAnimating(false);
            setDisplayText(text);
            setIsDecrypted(true);
          }
          return prevRevealed;
        } else {
          let currentSet = prevRevealed;
          if (currentSet.size === 0) {
            currentSet = fillAllIndices();
          }
          const removeCount = Math.max(
            1,
            Math.ceil(text.length / Math.max(1, maxIterations)),
          );
          const nextSet = removeRandomIndices(currentSet, removeCount);
          setDisplayText(shuffleText(text, nextSet));
          currentIteration++;
          if (nextSet.size === 0 || currentIteration >= maxIterations) {
            clearTimer();
            setIsAnimating(false);
            setIsDecrypted(false);
            setDisplayText(shuffleText(text, new Set<number>()));
            return new Set<number>();
          }
          return nextSet;
        }
        return prevRevealed;
      });
    }, speed);

    return clearTimer;
  }, [
    isAnimating,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    shuffleText,
    direction,
    fillAllIndices,
    removeRandomIndices,
    clearTimer,
  ]);

  const handleClick = () => {
    if (animateOn !== "click") return;
    if (clickMode === "once") {
      if (isDecrypted) return;
      setDirection("forward");
      triggerDecrypt();
    }
    if (clickMode === "toggle") {
      if (isDecrypted) {
        triggerReverse();
      } else {
        setDirection("forward");
        triggerDecrypt();
      }
    }
  };

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return;
    setRevealedIndices(new Set<number>());
    setIsDecrypted(false);
    setDisplayText(text);
    setDirection("forward");
    setIsAnimating(true);
  }, [isAnimating, text]);

  const resetToPlainText = useCallback(() => {
    clearTimer();
    setIsAnimating(false);
    setRevealedIndices(new Set<number>());
    setDisplayText(text);
    setIsDecrypted(true);
    setDirection("forward");
  }, [text, clearTimer]);

  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "inViewHover") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            triggerDecrypt();
            setHasAnimated(true);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 },
    );

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  // The replay trigger. Skips the first pass on purpose: the label should be
  // sitting there readable when the page loads, and scramble only when the
  // reader actually switches language.
  //
  // It also owns the reset effect below in replay mode. Both run on the same
  // render when the language changes, and a plain-text reset landing after the
  // scramble starts would cancel it on the first frame.
  const replayedOnce = useRef(false);

  useEffect(() => {
    if (animateOn !== "replay") return;
    if (!replayedOnce.current) {
      replayedOnce.current = true;
      return;
    }
    // A parent stagger: the block waits its turn rather than starting with the
    // rest of the paragraph, so the decrypt reads as one wave moving through.
    if (delay > 0) {
      clearDelay();
      delayRef.current = setTimeout(() => {
        delayRef.current = null;
        triggerDecrypt();
      }, delay);
      return clearDelay;
    }
    triggerDecrypt();
  }, [animateOn, replayKey, triggerDecrypt, delay, clearDelay]);

  useEffect(() => {
    if (animateOn === "replay") return;
    if (animateOn === "click") {
      encryptInstantly();
    } else {
      setDisplayText(text);
      setIsDecrypted(true);
    }
    setRevealedIndices(new Set<number>());
    setDirection("forward");
  }, [animateOn, text, encryptInstantly]);

  useEffect(() => {
    return () => {
      clearTimer();
      clearDelay();
    };
  }, [clearTimer, clearDelay]);

  const animateProps =
    animateOn === "hover" || animateOn === "inViewHover"
      ? { onMouseEnter: triggerHoverDecrypt, onMouseLeave: resetToPlainText }
      : animateOn === "click"
        ? { onClick: handleClick }
        : {};

  return (
    <motion.span
      className={parentClassName}
      ref={containerRef}
      style={styles.wrapper}
      {...animateProps}
    >
      {/* The real text, not the scramble. A screen reader landing mid-animation
          would otherwise read a row of random characters. */}
      <span style={styles.srOnly}>{text}</span>

      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealedOrDone =
            revealedIndices.has(index) || (!isAnimating && isDecrypted);
          return (
            <span
              key={index}
              className={isRevealedOrDone ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}