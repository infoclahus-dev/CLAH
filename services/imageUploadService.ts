// Service for uploading and managing images in Supabase Storage
import { supabase } from '../lib/supabase';

const BUCKET_NAME = 'clah-images';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload an image file to Supabase Storage
 * @param file The image file to upload
 * @param path The path within the bucket (e.g., 'logos/clah.png')
 * @returns Upload result with public URL or error
 */
export async function uploadImage(file: File, path: string): Promise<UploadResult> {
  try {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/tiff'];
    if (!validTypes.includes(file.type)) {
      return {
        success: false,
        error: 'Invalid file type. Please upload an image file.'
      };
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'File size exceeds 10MB limit.'
      };
    }

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true // Replace existing file if it exists
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);

    return {
      success: true,
      url: urlData.publicUrl
    };
  } catch (error) {
    console.error('Upload exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Get public URL for an image in Supabase Storage
 * @param path The path within the bucket
 * @returns Public URL for the image
 */
export function getImageUrl(path: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);

  return data.publicUrl;
}

/**
 * Delete an image from Supabase Storage
 * @param path The path within the bucket
 * @returns Success status
 */
export async function deleteImage(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete exception:', error);
    return false;
  }
}

/**
 * List all images in a folder
 * @param folder The folder path (e.g., 'logos')
 * @returns Array of file objects
 */
export async function listImages(folder: string = '') {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('List error:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('List exception:', error);
    return [];
  }
}

// Image mappings for migration from local files to Supabase Storage
export const IMAGE_MAPPINGS = {
  // Logos
  'clah.png': 'logos/clah.png',
  'customhomelogo.png': 'logos/customhome.png',
  'ncadesignslogo.png': 'logos/ncadesigns.png',
  'designyourrooms.png': 'logos/designyourrooms.png',
  'ncmcafelogo.png': 'logos/ncmcafe.png',

  // Custom Home images
  'customhome.jpg': 'services/customhome/main.jpg',
  'customhome1.jpg': 'services/customhome/1.jpg',
  'customhome2.jpg': 'services/customhome/2.jpg',
  'customhome3.jpg': 'services/customhome/3.jpg',
  'customhome4.jpg': 'services/customhome/4.jpg',
  'customhome5.jpg': 'services/customhome/5.jpg',

  // NCA Designs images
  'ncadesigns.jpg': 'services/ncadesigns/main.jpg',
  'ncadesigns1.jpg': 'services/ncadesigns/1.jpg',
  'ncadesigns2.png': 'services/ncadesigns/2.png',
  'ncadesigns3.png': 'services/ncadesigns/3.png',
  'ncadesigns4.jpg': 'services/ncadesigns/4.jpg',
  'ncadesigns5.tif': 'services/ncadesigns/5.tif',
  'ncadesigns6.jpg': 'services/ncadesigns/6.jpg',
  'ncadesigns7.jpg': 'services/ncadesigns/7.jpg',

  // Design Your Rooms images
  'designyourroom.jpg': 'services/designyourrooms/main.jpg',
  'designyourroom1.jpg': 'services/designyourrooms/1.jpg',
  'designyourroom2.jpg': 'services/designyourrooms/2.jpg',
  'designyourroom3.jpg': 'services/designyourrooms/3.jpg',
  'designyourroom4.jpg': 'services/designyourrooms/4.jpg',
  'designyourroom5.jpg': 'services/designyourrooms/5.jpg',

  // NCM Cafe images
  'ncmcafe.jpeg': 'services/ncmcafe/main.jpeg',
  'ncmcafe1.jpeg': 'services/ncmcafe/1.jpeg',
  'ncmcafe2.jpeg': 'services/ncmcafe/2.jpeg',
  'ncmcafe3.jpeg': 'services/ncmcafe/3.jpeg',
  'ncmcafe4.jpeg': 'services/ncmcafe/4.jpeg',
  'ncmcafe5.jpg': 'services/ncmcafe/5.jpg',
  'ncm_4.jpg': 'services/ncmcafe/4-alt.jpg'
};
