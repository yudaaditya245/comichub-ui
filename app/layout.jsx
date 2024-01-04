import { twMerge } from "tailwind-merge";
import Nav from "./Nav";
import Provider from "./Provider";
import "./globals.css";

import { Signika_Negative } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

const signika_Negative = Signika_Negative({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "Comichub",
  description: "Hub for your comics need"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={twMerge(signika_Negative.className, "bg-light-300")}>
        <NextTopLoader showSpinner={false} color="#21cc61" />
        <Provider>
          <div className="flex min-h-screen flex-col">
            <div className="flex-grow pb-24">{children}</div>
            <Nav />
            <Toaster />
          </div>
        </Provider>
      </body>
    </html>
  );
}
