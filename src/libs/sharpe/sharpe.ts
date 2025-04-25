import sharp from 'sharp';

export const compressImage = async (fileBuffer: Express.Multer.File) => {
  try {
    const compressedBuffer = await sharp(fileBuffer.buffer)
      .resize({ fit: 'inside', width: 800 })
      .webp({ quality: 80 })
      .toBuffer();
    return compressedBuffer;
  } catch (error) {
    throw new Error(error.message);
  }
};
