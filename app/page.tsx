'use client'

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "./store"
import { changeLocale } from "./store/localeSlice"
import Hero from "./components/hero"
import Link from "next/link"
import Image from "next/image"
import { Analytics } from "@vercel/analytics/react"

type LocaleType = "en" | "kn"

const welcomeTitle: Record<LocaleType, string> = {
  en: "WELCOME TO SHRIRAMA TEMPLE",
  kn: "ಶ್ರೀರಾಮ ದೇವಾಲಯಕ್ಕೆ ಸ್ವಾಗತ",
}

const welcomeContent: Record<LocaleType, string> = {
  en: "Shrirama Temple is a sacred and revered temple nestled in the serene surroundings of Tulunadu, created by Lord Parasurama in South India. Located at the foothills of the Western Ghats in the Sullia Taluk of Dakshina Kannada district, this region is known for its lush green forests and expansive agricultural lands.",
  kn: "ಶ್ರೀರಾಮ ದೇವಾಲಯವು ದಕ್ಷಿಣ ಭಾರತದ ಪಶ್ಚಿಮ ಘಟ್ಟದ ಕಾಲುಭಾಗದಲ್ಲಿ ಪರಶುರಾಮ ಸೃಷ್ಟಿಯ ತುಳುನಾಡಿನಲ್ಲಿ ಇರುವ ಪುಣ್ಯ ಕ್ಷೇತ್ರ. ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯ ಗ್ರಾಮೀಣ ಭಾಗದ ಸುಳ್ಯ ತಾಲೂಕಿನ ಅಮರಪಡ್ನೂರು ಎಂಬ ಗ್ರಾಮದಲ್ಲಿ ಶ್ರೀರಾಮ ದೇವರು ನೆಲೆಸಿದ್ದಾರೆ. ",
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
      <main className="min-h-screen flex flex-col items-center p-4 sm:p-8 text-center">
        <Hero />
        <div className="w-full max-w-6xl mt-8 sm:mt-20">
          <div className="flex flex-col md:flex-row items-center border-4 p-4 sm:p-8 md:p-16 bg-[var(--background)] h-screen">
            <Image
              src="/temple4.png"
              alt="Shrirama Temple"
              className="w-full md:w-1/3 h-auto rounded-md mb-4 md:mb-0 md:mr-8"
              width={240}
              height={160}
            />
            <div className="flex-1">
              <h2 className="font-bold text-lg sm:text-xl mb-4">{welcomeTitle[currentLocale]}</h2>
              <div className="text-sm sm:text-base text-justify mb-4">
                {welcomeContent[currentLocale]}
              </div>
              <Link href="/history">
                <button className="bg-[var(--background)] text-[var(--foreground)] font-bold px-4 py-2 border border-[var(--border-color)] rounded-md hover:bg-[var(--border-color)] hover:text-[var(--background)] transition-all duration-300">
                  Read more
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Include Vercel Analytics */}
      <Analytics />
    </>
  )
}
