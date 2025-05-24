// src/components/CineastModal.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";
import {
  handleImageFileDelete,
  handleImageFileUpload,
} from "../../utils/fileHandler";
import { MdDeleteForever } from "react-icons/md";

const APIURL = import.meta.env.VITE_API_URL;

const CineastModal = ({ cineast, onClose }) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState();
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cineast) {
      setName(cineast.name);
      setImage(cineast.image);
      setDetails(cineast.details);
    }
  }, [cineast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (cineast) {
        await axiosInstance.put(`${APIURL}/cineasts/${cineast._id}`, {
          name,
          image,
          details,
        });
        toast.success("Cineast updated successfully!");
      } else {
        await axiosInstance.post(`${APIURL}/cineasts`, {
          name,
          image,
          details,
        });
        toast.success("Cineast added successfully!");
      }
      onClose();
    } catch (error) {
      console.error("Error saving cineast:", error);
      toast.error("Error saving cineast");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background1 bg-opacity-50">
      <div className="bg-shadow p-8 lg:w-[40%] md:w-[60%] w-full m-4 rounded shadow-lg">
        <h2 className="text-2xl text-primary_text font-bold mb-4">
          {cineast ? "Edit Cineast" : "Add New Cineast"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-primary_text">Name</label>
            <input
              className=" px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight "
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 text-primary_text">
            <label className="block ">Image</label>
            <div className="flex flex-row justify-between gap-4">
              <input
                className=" px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight "
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              {image && (
                <>
                  <img src={image} className="h-14 w-14 rounded-full" />
                  <MdDeleteForever
                    className="cursor-pointer"
                    onClick={() =>
                      handleImageFileDelete(
                        image.split("/").pop(),
                        setImage,
                        setDeletingImage
                      )
                    }
                  />
                </>
              )}
              <button
                type="button"
                onClick={() =>
                  handleImageFileUpload(
                    setImage,
                    setImageFile,
                    setUploadingImage,
                    imageFile
                  )
                }
                className={
                  uploadingImage ? "cursor-not-allowed" : "cursor-pointer"
                }
              >
                {uploadingImage ? <u>Uploading...</u> : <u>Upload</u>}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-primary_text">Details</label>
            <textarea
              className=" px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight "
              value={details}
              onChange={(e) => setDetails(e.target.value)}
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
            {loading ? (
              <button
                className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300 cursor-not-allowed"
                type="submit"
              >
                Saving...
              </button>
            ) : (
              <button
                className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300"
                type="submit"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CineastModal;
