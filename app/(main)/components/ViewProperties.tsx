import Link from 'next/link';
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri';

const ViewProperties = () => {
  return (
    <div className="flex py-[2.2rem] lg:py-[5.375rem] px-[2rem] lg:px-[5rem] items-center justify-center bg-[#F8F8F8] ">
      <div className="flex flex-col lg:flex-row lg:p-[0.625rem] items-start lg:items-center gap-[1.0625rem] lg:justify-between shrink-0 w-full">
        <div className="flex flex-col items-start gap-4 shrink-0 lg:w-[35rem]">
          <h1 className="text-[1.5rem] lg:text-[2.5rem] font-bold leading-[1.75rem] lg:leading-[3rem]">
            Check Our Latest Properties
          </h1>
          <h3 className="text-[1rem] lg:text-[1.5rem] leading-[1.25rem] lg:leading-[1.75rem]">
            Unlock the potential rewards of investing in real estate.
          </h3>
        </div>
        <Link
          href={"/properties"}
          className="bg-gray-100 flex py-[0.75rem] lg:py-[1.5rem] px-[1.5rem] lg:px-[3rem] items-center rounded-[0.75rem] gap-2"
        >
          <h1 className="text-[#941A1A] text-[1.125rem] lg:text-[1.5rem] font-medium leading-[1.5rem] lg:leading-[1.875rem] whitespace-nowrap">
            See All Properties
          </h1>
          <RiArrowRightSLine className="h-[1.875rem] w-[1.875rem] text-[#941A1A] mt-1" />
        </Link>
      </div>
    </div>
  );
}

export default ViewProperties