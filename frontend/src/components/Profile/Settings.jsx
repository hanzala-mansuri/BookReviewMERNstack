import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const submitAddress = async () => {
    try {
      const response = await axios.put(
        "https://bookreview-57qn.onrender.com/api/v1/update-address",
        value,
        { headers }
      );
      // alert(response.data.message);
      toast.success(response.data.message);

    } catch (error) {
      console.log(error);
      toast.error("An unexpected response occurred");
    }
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "https://bookreview-57qn.onrender.com/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.log(error);
        toast.error("Error in profile fetching, please try again later...")
      }
    };

    fetchProfileData();
  }, []);

  return (
    <>
      {/* Show loader until user data is fetched */}
      {!profileData && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {profileData && (
        <div className="container mx-auto p-4 md:p-8 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 text-center">
            Settings
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div>
              <label className="block mb-2">Username</label>
              <p className="p-2 rounded bg-zinc-800 font-semibold">
                {profileData.username}
              </p>
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <p className="p-2 rounded bg-zinc-800 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label className="block mb-2">Address</label>
            <textarea
              onChange={change}
              rows="5"
              placeholder="Address"
              name="address"
              value={value.address}
              className="p-2 rounded bg-zinc-800 font-semibold resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={submitAddress}
              className="bg-yellow-500 text-zinc-900 font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
