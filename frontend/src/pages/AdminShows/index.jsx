import React, { useState, useEffect } from "react";
import ShowAdminCard from "../../components/showAdminCard";
import ShowModal from "../../components/showModal";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";

const AdminShows = () => {
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [pastShows, setPastShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState(null);

  const GetAllShows = async () => {
    try {
      const response = await axiosInstance.get(`/shows`);
      const shows = response.data;
      const currentDate = new Date();

      // Separate shows into upcoming and past
      const upcoming = [];
      const past = [];

      shows.forEach((show) => {
        const [hours, minutes] = show.time.split(":");
        const [year, month, day] = show.date.split("T")[0].split("-");

        const showDateTime = new Date(year, month - 1, day, hours, minutes);

        if (showDateTime >= currentDate) {
          upcoming.push(show);
        } else {
          past.push(show);
        }
      });

      // Sort upcoming shows in descending order (closest date last)
      upcoming.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Sort past shows in ascending order (closest date first)
      past.sort((a, b) => new Date(a.date) - new Date(b.date));

      setUpcomingShows(upcoming);
      setPastShows(past);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllShows();
  }, []);

  const handleAddClick = () => {
    setCurrentShow(null);
    setModalOpen(true);
  };

  const handleEditClick = (show) => {
    setCurrentShow(show);
    setModalOpen(true);
  };

  const handleDeleteClick = async (show) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the show?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(
        `/upload/image/${show.poster.split("/").pop()}`
      );
      await axiosInstance.delete(`/shows/${show._id}`);
      toast.success("Show deleted successfully!");
      GetAllShows();
    } catch (error) {
      console.error("Error deleting show:", error);
      toast.error("Error deleting show!");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    GetAllShows();
  };

  if (loading) {
    return <div className="text-5xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl sm:text-5xl font-bold text-primary_text py-4 font-montserrat">
        Admin Show Management
      </h1>
      <button
        className="bg-highlight hover:bg-highlight_hover text-primary_text font-bold text-xl py-2 px-4 rounded"
        onClick={handleAddClick}
      >
        Add New Show
      </button>
      <h3 className="text-lg sm:text-3xl font-lato font-bold my-4 text-primary_text">
        Upcoming Shows
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingShows.map((show) => (
          <ShowAdminCard
            key={show._id}
            show={show}
            onEditClick={handleEditClick}
            onDeleteClick={() => handleDeleteClick(show)} // Pass the show object instead of show._id
          />
        ))}
      </div>
      <h3 className="text-lg sm:text-3xl font-lato font-bold my-4 text-primary_text">
        Past Shows
      </h3>
      {pastShows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastShows.map((show) => (
            <ShowAdminCard
              key={show._id}
              show={show}
              onEditClick={handleEditClick}
              onDeleteClick={() => handleDeleteClick(show)} // Pass the show object instead of show._id
            />
          ))}
        </div>
      ) : (
        <p className="text-secondary_text font-medium text-lg">
          No past shows available
        </p>
      )}
      {modalOpen && <ShowModal show={currentShow} onClose={handleModalClose} />}
    </div>
  );
};

export default AdminShows;
