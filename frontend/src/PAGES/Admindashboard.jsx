import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React from "react";
const DashboardContainer = styled.div`
  padding: 30px;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const TabButton = styled.button`
  padding: 10px 25px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: ${props => props.active ? '#fff' : '#333'};
  background-color: ${props => props.active ? '#1f5b64' : '#e9f6fa'};
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? '#17464d' : '#d4e8ed'};
  }
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  
  &.primary {
    background: #1f5b64;
    color: #fff;
  }
  
  &.secondary {
    background: #6c757d;
    color: #fff;
  }
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 20px;
  border-radius: 10px;
  background: ${props => props.color || '#fff'};
  color: ${props => props.textColor || '#333'};
  text-align: center;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const StatTitle = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`;

const StatValue = styled.div`
  font-size: 24px;
`;

const TableContainer = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  background-color: #e9f6fa;
  color: #1f5b64;
  font-weight: bold;
  border-bottom: 2px solid #d4e8ed;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f8fafc;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #e9f6fa;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  color: #333;
`;

const ActionCell = styled.td`
  padding: 15px;
  display: flex;
  gap: 10px;
`;

const ActionButtonSmall = styled.button`
  padding: 6px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  
  &.edit {
    background: #ffc107;
    color: #212529;
  }
  
  &.delete {
    background: #dc3545;
    color: #fff;
  }
  
  &.approve {
    background: #28a745;
    color: #fff;
  }
  
  &.reject {
    background: #dc3545;
    color: #fff;
  }
  
  &.read {
    background: #17a2b8;
    color: #fff;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  min-width: 400px;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h3`
  margin-bottom: 20px;
  color: #1f5b64;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #1f5b64;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e9f6fa;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #1f5b64;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #e9f6fa;
  border-radius: 5px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #1f5b64;
  }
`;

const FormImage = styled.img`
  max-width: 100%;
  max-height: 150px;
  margin-top: 10px;
  border-radius: 5px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 40px;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e9f6fa;
    border-top: 4px solid #1f5b64;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #6c757d;
