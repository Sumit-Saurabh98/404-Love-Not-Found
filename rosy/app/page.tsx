"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Link from "next/link";

export default function Home() {
  const [mood, setMood] = useState("");
  const [relationship, setRelationship] = useState("girlfriend");
  const [partner, setPartner] = useState("");
  const [language, setLanguage] = useState("english");
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);
  const [roseImage, setRoseImage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const { width, height } = useWindowSize();

  const roseImages = [
    "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/209004/pexels-photo-209004.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/237382/pexels-photo-237382.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  const generateProposal = async () => {
    if (!mood || !partner) {
      return alert("Please fill in all the fields!");
    }
    setLoading(true);

    try {
      const { data } = await axios.post("/api/generate-proposal", {
        mood,
        relationship,
        partner,
        language,
      });
      setProposal(data.proposal);
      setRoseImage(roseImages[Math.floor(Math.random() * roseImages.length)]);
      setShowConfetti(true);

      setTimeout(() => setShowConfetti(false), 4000);
    } catch (error) {
      alert("Error generating proposal!" + error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-red-500 p-5 text-white relative">
      {showConfetti && <Confetti width={width} height={height} />}

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold tracking-wide text-center"
      >
        💌 Rosy Proposal Generator 🌹
      </motion.h1>

      {/* Input Fields */}
      <div className="mt-6 flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Your Partner's Name"
          className="p-3 text-black rounded-lg shadow-md border-2 border-pink-200 w-full text-center"
          value={partner}
          onChange={(e) => setPartner(e.target.value)}
        />

        <input
          type="text"
          placeholder="Mood (romantic, happy, poetic, etc...)"
          className="p-3 text-black rounded-lg shadow-md border-2 border-pink-200 w-full text-center"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />

        {/* Relationship Selector */}
        <select
          className="p-3 text-black rounded-lg shadow-md border-2 border-pink-200 w-full text-center"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
        >
          <option value="boyfriend">Boyfriend</option>
          <option value="girlfriend">Girlfriend</option>
          <option value="husband">Husband</option>
          <option value="wife">Wife</option>
        </select>

        {/* Language Selector */}
        <select
          className="p-3 text-black rounded-lg shadow-md border-2 border-pink-200 w-full text-center"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="telugu">Telugu</option>
          <option value="tamil">Tamil</option>
        </select>
      </div>

      {/* Generate Proposal Button */}
      <motion.button
        onClick={generateProposal}
        disabled={loading}
        whileTap={{ scale: 0.9 }}
        className="mt-6 bg-white text-red-500 px-6 py-2 rounded-full font-bold shadow-md transition-all hover:bg-red-500 hover:text-white"
      >
        {loading ? "✨ Generating..." : "💖 Generate a Proposal"}
      </motion.button>

      {/* Display Proposal with Rose Background */}
      {proposal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 relative w-full max-w-lg rounded-lg overflow-hidden shadow-lg"
        >
          {/* Rose Image as Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url(${roseImage})` }}
          ></div>

          {/* Proposal Text with Semi-Transparent Overlay */}
          <div className="relative bg-black/60 p-6 rounded-lg text-white text-center">
            <h2 className="text-xl font-semibold mb-2">
              Your Lovely Proposal 💕
            </h2>
            <p className="text-lg whitespace-pre-line">{proposal}</p>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-5 text-sm text-white opacity-70"
      >
        🌸 Made with Love By{" "}
        <Link
          href="https://www.instagram.com/iamrealsubh/"
          className=" font-bold text-lg underline hover:cursor-pointer"
        >
          Sumit Saurabh
        </Link>
      </motion.div>
    </div>
  );
}
