"use client";

import {
  Children,
  Fragment,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollReveal.module.css";

// useLayoutEffect warns during SSR; this swaps it for useEffect on the server
// so the reveal is applied before paint in the browser and skipped on the server.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ScrollRevealProps {
  children: ReactNode;
  playOnLoad?: boolean;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  // Fires once the words have settled. Only the playOnLoad path reports it, since
  // that is the one with a fixed end; scroll-scrubbed text has no moment of completion.
  onRevealComplete?: () => void;
}

export default function ScrollReveal({
  children,
  playOnLoad = false,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  onRevealComplete,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // The parent passes a new callback on every render. Reading it through a ref
  // keeps it out of the effect deps, so a completion cannot restart the tween.
  const onRevealCompleteRef = useRef(onRevealComplete);
  onRevealCompleteRef.current = onRevealComplete;

  // Plain strings split into words. Elements (a link, a logo) cannot be split,
  // so each one rides as a single word and animates as a unit. Fragments are
  // flattened rather than treated as elements, otherwise a paragraph built from
  // segments would animate as one blob instead of word by word.
  const splitText = useMemo(() => {
    const out: ReactNode[] = [];
    let key = 0;

    const pushText = (text: string) => {
      text.split(/(\s+)/).forEach((piece) => {
        if (!piece) return;
        out.push(
          /^\s+$/.test(piece) ? (
            piece
          ) : (
            <span className={styles.word} data-sr-word key={key++}>
              {piece}
            </span>
          ),
        );
      });
    };

    const walk = (node: ReactNode) => {
      if (node === null || node === undefined || node === false || node === true) {
        return;
      }

      if (typeof node === "string" || typeof node === "number") {
        pushText(String(node));
        return;
      }

      if (Array.isArray(node)) {
        node.forEach(walk);
        return;
      }

      if (isValidElement(node)) {
        if (node.type === Fragment) {
          Children.forEach((node.props as { children?: ReactNode }).children, walk);
          return;
        }
        out.push(
          <span className={styles.word} data-sr-word key={key++}>
            {node}
          </span>,
        );
      }
    };

    walk(children);

    return out;
  }, [children]);

  useIsoLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>("[data-sr-word]");

    // Without this the words stay at baseOpacity, which is invisible at rest.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { rotate: 0 });
      gsap.set(words, { opacity: 1, filter: "none" });
      return;
    }

    if (playOnLoad) {
      // Runs on every page load, no scroll trigger and no replay guard: the
      // intro is the first thing on the page, so it animates as soon as the
      // page paints.
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { rotate: baseRotation, transformOrigin: "0% 50%" },
          { rotate: 0, duration: 1.4, ease: "power2.out" },
        );
        gsap.fromTo(
          words,
          {
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : "none",
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.045,
            ease: "power2.out",
            // With a stagger, onComplete fires after the last word settles, not the first.
            onComplete: () => onRevealCompleteRef.current?.(),
          },
        );
      }, el);

      return () => ctx.revert();
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: rotationEnd,
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        words,
        { opacity: baseOpacity },
        {
          ease: "none",
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        },
      );

      if (enableBlur) {
        gsap.fromTo(
          words,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=20%",
              end: wordAnimationEnd,
              scrub: true,
            },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, [
    baseOpacity,
    baseRotation,
    blurStrength,
    enableBlur,
    playOnLoad,
    rotationEnd,
    wordAnimationEnd,
  ]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${containerClassName}`}
    >
      <p className={`${styles.text} ${textClassName}`}>{splitText}</p>
    </div>
  );
}
