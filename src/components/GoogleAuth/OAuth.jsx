import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/firebase";
// For global state management
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGoogleButton = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await response.json();

      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with google", error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleButton}
      className="bg-red-500 text-white p-2 rounded-lg font-bold hover:opacity-95 disabled:opacity-80"
    >
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default OAuth;
