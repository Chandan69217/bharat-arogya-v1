import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../services/translations';
import {
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  User,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  Layers,
  Activity,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

export const PublicPlatformSite: React.FC = () => {
  const { openAuthModalWithRole, setIsPublicSiteView, setIsKioskMode, switchRole, currentLanguage } = useApp();
  const t = getTranslation(currentLanguage).publicSite;

  const handleLaunchKiosk = () => {
    switchRole('PATIENT');
    setIsKioskMode(true);
    setIsPublicSiteView(false);
  };

  return (
    <div id="public-platform-site" className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top ABDM Government Verification Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">{t.abdmStrip}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" /> {t.privacy}
            </span>
            <span className="hidden sm:inline">{t.fhir}</span>
            <span className="text-emerald-400 font-semibold">{t.bhashini}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-900 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            {t.heroTitle}
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed">
            {t.heroDesc}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <button
              id="hero-patient-login-btn"
              onClick={() => openAuthModalWithRole('PATIENT')}
              className="py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm sm:text-base shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <User className="w-5 h-5 text-slate-950" />
              <span>{t.patientLoginBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-staff-login-btn"
              onClick={() => openAuthModalWithRole('DOCTOR')}
              className="py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Stethoscope className="w-5 h-5 text-emerald-400" />
              <span>{t.doctorLoginBtn}</span>
            </button>

            <button
              id="hero-launch-kiosk-btn"
              onClick={handleLaunchKiosk}
              className="py-3.5 px-5 rounded-xl bg-teal-800/80 hover:bg-teal-700 text-white font-semibold text-sm border border-teal-500/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-teal-300" />
              <span>{t.launchKioskBtn}</span>
            </button>
          </div>

          {/* Highlights Micro Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-10 text-left">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">{t.fasterStat}</div>
              <div className="text-xs text-slate-300 mt-0.5">{t.fasterLabel}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-teal-400">{t.languagesStat}</div>
              <div className="text-xs text-slate-300 mt-0.5">{t.languagesLabel}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-cyan-400">{t.alertStat}</div>
              <div className="text-xs text-slate-300 mt-0.5">{t.alertLabel}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-emerald-300">{t.abdmStat}</div>
              <div className="text-xs text-slate-300 mt-0.5">{t.abdmLabel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Portals Overview Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            {t.rolesSectionBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.rolesSectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.rolesSectionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Patient Portal */}
          <div
            id="role-card-patient"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <User className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                {currentLanguage === 'hi' ? 'मरीज पोर्टल' : currentLanguage === 'ta' ? 'நோயாளி போர்டல்' : currentLanguage === 'te' ? 'రోగి పోర్టల్' : currentLanguage === 'bn' ? 'রোগী পোর্টাল' : currentLanguage === 'mr' ? 'रुग्ण पोर्टल' : 'Patient Portal'}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {currentLanguage === 'hi' ? 'आभा लॉगिन एवं बहुभाषी इनटेक' : 'ABHA Login & Multilingual Intake'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {currentLanguage === 'hi' 
                  ? '14 अंकों की आभा आईडी और ओटीपी द्वारा सुरक्षित लॉगिन। अपनी मातृभाषा में लक्षण दर्ज करें।'
                  : 'Log in securely using 14-digit ABHA ID and OTP. Speak symptoms in Hindi, Tamil, Telugu, Bengali, Marathi, or English.'}
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Aadhaar KYC linked via ABDM</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Dynamic SOCRATES symptom inquiry</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>OCR upload for physical prescriptions</span>
                </li>
              </ul>
            </div>

            <button
              id="portal-btn-patient"
              onClick={() => openAuthModalWithRole('PATIENT')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-200 transition-colors cursor-pointer"
            >
              <span>{t.patientLoginBtn}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Doctor Portal */}
          <div
            id="role-card-doctor"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-teal-700 uppercase tracking-wide">
                {currentLanguage === 'hi' ? 'डॉक्टर ओपीडी' : 'Doctor OPD Portal'}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {currentLanguage === 'hi' ? 'पर्यवेक्षित एआई क्लिनिकल निर्णय' : 'Supervised AI Decision Support'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'ड्रॉफ्ट क्लिनिकल सारांश, डिफरेंशियल डायग्नोसिस और आपातकालीन रेड-फ्लैग अलर्ट की त्वरित समीक्षा करें।'
                  : 'Review draft AI clinical summaries, differential diagnoses, Ayush correlates, and approve SOAP notes with one click.'}
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Drafts require doctor review & approval</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Live Red-Flag emergency queue priority</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Instant lab order & e-prescription dispatch</span>
                </li>
              </ul>
            </div>

            <button
              id="portal-btn-doctor"
              onClick={() => openAuthModalWithRole('DOCTOR')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-100 font-bold text-xs flex items-center justify-center gap-2 border border-teal-200 transition-colors cursor-pointer"
            >
              <span>{t.doctorLoginBtn}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Lab Technician Portal */}
          <div
            id="role-card-lab"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center mb-4">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-cyan-700 uppercase tracking-wide">
                {currentLanguage === 'hi' ? 'डायग्नोस्टिक लैब' : 'Diagnostic Laboratory'}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {currentLanguage === 'hi' ? 'नमूना एवं परिणाम प्रबंधन' : 'Specimen & Results Management'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'डॉक्टर द्वारा दिए गए टेस्ट ट्रैक करें, बारकोड नमूने एकत्र करें और गंभीर मानों की तुरंत रिपोर्ट करें।'
                  : 'Track doctor investigation orders, collect barcoded samples, and report biochemical values with automatic critical flagging.'}
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <span>STAT & Routine OPD sample queues</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <span>Auto-flagging: Troponin, Creatinine, Electrolytes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <span>Real-time critical alerts to physician queue</span>
                </li>
              </ul>
            </div>

            <button
              id="portal-btn-lab"
              onClick={() => openAuthModalWithRole('LAB_TECHNICIAN')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-cyan-50 text-cyan-800 hover:bg-cyan-100 font-bold text-xs flex items-center justify-center gap-2 border border-cyan-200 transition-colors cursor-pointer"
            >
              <span>{currentLanguage === 'hi' ? 'लैब लॉगिन' : 'Laboratory Staff Sign In'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 4: Pharmacist Portal */}
          <div
            id="role-card-pharmacist"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Pill className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                {currentLanguage === 'hi' ? 'अस्पताल दवाखाना' : 'Hospital Dispensary'}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {currentLanguage === 'hi' ? 'ई-प्रिस्क्रिप्शन एवं दवा सुरक्षा' : 'e-Prescription & Drug Safety'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'इलेक्ट्रॉनिक पर्चियां वितरित करें, दवा पारस्परिक क्रियाओं की जांच करें और बहुभाषी निर्देश दें।'
                  : 'Dispense electronic prescriptions, audit real-time drug-drug interactions, and provide bilingual dosage labels to patients.'}
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Live Drug-Drug Interaction auditing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Multilingual dosage instructions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Batch number & inventory reconciliation</span>
                </li>
              </ul>
            </div>

            <button
              id="portal-btn-pharmacist"
              onClick={() => openAuthModalWithRole('PHARMACIST')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 font-bold text-xs flex items-center justify-center gap-2 border border-amber-200 transition-colors cursor-pointer"
            >
              <span>{currentLanguage === 'hi' ? 'फार्मेसी लॉगिन' : 'Pharmacist Sign In'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ABDM & Technical Core Highlights */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
              National Health Architecture
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              ABDM Digital Health Mission Compliant
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Deeply integrated with the National Health Authority guidelines, FHIR v4 schema, and the Digital Personal Data Protection (DPDP) Act 2023.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">M1: ABHA Registration & OTP</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Supports 14-digit ABHA numbers, custom ABHA handles (@abdm), and Aadhaar-linked OTP verification. Enables seamless token allocation at hospital kiosks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">M2: Health Information Provider (HIP)</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Bundles consultation notes, diagnostic lab values, and e-prescriptions into standard HL7 FHIR v4 resources linked to the patient's national health locker.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">M3: Health Information User (HIU)</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Granular, patient-mediated electronic consent architecture. Doctors access past hospital summaries only upon active patient authorization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Architecture & Patient Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            Clinical Workflow
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Bharat Arogya Operates in Real Hospital Settings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
            <div className="text-3xl font-black text-emerald-600 mb-2">01</div>
            <h4 className="text-base font-bold text-slate-900">ABHA & Dynamic Intake</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Patient logs in with ABHA + OTP, receives OPD token, and completes SOCRATES symptom inquiry in their regional language with voice assistance.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
            <div className="text-3xl font-black text-teal-600 mb-2">02</div>
            <h4 className="text-base font-bold text-slate-900">Real-Time AI & Triage</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Clinical knowledge engine detects red flags (e.g. acute coronary syndrome) and alerts triage staff while compiling a draft SOAP note.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
            <div className="text-3xl font-black text-cyan-600 mb-2">03</div>
            <h4 className="text-base font-bold text-slate-900">Physician Review</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Attending doctor reviews structured summary, examines patient, confirms differential diagnoses, orders lab tests, and signs prescription.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
            <div className="text-3xl font-black text-amber-600 mb-2">04</div>
            <h4 className="text-base font-bold text-slate-900">Lab & Dispensary</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Diagnostic laboratory collects barcoded specimens, and pharmacy dispenses verified medicines with drug-safety checks and bilingual instructions.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Common Questions About Bharat Arogya</h2>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">How do patients authenticate using their ABHA ID?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Patients enter their 14-digit ABHA number, registered mobile number, or ABHA address. The ABDM Gateway dispatches a 6-digit one-time password (OTP) to the mobile number registered with UIDAI Aadhaar. Upon OTP entry, the patient’s linked KYC demographic data is securely verified.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">Is the AI summary authoritative, or does the doctor have final say?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Under Indian Medical Council and National Medical Commission (NMC) regulations, all AI-generated clinical summaries are strictly marked as <strong>DRAFT</strong>. The attending physician must independently examine the patient, edit or clarify any observation, and electronically sign the clinical summary before it becomes an official health record.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">How does Bharat Arogya support regional languages?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              The platform integrates the Government of India’s Bhashini speech-to-text and text-to-speech APIs, supporting Hindi, Tamil, Telugu, Bengali, Marathi, and English. Patients can hear auditory prompts and articulate their symptoms naturally using voice.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">How does the diagnostic lab and pharmacy integration work?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              When a doctor submits test orders during an OPD consultation, they immediately appear on the Laboratory Technician portal with priority tags (STAT/Urgent vs Routine). When the technician enters results, any critical biomarker (e.g. Troponin-I &gt; 0.04 ng/mL) immediately triggers an emergency notification back to the doctor. Similarly, e-prescriptions populate the pharmacist portal with automated drug-interaction safety audits.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-white font-bold text-sm tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              Bharat Arogya (भारत आरोग्य)
            </div>
            <p className="text-slate-400 text-xs mt-1">
              National AI Clinical History & ABDM Digital Healthcare Platform.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button
              onClick={() => openAuthModalWithRole('PATIENT')}
              className="text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              Patient ABHA Login
            </button>
            <span>•</span>
            <button
              onClick={() => openAuthModalWithRole('DOCTOR')}
              className="text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              Doctor Sign In
            </button>
            <span>•</span>
            <button
              onClick={() => openAuthModalWithRole('LAB_TECHNICIAN')}
              className="text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              Lab Technician
            </button>
            <span>•</span>
            <button
              onClick={() => openAuthModalWithRole('PHARMACIST')}
              className="text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              Dispensary
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
