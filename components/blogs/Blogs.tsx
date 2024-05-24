"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Image from "next/image";

const BlogComponent = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const apiUrl = "http://3.6.85.24:3010/api/blog/";

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setBlogData(response.data.result.docs);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id:any) => {
    router.push(`/edit-blog/${id}`);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl mb-6">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogData.map((blog:any) => (
          <div key={blog._id} className="bg-white p-4 rounded shadow-md">
            <div className="flex justify-end">
              <button
                className="bg-red-600 px-2 py-1 text-white"
                onClick={() => handleEdit(blog._id)}
              >
                Edit
              </button>
            </div>
            <Image src={blog.image} alt="" width={1000} height={1000} />
            <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-700">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogComponent;
