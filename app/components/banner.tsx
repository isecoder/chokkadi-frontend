// import React from "react";
// import Image from "next/image";

// const Banner = () => {
//   return (
//     <div className="bg-gradient-to-br from-orange-300 to-orange-500 text-white relative">
//       <Image
//         src="/newbanner.png" // Use the actual path to your banner image
//         alt="Temple Banner" // Updated alt text for better accessibility
//         layout="responsive" // Adjusts to maintain aspect ratio and responsiveness
//         width={1920} // Set the width according to your design
//         height={1080} // Set the height according to your design
//         className="w-screen max-h-[300px] md:max-h-[400px] lg:max-h-[400px]" // Sets max height for different screen sizes
//       />
//     </div>
//   );
// };

// export default Banner;


import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="bg-gradient-to-br from-orange-300 to-orange-500 text-white relative">
      {/* Mobile and Tablet Image */}
      <div className="block lg:hidden">
        <Image
          src="/banner.png" 
          alt="Mobile/Tablet Temple Banner"
          layout="responsive"
          width={768} 
          height={432}
          className="w-screen max-h-[300px]" 
        />
      </div>

      {/* PC Image */}
      <div className="hidden lg:block">
        <Image
          src="/newbanner.png" 
          alt="PC Temple Banner"
          layout="responsive"
          width={1920} 
          height={1080} 
          className="w-screen max-h-[400px]" 
        />
      </div>
    </div>
  );
};

export default Banner;
