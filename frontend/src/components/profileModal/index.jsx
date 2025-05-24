// src/components/ProfileModal.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/slices/userSlice";
import { toast } from "sonner";
import { TiDeleteOutline } from "react-icons/ti";
import {
  handleImageFileDelete,
  handleImageFileUpload,
} from "../../utils/fileHandler";

const APIURL = import.meta.env.VITE_API_URL;

const ProfileModal = ({ profile, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setImage(profile.image);
    }
  }, [profile]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleFileInputChange = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = { name, email, image };
      dispatch(updateUser(profileData));
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-background2 text-primary_text p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-montserrat font-bold mb-4">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-secondary_text mb-1">Name</label>
            <input
              className=" px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight  bg-background1 text-primary_text"
              type="text"
              value={name}
              onChange={handleInputChange(setName)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary_text mb-1">Email</label>
            <input
              className=" px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight  bg-background1 text-primary_text"
              type="email"
              value={email}
              onChange={handleInputChange(setEmail)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary_text mb-1">
              Profile Image
            </label>
            <div className="flex items-center space-x-3">
              <input
                className=" px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight  bg-background1 text-primary_text"
                type="file"
                onChange={handleFileInputChange(setImageFile)}
              />
              {/* <button
                type="button"
                onClick={handleImageFileUpload(
                  setImage,
                  setImageFile,
                  imageFile
                )}
                className="bg-highlight hover:bg-highlight_hover text-primary_text px-3 py-2 rounded"
              >
                Upload
              </button> */}
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
            {image && (
              <div className="mt-4 relative w-fit">
                <img
                  src={image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full"
                />
                <button
                  onClick={handleImageFileDelete(
                    image.split("/").pop(),
                    setImage
                  )}
                  className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full"
                >
                  <TiDeleteOutline size={24} />
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-primary_text py-2 px-4 rounded mr-2"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-highlight hover:bg-highlight_hover text-primary_text py-2 px-4 rounded"
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

export default ProfileModal;
