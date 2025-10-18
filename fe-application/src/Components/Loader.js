import React from "react";

export default function Loader({ size = 50, color = "#000" }) {
  const lines = [...Array(12)];

  const wrapper = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "rgba(255,255,255,0.6)",
  };

  return (
    <div style={wrapper}>
      <div
        style={{ position: "relative", width: size * 1.5, height: size * 1.5 }}
      >
        {lines.map((_, i) => {
          const angle = i * 30;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: size * 0.12,
                height: size * 0.35,
                backgroundColor: color,
                borderRadius: size * 0.06, // rounded lines
                top: size * 0.05,
                left: size * 0.675,
                transformOrigin: `${size * 0.06}px ${size * 0.675}px`,
                transform: `rotate(${angle}deg)`,
                animation: "fade 1.2s linear infinite",
                animationDelay: `${i * 0.1}s`,
              }}
            />
          );
        })}
      </div>
      <style>{`
        @keyframes fade {
          0%, 39%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
