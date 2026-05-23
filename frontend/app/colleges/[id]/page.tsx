"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface College {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  imageUrl: string;
  placementPercentage: number;
  description: string;
  courses: string[];
}

export default function CollegeDetails() {
  const params = useParams();

  const [college, setCollege] = useState<College | null>(
    null
  );

  useEffect(() => {
    if (!params?.id) return;

    axios
      .get(
        `https://college-discovery-platform-6aj7.onrender.com`
      )
      .then((res) => {
        setCollege(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  if (!college) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <img
        src={college.imageUrl}
        alt={college.name}
        className="w-full h-[400px] object-cover"
      />

      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-5xl font-bold">
          {college.name}
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          📍 {college.location}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-xl">
              Fees
            </h2>

            <p className="mt-3 text-lg">
              ₹{college.fees}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-xl">
              Rating
            </h2>

            <p className="mt-3 text-lg">
              ⭐ {college.rating}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-xl">
              Placements
            </h2>

            <p className="mt-3 text-lg">
              {college.placementPercentage}%
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow mt-10">
          <h2 className="text-3xl font-bold">
            Overview
          </h2>

          <p className="mt-4 text-gray-700 leading-7">
            {college.description}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow mt-10">
          <h2 className="text-3xl font-bold">
            Courses Offered
          </h2>

          <div className="flex gap-4 mt-6 flex-wrap">
            {college.courses.map((course) => (
              <div
                key={course}
                className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full"
              >
                {course}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow mt-10">
          <h2 className="text-3xl font-bold">
            Reviews
          </h2>

          <div className="mt-6 space-y-4">
            <div className="border p-4 rounded-lg">
              <p className="font-semibold">
                Rahul Sharma
              </p>

              <p className="text-gray-600 mt-2">
                Great placements and campus life.
              </p>
            </div>

            <div className="border p-4 rounded-lg">
              <p className="font-semibold">
                Priya Verma
              </p>

              <p className="text-gray-600 mt-2">
                Excellent faculty and coding culture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}