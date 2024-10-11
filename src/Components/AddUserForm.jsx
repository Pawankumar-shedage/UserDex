import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AddUserForm = ({onUserAdded}) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
      });
    
      const navigate = useNavigate();
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleForm = async (e) => {
        e.preventDefault();
        console.log("Form data: ", formData);
        try {
          const response = await axios.post(
            "http://localhost:8080/api/v1/users/addUser",
            formData
          );
    
          console.log("Response: ", response);
          if (response.status === 200) {
            toast.success("User added successfully!");
            
            const newUser = response.data;
            onUserAdded(newUser);

            // reset form
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              address: "",
              phoneNumber: "",
            })
    
            navigate("/");
          } else {
            toast.error("Error adding user! Please try again."); // Generic error message
          }
        } catch (error) {
          console.log("Error: ", error);
          if (error.response) {
            // Handle HTTP errors
            console.log(error.response.data);
            toast.error(error.response.data || "An error occurred!"); // Use error message from response
          } else {
            // Handle network errors or unexpected issues
            toast.error("Network error! Please check your connection.");
          }
        }
      };

  return (
    <form onSubmit={handleForm} className="max-w-sm ">
          {/* First Name */}
          <div className="mb-5">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-black "
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              id="firstName"
              className="bg-gray-500 border text-white border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {/* Last Name */}
          <div className="mb-5">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-black "
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              id="lastName"
              className="bg-gray-500 border text-white border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black "
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              id="email"
              className="bg-gray-500 border text-white border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-5">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="4"
              className="block p-2.5 w-full text-white text-sm  bg-gray-500 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type your address here..."
            ></textarea>
          </div>

          {/* phoneNumber */}
          <div className="mb-2">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Phone number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 19 18"
                >
                  <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                </svg>
              </div>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                id="phoneNumber"
                aria-describedby="helper-text-explanation"
                className="bg-gray-500 border text-white border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5   dark:border-gray-600 dark:placeholder-white  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                pattern="[0-9]{10}"
                placeholder="10 digit number"
                required
              />
            </div>
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              Select a phone number that matches the format.
            </p>
          </div>

          {/* Submit btn */}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
  )
}
