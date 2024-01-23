import React, { useEffect, useRef, useState } from "react";
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
          onClick={handleChange}
          className="border p-3  rounded-lg"
        />
        <input
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onClick={handleChange}
          className="border p-3  rounded-lg"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          onClick={handleChange}
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

export default ProfilePage;
