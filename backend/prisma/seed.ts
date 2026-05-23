import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.college.deleteMany();

  const colleges = [

    {
      name: "IIT Delhi",
      location: "Delhi",
      fees: 250000,
      rating: 4.9,
      placementPercentage: 98,
      description: "Top IIT in India",
      imageUrl:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",

      courses: [
        "CSE",
        "ECE",
        "Mechanical",
      ],
    },

    {
      name: "IIT Bombay",
      location: "Mumbai",
      fees: 260000,
      rating: 4.9,
      placementPercentage: 99,
      description: "Premier IIT",
      imageUrl:
        "https://images.unsplash.com/photo-1562774053-701939374585",

      courses: [
        "CSE",
        "AI",
        "Electrical",
      ],
    },

    {
      name: "NIT Trichy",
      location: "Tamil Nadu",
      fees: 180000,
      rating: 4.6,
      placementPercentage: 92,
      description: "Top NIT",
      imageUrl:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",

      courses: [
        "CSE",
        "Civil",
      ],
    },

    {
      name: "IIIT Hyderabad",
      location: "Hyderabad",
      fees: 220000,
      rating: 4.7,
      placementPercentage: 94,
      description: "Best IIIT",
      imageUrl:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a",

      courses: [
        "CSE",
        "AI",
      ],
    },

    {
      name: "BITS Pilani",
      location: "Rajasthan",
      fees: 500000,
      rating: 4.5,
      placementPercentage: 90,
      description:
        "Top private college",

      imageUrl:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644",

      courses: [
        "CSE",
        "ECE",
      ],
    },

    {
      name: "VIT Vellore",
      location: "Tamil Nadu",
      fees: 350000,
      rating: 4.2,
      placementPercentage: 82,
      description:
        "Popular private college",

      imageUrl:
        "https://images.unsplash.com/photo-1564981797816-1043664bf78d",

      courses: [
        "CSE",
        "IT",
      ],
    },

    {
      name: "SRM University",
      location: "Chennai",
      fees: 300000,
      rating: 4.1,
      placementPercentage: 78,
      description:
        "Private engineering university",

      imageUrl:
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b",

      courses: [
        "CSE",
        "ECE",
      ],
    },

  ];

  for (const college of colleges) {

    await prisma.college.create({
      data: college,
    });
  }

  console.log(
    "Database seeded successfully"
  );
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });