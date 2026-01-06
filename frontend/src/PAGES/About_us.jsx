import { useState, useEffect } from "react";
import Button from "../Component/BUTTON/Button.jsx";
import Navbar from "../Component/Navbar/Navbar.jsx";
import Footer from "../Component/Footer/Footer.jsx";
import Navbackground from "../Component/Navbackground/Navbackground.jsx";
import Acheivements from "../Component/Acheivements/Acheivements.jsx";
import Text from "../Component/Text/Text.jsx";
import Galleryphoto from "../Component/Galleryphoto/Galleryphoto.jsx";
import Activity from "../Component/Activity/Activity.jsx";
import React from "react";
const API_BASE = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";
function About() {
    const [team, setTeam] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState({
        team: true,
        gallery: true
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teamRes = await fetch(`${API_BASE}/api/team`);

                if (teamRes.ok) {
                    const teamData = await teamRes.json();
                    console.log("Team API Response:", teamData);
                    if (teamData.data) {
                        const members = teamData.data.map(member => ({
                            id: member.id,
                            name: member.name,
                            role: member.role,
                            photoUrl: member.photoUrl || "https://picsum.photos/seed/team/150/150"
                        }));
                        setTeam(members);
                    } else if (Array.isArray(teamData)) {
                        const members = teamData.map(member => ({
                            id: member.id,
                            name: member.name,
                            role: member.role,
                            photoUrl: member.photoUrl || "https://picsum.photos/seed/team/150/150"
                        }));
                        setTeam(members);
                    }
                }
                const galleryRes = await fetch(`${API_BASE}/api/gallery?limit=8`);

                if (galleryRes.ok) {
                    const galleryData = await galleryRes.json();
                    console.log("Gallery API Response:", galleryData);
                    if (galleryData.data) {
                        const photos = galleryData.data.map(photo => ({
                            id: photo.id,
                            imageUrl: photo.imageUrl,
                            title: photo.title || ""
                        }));
                        setGallery(photos);
                    } else if (Array.isArray(galleryData)) {
                        const photos = galleryData.map(photo => ({
                            id: photo.id,
                            imageUrl: photo.imageUrl,
                            title: photo.title || ""
                        }));
                        setGallery(photos);
                    }
                }

            } catch (err) {
                console.error("Error loading about data", err);
            } finally {
                setLoading({
                    team: false,
                    gallery: false
                });
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbackground
                text="UNIVERSITY CLUB"
                dec="Welcome to our official club page! We're a community of passionate students who bring energy, creativity, and teamwork to every university event."
                img="WhatsApp Image 2026-01-05 at 9.14.20 PM.jpeg"
            />
            <Navbar />
            <div style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "40px"
            }}>
                <h2 style={{
                    fontSize: "40px",
                    color: "rgb(26,74,83)",
                    fontWeight: "bold",
                    borderBottom: "2px solid rgb(26,74,83)",
                }}>Meet our team</h2>
            </div>

            {loading.team ? (
                <div style={{ textAlign: "center", padding: "40px" }}>
                    <div style={{
                        width: "40px",
                        height: "40px",
                        border: "4px solid #e9f6fa",
                        borderTop: "4px solid #1f5b64",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        margin: "0 auto 20px"
                    }}></div>
                    <p style={{ color: "#1f5b64" }}>Loading team members...</p>

                    <style>
                        {`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}
                    </style>
                </div>
            ) : team.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px" }}>
                    <div style={{ fontSize: "48px", color: "#e9f6fa", marginBottom: "20px" }}>👥</div>
                    <p style={{ color: "#6c757d" }}>No team members added yet. Check back soon!</p>
                </div>
            ) : (
                <div style={{
                    display: "flex",
                    gap: "30px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    margin: "40px 0",
                    padding: "0 20px"
                }}>
                </div>
            )}
            <div style={{
                width: "90%",
                padding: "20px",
                margin: "0 auto"
            }}>
                <h2 style={{
                    fontSize: "40px",
                    color: "rgb(26,74,83)",
                    fontWeight: "bold",
                    borderBottom: "2px solid rgb(26,74,83)",
                    margin: "2px",

                }}>CLUB OVERVIEW</h2>
                <p style={{ color: "rgb(26,74,83)", fontSize: "18px", lineHeight: "1.6" }}>
                    This platform is designed to organize and manage all club activities in one place.
                    It helps students stay informed about upcoming and past events, participate
                    in activities, and engage with the club community.
                    The system also includes a Lost & Found section, allowing members to report
                    lost items or check items found by administrators.
                    Students can easily join upcoming events, view announcements,
                    and explore the club gallery showcasing memories from previous activities.
                    Administrators can manage events, announcements, members, and content efficiently through the dashboard, ensuring smooth communication and organization within the club.
                </p>
            </div>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "40px",
                margin: "40px 0"
            }}>
                <Text
                    text="VISION"
                    dec="Our vision is to create a unified digital platform that simplifies
                         club management and enhances student engagement.
                         The platform enables students to participate in events,
                          stay informed, and connect with their community in an 
                          organized and interactive way.
                         By combining event management, lost & found services, 
                         announcements, and a gallery, we aim to provide an efficient, transparent, and user-friendly experience for both students and administrator"
                />
                <Text
                    text="MISSION"
                    dec="Our mission is to provide students and administrators
                     with a seamless, all-in-one platform for managing club activities.
                     We strive to facilitate participation in events, streamline
                      communication, maintain transparency in announcements, and 
                      make lost & found services accessible and efficient.
                     Through a user-friendly interface and organized features,
                      we aim to foster a connected, engaged, and well-informed student communit"
                />
            </div>
            <div style={{ margin: "40px 0" }}>
                <Text text="Achievements" />
                <Acheivements />
            </div>
            <div style={{ margin: "40px 0" }}>
                <Text text="GALLERY" />

                {loading.gallery ? (
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        <div style={{
                            width: "40px",
                            height: "40px",
                            border: "4px solid #e9f6fa",
                            borderTop: "4px solid #1f5b64",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            margin: "0 auto 20px"
                        }}></div>
                        <p style={{ color: "#1f5b64" }}>Loading gallery...</p>
                    </div>
                ) : gallery.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        <div style={{ fontSize: "48px", color: "#e9f6fa", marginBottom: "20px" }}>📷</div>
                        <p style={{ color: "#6c757d" }}>No gallery images added yet. Check back soon!</p>
                    </div>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "20px",
                        margin: "40px 0",
                        padding: "0 20px",
                        maxWidth: "1200px",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>
                        {gallery.map(photo => (
                            <Galleryphoto
                                key={photo.id}
                                img={photo.imageUrl}
                                text={photo.title}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div style={{ margin: "40px 0" }}>
                <Text text="OUR ACTIVITY" />
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "20px",
                    maxWidth: "800px",
                    margin: "0 auto",
                    padding: "0 20px"
                }}>
                    <Activity text="Tech event" icon="fa-solid fa-gear" />
                    <Activity text="Training" icon="fa-sharp-duotone fa-solid fa-graduation-cap" />
                    <Activity text="Volunteer" icon="fa-solid fa-handshake-angle" />
                    <Activity text="Cultural" icon="fa-solid fa-earth-americas" />
                </div>
            </div>
            <div style={{
                width: "90%",
                padding: "20px",
                margin: "40px auto",
                textAlign: "center"
            }}>
                <h2 style={{
                    fontSize: "40px",
                    color: "rgb(26,74,83)",
                    fontWeight: "bold",
                    borderBottom: "2px solid rgb(26,74,83)",
                    margin: "2px auto",
                    width: "160px",
                }}>JOIN US</h2>
                <p style={{
                    color: "rgb(65,137,151)",
                    fontSize: "18px",
                    margin: "20px 0",
                    lineHeight: "1.6"
                }}>
                    Want to be part of our journey?<br />
                    Join our team and help us create unforgettable experiences for students!
                </p>
                <Button text="sign in" to="/signin" />
            </div>

            <Footer />
        </>
    );
}

export default About;