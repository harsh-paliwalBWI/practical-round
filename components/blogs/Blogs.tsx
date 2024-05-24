"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BlogDetails from "./BlogDetails";

const BlogComponent = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
      setBlogData(response.data.result.docs);

    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id: any) => {
    router.push(`/edit-blog/${id}`);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl mb-6 font-bold">Blogs</h1>
      <div className="p-8">
        {loading ? (
          <div className="min-h-[80vh] w-full flex justify-center items-center">
            <p className="text-center font-bold text-xl sm:text-2xl md:text-3xl">
              Loading
            </p>
          </div>
        ) : blogData.length === 0 ? (
          <div className="min-h-[80vh] w-full flex justify-center items-center">
            <p className="text-center font-bold text-xl sm:text-2xl md:text-3xl">
              No Blogs Found !
            </p>
          </div>
        ) : (
          <div className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8  ">
            {blogData.map((blog: any) => (
              <div className="gap-y-2 h-full" key={blog._id}>
                <BlogDetails post={blog} />
              </div>
            ))}
          </div>
        )}
      </div>

    
    </div>
  );
};

export default BlogComponent;
