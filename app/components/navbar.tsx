"use client";

import { useState, useEffect } from "react";
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
  {
    href: "",
    label: { en: "ABOUT", kn: "ದೇವಾಲಯದ ಮಾಹಿತಿ" },
    subLinks: [
      { href: "/temple", label: { en: "About Temple", kn: "ದೇವಾಲಯ" } },
      { href: "/administration", label: { en: "Administration", kn: "ಸೇವಾ ಸಮಿತಿ" } },
      { href: "/facilities", label: { en: "Temple Facilities", kn: "ಸೌಲಭ್ಯಗಳು" } },
      { href: "/reach", label: { en: "How to Reach", kn: "ದೇವಾಲಯಕ್ಕೆ ಹೋಗುವ ದಾರಿಯ ಮಾಹಿತಿ" } },
      { href: "/nearby", label: { en: "Nearby Places", kn: "ಹತ್ತಿರದ ಸ್ಥಳಗಳು" } },
    ],
  },
  { href: "/booking", label: { en: "HALL BOOKING", kn: "ಸಭಾಂಗಣ ಬುಕ್ಕಿಂಗ್" } },
  { href: "/newsupdates", label: { en: "FEATURED NEWS", kn: "ಪ್ರಮುಖ ಸುದ್ದಿ" } },
  { href: "/donations", label: { en: "DONATION", kn: "ದೇಣಿಗೆ" } },
  { href: "/gallery", label: { en: "GALLERY", kn: "ಗ್ಯಾಲರಿ" } },
  { href: "/contact", label: { en: "CONTACT US", kn: "ಸಂಪರ್ಕಿಸಿ" } },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after the component has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Access current locale from Redux state
  const currentLocale = useSelector((state: RootState) => state.locale.locale);

  // Handle undefined or fallback state
  if (!mounted) {
    return null; // Avoid rendering until the component has mounted
  }

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleAboutDropdown = () => setAboutDropdownOpen((prev) => !prev);
  const closeMenu = () => {
    setMenuOpen(false);
    setAboutDropdownOpen(false);
  };

  return (
    <>
      <Banner />
      <div className="sticky top-0 w-full z-10 bg-gradient-to-r from-[#EED97E] to-[#D9A857] via-[#ECC76A] shadow-lg mt-8">
        <div className="flex justify-between items-center mx-auto py-4 px-4 md:px-8">
          <div className="flex items-center space-x-2 h-full">
            <h1 className="text-lg font-bold text-[#8B0000]">Shri Rama Temple</h1>
            <div className="w-[3px] bg-[#DD860B] h-10"></div>
          </div>
          <nav className="hidden md:flex justify-center flex-1 space-x-12 text-m">
            {navLinks.map(({ href, label, subLinks }) => (
              <div key={label.en} className="relative group">
                <Link
                  href={href}
                  onClick={subLinks ? toggleAboutDropdown : closeMenu}
                  className="text-[#8B0000] font-medium flex-grow text-center hover:bg-white hover:rounded-md hover:px-2 transition-all duration-200 flex items-center"
                >
                  {label[currentLocale as "en" | "kn"]}
                  {subLinks && (
                    <FaChevronDown
                      className={`ml-2 transition-transform duration-200 ${
                        aboutDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </Link>
                {subLinks && aboutDropdownOpen && (
                  <div className="absolute bg-white shadow-md rounded-md mt-2 group-hover:block">
                    {subLinks.map((subLink) => (
                      <Link
                        key={subLink.label.en}
                        href={subLink.href}
                        onClick={closeMenu}
                        className="block px-4 py-2 text-[#8B0000] hover:bg-[#F6E27F] hover:rounded-md transition-all duration-200"
                      >
                        {subLink.label[currentLocale as "en" | "kn"]}
                      </Link>
                    ))}
                  </div>
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
          {navLinks.map(({ href, label, subLinks }) => (
            <div key={label.en} className="relative ">
              <Link
                href={href}
                onClick={subLinks ? toggleAboutDropdown : closeMenu}
                className="text-[#8B0000] font-medium hover:bg-white hover:rounded-md hover:px-2 transition-all duration-200 flex items-center justify-between"
              >
                {label[currentLocale as "en" | "kn"]}
                {subLinks && (
                  <FaChevronDown
                    className={`ml-2 transition-transform duration-200 ${
                      aboutDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                )}
              </Link>
              {subLinks && aboutDropdownOpen && (
                <div className="ml-4 flex flex-col space-y-2">
                  {subLinks.map((subLink) => (
                    <Link
                      key={subLink.label.en}
                      href={subLink.href}
                      onClick={closeMenu}
                      className="text-[#8B0000] font-medium hover:bg-[#F6E27F] hover:rounded-md hover:px-2 transition-all duration-200"
                    >
                      {subLink.label[currentLocale as "en" | "kn"]}
                    </Link>
                  ))}
                </div>
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
