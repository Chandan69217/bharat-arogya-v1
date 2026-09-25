// Accessibility Toolbar: Font Size, High Contrast, Audio Guidance & Language Selector
// Full multilingual parity across all 6 Indian languages

import React from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../services/clinicalKnowledge';
import { getTranslation } from '../services/translations';
import { Volume2, VolumeX, Eye, Monitor, ShieldAlert } from 'lucide-react';
import { LanguageCode } from '../types';

export const AccessibilityToolbar: React.FC = () => {
  const {
    currentLanguage,
    setLanguage,
    accessibility,
    updateAccessibility,
    isKioskMode,
    setIsKioskMode,
    speakGuidance,
    stopGuidance
  } = useApp();

  const t = getTranslation(currentLanguage).accessibility;

  const handleAudioToggle = () => {
    const next = !accessibility.audioGuidance;
    updateAccessibility({ audioGuidance: next });
    if (next) {
      speakGuidance(t.audioEnabledSpoken);
    } else {
      stopGuidance();
    }
  };

  return (
    <header className="bg-slate-900 text-slate-100 border-b border-slate-800 text-sm py-2 px-4 shadow-sm select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Demo Mode Flag */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold tracking-wide text-white text-base">Bharat Arogya</span>
            <span className="hidden sm:inline-block text-xs bg-teal-900/80 text-teal-300 font-medium px-2 py-0.5 rounded border border-teal-700">
              {currentLanguage === 'hi' ? 'भारत आरोग्य' : currentLanguage.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center text-xs bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-700/60 font-mono">
            <ShieldAlert className="w-3.5 h-3.5 mr-1 text-amber-400" />
            <span>{t.demoMode}</span>
          </div>
        </div>

        {/* Right: Accessibility Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
          {/* Language Selector */}
          <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
            <span className="text-slate-400 px-1.5 font-medium">{t.languageLabel}</span>
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-slate-900 text-white font-medium rounded px-2 py-1 outline-none cursor-pointer hover:bg-slate-700 transition-colors"
              aria-label="Select Language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Font Size Adjusters */}
          <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700" title="Adjust Text Size">
            <button
              onClick={() => updateAccessibility({ fontSize: 'normal' })}
              className={`px-2 py-1 rounded font-bold transition-colors ${accessibility.fontSize === 'normal' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white'}`}
              aria-label="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => updateAccessibility({ fontSize: 'large' })}
              className={`px-2 py-1 rounded font-bold text-sm transition-colors ${accessibility.fontSize === 'large' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white'}`}
              aria-label="Large Font Size"
            >
              A+
            </button>
            <button
              onClick={() => updateAccessibility({ fontSize: 'xlarge' })}
              className={`px-2 py-1 rounded font-bold text-base transition-colors ${accessibility.fontSize === 'xlarge' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white'}`}
              aria-label="Extra Large Font Size"
            >
              A++
            </button>
          </div>

          {/* High Contrast Mode */}
          <button
            onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
            className={`flex items-center px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              accessibility.highContrast
                ? 'bg-amber-400 text-black border-amber-300 font-bold'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle High Contrast Mode"
            aria-pressed={accessibility.highContrast}
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            <span className="hidden sm:inline">{t.highContrast}</span>
          </button>

          {/* Audio Guidance / Text to Speech */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              accessibility.audioGuidance
                ? 'bg-emerald-600 text-white border-emerald-500 font-semibold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Read Prompts Aloud"
            aria-pressed={accessibility.audioGuidance}
          >
            {accessibility.audioGuidance ? (
              <>
                <Volume2 className="w-3.5 h-3.5 mr-1.5 text-emerald-200 animate-bounce" />
                <span>{t.audioOn}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                <span>{t.audioOff}</span>
              </>
            )}
          </button>

          {/* Kiosk Mode Toggle */}
          <button
            onClick={() => setIsKioskMode(!isKioskMode)}
            className={`flex items-center px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              isKioskMode
                ? 'bg-teal-700 text-white border-teal-600 font-semibold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle Touchscreen Kiosk vs Clinical Desktop View"
          >
            <Monitor className="w-3.5 h-3.5 mr-1.5" />
            <span className="hidden sm:inline">{isKioskMode ? t.kioskActive : t.desktopView}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
