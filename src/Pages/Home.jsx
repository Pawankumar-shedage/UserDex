import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddUserForm } from "../Components/AddUserForm";
import { UsersList } from "../Components/UsersList";

export const Home = () => {
  // User list
  const [usersList, setUsersList] = useState([]);

  const handleNewUser = (newUser) => {
    setUsersList((prevList) => {
      return [...prevList, newUser];
    });
  };

  const [firstLoad,setFirstLoad] = useState(true);

  useEffect(() => {
    console.log("first load",firstLoad);

    // if(firstLoad){
    //   setFirstLoad(false);
    //   //don't fetch users for  first load as db is empty.
    //   return;
    // }
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
  }, [Array.isArray(usersList) && usersList.length > 0]);

 
  // ---------------------------------
  return (
    <div className="flex flex-col sm:flex sm:flex-row w-10/12 mx-auto mt-5">
      {/* 1.Users List */}
      {Array.isArray(usersList) && usersList.length > 0 && <UsersList usersList={usersList} />}

      {/* 2.Add user form */}
      <div id="user-form" className="w-full mt-5 sm:mt-0 sm:px-20 mx-auto">
        <h2 className="mb-2 text-3xl  text-gray-900 mx-auto w-full">
          Add user
        </h2>
        <AddUserForm onUserAdded={handleNewUser} />
      </div>
    </div>
  );
};
