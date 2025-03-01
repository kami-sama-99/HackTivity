import Link from "next/link";

export default function Menu() {
  return (
    <aside
      className="sticky top-10 bg-navy-600 text-gray-200 p-6 rounded-lg shadow-md w-64 h-fit flex flex-col"
    >
      <nav className="flex flex-col space-y-3">
        <Link href="/dashboard">
          <button className="w-full bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-400 hover:text-black">
            Dashboard
          </button>
        </Link>
        <Link href="/leaderboard">
          <button className="w-full bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-400 hover:text-black">
            Leaderboard
          </button>
        </Link>
        <Link href="/analytics">
          <button className="w-full bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-400 hover:text-black">
            Analytics
          </button>
        </Link>
        <Link href="/courses">
          <button className="w-full bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-400 hover:text-black">
            Courses
          </button>
        </Link>
        <Link href="/mock">
          <button className="w-full bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-400 hover:text-black">
            Mock Interviews
          </button>
        </Link>
        <Link href="/resume">
          <button className="w-full bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-400 hover:text-black">
            Resume
          </button>
        </Link>
        <Link href="/profile">
          <button className="w-full bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-400 hover:text-black">
            Profile Settings
          </button>
        </Link>
      </nav>
    </aside>
  );
}
