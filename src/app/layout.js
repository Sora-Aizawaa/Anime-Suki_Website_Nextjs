import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./component/Header/IndexHeader.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Anime Suki",
  icons: {
    icon: "/sharingan.svg", // favicon yang ditampilkan di tab browser
  },
  description: "The Anime List Suki",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}
