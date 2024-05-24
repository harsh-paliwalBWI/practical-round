import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full bg-blue-600 h-16 flex gap-8 items-center justify-center">
      <Link href="/">
        <p className="text-white cursor-pointer">Home</p>
      </Link>

      <Link href="/signup">
        <p className="text-white cursor-pointer">Sign Up</p>
      </Link>
      <Link href="/login">
        <p className="text-white cursor-pointer">Login</p>
      </Link>
      <Link href="/dashboard">
        <p className="text-white cursor-pointer">DashBoard</p>
      </Link>
      <Link href="/blogs">
        <p className="text-white cursor-pointer">Blogs</p>
      </Link>
    </div>
  );
}
