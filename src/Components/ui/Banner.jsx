'use client';

import React from 'react';
import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';
import { IoLogoWhatsapp } from "react-icons/io";
// Import the Playfair font
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const Banner = () => {
  

  return (
    <div className={`relative w-full h-[60vh] overflow-hidden shadow-2xl`}>
      {/* Background Image */}
      <Image
        src="/background.jpg"
        alt={ "Banner Image"}
        fill
        className="object-cover"
        priority
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gray-950 opacity-60 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-blue-500/20 to-transparent z-10"></div>

    

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
    </div>
  );
};

export default Banner;
