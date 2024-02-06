import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { app } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CreateListingPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    userRef: currentUser._id,
  });

  const [uploadImageError, setUploadImageError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  // console.log(files);
  // console.log(formData);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const response = await fetch(`/api/listing/get-listing/${listingId}`);
      const data = await response.json();

      if ((data.success = false)) {
        console.log(data.message);
        return;
      }

      setFormData(data);
    };
    fetchListing();
  }, []);

  const uploadImage = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        setUploading(true);
        setUploadImageError(false);
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploadImageError(false);
          setUploading(false);
        })
        .catch((err) => {
          setUploadImageError(
            "Image upload failed! (Only 2 mb max per image is allowed)"
          );
          setUploading(false);
        });
    } else {
      setUploadImageError("Only 6 images are allowed per listing!");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done!`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload at least one image");
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        return setError("Discounted Price must be lower than regular price!");
      }
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await response.json();

      if (data.success === false) {
        setError(data.message);
      }
      setLoading(false);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Listing Page
      </h1>

      <form
        className="flex flex-col sm:flex-row p-10 gap-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            required
            onChange={handleChange}
            value={formData.name}
            className="border p-3 rounded-lg"
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Address"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
            className="border p-3 rounded-lg"
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="sale"
                className="w-4"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-1">
              <input
                type="checkbox"
                id="rent"
                className="w-4"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-1">
              <input
                type="checkbox"
                id="parking"
                className="w-4"
                onChange={handleChange}
                value={formData.parking}
              />
              <span>Parking</span>
            </div>

            <div className="flex gap-1">
              <input
                type="checkbox"
                id="furnished"
                className="w-4"
                onChange={handleChange}
                value={formData.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-1">
              <input
                type="checkbox"
                id="offer"
                className="w-4"
                onChange={handleChange}
                value={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bedrooms}
                className="p-1 border border-gray-500 rounded-lg"
              />
              <span>Beds</span>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
                className="p-1 border border-gray-500 rounded-lg"
              />
              <span>Bathrooms</span>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
                className="p-1 border border-gray-500 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>

            {formData.offer && (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="1000000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                  className="p-1 border border-gray-500 rounded-lg"
                />

                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-900 ml-2">
              The first image will be the cover (max 6)
            </span>
            <p className="text-red-600 text-center text-sm">
              {uploadImageError && uploadImageError}
            </p>
          </p>
          <div className="flex gap-2">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
            />

            <button
              type="button"
              onClick={uploadImage}
              className="p-3 bg-green-400 text-white rounded hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "UPLOAD"}
            </button>
          </div>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border border-gray-400 item-center mt-2"
              >
                <img
                  src={url}
                  alt="Listed image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="p-3 text-red-600 rounded-lg hover:opacity-95"
                >
                  DELETE
                </button>
              </div>
            ))}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            className="p-3 mt-3 bg-green-500 text-white rounded-lg hover:opacity-95 disabled:opacity-80"
            disabled={loading || uploading}
          >
            {loading ? "Creating..." : "UPDATE LISTING"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListingPage;
