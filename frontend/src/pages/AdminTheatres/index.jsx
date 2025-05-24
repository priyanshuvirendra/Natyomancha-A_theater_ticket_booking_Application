// src/components/AdminTheatres.jsx
import React, { useState, useEffect } from "react";
import TheatreAdminCard from "../../components/theatreAdminCard";
import TheatreModal from "../../components/theatreModal";
import axiosInstance from "../../config/axiosInstance";

const APIURL = import.meta.env.VITE_API_URL;

const AdminTheatres = () => {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTheatre, setCurrentTheatre] = useState(null);

  const GetAllTheatres = async () => {
    try {
      const response = await axiosInstance.get(`${APIURL}/theatres`);
      setTheatres(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllTheatres();
  }, []);

  const handleAddClick = () => {
    setCurrentTheatre(null);
    setModalOpen(true);
  };

  const handleEditClick = (theatre) => {
    setCurrentTheatre(theatre);
    setModalOpen(true);
  };

  const handleDeleteClick = async (theatreId) => {
    window.confirm("Are you sure you want to delete the theatre?");
    try {
      await axiosInstance.delete(`${APIURL}/theatres/${theatreId}`);
      toast.success("Theatre deleted successfully!");
      GetAllTheatres();
    } catch (error) {
      console.error("Error deleting theatre:", error);
      toast.error("Error deleting theatre!");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    GetAllTheatres();
  };

  if (loading) {
    return <div className="text-5xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-0 sm:p-4 min-h-screen">
      <h1 className=" text-xl sm:text-5xl font-bold text-primary_text py-4 font-montserrat">
        Admin Theatre Management
      </h1>
      <button
        className="bg-highlight hover:bg-highlight_hover text-primary_text font-bold text-xl py-2 px-4 rounded mb-4"
        onClick={handleAddClick}
      >
        Add New Theatre
      </button>
      <div className="grid grid-cols-1 xl:grid-cols-2  gap-4">
        {theatres.map((theatre) => (
          <TheatreAdminCard
            key={theatre._id}
            theatre={theatre}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
      {modalOpen && (
        <TheatreModal theatre={currentTheatre} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default AdminTheatres;
