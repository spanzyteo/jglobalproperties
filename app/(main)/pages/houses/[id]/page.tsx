'use client'
import ContactSection2 from '@/app/(main)/components/contact/ContactSection2';
import HouseIdContent from '@/app/(main)/components/houseId/HouseIdContent';
import HouseIdHero from '@/app/(main)/components/houseId/HouseIdHero';
import { notFound, useParams } from 'next/navigation';
import React from 'react'

const HouseId = () => {
  const { id: houseId } = useParams()

  // If house not found, show 404
  if (!houseId) {
    notFound()
  }
  return (
    <div>
      <HouseIdHero currentHouseId={houseId} />
      <div className="bg-[#fffcfc] px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-4">
        <HouseIdContent currentHouseId={houseId}/>
        <ContactSection2 />
      </div>
    </div>
  );
}

export default HouseId;