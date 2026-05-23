import express from "express";
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

const prisma = new PrismaClient();

/* =========================
   SIGNUP
========================= */

router.post("/signup", async (req, res) => {
  try {

    const { name, email, password } =
      req.body;

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

    res.json({
      message:
        "Signup successful",

      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Something went wrong",
    });
  }
});

/* =========================
   LOGIN
========================= */

router.post("/login", async (req, res) => {
  try {

    const { email, password } =
      req.body;

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return res.status(400).json({
        message:
          "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },

      "SECRET_KEY",

      {
        expiresIn: "7d",
      }
    );

    res.json({
      message:
        "Login successful",

      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Something went wrong",
    });
  }
});

export default router;