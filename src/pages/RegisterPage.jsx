import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);

        return;
      }

      setLoading(false);
      setError(null);
      navigate("/login")
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  // console.log(formData);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="my-7 text-3xl text-white text-center font-semibold">
        Kindly Register Here!
      </h1>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter your username"
          className="border p-3 rounded-lg"
          id="username"
        />
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
          {loading ? "Loading..." : "SIGN UP"}
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

      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default RegisterPage;
