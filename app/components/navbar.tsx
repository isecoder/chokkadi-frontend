"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Banner from "@/app/components/banner";
import KBanner from "@/app/components/kbanner";
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
      { href: "/temple", label: { en: "Temple Timings", kn: "ದೇವಾಲಯದ ಸಮಯ" } },
      {
        href: "/administration",
        label: { en: "Administration", kn: "ಸೇವಾ ಸಮಿತಿ" },
      },
      {
        href: "/facilities",
        label: { en: "Temple Facilities", kn: "ಸೌಲಭ್ಯಗಳು" },
      },
      {
        href: "/reach",
        label: { en: "How to Reach", kn: "ದೇವಾಲಯಕ್ಕೆ ಹೋಗುವ ದಾರಿಯ ಮಾಹಿತಿ" },
      },
      {
        href: "/nearby",
        label: { en: "Nearby Places", kn: "ಹತ್ತಿರದ ಸ್ಥಳಗಳು" },
      },
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
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [dropdownTimer, setDropdownTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [mounted, setMounted] = useState(false);

  // Access the current locale from Redux
  const currentLocale = useSelector((state: RootState) => state.locale.locale);

  // Set mounted to true after the component has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle undefined or fallback state
  if (!mounted) {
    return null; // Avoid rendering until the component has mounted
  }

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimer) clearTimeout(dropdownTimer);
    setDropdownOpen(label);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => setDropdownOpen(null), 300);
    setDropdownTimer(timer);
  };

  const handleMobileDropdownToggle = (label: string) => {
    setDropdownOpen((prev) => (prev === label ? null : label));
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(null);
    if (dropdownTimer) clearTimeout(dropdownTimer);
  };

  return (
    <>
      {currentLocale === "en" ? <Banner /> : <KBanner />}
      <div className="sticky top-0 w-full z-10 bg-gradient-to-r from-[#EED97E] to-[#D9A857] via-[#ECC76A] shadow-lg">
        <div className="flex justify-between items-center mx-auto py-4 px-4 md:px-8">
          {/* Name Bar */}
          <div className="flex items-center flex-shrink-0 space-x-2">
            <Link
              href="/"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-lg font-bold text-[#8B0000] hover:underline"
            >
              {currentLocale === "en" ? "Shrirama Temple" : "ಶ್ರೀರಾಮ ದೇವಾಲಯ"}
            </Link>
            <div className="w-[3px] bg-[#DD860B] h-10"></div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex flex-1 justify-center gap-x-[2.5vw] text-m">
            {navLinks.map(({ href, label, subLinks }) => (
              <div
                key={label.en}
                className="relative group"
                onMouseEnter={() => subLinks && handleMouseEnter(label.en)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={href || ""}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-[#8B0000] font-lg flex items-center space-x-1 hover:bg-white hover:rounded-md hover:px-2 transition-all duration-200"
                >
                  {label[currentLocale as "en" | "kn"]}
                  {subLinks && (
                    <FaChevronDown
                      className={` transition-transform duration-200 ${
                        dropdownOpen === label.en ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </Link>
                {subLinks && dropdownOpen === label.en && (
                  <div className="absolute left-0 bg-white shadow-md rounded-md mt-2">
                    {subLinks.map((subLink) => (
                      <Link
                        key={subLink.label.en}
                        href={subLink.href}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          closeMenu();
                        }}
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

          {/* Language Switcher */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Toggle */}
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

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="flex flex-col items-center space-y-4 bg-gradient-to-r from-white to-orange-200 text-center shadow-md">
            {navLinks.map(({ href, label, subLinks }) => (
              <div key={label.en} className="w-full relative">
                <Link
                  href={href || ""}
                  onClick={(e) => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    if (!subLinks) {
                      closeMenu();
                    } else {
                      e.preventDefault();
                      handleMobileDropdownToggle(label.en);
                    }
                  }}
                  className="text-[#8B0000] font-medium block px-4 py-2 hover:bg-[#F6E27F] hover:rounded-md transition-all duration-200 flex justify-between"
                >
                  {label[currentLocale as "en" | "kn"]}
                  {subLinks && (
                    <FaChevronDown
                      className={`ml-2 transition-transform duration-200 ${
                        dropdownOpen === label.en ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </Link>
                {subLinks && dropdownOpen === label.en && (
                  <div className="pl-8 flex flex-col bg-[#FFF9E6]">
                    {subLinks.map((subLink) => (
                      <Link
                        key={subLink.label.en}
                        href={subLink.href}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          closeMenu();
                        }}
                        className="text-[#8B0000] font-medium block px-4 py-2 hover:bg-[#F6E27F] transition-all duration-200"
                      >
                        {subLink.label[currentLocale as "en" | "kn"]}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Mobile Language Switcher */}
            <LanguageSwitcher />
          </div>
        )}
      </div>
    </>
  );
}
