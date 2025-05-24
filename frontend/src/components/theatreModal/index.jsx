// src/components/TheatreModal.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";

const APIURL = import.meta.env.VITE_API_URL;

const TheatreModal = ({ theatre, onClose }) => {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (theatre) {
      setName(theatre.name);
      setOwner(theatre.owner);
      setAddress(theatre.address);
      setPhone(theatre.phone);
    }
  }, [theatre]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (theatre) {
        await axiosInstance.put(`${APIURL}/theatres/${theatre._id}`, {
          name,
          owner,
          address,
          phone,
        });
        toast.success("Theatre added successfully!");
      } else {
        await axiosInstance.post(`${APIURL}/theatres`, {
          name,
          owner,
          address,
          phone,
        });
        toast.success("Theatre updated successfully!");
      }
      onClose();
    } catch (error) {
      console.error("Error saving theatre:", error);
      toast.error("Error Updating Theatre!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background1 bg-opacity-50">
      <div className="bg-shadow p-8 lg:w-[40%] md:w-[60%] w-full m-4 rounded shadow-lg">
        <h2 className="text-2xl text-primary_text font-bold mb-4">
          {theatre ? "Edit Theatre" : "Add New Theatre"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-primary_text font-bold text-lg">
              Theatre Name
            </label>
            <input
              className=" px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight "
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-primary_text font-bold text-lg">
              Owner Name
            </label>
            <input
              className=" px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight "
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-primary_text font-bold text-lg">
              Address
            </label>
            <input
              className=" px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight "
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-primary_text font-bold text-lg">
              Phone
            </label>
            <input
              className=" px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight "
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-gray-500 hover:text-gray-700 text-primary_text px-4 py-2 rounded mr-2 transition-all duration-300 font-bold"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TheatreModal;
