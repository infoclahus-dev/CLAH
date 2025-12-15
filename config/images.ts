// Centralized image configuration for CLAH Ecosystem
// Maps old local paths to Supabase Storage paths

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const STORAGE_BUCKET = 'clah-images';

/**
 * Get the full Supabase Storage URL for an image
 * @param path Path within the bucket (e.g., 'logos/clah.png')
 * @returns Full public URL
 */
export function getImageUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
}

/**
 * Fallback image URL to use when an image fails to load
 */
export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop';

// Image paths mapped to Supabase Storage
export const IMAGES = {
  // Logos
  logos: {
    clah: getImageUrl('logos/clah.png'),
    customHome: getImageUrl('logos/customhome.png'),
    ncaDesigns: getImageUrl('logos/ncadesigns.png'),
    designYourRooms: getImageUrl('logos/designyourrooms.png'),
    ncmCafe: getImageUrl('logos/ncmcafe.png'),
  },

  // Custom Home service images
  customHome: {
    main: getImageUrl('services/customhome/main.jpg'),
    gallery: [
      getImageUrl('services/customhome/1.jpg'),
      getImageUrl('services/customhome/2.jpg'),
      getImageUrl('services/customhome/3.jpg'),
      getImageUrl('services/customhome/4.jpg'),
      getImageUrl('services/customhome/5.jpg'),
    ]
  },

  // NCA Designs service images
  ncaDesigns: {
    main: getImageUrl('services/ncadesigns/1.jpg'),
    gallery: [
      getImageUrl('services/ncadesigns/main.jpg'),
      getImageUrl('services/ncadesigns/2.png'),
      getImageUrl('services/ncadesigns/3.png'),
      getImageUrl('services/ncadesigns/4.jpg'),
      getImageUrl('services/ncadesigns/6.jpg'),
      getImageUrl('services/ncadesigns/7.jpg'),
    ]
  },

  // Design Your Rooms service images
  designYourRooms: {
    main: getImageUrl('services/designyourrooms/main.jpg'),
    gallery: [
      getImageUrl('services/designyourrooms/1.jpg'),
      getImageUrl('services/designyourrooms/2.jpg'),
      getImageUrl('services/designyourrooms/3.jpg'),
      getImageUrl('services/designyourrooms/4.jpg'),
      getImageUrl('services/designyourrooms/5.jpg'),
    ]
  },

  // NCM Cafe service images
  ncmCafe: {
    main: getImageUrl('services/ncmcafe/main.jpeg'),
    gallery: [
      getImageUrl('services/ncmcafe/1.jpeg'),
      getImageUrl('services/ncmcafe/2.jpeg'),
      getImageUrl('services/ncmcafe/3.jpeg'),
      getImageUrl('services/ncmcafe/4.jpeg'),
      getImageUrl('services/ncmcafe/5.jpg'),
    ]
  }
} as const;

// Helper to get image with fallback
export function getImageWithFallback(url: string | undefined, fallback = FALLBACK_IMAGE): string {
  return url || fallback;
}
