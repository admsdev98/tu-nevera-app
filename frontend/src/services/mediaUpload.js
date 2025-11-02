export const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      resolve(reader.result);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsDataURL(file);
  });
};

export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Formato no válido. Usa JPG, PNG o WebP.',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'El archivo es demasiado grande. Máximo 10MB.',
    };
  }

  return { valid: true };
};

export const validateAudioFile = (file) => {
  const validTypes = ['audio/webm', 'audio/mp4', 'audio/mpeg', 'audio/wav'];
  const maxSize = 25 * 1024 * 1024; // 25MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Formato no válido. Usa WebM, MP4, MP3 o WAV.',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'El archivo es demasiado grande. Máximo 25MB.',
    };
  }

  return { valid: true };
};
