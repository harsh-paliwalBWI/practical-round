"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const router = useRouter();

  const handleAddBlog = async (e: any) => {
    e.preventDefault();
    const formData = { title , description, image, metatitle:"blogmetatitle", metadesc:"blogmetadesc", link:"thisisblog"  };
    console.log(formData);
    const token= localStorage.getItem("token")
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      router.push("/blogs");
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleAddBlog} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Add Blog</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block border border-gray-300 p-2 mb-4 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block border border-gray-300 p-2 mb-4 w-full"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="block border border-gray-300 p-2 mb-4 w-full"
          placeholder=""
    
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Add Blog
        </button>
      </form>
    </div>
  );
}
