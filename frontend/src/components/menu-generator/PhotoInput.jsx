import { useState } from 'react';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { Button } from '../shared/Button';
import { FileUpload } from '../shared/FileUpload';
import { useImageUpload } from '../../hooks/useImageUpload';

export const PhotoInput = ({ onNext, onBack }) => {
  const [preview, setPreview] = useState(null);
  const { uploadImage, uploading, error } = useImageUpload();

  const handleFileSelect = async (file) => {
    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Subir imagen
    const url = await uploadImage(file, 'fridge-photos');
    if (url) {
      // La imagen se guardó exitosamente
      console.log('Imagen subida:', url);
    }
  };

  const handleNext = () => {
    if (!preview) {
      return;
    }
    // Aquí se enviará la imagen al backend para procesarla con Vision AI
    onNext({ 
      photoUrl: preview,
      inputType: 'photo' 
    });
  };

  const handleRemovePhoto = () => {
    setPreview(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Saca una foto de tu nevera
        </h2>
        <p className="text-gray-600">
          Nuestro asistente identificará los ingredientes automáticamente
        </p>
      </div>

      {!preview ? (
        <FileUpload
          accept="image/*"
          onFileSelect={handleFileSelect}
          disabled={uploading}
        >
          <div className="text-center py-12">
            {uploading ? (
              <>
                <Loader2 className="w-12 h-12 text-primary-600 mx-auto mb-4 animate-spin" />
                <p className="text-gray-600">Subiendo imagen...</p>
              </>
            ) : (
              <>
                <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-primary-600" />
                </div>
                <p className="text-gray-900 font-medium mb-1">
                  Haz clic para tomar una foto
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  o arrastra una imagen aquí
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Upload className="w-4 h-4" />
                  JPG, PNG o WEBP (máx. 5MB)
                </div>
              </>
            )}
          </div>
        </FileUpload>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Vista previa"
            className="w-full rounded-lg shadow-md"
          />
          <Button
            onClick={handleRemovePhoto}
            variant="outline"
            className="absolute top-2 right-2 bg-white"
          >
            Cambiar foto
          </Button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <div className="flex gap-3 pt-4">
        <Button onClick={onBack} variant="outline" fullWidth>
          Atrás
        </Button>
        <Button onClick={handleNext} fullWidth disabled={!preview || uploading}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};
