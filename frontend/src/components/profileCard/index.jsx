// src/components/ProfileCard.jsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileCard = ({ profile, onEditClick, onDeleteClick }) => {
  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((name) => name[0]).join("");
    return initials.toUpperCase();
  };

  return (
    <div className="bg-shadow text-primary_text rounded-lg shadow-lg p-8 flex flex-col items-center justify-center w-full max-w-xs sm:max-w-lg">
      {profile.image ? (
        <img
          src={profile.image}
          alt={profile.name}
          className="w-64 h-64 object-cover mb-4 rounded-full"
        />
      ) : (
        <div className="w-64 h-64 flex items-center justify-center bg-gray-700 rounded-full text-4xl text-white font-semibold mb-4">
          {getInitials(profile.name)}
        </div>
      )}
      <h2 className="text-3xl font-lato font-bold mb-2 text-center">
        {profile.name}
      </h2>
      <p className="text-primary_text mb-4 text-center">{profile.email}</p>
      <div className="flex space-x-4">
        <button
          className="border border-highlight text-highlight flex items-center font-semibold p-2 rounded gap-2"
          onClick={onEditClick}
        >
          Edit Profile
          <FaEdit />
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 flex items-center text-primary_text font-semibold p-2 rounded gap-2"
          onClick={onDeleteClick}
        >
          Delete Account
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
