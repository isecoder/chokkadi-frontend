"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Banner from "@/app/components/banner";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

interface NavLink {
  href: string;
  label: Record<"en" | "kn", string>;
  subLinks?: NavLink[];
}

const navLinks: NavLink[] = [
  { href: "/", label: { en: "HOME", kn: "ಮುಖಪುಟ" } },
  { href: "/history", label: { en: "ABOUT", kn: "ದೇವಸ್ಥಾನದ ಮಾಹಿತಿ" } },
  { href: "/booking", label: { en: "HALL BOOKING", kn: "ಸಭಾಂಗಣ ಬುಕ್ಕಿಂಗ್" } },
  { href: "/newsupdates", label: { en: "FEATURED NEWS", kn: "ಪ್ರಮುಖ ಸುದ್ದಿ" } },
  { href: "/donations", label: { en: "DONATION", kn: "ದೇಣಿಗೆ" } },
  { href: "/gallery", label: { en: "GALLERY", kn: "ಗ್ಯಾಲರಿ" } },
  { href: "/contact", label: { en: "CONTACT US", kn: "ಸಂಪರ್ಕಿಸಿ" } },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentLocale = useSelector((state: RootState) => state.locale.locale);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Banner />
        <div className="sticky top-0 w-full z-10 bg-gradient-to-r from-[#E5CF63] to-[#CB7224] via-[#e5a863] shadow-lg mt-8">
          <div className="flex justify-between items-center mx-auto py-4 px-4 md:px-8">
            <div className="flex items-center space-x-2 h-full">
              <h1 className="text-lg font-bold text-[#8B0000]">Shri Rama Temple</h1>
              <div className="w-[3px]  bg-[#DD860B] h-10"></div>
            </div>
          <nav className="hidden md:flex justify-center flex-1 space-x-6 text-m">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label.en}
                href={href}
                onClick={closeMenu}
                className="text-[#8B0000] font-medium flex-grow text-center hover:bg-white hover:rounded-md hover:px-2 hover:py-1 transition-all duration-200"
              >
                {label[currentLocale as "en" | "kn"]}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center">
            <LanguageSwitcher />
          </div>
          <div
            className="md:hidden cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FaTimes className="text-[#8B0000] text-2xl" />
            ) : (
              <FaBars className="text-[#8B0000] text-2xl" />
            )}
          </div>
        </div>

        <div
          className={`md:hidden flex flex-col items-center space-y-4 bg-gradient-to-r from-white to-orange-200 text-center shadow-md transition-all duration-300 ease-in-out transform origin-top ${
            menuOpen
              ? "opacity-100 scale-y-100"
              : "opacity-0 scale-y-0 h-0 overflow-hidden"
          }`}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={label.en}
              href={href}
              onClick={closeMenu}
              className="text-[#8B0000] font-medium hover:bg-white hover:rounded-md hover:px-2 hover:py-1 transition-all duration-200"
            >
              {label[currentLocale as "en" | "kn"]}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>
      </div>
      <div className="pt-4"></div>
    </>
  );
}
