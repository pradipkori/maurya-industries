import plastasia from "../assets/achievements/plastasia.jpeg";
import plastasia2022 from "../assets/achievements/plastasiaaward.jpeg";
import plastivision from "../assets/achievements/plastivision.jpeg";
import recycling from "../assets/achievements/recycling-expo.jpeg";
import manufacturing from "../assets/achievements/manufacturing-unit.jpeg";

export const achievements = [
  {
    id: 1,
    title: "Plastasia Exhibition",
    description: "Showcased high-precision plastic processing machinery.",
    highlight: "Advanced Plastic Machinery Showcase",
    category: "Exhibition",
    year: "Mumbai",
    image: plastasia,
    imageBoxClass: "h-64 w-full", // 👈 CONTROL SIZE HERE
  },
  {
    id: 2,
    title: "Plastasia 2022",
    description: "Represented Maurya Industries with innovative machinery.",
    highlight: "Industry Recognition & Participation",
    category: "Exhibition",
    year: "2022",
    image: plastasia2022,
    imageBoxClass: "h-72 w-full", // 👈 taller image
  },
  {
    id: 3,
    title: "Plastivision Expo",
    description: "Recognized nationally for innovation and quality standards.",
    highlight: "Innovation & Quality Excellence",
    category: "National Expo",
    year: "India",
    image: plastivision,
    imageBoxClass: "h-64 md:h-72 w-full",
  },
  {
    id: 4,
    title: "Recycling Industry Expo",
    description: "Presented sustainable recycling solutions.",
    highlight: "Green Manufacturing Focus",
    category: "Sustainability",
    year: "International",
    image: recycling,
    imageBoxClass: "h-80 w-full", // 👈 BIG IMAGE
  },
  {
    id: 5,
    title: "Manufacturing Excellence",
    description: "20+ years of trusted manufacturing excellence.",
    highlight: "Legacy of Industrial Trust",
    category: "Legacy",
    year: "Since 2003",
    image: manufacturing,
    imageBoxClass: "h-96 w-full",
  },
];
