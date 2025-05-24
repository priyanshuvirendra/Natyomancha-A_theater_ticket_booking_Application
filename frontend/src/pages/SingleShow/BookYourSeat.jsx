import React from "react";

import { useMediaQuery } from "react-responsive";
import stageImg1 from "../../assets/theatreImages/stage1.jpg";
import bgleft from "../../assets/theatreImages/bgleft1.png";
import bgright from "../../assets/theatreImages/bgright1.png";

const rowToLetter = (row) => String.fromCharCode(64 + row); // Convert row number to letter

const BookYourSeat = ({
  selectedSeats,
  bookedSeats,
  handleSeatClick,
  handleBookNow,
  getSeatClass,
  ticketPrice,
}) => {
  const rowLabels = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
  ];
  const rowHeights = [
    0, 36, 72, 108, 178, 214, 250, 286, 324, 360, 429, 461, 497,
  ];
  // style={bgStyle}

  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const isVeryLargeScreen = useMediaQuery({ query: "(min-width: 1440px)" });

  const bgStyle = {
    backgroundImage: `
      linear-gradient(to right, 
        rgba(0, 0, 0, 0.2), 
        rgba(0, 0, 0, 0.2)),
      url(${bgright}),
      url(${bgleft})`,
    backgroundSize: isVeryLargeScreen ? "22% 100%" : "13% 100%", // Conditional size
    backgroundPosition: "left, right",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div
      className={`min-h-screen bg-cover bg-center ${
        isLargeScreen ? "custom-bg" : ""
      }`}
      style={isLargeScreen ? bgStyle : {}}
    >
      <form className="flex flex-col items-center justify-center  ">
        <div className=" px-4 pt-4 flex flex-col  rounded-xl items-center relative">
          {/* stage */}
          <div className="w-full lg:w-[85%] mt-4">
            <img src={stageImg1} alt="Stage" />
          </div>
          <div className="flex flex-row items-center justify-center gap-x-6 lg:gap-x-10 w-full py-5">
            {/* left section */}
            <div className="relative cursor-pointer grid grid-cols-4 gap-2 gap-y-10 transform rotate-3 mb-2 ">
              {/* front */}
              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-4 gap-2">
                  {[...Array(4)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 1)}${
                      colIndex + 1
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md 
                            
                        w-4 sm:w-6 lg:w-7 
 
                        h-4 sm:h-6 lg:h-7 

                            
                            
                        ${getSeatClass(seatId)}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 1, colIndex + 1)
                        }
                      >
                        <div className=" text-[8px] md:text-base font-medium">
                          {colIndex + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="absolute -top-[0.5rem] w-full h-[1px] bg-white"></div>
              <div className="absolute -top-[1.3rem] md:-top-[1.5rem] text-[6px] md:text-xs">
                <span className="text-primary_text font-semibold">
                  Front stall... Rs.{ticketPrice.frontStall}
                </span>
              </div>{" "}
              {/* Row labels */}
              {rowLabels.slice(0, 3).map((label, index) => (
                <div
                  key={label}
                  className="hidden lg:flex absolute -left-5 text-white"
                  style={{ top: rowHeights[index] }}
                >
                  {label}
                </div>
              ))}
              {/* rear */}
              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-6 gap-2">
                  {[...Array(6)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 5)}${
                      colIndex + 1
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md 
                            
                                                                         w-4 sm:w-6 lg:w-7 
 
 
                                                                          h-4 sm:h-6 lg:h-7 
 

                            
                            
                            ${getSeatClass(seatId)}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 5, colIndex + 1)
                        }
                      >
                        <div className=" text-[8px] md:text-base font-medium">
                          {colIndex + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="absolute top-[7.5rem] sm:top-[9.5rem] lg:top-[10.5rem] w-full h-[1px] bg-white"></div>
              <div className="absolute top-[6.5rem] sm:top-[8.5rem] lg:top-[9.5rem] text-[6px] md:text-xs">
                <span className="text-primary_text font-semibold">
                  Rear Stall...Rs.{ticketPrice.rearStall}
                </span>
              </div>
              {/* Row labels */}
              {rowLabels.slice(3, 9).map((label, index) => (
                <div
                  key={label}
                  className="hidden lg:flex absolute  -left-5 text-white "
                  style={{ top: rowHeights[index + 3] }}
                >
                  {label}
                </div>
              ))}
              {/* balcony */}
              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-3 gap-2">
                  {[...Array(3)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 11)}${
                      colIndex + 1
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md 
                            
                            
                                             w-4 sm:w-6 lg:w-7 
 
 
                                                               h-4 sm:h-6 lg:h-7 
 

                            
                            ${getSeatClass(seatId)}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 11, colIndex + 1)
                        }
                      >
                        <div className=" text-[8px] md:text-base font-medium">
                          {colIndex + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="absolute top-[18rem] sm:top-[23rem] lg:top-[26rem]  w-full h-[1px] bg-white"></div>
              <div className="absolute top-[17rem] sm:top-[22rem] lg:top-[25rem] text-[6px] md:text-xs">
                <span className="text-primary_text font-semibold">
                  Balcony...Rs.{ticketPrice.balcony}
                </span>
              </div>
              {/* row labels */}
              {rowLabels.slice(9).map((label, index) => (
                <div
                  key={label}
                  className="hidden lg:flex absolute  -left-5 text-white"
                  style={{ top: rowHeights[index + 9] }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Center section */}

            <div className="relative cursor-pointer grid grid-cols-10 gap-2 gap-y-10">
              {/* front */}

              {[...Array(10)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-4 gap-2">
                  {[...Array(4)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 1)}${
                      colIndex + 5
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md                                                         
                        w-4 sm:w-6 lg:w-7 
 
                        h-4 sm:h-6 lg:h-7 
 
                        ${getSeatClass(seatId)}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 1, colIndex + 5)
                        }
                      >
                        <div className=" text-[8px] md:text-base font-medium">
                          {colIndex + 5}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="absolute -top-[0.5rem] w-full h-[1px] bg-white"></div>
              <div className="absolute -top-[1.3rem] md:-top-[1.5rem] text-[6px] md:text-xs">
                <span className="text-primary_text font-semibold">
                  Front Stall...Rs.{ticketPrice.frontStall} (A-D)
                </span>
              </div>

              {/* rear  */}
              {[...Array(10)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-6 gap-2">
                  {[...Array(6)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 5)}${
                      colIndex + 5
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md                                                         
                        w-4 sm:w-6 lg:w-7 
 
                        h-4 sm:h-6 lg:h-7 
 
                        ${getSeatClass(seatId)}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 5, colIndex + 5)
                        }
                      >
                        <div className=" text-[8px] md:text-base font-medium">
                          {colIndex + 5}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="absolute top-[7.5rem] sm:top-[9.5rem] lg:top-[10.5rem] w-full h-[1px] bg-white"></div>
              <div className="absolute top-[6.5rem] sm:top-[8.5rem] lg:top-[9.5rem] text-[6px] md:text-xs">
                <span className="text-primary_text font-semibold">
                  Rear Stall...Rs.{ticketPrice.rearStall} (E-J)
                </span>
              </div>

              {/* balcony */}

              {[...Array(10)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-3 gap-2">
                  {[...Array(3)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 11)}${
                      colIndex + 5
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md                                                         
                        w-4 sm:w-6 lg:w-7 
 
                        h-4 sm:h-6 lg:h-7 
 
                        ${getSeatClass(seatId)}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 11, colIndex + 5)
                        }
                      >
                        <div className=" text-[8px] md:text-base font-medium">
                          {colIndex + 5}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="absolute top-[18rem] sm:top-[23rem] lg:top-[26rem]  w-full h-[1px] bg-white"></div>
              <div className="absolute top-[17rem] sm:top-[22rem] lg:top-[25rem] text-[6px] md:text-xs">
                <span className="text-primary_text font-semibold">
                  Balcony... Rs.{ticketPrice.balcony} (K-M)
                </span>{" "}
              </div>
            </div>

            {/* right section */}
            <div className="relative cursor-pointer grid grid-cols-4 gap-2 gap-y-10 transform -rotate-3 mb-2">
              {/* front */}

              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-4 gap-2">
                  {[...Array(4)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 1)}${
                      colIndex + 15
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md                                                         
                            
                            w-4 sm:w-6 lg:w-7 
 
                            h-4 sm:h-6 lg:h-7 
 
                            ${getSeatClass(seatId)}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 1, colIndex + 15)
                        }
                      >
                        <div className=" text-[8px] md:text-base font-medium">
                          {colIndex + 15}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Row labels */}
              {rowLabels.slice(0, 3).map((label, index) => (
                <div
                  key={label}
                  className="hidden lg:flex absolute -right-5 text-white"
                  style={{ top: rowHeights[index] }}
                >
                  {label}
                </div>
              ))}
              <div className="absolute -top-[0.5rem] w-full h-[1px] bg-white"></div>
              <div className="absolute -top-[1.3rem] md:-top-[1.5rem] text-[6px] md:text-xs">
                <span className="text-primary_text font-semibold">
                  Front stall... Rs.{ticketPrice.frontStall}
                </span>
              </div>

              {/* rear */}
              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-6 gap-2">
                  {[...Array(6)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 5)}${
                      colIndex + 15
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md                                                         w-4 sm:w-6 lg:w-7 
 
                                                         h-4 sm:h-6 lg:h-7 
 
                        ${getSeatClass(seatId)}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 5, colIndex + 15)
                        }
                      >
                        <div className=" text-[8px] md:text-base font-medium">
                          {colIndex + 15}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              {/* Row labels */}
              {rowLabels.slice(3, 9).map((label, index) => (
                <div
                  key={label}
                  className="hidden lg:flex absolute -right-5 text-white"
                  style={{ top: rowHeights[index + 3] }}
                >
                  {label}
                </div>
              ))}
              <div className="absolute top-[7.5rem] sm:top-[9.5rem] lg:top-[10.5rem] w-full h-[1px] bg-white"></div>
              <div className="absolute top-[6.5rem] sm:top-[8.5rem] lg:top-[9.5rem] text-[6px] md:text-xs">
                <span className="text-primary_text font-semibold">
                  Rear Stall...Rs.{ticketPrice.rearStall}
                </span>
              </div>

              {/* balcony */}
              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-3 gap-2">
                  {[...Array(3)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 11)}${
                      colIndex + 15
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md                                                         w-4 sm:w-6 lg:w-7 
 
                                                         h-4 sm:h-6 lg:h-7 
 
                         ${getSeatClass(seatId)}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 11, colIndex + 15)
                        }
                      >
                        {" "}
                        <div className=" text-[8px] md:text-base font-medium">
                          {colIndex + 15}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              {/* row labels */}
              {rowLabels.slice(9).map((label, index) => (
                <div
                  key={label}
                  className="hidden lg:flex absolute -right-5 text-xs md:text-base text-primary_text"
                  style={{ top: rowHeights[index + 9] }}
                >
                  {label}
                </div>
              ))}
              <div className="absolute top-[18rem] sm:top-[23rem] lg:top-[26rem]  w-full h-[1px] bg-white"></div>
              <div className="absolute top-[17rem] sm:top-[22rem] lg:top-[25rem] text-[6px] md:text-xs">
                <span className="text-primary_text font-semibold">
                  Balcony...Rs.{ticketPrice.balcony}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-4 px-4 flex flex-row gap-x-3 items-center justify-evenly w-full ">
          <div className="flex text-primary_text py-2 gap-x-2">
            <div className="border-highlight border-2 border-dashed text-primary_text text-xs md:text-xl font-bold py-2 px-2 lg:px-4 rounded-xl">
              Balcony - Rs.{ticketPrice.balcony}
            </div>
            <div className="border-highlight border-2 border-dashed text-primary_text text-xs md:text-xl font-bold py-2 px-2 lg:px-4 rounded-xl">
              Rear Stall - Rs.{ticketPrice.rearStall}
            </div>
            <div className="border-highlight border-2 border-dashed text-primary_text text-xs md:text-xl font-bold py-2 px-2 lg:px-4 rounded-xl">
              Front Stall - Rs.{ticketPrice.frontStall}
            </div>
          </div>
          <button
            onClick={handleBookNow}
            type="button"
            className=" bg-highlight hover:bg-highlight_hover text-primary_text text-xs md:text-xl font-ubuntu font-bold py-2 px-4 lg:px-6 rounded-xl"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookYourSeat;
