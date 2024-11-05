import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col h-full">
      <div className="flex flex-col items-center justify-center w-auto mb-4">
        <img src={data.avatar} alt="avatar" className="h-[12vh] rounded-full" />
        <p className="mt-3 text-lg md:text-xl text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-sm text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      <div className="flex-grow flex flex-col items-stretch">
        {role === "user" && (
          <>
            <Link
              to="/profile"
              className="text-zinc-100 font-semibold py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
            >
              Favourites
            </Link>
            <Link
              to="/profile/orderHistory"
              className="text-zinc-100 font-semibold py-2 mt-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
            >
              Order History
            </Link>
            <Link
              to="/profile/settings"
              className="text-zinc-100 font-semibold py-2 mt-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
            >
              Settings
            </Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link
              to="/profile"
              className="text-zinc-100 font-semibold py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
            >
              All Orders
            </Link>
            <Link
              to="/profile/add-book"
              className="text-zinc-100 font-semibold py-2 mt-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
            >
              Add Books
            </Link>
            <Link
              to="/profile/manage-users"
              className="text-zinc-100 font-semibold py-2 mt-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
            >
              Manage Users
            </Link>
          </>
        )}
      </div>

      <button
        className="hover:bg-blue-500 rounded bg-zinc-900 w-full mt-4 text-white font-semibold flex items-center justify-center"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear();
          navigate("/");
        }}
      >
        Log Out <FaArrowRightFromBracket className="ms-2" />
      </button>
    </div>
  );
};

export default Sidebar;
