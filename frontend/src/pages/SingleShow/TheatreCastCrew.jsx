import React, { useRef, useState, useEffect } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const TheatreCastCrew = ({ casts }) => {
  const sliderRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const checkContentWidth = () => {
      if (sliderRef.current) {
        const { scrollWidth, clientWidth } = sliderRef.current;
        setShowButtons(scrollWidth > clientWidth);
      }
    };

    // Check content width on mount
    checkContentWidth();

    // Check content width whenever casts change
    window.addEventListener("resize", checkContentWidth);
    return () => {
      window.removeEventListener("resize", checkContentWidth);
    };
  }, [casts]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        {showButtons ? (
          <button
            onClick={scrollLeft}
            className="text-secondary_text hover:text-shadow"
          >
            <IoIosArrowDropleftCircle className="text-4xl" />
          </button>
        ) : (
          <div className="w-10" /> // Placeholder for left side gap
        )}

        <div ref={sliderRef} className="flex overflow-x-auto gap-x-[2rem] px-1">
          {casts.map((member, index) => (
            <div key={index} className="flex-shrink-0 w-36">
              <div className="w-36 h-36 rounded-full overflow-hidden mb-2">
                <img
                  src={member.person.image}
                  alt={member.person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center flex flex-col items-center justify-center">
                <div className="font-semibold text-white">
                  {member.person.name}
                </div>
                <div className="font-bold text-white">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
        {showButtons ? (
          <button
            onClick={scrollRight}
            className="text-secondary_text hover:text-shadow"
          >
            <IoIosArrowDroprightCircle className="text-4xl" />
          </button>
        ) : (
          <div className="w-10" /> // Placeholder for right side gap
        )}
      </div>
    </div>
  );
};

export default TheatreCastCrew;
