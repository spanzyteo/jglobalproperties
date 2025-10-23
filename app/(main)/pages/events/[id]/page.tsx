'use client'

import ContactSection2 from '@/app/(main)/components/contact/ContactSection2'
import EventIdContent from '@/app/(main)/components/eventId/EventIdContent'
import EventIdHero from '@/app/(main)/components/eventId/EventIdHero'
import Contact from '@/app/(main)/components/home/Contact'
import { notFound, useParams } from 'next/navigation'
import React from 'react'

const EventId = () => {
  const { id: eventId } = useParams()

  if (!eventId) {
    notFound()
  }
  return (
    <div>
      <EventIdHero currentEventId={eventId} />
      <div className="bg-[#fffcfc] px-4 md:px-8 py-8 flex flex-col md:flex-row gap-4">
        <EventIdContent currentEventId={eventId} />
        <ContactSection2 />
      </div>
      <Contact />
    </div>
  );
}

export default EventId