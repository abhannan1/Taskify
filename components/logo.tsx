import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import localFont from "next/font/local";


const headingFont = localFont({
    src: ".././public/fonts/font.woff2"
  })
  
const Logo = () => {
  return (
    <Link href='/'>
      <div className="hover:opacity-70 transition items-center gap-x-2 hidden md:flex">
        <Image 
        src="/logo.png" 
        alt="Logo" 
        width={45}
        height={40}
        priority 
         />
        <p className={cn("text-xl text-neutral-700 mt-2", headingFont.className)}>Taskify</p>
      </div>
    </Link>
  );
};

export default Logo;
