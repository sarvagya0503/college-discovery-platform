"use client";

import axios from "axios";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async () => {

    try {

      await axios.post(
        "https://college-discovery-platform-6aj7.onrender.com",

        {
          name,
          email,
          password,
        }
      );

      alert(
        "Signup successful"
      );

      router.push("/login");

    } catch (error) {

      console.log(error);

      alert("Signup failed");
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-green-600">
          Signup
        </h1>

        <div className="space-y-5 mt-8">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 border rounded-xl"
          />

          <button
            onClick={handleSignup}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold"
          >
            Signup
          </button>

        </div>
      </div>
    </main>
  );
}