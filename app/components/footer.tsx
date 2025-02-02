"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// Define types for locales
type LocaleType = "en" | "kn";

// Define text content for each language
const footerText: Record<
  LocaleType,
  {
    templeName: string;
    quickLinks: { title: string; links: { name: string; path: string }[] };
    addressTitle: string;
    address: string[];
    contactNumbers: string;
    email: string;
    privacyPolicy: string;
    refundPolicy: string;
    admin: string;
    rightsReserved: string;
    designedBy: string;
    designerName: string;
  }
> = {
  en: {
    templeName: "Shrirama Temple",
    quickLinks: {
      title: "QUICK LINKS",
      links: [
        { name: "HOME", path: "/" },
        { name: "ABOUT", path: "/administration" },
        { name: "HALL BOOKING", path: "/booking" },
        { name: "NEWS", path: "/newsupdates" },
        { name: "GALLERY", path: "/gallery" },
      ],
    },
    addressTitle: "Address",
    address: [
      "Shrirama Temple Chokkadi,",
      "Amarapadnur village,",
      "Sullia Taluk, Dakshina Kannada",
      "PIN - 574212",
    ],
    contactNumbers: "08257200585",
    email: "srtchokkadi@gmail.com",
    privacyPolicy: "Privacy Policy",
    refundPolicy: " Refund & Cancellation",
    admin: " Admin",
    rightsReserved: " Shrirama Temple, Chokkadi. All Rights Reserved",
    designedBy: "Designed by:",
    designerName: "ISDC",
  },
  kn: {
    templeName: "ಶ್ರೀ ರಾಮ ದೇವಾಲಯ",
    quickLinks: {
      title: "ಲಿಂಕ್ಸ್",
      links: [
        { name: "ಮುಖಪುಟ", path: "/" },
        { name: "ದೇವಾಲಯದ ಬಗ್ಗೆ", path: "/administration" },
        { name: "ಸಭಾಂಗಣ ಬುಕಿಂಗ್", path: "/booking" },
        { name: "ಸುದ್ದಿಗಳು", path: "/newsupdates" },
        { name: "ಗ್ಯಾಲರಿ", path: "/gallery" },
      ],
    },
    addressTitle: "ವಿಳಾಸ",
    address: [
      "ಶ್ರೀ ರಾಮ ದೇವಾಲಯ, ಚೊಕ್ಕಾಡಿ,",
      "ಅಮರಪಡ್ನೂರು ಗ್ರಾಮ,",
      "ಸುಳ್ಯ ತಾಲೂಕು, ದ.ಕ.",
      "ಪಿನ್ - 574212",
    ],
    contactNumbers: "08257200585",
    email: "srtchokkadi@gmail.com",
    privacyPolicy: "ಗೌಪ್ಯತಾ ನೀತಿ",
    refundPolicy: " ಮರುಪಾವತಿ ಮತ್ತು ರದ್ದುಪಡಿಸುವಿಕೆ",
    admin: " ಅಡ್ಮಿನ್",
    rightsReserved: "ಶ್ರೀ ರಾಮ ದೇವಾಲಯ, ಚೊಕ್ಕಾಡಿ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ",
    designedBy: "ಹೋಸ್ಟಿಂಗ್ ಮತ್ತು ನಿರ್ವಹಣೆ:",
    designerName: "ಐಎಸ್‌ಡಿಸಿ",
  },
};

const Footer: React.FC = () => {
  const currentLocale: LocaleType = useSelector(
    (state: RootState) => state.locale.locale
  ) as LocaleType;
  const text = footerText[currentLocale];

  return (
    <div className="flex flex-col ">
      <footer className="bg-gradient-to-l from-[#CB7224] to-[#E5CF63] text-white py-10 px-10 md:px-10 lg:px-10 flex-grow">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between lg:items-center">
          {/* Logo and Title Section */}
          <div className="flex flex-col items-center lg:items-center mb-8 lg:mb-0">
            <div className="text-left lg:text-left mb-4">
              <h3 className="text-lg font-bold mb-3 mt-0 flex items-center space-x-2">
                <p className="text-xl font-bold text-[#710100]">
                  {text.templeName}
                </p>
              </h3>
              <address>
                {text.address.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
                <div className="flex items-center space-x-2">
                  <svg
                    width="15px"
                    height="15px"
                    className="mt-1.5"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="white"
                      d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
                    ></path>
                  </svg>
                  {/* Clickable Phone Number */}
                  <a href={`tel:${text.contactNumbers}`} className="hover:underline">
                    {text.contactNumbers}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    width="15px"
                    height="15px"
                    className="mt-1.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 5-8-5V6l8 5 8-5v2zM4 18v-8l8 5 8-5v8H4z" />
                  </svg>
                  {/* Clickable Email */}
                  <a href={`mailto:${text.email}`} className="hover:underline">
                    {text.email}
                  </a>
                </div>
                {/* Facebook Link */}
                <div className="flex items-center space-x-2 mt-2">
                  <a
                    href="https://www.facebook.com/srtchokkadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-white hover:text-blue-500 transition-colors duration-200"
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      fill="currentColor"
                    >
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                    </svg>
                  </a>
                </div>
              </address>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="text-left  lg:text-center mb-5 sm:item-center ml-10  ">
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <p></p>
              <span className="font-bold">{text.quickLinks.title}</span>
            </h3>
            <ul className="space-y-1">
              {text.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="hover:underline hover:text-yellow-300 flex font-bold items-center"
                  >
                    <span className="inline-block w-4"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Section */}
          <div className="flex justify-center lg:justify-end w-full lg:w-auto">
            <iframe
              title="Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2837.5709138746074!2d75.41289837131286!3d12.62628846155243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4edcaff21607d%3A0xa945aecb849c2572!2sSri%20Rama%20Temple!5e1!3m2!1sen!2sin!4v1737099808615!5m2!1sen!2sin"
              width="400"
              height="250"
              className="rounded-md shadow-lg"
              loading="lazy"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </footer>

      <div className="bg-black text-white py-1 text-center site-footer-bottom mx-0 mb-0">
        <p>
          © 2025 | Disclaimer -{" "}
          <Link
           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            href="/policy"
            className="text-yellow-400 hover:underline"
          >
            {text.privacyPolicy}
          </Link>{" "}
          |{" "}
          <Link
           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            href="/policy"
            className="text-yellow-400 hover:underline"
          >
            {text.refundPolicy}
          </Link>{" "}
          |{" "}
          <Link
           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            href="/admin"
            className="text-yellow-400 hover:underline"
          >
            {text.admin}
          </Link>{" "}
          | {text.rightsReserved}
        </p>
        <p>
          {text.designedBy}{" "}
          <Link
            href="https://www.instagram.com/isdc.sahyadri/"
            className="text-yellow-400 hover:underline"
          >
            {text.designerName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
