import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";

const Stylebtn = styled.button`
  transition: all 0.2s;
  &:hover {
    background: linear-gradient(
      135deg,
      rgba(31, 91, 100, 1) 0%,
      rgba(26, 74, 83, 1) 100%
    );
    transform: scale(1.05);
  }
`;

function Button({ text, to, onClick, ...rest }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (to) {
      navigate(to);
    }
  };

  return (
    <Stylebtn
      className="buttons"
      onClick={handleClick}
      style={{
        padding: "clamp(3px, 0.8vw, 3px) clamp(0px, 1vw, 20px)",
        background:
          "linear-gradient(135deg, rgba(37, 104, 116, 1) 0%, rgba(31, 91, 100, 1) 100%)",
        color: "rgb(255,255,255)",
        borderRadius: "20px",
        cursor: "pointer",
        border: "1px solid rgba(37, 104, 116, 1)",
        boxShadow: "none",
        outline: "none",
        appearance: "none",
      }}
      {...rest}
    >
      {text}
    </Stylebtn>
  );
}

export default Button;
