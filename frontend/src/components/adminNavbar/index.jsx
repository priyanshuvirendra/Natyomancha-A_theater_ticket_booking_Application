import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

const AdminNavSidebar = ({ open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const loggedInUser = useSelector((state) => state.user.userInfo);
  console.log(loggedInUser);

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((name) => name[0]).join("");
    return initials.toUpperCase();
  };

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      setUser(null);
      navigate("/");
      window.location.reload();
      toast.success("Please visit again!");
    } catch (e) {
      toast.error("Failed logging out! Please try again.");
    }
  };

  return (
    <div
      className={`fixed z-50 lg:flex inset-y-0 left-0 transform ${
        open ? "w-[200px]" : "w-[0px]"
      } overflow-auto transition-width duration-700 bg-background2 text-white flex flex-col items-center `}
    >
      <div className="p-4 flex flex-col justify-center items-center">
        <div className="flex-shrink-0 mb-2">
          {user ? (
            user.image ? (
              <img
                className="w-24 h-24 rounded-full"
                src={user.image}
                alt="User avatar"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-700 rounded-full text-4xl font-semibold">
                {getInitials(user.name)}
              </div>
            )
          ) : (
            <img
              className="w-24 h-24 rounded-full"
              src="\avatar.jpg"
              alt="User avatar"
            />
          )}
        </div>
        <div className="ml-4">
          <p className="text-xl font-semibold">{user?.name}</p>
        </div>
      </div>
      <div className="p-4 ">
        <nav>
          <ul>
            <li className="mb-2">
              <NavLink
                to="/"
                className="block px-4 py-2 hover:bg-gray-700 rounded text-center"
              >
                Manage Shows
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/cineasts"
                className="block px-4 py-2 hover:bg-gray-700 rounded text-center"
              >
                Manage Cineasts
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink
                to="/theatres"
                className="block px-4 py-2 hover:bg-gray-700 rounded text-center"
              >
                Manage Theatres
              </NavLink>
            </li>
            <li className="mb-2" onClick={handleLogout}>
              <NavLink className="block px-4 py-2 hover:bg-gray-700 rounded text-center">
                <button>Logout</button>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminNavSidebar;
