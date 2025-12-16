export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop';

// Image paths using local public folder
export const IMAGES = {
  // Logos
  logos: {
    clah: '/clah.png',
    customHome: '/customhomelogo.png',
    ncaDesigns: '/ncadesignslogo.png',
    designYourRooms: '/designyourrooms.png',
    ncmCafe: '/ncmcafelogo.png',
  },

  // Custom Home service images
  customHome: {
    main: '/customhome.jpg',
    gallery: [
      '/customhome1.jpg',
      '/customhome2.jpg',
      '/customhome3.jpg',
      '/customhome4.jpg',
      '/customhome5.jpg',
    ]
  },

  // NCA Designs service images
  ncaDesigns: {
    main: '/ncadesigns.jpg',
    gallery: [
      'https://i.postimg.cc/xnhz4VtC/ncadesigns3.png',
      'https://i.postimg.cc/ZqTRpHm1/ncadesigns6.jpg',
      'https://i.postimg.cc/CxC5RXyS/ncadesigns7.jpg',
      'https://i.postimg.cc/3wKRm1h6/ncadesigns5.jpg',
      'https://i.postimg.cc/Jz30svwL/ncadesigns4.jpg',
      'https://i.postimg.cc/P5bJCcg4/ncadesigns1.jpg',
    ]
  },

  // Design Your Rooms service images
  designYourRooms: {
    main: '/designyourroom.jpg',
    gallery: [
      '/designyourroom1.jpg',
      '/designyourroom2.jpg',
      '/designyourroom3.jpg',
      '/designyourroom4.jpg',
      '/designyourroom5.jpg',
    ]
  },

  // NCM Cafe service images
  ncmCafe: {
    main: 'https://i.postimg.cc/vmQBfhMT/ncmcafe4.jpg',
    gallery: [
      '/ncmcafe1.jpeg',
      '/ncmcafe2.jpeg',
      '/ncmcafe3.jpeg',
      '/ncmcafe4.jpeg',
      '/ncmcafe5.jpg',
    ]
  }
} as const;
