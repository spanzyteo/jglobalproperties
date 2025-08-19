"use client";

const About = () => {
  return (
    <div className="flex flex-col gap-[3.25rem] mt-[3rem] lg:mt-[9.13rem] px-[2rem] lg:px-[11.19rem]">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-[1.5rem] lg:text-[3rem] font-bold text-center leading-[1.75rem] lg:leading-[3.25rem]">
            About JGLOBAL Properties
          </h1>
          <p className="max-w-[67.625rem] text-[#616161] text-[1rem] lg:text-[1.5rem] font-normal lg:leading-[1.75rem] leading-[1.25rem] text-justify">
            Jglobal Properties is guided by a clear vision to help individuals
            identify and leverage the opportunities in the real estate market
            significantly to increase their cash flow while providing extensive
            support in navigating the complexities of the real estate market.
            Our approach is centered around personalized strategies, as we
            prioritize understanding your unique needs and goals, recognizing
            that each client’s investment objectives are distinct.
          </p>
        </div>
        <button className="flex items-center justify-center lg:py-4 py-3 lg:px-8 px-6 rounded-[0.5rem] bg-[#941A1A] text-white cursor-pointer">
          <p
            className={`text-[0.875rem] lg:text-[1rem] font-medium leading-[1.125rem] lg:leading-[1.25rem] `}
          >
            Learn More
          </p>
        </button>
      </div>
      <video
        controls
        autoPlay
        src="/ceo.mp4"
        className="rounded-[1.25rem] lg:rounded-[2.8125rem] h-[12.31131rem] lg:h-[38.27831rem] video-class object-cover"
      ></video>
    </div>
  );
};

export default About;
