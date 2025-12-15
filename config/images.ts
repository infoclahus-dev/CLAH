// Centralized image configuration for CLAH Ecosystem
// Uses local images from public folder

/**
 * Fallback image URL to use when an image fails to load
 */
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
      '/ncadesigns1.jpg',
      '/ncadesigns2.png',
      'https://i.postimg.cc/z86gcY0V/ncadesigns4.jpg',
      '/ncadesigns4.jpg',
      '/ncadesigns6.jpg',
      '/ncadesigns7.jpg',
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
    main: '/ncmcafe.jpeg',
    gallery: [
      '/ncmcafe1.jpeg',
      '/ncmcafe2.jpeg',
      '/ncmcafe3.jpeg',
      '/ncmcafe4.jpeg',
      '/ncmcafe5.jpg',
    ]
  }
} as const;

// Helper to get image with fallback
export function getImageWithFallback(url: string | undefined, fallback = FALLBACK_IMAGE): string {
  return url || fallback;
}
