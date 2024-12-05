import React, { useEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";

const Marquee = forwardRef((props, ref) => {
  const marqueeRef = ref || useRef(); // Verwende die übergebene ref oder erstelle eine eigene
  const marqueeContentRef = useRef();

  useEffect(() => {
    const init = () => {
      const marquee = marqueeRef.current;
      if (!marquee) return;

      const marqueeContent = marqueeContentRef.current;
      if (!marqueeContent) return;

      const marqueeContentClone = marqueeContent.cloneNode(true);
      marquee.append(marqueeContentClone);

      const duration = 120; // Animation-Dauer in Sekunden

      let tween;

      const playMarquee = () => {
        let progress = tween ? tween.progress() : 0;
        tween && tween.progress(0).kill();

        const contentWidth = parseInt(
          getComputedStyle(marqueeContent).getPropertyValue("width"),
          10
        );

        const gap = parseInt(
          getComputedStyle(marqueeContent).getPropertyValue("gap"),
          10
        );

        const distanceToTranslate = -1 * (contentWidth + gap);

        // Startposition der Inhalte setzen
        gsap.set(marquee.children, { x: 0 });

        tween = gsap.fromTo(
          marquee.children,
          { x: 0 },
          { x: distanceToTranslate, duration, ease: "none", repeat: -1 }
        );

        tween.progress(progress);
      };

      playMarquee();

      const handleResize = () => {
        playMarquee();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        tween && tween.kill();
      };
    };

    init();
  }, [marqueeRef, marqueeContentRef]);

  return (
    <div
      ref={marqueeRef}
      className="marquee"
      style={{
        width: "100%",
        display: "flex",
        overflow: "hidden",
        position: "absolute",
        top: "100%",
        left: "0", // Startet von der linken Seite des Bildschirms
        whiteSpace: "nowrap",
      }}
    >
      <div
        ref={marqueeContentRef}
        className="marquee-content"
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontSize: "3rem",
            color: "red",
            fontFamily: "Times",
            margin: 0,
          }}
        >
One ring to rule them all.
        </span>
        <span
          style={{
            fontSize: "3rem",
            color: "green",
            fontFamily: "Times",
            margin: 0,
          }}
        >
        One ring to rule them all.
        </span>
        <span
          style={{
            fontSize: "3rem",
            color: "blue",
            fontFamily: "Times",
            margin: 0,
          }}
        >
       One ring to rule them all.
        </span>
      </div>
    </div>
  );
});

export default Marquee;
