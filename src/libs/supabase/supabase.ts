import { createClient } from '@supabase/supabase-js';
import { compressImage } from '../sharpe/sharpe';

const supabaseUrl = 'https://ylbgmhtllnhdkqwpgnkp.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsYmdtaHRsbG5oZGtxd3BnbmtwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTQ1MDc0NiwiZXhwIjoyMDYxMDI2NzQ2fQ.AKIBfxOJ8VmT3OnmnU5J0qzSFhApd1-bLsSVZI84_vE';

export const uploadImageSupabase = async (
  fileBuffer: Express.Multer.File,
): Promise<string> => {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });

    // Comprime a imagem e converte para WebP
    const compressedBuffer = await compressImage(fileBuffer);

    const fileName = fileBuffer.originalname.replace(/\.[^/.]+$/, '') + '.webp';

    // Faz o upload da imagem
    const { data, error } = await supabase.storage
      .from('cubos')
      .upload(fileName, compressedBuffer, {
        upsert: true,
      });

    if (error || !data) {
      throw new Error(error?.message || 'Upload failed');
    }

    // Gera a URL pública do arquivo enviado
    const { data: publicUrlData } = supabase.storage
      .from('cubos')
      .getPublicUrl(data.path); // Use data.path para pegar o caminho correto do arquivo

    // Retorna a URL pública como string
    return publicUrlData.publicUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};
