import { Playfair_Display } from "next/font/google";
import { Roboto } from "next/font/google";
import { Roboto_Slab } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const WithUs = () => {
  return (
    <div className="py-20 px-5 md:px-6 flex flex-col md:flex-row items-center md:justify-between gap-8 bg-gray-50">
      <div className="flex flex-col items-center md:items-start gap-8">
        <div className="flex items-center gap-3 text-[15px]">
          <div className="h-3 w-3 rounded-full border-2 border-[#941A1A]"></div>
          <h1>WHY WORK WITH US</h1>
        </div>
        <h1
          className={`${playfair.className} text-[34px] md:text-[45px] max-w-[625px] text-center md:text-left`}
        >
          Your Trusted Real Estate Partner
        </h1>
        <p
          className={`${roboto.className} max-w-[650px] text-[18px] leading-[32px] text-center md:text-left`}
        >
          From start to finish, Jglobalsproperties made the entire process
          smooth and stress-free. Their expertise and guidance were invaluable,
          and we highly recommend them to anyone in need of real estate
          services. With her years of experience, impressive property portfolio,
          celebrity clientele, and unparalleled knowledge of the market and
          pedigree estates.
        </p>
        <div className="flex items-center gap-4">
          <Image
            src={"/joan.png"}
            alt="ceo"
            height={60}
            width={60}
            className="h-[60px] w-[60px] object-cover rounded-full"
          />
          <div className="flex flex-col">
            <h3
              className={`${playfair.className} text-[18px] font-medium leading-[27px]`}
            >
              Joan Obi-Okuhon
            </h3>
            <h3
              className={`${robotoSlab.className} text-[#941A1A] leading-[31px] text-[15px]`}
            >
              CEO, Jglobalproperties
            </h3>
          </div>
        </div>
      </div>
      <div className="lg:h-[546px] md:h-[503px] h-[452px]">
        <Image
          src={"/team/joan.webp"}
          alt="ceo"
          width={520}
          height={546}
          className="bg-[#F4E8E8] h-full w-full md:max-w-[520px] object-cover rounded-tr-[5px] rounded-tl-[50px] rounded-br-[50px] rounded-bl-[5px]"
        />
      </div>
    </div>
  );
};

export default WithUs;
