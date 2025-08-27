import Link from "next/link";
import Image from "next/image";

const OurStory = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row lg:py-[5.75rem] py-[3rem] px-[2rem] lg:px-[5rem] items-start justify-center lg:gap-[4.875rem] gap-8">
      <div className="flex flex-col lg:w-[27.3125rem] items-center gap-[1.05rem] lg:gap-[1.325rem]">
        <div className="py-[2.79319rem] lg:py-[3.5rem] lg:px-[2.9375rem] px-[2.34431rem] flex flex-col justify-center items-center">
          <div className="flex flex-col items-center lg:gap-4 gap-[0.8rem] w-full">
            <Image
              width={272}
              height={336}
              alt="image"
              src={"/ceo/ceo2.png"}
              className="h-[13rem] lg:h-[17rem] w-[16rem] lg:w-[21rem] object-cover"
            />
            <h3 className="text-[#616161] text-[0.625rem] lg:text-[0.75rem] leading-[0.79806rem] lg:leading-[1rem] text-center">
              No long stories, just real answers, simply explained so that
              anyone can understand what to do and what to avoid when it comes
              to land titles.
            </h3>
          </div>
        </div>
        <Link
          href={""}
          className="flex lg:py-4 py-[0.8rem] px-[1.6rem] lg:px-8 justify-center items-center rounded-[0.5rem] bg-[#941A1A] w-full text-white text-[0.8rem] lg:text-[1rem] font-medium lg:leading-[1.25rem] leading-[1rem]"
        >
          Order a copy
        </Link>
      </div>
      <div className="flex flex-col items-start gap-2 lg:gap-4 lg:w-[47.8rem]">
        <h1 className="text-[1.25rem] md:text-[3rem] font-semibold leading-[1.625rem] lg:leading-[3.5rem]">
          Our Story
        </h1>
        <div className="text-[1rem] lg:text-[1.4rem] leading-[1.25rem] lg:leading-[1.875rem] text-[#616161]">
          A few years ago, I wanted to buy land but also completely lost.
          Everywhere I turned, there was a lot of information but no clear
          answers. One person says this, another says that. The internet? Full
          of vague information, conflicting advice, and half-truths. I kept
          thinking,{" "}
          <span className="font-medium italic">
            “Why is something as important as LAND this confusing?”
          </span>
          <br />
          <p className="mt-4 mb-2">
            Instead of rushing into it, I paused and started looking for answers
            on how land ownership works in Nigeria.{" "}
            <span className="font-medium">
              “The laws that govern each location, the documentation that
              supports legal ownership, and the due diligence that shields you
              from wrong investments.”
            </span>
          </p>
          <br />
          The more I learned, the more I saw how many people were falling into
          traps simply because they didn’t know better. That was the beginning
          of Jglobal Properties. I started because I saw a gap and I knew I
          could fill it. That same journey birthed something else too: An eBook
          that breaks down one of the biggest pain points in Nigerian real
          estate &quot;Title Documentation.&quot;
        </div>
      </div>
    </div>
  );
};

export default OurStory;
