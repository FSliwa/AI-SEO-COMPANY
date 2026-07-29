'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EventAccordionRow } from './EventAccordionRow';
import { eventsData, accordionData } from '@/lib/eventsData';

export const EventsSection = () => {
  return (
    <section className="bg-[#0b0b0b] text-white py-20 px-4 md:px-16 lg:px-24">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-10 text-right">
          <p className="text-amber-500 font-sans text-sm tracking-wide mb-2 uppercase">
            Przeżyj wydarzenia specjalne MADAMe Thai
          </p>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wider">
            Wydarzenia
          </h2>
        </div>

        <div className="border border-white/15 divide-y divide-white/15 bg-black/40">
          {eventsData.map((event) => (
            <div 
              key={event.id} 
              className="grid grid-cols-1 lg:grid-cols-12 min-h-[220px] hover:bg-white/[0.02] transition-colors"
            >
              <div className="lg:col-span-4 relative min-h-[200px] border-b lg:border-b-0 lg:border-r border-white/15">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              <div className="lg:col-span-5 p-8 flex items-center border-b lg:border-b-0 lg:border-r border-white/15">
                <h3 className="font-serif text-xl md:text-2xl uppercase tracking-wide leading-tight">
                  {event.title}
                </h3>
              </div>

              <div className="lg:col-span-3 p-8 flex flex-col justify-between items-end text-right">
                {event.categoryTag ? (
                  <span className="text-xs uppercase tracking-widest text-gray-400">
                    {event.categoryTag}
                  </span>
                ) : <div />}
                
                <Link
                  href={event.actionUrl || '#'}
                  className="inline-flex items-center gap-2 text-amber-500 hover:text-white transition-colors text-sm uppercase tracking-wider mt-6"
                >
                  {event.actionText || 'Zarezerwuj stolik'} <span>&gt;</span>
                </Link>
              </div>
            </div>
          ))}

          <EventAccordionRow data={accordionData} />
        </div>
      </div>
    </section>
  );
};
