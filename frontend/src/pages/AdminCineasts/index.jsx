// src/components/AdminCineasts.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import CineastAdminCard from "../../components/cineastAdminCard";
import CineastModal from "../../components/cineastModal";
import { toast } from "sonner";

const APIURL = import.meta.env.VITE_API_URL;

const AdminCineasts = () => {
  const [cineasts, setCineasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCineast, setCurrentCineast] = useState(null);

  const GetAllCineasts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${APIURL}/cineasts`);
      setCineasts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllCineasts();
  }, []);

  const handleAddClick = () => {
    setCurrentCineast(null);
    setModalOpen(true);
  };

  const handleEditClick = (cineast) => {
    setCurrentCineast(cineast);
    setModalOpen(true);
  };

  const handleDeleteClick = async (cineastId) => {
    window.confirm("Are you sure you want to delete the cineast ?");

    try {
      await axiosInstance.delete(`${APIURL}/cineasts/${cineastId}`);
      toast.success("Cineast deleted successfully!");
      GetAllCineasts();
    } catch (error) {
      console.error("Error deleting cineast:", error);
      toast.error("Error deleting cineast!");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    GetAllCineasts();
  };

  if (loading) {
    return <div className="text-5xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className=" text-xl sm:text-5xl font-bold text-primary_text py-4 font-montserrat">
        Admin Cineast Management
      </h1>
      <button
        className="bg-highlight hover:bg-highlight_hover text-primary_text font-bold text-xl  py-2 px-4 rounded mb-4"
        onClick={handleAddClick}
      >
        Add New Cineast
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cineasts.map((cineast) => (
          <CineastAdminCard
            key={cineast._id}
            cineast={cineast}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
      {modalOpen && (
        <CineastModal cineast={currentCineast} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default AdminCineasts;
