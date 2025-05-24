// src/components/Footer.jsx

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoCall, IoMail } from "react-icons/io5";

import { Link } from "react-router-dom";

import logo from "../../assets/logo/natyomancha_logo.png";

export const socialHandles = [
  {
    icon: <FaYoutube />,
    path: "/social",
  },
  {
    icon: <FaInstagram />,
    path: "/social",
  },
  {
    icon: <FaFacebookF />,
    path: "/social",
  },
  {
    icon: <FaXTwitter />,
    path: "/social",
  },
];

const Footer = () => {
  return (
    <footer className="px-10  bg-background2 text-white py-8 mt-0">
      <div className="flex flex-col  sm:flex-row items-center gap-y-10 sm:gap-x-5 md:gap-x-10 sm:gap-y-0 justify-between ">
        {/* left side */}

        <div className="flex flex-col  items-center sm:items-start justify-center">
          <div className="flex items-center justify-center gap-x-2 font-bold  text-base sm:text-xs md:text-base lg:text-lg font-lato">
            <Link
              className="text-highlight hover:text-highlight_hover"
              to="/privacy"
            >
              Privacy
            </Link>
            <p>|</p>
            <Link
              className="text-highlight hover:text-highlight_hover"
              to="/disclaimer"
            >
              Disclaimer
            </Link>
            <p>|</p>
            <Link
              className="text-highlight hover:text-highlight_hover"
              to="/sitemap"
            >
              Sitemap
            </Link>
          </div>
          <div className=" text-base sm:text-sm lg:text-base text-primary-text font-semibold font-open_sans text-center">
            <p>© 2024 Natyomancha. All rights reserved.</p>
          </div>
        </div>

        {/* middle side */}
        <div className="flex flex-col items-center justify-center gap-y-3">
          <div className="flex flex-col xl:flex-row items-center sm:items-start xl:items-center justify-center gap-y-3 xl:gap-y-0 gap-x-3">
            <Link to="/" className="mb-2 gap-x-2 flex items-center">
              <img src={logo} alt="random_logo" className="rounded-full w-16" />
              <h2 className=" text-3xl sm:text-xl md:text-2xl lg:text-3xl font-logo_text font-bold">
                Natyomancha
              </h2>
            </Link>
          </div>

          {/* social media */}
          <div className="flex items-center justify-center gap-x-7 sm:gap-x-2 lg:gap-x-7">
            {socialHandles.map((social, i) => (
              <Link
                key={i}
                to={social.path}
                className="p-1 text-xl sm:text-sm lg:text-xl rounded-full bg-shadow text-highlight hover:text-highlight_hover "
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* right side */}
        <div className="flex flex-col items-center sm:items-start justify-center ">
          {/* control room */}
          <div className="flex items-center justify-center gap-x-3 font-lato ">
            <IoCall className=" text-highlight  p-1 text-2xl sm:text-xl lg:text-2xl bg-shadow rounded-full" />
            <h1 className="text-base sm:text-xs md:text-base lg:text-base font-semibold">
              +91 7001316356
            </h1>
          </div>
          <div className="flex items-center justify-center gap-x-3 font-lato ">
            <IoMail className=" text-highlight  p-1 text-2xl sm:text-xl lg:text-2xl bg-shadow rounded-full" />
            <h1 className="text-base sm:text-xs md:text-base lg:text-base font-semibold">
              natyosupport@gmail.com
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
