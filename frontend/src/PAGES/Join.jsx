import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #e6f7ff 0%, #f0fdff 100%);
`;

const Container = styled.div`
  width: 90%;
  max-width: 520px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(26, 74, 83, 0.15),
              0 4px 6px rgba(26, 74, 83, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #1a4a53, #78cbdb);
  }
  
  @media (max-width: 425px) {
    padding: 30px 25px;
    border-radius: 16px;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #1a4a53;
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 42px;
  background: linear-gradient(90deg, #1a4a53, #2a7a8a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  padding-bottom: 15px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #78cbdb, #1a4a53);
    border-radius: 2px;
  }
  
  @media (max-width: 425px) {
    font-size: 32px;
    margin-bottom: 25px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 8px 0;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

const Label = styled.label`
  width: 100px;
  font-weight: 600;
  color: #1a4a53;
  font-size: 16px;
  display: flex;
  align-items: center;
  
  &::before {
    content: '•';
    color: #78cbdb;
    margin-right: 8px;
    font-size: 20px;
  }
  
  @media (max-width: 400px) {
    width: 100%;
    margin-bottom: 0;
  }
  
  @media (max-width: 425px) {
    font-size: 15px;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 14px 18px;
  border: 2px solid #e1f5f9;
  border-radius: 12px;
  outline: none;
  font-size: 16px;
  background: #f8fdff;
  transition: all 0.3s ease;
  color: #1a4a53;
  
  &:focus {
    border-color: #78cbdb;
    background: white;
    box-shadow: 0 0 0 4px rgba(120, 203, 219, 0.15);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #f0f8fa;
    color: #8aa8b0;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #a0c4cc;
  }
`;

const Button = styled.button`
  padding: 16px;
  background: ${props => props.disabled ? '#b0d8e0' : 'linear-gradient(90deg, #78cbdb, #4ab3cc)'};
  color: white;
  border: none;
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: 600;
  font-size: 18px;
  transition: all 0.3s ease;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(120, 203, 219, 0.3);

  &:hover {
    background: ${props => props.disabled ? '#b0d8e0' : 'linear-gradient(90deg, #4ab3cc, #1a4a53)'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-3px)'};
    box-shadow: ${props => props.disabled ? '0 4px 15px rgba(120, 203, 219, 0.3)' : '0 8px 20px rgba(26, 74, 83, 0.2)'};
  }
  
  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
  }
`;

const ContactSection = styled.div`
  margin-top: 30px;
  padding-top: 25px;
  border-top: 2px dashed #e1f5f9;
  text-align: center;
`;

const ContactText = styled.p`
  font-weight: 600;
  color: #1a4a53;
  margin-bottom: 15px;
  font-size: 16px;
`;

const ContactButton = styled.button`
  padding: 12px 28px;
  border: 2px solid #78cbdb;
  background: transparent;
  color: #1a4a53;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: linear-gradient(90deg, #78cbdb, #4ab3cc);
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(120, 203, 219, 0.3);
  }
  
  @media (max-width: 425px) {
    font-size: 15px;
    padding: 10px 24px;
  }
`;

const Text = styled.p`
  margin-top: 25px;
  font-size: 14px;
  color: #5a8a95;
  text-align: center;
`;

const Links = styled.span`
  color: #1a4a53;
  cursor: pointer;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.3s;
  
  &:hover {
    color: #78cbdb;
  }
  
  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

const Message = styled.div`
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  text-align: center;
  font-weight: 500;
  font-size: 15px;
  animation: slideDown 0.3s ease;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &.success {
    background: linear-gradient(135deg, #e8f7ee 0%, #d4edda 100%);
    color: #0d6932;
    border: 2px solid #c3e6cb;
  }
  
  &.error {
    background: linear-gradient(135deg, #fdf2f2 0%, #f8d7da 100%);
    color: #9b1c2c;
    border: 2px solid #f5c6cb;
  }
  
  &.warning {
    background: linear-gradient(135deg, #fffaf0 0%, #fff3cd 100%);
    color: #856404;
    border: 2px solid #ffeaa7;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const API_BASE = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

const JoinForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) {
      setMessage({
        type: "warning",
        text: "You need to login or sign up first to join the club!"
      });
    } else if (userData.role?.toLowerCase() !== "student") {
      setMessage({
        type: "error",
        text: "Only students can join the club"
      });
    } else {
      setUser(userData);
      setFormData(prev => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || ""
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message.text) setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // إذا لم يسجل دخول
    if (!user) {
      setMessage({ type: "warning", text: "Please login or sign up first to join the club!" });
      navigate("/login");
      return;
    }

    // إذا ليس طالب
    if (user.role?.toLowerCase() !== "student") {
      setMessage({ type: "error", text: "Only students can submit join requests" });
      return;
    }

    // تحقق من ملء جميع الحقول
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    // تحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage({ type: "error", text: "Session expired. Please login again." });
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_BASE}/api/join/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        // معالجة حالة Student access required
        if (result.message === "Student access required") {
          setMessage({ type: "error", text: "Your session expired or you are not authorized as a student. Please login again." });
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          throw new Error(result.message || "Failed to submit join request");
        }
        return;
      }

      setMessage({
        type: "success",
        text: "Join request submitted successfully! We'll contact you soon."
      });

      setFormData({
        name: user.name || "",
        phone: "",
        email: user.email || "",
        address: ""
      });

    } catch (error) {
      console.error("Error submitting join request:", error);
      setMessage({
        type: "error",
        text: error.message || "Something went wrong. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToAuth = () => navigate("/login");

  const isFormValid = user && Object.values(formData).every(val => val.trim() !== "");

  return (
    <PageWrapper>
      <Container>
        
        <Title>Join the event </Title>

        {message.text && (
          <Message className={message.type}>
            {message.text}

            {message.type === "warning" && (
              <div style={{ marginTop: "15px" }}>
                <Button
                  onClick={handleNavigateToAuth}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    background: "linear-gradient(90deg, #1a4a53, #2a7a8a)"
                  }}
                >
                  Go to Login
                </Button>
              </div>
            )}
          </Message>
        )}

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={!user || loading}
              placeholder={user ? "" : "Login to join"}
            />
          </FormRow>

          <FormRow>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={!user || loading}
              placeholder={user ? "Enter your phone" : "Login to join"}
            />
          </FormRow>

          <FormRow>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={!user || loading}
              placeholder={user ? "Enter your email" : "Login to join"}
            />
          </FormRow>

          <FormRow>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              required
              disabled={!user || loading}
              placeholder={user ? "Enter your address" : "Login to join"}
            />
          </FormRow>

          <Button
            type="submit"
            disabled={!user || user.role.toLowerCase() !== "student" || !isFormValid || loading}
          >
            {loading ? (
              <>
                <LoadingSpinner />
                Submitting...
              </>
            ) : (
              "Join Club"
            )}
          </Button>

        </Form>

        <Text>
          Don't have an account?{" "}
          <Links>
            <Link to="/signin">Sign up</Link>
          </Links>
        </Text>

        <ContactSection>
          <ContactText>
            Have questions? Get in touch with us
          </ContactText>
          <ContactButton onClick={() => navigate("/contact")}>
            <span>Contact Us</span>
            <span>→</span>
          </ContactButton>
        </ContactSection>
      </Container>
    </PageWrapper>
  );
};

export default JoinForm;