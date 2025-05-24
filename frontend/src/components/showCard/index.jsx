import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLocationDot, FaClock, FaCalendarDay } from "react-icons/fa6";

const ShowCard = ({ show }) => {
  const navigate = useNavigate();
  return (
    <section className="bg-shadow p-4 rounded-md shadow-md ">
      <div className="flex flex-col gap-y-3 text-primary_text ">
        <img
          src={show.poster}
          alt={show.title}
          className="w-96 h-96  mb-4 rounded-md object-cover"
        />
        <h2 className="text-lg  font-semibold">{show.title}</h2>
        {/* <p className="text-gray-600">{show.description}</p> */}
        <div className="flex items-center justify-start self-stretch gap-x-10">
          <div className="flex items-center justify-center gap-x-2 text-base font-semibold">
            <FaCalendarDay /> {new Date(show.date).toLocaleDateString()}
          </div>
          <div className="flex items-center justify-center gap-x-2 text-base font-semibold">
            <FaClock />
            {show.time}
          </div>
        </div>
        <div className=" text-base hover:text-secondary_text font-semibold">
          {/* connect new link */}
          <a
            href={show.theatre.address}
            target="_blank"
            className="flex items-center gap-x-2"
          >
            <FaLocationDot />
            <p className="underline ">{show.theatre.name}</p>
          </a>
        </div>
      </div>
      <button
        className="bg-highlight hover:bg-highlight_hover text-white font-bold font-ubuntu my-4 py-2 px-4 rounded w-full"
        onClick={() => navigate(`/explore/shows/${show.slug}`)}
      >
        Book Now
      </button>
    </section>
  );
};

export default ShowCard;
