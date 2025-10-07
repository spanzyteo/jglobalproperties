import { Playfair_Display, Roboto_Slab } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Records = () => {
  return (
    <div className="flex flex-col md:flex-row py-5 md:py-10 px-5 md:px-6 gap-4 md:justify-between items-center">
      <div className="hidden md:block w-[0.05rem] h-44 bg-[#941A1A]"></div>
      <div className="flex flex-col gap-2 items-center md:items-start">
        <h2
          className={`${playfair.className} text-[37px]  font-medium leading-[56px]`}
        >
          500+
        </h2>
        <p className={`${robotoSlab.className} text-[14px] leading-[35px] uppercase`}>
          Active properties listed across Nigeria
        </p>
      </div>
      <div className="hidden md:block w-[0.05rem] h-44 bg-[#941A1A]"></div>
      <div className="flex flex-col gap-2 items-center md:items-start">
        <h2
          className={`${playfair.className} text-[37px]  font-medium leading-[56px]`}
        >
          99%
        </h2>
        <p className={`${robotoSlab.className} text-[14px] leading-[35px] uppercase`}>
          User satisfaction with our services
        </p>
      </div>
      <div className="hidden md:block w-[0.05rem] h-44 bg-[#941A1A]"></div>
      <div className="flex flex-col gap-2 items-center md:items-start">
        <h2
          className={`${playfair.className} text-[37px]  font-medium leading-[56px]`}
        >
          50+
        </h2>
        <p className={`${robotoSlab.className} text-[14px] leading-[35px] uppercase`}>
          Consultations booked each month
        </p>
      </div>
    </div>
  );
}

export default Records