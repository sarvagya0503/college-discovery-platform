"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface College {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  imageUrl: string;
  placementPercentage: number;
}

export default function Home() {
  const router = useRouter();

  const [colleges, setColleges] = useState<College[]>([]);
  const [saved, setSaved] = useState<College[]>([]);
  const [selected, setSelected] = useState<College[]>([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [page, setPage] = useState(1);

  const [user, setUser] = useState<any>(null);

  /* FETCH COLLEGES */
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/colleges?search=${search}&location=${location}&maxFees=${maxFees}&page=${page}`
      )
      .then((res) => {
        setColleges(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, location, maxFees, page]);

  /* LOAD LOCAL STORAGE */
  useEffect(() => {
    const savedColleges =
      localStorage.getItem("savedColleges");

    const loggedUser =
      localStorage.getItem("user");

    if (savedColleges) {
      setSaved(JSON.parse(savedColleges));
    }

    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  /* SAVE COLLEGE */
  const handleSave = (college: College) => {
    const exists = saved.find(
      (c) => c.id === college.id
    );

    let updated: College[] = [];

    if (exists) {
      updated = saved.filter(
        (c) => c.id !== college.id
      );
    } else {
      updated = [...saved, college];
    }

    setSaved(updated);

    localStorage.setItem(
      "savedColleges",
      JSON.stringify(updated)
    );
  };

  /* COMPARE */
  const handleCompare = (
    college: College
  ) => {
    const exists = selected.find(
      (c) => c.id === college.id
    );

    if (exists) {
      setSelected(
        selected.filter(
          (c) => c.id !== college.id
        )
      );
    } else {
      if (selected.length < 3) {
        setSelected([
          ...selected,
          college,
        ]);
      }
    }
  };

  /* GO TO COMPARE */
  const goToCompare = () => {
    localStorage.setItem(
      "compareColleges",
      JSON.stringify(selected)
    );

    router.push("/compare");
  };

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    alert("Logged out successfully");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12">

        <div>
          <h1 className="text-6xl font-bold text-blue-600">
            College Discovery Platform
          </h1>

          <p className="text-gray-700 mt-4 text-xl">
            Find, compare and discover top colleges easily
          </p>

          {user && (
            <p className="mt-3 text-green-700 font-semibold text-lg">
              Logged in as {user.name}
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4">

          {!user ? (
            <>
              <button
                onClick={() =>
                  router.push("/login")
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Login
              </button>

              <button
                onClick={() =>
                  router.push("/signup")
                }
                className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Signup
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Logout
            </button>
          )}

          <button
            onClick={() =>
              router.push("/predictor")
            }
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Predictor
          </button>

          <button
            onClick={() =>
              router.push("/saved")
            }
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Saved ({saved.length})
          </button>

          <button
            onClick={goToCompare}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Compare ({selected.length})
          </button>

        </div>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="p-4 rounded-xl border border-gray-400 text-black bg-white"
        />

        <input
          type="text"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setPage(1);
          }}
          className="p-4 rounded-xl border border-gray-400 text-black bg-white"
        />

        <input
          type="number"
          placeholder="Maximum fees..."
          value={maxFees}
          onChange={(e) => {
            setMaxFees(e.target.value);
            setPage(1);
          }}
          className="p-4 rounded-xl border border-gray-400 text-black bg-white"
        />
      </div>

      {/* COLLEGE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">

        {colleges.map((college) => {

          const isSaved = saved.some(
            (c) => c.id === college.id
          );

          const isSelected =
            selected.some(
              (c) => c.id === college.id
            );

          return (
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

                <h2 className="text-3xl font-bold text-black">
                  {college.name}
                </h2>

                <p className="mt-4 text-gray-800 text-lg">
                  📍 {college.location}
                </p>

                <p className="mt-2 text-gray-800 text-lg">
                  💰 ₹{college.fees}
                </p>

                <p className="mt-2 text-gray-800 text-lg">
                  ⭐ {college.rating}
                </p>

                <p className="mt-2 text-gray-800 text-lg">
                  🎯 Placement:{" "}
                  {
                    college.placementPercentage
                  }
                  %
                </p>

                {/* BUTTONS */}
                <div className="grid grid-cols-3 gap-2 mt-6">

                  <button
                    onClick={() =>
                      router.push(
                        `/colleges/${college.id}`
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                  >
                    Details
                  </button>

                  <button
                    onClick={() =>
                      handleCompare(
                        college
                      )
                    }
                    className={`text-white py-3 rounded-xl font-semibold ${
                      isSelected
                        ? "bg-red-500"
                        : "bg-green-600"
                    }`}
                  >
                    {isSelected
                      ? "Remove"
                      : "Compare"}
                  </button>

                  <button
                    onClick={() =>
                      handleSave(
                        college
                      )
                    }
                    className={`text-white py-3 rounded-xl font-semibold ${
                      isSaved
                        ? "bg-gray-700"
                        : "bg-pink-600"
                    }`}
                  >
                    {isSaved
                      ? "Saved"
                      : "Save"}
                  </button>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-6 mt-14">

        <button
          onClick={() =>
            setPage((prev) =>
              Math.max(prev - 1, 1)
            )
          }
          className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-xl font-semibold text-black"
        >
          Previous
        </button>

        <div className="text-xl font-bold text-black">
          Page {page}
        </div>

        <button
          onClick={() =>
            setPage((prev) => prev + 1)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Next
        </button>

      </div>
    </main>
  );
}