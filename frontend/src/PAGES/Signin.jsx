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
  max-width: 500px; /* زيادة العرض */
  background: rgba(245, 253, 255, 0.69);
  border-radius: 20px;
  padding: 40px 35px;
  box-shadow: 0 10px 30px rgb(26,74,83);
  text-align: center;
`;

const Title = styled.h2`
  color: #6ba7b6;
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

const ContactIcon = styled.a`
  cursor: pointer;
  transition: transform 0.3s;
  color:rgba(65, 137, 151, 1);
  &:hover {
    transform: scale(1.2);
  }
`;
const GoogleButton = styled.button`
  width: 100%;
  padding: 15px;
  background: white;
  color: #757575;
  border: 1px solid #17464d;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.3s;

  &:hover {
    background: #f5f5f5;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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
const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "student",
    level: 1
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const levelMap = {
    1: "Freshman",
    2: "Sophomore",
    3: "Junior",
    4: "Senior",
    5: "Graduate"
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!data.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!data.email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      setError("Invalid email format");
      return false;
    }
    if (data.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (!data.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!/^[+]?[0-9\-\s]+$/.test(data.phone)) {
      setError("Please enter a valid phone number");
      return false;
    }
    if (data.role === "student" && (!data.level || data.level < 1 || data.level > 5)) {
      setError("Academic year is required and must be between 1 and 5 ");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      let endpoint = "";
      let requestBody = {};

      if (data.role === "student") {
        endpoint = `${API_BASE}/api/auth/student/register`;
        requestBody = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          level: levelMap[data.level] || "Freshman",
          password: data.password
        };
      } else if (data.role === "admin") {
        endpoint = `${API_BASE}/api/auth/admin/register`;
        requestBody = {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          status: "pending"
        };
      }

      console.log("Sending request to:", endpoint);
      console.log("Request body:", requestBody);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok && result.success) {
        if (data.role === "student") {
          setSuccess("Student account created successfully! Redirecting to Home...");
          setTimeout(() => {
            navigate("/home");
          }, 1500);
        }
        if (data.role === "admin") {
          setSuccess("Admin account created! Waiting for approval by the first admin. Redirecting to Home...");
          setTimeout(() => {
            navigate("/home");
          }, 1500);
        }
      } else {
        setError(result.message || result.error || "Registration failed");
      }

    } catch (err) {
      console.error("Registration error:", err);
      setError("Server error. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/api/auth/google`;
  };
  return (
    <PageWrapper>
      <Card>
        <Title>Create Account</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={data.name}
            disabled={loading}
            required
          />

          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={data.email}
            disabled={loading}
            required
          />

          <Input
            name="phone"
            placeholder="Phone Number (e.g., 01234567890)"
            onChange={handleChange}
            value={data.phone}
            disabled={loading}
            required
          />

          <Input
            name="password"
            type="password"
            placeholder="Password (minimum 6 characters)"
            onChange={handleChange}
            value={data.password}
            disabled={loading}
            required
          />

          {data.role === "student" && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                textAlign: 'left',
                marginBottom: '8px',
                color: '#1f5b64',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Academic Year
              </div>
              <Input
                name="level"
                type="number"
                placeholder="Academic Year (1-5)"
                onChange={handleChange}
                value={data.level}
                disabled={loading}
                min="1"
                max="5"
                required
              />
            </div>
          )}

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
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
        <GoogleButton onClick={handleGoogleLogin} disabled={loading}>
          <i className="fa-brands fa-google" style={{ color: "#17464d" }}></i>
          Continue with Google
        </GoogleButton>
        <Text>
          Already have an account?{" "}
          <Link to="/login">
            <LinkText>Login</LinkText>
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

export default SignUp;