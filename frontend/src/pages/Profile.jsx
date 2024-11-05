import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  const [Profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://bookreview-57qn.onrender.com/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setLoading(false); // Ensure loading stops regardless of success or failure
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 min-h-screen px-4 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      {loading ? (
        <div className="flex h-full w-full items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/4 lg:w-1/6 h-auto md:h-screen">
            <Sidebar data={Profile} />
          </div>
          <div className="w-full md:w-3/4 lg:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Profile/Sidebar";
// import { Outlet } from "react-router-dom";
// import axios from "axios";
// import Loader from "../components/Loader/Loader";

// const Profile = () => {
//   const [Profile, setProfile] = useState(null);
//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   useEffect(() => {
//     const fetch = async () => {
//       const response = await axios.get(
//         "https://bookreview-57qn.onrender.com/api/v1/get-user-information",
//         { headers }
//       );
//       setProfile(response.data);
//     };
//     fetch();
//   }, []);

//   return (
//     <div className="bg-zinc-900 min-h-screen px-4 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
//       {!Profile ? (
//         <div className="w-full h-full flex items-center justify-center">
//           <Loader />
//         </div>
//       ) : (
//         <>
//           <div className="w-full md:w-1/4 lg:w-1/6 h-auto md:h-screen">
//             <Sidebar data={Profile} />
//           </div>
//           <div className="w-full md:w-3/4 lg:w-5/6">
//             <Outlet />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Profile;
