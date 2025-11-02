import { useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { Button } from '../shared/Button';
import { AudioRecorder } from '../shared/AudioRecorder';

export const AudioInput = ({ onNext, onBack }) => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcription, setTranscription] = useState('');

  const handleRecordingComplete = (blob) => {
    setAudioBlob(blob);
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
    
    // Aquí se enviará el audio al backend para transcribirlo con Whisper
    // Por ahora simulamos la transcripción
    setTimeout(() => {
      setTranscription('Ejemplo: tengo tomates, pasta, pollo y queso...');
    }, 1000);
  };

  const handleReset = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setTranscription('');
  };

  const handleNext = () => {
    if (!audioBlob) {
      return;
    }
    onNext({ 
      audioBlob,
      transcription,
      inputType: 'audio' 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Dicta tus ingredientes
        </h2>
        <p className="text-gray-600">
          Graba un audio listando lo que tienes en tu nevera
        </p>
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
        <AudioRecorder
          onRecordingComplete={handleRecordingComplete}
          onReset={handleReset}
        />

        {audioUrl && (
          <div className="mt-6 space-y-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Volume2 className="w-5 h-5 text-primary-600" />
                <p className="text-sm font-medium text-gray-700">Tu grabación</p>
              </div>
              <audio src={audioUrl} controls className="w-full" />
            </div>

            {transcription && (
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Transcripción
                </p>
                <p className="text-gray-600">{transcription}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Consejo:</strong> Habla claro y menciona cada ingrediente. 
          Por ejemplo: "Tengo tomates, pasta, pollo, ajo y aceite de oliva"
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={onBack} variant="outline" fullWidth>
          Atrás
        </Button>
        <Button onClick={handleNext} fullWidth disabled={!audioBlob}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};
