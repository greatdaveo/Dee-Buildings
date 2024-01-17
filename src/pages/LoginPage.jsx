import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/GoogleAuth/OAuth";

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // When login state is initiated
      dispatch(loginStart());

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      // When the data fetched is false
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      }
      // When it login is successful
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      // When there is an outright error
      dispatch(loginFailure(error.message));
    }
  };

  // console.log(formData);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="my-7 text-3xl text-white text-center font-semibold">
        Kindly Login Here!
      </h1>

      {error && <p className="text-red-500 my-5 text-center">{error}</p>}

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={handleChange}
          placeholder="Enter your email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          onChange={handleChange}
          placeholder="Enter your password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          disabled={loading}
          className="bg-purple-500 text-white p-2 rounded-lg font-bold hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "LOGIN"}
        </button>

        <OAuth />
      </form>

      <div className="flex gap-2 mt-5 ">
        <p>Not an existing user? </p>
        <Link to={"/register"} className="text-blue-700">
          Register here...
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
