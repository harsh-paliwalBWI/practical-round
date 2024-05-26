"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  comments: {
    _id: string;
    comment: string;
    user: {
      userName: string;
    };
  }[];
}

const BlogDetail = ({ params }: any) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const router = useRouter();

  const id = params.id;

  const fetchBlogData = async () => {
    if (id) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const blogData = response.data.resultAggregate[0];
        setBlog(blogData);
        setEditedTitle(blogData.title);
        setEditedDescription(blogData.description);
        setComments(blogData.comments || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  const handleEdit = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${id}`,
        {
          title: editedTitle,
          description: editedDescription,
          metatitle: `meta ${editedTitle}`,
          metadesc: `meta ${editedDescription}`,
          link: editedTitle.split(" ").join("_"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlog(response.data.result);

      setIsEditing(false);
    } catch (error) {
      console.error("Error editing blog:", error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/blogs");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/postComment/${id}`,
        {
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComment("");
      fetchBlogData();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (loading) return <div className="w-full h-100vh flex justify-center items-center"><p className="text-center font-bold text-xl sm:text-2xl md:text-3xl">Loading...</p></div>;

  if (!blog) return <div>No blog found</div>;

  return (
    <div className="min-h-screen p-6 flex flex-col gap-5">
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Blog Details</h2>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="block border border-gray-300 p-2 mb-4 w-full"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="block border border-gray-300 p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                onClick={handleEdit}
              >
                Save Changes
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-end">
        <button
          className="bg-green-600 px-2 py-1 text-white rounded"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className="bg-red-600 px-2 py-1 text-white rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div className="w-full h-64 overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${blog.image}`}
          alt={blog.title}
          width={1000}
          height={1000}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="bg-white p-4 rounded border-2 border-gray-300">
        <h1 className="text-3xl mb-6">{blog.title}</h1>
        <p className="mt-4 text-gray-700">{blog.description}</p>
      </div>

      <div className="bg-white p-4 rounded border-2 border-gray-300 mt-6">
        <h2 className="text-2xl mb-4">Comments</h2>
        {comments.length > 0 ? (
          comments.map((commentObj, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-700 mb-1">
                <strong>{commentObj.user.userName}:</strong>{" "}
                {commentObj.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      <form
        onSubmit={handleCommentSubmit}
        className="bg-white p-4 rounded border-2 border-gray-300 mt-6"
      >
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="block border border-gray-300 p-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
};

export default BlogDetail;
