import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import localFont from 'next/font/local'
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";


const headingFont = localFont({
  src: "../../public/fonts/font.woff2"
})

const textFonts = Poppins({
  subsets:["latin"],
  weight:[
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ]
})


const MarketingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={cn("flex flex-col items-center justify-center", headingFont.className)}>
        <div className="flex mb-4 rounded-full text-center bg-amber-100 text-amber-700 p-4 border shadow-sm uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 Task Management
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-6xl text-center text-neutral-800 mb-6 transition-all duration-75">
          Taskify helps team move
        </h1>
        <div className="text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-md px-4 p-2 pb-4 text-white transition-all duration-75">
          work forward.
        </div>
      </div>
      <div className={cn("text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-xl text-center mx-auto transition-all duration-75", textFonts.className)}>
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique
        accomplish it all with Taskify.
      </div>
      <Button className="mt-6" size='lg' asChild>
        <Link href='/sign-up'>
            Get Taskify for free
        </Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
