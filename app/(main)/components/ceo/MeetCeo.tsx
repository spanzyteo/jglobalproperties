import { BiSolidQuoteLeft } from "react-icons/bi";
import Image from "next/image";

const MeetCeo = () => {
  return (
    <div className="mt-[4rem] lg:mt-[6rem] flex py-[3.5rem] lg:py-[7.5rem] lg:px-[5rem] px-[2rem] items-center">
      <div className="w-full flex flex-col xl:flex-row items-start gap-[1.5rem] lg:gap-[5.937rem] shrink-0 xl:items-end">
        <div className="flex flex-col md:flex-row items-start gap-8 lg:w-[55.4rem] lg:justify-between">
          <div className="flex flex-col items-start gap-[0.85844rem] lg:gap-4 w-full">
            <h1 className="text-black text-[2rem] lg:text-[4rem] font-medium leading-[2.375rem] lg:leading-[4.5rem]">
              Meet <br />
              <span className="font-bold">
                {" "}
                Joan Obi <br /> Okuhun{" "}
              </span>
            </h1>
            <div className="flex w-[16.3125rem] lg:w-[24.1875rem] p-[0.2rem] lg:p-1 items-center justify-center rounded-[1.25rem] ceo-text bg-[#BD85F226]">
              <p className="text-[1rem] lg:text-[1.5rem] font-medium leading-[1.25rem] lg:leading-[1.875rem]">
                CEO /Lead Real Estate Advisor
              </p>
            </div>
            <div className="flex py-[0.42919rem] px-[0.5365rem] items-center justify-center rounded-[2.33794rem] bg-[#F8F8F8]">
              <Image
                src={"/ceo/LinkedIn.png"}
                width={39}
                height={39}
                alt="media"
                className="w-[2.45113rem] h-[2.45113rem]"
              />
              <Image
                src={"/ceo/Facebook.png"}
                width={39}
                height={39}
                alt="media"
                className="w-[2.45113rem] h-[2.45113rem]"
              />
              <Image
                src={"/ceo/Instagram.png"}
                width={39}
                height={39}
                alt="media"
                className="w-[2.45113rem] h-[2.45113rem]"
              />
              <Image
                src={"/ceo/Tiktok.png"}
                width={39}
                height={39}
                alt="media"
                className="w-[2.45113rem] h-[2.45113rem]"
              />
            </div>
          </div>
          <Image
            src={"/ceo/ceo1.png"}
            width={400}
            height={544}
            alt="image"
            className="w-[21rem] lg:w-[25rem] lg:h-[34rem] h-[29rem] object-cover bg-no-repeat ceo-img"
          />
        </div>
        <div className="flex flex-col items-start shrink-0">
          <BiSolidQuoteLeft className="h-[4rem] lg:h-[5rem] w-[4rem] lg:w-[5rem]" />
          <h2 className="text-[1.5rem] lg:text-[2rem] leading-[1.875rem] lg:leading-[2.375rem] xl:w-[18.375rem]">
            Your Money deserves the Right Investment
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MeetCeo;
