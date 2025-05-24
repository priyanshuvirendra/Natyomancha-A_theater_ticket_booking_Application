// src/components/MyProfile.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";
import ProfileModal from "../../components/profileModal";
import ProfileCard from "../../components/profileCard";

const APIURL = import.meta.env.VITE_API_URL;

const MyProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector((state) => state.user.userInfo);

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      await axiosInstance.delete(`${APIURL}/users/${user._id}`);
      localStorage.removeItem("user");
      alert("Profile deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto py-6 bg-background1 text-primary_text min-h-screen">
      <h1 className="text-4xl font-montserrat font-bold mb-8 text-center">
        My Profile
      </h1>
      <div className="flex items-center justify-center">
        <ProfileCard
          profile={user}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
      {modalOpen && <ProfileModal profile={user} onClose={handleModalClose} />}
    </div>
  );
};

export default MyProfile;
