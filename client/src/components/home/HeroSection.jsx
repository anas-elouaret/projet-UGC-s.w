import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, HoverGlow, Parallax, TextReveal } from "../animations";
import GrowstackScene from "./HologramLogo";

gsap.registerPlugin(ScrollTrigger);

const collageItems = [
  {
    name: "@yasmine",
    video:
      "https://cdn.coverr.co/videos/coverr-smiling-woman-using-a-phone-1577/1080p.mp4",
  },
  {
    name: "@anas_b",
    video:
      "https://cdn.coverr.co/videos/coverr-aerial-view-of-a-futuristic-city-at-night-1579/1080p.mp4",
  },
  {
    name: "@mehdi",
    video:
      "https://cdn.coverr.co/videos/coverr-thinking-man-in-office-1576/1080p.mp4",
  },
  {
    name: "@sara",
    video:
      "https://cdn.coverr.co/videos/coverr-girl-walking-on-the-street-1571/1080p.mp4",
  },
];

export default function HeroSection({ loading }) {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length || !sectionRef.current) {
        return;
      }

      const offsets = [-70, -120, -50, -95];
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: offsets[index] ?? -70,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <GrowstackScene />
  );
}
