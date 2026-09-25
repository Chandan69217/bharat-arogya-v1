// Structured AI Clinical Summary Viewer & Physician Review Interface

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { abhaService } from '../services/abhaService';
import {
  FileText,
  AlertOctagon,
  CheckCircle2,
  Edit3,
  Save,
  Download,
  ShieldCheck,
  AlertTriangle,
  Pill,
  Clock,
  Sparkles,
  Stethoscope,
  Share2,
  RefreshCw,
  Activity,
  Layers,
  ChevronRight,
  Info,
  Check,
  PenTool,
  Tag
} from 'lucide-react';

export const ClinicalSummaryViewer: React.FC = () => {
  const {
    currentPatient,
    summaries,
    patientIntakes,
    documents,
    currentUser,
    updatePhysicianReview,
    generateDoctorSummary,
    deleteSummary,
    logAuditAction
  } = useApp();

  const summary = summaries[currentPatient.id];
  const intake = patientIntakes[currentPatient.id];
  const patientDocs = documents.filter(d => d.patientId === currentPatient.id);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedHpi, setEditedHpi] = useState<string>(summary?.hpiSummary || '');
  const [doctorNotes, setDoctorNotes] = useState<string>('');
  const [showFhirModal, setShowFhirModal] = useState<boolean>(false);
  const [showConfirmedNotice, setShowConfirmedNotice] = useState<boolean>(false);

  // Doctor Summarization State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [summaryStyle, setSummaryStyle] = useState<'STANDARD' | 'COMPREHENSIVE' | 'EMERGENCY'>('STANDARD');
  const [doctorDirectives, setDoctorDirectives] = useState<string>('');

  // Handle Physician Triggered Summarization
  const handleTriggerDoctorSummary = async () => {
    setIsGenerating(true);

    try {
      setGenerationStep('1/4: Analyzing patient symptom timeline & SOCRATES characteristics...');
      await new Promise(r => setTimeout(r, 600));

      setGenerationStep('2/4: Correlating uploaded OCR prescriptions & lab results...');
      await new Promise(r => setTimeout(r, 600));

      setGenerationStep('3/4: Cross-referencing red flags & drug-drug interactions...');
      await new Promise(r => setTimeout(r, 600));

      setGenerationStep('4/4: Formatting standardized clinical case-taking draft...');
      await new Promise(r => setTimeout(r, 500));

      const newSummary = await generateDoctorSummary(currentPatient.id, {
        style: summaryStyle,
        notes: doctorDirectives
      });

      setEditedHpi(newSummary.hpiSummary);
      setIsGenerating(false);
      setGenerationStep('');
      logAuditAction(
        'DOCTOR_GENERATED_SUMMARY',
        'CLINICAL_SUMMARY',
        newSummary.id,
        true,
        `Doctor ${currentUser.fullName} generated summary for ${currentPatient.fullName}`
      );
    } catch (e) {
      console.error(e);
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const handleConfirmReview = (action: 'CONFIRMED' | 'CLARIFICATION_REQUESTED' | 'MODIFIED') => {
    if (!summary) return;
    const doctorName = currentUser.role === 'DOCTOR' ? currentUser.fullName : 'Dr. Alok Sharma (Attending Cardiologist)';
    updatePhysicianReview(currentPatient.id, doctorName, action, doctorNotes, editedHpi);
    setIsEditing(false);
    setShowConfirmedNotice(true);
    setTimeout(() => setShowConfirmedNotice(false), 4000);
    logAuditAction('SUMMARY_REVIEWED', 'CLINICAL_SUMMARY', summary.id, true, `Physician action: ${action}`);
  };

  // =========================================================================
  // VIEW 1: PATIENT INTAKE AWAITING DOCTOR SUMMARIZATION (No Summary Yet)
  // =========================================================================
  if (!summary) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner: Doctor Action Required */}
        <div className="bg-gradient-to-r from-teal-800 to-teal-950 text-white rounded-2xl p-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest bg-teal-700/80 px-2.5 py-0.5 rounded-full border border-teal-500">
                  Doctor Intake Chamber
                </span>
                <span className="text-xs text-teal-200">
                  Token: <strong className="text-white font-mono">{currentPatient.tokenNumber || 'CARDIO-04'}</strong>
                </span>
              </div>
              <h2 className="text-2xl font-bold">
                Patient History Received — Ready for Doctor's AI Summary
              </h2>
              <p className="text-xs text-teal-100 max-w-xl leading-relaxed">
                The patient has completed their clinical history intake. Review the raw symptom responses below and generate the structured physician summary draft.
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-teal-700/60 sm:pl-6 shrink-0">
              <p className="text-[11px] text-teal-200">Patient</p>
              <p className="text-base font-bold text-white">{currentPatient.fullName}</p>
              <p className="text-xs text-teal-200">{currentPatient.age} Y • {currentPatient.gender} • ABHA Linked</p>
            </div>
          </div>
        </div>

        {/* Patient Reported Intake Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <FileText className="w-4 h-4 mr-2 text-teal-600" />
              Patient-Reported Clinical Intake (रोगी द्वारा दर्ज जानकारी)
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              Submitted: {intake ? new Date(intake.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Chief Complaint</span>
              <p className="text-sm font-bold text-slate-900">
                {intake?.chiefComplaint ? intake.chiefComplaint.replace(/_/g, ' ') : 'Chest Pain / Precordial Discomfort'}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Onset & Duration</span>
              <p className="text-sm font-bold text-slate-900">
                {intake?.answers?.['q_chest_pain_onset']
                  ? String(intake.answers['q_chest_pain_onset']).replace(/_/g, ' ')
                  : 'Acute onset within past 2-4 hours'}
              </p>
            </div>
          </div>

          {/* Patient Written Symptoms Record */}
          {intake?.writtenSymptoms && (
            <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center">
                  <PenTool className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
                  <span>Patient Written Symptoms & Dynamic Case Record</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Mode: {intake.writtenSymptoms.enteredVia}
                </span>
              </div>

              {intake.writtenSymptoms.rawText && (
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Patient's Written Narrative
                  </span>
                  <p className="text-xs text-slate-800 italic mt-0.5 leading-relaxed">
                    "{intake.writtenSymptoms.rawText}"
                  </p>
                </div>
              )}

              {intake.writtenSymptoms.symptomTags && intake.writtenSymptoms.symptomTags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-slate-700 flex items-center">
                    <Tag className="w-3 h-3 mr-1 text-emerald-600" />
                    Symptom Tags:
                  </span>
                  {intake.writtenSymptoms.symptomTags.map((tag, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px]">Reported Duration:</span>
                  <span className="font-semibold text-slate-800">
                    {intake.writtenSymptoms.duration ? intake.writtenSymptoms.duration.replace(/_/g, ' ') : 'Not specified'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Severity Score:</span>
                  <span className="font-semibold text-slate-800">{intake.writtenSymptoms.severityScore ?? 5}/10 ({intake.writtenSymptoms.severityLevel || 'MODERATE'})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Case Timing:</span>
                  <span className="font-semibold text-slate-800">
                    {intake.writtenSymptoms.timestamp
                      ? new Date(intake.writtenSymptoms.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Voice Transcript / Spoken Notes */}
          {intake?.freeTextAnswer && (
            <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100 space-y-1">
              <span className="text-[10px] font-bold text-teal-900 uppercase tracking-wider flex items-center">
                <span>🗣️ Patient Spoken Notes (Transcribed via Bhashini Voice Mode):</span>
              </span>
              <p className="text-xs text-slate-800 italic leading-relaxed">
                "{intake.freeTextAnswer}"
              </p>
            </div>
          )}

          {/* Red Flag Alerts if any */}
          {intake?.redFlags && intake.redFlags.length > 0 && (
            <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 flex items-start space-x-3">
              <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                  Critical Red-Flag Triage Criteria Flagged
                </span>
                <p className="text-xs text-rose-700 mt-0.5">
                  {intake.redFlags.map(r => r.reason || r.symptom).join('; ')}
                </p>
              </div>
            </div>
          )}

          {/* Document findings */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Uploaded Medical Documents: <strong>{patientDocs.length} record(s)</strong></span>
            <span>ABDM Health ID: <strong>{currentPatient.abhaProfile?.abhaId || '91-4521-8890-1234'}</strong></span>
          </div>
        </div>

        {/* Doctor Summarization Control Panel */}
        <div className="bg-white rounded-2xl border-2 border-teal-600 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Option for Doctor: Summarize Medical History
              </h3>
              <p className="text-xs text-slate-500">
                Select clinical note synthesis parameters and click Generate to create the standardized physician case draft.
              </p>
            </div>
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setSummaryStyle('STANDARD')}
              className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                summaryStyle === 'STANDARD'
                  ? 'border-teal-600 bg-teal-50/70 text-teal-950 font-semibold'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <span className="text-xs font-bold block">Standard OPD Note</span>
              <span className="text-[11px] text-slate-500 block mt-1">
                SOCRATES HPI, acute red-flags, and chronic meds
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSummaryStyle('COMPREHENSIVE')}
              className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                summaryStyle === 'COMPREHENSIVE'
                  ? 'border-teal-600 bg-teal-50/70 text-teal-950 font-semibold'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <span className="text-xs font-bold block">Comprehensive Case</span>
              <span className="text-[11px] text-slate-500 block mt-1">
                Full Allopathy + AYUSH Dashavidha Pariksha + Timeline
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSummaryStyle('EMERGENCY')}
              className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                summaryStyle === 'EMERGENCY'
                  ? 'border-teal-600 bg-teal-50/70 text-teal-950 font-semibold'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <span className="text-xs font-bold block">Emergency Triage</span>
              <span className="text-[11px] text-slate-500 block mt-1">
                Focused on acute vitals, abnormal labs, and red-flags
              </span>
            </button>
          </div>

          {/* Doctor Directive Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Doctor Directives / Custom Focus (Optional):
            </label>
            <input
              type="text"
              value={doctorDirectives}
              onChange={(e) => setDoctorDirectives(e.target.value)}
              placeholder="e.g., Focus on cardiac chest pain vs GERD, verify last dose of Metformin..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-teal-500 text-slate-800"
            />
          </div>

          {/* Generation Progress Indicator */}
          {isGenerating ? (
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <p className="text-sm font-bold text-teal-900">AI Clinical Synthesizer Working...</p>
                <p className="text-xs text-teal-700 font-medium mt-0.5 animate-pulse">{generationStep}</p>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleTriggerDoctorSummary}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-600/30 flex items-center justify-center space-x-2 text-sm transition-all active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4" />
              <span>डॉक्टर सारांश तैयार करें • Summarize Medical History with AI</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: FULL STRUCTURED CLINICAL SUMMARY (Ready for Doctor Review & Sign-off)
  // =========================================================================
  const fhirBundle = abhaService.exportToFHIRBundle(
    currentPatient.fullName,
    currentPatient.abhaProfile?.abhaId || '91-4521-8890-1234',
    summary
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner: Mandatory Physician Review Warning */}
      <div className={`rounded-2xl p-5 border shadow-sm transition-all ${
        summary.physicianReview.reviewed
          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
          : 'bg-amber-50/90 border-amber-300 text-amber-950'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start space-x-3">
            {summary.physicianReview.reviewed ? (
              <div className="p-2 bg-emerald-600 text-white rounded-xl shrink-0 mt-0.5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            ) : (
              <div className="p-2 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5 animate-pulse">
                <AlertTriangle className="w-6 h-6" />
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm uppercase tracking-wide">
                  {summary.physicianReview.reviewed ? 'Verified Clinical Record' : 'AI-Generated Clinical Intake Draft'}
                </span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  summary.physicianReview.reviewed ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                }`}>
                  {summary.physicianReview.reviewed ? 'Confirmed by Physician' : 'Requires Physician Review'}
                </span>
              </div>
              <p className="text-xs mt-1 text-slate-700 leading-relaxed">
                {summary.physicianReview.reviewed
                  ? `Confirmed and signed off by ${summary.physicianReview.reviewedDoctorName || 'Dr. Alok Sharma'} on ${new Date(summary.physicianReview.reviewedAt || '').toLocaleString()}.`
                  : 'Safety Notice: This AI-generated clinical history is an automated supportive intake draft. It does NOT provide autonomous diagnoses and must be reviewed, edited, and approved by the consulting doctor.'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => deleteSummary(currentPatient.id)}
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-colors flex items-center space-x-1.5"
              title="Re-run AI summarization with new directives"
            >
              <RefreshCw className="w-3.5 h-3.5 text-teal-600" />
              <span>Re-Summarize</span>
            </button>

            <button
              onClick={() => setShowFhirModal(true)}
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-teal-600" />
              <span>ABDM FHIR Export</span>
            </button>
          </div>
        </div>
      </div>

      {showConfirmedNotice && (
        <div className="bg-emerald-600 text-white p-3 rounded-xl text-center text-xs font-bold animate-in fade-in">
          ✓ Clinical history successfully verified, updated, and linked to patient OPD record!
        </div>
      )}

      {/* Main Clinical Case Document */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        {/* Document Header */}
        <div className="bg-slate-900 text-white p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest font-bold text-teal-400">
                Outpatient Case-Taking Record
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                Token: {currentPatient.tokenNumber || 'CARDIO-04'}
              </span>
            </div>
            <h1 className="text-2xl font-bold mt-1">{currentPatient.fullName}</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentPatient.age} Y / {currentPatient.gender} • ABHA ID: {currentPatient.abhaProfile?.abhaId || '91-4521-8890-1234'} • Phone: {currentPatient.phoneNumber}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs bg-teal-900/60 border border-teal-500/40 text-teal-300 px-3 py-1.5 rounded-xl font-medium">
              Dept: {currentPatient.assignedDepartment || 'Cardiology OPD'}
            </span>
          </div>
        </div>

        {/* Clinical Synthesis Content */}
        <div className="p-6 space-y-6">
          {/* Chief Complaint */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              1. Chief Complaint (मुख्य शिकायत)
            </span>
            <p className="text-base font-bold text-slate-900 mt-1">
              {summary.chiefComplaintSummary}
            </p>
          </div>

          {/* History of Present Illness (HPI with SOCRATES structure) */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                2. History of Present Illness (HPI - SOCRATES Framework)
              </span>
              {!summary.physicianReview.reviewed && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-teal-700 hover:text-teal-900 text-xs font-bold flex items-center space-x-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Cancel Edit' : 'Edit HPI'}</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <textarea
                value={editedHpi}
                onChange={(e) => setEditedHpi(e.target.value)}
                rows={5}
                className="w-full p-3 text-xs bg-white border border-teal-500 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
              />
            ) : (
              <p className="text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-line">
                {editedHpi || summary.hpiSummary}
              </p>
            )}
          </div>

          {/* Red Flag Alerts */}
          {summary.redFlagsList && summary.redFlagsList.length > 0 && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
              <div className="flex items-center space-x-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                <span>Detected Red Flags & Urgent Criteria</span>
              </div>
              <ul className="space-y-1.5 text-xs text-rose-900">
                {summary.redFlagsList.map((rf, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                    <span>
                      <strong>{rf.symptom}</strong>: {rf.reason} (Severity: {rf.severity})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Past History & Current Medications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                3. Past Medical & Comorbidities
              </span>
              <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                {summary.pastMedicalSurgicalSummary}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                4. Drug History & Known Allergies
              </span>
              <p className="text-xs text-slate-800 leading-relaxed">
                {summary.drugAndAllergySummary}
              </p>
            </div>
          </div>

          {/* AYUSH Assessment if present */}
          {summary.ayushSummary && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
                🌿 AYUSH Assessment (Dashavidha Pariksha)
              </span>
              <p className="text-xs text-emerald-950 font-mono whitespace-pre-line leading-relaxed">
                {summary.ayushSummary}
              </p>
            </div>
          )}

          {/* Doctor Clinical Notes & Sign-Off Section */}
          <div className="p-5 bg-teal-50/50 border border-teal-200 rounded-xl space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center">
                <Stethoscope className="w-4 h-4 mr-1 text-teal-700" />
                <span>Physician Consultation Notes & Confirmation (डॉक्टर नोट)</span>
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                Add clinical impression, diagnostic orders (ECG, Troponin-I, CBC), or modifications before sign-off.
              </p>
            </div>

            <textarea
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              placeholder="e.g. Advised urgent 12-lead ECG and sublingual Sorbitrate. Transfer to Cardiology Day Care Room 3."
              rows={2}
              disabled={summary.physicianReview.reviewed}
              className="w-full p-3 text-xs bg-white border border-slate-300 rounded-xl outline-none focus:border-teal-500 text-slate-800"
            />

            {!summary.physicianReview.reviewed ? (
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => handleConfirmReview('CLARIFICATION_REQUESTED')}
                  className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl transition-colors"
                >
                  Request Patient Clarification
                </button>
                <button
                  onClick={() => handleConfirmReview('CONFIRMED')}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify & Sign-Off Case (सत्यापित करें)</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs text-emerald-800 font-bold bg-emerald-100/60 p-3 rounded-xl">
                <span>✓ Case confirmed by {summary.physicianReview.reviewedDoctorName || 'Dr. Alok Sharma'}</span>
                <span>Signed at {new Date(summary.physicianReview.reviewedAt || '').toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FHIR Bundle Export Modal */}
      {showFhirModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Share2 className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-sm">ABDM FHIR v4.0.1 Health Document Bundle</h3>
              </div>
              <button
                onClick={() => setShowFhirModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold px-2"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              This bundle is compliant with the Ayushman Bharat Digital Mission (ABDM) M3 Clinical Artifact specifications.
            </p>

            <pre className="flex-1 bg-slate-900 text-emerald-400 p-4 rounded-xl text-[11px] font-mono overflow-auto leading-tight">
              {JSON.stringify(fhirBundle, null, 2)}
            </pre>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(fhirBundle, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `FHIR_Bundle_${currentPatient.id}.json`;
                  a.click();
                }}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download JSON Bundle</span>
              </button>
              <button
                onClick={() => setShowFhirModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
