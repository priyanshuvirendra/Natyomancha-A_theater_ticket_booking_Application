import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ShowAdminCard = ({ show, onEditClick, onDeleteClick }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    const words = show.description.split(" ");
    if (words.length <= 40 || showFullDescription) {
      return show.description;
    }
    const truncated = words.slice(0, 40).join(" ");
    return `${truncated}...`;
  };

  return (
    <div className="bg-shadow rounded shadow p-4 flex flex-col items-center gap-y-3">
      <img
        src={show.poster}
        alt={show.title}
        className="w-96 h-96 mb-4 rounded-md object-cover"
      />
      <h2 className="text-3xl text-primary_text font-bold font-montserrat">
        {show.title}
      </h2>
      <p className="text-secondary_text font-medium  text-lg">
        <strong className="underline text-primary_text">Description</strong>:{" "}
        {renderDescription()}{" "}
        {show.description.split(" ").length > 40 && (
          <span
            className="text-primary_text cursor-pointer"
            onClick={toggleDescription}
          >
            {showFullDescription ? "Show less" : "Read more..."}
          </span>
        )}
      </p>
      <p className="text-secondary_text font-medium text-center text-2xl">
        <strong className="underline text-primary_text">Date</strong>:{" "}
        {new Date(show.date).toLocaleDateString()}
      </p>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          className="bg-highlight hover:bg-highlight_hover text-white p-2 rounded"
          onClick={() => onEditClick(show)}
        >
          <FaEdit />
        </button>
        <button
          className="bg-red-500 hover:bg-red-800 text-white p-2 rounded"
          onClick={() => onDeleteClick(show._id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ShowAdminCard;
