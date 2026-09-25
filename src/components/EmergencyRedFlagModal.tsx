// Emergency Red-Flag Modal Alert Component (High-Contrast, Audio Chime, Immediate Triage Dispatch)

import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AlertOctagon, PhoneCall, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

export const EmergencyRedFlagModal: React.FC = () => {
  const { activeRedFlagAlert, dismissRedFlagAlert, currentLanguage, speakGuidance } = useApp();

  useEffect(() => {
    if (activeRedFlagAlert) {
      const emergencyMessage = currentLanguage === 'hi'
        ? 'आपातकालीन चेतावनी: संभावित गंभीर लक्षण पाया गया है। कृपया तुरंत अस्पताल स्टाफ या सिस्टर को सूचित करें।'
        : 'Emergency warning: Potential critical symptom detected. Please notify hospital triage staff immediately.';
      speakGuidance(emergencyMessage);
    }
  }, [activeRedFlagAlert, currentLanguage]);

  if (!activeRedFlagAlert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border-2 border-rose-600 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Red Header */}
        <div className="bg-rose-600 text-white p-5 flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-xl animate-pulse">
            <AlertOctagon className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest bg-rose-800/80 px-2.5 py-0.5 rounded-full border border-rose-400">
              PRIORITY 1 - IMMEDIATE CLINICAL TRIAGE
            </span>
            <h2 className="text-xl font-bold mt-1">Emergency Red-Flag Detected</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <h3 className="font-bold text-rose-900 text-lg flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2 text-rose-600" />
              {activeRedFlagAlert.symptom}
            </h3>
            <p className="text-slate-700 mt-2 text-sm leading-relaxed">
              {activeRedFlagAlert.reason}
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Mandatory Safety Protocol:
            </span>
            <p className="text-slate-800 text-sm font-semibold">
              {activeRedFlagAlert.actionRequired}
            </p>
            <p className="text-xs text-slate-500 italic mt-1">
              Note: This automated safety alert does NOT represent a definitive diagnosis. It prompts immediate prioritized clinical assessment by the hospital team.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                alert('Triage Sister Mary Joseph & Wheelchair team dispatched to Kiosk Terminal #1.');
                dismissRedFlagAlert();
              }}
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-rose-600/30 transition-colors"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Call Triage Nurse / Wheelchair</span>
            </button>

            <button
              onClick={dismissRedFlagAlert}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors border border-slate-300"
            >
              <span>Continue with P1 Tag</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
