import React from "react";
import { useSelector } from "react-redux";

const PaymentPopup = ({ bookedSeat, handleClosePopup, emailSuccessPopup }) => {
  const user = useSelector((state) => state.user.userInfo);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        {emailSuccessPopup ? (
          <h2 className="text-xl font-bold mb-4">
            Seat Booked and Confirmation Email Sent
          </h2>
        ) : (
          <h2 className="text-xl font-bold mb-4 text-red-400">
            Seat Booked but Confirmation Email Failed !
          </h2>
        )}
        <p>Seat {bookedSeat} has been booked successfully!</p>
        {emailSuccessPopup ? (
          <p>Check out your ticket sent at {user.email}.</p>
        ) : (
          <p>Failed to sent your ticket to your email !</p>
        )}
        <button
          onClick={handleClosePopup}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentPopup;
