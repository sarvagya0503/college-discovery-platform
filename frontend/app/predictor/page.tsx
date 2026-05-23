"use client";

import axios from "axios";
import { useState } from "react";

interface College {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementPercentage: number;
  imageUrl: string;
}

export default function PredictorPage() {
  const [exam, setExam] = useState("JEE");

  const [rank, setRank] = useState("");

  const [colleges, setColleges] = useState<
    College[]
  >([]);

  const handlePredict = async () => {
    try {
      const res = await axios.get(
        `https://college-discovery-platform-6aj7.onrender.com`
      );

      setColleges(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center text-blue-600">
        College Predictor Tool
      </h1>

      <p className="text-center text-gray-700 mt-4 text-lg">
        Enter your rank to get
        recommended colleges
      </p>

      {/* FORM */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10">

        <div className="space-y-6">

          {/* Exam */}
          <div>
            <label className="block font-semibold mb-2">
              Select Exam
            </label>

            <select
              value={exam}
              onChange={(e) =>
                setExam(e.target.value)
              }
              className="w-full p-4 border rounded-xl"
            >
              <option value="JEE">
                JEE
              </option>
            </select>
          </div>

          {/* Rank */}
          <div>
            <label className="block font-semibold mb-2">
              Enter Rank
            </label>

            <input
              type="number"
              placeholder="Enter your rank"
              value={rank}
              onChange={(e) =>
                setRank(e.target.value)
              }
              className="w-full p-4 border rounded-xl"
            />
          </div>

          {/* Button */}
          <button
            onClick={handlePredict}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
          >
            Predict Colleges
          </button>

        </div>
      </div>

      {/* RESULTS */}
      {colleges.length > 0 && (

        <div className="mt-14">

          <h2 className="text-4xl font-bold text-center">
            Recommended Colleges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

            {colleges.map((college) => (

              <div
                key={college.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >

                <img
                  src={college.imageUrl}
                  alt={college.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold">
                    {college.name}
                  </h3>

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

                </div>
              </div>

            ))}

          </div>
        </div>

      )}

    </main>
  );
}