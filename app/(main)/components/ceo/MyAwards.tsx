import Image from "next/image";

const MyAwards = () => {
  return (
    <div className="lg:pb-[9.5rem] py-[3.6rem] px-8 lg:px-[5rem]">
      <div className="flex flex-col items-center lg:gap-[3.75rem] gap-8">
        <div className="flex flex-col lg:items-center gap-[0.65rem] lg:gap-4">
          <h1 className="text-[1.25rem] md:text-[2.5rem] lg:text-[3.75rem] font-bold leading-[1.625rem] lg:leading-[4.25rem]">
            Awards & Reviews
          </h1>
          <h3 className="text-[1rem] lg:text-[1.5rem] font-medium leading-[1.25rem] lg:leading-[1.875rem]">
            Recognition That Reflects Our Vision, Built On Trust And Results
          </h3>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4">
          <Image
            height={1036}
            width={732}
            src={"/ceo/ceo3.png"}
            alt="ceo"
            className="w-full lg:w-[32rem] xl:w-[45rem] h-[26rem] lg:h-[64.8rem] rounded-2xl object-cover"
          />
          <div className="flex flex-col items-start gap-3 lg:gap-4">
            <Image
              height={1036}
              width={732}
              src={"/ceo/ceo4.png"}
              alt="ceo"
              className="w-full lg:w-[45.8rem h-[26rem] lg:h-[41.7rem] rounded-2xl object-cover"
            />
            <Image
              height={355}
              width={529}
              src={"/ceo/ceo5.png"}
              alt="ceo"
              className="w-full lg:w-[33rem] h-[14.6rem] lg:h-[22rem] rounded-2xl border"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAwards