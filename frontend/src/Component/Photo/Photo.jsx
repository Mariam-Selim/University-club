import React, { useEffect, useState } from "react";

function Photo() {
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%",
        height: "400px",
        backgroundImage: "url(../48.jpg)",
        backgroundSize: hover ? "110%" : show ? "105%" : "100%",
        backgroundPosition: "center",
        transition: "background-size 0.8s ease",
        display: "flex",
        alignItems: "center",
        paddingLeft: "60px",
        color: "white",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hover
            ? "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0))"
            : "linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0))",
          transition: "background 0.5s ease",
        }}
      />
      <p
        style={{
          position: "relative",
          fontSize: "clamp(30px, 4.5vw, 60px)",
          fontWeight: "800",
          letterSpacing: "3px",
          textTransform: "uppercase",
          textShadow: "3px 6px 15px rgb(26,74,83)",
          margin: 0,
          transform: show
            ? hover
              ? "scale(1.05)"
              : "scale(1)"
            : "translateX(-40px)",
          opacity: show ? 1 : 0,
          transition: "all 0.6s ease",
        }}
      >
        University Club
      </p>
    </div>
  );
}

export default Photo;
