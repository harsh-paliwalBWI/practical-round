import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  post: any;
}

const BlogDetails: FC<Props> = ({ post }) => {
  return (
    <Link href={`/get-blog/${post._id}`}>
      <div className="flex flex-col items-center shadow-lg border-2 h-full   gap-2 sm:gap-3 md:gap-4 p-4 w-full sm:p-6 md:p-8 ">
        <div className="w-full h-64 overflow-hidden border-2 border-gray-500">
          <Image
            src={post.image}
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full object-contain"
          />
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center ">
          {post.title}
        </h2>

        <p className="text-xs sm:text-sm md:text-base ">
          {" "}
          {post.description}
        </p>
      </div>
    </Link>
  );
};

export default BlogDetails;
