import styled from "styled-components";
import React from "react";
const FooterContainer = styled.footer`
  background: linear-gradient(135deg, rgba(102, 172, 185, 1) 0%, rgba(65, 137, 151, 1) 100%);
  padding: 10px 5px;
  border-top: 2px solid rgba(26, 74, 83, 0.3);
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
    
    i {
      color: white;
    }
  }
  
  i {
    color: rgba(26, 74, 83, 1);
    font-size: 1.2rem;
    transition: all 0.2s ease;
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: white;
  font-size: 0.8rem;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  opacity: 0.9;
`;

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <SocialIcons>
        <IconLink 
          href="https://www.facebook.com/share/1DTVMDqu6U/" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <i className="fa-brands fa-square-facebook"></i>
        </IconLink>
        
        <IconLink 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <i className="fa-brands fa-instagram"></i>
        </IconLink>
        
        <IconLink 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="fa-brands fa-square-linkedin"></i>
        </IconLink>
      </SocialIcons>
      
      <Copyright>
        © {currentYear} Hurghada University
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;