"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface College {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementPercentage: number;
  imageUrl: string;
}

export default function SavedPage() {

  const [saved, setSaved] = useState<
    College[]
  >([]);

  const router = useRouter();

  useEffect(() => {

    const stored =
      localStorage.getItem(
        "savedColleges"
      );

    if (stored) {
      setSaved(JSON.parse(stored));
    }

  }, []);

  const removeCollege = (id: number) => {

    const updated = saved.filter(
      (college) => college.id !== id
    );

    setSaved(updated);

    localStorage.setItem(
      "savedColleges",
      JSON.stringify(updated)
    );
  };

  if (saved.length === 0) {

    return (
      <main className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

        <h1 className="text-4xl font-bold text-gray-800">
          No Saved Colleges
        </h1>

        <button
          onClick={() =>
            router.push("/")
          }
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Go Back
        </button>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center text-pink-600">
        Saved Colleges
      </h1>

      <p className="text-center text-gray-700 mt-4 text-lg">
        Your favourite saved colleges
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">

        {saved.map((college) => (

          <div
            key={college.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border"
          >

            <img
              src={college.imageUrl}
              alt={college.name}
              className="h-56 w-full object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold">
                {college.name}
              </h2>

              <p className="mt-3">
                📍 {college.location}
              </p>

              <p className="mt-2">
                💰 ₹{college.fees}
              </p>

              <p className="mt-2">
                ⭐ {college.rating}
              </p>

              <p className="mt-2">
                🎯 Placement:{" "}
                {
                  college.placementPercentage
                }
                %
              </p>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    router.push(
                      `/colleges/${college.id}`
                    )
                  }
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                >
                  Details
                </button>

                <button
                  onClick={() =>
                    removeCollege(
                      college.id
                    )
                  }
                  className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold"
                >
                  Remove
                </button>

              </div>
            </div>
          </div>

        ))}
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-12">

        <button
          onClick={() =>
            router.push("/")
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
        >
          Back to Home
        </button>

      </div>
    </main>
  );
}