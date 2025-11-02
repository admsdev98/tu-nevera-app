import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import { Button } from './Button';

export const AudioRecorder = ({ onRecordingComplete }) => {
  const {
    isRecording,
    audioBlob,
    formattedDuration,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();

  const handleStop = () => {
    stopRecording();
  };

  const handleSave = () => {
    if (audioBlob && onRecordingComplete) {
      onRecordingComplete(audioBlob);
      resetRecording();
    }
  };

  const handleDiscard = () => {
    resetRecording();
  };

  return (
    <div className="w-full">
      {!audioBlob && !isRecording && (
        <Button onClick={startRecording} fullWidth variant="primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          Iniciar grabación
        </Button>
      )}

      {isRecording && (
        <div className="flex flex-col items-center gap-4 p-6 bg-red-50 rounded-lg border-2 border-red-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-700 font-medium">Grabando...</span>
          </div>
          <div className="text-3xl font-mono text-gray-900">{formattedDuration}</div>
          <Button onClick={handleStop} variant="danger">
            Detener grabación
          </Button>
        </div>
      )}

      {audioBlob && !isRecording && (
        <div className="flex flex-col gap-4 p-6 bg-green-50 rounded-lg border-2 border-green-200">
          <div className="flex items-center gap-2 text-green-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Grabación completada</span>
          </div>
          <div className="text-sm text-gray-600">Duración: {formattedDuration}</div>
          <audio controls src={URL.createObjectURL(audioBlob)} className="w-full" />
          <div className="flex gap-2">
            <Button onClick={handleSave} variant="success" fullWidth>
              Usar grabación
            </Button>
            <Button onClick={handleDiscard} variant="secondary" fullWidth>
              Descartar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
