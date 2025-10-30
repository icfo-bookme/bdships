
import Faq from "@/components/Faq/Faq";
import Banner from "@/components/Home/Banner";
import ShipsSearch from "@/components/SearchBar/Ship/ShipsSearch";
const TangourMain = nextDynamic(() => import("../components/Home/Tangour/Main"), { ssr: true });
const Sundarban = nextDynamic(() => import("../components/Home/sundarban/Main"), { ssr: true });
const SaintMartin = nextDynamic(() => import("../components/Home/Saintmartin/Main"), { ssr: true });
import nextDynamic from "next/dynamic";

export const metadata = {
  title: "BDShips - Book Ship Tickets to Saint Martin, Sundarbans & Tanguar Haor",
  description:
    "Buy ship tickets online for tours to Saint Martin, Sundarbans, and Tanguar Haor with BDShips. Enjoy safe, comfortable, and reliable travel on Bangladesh’s top cruise and tour ships.",
  keywords: [
    "BDShips",
    "Saint Martin ship tickets",
    "Sundarban tour ship",
    "Tanguar Haor tour",
    "Bangladesh cruise booking",
    "ship tickets online Bangladesh",
    "Saint Martin cruise",
    "Sundarban launch booking",
    "Tanguar Haor eco tour",
    "Bangladesh tour ships",
  ],
  alternates: {
    canonical: "https://bdships.com.bd",
  },
};

export default function Home() {
  return (
    <div className="bg-blue-50">
      <section className="relative w-full min-h-[40vh] md:min-h-[60vh]">
        {/* Banner Background */}
        <div className="absolute inset-0 z-0">
          <Banner />
        </div>

        {/* Search Widget */}
        <div className="absolute top-28 md:top-28 inset-0 z-10 flex items-center justify-center px-4">
          <div className="w-full max-w-5xl mx-auto p-10 bg-white rounded-lg border border-gray-300 ">
            <ShipsSearch />
          </div>
        </div>
      </section>
      <section className="my-5">
        <TangourMain />
      </section>
      <section className="my-10">
        <Sundarban />
      </section>
      <section className="my-10">
        <SaintMartin />
      </section>
      <section className="my-10">
        <Faq />
      </section>
    </div>
  );
}