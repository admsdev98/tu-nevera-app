import { useState, useEffect } from 'react';
import { FileText, Camera, Mic, Coffee, UtensilsCrossed, Cookie, Moon, ArrowLeft } from 'lucide-react';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { TextInput } from './TextInput';
import { PhotoInput } from './PhotoInput';
import { AudioInput } from './AudioInput';

export const QuickRecipeForm = ({ onNext, onBack }) => {
  const [selectedInput, setSelectedInput] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [textContent, setTextContent] = useState('');
  const [photoContent, setPhotoContent] = useState(null);
  const [audioContent, setAudioContent] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const inputMethods = [
    {
      id: 'text',
      icon: FileText,
      title: 'Escribir',
      description: 'Escribe los ingredientes',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      id: 'photo',
      icon: Camera,
      title: 'Foto',
      description: 'Saca una foto',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50'
    },
    {
      id: 'audio',
      icon: Mic,
      title: 'Audio',
      description: 'Dicta por voz',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50'
    }
  ];

  const mealTypes = [
    {
      id: 'breakfast',
      icon: Coffee,
      title: 'Desayuno',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'lunch',
      icon: UtensilsCrossed,
      title: 'Comida',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'snack',
      icon: Cookie,
      title: 'Merienda',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'dinner',
      icon: Moon,
      title: 'Cena',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const handleInputMethodSelect = (methodId) => {
    // Si ya hay uno seleccionado y tiene contenido, preguntar si quiere cambiar
    if (selectedInput && selectedInput !== methodId) {
      const hasContent = 
        (selectedInput === 'text' && textContent.trim()) ||
        (selectedInput === 'photo' && photoContent) ||
        (selectedInput === 'audio' && audioContent);
      
      if (hasContent) {
        const confirmed = confirm('Al cambiar de método se borrará el contenido actual. ¿Continuar?');
        if (!confirmed) return;
      }
      
      // Limpiar contenido anterior
      setTextContent('');
      setPhotoContent(null);
      setAudioContent(null);
      setIsRecording(false);
      setRecordingTime(0);
    }
    
    setSelectedInput(methodId);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const file = new File([blob], `audio-${Date.now()}.webm`, { type: 'audio/webm' });
        setAudioContent(file);
        stream.getTracks().forEach(track => track.stop());
        setRecordingTime(0);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error al acceder al micrófono:', error);
      alert('No se pudo acceder al micrófono. Por favor verifica los permisos.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // Temporizador para la grabación
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const hasAnyContent = () => {
    return (
      (selectedInput === 'text' && textContent.trim()) ||
      (selectedInput === 'photo' && photoContent) ||
      (selectedInput === 'audio' && audioContent)
    );
  };

  const getIngredients = () => {
    if (selectedInput === 'text') return textContent;
    if (selectedInput === 'photo') return photoContent?.name || 'Imagen seleccionada';
    if (selectedInput === 'audio') return audioContent?.name || 'Audio grabado';
    return '';
  };

  const handleSubmit = () => {
    if (!selectedInput || !selectedMealType || !hasAnyContent()) {
      alert('Por favor completa todos los campos');
      return;
    }

    onNext({
      recipeType: 'quick-recipe',
      inputMethod: selectedInput,
      mealType: selectedMealType,
      ingredients: getIngredients()
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm md:text-base">Volver</span>
        </button>
        
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Receta rápida
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Cuéntame qué ingredientes tienes y para qué comida
        </p>
      </div>

      {/* Método de entrada */}
      <Card className="p-5 md:p-6">
        <h3 className="font-semibold text-gray-900 mb-4">¿Cómo quieres ingresar los ingredientes?</h3>
        
        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
          {inputMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedInput === method.id;
            const hasContent = hasAnyContent();
            const isDisabled = hasContent && selectedInput !== method.id;
            
            return (
              <button
                key={method.id}
                onClick={() => handleInputMethodSelect(method.id)}
                disabled={isDisabled}
                className={`p-3 md:p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? `${method.bgColor} border-current ${method.color}`
                    : isDisabled
                    ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                    : 'bg-white border-gray-200 hover:border-gray-300 active:scale-95'
                }`}
              >
                <Icon className={`w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 ${
                  isSelected ? method.color : isDisabled ? 'text-gray-300' : 'text-gray-400'
                }`} />
                <p className={`text-xs md:text-sm font-medium ${
                  isSelected ? method.color : isDisabled ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {method.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Input específico según el método seleccionado */}
        {selectedInput === 'text' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Escribe tus ingredientes
            </label>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Ej: Tomates, pollo, arroz, cebolla..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm md:text-base"
            />
            <p className="text-xs text-gray-500 mt-1">
              {textContent.trim().length} caracteres
            </p>
          </div>
        )}

        {selectedInput === 'photo' && (
          <div className="mt-4">
            {!photoContent ? (
              <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-3">Sube o toma una foto de tus ingredientes</p>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPhotoContent(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="inline-block">
                  <div className="cursor-pointer bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Seleccionar foto
                  </div>
                </label>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Preview de la imagen */}
                <div className="relative rounded-lg overflow-hidden border-2 border-primary-200">
                  <img
                    src={URL.createObjectURL(photoContent)}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                {/* Info y botón eliminar */}
                <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Camera className="w-5 h-5 text-primary-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{photoContent.name}</p>
                        <p className="text-xs text-gray-500">{(photoContent.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPhotoContent(null)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium flex-shrink-0 ml-3"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedInput === 'audio' && (
          <div className="mt-4">
            {!audioContent ? (
              <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center">
                {!isRecording ? (
                  <>
                    <Mic className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-3">Graba un audio dictando tus ingredientes</p>
                    <button
                      onClick={startRecording}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
                    >
                      <Mic className="w-4 h-4" />
                      Iniciar grabación
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-lg font-mono font-semibold text-red-600">
                        {formatTime(recordingTime)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Grabando... Habla claro y cerca del micrófono</p>
                    <button
                      onClick={stopRecording}
                      className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Detener grabación
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {/* Visualización del audio */}
                <div className="p-4 bg-accent-50 border-2 border-accent-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mic className="w-5 h-5 text-accent-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Audio grabado</p>
                      <p className="text-xs text-gray-500">
                        {(audioContent.size / 1024).toFixed(1)} KB • {audioContent.type}
                      </p>
                    </div>
                  </div>
                  
                  {/* Reproductor de audio */}
                  <audio 
                    controls 
                    src={URL.createObjectURL(audioContent)} 
                    className="w-full mt-2"
                    style={{ height: '32px' }}
                  />
                </div>

                {/* Botón eliminar */}
                <button
                  onClick={() => setAudioContent(null)}
                  className="w-full text-red-600 hover:text-red-700 text-sm font-medium py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Eliminar audio
                </button>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Tipo de comida */}
      <Card className="p-5 md:p-6">
        <h3 className="font-semibold text-gray-900 mb-4">¿Para qué comida es?</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mealTypes.map((meal) => {
            const Icon = meal.icon;
            const isSelected = selectedMealType === meal.id;
            
            return (
              <button
                key={meal.id}
                onClick={() => setSelectedMealType(meal.id)}
                className={`p-4 md:p-5 rounded-lg border-2 transition-all ${
                  isSelected
                    ? `${meal.bgColor} border-current ${meal.color}`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 ${
                  isSelected ? meal.color : 'text-gray-400'
                }`} />
                <p className={`text-sm md:text-base font-medium ${
                  isSelected ? meal.color : 'text-gray-600'
                }`}>
                  {meal.title}
                </p>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Botón de continuar */}
      <Button
        onClick={handleSubmit}
        fullWidth
        size="large"
        disabled={!selectedInput || !selectedMealType || !hasAnyContent()}
        className="mt-6"
      >
        Generar receta
      </Button>
    </div>
  );
};
