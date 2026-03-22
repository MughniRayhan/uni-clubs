import React from "react";

import { Link } from "react-router";

function Error() {
    return (
        <div className="pt-50 px-4">
            <div className="flex flex-col items-center justify-center  bg-white rounded-lg shadow-lg max-w-4xl mx-auto px-6 py-16 text-center ">

                <h1 className="text-4xl font-bold  mb-2 text-red-500">404</h1>
                <p className="text-gray-600 mb-6">Page Not Found</p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded hover:bg-primary-focus transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

export default Error;
