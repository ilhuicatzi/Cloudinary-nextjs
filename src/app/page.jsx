"use client";
import { useState } from "react";
import {FaUserCircle} from 'react-icons/fa'

function ImagenPage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    setImageUrl(data.url);
  };
  return (
    <div className="flex justify-center items-center flex-col h-[calc(80vh)]">
      <h1 className="text-2xl font-medium font-mono text-center mb-8">
        Cloudinary-Image
      </h1>

      <div className="border-2 rounded-full bg-cover bg-center w-44 h-44 mb-10 flex items-center justify-center">
        {imageUrl ? 
        <img src={imageUrl} alt="image cloudinary" className="rounded-full w-40 h-40 flex justify-center items-center bg-center" /> 
        : 
        <FaUserCircle className="w-40 h-40" /> }
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-6 bg-zinc-900 rounded-2xl"
      >
        <input
          onChange={handleChange}
          type="file"
          name="file"
          placeholder="Upload an image"
          className="my-8 border-2 px-6 py-2 rounded-lg"
        />
        <div className="flex justify-end w-full">
          <button className="rounded-xl px-5 py-1 bg-indigo-700 text-sm font-medium hover:bg-indigo-900">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ImagenPage;
