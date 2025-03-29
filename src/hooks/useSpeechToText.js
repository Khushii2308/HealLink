import { useState } from 'react';

const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognitionInstance = recognition ? new recognition() : null;

  const startListening = () => {
    if (!recognitionInstance) return;
    setIsListening(true);
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setIsListening(false);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionInstance.start();
  };

  const resetTranscript = () => setTranscript('');

  return { isListening, transcript, startListening, resetTranscript };
};

export default useSpeechToText;
