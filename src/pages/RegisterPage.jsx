import React from 'react'
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="my-7 text-3xl text-center font-semibold">
        Kindly Register Here!
      </h1>

      <form className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter your username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-purple-500 text-white p-2 rounded-lg font-bold hover:opacity-95 disabled:opacity-80">
          SIGN UP
        </button>

        <button className="bg-red-500 text-white p-2 rounded-lg font-bold hover:opacity-95 disabled:opacity-80">
          CONTINUE WITH GOOGLE
        </button>
      </form>

      <div className="flex gap-2 mt-5 ">
        <p>Have an account? </p>
        <Link to={"/login"} className="text-blue-700">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
