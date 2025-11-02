import { useState } from 'react';
import { uploadImage, validateImageFile } from '../services/mediaUpload';

export const useImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const selectImage = async (file) => {
    setError(null);

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return false;
    }

    try {
      setUploading(true);
      const preview = await uploadImage(file);
      setSelectedImage(file);
      setPreviewUrl(preview);
      setUploading(false);
      return true;
    } catch (err) {
      setError('Error al procesar la imagen');
      setUploading(false);
      return false;
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
  };

  return {
    selectedImage,
    previewUrl,
    error,
    uploading,
    selectImage,
    clearImage,
  };
};
