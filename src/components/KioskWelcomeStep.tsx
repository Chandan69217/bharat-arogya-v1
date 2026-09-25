// Accessible Patient Self-Service Kiosk Welcome, Language & ABHA Onboarding Flow
// Pure localization across all 6 supported Indian languages

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../services/clinicalKnowledge';
import { abhaService } from '../services/abhaService';
import { getTranslation } from '../services/translations';
import { LanguageCode } from '../types';
import {
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface KioskWelcomeStepProps {
  onStartHistory: () => void;
}

export const KioskWelcomeStep: React.FC<KioskWelcomeStepProps> = ({ onStartHistory }) => {
  const {
    currentLanguage,
    setLanguage,
    speakGuidance,
    currentPatient,
    updatePatientProfile,
    grantConsent,
    logAuditAction
  } = useApp();

  const t = getTranslation(currentLanguage).kioskWelcome;

  const [step, setStep] = useState<'LANGUAGE' | 'ABHA_AUTH' | 'CONSENT' | 'CONFIRM'>('LANGUAGE');
  const [abhaInput, setAbhaInput] = useState<string>('91-4521-8890-1234');
  const [otpInput, setOtpInput] = useState<string>('123456');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);

  // Audio greeting upon language change
  const handleSelectLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    const greetings: Record<LanguageCode, string> = {
      hi: 'भारत आरोग्य में आपका स्वागत है। अपनी भाषा चुनने के लिए धन्यवाद।',
      en: 'Welcome to Bharat Arogya. Thank you for selecting your language.',
      ta: 'பாரத் ஆரோக்கியத்திற்கு வரவேற்கிறோம். மொழியைத் தேர்ந்தெடுத்ததற்கு நன்றி.',
      te: 'భారత్ ఆరోగ్యకి స్వాగతం. మీ భాషను ఎంచుకున్నందుకు ధన్యవాదాలు.',
      bn: 'ভারত আরোগ্যে স্বাগতম। আপনার ভাষা নির্বাচন করার জন্য ধন্যবাদ।',
      mr: 'भारत आरोग्य मध्ये आपले स्वागत आहे. भाषा निवडल्याबद्दल धन्यवाद.'
    };
    speakGuidance(greetings[lang] || greetings.en);
  };

  const handleRequestOTP = async () => {
    setIsVerifying(true);
    await abhaService.requestOTP(abhaInput);
    setIsVerifying(false);
    setOtpSent(true);
  };

  const handleVerifyOTP = async () => {
    setIsVerifying(true);
    const res = await abhaService.verifyOTP('demo_txn', otpInput, abhaInput);
    setIsVerifying(false);
    if (res.success && res.abhaProfile) {
      setAuthSuccess(true);
      updatePatientProfile({
        ...currentPatient,
        abhaProfile: res.abhaProfile
      });
      logAuditAction('ABHA_AUTHENTICATED', 'ABHA_PROFILE', res.abhaProfile.abhaId, true, 'Kiosk OTP verification successful');
      setTimeout(() => setStep('CONSENT'), 800);
    } else {
      alert(res.message);
    }
  };

  const handleAcceptConsent = () => {
    grantConsent();
    setStep('CONFIRM');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 space-y-6">
      {/* Kiosk Hero Branding */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-to-tr from-teal-700 to-teal-500 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl shadow-teal-700/20">
          <Stethoscope className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Step 1: Language Selection */}
      {step === 'LANGUAGE' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-in fade-in">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {t.step1Badge}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              {t.step1Title}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center min-h-[90px] cursor-pointer ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold shadow-md scale-105'
                      : 'border-slate-200 hover:border-teal-400 bg-white text-slate-800'
                  }`}
                >
                  <span className="text-lg sm:text-xl font-bold">{lang.nativeName}</span>
                  <span className="text-xs text-slate-500 mt-1">{lang.name}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setStep('ABHA_AUTH')}
              className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white text-base font-bold rounded-2xl shadow-lg shadow-teal-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>{t.continueBtn}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: ABHA / Aadhaar Authentication */}
      {step === 'ABHA_AUTH' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-in fade-in">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {t.step2Badge}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              {t.step2Title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {t.step2Subtitle}
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.abhaLabel}
              </label>
              <input
                type="text"
                value={abhaInput}
                onChange={(e) => setAbhaInput(e.target.value)}
                placeholder="e.g. 91-4521-8890-1234"
                className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl font-mono text-base font-bold text-slate-800 text-center tracking-wider outline-none focus:border-teal-600"
              />
            </div>

            {!otpSent ? (
              <button
                onClick={handleRequestOTP}
                disabled={isVerifying}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition-colors shadow-xs cursor-pointer"
              >
                {isVerifying ? t.connectingAbdm : t.getOtpBtn}
              </button>
            ) : (
              <div className="space-y-3 animate-in fade-in">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.enterOtpLabel}
                  </label>
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    maxLength={6}
                    className="w-full p-3.5 bg-slate-50 border-2 border-teal-500 rounded-2xl font-mono text-xl font-extrabold text-slate-900 text-center tracking-widest outline-none"
                  />
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={isVerifying}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-colors shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t.verifyOtpBtn}</span>
                </button>
              </div>
            )}

            {authSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs text-center font-bold">
                ✓ {t.verifiedNotice}: {currentPatient.fullName} ({currentPatient.age} Y)
              </div>
            )}

            {/* Skip / New Patient bypass */}
            <div className="text-center pt-2">
              <button
                onClick={() => setStep('CONSENT')}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline cursor-pointer"
              >
                {t.skipWalkIn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Granular DPDP Consent */}
      {step === 'CONSENT' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-in fade-in">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {t.step3Badge}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              {t.step3Title}
            </h2>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-3">
            <div className="flex items-start space-x-2">
              <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <p>
                <strong>{t.purposeLabel}</strong> {t.purposeText}
              </p>
            </div>
            <p>
              <strong>{t.securityLabel}</strong> {t.securityText}
            </p>
            <p>
              <strong>{t.revokeLabel}</strong> {t.revokeText}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleAcceptConsent}
              className="flex-1 py-4 bg-teal-600 hover:bg-teal-700 text-white text-base font-bold rounded-2xl shadow-lg shadow-teal-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{t.consentAgreeBtn}</span>
            </button>
            <button
              onClick={() => alert('Consent declined. You can register manually at OPD counter #4.')}
              className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-2xl transition-colors border cursor-pointer"
            >
              {t.consentDeclineBtn}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Ready to Start */}
      {step === 'CONFIRM' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">
              {t.welcomePatient}, {currentPatient.fullName}!
            </h2>
            <p className="text-sm text-slate-600">
              {t.tokenLabel}: <span className="font-mono font-bold text-teal-700">{currentPatient.tokenNumber || 'OPD-04'}</span>
            </p>
            <p className="text-xs text-slate-500">
              {t.opdLabel}: {currentPatient.assignedDepartment || 'General Medicine'}
            </p>
          </div>

          <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-teal-950 font-medium">
            {t.readyMessage}
          </div>

          <button
            onClick={onStartHistory}
            className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white text-lg font-bold rounded-2xl shadow-lg shadow-teal-600/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] cursor-pointer"
          >
            <span>{t.startInterviewBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
