import { supabase } from '../lib/supabase';

const BUCKET_NAME = 'clah-images';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadImage(file: File, path: string): Promise<UploadResult> {
  try {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/tiff'];
    if (!validTypes.includes(file.type)) {
      return {
        success: false,
        error: 'Invalid file type. Please upload an image file.'
      };
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'File size exceeds 10MB limit.'
      };
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }

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

export const IMAGE_MAPPINGS = {
  'clah.png': 'logos/clah.png',
  'customhomelogo.png': 'logos/customhome.png',
  'ncadesignslogo.png': 'logos/ncadesigns.png',
  'designyourrooms.png': 'logos/designyourrooms.png',
  'ncmcafelogo.png': 'logos/ncmcafe.png',
  'customhome.jpg': 'services/customhome/main.jpg',
  'customhome1.jpg': 'services/customhome/1.jpg',
  'customhome2.jpg': 'services/customhome/2.jpg',
  'customhome3.jpg': 'services/customhome/3.jpg',
  'customhome4.jpg': 'services/customhome/4.jpg',
  'customhome5.jpg': 'services/customhome/5.jpg',
  'ncadesigns.jpg': 'services/ncadesigns/main.jpg',
  'ncadesigns1.jpg': 'services/ncadesigns/1.jpg',
  'ncadesigns2.png': 'services/ncadesigns/2.png',
  'ncadesigns3.png': 'services/ncadesigns/3.png',
  'ncadesigns4.jpg': 'services/ncadesigns/4.jpg',
  'ncadesigns5.tif': 'services/ncadesigns/5.tif',
  'ncadesigns6.jpg': 'services/ncadesigns/6.jpg',
  'ncadesigns7.jpg': 'services/ncadesigns/7.jpg',
  'designyourroom.jpg': 'services/designyourrooms/main.jpg',
  'designyourroom1.jpg': 'services/designyourrooms/1.jpg',
  'designyourroom2.jpg': 'services/designyourrooms/2.jpg',
  'designyourroom3.jpg': 'services/designyourrooms/3.jpg',
  'designyourroom4.jpg': 'services/designyourrooms/4.jpg',
  'designyourroom5.jpg': 'services/designyourrooms/5.jpg',
  'ncmcafe.jpeg': 'services/ncmcafe/main.jpeg',
  'ncmcafe1.jpeg': 'services/ncmcafe/1.jpeg',
  'ncmcafe2.jpeg': 'services/ncmcafe/2.jpeg',
  'ncmcafe3.jpeg': 'services/ncmcafe/3.jpeg',
  'ncmcafe4.jpeg': 'services/ncmcafe/4.jpeg',
  'ncmcafe5.jpg': 'services/ncmcafe/5.jpg',
  'ncm_4.jpg': 'services/ncmcafe/4-alt.jpg'
};
