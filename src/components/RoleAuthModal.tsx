import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { getTranslation } from '../services/translations';
import {
  ShieldCheck,
  User,
  Stethoscope,
  FlaskConical,
  Pill,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  RefreshCw,
  Building2,
  FileCheck2
} from 'lucide-react';

interface RoleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: UserRole | null;
}

export const RoleAuthModal: React.FC<RoleAuthModalProps> = ({
  isOpen,
  onClose,
  initialRole
}) => {
  const {
    currentLanguage,
    loginWithABHA,
    loginAsDoctor,
    loginAsLabTech,
    loginAsPharmacist
  } = useApp();

  const t = getTranslation(currentLanguage).roleAuth;

  const [activeTab, setActiveTab] = useState<UserRole>('PATIENT');

  // Patient ABHA state
  const [abhaInput, setAbhaInput] = useState('91-4521-8890-1234');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(30);

  // Doctor state
  const [doctorRegInput, setDoctorRegInput] = useState('MCI-2004-58912');
  const [doctorPin, setDoctorPin] = useState('2026');

  // Lab Tech state
  const [techIdInput, setTechIdInput] = useState('TECH-PATH-8821');
  const [labDept, setLabDept] = useState('Central Pathology & Biochemistry Laboratory');

  // Pharmacist state
  const [pharmLicenseInput, setPharmLicenseInput] = useState('PHARM-DEL-4921');
  const [dispensaryCounter, setDispensaryCounter] = useState('OPD Dispensary (Counter 3)');

  // Feedback messages
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialRole) {
      setActiveTab(initialRole);
    }
  }, [initialRole, isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, otpCountdown]);

  if (!isOpen) return null;

  // Handle Requesting OTP
  const handleRequestOtp = () => {
    if (!abhaInput.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your 14-digit ABHA Number or ABHA Address' });
      return;
    }
    setIsOtpLoading(true);
    setStatusMessage(null);

    setTimeout(() => {
      setIsOtpLoading(false);
      setOtpSent(true);
      setOtpCountdown(30);
      setStatusMessage({
        type: 'success',
        text: 'ABDM Security Gateway: 6-digit OTP dispatched to mobile linked with Aadhaar (****8890).'
      });
    }, 600);
  };

  // Handle Verifying Patient OTP
  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      handleRequestOtp();
      return;
    }
    setIsSubmitting(true);
    setStatusMessage(null);

    const res = await loginWithABHA(abhaInput, otpCode || '782910');
    setIsSubmitting(false);

    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  // Handle Doctor Login
  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const res = await loginAsDoctor(doctorRegInput, doctorPin);
    setIsSubmitting(false);

    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  // Handle Lab Tech Login
  const handleLabTechSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const res = await loginAsLabTech(techIdInput);
    setIsSubmitting(false);

    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  // Handle Pharmacist Login
  const handlePharmacistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const res = await loginAsPharmacist(pharmLicenseInput);
    setIsSubmitting(false);

    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div
      id="role-auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        id="role-auth-modal-card"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 transition-all"
      >
        {/* Header with Gov/ABDM Brand */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm text-emerald-300">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    ABDM Gateway M1/M2/M3
                  </span>
                  <span className="text-[11px] text-slate-300">NHA & DPDP Compliant</span>
                </div>
                <h2 id="auth-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                  {t.title}
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/80">
                  {t.subtitle}
                </p>
              </div>
            </div>
            <button
              id="close-auth-modal-btn"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close authentication modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
            <button
              id="tab-auth-patient"
              type="button"
              onClick={() => {
                setActiveTab('PATIENT');
                setStatusMessage(null);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'PATIENT'
                  ? 'bg-white text-emerald-950 shadow-md font-bold'
                  : 'bg-white/10 text-white/90 hover:bg-white/15'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span className="truncate">{t.patientTab}</span>
            </button>

            <button
              id="tab-auth-doctor"
              type="button"
              onClick={() => {
                setActiveTab('DOCTOR');
                setStatusMessage(null);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'DOCTOR'
                  ? 'bg-white text-emerald-950 shadow-md font-bold'
                  : 'bg-white/10 text-white/90 hover:bg-white/15'
              }`}
            >
              <Stethoscope className="w-4 h-4 shrink-0" />
              <span className="truncate">{t.doctorTab}</span>
            </button>

            <button
              id="tab-auth-lab-tech"
              type="button"
              onClick={() => {
                setActiveTab('LAB_TECHNICIAN');
                setStatusMessage(null);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'LAB_TECHNICIAN'
                  ? 'bg-white text-emerald-950 shadow-md font-bold'
                  : 'bg-white/10 text-white/90 hover:bg-white/15'
              }`}
            >
              <FlaskConical className="w-4 h-4 shrink-0" />
              <span className="truncate">{t.labTab}</span>
            </button>

            <button
              id="tab-auth-pharmacist"
              type="button"
              onClick={() => {
                setActiveTab('PHARMACIST');
                setStatusMessage(null);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'PHARMACIST'
                  ? 'bg-white text-emerald-950 shadow-md font-bold'
                  : 'bg-white/10 text-white/90 hover:bg-white/15'
              }`}
            >
              <Pill className="w-4 h-4 shrink-0" />
              <span className="truncate">{t.pharmTab}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7">
          {/* Status Message */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl mb-5 flex items-start gap-3 text-xs sm:text-sm ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="font-medium leading-relaxed">{statusMessage.text}</div>
            </div>
          )}

          {/* TAB 1: PATIENT ABHA LOGIN WITH OTP */}
          {activeTab === 'PATIENT' && (
            <form onSubmit={handlePatientSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.abhaNumberLabel}
                </label>
                <div className="relative">
                  <input
                    id="patient-abha-input"
                    type="text"
                    value={abhaInput}
                    onChange={(e) => setAbhaInput(e.target.value)}
                    placeholder="e.g. 91-4521-8890-1234 or ramesh.kumar@abdm"
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 font-mono text-sm tracking-wide"
                    required
                  />
                  <ShieldCheck className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-1.5 mt-2 text-xs text-slate-500">
                  <span>{t.demoPatientHelper}</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAbhaInput('91-4521-8890-1234');
                        setOtpSent(false);
                      }}
                      className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                    >
                      Demo: Ramesh Kumar
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAbhaInput('14-9901-2244-5566');
                        setOtpSent(false);
                      }}
                      className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                    >
                      Demo: Sunita Devi
                    </button>
                  </div>
                </div>
              </div>

              {!otpSent ? (
                <button
                  id="request-abha-otp-btn"
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={isOtpLoading || !abhaInput.trim()}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isOtpLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Contacting ABDM Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4" />
                      <span>{t.requestOtpBtn}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      {t.enterOtpLabel}
                    </span>
                    <span className="font-mono text-emerald-700 font-bold">
                      {otpCountdown > 0 ? `Resend in ${otpCountdown}s` : 'OTP Expired'}
                    </span>
                  </div>

                  {/* SMS Simulation Banner */}
                  <div className="p-2.5 rounded-lg bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold">ABDM-NHA SMS:</span> 782910 is your authentication OTP.
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpCode('782910')}
                      className="px-2 py-1 rounded bg-emerald-800 text-white text-[11px] font-bold hover:bg-emerald-900 cursor-pointer"
                    >
                      Auto-Fill
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="patient-otp-input"
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 782910"
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 text-center tracking-widest font-mono text-lg font-bold"
                      required
                    />
                    <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleRequestOtp}
                      disabled={otpCountdown > 0}
                      className="text-xs font-semibold text-slate-600 hover:text-emerald-700 disabled:opacity-40 cursor-pointer"
                    >
                      Resend OTP
                    </button>
                    <button
                      id="verify-abha-otp-btn"
                      type="submit"
                      disabled={isSubmitting || !otpCode}
                      className="py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Verifying KYC...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.verifyPatientBtn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* TAB 2: DOCTOR LOGIN */}
          {activeTab === 'DOCTOR' && (
            <form onSubmit={handleDoctorSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.doctorRegLabel}
                </label>
                <div className="relative">
                  <input
                    id="doctor-reg-input"
                    type="text"
                    value={doctorRegInput}
                    onChange={(e) => setDoctorRegInput(e.target.value)}
                    placeholder="e.g. MCI-2004-58912 or doc_1"
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-slate-900 font-mono text-sm"
                    required
                  />
                  <Stethoscope className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.doctorPinLabel}
                </label>
                <div className="relative">
                  <input
                    id="doctor-pin-input"
                    type="password"
                    value={doctorPin}
                    onChange={(e) => setDoctorPin(e.target.value)}
                    placeholder="Enter security PIN (2026)"
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-slate-900 text-sm"
                    required
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Quick Select Presets */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-semibold text-slate-600 block mb-2">
                  Select Demo Clinical Consultant:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDoctorRegInput('MCI-2004-58912');
                      setDoctorPin('2026');
                    }}
                    className={`p-2 rounded-lg text-left text-xs border transition-all cursor-pointer ${
                      doctorRegInput === 'MCI-2004-58912'
                        ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold truncate">Dr. Alok Sharma</div>
                    <div className="text-[11px] text-slate-500">Cardiology OPD</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDoctorRegInput('KMC-2011-89321');
                      setDoctorPin('2026');
                    }}
                    className={`p-2 rounded-lg text-left text-xs border transition-all cursor-pointer ${
                      doctorRegInput === 'KMC-2011-89321'
                        ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold truncate">Dr. Radhika Nair</div>
                    <div className="text-[11px] text-slate-500">Gen. Medicine</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDoctorRegInput('CCIM-DEL-2015-1044');
                      setDoctorPin('2026');
                    }}
                    className={`p-2 rounded-lg text-left text-xs border transition-all cursor-pointer ${
                      doctorRegInput === 'CCIM-DEL-2015-1044'
                        ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold truncate">Vaidya Harish Pandey</div>
                    <div className="text-[11px] text-slate-500">AYUSH Clinic</div>
                  </button>
                </div>
              </div>

              <button
                id="submit-doctor-login-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Building2 className="w-4 h-4" />
                    <span>{t.doctorLoginBtn}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 3: LAB TECHNICIAN LOGIN */}
          {activeTab === 'LAB_TECHNICIAN' && (
            <form onSubmit={handleLabTechSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.labIdLabel}
                </label>
                <div className="relative">
                  <input
                    id="lab-tech-id-input"
                    type="text"
                    value={techIdInput}
                    onChange={(e) => setTechIdInput(e.target.value)}
                    placeholder="e.g. TECH-PATH-8821"
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-slate-300 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 font-mono text-sm"
                    required
                  />
                  <FlaskConical className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.labDeptLabel}
                </label>
                <div className="relative">
                  <input
                    id="lab-dept-input"
                    type="text"
                    value={labDept}
                    onChange={(e) => setLabDept(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-slate-300 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20 text-slate-900 text-sm"
                    required
                  />
                  <Building2 className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Demo Badge */}
              <div className="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200 text-xs text-cyan-950 flex items-center justify-between">
                <div>
                  <div className="font-bold">Kavita Sharma, B.Sc MLT (AIIMS)</div>
                  <div className="text-cyan-700">Central Pathology & Biochemistry Laboratory</div>
                </div>
                <span className="px-2 py-1 bg-cyan-600 text-white font-bold text-[10px] rounded">
                  Demo Staff
                </span>
              </div>

              <button
                id="submit-lab-login-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <FlaskConical className="w-4 h-4" />
                    <span>{t.labLoginBtn}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 4: PHARMACIST LOGIN */}
          {activeTab === 'PHARMACIST' && (
            <form onSubmit={handlePharmacistSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.pharmLicenseLabel}
                </label>
                <div className="relative">
                  <input
                    id="pharm-license-input"
                    type="text"
                    value={pharmLicenseInput}
                    onChange={(e) => setPharmLicenseInput(e.target.value)}
                    placeholder="e.g. PHARM-DEL-4921"
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-slate-900 font-mono text-sm"
                    required
                  />
                  <Pill className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.pharmCounterLabel}
                </label>
                <div className="relative">
                  <input
                    id="dispensary-counter-input"
                    type="text"
                    value={dispensaryCounter}
                    onChange={(e) => setDispensaryCounter(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm"
                    required
                  />
                  <Building2 className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Demo Badge */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
                <div>
                  <div className="font-bold">Rajesh Gupta, B.Pharm, R.Ph</div>
                  <div className="text-amber-700">Central Hospital OPD Dispensary (Counter 3)</div>
                </div>
                <span className="px-2 py-1 bg-amber-600 text-white font-bold text-[10px] rounded">
                  Demo Pharmacist
                </span>
              </div>

              <button
                id="submit-pharmacist-login-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Pill className="w-4 h-4" />
                    <span>{t.pharmLoginBtn}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Security Badges */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>Ayushman Bharat Digital Mission (ABDM) Level 3 Certified</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>DPDP Act 2023 Sovereign Privacy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
