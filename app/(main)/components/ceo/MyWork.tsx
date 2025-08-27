import Link from "next/link";
import Image from "next/image";

const MyWork = () => {
  return (
    <div className="flex lg:pb-[9.5rem] py-[2.9rem] px-8 lg:px-[5rem] flex-col items-center lg:gap-[3.5rem]">
      <div className="flex lg:flex-row flex-col items-start lg:gap-[6.9rem] gap-8 w-full">
        <div className="flex flex-col lg:w-[45rem] items-start gap-2 lg:gap-[2.5rem]">
          <h2 className="text-black text-[1.25rem] md:text-[2rem] lg:text-[2.25rem] font-semibold leading-[1.6rem] lg:leading-[2.6rem]">
            What Guides My Work?
          </h2>
          <p className="lg:text-justify text-[1rem] lg:text-[1.5rem] lg:leading-[1.875rem] leading-[1.25rem]  ">
            At the heart of everything I do is &quot;Excellence.&quot; I do it
            right even when no one is watching, your investment goal is what
            drives my strategy, my platforms are dedicated to simplifying the
            complexity of the market so you can make smart, and informed
            decisions. I am committed to helping you win &quot;Wisely.&quot; My
            job is to help you make sense of the market, avoid costly mistakes,
            and walk boldly into your next real estate investment with clarity.
            Because with the right knowledge and the right people, success in
            real estate is guaranteed.
          </p>
        </div>
        <div className="flex flex-col lg:w-[27rem] items-start gap-4 lg:gap-6">
          <div className="flex flex-col py-2 lg:py-3 px-2 lg:px-3 items-start gap-4 lg:gap-[1.3rem]">
            <div className="flex flex-col items-start lg:gap-[1.8rem] gap-[1.4rem]">
              <Image
                width={48}
                height={48}
                src={"/ceo/check1.png"}
                alt="check"
                className="w-[2.3rem] lg:w-12 h-[2.3rem] lg:h-12"
              />
              <div className="flex flex-col items-start lg:gap-2 gap-[0.39rem]">
                <h3 className="text-[1rem] lg:text-[1.25rem] font-medium leading-[1.27rem] lg:leading-[1.625rem]">
                  Join our investors list
                </h3>
                <p className="text-[0.78rem] lg:text-[1rem] lg:leading-[1.25rem] leading-[1rem] text-black">
                  Gain early access to exclusive real estate opportunities. Join
                  our waitlist to secure priority access to investment
                  opportunities before they are made public.
                </p>
              </div>
            </div>
            <Link
              href={""}
              className="py-[0.78rem] lg:py-4 px-[1.5rem] lg:px-8 flex items-center justify-center rounded-[0.5rem] bg-[#941A1A] text-[0.78rem] lg:text-[1rem] font-medium leading-[1rem] lg:leading-[1.25rem] text-white w-full"
            >
              Register
            </Link>
          </div>
          <div className="flex flex-col py-2 lg:py-3 px-2 lg:px-3 items-start gap-4 lg:gap-[1.3rem]">
            <div className="flex flex-col items-start lg:gap-[1.8rem] gap-[1.4rem]">
              <Image
                width={48}
                height={48}
                src={"/ceo/check2.png"}
                alt="check"
                className="w-[2.3rem] lg:w-12 h-[2.3rem] lg:h-12"
              />
              <div className="flex flex-col items-start lg:gap-2 gap-[0.39rem]">
                <h3 className="text-[1rem] lg:text-[1.25rem] font-medium leading-[1.27rem] lg:leading-[1.625rem]">
                  Book a consultation
                </h3>
                <p className="text-[0.78rem] lg:text-[1rem] lg:leading-[1.25rem] leading-[1rem] text-black">
                  Gain early access to exclusive real estate opportunities. Join
                  our waitlist to secure priority access to investment
                  opportunities before they are made public.
                </p>
              </div>
            </div>
            <Link
              href={""}
              className="py-[0.78rem] lg:py-4 px-[1.5rem] lg:px-8 flex items-center justify-center rounded-[0.5rem] bg-[#941A1A] text-[0.78rem] lg:text-[1rem] font-medium leading-[1rem] lg:leading-[1.25rem] text-white w-full"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyWork