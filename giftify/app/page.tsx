"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const roses = {
  red: "https://images.pexels.com/photos/1003914/pexels-photo-1003914.jpeg?auto=compress&cs=tinysrgb&w=800",
  pink: "https://images.pexels.com/photos/954050/pexels-photo-954050.jpeg?auto=compress&cs=tinysrgb&w=800",
  yellow: "https://images.pexels.com/photos/209004/pexels-photo-209004.jpeg?auto=compress&cs=tinysrgb&w=800",
  white: "https://images.pexels.com/photos/36420/rose-plant-tender-nature.jpg?auto=compress&cs=tinysrgb&w=800",
};

export default function VirtualRoseGifting() {
  const [selectedRose, setSelectedRose] = useState("red");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const roseImage = roses[selectedRose];

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const shareOnWhatsApp = () => {
    const message = `I am sending you a beautiful ${selectedRose} rose 🌹!`;
    const imageUrl = roseImage;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}%20${encodeURIComponent(imageUrl)}`, "_blank");
  };

  const shareViaEmail = () => {
    const subject = "A Special Rose for You!";
    const body = `I am sending you a beautiful ${selectedRose} rose 🌹!%0D%0A%0D%0AView it here: ${roseImage}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-6 text-center relative">
      <Confetti width={windowSize.width} height={windowSize.height} />
      <motion.h1 
        className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🌹 Send a Virtual Rose! 🌹
      </motion.h1>
      
      <Select onValueChange={setSelectedRose}>
        <SelectTrigger className="w-72 bg-white text-gray-800 shadow-lg border-2 border-white rounded-lg">
          <SelectValue placeholder="Select a Rose Color" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg rounded-lg">
          {Object.keys(roses).map((color) => (
            <SelectItem key={color} value={color} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
              {color.charAt(0).toUpperCase() + color.slice(1)} Rose
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <motion.div 
        className="mt-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 shadow-2xl bg-white rounded-xl transform hover:scale-105 transition-transform duration-300">
          <CardContent className="flex flex-col items-center">
            <Image src={roseImage} alt={`${selectedRose} rose`} width={400} height={400} className="rounded-lg shadow-lg" />
            <p className="text-2xl font-semibold text-gray-800 mt-4">{selectedRose.charAt(0).toUpperCase() + selectedRose.slice(1)} Rose</p>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="mt-8 flex gap-6">
        <Button className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full shadow-lg" onClick={shareOnWhatsApp}>
          📲 Share on WhatsApp
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-full shadow-lg" onClick={shareViaEmail}>
          📩 Share via Email
        </Button>
      </div>
      
      <footer className="absolute bottom-4 text-white text-lg flex items-center gap-2">
        Made with ❤️ by <a href="https://www.instagram.com/iamrealsubh/" target="_blank" rel="noopener noreferrer" className="font-bold flex items-center gap-1 hover:underline">
          Sumit Saurabh <Instagram className="w-5 h-5" />
        </a>
      </footer>
    </div>
  );
}