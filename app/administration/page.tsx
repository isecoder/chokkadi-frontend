"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { changeLocale } from "../store/localeSlice";

type LocaleType = "en" | "kn";

interface AdministrationContent {
  sevaSamithiTitle: string;
  sevaSamithiDescription: string;
  managementPresidentTitle: string;
  managementPresidentName: string;
  contactNumber: string;
  managementVicePresidentTitle: string;
  managementVicePresidentName: string;
  viceContactNumber: string;
  managementSecretaryTitle: string;
  managementSecretaryName: string;
  managementTreasurerTitle: string;
  managementTreasurerName: string;
  membersTitle: string;
  members: string[];
  templePriestTitle: string;
  templePriestName: string;
}

const administrationContent: Record<LocaleType, AdministrationContent> = {
  en: {
    sevaSamithiTitle: "Shrirama Seva Samithi",
    sevaSamithiDescription:
      "Shrirama Seva Samithi operates under the guidance of Sri Ramachandrapura Matha, led by His Holiness Sri Sri Raghaveshwara Bharathi Swamiji. The Seva Samithi diligently follows the instructions and traditions set forth by the Matha to uphold the spiritual and cultural values of the temple.",
    managementPresidentTitle: "President:",
    managementPresidentName: "Shri Mahesh Bhat Choontharu",
    contactNumber: "Contact no: +91 9448625254, +91 7019616082",
    managementVicePresidentTitle: "Vice President:",
    managementVicePresidentName: "Shri Krishnamoorthi Nenaru",
    viceContactNumber: "Contact no: +91 9008145925",
    managementSecretaryTitle: "Secretary:",
    managementSecretaryName: "Shri Ganeshamoorthy.K",
    managementTreasurerTitle: "Treasurer:",
    managementTreasurerName: "Shri Sathyavenkatesha Hebbar",
    membersTitle: "Members:",
    members: [
      "Shri Anekaru Ganapayya",
      "Shri Gopalakrishna Bhat Katta",
      "Shriramachandra Kote",
      "Shri Adarsha Krishna Nenaru",
      "Shri Karthikesha Hebbar",
      "Shri Krishnaprasad K",
      "Shri Praneetha Venkatesha Sharma",
      "Shri Sudeshna Deraje",
      "Shri Ashraya Nenaru",
    ],
    templePriestTitle: "Temple Priest:",
    templePriestName: "Shri Raghurama Sharma",
  },
  kn: {
    sevaSamithiTitle: "ಶ್ರೀ ರಾಮ ಸೇವಾ ಸಮಿತಿ",
    sevaSamithiDescription:
      "ಶ್ರೀ ರಾಮ ಸೇವಾ ಸಮಿತಿಯು ಶ್ರೀ ರಾಮಚಂದ್ರಾಪುರ ಮಠದ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ, ಇದನ್ನು ಪರಮಪೂಜ್ಯ ಶ್ರೀ ಶ್ರೀ ರಾಘವೇಶ್ವರ ಭಾರತೀ ಮಹಾಸ್ವಾಮೀಜಿಯವರು ನೇತೃತ್ವ ವಹಿಸಿದ್ದಾರೆ. ಸೇವಾ ಸಮಿತಿಯು ಮಠದ ಮಾರ್ಗದರ್ಶನದ ಪ್ರಕಾರ ದೇವಾಲಯದ ಆಧ್ಯಾತ್ಮಿಕ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಮೌಲ್ಯಗಳನ್ನು ಕಾಪಾಡುತ್ತದೆ.",
    managementPresidentTitle: "ಅಧ್ಯಕ್ಷರು:",
    managementPresidentName: "ಶ್ರೀ ಮಹೇಶ್ ಭಟ್ ಚೂಂತಾರು",
    contactNumber: "ದೂರವಾಣಿ ಸಂ: +91 9448625254, +91 7019616082",
    managementVicePresidentTitle: "ಉಪಾಧ್ಯಕ್ಷರು:",
    managementVicePresidentName: "ಶ್ರೀ ಕೃಷ್ಣಮೂರ್ತಿ ನೇಣಾರು",
    viceContactNumber: "ದೂರವಾಣಿ ಸಂ: +91 9008145925",
    managementSecretaryTitle: "ಕಾರ್ಯದರ್ಶಿ:",
    managementSecretaryName: "ಶ್ರೀ ಗಣೇಶಮೂರ್ತಿ.ಕೆ",
    managementTreasurerTitle: "ಖಜಾಂಚಿ:",
    managementTreasurerName: "ಶ್ರೀ ಸತ್ಯವೆಂಕಟೇಶ ಹೆಬ್ಬಾರ್",
    membersTitle: "ಸದಸ್ಯರು:",
    members: [
      "ಶ್ರೀ ಆನೆಕಾರು ಗಣಪಯ್ಯ",
      "ಶ್ರೀ ಗೋಪಾಲಕೃಷ್ಣ ಭಟ್‌ ಕಟ್ಟ",
      "ಶ್ರೀ ರಾಮಚಂದ್ರ ಕೋಟೆ",
      "ಶ್ರೀ ಆದರ್ಶ ಕೃಷ್ಣ ನೇಣಾರು",
      "ಶ್ರೀ ಕಾರ್ತಿಕೇಶ ಹೆಬ್ಬಾರ್",
      "ಶ್ರೀ ಕೃಷ್ಣಪ್ರಸಾದ್.ಕೆ",
      "ಶ್ರೀ ಪ್ರಣೀತ ವೆಂಕಟೇಶ ಶರ್ಮ",
      "ಶ್ರೀ ಸುಧೇಷ್ಣ ದೇರಾಜೆ",
      "ಶ್ರೀ ಆಶ್ರಯ ನೇಣಾರು",
    ],
    templePriestTitle: "ಅರ್ಚಕರು:",
    templePriestName: "ಶ್ರೀ ರಘುರಾಮ ಶರ್ಮಾ",
  },
};

