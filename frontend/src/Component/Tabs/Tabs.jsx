import styled from "styled-components";
import React from "react";
const TabContainer = styled.div`
  padding: 20px 30px;
  background:  ${props => props.$active ? '#1f5b64' : 'white'};
  color:  ${props => props.$active ? 'white' : '#1f5b64'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  min-width: 180px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border:2px solid ${props => props.$active ? '#1f5b64' : '#e9f6fa'};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
    border-color: #1f5b64;
    background: ${props => props.$active ? '#17464d' : 'rgba(160, 164, 168, 1)'};
  }
`;

const TabMedia = styled.div`
  font-size: 28px;
  margin-bottom: 12px;
  color: ${props => props.$active ? 'white' : '#6ba7b6'};
`;

const TabDescription = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

function Tabs({ description, media, active, onClick}) {
  return (
    <TabContainer $active={active} onClick={onClick}>
      <TabMedia $active={active}>{media}</TabMedia>
      <TabDescription>{description}</TabDescription>
    </TabContainer>
  );
}

export default Tabs;