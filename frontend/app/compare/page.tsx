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

export default function ComparePage() {
  const [colleges, setColleges] = useState<
    College[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    const stored =
      localStorage.getItem(
        "compareColleges"
      );

    if (stored) {
      setColleges(JSON.parse(stored));
    }
  }, []);

  const removeCollege = (id: number) => {
    const updated = colleges.filter(
      (college) => college.id !== id
    );

    setColleges(updated);

    localStorage.setItem(
      "compareColleges",
      JSON.stringify(updated)
    );
  };

  if (colleges.length === 0) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">
          No colleges selected
        </h1>

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Go Back
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-5xl font-bold text-center text-blue-600">
        Compare Colleges
      </h1>

      <p className="text-center text-gray-700 mt-4 text-lg">
        Compare colleges side-by-side
      </p>

      {/* College Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {colleges.map((college) => (
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
              <h2 className="text-2xl font-bold text-gray-900">
                {college.name}
              </h2>

              <p className="mt-3 text-gray-700">
                📍 {college.location}
              </p>

              <button
                onClick={() =>
                  removeCollege(college.id)
                }
                className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto mt-14">
        <table className="w-full bg-white shadow-lg rounded-2xl overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-5 text-left">
                Feature
              </th>

              {colleges.map((college) => (
                <th
                  key={college.id}
                  className="p-5 text-left"
                >
                  {college.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Fees */}
            <tr className="border-b">
              <td className="p-5 font-bold">
                Fees
              </td>

              {colleges.map((college) => (
                <td
                  key={college.id}
                  className="p-5 text-gray-800"
                >
                  ₹{college.fees}
                </td>
              ))}
            </tr>

            {/* Placement */}
            <tr className="border-b">
              <td className="p-5 font-bold">
                Placement %
              </td>

              {colleges.map((college) => (
                <td
                  key={college.id}
                  className="p-5 text-gray-800"
                >
                  {
                    college.placementPercentage
                  }
                  %
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="border-b">
              <td className="p-5 font-bold">
                Rating
              </td>

              {colleges.map((college) => (
                <td
                  key={college.id}
                  className="p-5 text-gray-800"
                >
                  ⭐ {college.rating}
                </td>
              ))}
            </tr>

            {/* Location */}
            <tr>
              <td className="p-5 font-bold">
                Location
              </td>

              {colleges.map((college) => (
                <td
                  key={college.id}
                  className="p-5 text-gray-800"
                >
                  {college.location}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}