`;
const API_BASE = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";
export default function AdminDashboard() {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("events");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [fileUpload, setFileUpload] = useState(null);
  
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [team, setTeam] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [lostFound, setLostFound] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [pendingAdmins, setPendingAdmins] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (user.role !== "admin") {
      alert("Access denied! Admins only.");
      navigate("/");
      return;
    }

    fetchDashboardData();
  }, [navigate]);
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      try {
        const eventsRes = await fetch(`${API_BASE}/api/events`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setEvents(eventsData.data || eventsData || []);
        }
      } catch (err) {
        console.error("Events API error:", err);
      }

      try {
        const announcementsRes = await fetch(`${API_BASE}/api/announcements`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (announcementsRes.ok) {
          const announcementsData = await announcementsRes.json();
          setAnnouncements(announcementsData.data || announcementsData || []);
        }
      } catch (err) {
        console.error("Announcements API error:", err);
      }
      try {
        const teamRes = await fetch(`${API_BASE}/api/team`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (teamRes.ok) {
          const teamData = await teamRes.json();
          setTeam(teamData.data || teamData || []);
        }
      } catch (err) {
        console.error("Team API error:", err);
      }
      try {
        const galleryRes = await fetch(`${API_BASE}/api/gallery`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (galleryRes.ok) {
          const galleryData = await galleryRes.json();
          setGallery(galleryData.data || galleryData || []);
        }
      } catch (err) {
        console.error("Gallery API error:", err);
      }
      try {
        const contactsRes = await fetch(`${API_BASE}/api/contact`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (contactsRes.ok) {
          const contactsData = await contactsRes.json();
          setContacts(contactsData.data || contactsData || []);
        }
      } catch (err) {
        console.error("Contact API error:", err);
      }

      try {
        const lostFoundRes = await fetch(`${API_BASE}/api/lost-found`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (lostFoundRes.ok) {
          const lostFoundData = await lostFoundRes.json();
          setLostFound(lostFoundData.data || lostFoundData || []);
        }
      } catch (err) {
        console.error("Lost & Found API error:", err);
      }

      try {
        const contactRes = await fetch(`${API_BASE}/api/contact`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (contactRes.ok) {
          const contactData = await contactRes.json();
          const joinMessages = (contactData.data || contactData || [])
            .filter(msg => msg.subject?.toLowerCase().includes('join') || 
                          msg.message?.toLowerCase().includes('join'));
          setJoinRequests(joinMessages);
        }
      } catch (err) {
        console.error("Join Requests error:", err);
      }
      try {
        const pendingAdminsRes = await fetch(`${API_BASE}/api/admins/requests/pending`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (pendingAdminsRes.ok) {
          const pendingAdminsData = await pendingAdminsRes.json();
          setPendingAdmins(pendingAdminsData.data || pendingAdminsData || []);
        }
      } catch (err) {
        console.error("Pending Admins API error:", err);
      }

    } catch (error) {
      console.error("❌ Error fetching dashboard data:", error);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };
  const handleAdd = () => {
    setEditMode(false);
    setCurrentItem(null);
    setFormData({});
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleImageUpload = async (file) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    
    const formData = new FormData();
    formData.append("image", file);
    
    try {
      let endpoint = "";
      if (activeTab === "events") endpoint = `${API_BASE}/api/events`;
      else if (activeTab === "announcements") endpoint = `${API_BASE}/api/announcements`;
      else if (activeTab === "team") endpoint = `${API_BASE}/api/team`;
      else if (activeTab === "gallery") endpoint = `${API_BASE}/api/gallery`;
      else if (activeTab === "lostfound") endpoint = `${API_BASE}/api/lost-found`;
      
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      
      const data = await response.json();
      if (response.ok) {
        return data.data?.imageUrl || data.imageUrl;
      }
      return null;
    } catch (error) {
      console.error(" Upload failed:", error);
      return null;
    }
  };
  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      
      if (!token) {
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      let endpoint = "";
      let method = editMode ? "PUT" : "POST";
      let requestBody = new FormData();
      
      switch (activeTab) {
        case "events":
          endpoint = `${API_BASE}/api/events`;
          if (editMode && currentItem?.id) endpoint += `/${currentItem.id}`;
          requestBody.append('title', formData.title || '');
          requestBody.append('description', formData.description || '');
          requestBody.append('date', formData.date || '');
          requestBody.append('location', formData.location || '');
          requestBody.append('category', formData.category || 'General');
          if (fileUpload) requestBody.append('image', fileUpload);
          break;
          
        case "announcements":
          endpoint = `${API_BASE}/api/announcements`;
          if (editMode && currentItem?.id) endpoint += `/${currentItem.id}`;
          
          requestBody.append('title', formData.title || '');
          requestBody.append('content', formData.content || formData.description || '');
          requestBody.append('date', formData.date || '');
          requestBody.append('location', formData.location || '');
          requestBody.append('category', formData.category || 'General');
          if (fileUpload) requestBody.append('image', fileUpload);
          break;
          
        case "team":
          endpoint = `${API_BASE}/api/team`;
          if (editMode && currentItem?.id) endpoint += `/${currentItem.id}`;
          
          requestBody.append('name', formData.name || '');
          requestBody.append('role', formData.role || '');
          requestBody.append('bio', formData.bio || '');
          requestBody.append('email', formData.email || '');
          requestBody.append('phone', formData.phone || '');
          requestBody.append('order', formData.order || '1');
          if (fileUpload) requestBody.append('photo', fileUpload);
          break;
          
        case "gallery":
          endpoint = `${API_BASE}/api/gallery`;
          if (editMode && currentItem?.id) endpoint += `/${currentItem.id}`;
          
          requestBody.append('title', formData.title || '');
          requestBody.append('description', formData.description || '');
          requestBody.append('category', formData.category || 'General');
          if (fileUpload) requestBody.append('image', fileUpload);
          break;
          
        case "lostfound":
          endpoint = `${API_BASE}/api/lost-found`;
          if (editMode && currentItem?.id) endpoint += `/${currentItem.id}`;
          
          requestBody.append('title', formData.title || formData.name || '');
          requestBody.append('description', formData.description || '');
          requestBody.append('status', formData.status || 'lost');
          requestBody.append('location', formData.location || '');
          requestBody.append('contactInfo', formData.contactInfo || '');
          if (fileUpload) requestBody.append('image', fileUpload);
          break;
          
        default:
          return;
      }

      const response = await fetch(endpoint, {
        method,
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: requestBody
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || "Failed to save");
      }

      setShowModal(false);
      setFileUpload(null);
      fetchDashboardData();
      alert(editMode ? " Updated successfully!" : " Added successfully!");
      
    } catch (error) {
      console.error(" Error saving:", error);
      alert(error.message || "Failed to save. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      
      let endpoint = "";
      
      switch (activeTab) {
        case "events":
          endpoint = `${API_BASE}/api/events/${id}`;
          break;
        case "announcements":
          endpoint = `${API_BASE}/api/announcements/${id}`;
          break;
        case "team":
          endpoint = `${API_BASE}/api/team/${id}`;
          break;
        case "gallery":
          endpoint = `${API_BASE}/api/gallery/${id}`;
          break;
        case "lostfound":
          endpoint = `${API_BASE}/api/lost-found/${id}`;
          break;
        case "contacts":
          endpoint = `${API_BASE}/api/contact/${id}`;
          break;
        default:
          return;
      }

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });

      if (!response.ok) throw new Error("Failed to delete");

      fetchDashboardData();
      alert("✅ Deleted successfully!");
      
    } catch (error) {
      console.error("❌ Error deleting:", error);
      alert("Failed to delete. Please try again.");
    }
  };
  const handleApproveAdmin = async (adminId, approve) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      const endpoint = `${API_BASE}/api/admins/requests/${adminId}/${approve ? 'approve' : 'reject'}`;
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to update admin status");

      fetchDashboardData();
      alert(`✅ Admin request ${approve ? 'approved' : 'rejected'}!`);
      
    } catch (error) {
      console.error("❌ Error updating admin:", error);
      alert("Failed to update admin status");
    }
  };
  const handleUpdateContactStatus = async (id, isRead) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      const response = await fetch(`${API_BASE}/api/contact/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isRead })
      });

      if (!response.ok) throw new Error("Failed to update");

      fetchDashboardData();
      alert(`✅ Message marked as ${isRead ? 'read' : 'unread'}!`);
      
    } catch (error) {
      console.error("❌ Error updating message:", error);
      alert("Failed to update message.");
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case "events": return events;
      case "announcements": return announcements;
      case "team": return team;
      case "gallery": return gallery;
      case "contacts": return contacts;
      case "lostfound": return lostFound;
      case "joinrequests": return joinRequests;
      case "pendingadmins": return pendingAdmins;
      default: return [];
    }
  };

  const getCurrentColumns = () => {
    switch (activeTab) {
      case "events":
        return [
          { key: "title", label: "Title" },
          { key: "date", label: "Date" },
          { key: "location", label: "Location" },
          { key: "category", label: "Category" }
        ];
      case "announcements":
        return [
          { key: "title", label: "Title" },
          { key: "date", label: "Date" },
          { key: "location", label: "Location" },
          { key: "category", label: "Category" }
        ];
      case "team":
        return [
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" }
        ];
      case "gallery":
        return [
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          { key: "description", label: "Description" }
        ];
      case "contacts":
        return [
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "subject", label: "Subject" },
          { key: "isRead", label: "Status" }
        ];
      case "lostfound":
        return [
          { key: "title", label: "Item Name" },
          { key: "status", label: "Status" },
          { key: "location", label: "Location" },
          { key: "contactInfo", label: "Contact" }
        ];
      case "joinrequests":
        return [
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "subject", label: "Subject" },
          { key: "message", label: "Message" }
        ];
      case "pendingadmins":
        return [
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "status", label: "Status" }
        ];
      default:
        return [];
    }
  };
  const renderTableRows = () => {
    const data = getCurrentData();
    const columns = getCurrentColumns();

    if (data.length === 0) {
      return (
        <tr>
          <TableCell colSpan={columns.length + 1}>
            <EmptyState>
              No data found
            </EmptyState>
          </TableCell>
        </tr>
      );
    }

    return data.map((item, index) => (
      <TableRow key={item.id || index}>
        {columns.map(col => (
          <TableCell key={col.key}>
            {col.key === "isRead" ? (
              item[col.key] ? "📖 Read" : "📧 Unread"
            ) : col.key === "status" ? (
              <span style={{
                color: item.status === 'approved' || item.status === 'found' ? 'green' : 
                       item.status === 'rejected' ? 'red' : 'orange',
                fontWeight: 'bold'
              }}>
                {item.status || 'pending'}
              </span>
            ) : (
              item[col.key] || "-"
            )}
          </TableCell>
        ))}
        {activeTab === "pendingadmins" && (
          <ActionCell>
            <ActionButtonSmall 
              className="approve"
              onClick={() => handleApproveAdmin(item.id, true)}
            >
              Approve
            </ActionButtonSmall>
            <ActionButtonSmall 
              className="reject"
              onClick={() => handleApproveAdmin(item.id, false)}
            >
              Reject
            </ActionButtonSmall>
          </ActionCell>
        )}
        {activeTab === "contacts" && (
          <ActionCell>
            {!item.isRead && (
              <ActionButtonSmall 
                className="read"
                onClick={() => handleUpdateContactStatus(item.id, true)}
              >
                Mark Read
              </ActionButtonSmall>
            )}
            <ActionButtonSmall 
              className="delete"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </ActionButtonSmall>
          </ActionCell>
        )}
        {activeTab === "joinrequests" && (
          <ActionCell>
            <ActionButtonSmall 
              className="edit"
              onClick={() => alert(`Email: ${item.email}\nPhone: ${item.phone || 'N/A'}`)}
            >
              View Contact
            </ActionButtonSmall>
            <ActionButtonSmall 
              className="delete"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </ActionButtonSmall>
          </ActionCell>
        )}
        {(activeTab === "events" || activeTab === "announcements" || 
          activeTab === "team" || activeTab === "gallery" || activeTab === "lostfound") && (
          <ActionCell>
            <ActionButtonSmall 
              className="edit"
              onClick={() => handleEdit(item)}
            >
              Edit
            </ActionButtonSmall>
            <ActionButtonSmall 
              className="delete"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </ActionButtonSmall>
          </ActionCell>
        )}
      </TableRow>
    ));
  };
  const renderModalForm = () => {
    const getFormFields = () => {
      switch (activeTab) {
        case "events":
          return (
            <>
              <FormGroup>
                <FormLabel>Title *</FormLabel>
                <FormInput
                  value={formData.title || ""}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Event title"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Description *</FormLabel>
                <FormTextarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Event description"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Date *</FormLabel>
                <FormInput
                  type="datetime-local"
                  value={formData.date || ""}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Location</FormLabel>
                <FormInput
                  value={formData.location || ""}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Event location"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Category</FormLabel>
                <FormInput
                  value={formData.category || ""}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="Social, Workshop, etc."
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Upload Image</FormLabel>
                <FormInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                />
                <small style={{color: '#666', fontSize: '12px'}}>Max 5MB. JPG, PNG, GIF</small>
              </FormGroup>
            </>
          );
          
        case "announcements":
          return (
            <>
              <FormGroup>
                <FormLabel>Title *</FormLabel>
                <FormInput
                  value={formData.title || ""}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Announcement title"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Content *</FormLabel>
                <FormTextarea
                  value={formData.content || formData.description || ""}
                  onChange={(e) => setFormData({...formData, content: e.target.value, description: e.target.value})}
                  placeholder="Announcement content"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Date *</FormLabel>
                <FormInput
                  type="datetime-local"
                  value={formData.date || ""}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Location</FormLabel>
                <FormInput
                  value={formData.location || ""}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Announcement location"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Category</FormLabel>
                <FormInput
                  value={formData.category || ""}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="General, Important, etc."
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Upload Image</FormLabel>
                <FormInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                />
                <small style={{color: '#666', fontSize: '12px'}}>Max 5MB. JPG, PNG, GIF</small>
              </FormGroup>
            </>
          );
          
        case "team":
          return (
            <>
              <FormGroup>
                <FormLabel>Name *</FormLabel>
                <FormInput
                  value={formData.name || ""}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Member name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Role *</FormLabel>
                <FormInput
                  value={formData.role || ""}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  placeholder="President, Member, etc."
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Bio</FormLabel>
                <FormTextarea
                  value={formData.bio || ""}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Member bio"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="member@university.edu"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Phone</FormLabel>
                <FormInput
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1234567890"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Order</FormLabel>
                <FormInput
                  type="number"
                  value={formData.order || "1"}
                  onChange={(e) => setFormData({...formData, order: e.target.value})}
                  placeholder="Display order"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Upload Photo</FormLabel>
                <FormInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                />
                <small style={{color: '#666', fontSize: '12px'}}>Max 5MB. JPG, PNG</small>
              </FormGroup>
            </>
          );
          
        case "gallery":
          return (
            <>
              <FormGroup>
                <FormLabel>Title *</FormLabel>
                <FormInput
                  value={formData.title || ""}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Photo title"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Description</FormLabel>
                <FormTextarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Photo description"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Category</FormLabel>
                <FormInput
                  value={formData.category || ""}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="Events, Team, etc."
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Upload Image *</FormLabel>
                <FormInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                  required={!editMode}
                />
                <small style={{color: '#666', fontSize: '12px'}}>Max 5MB. JPG, PNG, GIF, WebP</small>
              </FormGroup>
            </>
          );
          
        case "lostfound":
          return (
            <>
              <FormGroup>
                <FormLabel>Item Name *</FormLabel>
                <FormInput
                  value={formData.title || formData.name || ""}
                  onChange={(e) => setFormData({...formData, title: e.target.value, name: e.target.value})}
                  placeholder="e.g., Lost: Blue Backpack"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Description</FormLabel>
                <FormTextarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Item description"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Status</FormLabel>
                <select
                  value={formData.status || "lost"}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #e9f6fa'}}
                >
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                  <option value="claimed">Claimed</option>
                </select>
              </FormGroup>
              <FormGroup>
                <FormLabel>Location</FormLabel>
                <FormInput
                  value={formData.location || ""}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Where it was lost/found"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Contact Info</FormLabel>
                <FormInput
                  value={formData.contactInfo || ""}
                  onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                  placeholder="Email or phone for contact"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Upload Image</FormLabel>
                <FormInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                />
                <small style={{color: '#666', fontSize: '12px'}}>Max 5MB. JPG, PNG</small>
              </FormGroup>
            </>
          );
          
        default:
          return null;
      }
    };

    return (
      <ModalOverlay onClick={() => setShowModal(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalTitle>
            {editMode ? "✏️ Edit" : "➕ Add"} {
              activeTab === "events" ? "Event" : 
              activeTab === "announcements" ? "Announcement" :
              activeTab === "team" ? "Team Member" :
              activeTab === "gallery" ? "Gallery Photo" :
              activeTab === "lostfound" ? "Lost & Found Item" : ""
            }
          </ModalTitle>
          
          {getFormFields()}
          
          <ModalActions>
            <ActionButtonSmall 
              className="edit"
              onClick={handleSave}
            >
              {editMode ? "Update" : "Save"}
            </ActionButtonSmall>
            <ActionButtonSmall 
              className="delete"
              onClick={() => {
                setShowModal(false);
                setFileUpload(null);
              }}
            >
              Cancel
            </ActionButtonSmall>
          </ModalActions>
        </ModalContent>
      </ModalOverlay>
    );
  };
  if (loading) {
    return (
      <DashboardContainer>
        <LoadingSpinner>
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </LoadingSpinner>
      </DashboardContainer>
    );
  }
  return (
    <DashboardContainer>
      <Header>
        <Title>👨‍💼 Admin Dashboard</Title>
        <ButtonGroup>
          <ActionButton 
            className="secondary"
            onClick={() => navigate("/")}
          >
            🏠 Go to Home
          </ActionButton>
        </ButtonGroup>
      </Header>

      {/* TABS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <TabButton 
          active={activeTab === "events"}
          onClick={() => setActiveTab("events")}
        >
          📅 Events ({events.length})
        </TabButton>
        <TabButton 
          active={activeTab === "announcements"}
          onClick={() => setActiveTab("announcements")}
        >
          📢 Announcements ({announcements.length})
        </TabButton>
        <TabButton 
          active={activeTab === "team"}
          onClick={() => setActiveTab("team")}
        >
          👥 Team ({team.length})
        </TabButton>
        <TabButton 
          active={activeTab === "gallery"}
          onClick={() => setActiveTab("gallery")}
        >
          🖼️ Gallery ({gallery.length})
        </TabButton>
        <TabButton 
          active={activeTab === "contacts"}
          onClick={() => setActiveTab("contacts")}
        >
          ✉️ Messages ({contacts.length})
        </TabButton>
        <TabButton 
          active={activeTab === "lostfound"}
          onClick={() => setActiveTab("lostfound")}
        >
          🔍 Lost & Found ({lostFound.length})
        </TabButton>
        <TabButton 
          active={activeTab === "joinrequests"}
          onClick={() => setActiveTab("joinrequests")}
        >
          🤝 Join Requests ({joinRequests.length})
        </TabButton>
        <TabButton 
          active={activeTab === "pendingadmins"}
          onClick={() => setActiveTab("pendingadmins")}
        >
          👨‍💼 Pending Admins ({pendingAdmins.length})
        </TabButton>
      </div>

      {["events", "announcements", "team", "gallery", "lostfound"].includes(activeTab) && (
        <div style={{ marginBottom: 20 }}>
          <ActionButton 
            className="primary"
            onClick={handleAdd}
          >
            ➕ Add New
          </ActionButton>
        </div>
      )}

      <StatsContainer>
        <StatCard color="#1f5b64" textColor="#fff">
          <StatTitle>Total Events</StatTitle>
          <StatValue>{events.length}</StatValue>
        </StatCard>
        <StatCard color="#28a745" textColor="#fff">
          <StatTitle>Announcements</StatTitle>
          <StatValue>{announcements.length}</StatValue>
        </StatCard>
        <StatCard color="#ffc107">
          <StatTitle>Team Members</StatTitle>
          <StatValue>{team.length}</StatValue>
        </StatCard>
        <StatCard color="#dc3545" textColor="#fff">
          <StatTitle>Unread Messages</StatTitle>
          <StatValue>{contacts.filter(c => !c.isRead).length}</StatValue>
        </StatCard>
        <StatCard color="#17a2b8" textColor="#fff">
          <StatTitle>Lost Items</StatTitle>
          <StatValue>{lostFound.length}</StatValue>
        </StatCard>
        <StatCard color="#6f42c1" textColor="#fff">
          <StatTitle>Gallery Items</StatTitle>
          <StatValue>{gallery.length}</StatValue>
        </StatCard>
        <StatCard color="#20c997" textColor="#fff">
          <StatTitle>Join Requests</StatTitle>
          <StatValue>{joinRequests.length}</StatValue>
        </StatCard>
        <StatCard color="#fd7e14">
          <StatTitle>Pending Admins</StatTitle>
          <StatValue>{pendingAdmins.length}</StatValue>
        </StatCard>
      </StatsContainer>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              {getCurrentColumns().map(col => (
                <TableHeader key={col.key}>{col.label}</TableHeader>
              ))}
              {(activeTab !== "stats") && <TableHeader>Actions</TableHeader>}
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </Table>
      </TableContainer>
      {showModal && renderModalForm()}
    </DashboardContainer>
  );
}