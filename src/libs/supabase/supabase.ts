import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';
import { compressImage } from '../sharpe/sharpe';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('URL:', supabaseUrl); // para debug
console.log('KEY:', supabaseKey); // cuidado para não subir isso em produção

export const uploadImageSupabase = async (
  fileBuffer: Express.Multer.File,
): Promise<string> => {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });

    const compressedBuffer = await compressImage(fileBuffer);

    const fileName = fileBuffer.originalname.replace(/\.[^/.]+$/, '') + '.webp';

    const { data, error } = await supabase.storage
      .from('cubos')
      .upload(fileName, compressedBuffer, {
        upsert: true,
      });

    if (error || !data) {
      throw new Error(error?.message || 'Upload failed');
    }

    const { data: publicUrlData } = supabase.storage
      .from('cubos')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};
