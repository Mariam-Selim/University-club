import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  min-height: 100vh;
  background:
    linear-gradient(rgba(26,74,83,0.2), rgba(26,74,83,0.2)),
    url("../48.jpg") center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Card = styled.div`
  width: 90%;
  max-width: 450px;
  background: rgba(245, 253, 255, 0.69);
  border-radius: 20px;
  padding: 40px 35px;
  box-shadow: 0 10px 30px rgb(26,74,83);
  text-align: center;
`;

const Title = styled.h2`
  color: #6ba7b64;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: none;
  border-radius: 8px;
  background: #e9f6fa;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  
  &:focus {
    border: 2px solid #6ba7b6;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 20px 0;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  cursor: pointer;
  color: rgba(65, 137, 151, 1);
  font-weight: 500;
  
  input[type="radio"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    
    &:disabled {
      cursor: not-allowed;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #1f5b64 0%, #1a4a53 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 4px 15px rgba(31, 91, 100, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.7s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, #17464d 0%, #143a42 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(31, 91, 100, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #8bc5d3 0%, #6ba7b6 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 8px rgba(31, 91, 100, 0.1);
    
    &::before {
      display: none;
    }
  }
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
const Text = styled.p`
  margin-top: 20px;
  font-size: 15px;
  color: rgba(65, 137, 151, 1);
`;

const LinkText = styled.span`
  color: #1f5b64;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;

  &:hover {
    color: #17464d;
  }
`;

const Contact = styled.div`
  margin-top: 25px;
  font-size: 18px;
  color: rgba(65, 137, 151, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const ContactIcon = styled.span`
  cursor: pointer;
  transition: transform 0.3s;
  color:rgba(65, 137, 151, 1);
  &:hover {
    transform: scale(1.2);
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: left;
`;

const SuccessMessage = styled.div`
  color: #2e7d32;
  background-color: #e8f5e9;
  border: 1px solid #c8e6c9;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: left;
`;

const API_BASE = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    identifier: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!data.identifier || !data.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        data.role === "admin"
          ? `${API_BASE}/api/auth/admin/login`
          : `${API_BASE}/api/auth/student/login`;

      const requestBody = {
        email: data.identifier,
        password: data.password
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("STATUS:", response.status);
      console.log("RESULT:", result);

      if (!response.ok) {
        setError(result.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      if (!result.token) {
        setError("Login failed: token not returned from server");
        setLoading(false);
        return;
      }
      const userData = {
        ...result.data,
        role: data.role,
        status: result.data?.status || "approved",
      };
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(userData));
      if (data.role === "student") {
        setSuccess("Login successful! Redirecting to Home...");
        setTimeout(() => navigate("/home"), 1500);
      }
      if (data.role === "admin") {
        if (result.data.isSuperAdmin || userData.status === "approved") {
          setSuccess("Admin login successful! Redirecting to Dashboard...");
          setTimeout(() => navigate("/dashboard"), 1500);
        } else if (userData.status === "pending") {
          setError("Your admin account is pending approval.");
          setTimeout(() => navigate("/home"), 1500);
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setError(err.message || "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageWrapper>
      <Card>
        <Title>Hurghada University</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="identifier"
            placeholder="Email"
            value={data.identifier}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="role"
                value="student"
                checked={data.role === "student"}
                onChange={handleChange}
                disabled={loading}
              />
              Student
            </RadioLabel>

            <RadioLabel>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={data.role === "admin"}
                onChange={handleChange}
                disabled={loading}
              />
              Admin
            </RadioLabel>
          </RadioGroup>

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Text>
          Don't have an account?{" "}
          <Link to="/Signin">
            <LinkText>Sign up</LinkText>
          </Link>
        </Text>

        <Contact>
          Contact with
          <ContactIcon href="https://eman2004259@gmail.com">
            <i className="fa-solid fa-envelope"></i>
          </ContactIcon>
          <ContactIcon href="https://www.facebook.com/share/1DTVMDqu6U/">
            <i className="fa-brands fa-square-facebook"></i>
          </ContactIcon>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <LinkText>Contact Us</LinkText>
          </Link>
        </Contact>
      </Card>
    </PageWrapper>
  );
};

export default Login;