const Administration: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLocale: LocaleType = useSelector(
    (state: RootState) => state.locale.locale
  ) as LocaleType;

  const content = administrationContent[currentLocale];
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(false);

  useEffect(() => {
    const savedLocale = (localStorage.getItem("locale") || "en") as LocaleType;
    dispatch(changeLocale(savedLocale));
    setIsLocaleLoaded(true);
  }, [dispatch]);

  if (!isLocaleLoaded) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-4xl mx-auto text-center">
        <section aria-labelledby="seva-samithi">
          <h1 id="seva-samithi" className="text-[var(--primary)] font-bold text-2xl mb-4">
            {content.sevaSamithiTitle}
          </h1>
          <p className="mb-8">{content.sevaSamithiDescription}</p>
        </section>

        {/* Management Roles */}
        {[
          { title: content.managementPresidentTitle, name: content.managementPresidentName, contact: content.contactNumber },
          { title: content.managementVicePresidentTitle, name: content.managementVicePresidentName, contact: content.viceContactNumber },
          { title: content.managementSecretaryTitle, name: content.managementSecretaryName },
          { title: content.managementTreasurerTitle, name: content.managementTreasurerName },
        ].map((role, index) => (
          <section key={index} className="mb-8">
            <h3 className="text-[var(--primary)] font-bold mb-2">{role.title}</h3>
            <p className="font-semibold text-[var(--primary)] mb-1">{role.name}</p>
            {role.contact && <p>{role.contact}</p>}
          </section>
        ))}

        {/* Members Section */}
        <section aria-labelledby="members">
          <h3 id="members" className="text-[var(--primary)] font-bold mb-6">{content.membersTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.members.map((member, index) => (
              <p key={index} className="font-semibold text-[var(--primary)]">{member}</p>
            ))}
          </div>
        </section>

        {/* Temple Priest */}
        <section aria-labelledby="priest" className="mt-10">
          <h3 id="priest" className="text-[var(--primary)] font-bold mb-2">{content.templePriestTitle}</h3>
          <p className="font-semibold text-[var(--primary)]">{content.templePriestName}</p>
        </section>
      </div>
    </div>
  );
};

export default Administration;
