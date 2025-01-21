"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { changeLocale } from "../store/localeSlice";
import Image from "next/image";
import P1 from "/app/nearby/p1.jpg";
import P2 from "/app/nearby/p2.jpeg";
import P3 from "/app/nearby/p3.jpg";
import P4 from "/app/nearby/p4.jpg";
import P5 from "/app/nearby/p5.jpg";
import P6 from "/app/nearby/p6.jpeg";
import P7 from "/app/nearby/p7.png";
import P8 from "/app/nearby/p8.png";
import P9 from "/app/nearby/p9.png";
import P10 from "/app/nearby/p10.jpg";
import P11 from "/app/nearby/p11.jpg";
import P12 from "/app/nearby/p12.jpeg";
import P13 from "/app/nearby/p13.jpeg";
import P14 from "/app/nearby/p14.jpeg";
import P15 from "/app/nearby/p15.jpeg";
import P16 from "/app/nearby/p16.jpg";
import P17 from "/app/nearby/p17.jpg";
import P18 from "/app/nearby/p18.png";
import P19 from "/app/nearby/p19.jpg";

type LocaleType = "en" | "kn";
type ImageType = typeof P1;

const placesContent: Record<
  LocaleType,
  {
    title: string;
    buttonLabel: string;
    places: { name: string; description: JSX.Element; image: ImageType }[];
  }
