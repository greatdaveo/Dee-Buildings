import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase/firebase";
import {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfileFailure,
  deleteProfileStart,
  deleteProfileSuccess,
  logoutUserStart,
  logoutUserFailure,
  logoutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const ProfilePage = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [showListingErrors, setShowListingErrors] = useState(false);
  const [userListing, setUserListing] = useState([]);

  // console.log(file);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
        // console.log("Upload is " + progress + "% done!");
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // To submit the updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateProfileStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // console.log("Response:", response);

      const data = await response.json();
      // console.log("Data", data);
      if (data.success === false) {
        dispatch(updateProfileFailure(data.message));
        return;
      }

      dispatch(updateProfileSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateProfileFailure(error.message));
    }
  };

  // To Delete User Account
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteProfileStart());

      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = response.json();

      if (data.success === false) {
        dispatch(deleteProfileFailure(data.message));
      }

      dispatch(deleteProfileSuccess(data));
    } catch (error) {
      dispatch(deleteProfileFailure(error.message));
    }
  };

  // To handle logout
  const handleLogout = async () => {
    try {
      dispatch(logoutUserStart());
      const response = await fetch("/api/auth/logout");

      if (!response.ok) {
        // Handle error based on status code
        dispatch(logoutUserFailure("Logout failed"));
        return;
      }

      const data = await response.json();

      if (data.success === false) {
        dispatch(logoutUserFailure(data.message));
        return;
      }
      dispatch(logoutUserSuccess(data));
      alert("You have logged out successfully!");
    } catch (error) {
      dispatch(logoutUserFailure(error.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingErrors(false);
      const response = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await response.json();

      if (data.success === false) {
        setShowListingErrors(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      setShowListingErrors(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const response = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListing((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-center my-4">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile-img"
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />

        {error && <p className="text-red-700 text-center my-1">{error}</p>}
        {updateSuccess && (
          <p className="text-green-600 text-center">
            You have updated your profile successfully!
          </p>
        )}

        <p className="text-sm self-center">
          {fileError ? (
            <span className="text-red-700 my-1">
              Error uploading! (Image must be less than 2mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-blue-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">IMage uploaded successfully!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border p-3  rounded-lg"
        />
        <input
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border p-3  rounded-lg"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          onChange={handleChange}
          className="border p-3  rounded-lg"
        />
        <button className="bg-purple-500 text-white rounded-lg p-3 hover:opacity-80 disabled:opacity-75">
          UPDATE
        </button>

        <Link
          to="/create-listing"
          className="bg-green-400 text-white text-center rounded-lg p-3 hover:opacity-80 disabled:opacity-75 w-full"
        >
          CREATE LISTING
        </Link>
      </form>

      <div className="flex justify-between mt-2">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>

        <button className="text-green-300" onClick={handleShowListing}>
          Show listing
        </button>

        <span className="text-red-700 cursor-pointer" onClick={handleLogout}>
          Sign out
        </span>
      </div>

      <p className="text-red-700 mt-5">
        {showListingErrors ? "There is an error showing listings" : ""}
      </p>

      {userListing && userListing.length > 0 && (
        <div className="flex flex-col gap-2">
          <h1 className="text-center my-7 text-2xl font-semibold">
            Your Listings
          </h1>

          {userListing.map((listing) => (
            <div
              className="border rounded-lg p-3 flex justify-between items-center gap-3"
              key={listing._id}
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain rounded-lg"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="font-semibold flex-1 hover:underline truncate"
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col">
                <button
                  className="text-red-700"
                  onClick={() => handleListingDelete(listing._id)}
                >
                  DELETE
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-500">EDIT</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
