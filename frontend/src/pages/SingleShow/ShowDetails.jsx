import React from "react";
import { FaLocationDot, FaClock, FaCalendarDay } from "react-icons/fa6";

const ShowDetails = ({ show }) => {
  return (
    <div className="px-10  flex flex-col items-center justify-start gap-y-3">
      <div className="  bg-shadow lg:max-w-[30rem]   p-3 gap-y-3 rounded-xl flex flex-col items-center justify-center">
        <img
          src={show.poster}
          // src={hamlet_poster}
          // src="https://the14amazons.co.uk/Images/Movies/21843_Roja.jpg"
          alt="title"
          className="rounded-xl object-cover sm:w-[22rem]  lg:max-h-[30rem] lg:min-h-[30rem]  lg:w-[30rem]"
        />
        <h2 className="text-2xl text-center leading-6 text-primary_text font-serif font-bold">
          {show.title}
        </h2>
      </div>

      <div className="flex flex-wrap gap-y-1 gap-x-10 items-center justify-center text-white w-full">
        <div className="flex items-center justify-between self-stretch gap-x-10">
          <div className="flex items-center justify-center gap-x-2 text-base sm:text-lg font-semibold">
            <FaCalendarDay /> {new Date(show.date).toLocaleDateString()}
          </div>
          <div className="flex items-center justify-center gap-x-2 text-base sm:text-lg font-semibold">
            <FaClock />
            {show.time}
          </div>
        </div>

        <div className=" text-base sm:text-lg hover:text-secondary_text font-semibold">
          {/* connect new link */}
          <a
            href={show.theatre.address}
            target="_blank"
            className="flex items-center justify-center gap-x-2"
          >
            <FaLocationDot />
            <p className="underline ">{show.theatre.name}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
