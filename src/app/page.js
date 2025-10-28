import Banner from "@/Components/Home/Banner/Banner";
import SearchBar from "@/Components/Home/Searchbar/Search";


export default function Home() {
  return (
    <div>
       <section className="relative w-full min-h-[60vh]">
          {/* Background Banner */}
          <div className="absolute inset-0 z-0">
            <Banner />
          </div>

          {/* Search Tabs Overlay */}
          <div className="absolute top-40 left-0 right-0 z-10 flex justify-center px-4">
            <div className="w-full max-w-5xl mx-auto p-10 ">
              <SearchBar />
            </div>
          </div>
        </section>
    </div>
  );
}
