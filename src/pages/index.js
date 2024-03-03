// pages/index.js
import Link from 'next/link';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Healthcare Chat Application</h1>
      <div className="space-x-4">
        <Link href="/login" legacyBehavior>
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Log In
          </a>
        </Link>
        <Link href="/signup" legacyBehavior>
          <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Home;
