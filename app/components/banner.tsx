import React from "react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-gradient-to-br from-orange-300 to-orange-500 text-white relative">
      {/* Mobile and Tablet Image */}
      <div className="block lg:hidden">
        <Link href="/" passHref>
          <Image
            src="/newbanner.png"
            alt="Mobile/Tablet Temple Banner"
            layout="responsive"
            width={768}
            height={432}
            className="w-screen max-h-[300px] cursor-pointer"
          />
        </Link>
      </div>

      {/* PC Image */}
      <div className="hidden lg:block">
        <Link href="/" passHref>
          <Image
            src="/newbanner.png"
            alt="PC Temple Banner"
            layout="responsive"
            width={1920}
            height={1080}
            className="w-screen max-h-[400px] cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
