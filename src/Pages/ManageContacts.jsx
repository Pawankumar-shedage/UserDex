import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { WarningModal } from "../Modals/WarningModal";
import { EditUserModal } from "../Modals/EditUserModal";

export const ManageContacts = () => {
  const [usersList, setUsersList] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      //don't fetch users for  first load as db is empty.
      return;
    }
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/list"
        );
        console.log("Response: ", response);

        if (response.status === 200) {
          setUsersList(response.data);
        } else {
          toast.error("Error fetching users!");
        }
      } catch (error) {
        console.log("Error: ", error);
        toast.error("Error fetching users!");
      }
    };

    getUsers();
  }, [firstLoad]);

  // Edit user
  const [openEditModal, setOpenEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const handleEditConfirmation = (newUser) => {
    console.log("updating user:", newUser);
    if (userToEdit) {
      updateUser(newUser);
    }
  };

  const updateUser = async (newUser) => {
    console.log("TO update user", newUser);

    // open edit user details modal
    // get new user {}
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/users/update/${newUser.id}`,
        newUser
      );
      console.log("Response user update: ", response);

      if (response.status === 200) {
        // refresh list
        setUsersList((prevList) => {
          return prevList.map((user)=> (user.id === newUser.id ? newUser : user))
        })
        toast.success("User updated successfully!");
      } else {
        toast.error("Error updating user!");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Error updating user!");
    }
  };

  // Delete User
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteConfirmation = () => {
    console.log("deleting user:", userToDelete);
    if (userToDelete) {
      deleteUser(userToDelete);
    }
  };
  const deleteUser = async (user) => {
    console.log("TO delete user", user);
    setOpenDeleteModal(true);

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/users/delete/${user.id}`
      );
      console.log("Response: ", response);

      if (response.status === 200) {
        toast.success("User deleted successfully!");
      } else {
        toast.error("Error deleting user!");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Error deleting user!");
    }
  };

  return (
    // List: Table view Name, Email, Phone number EDIT DELETE.
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-700 dark:bg-white-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3" style={{ width: "30%" }}>
              User name
            </th>
            <th scope="col" className="px-6 py-3" style={{ width: "10%" }}>
              Email
            </th>
            <th scope="col" className="px-6 py-3" style={{ width: "20%" }}>
              Phone Number
            </th>
            {/* <th scope="col" className="px-6 py-3">
                  Price
                </th> */}
            <th scope="col" className="px-6 py-3" style={{ width: "20%" }}>
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="px-6 py-3" style={{ width: "20%" }}>
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>

        {usersList.length > 0 ? 
          usersList.map((user) => (
            <tbody key={user.id}>
              <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.firstName} {user.lastName}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phoneNumber}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      setUserToEdit(user);
                      setOpenEditModal(true);
                    }}
                    className="font-medium p-3 rounded hover:border-2 border-white  text-blue-600 dark:text-blue-500 "
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setUserToDelete(user);
                      setOpenDeleteModal(true);
                    }}
                    className="font-medium p-2  rounded hover:border-2 border-white text-blue-600 dark:text-blue-500 "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))
         : (
          <tbody className="text-center w-full">
            <tr>
              <td className="px-4 py-4 mx-auto w-full">No users available.</td>
            </tr>
          </tbody>
        )}
      </table>

      {/* Modals: Delete, Edit */}
      {openDeleteModal && (
        <WarningModal
          message={"Are you sure you want to delete this user?"}
          positiveResp={handleDeleteConfirmation}
          onClose={() => setOpenDeleteModal(false)}
        />
      )}

      {openEditModal && (
        <EditUserModal onClose={()=>setOpenEditModal(false) } positiveResp={(user)=>handleEditConfirmation(user)} user={userToEdit}/>
      )}
    </div>
  );
};
