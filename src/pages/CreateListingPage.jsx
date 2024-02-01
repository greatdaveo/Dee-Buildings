import React from "react";

const CreateListingPage = () => {
  return (
    <main className="p-3 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing Page
      </h1>

      <form className="flex flex-col sm:flex-row p-10 gap-5">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            required
            className="border p-3 rounded-lg"
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Address"
            id="address"
            required
            className="border p-3 rounded-lg"
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-1">
              <input type="checkbox" id="sale" className="w-4" />
              <span>Sell</span>
            </div>

            <div className="flex gap-1">
              <input type="checkbox" id="rent" className="w-4" />
              <span>Rent</span>
            </div>

            <div className="flex gap-1">
              <input type="checkbox" id="parking" className="w-4" />
              <span>Parking</span>
            </div>

            <div className="flex gap-1">
              <input type="checkbox" id="furnished" className="w-4" />
              <span>Furnished</span>
            </div>

            <div className="flex gap-1">
              <input type="checkbox" id="offer" className="w-4" />
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
                className="p-1 border border-gray-500 rounded-lg"
              />
              <span>Bathrooms</span>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-1 border border-gray-500 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-1 border border-gray-500 rounded-lg"
              />

              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-900 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-2">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded w-full"
            />

            <button className="p-3 bg-green-400 text-white rounded hover:shadow-lg disabled:opacity-80">
              UPLOAD
            </button>
          </div>

          <button className="p-3 mt-3 bg-green-500 text-white rounded-lg hover:opacity-95 disabled:opacity-80">
            CREATE LISTING
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListingPage;
