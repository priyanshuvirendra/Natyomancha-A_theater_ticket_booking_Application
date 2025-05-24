// src/components/CineastAdminCard.jsx
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const CineastAdminCard = ({ cineast, onEditClick, onDeleteClick }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    const words = cineast.details.split(" ");
    if (words.length <= 40 || showFullDescription) {
      return cineast.details;
    }
    const truncated = words.slice(0, 40).join(" ");
    return `${truncated}...`;
  };

  return (
    <div className="bg-shadow rounded shadow p-4 flex flex-col items-center gap-y-3">
      <img
        src={cineast.image}
        alt={cineast.name}
        className="w-96 h-96 mb-4 rounded-md object-cover"
      />
      <h2 className="text-3xl text-primary_text font-bold font-montserrat">
        {cineast.name}
      </h2>
      <p className="text-secondary_text font-medium  text-lg">
        {renderDescription()}{" "}
        {cineast.details.split(" ").length > 40 && (
          <span
            className="text-primary_text cursor-pointer"
            onClick={toggleDescription}
          >
            {showFullDescription ? "Show less" : "Read more..."}
          </span>
        )}{" "}
      </p>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          className="bg-highlight hover:bg-highlight_hover text-white p-2 rounded"
          onClick={() => onEditClick(cineast)}
        >
          <FaEdit />
        </button>
        <button
          className="bg-red-500 hover:bg-red-800 text-white p-2 rounded"
          onClick={() => onDeleteClick(cineast._id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CineastAdminCard;
