import Image from "next/image";
import { team, TeamData } from "../utils/team";
import Review from "../components/home/Review";
import ViewProperties from "../components/ViewProperties";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

const About = () => {
  return (
    <>
      <div className="mt-[4rem] lg:mt-[6rem] py-[2.5rem] lg:py-[5.06rem] px-8 lg:px-[5rem]">
        <div className="flex flex-col items-center lg:flex-start lg:gap-[5rem] gap-[2.5rem]">
          <h1 className="text-center text-[1.5rem] lg:text-[4rem] font-bold lg:leading-[4.5rem] leading-[1.875rem] lg:max-w-[40rem]">
            About Us At JGLOBAL Properties
          </h1>
          <div className="flex lg:flex-row flex-col-reverse items-center gap-8">
            <div className="flex flex-col justify-center items-start gap-2 lg:gap-4">
              <h2 className="lg:text-[2.25rem] text-[1.25rem] font-semibold leading-[1.625rem] lg:leading-[2.625rem]">
                Our Vision
              </h2>
              <p className="text-justify text-[#616161] text-[1rem] lg:text-[1.5rem] leading-[1.375rem] lg:leading-[1.875rem] lg:max-w-[40rem]">
                Jglobal Properties is guided by a clear vision to help
                individuals identify and leverage the opportunities in the real
                estate market significantly to increase their cash flow while
                providing extensive support in navigating the complexities of
                the real estate market. Our approach is centered around
                personalized strategies, as we prioritize understanding your
                unique needs and goals, recognizing that each client&apos;s
                investment objectives are distinct.
              </p>
            </div>
            <Image
              width={515}
              height={442}
              src={"/about/about1.png"}
              alt="about"
              className="lg:w-[32.1875rem] lg:h-[27.625rem] h-[18.625rem] rounded-[0.75rem] object-cover about1-img"
            />
          </div>
          <div className="flex lg:flex-row flex-col items-center gap-8">
            <Image
              width={515}
              height={442}
              src={"/about/about2.png"}
              alt="about"
              className="lg:w-[32.1875rem] lg:h-[27.625rem] h-[18.625rem] rounded-[0.75rem] object-cover about1-img"
            />
            <div className="flex flex-col justify-center items-start gap-2 lg:gap-4">
              <h2 className="lg:text-[2.25rem] text-[1.25rem] font-semibold leading-[1.625rem] lg:leading-[2.625rem]">
                Our Commitment
              </h2>
              <p className="text-justify text-[#616161] text-[1rem] lg:text-[1.5rem] leading-[1.375rem] lg:leading-[1.875rem] lg:max-w-[40rem]">
                We understand that real estate goes beyond buying a home, it is
                a pathway to building wealth, securing your future, and creating
                a legacy, that is why we tailor our strategies to align with
                your specific requirements ensuring that your investment not
                only meets but exceeds your financial objectives, yielding
                strong returns and sustainable income streams. With our
                commitment to excellence and dedication to your success,
                choosing us means partnering with a trusted ally on your journey
                toward your unique financial goals in the world of real estate!
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full p-[2.5rem] lg:pt-[10rem] xl:pb-[18rem] lg:px-[2.5rem] flex-col items-center justify-center gap-[0.625rem] bg-[#F8F8F8] rounded-[1.25rem] lg:rounded-[3.375rem] mt-[4.8rem]">
          <div className="flex flex-col items-center gap-[3.75rem]">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-[1.5rem] md:text-[2.75rem] lg:text-[3.75rem] font-bold lg:leading-[4.25rem] leading-[1.875rem]">
                Meet The Team
              </h1>
              <h3 className="text-[1rem] lg:text-[1.5rem] lg:font-medium leading-[1.25rem] lg:leading-[1.875rem] text-center">
                Brilliant Minds Who Bring Your Property Visions into Reality
              </h3>
            </div>
            <div className="flex flex-col xl:flex-row items-start gap-4">
              {team.map((item: TeamData, index: number) => (
                <div
                  key={item.id}
                  className="flex flex-col items-start rounded-[1rem] w-[17rem] xl:w-[17rem] group cursor-pointer relative"
                >
                  <Image
                    src={item.image}
                    alt="team"
                    width={289}
                    height={358}
                    className=" object-cover w-full h-full"
                  />
                  <div className="bg-white w-full py-[0.75rem] px-[0.875rem] flex-col items-start justify-center lg:rounded-b-none rounded-b-[0.875rem] overflow-hidden transition-all duration-300 ease-in-out">
                    <h3 className="text-[0.875rem] lg:text-[1rem] font-semibold leading-[1.125rem] lg:leading-[1.25rem]">
                      {item.name}
                    </h3>
                    <h3 className="text-[0.875rem] lg:text-[1rem] font-medium leading-[1.125rem] lg:leading-[1.25rem]">
                      {item.role}
                    </h3>
                  </div>
                  {/* Extended description section - seamlessly continues the white background */}
                  <div
                    className="xl:absolute xl:top-full left-0 w-full bg-white rounded-b-[0.875rem] lg:shadow-none shadow-none
                      max-h-[270px] xl:max-h-0 xl:group-hover:max-h-[250px] 
                      overflow-hidden transition-all duration-500 ease-in-out lg:z-10 lg:-mt-[1px] border-t-0"
                  >
                    <div className="px-[0.875rem] pb-[0.75rem] lg:pt-0 pt-2">
                      <p className="text-[0.875rem] lg:text-[1rem] leading-[1.125rem] lg:leading-[1.25rem] text-[#686868] w-[90%]">
                        {item.description}
                      </p>
                      {index === 0 && (
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-[0.125rem]">
                            <div className="flex py-[0.75rem] px-[0.625rem] justify-center items-center bg-[#FCFCFC] rounded-full media-shadow">
                              <Image
                                src={"/about/linkedin.svg"}
                                width={14}
                                height={14}
                                alt="logo"
                                className="w-[0.875rem] h-[0.86638rem] object-cover"
                              />
                            </div>
                            <div className="flex py-[0.75rem] px-[0.625rem] justify-center items-center bg-[#FCFCFC] rounded-full media-shadow">
                              <Image
                                src={"/about/facebook.svg"}
                                width={14}
                                height={14}
                                alt="logo"
                                className="w-[0.875rem] h-[0.86638rem] object-cover"
                              />
                            </div>
                            <div className="flex py-[0.75rem] px-[0.625rem] justify-center items-center bg-[#FCFCFC] rounded-full media-shadow">
                              <Image
                                src={"/about/instagram.svg"}
                                width={14}
                                height={14}
                                alt="logo"
                                className="w-[0.875rem] h-[0.86638rem] object-cover"
                              />
                            </div>
                            <div className="flex py-[0.75rem] px-[0.625rem] justify-center items-center bg-[#FCFCFC] rounded-full media-shadow">
                              <Image
                                src={"/about/tiktok.svg"}
                                width={14}
                                height={14}
                                alt="logo"
                                className="w-[0.875rem] h-[0.86638rem] object-cover"
                              />
                            </div>
                          </div>
                          <Link
                            href={"/about/ceo"}
                            className="flex w-[6.3125rem] py-2 px-2 gap-2 items-center justify-center rounded-[0.5rem] border border-[#941A1A] bg-white hover:bg-gray-200 transition-all duration-500 ease-in-out"
                          >
                            <h2 className="text-[0.75rem] font-medium leading-[1rem] text-[#941A1A] whitespace-nowrap">
                              See more
                            </h2>
                            <MdChevronRight className="text-[#941A1A] h-4 w-4 " />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Review />
      <div className="mt-24"></div>
      <ViewProperties />
    </>
  );
};

export default About;
