'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export const EventAccordionRow = ({ data }) => {
  const [activeId, setActiveId] = useState(data.items[3]?.id || data.items[0].id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px]">
      <div className="lg:col-span-4 relative min-h-[300px] border-b lg:border-b-0 lg:border-r border-white/15">
        <Image
          src={data.mainImage}
          alt="Wydarzenia firmowe i catering"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      <div className="lg:col-span-8 divide-y divide-white/15 flex flex-col justify-between">
        {data.items.map((item) => {
          const isOpen = activeId === item.id;

          return (
            <div 
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`p-6 md:p-8 cursor-pointer transition-all duration-300 ${
                isOpen ? 'bg-white/[0.03]' : 'hover:bg-white/[0.01]'
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-xl md:text-2xl uppercase tracking-wide">
                  {item.title}
                </h3>
              </div>

              {isOpen && item.description && (
                <div className="mt-4 pt-2 animate-fadeIn">
                  <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mb-6">
                    {item.description}
                  </p>
                  {item.buttonText && (
                    <div className="flex justify-end">
                      <Link
                        href={item.buttonUrl || '#'}
                        className="border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black px-6 py-2.5 text-xs uppercase tracking-widest transition-all duration-300"
                      >
                        {item.buttonText}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
