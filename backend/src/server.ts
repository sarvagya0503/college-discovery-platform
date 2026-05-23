import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("API Running");
});

/* =========================================
   GET ALL COLLEGES
   SEARCH + FILTER + PAGINATION
========================================= */

app.get("/colleges", async (req, res) => {
  try {
    const search =
      (req.query.search as string) || "";

    const location =
      (req.query.location as string) || "";

    const maxFees = req.query.maxFees
      ? Number(req.query.maxFees)
      : undefined;

    const page = req.query.page
      ? Number(req.query.page)
      : 1;

    const limit = 6;

    const colleges = await prisma.college.findMany({
      where: {
        /* SEARCH BY NAME */
        ...(search && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),

        /* EXACT LOCATION FILTER */
        ...(location && {
          location: {
            equals: location,
            mode: "insensitive",
          },
        }),

        /* MAX FEES FILTER */
        ...(maxFees && {
          fees: {
            lte: maxFees,
          },
        }),
      },

      /* PAGINATION */
      skip: (page - 1) * limit,

      take: limit,
    });

    res.json(colleges);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/* =========================================
   GET SINGLE COLLEGE
========================================= */

app.get("/colleges/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const college =
      await prisma.college.findUnique({
        where: {
          id,
        },
      });

    res.json(college);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/* =========================================
   SERVER
========================================= */

app.get("/predictor", async (req, res) => {
  try {
    const exam = req.query.exam as string;

    const rank = Number(req.query.rank);

    let colleges = [];

    if (exam === "JEE") {
      if (rank <= 1000) {
        colleges = await prisma.college.findMany({
          where: {
            rating: {
              gte: 4.8,
            },
          },
        });
      }

      else if (rank <= 5000) {
        colleges = await prisma.college.findMany({
          where: {
            rating: {
              gte: 4.5,
            },
          },
        });
      }

      else {
        colleges = await prisma.college.findMany({
          where: {
            rating: {
              gte: 4.0,
            },
          },
        });
      }
    }

    res.json(colleges);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
app.get("/predictor", async (req, res) => {
  try {

    const rank = Number(req.query.rank);

    let colleges = [];

    /* TOP IITs */
    if (rank <= 1000) {

      colleges =
        await prisma.college.findMany({
          where: {
            name: {
              startsWith: "IIT",
            },
          },
        });
    }

    /* NIT + IIIT */
    else if (rank <= 5000) {

      colleges =
        await prisma.college.findMany({
          where: {
            OR: [
              {
                name: {
                  startsWith: "NIT",
                },
              },

              {
                name: {
                  startsWith: "IIIT",
                },
              },
            ],
          },
        });
    }

    /* PRIVATE TOP */
    else if (rank <= 20000) {

      colleges =
        await prisma.college.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: "BITS",
                },
              },

              {
                name: {
                  contains: "VIT",
                },
              },
            ],
          },
        });
    }

    /* HIGHER RANK */
    else {

  colleges =
    await prisma.college.findMany({
      where: {
        OR: [

          {
            name: {
              contains: "SRM",
            },
          },

          {
            name: {
              contains: "VIT",
            },
          },

        ],
      },
    });
}

    res.json(colleges);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Something went wrong",
    });
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});