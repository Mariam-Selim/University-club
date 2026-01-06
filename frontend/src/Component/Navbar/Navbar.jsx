import Button from "../BUTTON/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
const Navstyle = styled.nav`
  position: relative; 
  left: 50%;
  transform: translateX(-50%);
  top: -390px; 
  z-index: 9999;  
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: clamp(20px, 2vw, 24px); 
  padding: clamp(4px, 1vw, 15px);
  background-color: rgba(65, 137, 151, 1);
  border-radius: 50px;
  width: clamp(200px, 85%, 1000px);
  margin: 0;  
  height: clamp(30px, 5vw, 50px);
  flex-wrap: nowrap;    
  white-space: nowrap;
  
  @media (min-width: 768px) {
    justify-content: space-between;
  }
  
  will-change: transform;
  backface-visibility: hidden;
`;

const Logo = styled.img`
  width: clamp(18px, 7vw, 40px);
  height: auto;
   &:hover {
    transform: scale(1.1);
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: clamp(4px, 2vw, 24px);
  font-size: clamp(10px, 1.5vw, 20px);
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: nowrap;
  white-space: nowrap;
`;

const NavItem = styled.li`
  a {
    color: white;
    text-decoration: none;
    font-size: inherit;
    padding: 0 clamp(2px, 1vw, 10px);
  }
  
  &:hover {
    color: rgba(26, 74, 83, 1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: clamp(1px, 1vw, 15px);
  flex-wrap: nowrap;
  align-items: center;

  button {
    font-size: clamp(7px, 1.5vw, 16px);
    padding: clamp(1px, 1vw, 5px);
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  position: relative;
  padding: 4px 8px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #6ba7b6, #e0f7ff);
    border-radius: 1px;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #e0f7ff;
    transform: translateY(-2px);
    
    &::after {
      width: 80%;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: clamp(10px, 1.2vw, 16px);
  padding: 5px 10px;
  background: rgba(31, 91, 100, 0.8);
  border-radius: 20px;
`;

const UserAvatar = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #fff;
  color: #1f5b64;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
  border: 2px solid white;
`;

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const getUserData = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
    return null;
  };
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    const userData = getUserData();
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(userData);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkLogin();
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);
  const getInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U";
  };
  const getFirstName = () => {
    if (user?.name) {
      return user.name.split(' ')[0];
    }
    return "User";
  };

  return (
    <Navstyle>
      <a style={{ textDecoration: "none" }} href="https://scu.eg/public_universities/%D8%AC%D8%A7%D9%85%D8%B9%D8%A9-%D8%A7%D9%84%D8%BA%D8%B1%D8%AF%D9%82%D8%A9/">
         <Logo src="../uni.png" alt="University Logo" />
      </a>
      
      
      <NavList>
        <NavItem>
          <StyledLink to="/">Home</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/about">About</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink to="/contact">Contact</StyledLink>
        </NavItem>
      </NavList>
      
      <ButtonGroup>
        {isLoggedIn ? (
          <UserInfo title={`${user?.name || "User"} (${user?.role || "Student"})`}>
            <UserAvatar>
              {getInitial()}
            </UserAvatar>
            <span>{getFirstName()}</span>
          </UserInfo>
        ) : (
          <>
            <Button text="Login" to="/login" />
            <Button text="Sign Up" to="/signin" />
          </>
        )}
      </ButtonGroup>
    </Navstyle>
  );
}

export default Nav;