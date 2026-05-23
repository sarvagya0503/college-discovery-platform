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
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!rank) {
      alert("Please enter your rank");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setColleges([]);

      const res = await axios.get(
        `https://college-discovery-platform-6aj7.onrender.com/predictor?exam=${exam}&rank=${rank}`
      );

      setColleges(res.data);
    } catch (error) {
      console.log(error);
      setError("Could not load recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-5xl font-bold text-center text-blue-600">
        College Predictor Tool
      </h1>

      <p className="text-center text-gray-700 mt-4 text-lg">
        Enter your exam rank to get recommended colleges
      </p>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10">
        <div className="space-y-6">
          <div>
            <label className="block font-semibold mb-2 text-black">
              Select Exam
            </label>

            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full p-4 border rounded-xl text-black bg-white"
            >
              <option value="JEE">JEE</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-black">
              Enter Rank
            </label>

            <input
              type="number"
              placeholder="Enter your rank"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full p-4 border rounded-xl text-black bg-white"
            />
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white py-4 rounded-xl font-semibold transition"
          >
            {loading ? "Loading..." : "Predict Colleges"}
          </button>

          {error && (
            <p className="text-red-600 text-center font-semibold">
              {error}
            </p>
          )}
        </div>
      </div>

      {colleges.length > 0 && (
        <div className="mt-14">
          <h2 className="text-4xl font-bold text-center text-black">
            Recommended Colleges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {colleges.map((college) => (
              <div
                key={college.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={college.imageUrl}
                  alt={college.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black">
                    {college.name}
                  </h3>

                  <p className="mt-3 text-gray-800">
                    📍 {college.location}
                  </p>

                  <p className="mt-2 text-gray-800">💰 ₹{college.fees}</p>

                  <p className="mt-2 text-gray-800">⭐ {college.rating}</p>

                  <p className="mt-2 text-gray-800">
                    🎯 Placement: {college.placementPercentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && colleges.length === 0 && rank && (
        <p className="text-center text-gray-700 mt-10 font-semibold">
          No recommendations found for this rank.
        </p>
      )}
    </main>
  );
}