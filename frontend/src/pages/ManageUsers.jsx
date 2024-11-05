import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://bookreview-57qn.onrender.com/api/v1/get-all-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error in get-all-users, please try again later...")
      setIsLoading(false);
    }
  };

  const handleEditUser = (user) => setEditingUser(user);

  const handleEditSaveUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://bookreview-57qn.onrender.com/api/v1/update-user/${editingUser._id}`,
        editingUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) => (user._id === editingUser._id ? editingUser : user))
      );
      setEditingUser(null);
      // alert("User updated successfully!");
      toast.success("User updated successfully!")
    } catch (error) {
      console.error("Error updating user:", error);
      // alert("Failed to update user.");
      toast.error("Failed to Update User, Please try again later...")
    }
  };

  const handleDeleteUser = async (userId) => {
    const userToDelete = users.find((user) => user._id === userId);
    if (userToDelete && userToDelete.role === "admin") {
      // alert("You cannot delete an admin user.");
      toast.error("You cannot delete an admin user.")
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://bookreview-57qn.onrender.com/api/v1/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
      // alert("User deleted successfully!");
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      // alert("Failed to delete user.");
      toast.error("Failed to Delete User, Please try again later...")
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        No users found.
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen px-4 md:px-12 py-8 gap-4 text-white">
      {editingUser && (
        <div className="mb-4 p-4 bg-gray-800 rounded-md">
          <h3 className="text-xl mb-2">Edit User</h3>
          <label className="block mb-1" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="p-2 mb-2 w-full text-gray-800 bg-white rounded"
            value={editingUser.username}
            onChange={(e) =>
              setEditingUser({ ...editingUser, username: e.target.value })
            }
          />
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="p-2 mb-2 w-full text-gray-800 bg-white rounded"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            // disabled
            title="You cannot change the password. This field is disabled"
            placeholder="Password"
            className="p-2 mb-2 w-full text-gray-800 bg-white cursor-not-allowed rounded"
            value={editingUser.password}
            onChange={(e) =>
              setEditingUser({ ...editingUser, password: e.target.value })
            }
          />
          <div className="flex gap-2">
            <button
              onClick={handleEditSaveUser}
              className="bg-green-600 px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="bg-red-600 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="bg-gray-800">
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-blue-500 px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    disabled={user.role === "admin"}
                    className={`bg-red-500 px-3 py-1 rounded-md ${
                      user.role === "admin" ? "cursor-not-allowed" : ""
                    }`}
                    title={
                      user.role === "admin"
                        ? "Admin user cannot be deleted"
                        : ""
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
