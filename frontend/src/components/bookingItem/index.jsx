import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaDownload } from "react-icons/fa";
import logo from "/logo.jpg";

const BookingItem = ({ booking }) => {
  const currentDate = new Date();
  const [hours, minutes] = booking.show.time.split(":");
  const [year, month, day] = booking.show.date.split("T")[0].split("-");
  const showDateTime = new Date(year, month - 1, day, hours, minutes);
  const isUpcoming = showDateTime >= currentDate;

  const handleDownloadTicket = () => {
    const doc = new jsPDF();

    // Add the logo
    const img = new Image();
    img.src = logo;

    img.onload = () => {
      doc.addImage(img, "PNG", 14, 10, 50, 20);

      // Set the title below the logo
      doc.setFontSize(18);
      doc.text("Ticket Details", 14, 40);

      // Add booking details
      const details = [
        ["Show Title", booking.show.title],
        ["Show Date", new Date(booking.show.date).toLocaleDateString()],
        ["Show Time", booking.show.time],
        ["Theatre Name", booking.show.theatre.name],
        ["Booked Seats", booking.seats.join(", ")],
        ["Total Amount", `$${(booking.totalAmount / 100).toFixed(2)}`],
      ];

      // Use autoTable to add the details in a table format
      doc.autoTable({
        startY: 50,
        head: [["Field", "Details"]],
        body: details,
        theme: "striped",
      });
      const pdfBase64 = doc.output("datauristring");
      console.log(pdfBase64);
      // Save the PDF
      doc.save(`${booking.show.title}-ticket.pdf`);
    };
  };

  return (
    <div
      className={
        isUpcoming
          ? "bg-shadow shadow-md rounded-lg p-4 flex justify-between items-center"
          : "bg-background2 shadow-md rounded-lg p-4 flex justify-between items-center"
      }
    >
      <div>
        <h2 className="text-xl font-lato font-bold text-primary_text mb-1">
          {booking.show.title}
        </h2>
        <div className="text-primary_text">
          <span>
            <b>Date: </b>
            {new Date(booking.show.date).toLocaleDateString()}
          </span>{" "}
          |
          <span>
            <b>Time: </b> {booking.show.time}
          </span>{" "}
          |
          <span>
            <b>Theatre: </b> {booking.show.theatre.name}
          </span>{" "}
          |
          <span>
            {" "}
            <b>Seats: </b>
            {booking.seats.join(", ")}
          </span>{" "}
          |
          <span>
            {" "}
            <b>Amount: </b>
            {booking.totalAmount}
          </span>
        </div>
      </div>
      {isUpcoming && (
        <button
          onClick={handleDownloadTicket}
          className="bg-highlight text-primary_text py-2 px-4 rounded-lg hover:bg-highlight_hover flex items-center"
        >
          <FaDownload className="mr-2" /> Download Ticket
        </button>
      )}
    </div>
  );
};

export default BookingItem;
