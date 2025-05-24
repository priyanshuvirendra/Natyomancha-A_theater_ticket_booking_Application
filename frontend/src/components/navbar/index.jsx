import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginModal from "../modals/login";
import SignUpModal from "../modals/signup";
import ForgotPasswordModal from "../modals/forgotpassword";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import { setTheme } from "../../store/slices/themeSlice";
import { setLanguage } from "../../store/slices/languageSlice";

import { LuSunMedium } from "react-icons/lu";
import { RiMoonClearLine } from "react-icons/ri";
import { toast } from "sonner";
import { switchLoginModalOpen } from "../../store/slices/loginModalOpenSlice";

import logo from "../../assets/logo/natyomancha_logo.png";

import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const Navbar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSignupModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isForgotPassModalOpen, setIsForgotPassModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navbarRef = useRef(null);

  const storedUser = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  const openLoginModal = () => {
    dispatch(switchLoginModalOpen(true));
  };

  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignupModalOpen);
  };

  const toggleForgotPassModal = () => {
    setIsForgotPassModalOpen(!isForgotPassModalOpen);
  };

  const switchToSignUpModal = () => {
    dispatch(switchLoginModalOpen(false));
    setIsSignUpModalOpen(true);
  };

  const switchToLoginModal = () => {
    setIsSignUpModalOpen(false);
    setIsForgotPassModalOpen(false);
    dispatch(switchLoginModalOpen(true));
  };

  const switchToForgotPassModal = () => {
    dispatch(switchLoginModalOpen(false));
    setIsForgotPassModalOpen(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/");
    window.location.reload();
    toast.success("Please visit again!");
  };

  const theme = useSelector((state) => state.theme);
  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    if (newTheme !== theme) {
      dispatch(setTheme(newTheme));
    }
    alert("The theme change functionality is coming soon...");
  };

  const language = useSelector((state) => state.language);
  const handleLangTranslation = () => {
    const newLang = language === "english" ? "bengali" : "english";
    if (newLang !== language) {
      dispatch(setLanguage(newLang));
    }
    alert("The language change functionality is coming soon...");
  };

  const handleNavLinkClick = () => {
    setOpen(false);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="bg-background2 text-white font-semibold py-4 px-5 md:px-10 flex justify-between items-center">
      <div className="text-xl font-bold">
        <NavLink
          to="/"
          className="gap-x-2 flex items-center"
          onClick={handleNavLinkClick}
        >
          <img src={logo} alt="random_logo" className="rounded-full w-12" />
          <h2 className="text-3xl sm:text-xl md:text-2xl lg:text-3xl font-logo_text font-bold">
            Natyomancha
          </h2>
        </NavLink>
      </div>

      <div className="flex items-center justify-center space-x-5">
        <div className="relative flex items-center">
          {user ? (
            <>
              {user.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-12 h-12 rounded-full cursor-pointer border border-highlight"
                  onClick={toggleDropdown}
                />
              ) : (
                <div
                  className="bg-gray-800 w-12 h-12 rounded-full border border-primary_text flex items-center justify-center text-lg cursor-pointer"
                  onClick={toggleDropdown}
                >
                  {getInitials(user.name)}
                </div>
              )}
              {isDropdownOpen && (
                <div className="z-30 absolute right-0 mt-48 w-36 bg-secondary_text rounded-md shadow-lg  text-primary_text">
                  <NavLink
                    to="/mybookings"
                    className="block px-4 py-2 hover:bg-shadow"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Bookings
                  </NavLink>
                  <NavLink
                    to="/myprofile"
                    className="block px-4 py-2 hover:bg-shadow"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Profile
                  </NavLink>
                  <button
                    className="block px-4 py-2 hover:bg-shadow w-full text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={openLoginModal}
              className="bg-highlight hover:bg-highlight_hover text-primary_text font-bold text-lg px-3 py-1 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <LoginModal
        onSignUpClick={switchToSignUpModal}
        onForgotPassClick={switchToForgotPassModal}
      />

      <SignUpModal
        isOpen={isSignupModalOpen}
        onClose={toggleSignUpModal}
        onLoginClick={switchToLoginModal}
      />

      <ForgotPasswordModal
        isOpen={isForgotPassModalOpen}
        onClose={toggleForgotPassModal}
        onLoginClick={switchToLoginModal}
      />
    </div>
  );
};

export default Navbar;
