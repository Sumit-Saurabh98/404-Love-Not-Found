"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Heart, Share2, Send } from "lucide-react";
import Image from "next/image";

interface RoseImages {
  [key: string]: string;
}

const roses: RoseImages = {
  red: "https://images.pexels.com/photos/1003914/pexels-photo-1003914.jpeg?auto=compress&cs=tinysrgb&w=800",
  pink: "https://images.pexels.com/photos/954050/pexels-photo-954050.jpeg?auto=compress&cs=tinysrgb&w=800",
  yellow: "https://images.pexels.com/photos/209004/pexels-photo-209004.jpeg?auto=compress&cs=tinysrgb&w=800",
  white: "https://images.pexels.com/photos/36420/rose-plant-tender-nature.jpg?auto=compress&cs=tinysrgb&w=800",
};

const roseEmojis: { [key: string]: string } = {
  red: "❤️", pink: "💗", yellow: "💛", white: "🤍"
};

export default function Home() {
  const [selectedRose, setSelectedRose] = useState<string>("red");
  const [isHovered, setIsHovered] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const FloatingHearts = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <Heart
          key={i}
          className="absolute text-rose-400 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            opacity: 0.6,
            transform: `scale(${0.5 + Math.random()})`,
          }}
        />
      ))}
    </div>
  );

  const shareOnWhatsApp = () => {
    const message = `${roseEmojis[selectedRose]} Sending you a beautiful ${selectedRose} rose with love! ${roseEmojis[selectedRose]}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareViaEmail = () => {
    const subject = `${roseEmojis[selectedRose]} A Special Rose for You! ${roseEmojis[selectedRose]}`;
    const body = `Sending you a beautiful ${selectedRose} rose with love! ${roseEmojis[selectedRose]}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-4">
      {showHearts && <FloatingHearts />}
      
      <div className="h-full flex flex-col justify-center items-center">
        <div className="text-center mt-40">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 animate-pulse">
            {roseEmojis[selectedRose]} Virtual Rose Garden {roseEmojis[selectedRose]}
          </h1>
          <p className="text-base md:text-lg text-white/80">Send a magical rose to someone special</p>
        </div>

        <div className="w-full flex flex-col justify-center items-center space-y-4 flex-1">
          <div className="w-full max-w-md z-10">
            <Select onValueChange={(value) => {
              setSelectedRose(value);
              setShowHearts(true);
              setTimeout(() => setShowHearts(false), 3000);
            }}>
              <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm text-lg font-medium rounded-2xl border-2 border-white/20 shadow-xl">
                <SelectValue placeholder="Choose your rose" />
              </SelectTrigger>
              <SelectContent position="item-aligned" className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-white/20">
                {Object.keys(roses).map((color) => (
                  <SelectItem 
                    key={color} 
                    value={color}
                    className="text-lg py-3 px-4 hover:bg-gradient-to-r hover:from-pink-100 hover:to-rose-100 cursor-pointer"
                  >
                    {roseEmojis[color]} {color.charAt(0).toUpperCase() + color.slice(1)} Rose
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card className={`w-full max-w-xl relative overflow-hidden rounded-3xl transform transition-all duration-500 ${
            isHovered ? 'scale-105' : ''
          }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 z-10 rounded-3xl" />
            <CardContent className="p-4">
              <div className="relative w-full h-72 md:h-80 rounded-2xl overflow-hidden">
                <Image
                  fill
                  src={roses[selectedRose]}
                  alt={`${selectedRose} rose`}
                  className="object-cover transform transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-2xl font-bold text-white text-center">
                    {roseEmojis[selectedRose]} {selectedRose.charAt(0).toUpperCase() + selectedRose.slice(1)} Rose
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="w-full max-w-xl space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg transform transition-all hover:scale-105 flex items-center justify-center gap-2"
              onClick={shareOnWhatsApp}
            >
              <Share2 className="w-5 h-5" />
              Share on WhatsApp
            </Button>
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-400 to-indigo-600 hover:from-blue-500 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transform transition-all hover:scale-105 flex items-center justify-center gap-2"
              onClick={shareViaEmail}
            >
              <Send className="w-5 h-5" />
              Share via Email
            </Button>
          </div>

          <footer className="absolute bottom-5 w-full text-center text-white/80 border-t border-white/20 pt-3 mt-auto">
            <a 
              href="https://www.instagram.com/iamrealsubh/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              Made with {roseEmojis[selectedRose]} by <span className="font-bold text-xl">Sumit Saurabh</span> <Instagram className="w-4 h-4" />
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}