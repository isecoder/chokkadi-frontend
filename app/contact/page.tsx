"use client";
import React, { useEffect, useState } from "react";
import SEOComponent from "../cmpnents/SEOComponent";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { changeLocale } from "../store/localeSlice";

// Define types for locales
type LocaleType = "en" | "kn";

// Define text content for each language
const contactText: Record<
  LocaleType,
  {
    postalAddress: string;
    contactDetails: string;
    googleMap: string;
    address: string;
    contactNumber: string;
    priest: string;
    president: string;
    tele: string;
    email: string;
  }
> = {
  en: {
    postalAddress: "Postal Address",
    contactDetails: "Contact Details",
    googleMap: "Google Map",
    address: "Shrirama Temple, Chokkadi,\n Amarapadnur Village,\nSullia Taluk, Dakshina Kannada,\nPIN-574212",
    contactNumber: "Contact Number:",
    priest: "Priest: +919741251613",
    president: "President: +919448625254,+917019616082",
    tele: "Temple Office: 08257200585",
    email: "E-mail: srtchokkadi@gmail.com",
  },
  kn: {
    postalAddress: "ದೇವಾಲಯದ ವಿಳಾಸ",
    contactDetails: "ಸಂಪರ್ಕ ಮಾಹಿತಿ",
    googleMap: "ಗೂಗಲ್ ಮ್ಯಾಪ್ ನಕ್ಷೆ",
    address: "ಶ್ರೀರಾಮ ದೇವಾಲಯ, ಚೊಕ್ಕಾಡಿ,\n ಅಮರಪಡ್ನೂರು ಗ್ರಾಮ,\nಸುಳ್ಯ ತಾಲೂಕು, ದ.ಕ.,\nಪಿನ್-574212",
    contactNumber: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ:",
    priest: "ಪ್ರಧಾನ ಅರ್ಚಕರು: +919741251613",
    president: "ಅಧ್ಯಕ್ಷರು: +919448625254,+917019616082",
    tele: "ದೇವಾಲಯದ ಕಚೇರಿ: 08257200585",
    email: "ಇ-ಮೇಲ್: srtchokkadi@gmail.com",
  },
};

const Contact: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLocale: LocaleType = useSelector((state: RootState) => state.locale.locale) as LocaleType;
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(false);

  const text = contactText[currentLocale];

  useEffect(() => {
    const savedLocale = (localStorage.getItem("locale") || "en") as LocaleType;
    dispatch(changeLocale(savedLocale));
    setIsLocaleLoaded(true);
  }, [dispatch]);

  if (!isLocaleLoaded) return null; // Prevent rendering until locale is loaded

  return (
    <>
      <SEOComponent
        title="Contact Shrirama Temple, Chokkadi"
        description="Get in touch with the Shrirama Temple in Chokkadi for inquiries, visits, or support. We welcome your communication and support."
        image="https://yourwebsite.com/images/temple-contact.jpg" // Replace with actual image URL
        url="http://www.srtchokkadi.org/contact"
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFEB9B] to-[#FFEB9B] p-10 relative font-serif">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl gap-10">
          {/* Address and Contact Details */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-green-600 font-semibold text-lg uppercase mb-4 tracking-wide">{text.postalAddress}</h2>
            <p className="text-green-600 mb-8">
              {text.address.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>

            <h2 className="text-green-600 font-semibold text-lg uppercase mb-4 tracking-wide">{text.contactDetails}</h2>
            <p className="text-green-600">
              <strong>{text.contactNumber}</strong>
            </p>
            <p className="text-green-600">
              <strong>{text.tele}</strong>
            </p>
            <p>
              <strong className="text-green-600">{text.president}</strong>
            </p>
            <p className="text-green-600">
              <strong>{text.priest}</strong>
            </p>
            <p>
              <strong className="text-green-600">{text.email}</strong>
            </p>
          </div>

          {/* Google Map */}
          <div className="flex-1">
            <h2 className="text-green-600 font-semibold text-lg uppercase mb-4 tracking-wide">{text.googleMap}</h2>
            <div className="border border-gray-300 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2837.5709138746074!2d75.41289837131286!3d12.62628846155243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4edcaff21607d%3A0xa945aecb849c2572!2sSri%20Rama%20Temple!5e1!3m2!1sen!2sin!4v1737099808615!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom orange bar */}
        <div className="absolute bottom-0 w-full h-1 bg-[#f28500]"></div>
      </div>
    </>
  );
};

export default Contact;
