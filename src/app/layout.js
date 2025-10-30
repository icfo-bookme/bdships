import Footer from "../components/shared/Footer/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { SearchProvider } from "@/context/SearchContext";
import { PaginationProvider } from "@/context/usePagination";
import BookMeHeader from "@/components/shared/BookMeHeader/BookmeHeader";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});




export default function DashboardLayout({ children }) {
  return (
    <html lang="en" data-theme="white">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <PaginationProvider>
          <SearchProvider>
              <div className="bg-white">
                <BookMeHeader />
                <main className="min-h-[100vh] py-[12px]">
                  {children}
                </main>
                <Footer />
              </div>
          </SearchProvider>
        </PaginationProvider>
      </body>
    </html>
  );
}