import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] text-gray-100 font-poppins text-center p-4">
            <h1 className="text-6xl font-bold text-amber-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
            <p className="text-gray-400 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="bg-amber-500 text-black px-6 py-3 rounded-md font-medium hover:bg-amber-400 transition"
            >
                Go to Home
            </Link>
        </div>
    );
}

export default NotFound;
