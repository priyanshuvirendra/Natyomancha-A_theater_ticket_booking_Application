<form className="flex flex-col items-center justify-center">
  <div className="border-4 border-black p-4 flex flex-col items-center relative">
    {/* exit gates */}
    <div className="absolute w-10 top-5 left-5">
      <img src={exitGate} alt="Exit Gate" />
    </div>
    <div className="absolute w-10 top-5 right-5">
      <img src={exitGate} alt="Exit Gate" />
    </div>
    <div className="absolute w-10 bottom-36 left-5">
      <img src={exitGate} alt="Exit Gate" />
    </div>
    <div className="absolute w-10 bottom-36 right-5">
      <img src={exitGate} alt="Exit Gate" />
    </div>

    <div className="flex flex-row items-center justify-center gap-x-10 w-full">
      {/* Left section */}
      <div className="relative grid grid-cols-4 gap-2 gap-y-10 transform -rotate-3 mt-2">
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="grid grid-rows-3 gap-2">
            {[...Array(3)].map((_, rowIndex) => {
              const seatId = `${rowToLetter(rowIndex + 1)}${colIndex + 1}`;
              return (
                <div
                  key={rowIndex}
                  className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                    seatId
                  )}`}
                  onClick={() => handleSeatClick(rowIndex + 1, colIndex + 1)}
                >
                  {colIndex + 1}
                </div>
              );
            })}
          </div>
        ))}

        {/* Row labels */}
        {rowLabels.slice(0, 3).map((label, index) => (
          <div
            key={label}
            className="absolute -left-5"
            style={{ top: rowHeights[index] }}
          >
            {label}
          </div>
        ))}
        <div className="absolute top-[7.8rem] w-full h-[1px] bg-black"></div>
        <div className="absolute top-[6.8rem] text-xs">Balcony... Rs.200</div>
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="grid grid-rows-6 gap-2">
            {[...Array(6)].map((_, rowIndex) => {
              const seatId = `${rowToLetter(rowIndex + 4)}${colIndex + 1}`;
              return (
                <div
                  key={rowIndex}
                  className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                    seatId
                  )}`}
                  onClick={() => handleSeatClick(rowIndex + 4, colIndex + 1)}
                >
                  {colIndex + 1}
                </div>
              );
            })}
          </div>
        ))}
        {/* Row labels */}
        {rowLabels.slice(3, 9).map((label, index) => (
          <div
            key={label}
            className="absolute -left-5"
            style={{ top: rowHeights[index + 3] }}
          >
            {label}
          </div>
        ))}
        <div className="absolute top-[23.5rem] w-full h-[1px] bg-black"></div>
        <div className="absolute top-[22.5rem] text-xs">
          Rear stall... Rs.300
        </div>
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="grid grid-rows-4 gap-2">
            {[...Array(4)].map((_, rowIndex) => {
              const seatId = `${rowToLetter(rowIndex + 10)}${colIndex + 1}`;
              return (
                <div
                  key={rowIndex}
                  className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                    seatId
                  )}`}
                  onClick={() => handleSeatClick(rowIndex + 10, colIndex + 1)}
                >
                  {colIndex + 1}
                </div>
              );
            })}
          </div>
        ))}
        {/* row labels */}
        {rowLabels.slice(9).map((label, index) => (
          <div
            key={label}
            className="absolute -left-5"
            style={{ top: rowHeights[index + 9] }}
          >
            {label}
          </div>
        ))}
        <div className="absolute top-[34rem] w-full h-[1px] bg-black"></div>
        <div className="absolute top-[33rem] text-xs">
          Front stall... Rs.500
        </div>
      </div>

      {/* Center section */}
      <div className="relative grid grid-cols-10 gap-2 gap-y-10">
        {[...Array(10)].map((_, colIndex) => (
          <div key={colIndex} className="grid grid-rows-3 gap-2">
            {[...Array(3)].map((_, rowIndex) => {
              const seatId = `${rowToLetter(rowIndex + 1)}${colIndex + 5}`;
              return (
                <div
                  key={rowIndex}
                  className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                    seatId
                  )}`}
                  onClick={() => handleSeatClick(rowIndex + 1, colIndex + 5)}
                >
                  {colIndex + 5}
                </div>
              );
            })}
          </div>
        ))}
        <div className="absolute top-[7.8rem] w-full h-[1px] bg-black"></div>
        <div className="absolute top-[6.8rem] text-xs">Balcony... Rs.200</div>
        {[...Array(10)].map((_, colIndex) => (
          <div key={colIndex} className="grid grid-rows-6 gap-2">
            {[...Array(6)].map((_, rowIndex) => {
              const seatId = `${rowToLetter(rowIndex + 4)}${colIndex + 5}`;
              return (
                <div
                  key={rowIndex}
                  className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                    seatId
                  )}`}
                  onClick={() => handleSeatClick(rowIndex + 4, colIndex + 5)}
                >
                  {colIndex + 5}
                </div>
              );
            })}
          </div>
        ))}
        <div className="absolute top-[23.5rem] w-full h-[1px] bg-black"></div>
        <div className="absolute top-[22.5rem] text-xs">
          Rear stall... Rs.300
        </div>
        {[...Array(10)].map((_, colIndex) => (
          <div key={colIndex} className="grid grid-rows-4 gap-2">
            {[...Array(4)].map((_, rowIndex) => {
              const seatId = `${rowToLetter(rowIndex + 10)}${colIndex + 5}`;
              return (
                <div
                  key={rowIndex}
                  className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                    seatId
                  )}`}
                  onClick={() => handleSeatClick(rowIndex + 10, colIndex + 5)}
                >
                  {colIndex + 5}
                </div>
              );
            })}
          </div>
        ))}
        <div className="absolute top-[34rem] w-full h-[1px] bg-black"></div>
        <div className="absolute top-[33rem] text-xs">
          Front stall... Rs.500
        </div>
      </div>

      {/* Right section */}
      <div className="relative grid grid-cols-4 gap-2 gap-y-10 transform rotate-3 mt-2">
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="grid grid-rows-3 gap-2">
            {[...Array(3)].map((_, rowIndex) => {
              const seatId = `${rowToLetter(rowIndex + 1)}${colIndex + 15}`;
              return (
                <div
                  key={rowIndex}
                  className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                    seatId
                  )}`}
                  onClick={() => handleSeatClick(rowIndex + 1, colIndex + 15)}
                >
                  {colIndex + 15}
                </div>
              );
            })}
          </div>
        ))}
        <div className="absolute top-[7.8rem] w-full h-[1px] bg-black"></div>
        <div className="absolute top-[6.8rem] text-xs">Balcony... Rs.200</div>
        {/* Row labels */}
        {rowLabels.slice(0, 3).map((label, index) => (
          <div
            key={label}
            className="absolute -right-5"
            style={{ top: rowHeights[index] }}
          >
            {label}
          </div>
        ))}
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="grid grid-rows-6 gap-2">
            {[...Array(6)].map((_, rowIndex) => {
              const seatId = `${rowToLetter(rowIndex + 4)}${colIndex + 15}`;
              return (
                <div
                  key={rowIndex}
                  className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                    seatId
                  )}`}
                  onClick={() => handleSeatClick(rowIndex + 4, colIndex + 15)}
                >
                  {colIndex + 15}
                </div>
              );
            })}
          </div>
        ))}
        <div className="absolute top-[23.5rem] w-full h-[1px] bg-black"></div>
        <div className="absolute top-[22.5rem] text-xs">
          Rear stall... Rs.300
        </div>
        {/* Row labels */}
        {rowLabels.slice(3, 9).map((label, index) => (
          <div
            key={label}
            className="absolute -right-5 "
            style={{ top: rowHeights[index + 3] }}
          >
            {label}
          </div>
        ))}
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="grid grid-rows-4 gap-2">
            {[...Array(4)].map((_, rowIndex) => {
              const seatId = `${rowToLetter(rowIndex + 10)}${colIndex + 15}`;
              return (
                <div
                  key={rowIndex}
                  className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                    seatId
                  )}`}
                  onClick={() => handleSeatClick(rowIndex + 10, colIndex + 15)}
                >
                  {colIndex + 15}
                </div>
              );
            })}
          </div>
        ))}
        <div className="absolute top-[34rem] w-full h-[1px] bg-black"></div>
        <div className="absolute top-[33rem] text-xs">
          Front stall... Rs.500
        </div>
        {/* row labels */}
        {rowLabels.slice(9).map((label, index) => (
          <div
            key={label}
            className="absolute -right-5"
            style={{ top: rowHeights[index + 9] }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>

    {/* stage */}
    <div className="w-full lg:w-[85%] mt-4">
      <img src={stageImg} alt="Stage" />
    </div>
  </div>
  <div>
    {/* book npw button */}
    <button
      onClick={handleBookNow}
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
    >
      Book Now
    </button>
  </div>
</form>;