> = {
  en: {
    title: "Nearby Places",
    buttonLabel: "View Details",
    places: [
      {
        name: "Kukke Shri Subrahmanya Temple",
        description:
          "Kukke Subrahmanya is a famous Hindu temple in Karnataka, India, dedicated to Lord Subrahmanya (Kartikeyan), worshipped as the deity of serpents. Nestled amidst the lush Western Ghats, it is a significant pilgrimage center for rituals like Sarpa Samskara and Ashlesha Bali.It is located at 31.7Km from Chokkadi.",
        image: P1,
      },
      {
        name: "Shri Harihareshwara Temple",
        description: (
          <>
            This ancient temple is situated at the village Hariharapallathadka,
            29.1 kilometers away from Chokkadi. It is the abode of both Lord
            Vishnu (Hari) and Lord Shiva (Hara). A panoramic view of Shesha
            Parvatha (Western Ghats) can be seen from this temple, which is
            famous for Shani Pooja. For more information and Seva booking, visit
            the website:{" "}
            <a
              href="http://www.shriharihareshwara.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              www.shriharihareshwara.org
            </a>
            .
          </>
        ),
        image: P2,
      },
      {
        name: "Shree Basaveshwara Temple",
        description:
          "This temple is 12.1 Km from Shrirama Temple. Located 12.1 km from Shrirama Temple in Kulkunda, just 2 km from Subrahmanya. Here, Lord Shiva is worshipped in the form of the sacred bull (Basava).",
        image: P3,
      },
      {
        name: "Shree Parivara Panchalingeshwara Temple, Panja",
        description:
          "Shree Parivara Panchalingeshwara Temple, located in Panja village along the Manjeshwara-Puttur-Subrahmanya state highway, is a historic Hindu temple dating back to the 13th century. According to local legends, the five Shiva Lingams enshrined here were installed by the Pandavas during their exile, linking the temple to the Mahabharata. Devotees visit to perform rituals like Rudrabhisheka, seeking blessings for marriage and relief from personal crises. The temple hosts annual events such as Brahmarathotsava and monthly rituals believed to eliminate various doshas. It is approximately 18.5 km from Shrirama Temple. For more information, please contact the temple authorities at 08257 278355.",
        image: P4,
      },
      {
        name: "Kanchodu Shri Manjunatheshwara Temple",
        description:
          "Hindu pilgrimage site dedicated to Lord Shiva. It is a sacred and revered temple nestled in the serene surroundings of Tulunadu, created by Lord Parasurama in South India. Located at the foothills of the Western Ghats in the Sullia Taluk of Dakshina Kannada district, this region is known for its lush green forests and expansive agricultural lands. Located 10.3 km from Shrirama Temple.",
        image: P5,
      },
      {
        name: "Kote Shri Subrahmanya Temple",
        description:
          "Kote Subrahmanya Temple, near Kalanja village in Sullia Taluk, is dedicated to Lord Subrahmanya, known as the protector of serpents. Nestled amidst serene landscapes, it is a popular destination for blessings of protection, wisdom, and good health. This temple located at the distance of 4.7 km from Chokkadi.",
        image: P19,
      },
      {
        name: "Shri Kshethra Dharmasthala",
        description:
          "Major Hindu pilgrimage site dedicated to Lord Shiva, fostering religious harmony. Located 59.7 km from Shrirama Temple.",
        image: P6,
      },
      {
        name: "Ajapila Shri Mahalingeshwara Temple",
        description:
          "Hindu pilgrimage site dedicated to Lord Shiva located at Bellare, a mjor town in Sullia Taluk. It is a sacred and revered temple nestled in the serene surroundings of Tulunadu, created by Lord Parasurama in South India. Located at the foothills of the Western Ghats in the Sullia Taluk of Dakshina Kannada district, this region is known for its lush green forests and expansive agricultural lands. Located 8.9 km from Shrirama Temple.",
        image: P7,
      },
      {
        name: "Shree Panchalingeshwara Temple,Ivarnadu",
        description:
          "Shree Panchalingeshwara Temple, located in Ivarnadu village along the Sullia-Bellare road, is a historic Hindu temple dedicated to Lord Shiva. This temple located 10.1 km from Chokkadi.",
        image: P8,
      },
      {
        name: "Shree Durgaparameshwari Temple,Kanjarpane",
        description:
          "Shree DurgaparameshwariTemple, located in Amaramudnoor village.Dedicated to Goddess Durga. This temple is located approximately 5 km from Chokkadi.",
        image: P9,
        },
      {
          name: "Shree Chennakeshava Temple,Sullia",
          description:
            "Shri Chennakeshava Temple in Sullia, Karnataka, is an 850-year-old historic temple dedicated to Lord Chennakeshava, with daily rituals and an annual festival, 'Jatrotsava,' in January. Known for its serene environment, it is a cultural and spiritual hub for devotees. It is located 11.7 km from Chokkadi.",
          image: P10,
        },
        {
          name: "Shree Mallikarjuna Temple,Thodikana",
          description:
            "Shree Mallikarjuna Temple in Thodikana, Karnataka, is a 13th-century temple dedicated to Lord Shiva, attracting numerous visitors weekly. Nearby attractions include the 'Meenugundi' fish tank and the Devaragundi waterfall, enhancing its cultural and natural appeal.It is located 28.6 km from Chokkadi.",
          image: P11,
        },
      {
        name: "Bisle Ghat Viewpoint",
        description:
          "Known for scenic views of Kumara Parvatha and the Western Ghats, located 32.4 km from Shrirama Temple.",
        image: P12,
      },
      {
        name: "Patla Betta",
        description:
          "Picturesque hill in Sakleshpur, 40.5 km from Shrirama Temple, ideal for trekking.",
        image: P13,
      },
      {
        name: "Mallalli Falls",
        description:
          "200-foot waterfall in Coorg, best visited during the monsoon, formed by the Kumaradhara River. Located 57.3 km from Shrirama Temple.",
        image: P14,
      },
      {
        name: "Kumara Parvatha Trek",
        description:
          "Known as Pushpagiri, this challenging trek to the fourth-highest peak in the Western Ghats starts from the base camp in Kukke Subrahmanya, 10.1 km from Shrirama Temple.",
        image: P15,
      },
      {
        name: "Mahathobhara Shri Mahalingeshwara Temple,Puttur",
        description:
          "Mahathobhara Shri Mahalingeshwara Temple in Puttur, Karnataka, is a 12th-century temple dedicated to Lord Shiva, renowned for its grand festivals like Rathotsava and Mahashivaratri. Its legend ties to a sacred Shiva Linga immovably placed, symbolizing divine presence.It is located 41.9 km from Chokkadi",
        image: P16,
      },
      {
        name: "Shri Durgaparameshwari Temple,Marakatha",
        description:
          "Shri Durgaparameshwari Temple in Marakatha, Sullia Taluk, is a revered Hindu temple dedicated to Goddess Durga Parameshwari. Situated 31.8 km from Sullia and 26.8 km from Shrirama Temple in Chokkadi, it draws devotees seeking blessings and spiritual solace. Managed by local authorities, the temple hosts various rituals and festivals honoring the Goddess. For inquiries, please contact 08257 282166.",
        image: P17,
      },
      {
        name: "Shri Jaladurga Devi Temple,Peruvaje",
        description:
          "Shri Jaladurga Devi Temple, located in Peruvaje, Karnataka, is a historic temple dedicated to Goddess Jaladurga Devi, renowned for its annual fair and Brahmarathotsava festival.  The temple is beautifully adorned with various flowers during festivals, attracting numerous devotees.",
        image: P18,
      },
    ],
  },
  kn: {
    title: "ಸಮೀಪದ ಸ್ಥಳಗಳು",
    buttonLabel: "ಹೆಚ್ಚಿನ ವಿವರಗಳು",
    places:[
        {
          name: "ಕುಕ್ಕೆ ಶ್ರೀ ಸುಬ್ರಹ್ಮಣ್ಯ ದೇವಸ್ಥಾನ",
          description:
            "ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯ ಕರ್ನಾಟಕದ ಪ್ರಸಿದ್ಧ ಹಿಂದೂ ದೇವಸ್ಥಾನವಾಗಿದ್ದು, ನಾಗನ ರೂಪದಲ್ಲಿ ಶ್ರೀ ಸುಬ್ರಹ್ಮಣ್ಯ ದೇವರನ್ನು ಆರಾಧಿಸಲಾಗುತ್ತದೆ. ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ತಪ್ಪಲಿನಲ್ಲಿ ನೆಲೆಸಿರುವ ಈ ಕ್ಷೇತ್ರ ಸರ್ಪ ಸಂಸ್ಕಾರ ಮತ್ತು ಅಶ್ಲೇಷ ಬಲಿ ಮುಂತಾದ ಸರ್ಪ ದೋಷದ ನಿವಾರೆಣೆಗೆ ಮಾಡುವ ಸೇವೆಗಳಿಗೆ ಪ್ರಮುಖ ತೀರ್ಥ ಕ್ಷೇತ್ರವಾಗಿದೆ. ಇದು ಚೊಕ್ಕಾಡಿಯಿಂದ 31.7 ಕಿ.ಮೀ ದೂರದಲ್ಲಿದೆ.",
          image: P1,
        },
        {
          name: "ಶ್ರೀ ಹರಿಹರೇಶ್ವರ ದೇವಸ್ಥಾನ,ಹರಿಹರಪಳ್ಳತ್ತಡ್ಕ",
          description: (
            <>
              ಈ ಪ್ರಾಚೀನ ದೇವಸ್ಥಾನ ಹರಿಹರಪಳ್ಳತಡ್ಕ ಗ್ರಾಮದಲ್ಲಿದ್ದು, ಚೊಕ್ಕಾಡಿಯಿಂದ 29.1
              ಕಿ.ಮೀ ದೂರದಲ್ಲಿದೆ. ಇದು ಹರಿ (ವಿಷ್ಣು) ಮತ್ತು ಹರರ (ಶಿವ) ದಿವ್ಯ
              ಸನ್ನಿಧಿಯನ್ನು ಹೊಂದಿದ ಕ್ಷೇತ್ರವಾಗಿದೆ. ಈ ದೇವಸ್ಥಾನದಿಂದ ಶೇಷ ಪರ್ವತ ಹಾಗು
              ಪಶ್ಚಿಮ ಘಟ್ಟದ ಪರ್ವತಗಳ ಸಾಲನ್ನು ಕಾಣಬಹುದು. ಇದು ಶನಿ ಪೂಜೆಗೆ ಪ್ರಸಿದ್ಧವಾದ
              ಕ್ಷೇತ್ರವಾಗಿದೆ. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ಮತ್ತು ಸೇವಾ ಬುಕಿಂಗ್‌ಗಾಗಿ ದಯವಿಟ್ಟು
              ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಿ:{" "}
              <a
                href="http://www.shriharihareshwara.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                www.shriharihareshwara.org
              </a>
              .
            </>
          ),
          image: P2,
        },
        {
          name:"ಕುಲ್ಕುಂದ ಶ್ರೀ ಬಸವೇಶ್ವರ ದೇವಸ್ಥಾನ", description: "ಶ್ರೀ ರಾಮ ದೇವಾಲಯದಿಂದ 12.1 ಕಿಮೀ ದೂರದಲ್ಲಿರುವ ಈ ಸ್ಥಳವು ಕುಲ್ಕುಂದದಲ್ಲಿ ಇದೆ ಹಾಗು ಇದು ಸುಬ್ರಹ್ಮಣ್ಯದಿಂದ ಕೇವಲ 2 ಕಿಮೀ ದೂರದಲ್ಲಿದೆ. ಇಲ್ಲಿ ಶಿವ ದೇವರನ್ನು ಬಸವ (ಬಸವ) ರೂಪದಲ್ಲಿ ಪೂಜಿಸಲಾಗುತ್ತದೆ. ಸುಬ್ರಹ್ಮಣ್ಯ ದೇವರು ತಾರಕಾಸುರನ ಜೊತೆಗೆ ಯುದ್ಧ ಮಾಡಿದ ಸಂದರ್ಭದಲ್ಲಿ ಭಗವಾನ್ ಶಂಕರ ಬಸವನ ರೂಪದಲ್ಲಿ ಈ ಸ್ಥಳದಲ್ಲಿ ನೆಲೆ ನಿಂತು ಸುಬ್ರಹ್ಮಣ್ಯ ದೇವರಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಿದರು ಎಂದು ಇಲ್ಲಿನ ಇತಿಹಾಸ ಹೇಳುತ್ತದೆ.",
          image: P3,
        },
        {
          name: "ಶ್ರೀ ಪರಿವಾರ ಪಂಚಲಿಂಗೇಶ್ವರ ದೇವಸ್ಥಾನ,ಪಂಜ", description: "ಶ್ರೀ ಪರಿವಾರ ಪಂಚಲಿಂಗೇಶ್ವರ ದೇವಾಲಯವು ಪಂಜ ಗ್ರಾಮದಲ್ಲಿ 13ನೇ ಶತಮಾನದಿಂದ ಇತಿಹಾಸ ಹೊಂದಿರುವ ಪವಿತ್ರ ಹಿಂದೂ ದೇವಾಲಯವಾಗಿದೆ. ಮಹಾಭಾರತದ ಕಾಲದಲ್ಲಿ ಪಾಂಡವರು ವನವಾಸದ ಸಮಯದಲ್ಲಿ ಐದು ಶಿವಲಿಂಗಗಳನ್ನು ಪ್ರತಿಷ್ಠಾಪಿಸಿದ್ದರೆಂಬ ಇತಿಹಾಸವಿದೆ. ವಿವಾಹ, ಸಂತಾನ ಫಲ, ಮತ್ತು ಮೃತ್ಯು ಕಂಟಕವಿರುವವರು ಇಲ್ಲಿ ಏಕಾದಶ ರುದ್ರಾಭಿಷೇಕ ಮಾಡಿಸಿದರೆ ನಿವಾರಣೆಯಾಗುತ್ತದೆ ಎಂಬ ನಂಬಿಕೆಯಿದೆ. ಈ ದೇವಸ್ಥಾನವು ಶ್ರೀ ಹರಿಹರೇಶ್ವರ ದೇವಾಲಯದಿಂದ ಅಂದಾಜು 18.5 ಕಿ.ಮೀ ದೂರದಲ್ಲಿದೆ. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ದಯವಿಟ್ಟು ದೇವಾಲಯವನ್ನು ಸಂಪರ್ಕಿಸಿ: 08257 278355.",
          image: P4,
        },
        {
          name: "ಕಾಂಚೋಡು ಶ್ರೀ ಮಂಜುನಾಥೇಶ್ವರ ದೇವಸ್ಥಾನ",
          description:
            "ಭಗವಾನ್ ಶಂಕರನನ್ನು ಪೂಜಿಸಲಾಗುವ ರಾಜ್ಯದ ಪ್ರಸಿದ್ಧ ಹಿಂದು ಕ್ಷೇತ್ರವಿದು. ಶ್ರೀರಾಮ ದೇವಾಲಯದಿಂದ 6.7 ಕಿಮೀ ದೂರದಲ್ಲಿದೆ.",
          image: P5,
        },
        {
          name: "ಕೋಟೆ ಶ್ರೀ ಸುಬ್ರಹ್ಮಣ್ಯ ದೇವಸ್ಥಾನ",
          description:
            "ಕೋಟೆ ಸುಬ್ರಹ್ಮಣ್ಯ ದೇವಸ್ಥಾನವು ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯ ಸುಳ್ಯ ತಾಲೂಕಿನ ಕಳಂಜ ಗ್ರಾಮದ ಸಮೀಪದಲ್ಲಿದ್ದು, ಸರ್ಪರಕ್ಷಕನಾದ ಸುಬ್ರಹ್ಮಣ್ಯ ಸ್ವಾಮಿಗೆ ಸಮರ್ಪಿತವಾಗಿದೆ. ನದಿ, ಕಾಡು, ಪರ್ವತಗಳಿಂದ ಆವರಿಸಿರುವ ಶಾಂತ ಪರಿಸರದಲ್ಲಿರುವ ಈ ದೇವಸ್ಥಾನ ಭಕ್ತರಿಗೆ ರಕ್ಷಣಾ ಕೃಪೆ, ಜ್ಞಾನ ಮತ್ತು ಆರೋಗ್ಯದ ಆಶೀರ್ವಾದಕ್ಕಾಗಿ ಪ್ರಸಿದ್ಧವಾಗಿದೆ. ಶ್ರೀರಾಮ ದೇವಾಲಯದಿಂದ 4.7 ಕಿಮೀ ದೂರದಲ್ಲಿದೆ.",
          image: P19,
        },
        {
          name: "ಶ್ರೀ ಕ್ಷೇತ್ರ ಧರ್ಮಸ್ಥಳ", description: "ಭಗವಾನ್ ಶಂಕರನನ್ನು ಪೂಜಿಸಲಾಗುವ ರಾಜ್ಯದ ಪ್ರಸಿದ್ಧ ಹಿಂದು ಕ್ಷೇತ್ರವಿದು. ಶ್ರೀರಾಮ ದೇವಾಲಯದಿಂದ 59.7 ಕಿಮೀ ದೂರದಲ್ಲಿದೆ.",
          image: P6,
        },
        {
          name: "ಅಜಪಿಲ ಶ್ರೀ ಮಹಾಲಿಂಗೇಶ್ವರ ದೇವಸ್ಥಾನ",
          description:
            "ಸುಲ್ಯ ತಾಲೂಕಿನ ಬೆಳ್ಳಾರೆ ಪಟ್ಟಣದಲ್ಲಿರುವ ಮುಖ್ಯ ಕ್ಷೇತ್ರ.ಭಗವಾನ್‌ ಶಂಕರನನ್ನು ಪೂಜಿಸಲ್ಪಡುವ ದೇವಸ್ಥಾನವಿದು. ಇದು ಚೊಕ್ಕಾಡಿಯಿಂದ 8.9 ಕಿ.ಮೀ ದೂರದಲ್ಲಿದೆ.",
          image: P7,
        },
        {
          name: "ಶ್ರೀ ಪಂಚಲಿಂಗೇಶ್ವರ ದೇವಸ್ಥಾನ, ಐವರ್ನಾಡು",
          description:
            "ಶ್ರೀ ಪಂಚಲಿಂಗೇಶ್ವರ ದೇವಸ್ಥಾನ, ಸುಳ್ಯ-ಬೆಳ್ಳಾರೆ ರಸ್ತೆಯಲ್ಲಿರುವ ಐವರ್ನಾಡು ಗ್ರಾಮದಲ್ಲಿ ಶಿವ ದೇವರ ಪ್ರಾಚೀನ ದೇವಸ್ಥಾನ. ಇದು ಚೊಕ್ಕಾಡಿಯಿಂದ 10.1 ಕಿ.ಮೀ ದೂರದಲ್ಲಿದೆ.",
          image: P8,
        },
        {
          name: "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ದೇವಸ್ಥಾನ, ಕಂಜರ್ಪಣೆ",
          description:
            "ಅಮರಮುಡ್ನೂರು ಗ್ರಾಮದಲ್ಲಿ ತಾಯಿ ದುರ್ಗಾದೇವಿಯನ್ನು ಆರಾಧಿಸಲಾಗುವ ದೇವಸ್ಥಾನವಿದು. ಚೊಕ್ಕಾಡಿಯಿಂದ 5 ಕಿ.ಮೀ ದೂರದಲ್ಲಿ ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ದೇವಸ್ಥಾನವಿದೆ .",
          image: P9,
        },
        {
          name: "ಶ್ರೀ ಚೆನ್ನಕೇಶವ ದೇವಸ್ಥಾನ, ಸುಳ್ಯ",
          description:
            "ಸುಳ್ಯದಲ್ಲಿರುವ 850 ವರ್ಷಗಳ ಹಿಂದಿನ ಈ ಪ್ರಾಚೀನ ದೇವಸ್ಥಾನ ಶ್ರೀ ಚೆನ್ನಕೇಶವನಿಗೆ ಮೀಸಲಾಗಿದ್ದು ಚೊಕ್ಕಾಡಿಯಿಂದ 11.7 ಕಿ.ಮೀ ದೂರದಲ್ಲಿದೆ.",
          image: P10,
        },
        {
          name: "ಶ್ರೀ ಮಲ್ಲಿಕಾರ್ಜುನ ದೇವಸ್ಥಾನ, ತೊಡಿಕಾನ",
          description:
            "ತೊಡಿಕಾನ ಶ್ರೀ ಮಲ್ಲಿಕಾರ್ಜುನ ದೇವಸ್ಥಾನವು ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯ ಸುಳ್ಯ ತಾಲೂಕಿನ ಸುಂದರವಾದ ಕಾಡುಪ್ರದೇಶದ ಮಧ್ಯದಲ್ಲಿ ಸ್ಥಿತವಾಗಿದೆ. ಇದು ಶಿವನಿಗೆ ಸಮರ್ಪಿತ ಪ್ರಾಚೀನ ದೇವಾಲಯವಾಗಿದ್ದು, ಭಕ್ತರು ಶ್ರದ್ಧೆಯಿಂದ ಪೂಜಿಸಿ ದೇವರ ಆಶೀರ್ವಾದ ಪಡೆಯುತ್ತಾರೆ. ಇದು ಚೊಕ್ಕಾಡಿಯಿಂದ 28.6 ಕಿ.ಮೀ ದೂರದಲ್ಲಿದೆ.",
          image: P11,
        },
        {
          name: "ಬಿಸ್ಲೆ ಘಾಟ್ ವೀಕ್ಷಣಾ ಸ್ಥಳ",
          description:
            "ಕುಮಾರ ಪರ್ವತ ಮತ್ತು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ವಿಹಂಗಮ ನೋಟಕ್ಕೆ ಪ್ರಸಿದ್ಧಿಯಾಗಿರುವ ಈ ಸ್ಥಳವು ದಕ್ಷಿಣ ಕನ್ನಡ, ಹಾಸನ ಮತ್ತು ಕೊಡಗು ಜಿಲ್ಲೆಗಳ ಸಂಗಮವಾಗುವ ವೀಕ್ಷಣಾ ಸ್ಥಳವಾಗಿದ್ದು, ಚೊಕ್ಕಾಡಿಯಿಂದ 56.3 ಕಿ.ಮೀ ದೂರದಲ್ಲಿದೆ.",
          image: P12,
        },
        {
          name: "ಪಟ್ಲ ಬೆಟ್ಟ",
          description:
            "ಚೊಕ್ಕಾಡಿಯಿಂದ 64.4 ಕಿಮೀ ದೂರದಲ್ಲಿರುವ ಈ ಸ್ಥಳವು ಸಕಲೇಶಪುರದಲ್ಲಿ ಇರುವ ಒಂದು ಪ್ರಸಿದ್ಧ ಶಿಖರ. ಇಲ್ಲಿಂದ ಕುಮಾರ ಪರ್ವತ ಹಾಗು ಪುಷ್ಪಗಿರಿ ಸಾಲಿನ ಪರ್ವತ ಶಿಖರಗಳು ಕಾಣಲು ಸಿಗುತ್ತದೆ.",
          image: P13,
        },
        {
          name: "ಮಲ್ಲಳ್ಳಿ ಜಲಪಾತ",
          description:
            "ಶ್ರೀ ರಾಮ ದೇವಾಲಯದಿಂದ 81.2 ಕಿಮೀ ದೂರದಲ್ಲಿರುವ ಕುಮಾರಧಾರ ನದಿಯಿಂದ ನಿರ್ಮಾಣಗೊಳ್ಳುವ ಈ 200 ಅಡಿ ಎತ್ತರದ ಜಲಪಾತವನ್ನು ನೋಡಲು ಮಳೆಗಾಲ ಹೇಳಿದ ಸಮಯ.",
          image: P14,
        },
        {
          name: "ಕುಮಾರ ಪರ್ವತ ಚಾರಣ", description: "ಪುಷ್ಪಗಿರಿ ಎಂದೇ ಪ್ರಸಿದ್ಧ, ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಸಾಲಿನಲ್ಲಿರುವ ಕರ್ನಾಟಕ ರಾಜ್ಯದ ನಾಲ್ಕನೇ ಎತ್ತರದ ಶಿಖರವಾಗಿದೆ ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯದಿಂದ ಆರಂಭವಾಗುವ ಚಾರಣ ದಕ್ಷಿಣ ಭಾರತದ ಕಠಿಣ ಚಾರಣಗಳಲ್ಲಿ ಒಂದು. ಚಾರಣ ಆರಂಭಗೊಳ್ಳುವ ಸ್ಥಳವಾದ ಸುಬ್ರಹ್ಮಣ್ಯದ ದೇವರಗದ್ದೆ ಶ್ರೀ ರಾಮ ದೇವಾಲಯದಿಂದ 34.4 ಕಿಮೀ ದೂರದಲ್ಲಿದೆ.",
          image: P15,
        },
        {
          name: "ಮಹತೋಭಾರ ಶ್ರೀ ಮಹಾಲಿಂಗೇಶ್ವರ ದೇವಸ್ಥಾನ, ಪುತ್ತೂರು",
          description:
            "ಮಹತೋಭಾರ ಶ್ರೀ ಮಹಾಲಿಂಗೇಶ್ವರ ದೇವಸ್ಥಾನವು ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯ ಪುತ್ತೂರಿನಲ್ಲಿರುವ 12ನೇ ಶತಮಾನದ ಶಿವನಿಗೆ ಮೀಸಲಾಗಿರುವ ಪ್ರಸಿದ್ಧ ದೇವಾಲಯವಾಗಿದೆ.ಇದು ಚೊಕ್ಕಾಡಿಯಿಂದ 41.9 ಕಿ.ಮೀ ದೂರದಲ್ಲಿದೆ.",
          image: P16,
        },
        {
          name: "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ದೇವಸ್ಥಾನ, ಮರಕತ", description: "ಸುಳ್ಯ ತಾಲೂಕಿನ ಮರಕತದಲ್ಲಿರುವ ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ದೇವಸ್ಥಾನವು ದುರ್ಗಾಪರಮೇಶ್ವರಿ ತಾಯಿ ದುರ್ಗೆಗೆ ಅರ್ಪಿತವಾದ ಹಿಂದೂ ದೇವಾಲಯವಾಗಿದೆ.ಸುಳ್ಯದಿಂದ 25 ಕಿಲೋಮೀಟರ್ ಮತ್ತು ಚೊಕ್ಕಾಡಿಯಿಂದ 26.8 ಕಿಲೋಮೀಟರ್ ದೂರದಲ್ಲಿರುವ ಈ ದೇವಾಲಯವನ್ನು ಸ್ಥಳೀಯ ಆಡಳಿತವು ದೇವಾಲಯವನ್ನು ನೋಡಿಕೊಳ್ಳುತ್ತದೆ, ಇಲ್ಲಿ ವಿವಿಧ ಪೂಜೆಗಳು ಮತ್ತು ಉತ್ಸವಗಳು ನಡೆಯುತ್ತವೆ. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ದೇವಾಲಯದ ದೂರವಾಣಿ ಸಂಖ್ಯೆ 08257 282166 ಕರೆ ಮಾಡಬಹುದು.",
          image: P17,
        },
        {
          name: "ಶ್ರೀ ಜಲದುರ್ಗಾ ದೇವಿ ದೇವಸ್ಥಾನ, ಪೆರುವಾಜೆ",
          description:
            "ಶ್ರೀ ಜಲದುರ್ಗಾ ದೇವಿ ದೇವಾಲಯ ಸುಳ್ಯ ತಾಲೂಕಿನ ಪೆರುವಾಜೆಯಲ್ಲಿದೆ. ತಾಯಿ ದುರ್ಗೆಗೆ ಮೀಸಲಾಗಿರುವ ಐತಿಹಾಸಿಕ ಹಿಂದು ದೇವಾಲಯವಾಗಿದೆ. ಈ ದೇವಾಲಯವು ಪ್ರತಿವರ್ಷ ನಡೆಯುವ ಜಾತ್ರೆ ಮಹೋತ್ಸವ ಮತ್ತು ಬ್ರಹ್ಮರಥೋತ್ಸವಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ, ಇದು ಸಾವಿರಾರು ಭಕ್ತರನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ.",
          image: P18,
        },
      ],
    },
  };
  export default function Nearby() {
    const dispatch = useDispatch<AppDispatch>();
    const currentLocale: LocaleType = useSelector(
      (state: RootState) => state.locale.locale
    ) as LocaleType;
  
    const { title, buttonLabel, places } = placesContent[currentLocale];
    const [isLocaleLoaded, setIsLocaleLoaded] = useState(false);
    const [activePlace, setActivePlace] = useState<number | null>(null);
  
    useEffect(() => {
      const savedLocale = (localStorage.getItem("locale") || "en") as LocaleType;
      dispatch(changeLocale(savedLocale));
      setIsLocaleLoaded(true);
    }, [dispatch]);
  
    if (!isLocaleLoaded) return null;
  
    return (
      <main className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-b from-[#fff9c4] to-[#fff59d] font-serif">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
          {title}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map(({ name, description, image }, index) => (
            <div
              key={index}
              className="bg-[#ffecb3] rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <Image
                src={image}
                alt={`Image of ${name}`}
                className="rounded-lg"
                width={270}
                height={180}
              />
              <h2 className="text-green-800 font-semibold text-lg mt-4">{name}</h2>
              <button
                onClick={() => setActivePlace(index)}
                aria-label={`View details about ${name}`}
                className="mt-2 bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {buttonLabel}
              </button>
  
              {activePlace === index && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10 overflow-auto">
                  <div className="bg-[#ffecb3] p-6 rounded-md max-w-lg mx-auto">
                    <h2 className="text-xl font-bold mb-2 text-green-800">{name}</h2>
                    <p className="text-green-900">{description}</p>
                    <button
                      onClick={() => setActivePlace(null)}
                      aria-label="Close details"
                      className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    );
  }