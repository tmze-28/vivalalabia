import React, { useRef } from "react";
import { gsap } from "gsap";

const TextIntroduction = ({ text }) => {
  const textRef = useRef();

//   const handleClick = () => {
//     // Text mit GSAP einblenden
//     gsap.fromTo(
//       textRef.current,
//       { opacity: 0, y: -50 }, // Startwerte
//       { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" } // Endwerte
//     );
//   };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Der unsichtbare Text */}
      <div
        ref={textRef}
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          opacity: 0, // Start mit Unsichtbarkeit
        }}
      >
        {text}
      </div>
      
    </div>
  );
};

export default TextIntroduction;
