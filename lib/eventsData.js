export const eventsData = [
  {
    id: 'event-1',
    title: 'DEKADA SMAKÓW I AROMATÓW',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop',
    actionText: 'Zarezerwuj stolik',
    actionUrl: '/rezerwacja'
  },
  {
    id: 'event-2',
    title: 'TAJSKA UCZTA NA FIRMOWE SPOTKANIA I IMPREZY OKOLICZNOŚCIOWE!',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
    categoryTag: 'Obiad / Kolacja',
    actionText: 'Zarezerwuj',
    actionUrl: '/rezerwacja'
  }
];

export const accordionData = {
  id: 'event-group-1',
  mainImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
  items: [
    {
      id: 'sub-1',
      title: 'Imprezy okolicznościowe',
    },
    {
      id: 'sub-2',
      title: 'Imprezy zamknięte',
    },
    {
      id: 'sub-3',
      title: 'Oferta dla firm',
    },
    {
      id: 'sub-4',
      title: 'Usługi cateringowe',
      description: 'Planujesz spotkanie, ale nie masz czasu gotować? Zaskocz swoich gości autentycznymi smakami prosto z Azji! Nasz catering to idealne rozwiązanie na firmowe eventy, rodzinne uroczystości czy kameralne spotkania w domu.',
      buttonText: 'Napisz do nas',
      buttonUrl: 'mailto:kontakt@madamethai.pl'
    }
  ]
};
