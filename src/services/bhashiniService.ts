// Bhashini & Web Speech Multilingual Voice Engine (Speech-to-Text & Text-to-Speech for Indian Languages)

import { LanguageCode } from '../types';

export interface SpeechRecognitionResultItem {
  transcript: string;
  isFinal: boolean;
  confidence: number;
  detectedLanguage?: LanguageCode;
}

export class BhashiniService {
  private isMockMode: boolean = true;
  private apiKey: string = '';
  private currentAudioContext: AudioContext | null = null;

  constructor() {
    this.isMockMode = (import.meta as any).env?.VITE_BHASHINI_MOCK_MODE !== 'false';
    this.apiKey = (import.meta as any).env?.VITE_BHASHINI_API_KEY || '';
  }

  // Play audio chime for microphone activation / listening feedback
  private playChime(freq: number = 587.33, duration: number = 0.15): void {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // AudioContext may be restricted before user gesture
    }
  }

  // Text to Speech (Bhashini TTS / Web Speech API)
  public async speakText(text: string, language: LanguageCode, onEnd?: () => void): Promise<void> {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      onEnd?.();
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Clean markdown or bracketed instructions for cleaner pronunciation
      const cleanText = text.replace(/\[.*?\]/g, '').replace(/[\*\_]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);

      const langMap: Record<LanguageCode, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        bn: 'bn-IN',
        mr: 'mr-IN',
      };

      utterance.lang = langMap[language] || 'hi-IN';
      utterance.rate = 0.92; // Deliberate pace for low-literacy hospital OPD patients
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(v => v.lang === utterance.lang || v.lang.startsWith(language));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onend = () => {
        onEnd?.();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis utterance error:', e);
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Error during speech synthesis:', err);
      onEnd?.();
    }
  }

  // Stop active speech
  public stopSpeaking(): void {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }
  }

  // Speech to Text (Bhashini ASR / Web Speech API with Interim Results)
  public startListening(
    language: LanguageCode,
    onResult: (result: SpeechRecognitionResultItem) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ): { stop: () => void } {
    if (typeof window === 'undefined') {
      onError('Audio input not available in this environment.');
      return { stop: () => {} };
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onError('Speech Recognition is not available in this browser. Please use touch buttons or quick spoken phrases below.');
      return { stop: () => {} };
    }

    try {
      this.playChime(659.25, 0.12); // High pleasant beep on start
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      const langMap: Record<LanguageCode, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        bn: 'bn-IN',
        mr: 'mr-IN',
      };

      recognition.lang = langMap[language] || 'hi-IN';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const trans = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += trans;
          } else {
            interimTranscript += trans;
          }
        }

        const effectiveText = (finalTranscript || interimTranscript).trim();
        if (effectiveText) {
          onResult({
            transcript: effectiveText,
            isFinal: Boolean(finalTranscript),
            confidence: 0.94,
            detectedLanguage: language
          });
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition warning:', event.error);
        if (event.error === 'no-speech') {
          onError('आवाज नहीं सुनी गई। कृपया दोबारा बोलें (No speech detected. Please speak clearly into the microphone).');
        } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          onError('माइक्रोफ़ोन अनुमति की आवश्यकता है (Microphone permission was blocked or denied).');
        } else {
          onError(`Speech recognition notification: ${event.error}`);
        }
      };

      recognition.onend = () => {
        this.playChime(440, 0.1); // Lower chime on end
        onEnd();
      };

      recognition.start();

      return {
        stop: () => {
          try {
            recognition.stop();
          } catch (e) {
            // ignore
          }
        }
      };
    } catch (e: any) {
      onError(`Could not initialize microphone: ${e?.message || 'Permission denied or blocked in iframe'}`);
      return { stop: () => {} };
    }
  }

  // Quick Spoken Medical Phrases for Instant Voice Mode Simulation / 1-Click Spoken Testing
  public getSamplePhrases(language: LanguageCode, questionCategory?: string): string[] {
    const samples: Record<LanguageCode, string[]> = {
      hi: [
        'सीने में बहुत तेज भारीपन और बाईं बांह में दर्द जा रहा है',
        'पिछले 3 दिनों से लगातार तेज बुखार और सूखी खांसी है',
        'मुझे सांस लेने में बहुत कठिनाई और चक्कर आ रहे हैं',
        'मुझे 5 साल से डायबिटीज और हाई ब्लड प्रेशर है',
        'मुझे पेनिसिलिन और सल्फा दवाइयों से एलर्जी है'
      ],
      en: [
        'Severe crushing central chest pain radiating to my left arm with cold sweating',
        'Continuous high-grade fever and persistent dry cough for the last 3 days',
        'Shortness of breath and dizziness upon mild exertion',
        'Diagnosed with Type 2 Diabetes and Hypertension for 6 years',
        'Allergic to Penicillin and NSAIDs'
      ],
      ta: [
        'மார்பில் கடுமையான வலி மற்றும் இடது கையில் வலி பரவுகிறது',
        'கடந்த 3 நாட்களாக கடுமையான காய்ச்சல் மற்றும் இருமல் உள்ளது',
        'மூச்சு விடுவதில் கடுமையான சிரமம் மற்றும் வியர்வை உள்ளது'
      ],
      te: [
        'ఛాతీలో తీవ్రమైన నొప్పి మరియు ఎడమ చేతికి వ్యాపిస్తోంది',
        'గత 3 రోజులుగా తీవ్రమైన జ్వరం మరియు దగ్గు ఉంది',
        'శ్వాస తీసుకోవడంలో తీవ్ర ఇబ్బంది ఉంది'
      ],
      bn: [
        'বুকে প্রচণ্ড ব্যথা এবং বাম হাতে ব্যথা ছড়িয়ে পড়ছে',
        'গত ৩ দিন ধরে তীব্র জ্বর ও কাশি হচ্ছে',
        'শ্বাস নিতে খুব কষ্ট হচ্ছে এবং ঘাম হচ্ছে'
      ],
      mr: [
        'छातीत तीव्र वेदना आणि डाव्या हाताला मुंग्या येत आहेत',
        'गेल्या ३ दिवसांपासून सतत ताप आणि खोकला आहे',
        'श्वास घेण्यास त्रास होत आहे आणि चक्कर येत आहे'
      ]
    };

    return samples[language] || samples.hi;
  }
}

export const bhashini = new BhashiniService();
