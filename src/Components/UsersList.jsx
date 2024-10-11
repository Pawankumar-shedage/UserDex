import React from 'react'

export const UsersList = ({usersList}) => {

    if(!Array.isArray(usersList) || usersList.length === 0){
        return <p>No users available.</p>
    }
  return (
    <div id="users-list" className="w-full sm:border-r-2 sm: border-black">
        <h2 className="mb-2 text-3xl  text-gray-900 ">My users</h2>

        {/* list */}
        <ol className="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-700">
          {usersList.map((user) => (
            <li
              className=" flex justify-between items-center p-4  bg-gray-500 text-white rounded-lg shadow-lg "
              key={user.id}
            >
              <div className="flex space-x-2">
                <span className="  text-base md:text-xl">
                  {user.firstName} {user.lastName}
                </span>
                <span className=" px-2   ">{user.email}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
  )
}
