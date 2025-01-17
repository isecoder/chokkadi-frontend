"use client";

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { changeLocale } from "../store/localeSlice";

type LocaleType = "en" | "kn";

interface AdministrationContent {
  managementPresidentTitle: string;
  managementPresidentName: string;
  contactNumber: string;
  developmentPresidentTitle: string;
  developmentPresidentName: string;
  membersTitle: string;
  members: string[];
  templePriestTitle: string;
  templePriestName: string;
  AssistantPriestTitle: string;
  AssistantPriestName: string;
  OfficeClerkTitle: string;
  OfficeClerkName:string;

}

// Content in both English and Kannada
const administrationContent: Record<LocaleType, AdministrationContent> = {
  en: {
    managementPresidentTitle: "Management Committee President:",
    managementPresidentName: "Shri Kishor Kumar Kujugodu",
    contactNumber: "Contact no: +91 94813 21850",
    developmentPresidentTitle: "Development Committee President:",
    developmentPresidentName: "Shri Sheshappa Gowda Kiribhaga",
    membersTitle: "Management Committee Members",
    members: [
      "Shri Chandrahasa S. Shivala",
      "Shri Chandrashekhara K.K Kiribhaga",
      "Shri Sharath D.S Kajjodi",
      "Smt. Reshma Kattemane",
      "Shri Bhavanishankara P. Pailaje",
      "Smt. Jyothi K.L Kalige",
      "Shri Ananda K. Kerekkodi"
    ],
    templePriestTitle: "Temple Priest:",
    templePriestName: "Shri Subrahmanya Narasimha Bhat",
    AssistantPriestTitle: "Assistant Priest:",
    AssistantPriestName: "Shri B. KrishnaKumara",
    OfficeClerkTitle:"Office Clerk",
    OfficeClerkName: "Shri Lokanatha.K"
  },
  kn: {
    managementPresidentTitle: "ವ್ಯವಸ್ಥಾಪನ ಸಮಿತಿ ಅಧ್ಯಕ್ಷರು:",
    managementPresidentName: "ಶ್ರೀ ಕಿಶೋರ್ ಕುಮಾರ್ ಕೂಜುಗೋಡು",
    contactNumber: "ದೂರವಾಣಿ ಸಂ: +91 94813 21850",
    developmentPresidentTitle: "ಅಭಿವೃದ್ಧಿ ಸಮಿತಿ ಅಧ್ಯಕ್ಷರು:",
    developmentPresidentName: "ಶ್ರೀ ಶೇಷಪ್ಪ ಗೌಡ ಕಿರಿಭಾಗ",
    membersTitle: "ಸದಸ್ಯರು",
    members: [
      "ಶ್ರೀ ಚಂದ್ರಹಾಸ ಎಸ್. ಶಿವಾಲ",
      "ಶ್ರೀ ಚಂದ್ರಶೇಖರ ಕೆ. ಕೆ. ಕಿರಿಭಾಗ",
      "ಶ್ರೀ ಶರತ್ ಡಿ. ಎಸ್. ಕಜ್ಜೋಡಿ",
      "ಶ್ರೀಮತಿ ರೇಷ್ಮಾ ಕಟ್ಟೆಮನೆ",
      "ಶ್ರೀ ಭವಾನಿಶಂಕರ ಪಿ. ಪೈಲಾಜೆ",
      "ಶ್ರೀಮತಿ ಜ್ಯೋತಿ ಕೆ. ಎಲ್ ಕಳಿಗೆ",
      "ಶ್ರೀ ಆನಂದ ಕೆ. ಕೆರೆಕ್ಕೋಡಿ"
    ],
    templePriestTitle: "ಅರ್ಚಕರು:",
    templePriestName: "ಶ್ರೀ ಸುಬ್ರಹ್ಮಣ್ಯ ನರಸಿಂಹ ಭಟ್",
    AssistantPriestTitle: "ಸಹಾಯಕ ಅರ್ಚಕರು:",
    AssistantPriestName: "ಶ್ರೀ ಬಿ. ಕೃಷ್ಣಕುಮಾರ",
    OfficeClerkTitle:"ಕಚೇರಿ ಗುಮಾಸ್ತರು",
    OfficeClerkName: "ಶ್ರೀ ಲೋಕನಾಥ.ಕೆ"
  }
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

  if (!isLocaleLoaded) return null; // Prevent rendering until locale is loaded

  return (
    <div style={{ backgroundColor: '#f9f7e6', padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      {/* Management Committee President */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: 'red', fontWeight: 'bold', marginBottom: '5px' }}>{content.managementPresidentTitle}</h3>
        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{content.managementPresidentName}</p>
        <p>{content.contactNumber}</p>
        <hr style={{ width: '50%', margin: '10px auto', border: '0.5px solid #ccc' }} />
      </div>

      {/* Development Committee President */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: 'red', fontWeight: 'bold', marginBottom: '5px' }}>{content.developmentPresidentTitle}</h3>
        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{content.developmentPresidentName}</p>
      </div>

      {/* Members Section */}
      <h3 style={{ color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>{content.membersTitle}</h3>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {content.members.slice(0, Math.ceil(content.members.length / 2)).map((member: string, index: number) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <p style={{ fontWeight: 'bold' }}>{member}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {content.members.slice(Math.ceil(content.members.length / 2)).map((member: string, index: number) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <p style={{ fontWeight: 'bold' }}>{member}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Temple Priest Section */}
      <div style={{ margin: '40px 0' }}>
        <h3 style={{ color: 'red', fontWeight: 'bold', marginBottom: '5px' }}>{content.templePriestTitle}</h3>
        <p style={{ fontWeight: 'bold' }}>{content.templePriestName}</p>
      </div>
      <div style={{ margin: '40px 0' }}>
        <h3 style={{ color: 'red', fontWeight: 'bold', marginBottom: '5px' }}>{content.AssistantPriestTitle}</h3>
        <p style={{ fontWeight: 'bold' }}>{content.AssistantPriestName}</p>
      </div>
      <div style={{ margin: '40px 0' }}>
        <h3 style={{ color: 'red', fontWeight: 'bold', marginBottom: '5px' }}>{content.OfficeClerkTitle}</h3>
        <p style={{ fontWeight: 'bold' }}>{content.OfficeClerkName}</p>
      </div>
    </div>
  );
};

export default Administration;
