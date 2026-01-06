import styled from "styled-components";
import React, { useState } from "react";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 2vw, 15px);
  width: 100%;
  margin: 0 auto;
  max-width: clamp(200px, 80%, 500px);
`;

const Input = styled.input`
  padding: clamp(12px, 1.5vw, 14px);
  border-radius: 8px;
  border: 1px solid rgba(222, 249, 255, 0.43);
  background-color: rgba(222, 249, 255, 0.5);
  font-size: clamp(14px, 1.5vw, 16px);
  
  &:focus,
  &:focus-visible {
    outline: none;        
    border-color: #1a4a53; 
    box-shadow: 0 0 0 2px rgba(26, 74, 83, 0.2);
  }
  
  &::placeholder {
    color: rgba(26, 74, 83, 0.6);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: clamp(12px, 1.5vw, 14px);
  border-radius: 8px;
  border: 1px solid rgba(222, 249, 255, 0.43);
  resize: vertical;
  background-color: rgba(222, 249, 255, 0.5);
  font-size: clamp(14px, 1.5vw, 16px);
  min-height: 120px;
  
  &:focus,
  &:focus-visible {
    outline: none;        
    border-color: #1a4a53; 
    box-shadow: 0 0 0 2px rgba(26, 74, 83, 0.2);
  }
  
  &::placeholder {
    color: rgba(26, 74, 83, 0.6);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  padding: clamp(14px, 2.5vw, 18px);
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #1a4a53 0%, #2a7a8a 100%);
  color: white;
  cursor: pointer;
  font-size: clamp(15px, 2vw, 18px);
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  box-shadow: 0 4px 15px rgba(26, 74, 83, 0.25);
  
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
    background: linear-gradient(135deg, #17464d 0%, #236a78 100%);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(26, 74, 83, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(0.99);
    box-shadow: 0 2px 8px rgba(26, 74, 83, 0.3);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #8cbcc8 0%, #a8d1dc 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 5px rgba(26, 74, 83, 0.1);
    
    &::before {
      display: none;
    }
  }
  
  /* Loading spinner animation */
  .spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  }
`;

const Tat = styled.h1`
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
  line-height: 1.5;
  width: clamp(60%, 30vw, 40%);
  color: rgb(26,74,83);
  display: inline; 
  border-bottom: 0.16em solid rgb(26,74,83);
  padding-bottom: 0.15em;
`;

const Desc = styled.p`
  font-size: clamp(14px, 1.5vw, 18px);
  line-height: 1.6;
  margin: 0;
  width: clamp(60%, 30vw, 40%);
  padding: 15px 0;
  color: rgb(26,74,83);
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 12px 20px;
  border-radius: 8px;
  margin: 10px 0;
  border: 1px solid #c3e6cb;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px 20px;
  border-radius: 8px;
  margin: 10px 0;
  border: 1px solid #f5c6cb;
  text-align: center;
`;
const API_BASE = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSuccess(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill in all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const endpoint =`${API_BASE}/api/contact`;

      console.log("Sending contact data:", formData);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("Contact response:", result);

      if (!res.ok) {
        throw new Error(result.message || "Failed to send message");
      }
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setTimeout(() => {
        setSuccess(false);
      }, 5000);

    } catch (err) {
      console.error("Error sending contact message:", err);
      if (err.message.includes("Failed to fetch")) {
        setError("Cannot connect to server. Please try again later.");
      } else if (err.message.includes("429")) {
        setError("Too many requests. Please try again in an hour.");
      } else {
        setError(err.message || "Something went wrong! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Tat>Get in Touch</Tat>
      <Desc>If you have any problem, contact us anytime and we will fix it right away</Desc>

      {success && (
        <SuccessMessage>
          ✅ Message sent successfully! We'll get back to you soon.
        </SuccessMessage>
      )}

      {error && (
        <ErrorMessage>
          ⚠️ {error}
        </ErrorMessage>
      )}

      <Input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <Input
        type="email"
        name="email"
        placeholder="Your Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <Input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <TextArea
        rows={5}
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <Button disabled={loading}>
        {loading ? (
          <>
            <span className="spinner"></span>
           loading...
          </>
        ) : (
          "Send"
        )}
      </Button>
    </FormContainer>
  );
}