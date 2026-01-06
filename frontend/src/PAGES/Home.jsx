import { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Component/Navbar/Navbar.jsx";
import Footer from "../Component/Footer/Footer.jsx";
import Photo from "../Component/Photo/Photo.jsx";
import Tabs from "../Component/Tabs/Tabs.jsx";
import Card from "../Component/Card/Card.jsx";
import Button from "../Component/BUTTON/Button.jsx";
import { useNavigate } from "react-router-dom";
import React from "react";
const API_BASE = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";
const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 40px 0;
  padding: 0 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin: 40px 0;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  color: #e9f6fa;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  color: #1f5b64;
  margin-bottom: 10px;
  font-size: 20px;
`;

const EmptyText = styled.p`
  color: #6c757d;
  margin-bottom: 20px;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e9f6fa;
  border-top: 4px solid #1f5b64;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 30px 0;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  text-align: center;
  background: white;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  min-width: 150px;
`;

const JoinButton = styled(Button)`
  margin-top: 15px;
  background: #1f5b64;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;

  &:hover {
    background: #17464d;
  }
`;

const LostItemInfo = styled.div`
  background: #e9f6fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  border-left: 4px solid #6ba7b6;
`;

const LostItemText = styled.p`
  color: #1f5b64;
  font-size: 14px;
  margin: 5px 0;
  
  i {
    margin-right: 8px;
    color: #1f5b64;
  }
`;

const ContactButton = styled(Button)`
  margin-top: 15px;
  background: transparent;
  color: #1f5b64;
  border: 2px solid #1f5b64;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;

  &:hover {
    background: #1f5b64;
    color: white;
  }
`;

function Home() {
  const [activeTab, setActiveTab] = useState("past");
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState({
    past: true,
    future: true,
    lost: true
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading({ past: true, future: true, lost: true });
      const eventsRes = await fetch(`${API_BASE}/api/events?limit=6`);
      const eventsData = await eventsRes.json();

      const announcementsRes = await fetch(`${API_BASE}/api/announcements?limit=6`);
      const announcementsData = await announcementsRes.json();

      const lostRes = await fetch(`${API_BASE}/api/lost-found?limit=6`);
      const lostData = await lostRes.json();

      setPastEvents(eventsData.data || []);
      setUpcomingEvents(announcementsData.data || []);
      setLostItems(lostData.data || []);

    } catch (err) {
      console.error("Error fetching data:", err);
      setPastEvents([]);
      setUpcomingEvents([]);
      setLostItems([]);

    } finally {
      setLoading({ past: false, future: false, lost: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleJoinAnnouncement = async (announcementId) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // مش مسجل دخول
    if (!token || !user) {
      alert("Please login to join announcements");
      navigate("/login");
      return;
    }

    // لو مش طالب
    if (user.role.toLowerCase() !== "student") {
      alert("Only students can join announcements");
      return;
    }

    // تحقق إذا كان قد انضم مسبقًا لهذا الإعلان
    const currentAnnouncement = upcomingEvents.find(event => event.id === announcementId);
    const alreadyJoined = currentAnnouncement?.students?.some(student => student.id === user.id);

    if (alreadyJoined) {
      alert("You have already joined this announcement!");
      return;
    }

    // لو طالب، ينضم
    try {
      const response = await fetch(`${API_BASE}/api/announcements/${announcementId}/join`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const result = await response.json();

      if (response.ok) {
        alert("Successfully joined the announcement!");
        fetchData();       // تحدث البيانات فقط
        // تم إزالة navigate("/join") لأن الانضمام مباشر من الصفحة الرئيسية
      } else {
        alert(result.message || "Failed to join announcement");
      }
    } catch (err) {
      console.error("Error joining announcement:", err);
      alert("Error joining announcement");
    }
  };

  const renderEmptyState = (type) => {
    const config = {
      past: {
        icon: "📅",
        title: "No Events",
        message: "There are no events to display yet."
      },
      future: {
        icon: "🎯",
        title: "No Announcements",
        message: "Check back soon for new announcements!"
      },
      lost: {
        icon: "🔍",
        title: "No Lost Items",
        message: "No lost items have been reported recently."
      }
    };

    const { icon, title, message } = config[type] || config.past;

    return (
      <EmptyState>
        <EmptyIcon>{icon}</EmptyIcon>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyText>{message}</EmptyText>
      </EmptyState>
    );
  };

  const renderEvents = () => {
    const events = {
      past: pastEvents,
      future: upcomingEvents,
      lost: lostItems
    }[activeTab] || [];

    const currentLoading = {
      past: loading.past,
      future: loading.future,
      lost: loading.lost
    }[activeTab];

    if (currentLoading) {
      return (
        <LoadingContainer>
          <Spinner />
          <p>Loading {activeTab === "past" ? "events" : activeTab === "future" ? "announcements" : "lost items"}...</p>
        </LoadingContainer>
      );
    }

    if (events.length === 0) {
      return renderEmptyState(activeTab);
    }

    return (
      <EventsGrid>
        {events.map((item) => {
          if (activeTab === "lost") {
            return (
              <Card
                key={item.id}
                title={item.title}
                description={item.description}
                date={item.createdAt}
                image={item.imageUrl}
              />
            );
          } else if (activeTab === "past") {
            return (
              <Card
                key={item.id}
                image={item.imageUrl}
                title={item.title}
                date={item.date}
                description={item.description}
                location={item.location}
              />
            );
          } else {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const token = localStorage.getItem("token");
            const isStudent = token && user?.role?.toLowerCase() === "student";
            const alreadyJoined = item.students?.some(student => student.id === user.id);
            const isDisabled = !isStudent || alreadyJoined;

            return (
              <Card
                key={item.id}
                image={item.imageUrl}
                title={item.title}
                description={item.content}
                location={item.location}
                tags={item.category ? [item.category] : []}
                attendees={item._count?.students || 0}
                media={
                  <JoinButton
                    text={alreadyJoined ? `Already Joined (${item._count?.students || 0})` : `Join Announcement (${item._count?.students || 0})`}
                    onClick={() => handleJoinAnnouncement(item.id)}
                    disabled={isDisabled}
                    style={{
                      opacity: isDisabled ? 0.5 : 1,
                      cursor: isDisabled ? "not-allowed" : "pointer"
                    }}
                  />
                }
              />
            );
          }
        })}
      </EventsGrid>
    );
  };

  return (
    <Container>
      <Photo />
      <Navbar />

      <MainContent>
        <TabsContainer>
          <Tabs
            description="Last Event"
            media={<i className="fa-regular fa-calendar-check"></i>}
            active={activeTab === "past"}
            onClick={() => setActiveTab("past")}
          />
          <Tabs
            description="Upcoming Event"
            media={<i className="fa-solid fa-calendar-plus"></i>}
            active={activeTab === "future"}
            onClick={() => setActiveTab("future")}
          />
          <Tabs
            description="Lost and Found"
            media={<i className="fa-solid fa-pen-to-square"></i>}
            active={activeTab === "lost"}
            onClick={() => setActiveTab("lost")}
          />
        </TabsContainer>

        {renderEvents()}
      </MainContent>

      <Footer />
    </Container>
  );
}

export default Home;