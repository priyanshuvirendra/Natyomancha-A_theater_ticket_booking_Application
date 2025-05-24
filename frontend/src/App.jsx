import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import "./App.css";

// components
import Navbar from "./components/navbar";
import AdminNavSidebar from "./components/adminNavbar";
import Footer from "./components/footer";

// main pages

import AllShows from "./pages/AllShows";
import SingleShow from "./pages/SingleShow";
import AdminShows from "./pages/AdminShows";
import AdminTheatres from "./pages/AdminTheatres";
import AdminCineasts from "./pages/AdminCineasts";
import MyBookings from "./pages/MyBookings";
import MyProfile from "./pages/MyProfile";
import NotFound from "./pages/NotFound";

import { Toaster } from "sonner";

import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import ScrollToTop from "./components/ScrollToTop";

const UserLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      {children}
      <Footer />
    </>
  );
};

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      <AdminNavSidebar open={open} setOpen={setOpen} />
      <div
        className={`flex-1  transition-all duration-700 ${
          open ? "lg:ml-[200px]" : "ml-0"
        }`}
      >
        <div
          className={`lg:hidden fixed z-50 bottom-0 transition-all duration-700 ${
            open ? "left-[12.5rem] px-2 py-1" : "left-0 p-1"
          }`}
        >
          {" "}
          <h1
            className="text-2xl bg-gray-50 p-2 rounded-xl font-semibold transition-transform duration-700"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <RiMenuUnfold2Line /> : <RiMenuFold2Line />}
          </h1>
        </div>
        <div className="p-4 bg-background1">{children}</div>
      </div>
    </div>
  );
};

function App() {
  // Initialize user state properly
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      {user?.isAdmin ? (
        <>
          <Toaster richColors position="top-right" closeButton="true" />
          <ScrollToTop />
          <AdminLayout>
            <Routes>
              <Route exact path="/cineasts" element={<AdminCineasts />} />
              <Route exact path="/" element={<AdminShows />} />
              <Route exact path="/theatres" element={<AdminTheatres />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminLayout>
        </>
      ) : (
        <>
          <Toaster
            richColors
            position="top-right"
            className="mt-10"
            closeButton="true"
          />
          <UserLayout>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<AllShows />} />
              <Route path="explore/shows/:slug" element={<SingleShow />} />
              {user && <Route path="/mybookings" element={<MyBookings />} />}
              {user && <Route path="/myprofile" element={<MyProfile />} />}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserLayout>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
