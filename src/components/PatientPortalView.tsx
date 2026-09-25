// Patient Personal Portal: ABHA Digital Health Card, Medical Timeline & DPDP Consent Management

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_TIMELINE } from '../services/mockData';
import {
  ShieldCheck,
  QrCode,
  Calendar,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle2,
  Lock,
  User,
  Activity,
  HeartPulse
} from 'lucide-react';

export const PatientPortalView: React.FC = () => {
  const { currentPatient, documents, activeConsent, grantConsent, withdrawConsent } = useApp();
  const [activeTab, setActiveTab] = useState<'TIMELINE' | 'DOCUMENTS' | 'CONSENT' | 'ABHA'>('TIMELINE');

  const patientDocs = documents.filter(d => d.patientId === currentPatient.id);
  const patientTimeline = INITIAL_TIMELINE.filter(t => t.patientId === currentPatient.id);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Patient Header Card */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-teal-300 font-extrabold text-2xl border border-white/20 shadow-inner">
              {currentPatient.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">{currentPatient.fullName}</h1>
                <span className="bg-teal-500/30 text-teal-200 border border-teal-400/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  ABHA Linked
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Age: {currentPatient.age} Y • Gender: {currentPatient.gender} • Blood Group: {currentPatient.bloodGroup || 'B+'}
              </p>
            </div>
          </div>

          {/* ABHA Number Badge */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-right sm:text-left">
            <p className="text-[10px] uppercase font-bold tracking-wider text-teal-200">Ayushman Bharat Health Account</p>
            <p className="text-sm font-mono font-bold tracking-wider text-white mt-0.5">
              {currentPatient.abhaProfile?.abhaId || '91-4521-8890-1234'}
            </p>
            <p className="text-[11px] text-teal-300 font-medium">
              {currentPatient.abhaProfile?.abhaAddress || 'ramesh.kumar@abdm'}
            </p>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => setActiveTab('TIMELINE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'TIMELINE' ? 'bg-white text-teal-950 shadow-xs' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            Chronological Timeline
          </button>
          <button
            onClick={() => setActiveTab('DOCUMENTS')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'DOCUMENTS' ? 'bg-white text-teal-950 shadow-xs' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            My Scanned Documents ({patientDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('CONSENT')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'CONSENT' ? 'bg-white text-teal-950 shadow-xs' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            DPDP Consent Manager
          </button>
          <button
            onClick={() => setActiveTab('ABHA')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'ABHA' ? 'bg-white text-teal-950 shadow-xs' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            Digital ABHA Card
          </button>
        </div>
      </div>

      {/* Tab 1: Chronological Medical Timeline */}
      {activeTab === 'TIMELINE' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Chronological Medical Timeline</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Unified clinical timeline synthesized from OPD history, uploaded hospital records, and investigations.
              </p>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Module 12 — Medical Timeline
            </span>
          </div>

          {/* Timeline Stream */}
          <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {patientTimeline.map((ev) => (
              <div key={ev.id} className="relative group">
                {/* Timeline Node Bullet */}
                <div className={`absolute -left-[27px] top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                  ev.severity === 'CRITICAL' ? 'border-rose-600 bg-rose-500' : 'border-teal-600 bg-teal-500'
                }`} />

                <div className="bg-slate-50 hover:bg-teal-50/30 border border-slate-200 rounded-2xl p-5 transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                        {ev.date}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        [{ev.category}]
                      </span>
                    </div>

                    {ev.severity && (
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        ev.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ev.severity}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{ev.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ev.description}</p>

                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                    <span>Provider: {ev.department} {ev.doctorName ? `• ${ev.doctorName}` : ''}</span>
                    <div className="flex gap-1 mt-1 sm:mt-0">
                      {ev.tags.map((tag, idx) => (
                        <span key={idx} className="bg-white border px-1.5 py-0.2 rounded text-[10px]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Uploaded Documents */}
      {activeTab === 'DOCUMENTS' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Digitized Health Records</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {patientDocs.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                    {doc.documentCategory}
                  </span>
                  <span className="text-xs text-emerald-700 font-bold">
                    ✓ OCR {doc.ocrConfidence?.toFixed(0)}%
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{doc.fileName}</h3>
                <p className="text-xs text-slate-500">
                  {doc.extractedEntities.length} entities extracted • {doc.abnormalLabs.length} abnormal values
                </p>
                <div className="pt-2 text-right">
                  <a
                    href={doc.signedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-teal-700 hover:underline"
                  >
                    View Secure Document →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: DPDP Consent Manager */}
      {activeTab === 'CONSENT' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-teal-600" />
                DPDP Act 2023 & ABDM Consent Manager
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Section 18 — Transparent, granular, and revocable patient consent architecture.
              </p>
            </div>

            <span className={`px-3 py-1 text-xs font-extrabold rounded-full ${
              activeConsent?.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              Status: {activeConsent?.status || 'NOT GRANTED'}
            </span>
          </div>

          <div className="space-y-3 bg-slate-50 p-5 rounded-xl border text-xs text-slate-700 leading-relaxed">
            <h3 className="font-bold text-slate-900 text-sm">Notice of Health Data Processing:</h3>
            <p>
              <strong>Purpose:</strong> Collection, speech transcription, OCR digitization, and AI-assisted clinical summarization for outpatient hospital consultation.
            </p>
            <p>
              <strong>Data Processed:</strong> Spoken clinical history, physical prescriptions, past laboratory investigations, and ABDM health identifiers.
            </p>
            <p>
              <strong>Storage & Security:</strong> Encryption at rest, zero-retention temporary voice buffer, signed AWS S3 document storage, and strictly physician-supervised access.
            </p>
            <p>
              <strong>Revocation:</strong> Under Section 6(4) of the Digital Personal Data Protection Act 2023, you have the right to withdraw this consent at any time.
            </p>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            {activeConsent?.status === 'ACTIVE' ? (
              <button
                onClick={withdrawConsent}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-300 transition-colors"
              >
                Withdraw Electronic Consent
              </button>
            ) : (
              <button
                onClick={() => grantConsent()}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Grant & Re-Activate Consent
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Digital ABHA Card */}
      {activeTab === 'ABHA' && (
        <div className="max-w-md mx-auto bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white rounded-3xl p-6 border-2 border-teal-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/20 pb-3">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-sm tracking-widest text-teal-300">ABDM AYUSHMAN BHARAT</span>
            </div>
            <span className="text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">
              KYC VERIFIED
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-300">Patient Name</p>
              <p className="text-lg font-bold">{currentPatient.fullName}</p>
            </div>
            <div className="p-2 bg-white rounded-xl">
              <QrCode className="w-12 h-12 text-slate-900" />
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
            <p className="text-[10px] text-teal-200 uppercase font-bold">ABHA Number</p>
            <p className="text-base font-mono font-bold tracking-widest text-teal-100">
              {currentPatient.abhaProfile?.abhaId || '91-4521-8890-1234'}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
            <span>Linked Aadhaar: •••• 8890</span>
            <span>National Health Authority (NHA)</span>
          </div>
        </div>
      )}
    </div>
  );
};
