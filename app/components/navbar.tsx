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
  { href: "/", label: { en: "Home", kn: "ಮುಖಪುಟ" } },
  {
    href: "",
    label: { en: "About", kn: "ದೇವಸ್ಥಾನದ ಮಾಹಿತಿ" },
    subLinks: [
      { href: "/history", label: { en: "History", kn: "ಇತಿಹಾಸ" } },
      { href: "/temple", label: { en: "About Temple", kn: "ದೇವಸ್ಥಾನದ ಮಾಹಿತಿ" } },
      { href: "/administration", label: { en: "Administration", kn: "ಆಡಳಿತ ಸಮಿತಿ" } },
      { href: "/facilities", label: { en: "Temple Facilities", kn: "ದೇವಸ್ಥಾನದ ಸೌಲಭ್ಯಗಳು" } },
      { href: "/how_to_reach", label: { en: "How to Reach", kn: "ದೇವಸ್ಥಾನಕ್ಕೆ ಹೋಗುವ ದಾರಿಯ ಮಾಹಿತಿ" } },
      { href: "/nearby_places", label: { en: "Nearby Places", kn: "ಹತ್ತಿರದ ಸ್ಥಳಗಳು" } },
    ],
  },
  { href: "/sevas", label: { en: "Sevas", kn: "ಸೇವೆಗಳು" } },
  { href: "/donations", label: { en: "Donations", kn: "ದೇಣಿಗೆ" } },
  { href: "/newsupdates", label: { en: "News & Updates", kn: "ಸುದ್ದಿಗಳು" } },
  { href: "/gallery", label: { en: "Gallery", kn: "ಗ್ಯಾಲರಿ" } },
  { href: "/contact", label: { en: "Contact", kn: "ಸಂಪರ್ಕಿಸಿ" } },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentLocale = useSelector((state: RootState) => state.locale.locale);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false); // Close the dropdown as well when the menu closes
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <>
      <Banner />
      <div className="sticky top-0 w-full z-10 bg-gradient-to-r from-[#ffc62b9f] to-[#ffbc03c3] shadow-lg mt-8">
        <div className="flex justify-between items-center mx-auto py-4 px-4 md:px-8">
          <nav className="hidden md:flex justify-center flex-1 space-x-6 text-sm">
            {navLinks.map(({ href, label, subLinks }) => (
              <div key={label.en} className="relative group">
                {subLinks ? (
                  <>
                    <button
                      className="text-orange-500 font-medium hover:text-gray-600 transition-all duration-200 focus:outline-none flex items-center"
                      aria-haspopup="true"
                    >
                      {label[currentLocale as "en" | "kn"]}
                      <FaChevronDown
                        className="ml-2 transform transition-transform duration-200 group-hover:rotate-180"
                      />
                    </button>
                    <div
                      className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-6 z-20 opacity-0 group-hover:opacity-100 group-hover:scale-100 transform scale-y-0 transition-all duration-300 ease-in-out"
                    >
                      {subLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          onClick={closeMenu}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100"
                        >
                          {subLink.label[currentLocale as "en" | "kn"]}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className="text-orange-500 font-medium hover:text-gray-600 transition-all duration-200"
                  >
                    {label[currentLocale as "en" | "kn"]}
                  </Link>
                )}
              </div>
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
              <FaTimes className="text-orange-500 text-2xl" />
            ) : (
              <FaBars className="text-orange-500 text-2xl" />
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
          {navLinks.map(({ href, label, subLinks }) => (
            <div key={label.en} className="relative w-full">
              {subLinks ? (
                <>
                  <button
                    onClick={toggleDropdown}
                    className="text-orange-500 font-medium hover:text-gray-600 transition-all duration-200 focus:outline-none flex items-center justify-center w-full"
                    aria-haspopup="true"
                  >
                    {label[currentLocale as "en" | "kn"]}
                    <FaChevronDown
                      className={`ml-2 transform transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="flex flex-col items-center mt-2 space-y-2">
                      {subLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          onClick={closeMenu} // Close menu on sublink click
                          className="text-orange-500 font-medium hover:text-gray-600 transition-all duration-200"
                        >
                          {subLink.label[currentLocale as "en" | "kn"]}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={href}
                  onClick={closeMenu}
                  className="text-orange-500 font-medium hover:text-gray-600 transition-all duration-200 block"
                >
                  {label[currentLocale as "en" | "kn"]}
                </Link>
              )}
            </div>
          ))}
          <LanguageSwitcher />
        </div>
      </div>
      <div className="pt-4"></div>
    </>
  );
}
