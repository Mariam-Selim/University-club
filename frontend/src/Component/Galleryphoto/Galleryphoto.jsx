import styled from "styled-components";
import React from "react";
const PhotoCard = styled.div`
  transition: transform 0.5s ease;   
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background-color: white;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  }
`;

const PhotoTitle = styled.div`
  padding: 15px;
  background-color: rgb(26,74,83);
  color: white;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
`;

function Galleryphoto({ img, text }) {
  return (
    <PhotoCard style={{
      width: "100%",
      height: "280px",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
    }}>
      <div style={{
        flex: 1,
        overflow: "hidden"
      }}>
        <img
          src={img}
          alt={text}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      {text && (
        <PhotoTitle>
          {text}
        </PhotoTitle>
      )}
    </PhotoCard>
  );
}

export default Galleryphoto;