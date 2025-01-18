'use client'

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "./store"
import { changeLocale } from "./store/localeSlice"
import Hero from "./components/hero"
import Link from "next/link"
import Image from "next/image"
import SEOComponent from "./cmpnents/SEOComponent"

type LocaleType = "en" | "kn"

const welcomeTitle: Record<LocaleType, string> = {
  en: "WELCOME TO SHRI RAMA TEMPLE",
  kn: "ಶ್ರೀ ರಾಮ ದೇವಾಲಯಕ್ಕೆ ಸ್ವಾಗತ",
}

const welcomeContent: Record<LocaleType, string> = {
  en: "Shri Rama Temple is a sacred and revered temple nestled in the serene surroundings of Tulunadu, created by Lord Parasurama in South India. Located at the foothills of the Western Ghats in the Sullia Taluk of Dakshina Kannada district, this region is known for its lush green forests and expansive agricultural lands.",
  kn: "ಶ್ರೀ ರಾಮ ದೇವಾಲಯವು ದಕ್ಷಿಣ ಭಾರತದ ಪಶ್ಚಿಮ ಘಟ್ಟದ ಕಾಲುಭಾಗದಲ್ಲಿ ಪರಶುರಾಮ ಸೃಷ್ಟಿಯ ತುಳುನಾಡಿನಲ್ಲಿ ಇರುವ ಪುಣ್ಯ ತ್ರಿವೇಣಿ ಸಂಗಮ ಕ್ಷೇತ್ರ. ಸುಳ್ಯ ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯಲ್ಲಿ ಗ್ರಾಮೀಣ ಪ್ರದೇಶವಾಗಿದ್ದು, ಹೆಚ್ಚಿನ ಭೂಮಿಯು ಕಾಡುಗಳು ಮತ್ತು ಕೃಷಿ ಭೂಮಿಯೊಂದಿಗೆ ಆವರಿತವಾಗಿದೆ. ಅಮರಪಡ್ನೂರು ಈ ಸುಳ್ಯ ತಾಲೂಕಿನಲ್ಲಿ ಇರುವ ಒಂದು ಗ್ರಾಮವಾಗಿದೆ ",
}

export default function Component() {
  const dispatch = useDispatch<AppDispatch>()
  const currentLocale: LocaleType = useSelector((state: RootState) => state.locale.locale) as LocaleType

  const [isLocaleLoaded, setIsLocaleLoaded] = useState(false)

  useEffect(() => {
    const savedLocale = (localStorage.getItem("locale") || "en") as LocaleType
    dispatch(changeLocale(savedLocale))
    setIsLocaleLoaded(true)
  }, [dispatch])

  if (!isLocaleLoaded) return null

  return (
    <>
    <SEOComponent
    title="Shri Rama Temple - A Sacred Destination for Devotees"
    description="Explore the Shri Rama Temple, a revered spiritual destination in Karnataka, dedicated to peace, devotion, and cultural heritage."
    image="http://www.shriRama.org/logo.jpg" 
    url="http://www.shriRama.org/"
  />

    <main className="min-h-screen flex flex-col items-center p-4 sm:p-8 text-center ">
      <Hero />
      <div className="w-full max-w-6xl mt-8 sm:mt-20">
        <div className="flex flex-col md:flex-row items-center border-4 p-4 sm:p-8 md:p-16 bg-gradient-to-b from-[#E8DEB4] via-[#E59A32] to-[#E8DEB4] h-screen">
          <Image
            src="/temple4.png"
            alt="Shri Rama Temple"
            className="w-full md:w-1/3 h-auto rounded-md mb-4 md:mb-0 md:mr-8"
            width={240}
            height={160}
          />
          <div className="flex-1">
            <h2 className="font-bold text-lg sm:text-xl mb-4">{welcomeTitle[currentLocale]}</h2>
            <div className="text-sm sm:text-base text-justify mb-4">{welcomeContent[currentLocale]}</div>
            <Link href="/history">
              <button className="text-red-600 hover:text-red-400 transition-all duration-300">Read more</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}