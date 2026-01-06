import styled from "styled-components";
import React from "react";
const Navbackgroundstyle = styled.div`
  width: 100%;
  height: 400px;    
  background-color: rgba(222, 249, 255, 1);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(10px, 5vw, 60px);
  padding: 0 clamp(10px, 5vw, 70px);
  position: relative;
  overflow: hidden;
`;

const TextBox = styled.div`
  max-width: 90%;
  color: rgb(26, 74, 83);
  flex: 1;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
  line-height: 1.5;
  width: clamp(60%, 30vw, 40%);
  color: rgb(26, 74, 83);
  display: inline; 
  border-bottom: 0.16em solid rgb(26, 74, 83);
  padding-bottom: 0.15em;
`;

const Description = styled.p`
  font-size: clamp(10px, 1.2vw, 16px);
  line-height: 1.5;
  margin: 0;
  width: clamp(60%, 30vw, 40%);
  padding: 15px 0;
  color: rgb(26, 74, 83);
`;

const Image = styled.img`
  width: clamp(130px, 30vw, 500px);
  height: clamp(180px, 30vw, 260px);
  object-fit: cover;
  border-radius: 50%;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  z-index: 1;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 40px rgba(26, 74, 83, 0.3);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

function Navbackground({ text, dec, img }) {
    return (
        <Navbackgroundstyle>
            <TextBox>
                <Title>{text}</Title>
                <Description>{dec}</Description>
            </TextBox>
            <Image src={img} alt="Descriptive image" />
        </Navbackgroundstyle>
    );
}

export default Navbackground;