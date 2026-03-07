import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook encapsulating the Web Speech API for a voice introduction.
 * Returns the speaking state and a toggle function.
 */
export function useVoiceIntro(text: string) {
  const [speaking, setSpeaking] = useState(false);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggle = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    const synth = window.speechSynthesis;

    if (synth.speaking || synth.pending) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.02;
    utterance.volume = 0.95;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    synth.cancel();
    synth.speak(utterance);
  }, [text]);

  return { speaking, toggle };
}
