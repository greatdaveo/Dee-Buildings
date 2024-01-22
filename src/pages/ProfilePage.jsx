import React from 'react'
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-center my-4">Profile</h1>

      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile-img"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />

        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3  rounded-lg"
        />
        <input
          type="text"
          id="email"
          placeholder="email"
          className="border p-3  rounded-lg"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          className="border p-3  rounded-lg"
        />

        <button className="bg-purple-500 text-white rounded-lg p-3 hover:opacity-80 disabled:opacity-75">
          UPDATE
        </button>
        <button className="bg-green-400 text-white rounded-lg p-3 hover:opacity-80 disabled:opacity-75">
          CREATE LISTING
        </button>
      </form>

      <div className="flex justify-between mt-2">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default ProfilePage
