// Conversational Multimodal History Taking Engine (Touch + Multilingual Voice Recognition + Dynamic Case Taking)

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { QuestionnaireQuestion, RedFlag, WrittenSymptomRecord } from '../types';
import { QUESTIONNAIRE_QUESTIONS, detectRedFlags, buildDynamicQuestions } from '../services/clinicalKnowledge';
import { bhashini, SpeechRecognitionResultItem } from '../services/bhashiniService';
import { DynamicSymptomInput } from './DynamicSymptomInput';
import {
  Mic,
  MicOff,
  Volume2,
  ChevronRight,
  ChevronLeft,
  Check,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  RefreshCw,
  Clock,
  UserCheck,
  FileText,
  UploadCloud,
  Stethoscope,
  Info,
  PenTool,
  Tag,
  Activity,
  HeartPulse
} from 'lucide-react';

interface ConversationalHistoryEngineProps {
  onComplete: () => void;
  onSwitchToDoctor?: () => void;
}

export const ConversationalHistoryEngine: React.FC<ConversationalHistoryEngineProps> = ({
  onComplete,
  onSwitchToDoctor
}) => {
  const {
    currentPatient,
    currentLanguage,
    speakGuidance,
    stopGuidance,
    triggerRedFlagAlert,
    submitPatientIntake,
    switchRole,
    logAuditAction
  } = useApp();

  const [engineMode, setEngineMode] = useState<'SYMPTOM_WRITING' | 'DYNAMIC_QUESTIONS'>('SYMPTOM_WRITING');
  const [writtenRecord, setWrittenRecord] = useState<WrittenSymptomRecord | null>(null);
  const [selectedCatalogTagIds, setSelectedCatalogTagIds] = useState<string[]>([]);
  const [activeQuestions, setActiveQuestions] = useState<QuestionnaireQuestion[]>(QUESTIONNAIRE_QUESTIONS);

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({
    q_chief_complaint: 'CHEST_PAIN'
  });
  const [freeTextAnswer, setFreeTextAnswer] = useState<string>('');
  const [interimVoiceText, setInterimVoiceText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [listeningError, setListeningError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedIntakeId, setSubmittedIntakeId] = useState<string>('');
  const [detectedRedFlagsList, setDetectedRedFlagsList] = useState<RedFlag[]>([]);

  const speechHandlerRef = useRef<{ stop: () => void } | null>(null);

  const currentQuestion = activeQuestions[currentStepIndex] || activeQuestions[0];

  // Auto-speak question prompt when audio guidance or question changes
  useEffect(() => {
    if (engineMode === 'DYNAMIC_QUESTIONS' && currentQuestion && !isSubmitted) {
      const promptText = currentQuestion.prompt[currentLanguage] || currentQuestion.prompt.en;
      speakGuidance(promptText);
    }
    return () => {
      stopGuidance();
    };
  }, [currentStepIndex, currentLanguage, isSubmitted, engineMode]);

  // Clean up mic on unmount
  useEffect(() => {
    return () => {
      if (speechHandlerRef.current) {
        speechHandlerRef.current.stop();
      }
    };
  }, []);

  // Voice Recognition Handler with Live Feedback & Interim Transcripts
  const toggleSpeechInput = () => {
    if (isListening) {
      if (speechHandlerRef.current) {
        speechHandlerRef.current.stop();
        speechHandlerRef.current = null;
      }
      setIsListening(false);
      setInterimVoiceText('');
      return;
    }

    setListeningError(null);
    setIsListening(true);
    setInterimVoiceText('');

    const handler = bhashini.startListening(
      currentLanguage,
      (result: SpeechRecognitionResultItem) => {
        setInterimVoiceText(result.transcript);

        if (result.isFinal) {
          setFreeTextAnswer(prev => prev ? `${prev} ${result.transcript}` : result.transcript);
          setInterimVoiceText('');

          // Real-time red flag check on recognized speech
          const flags = detectRedFlags({
            freeText: result.transcript,
            chiefComplaint: String(answers['q_chief_complaint'] || '')
          });
          if (flags.length > 0) {
            flags[0].patientId = currentPatient.id;
            triggerRedFlagAlert(flags[0]);
          }
        }
      },
      (error: string) => {
        setListeningError(error);
        setIsListening(false);
        setInterimVoiceText('');
      },
      () => {
        setIsListening(false);
        setInterimVoiceText('');
      }
    );

    speechHandlerRef.current = handler;
  };

  // Inject sample spoken phrase (for quick voice test or if mic hardware is absent/blocked)
  const handleQuickSpokenSample = (samplePhrase: string) => {
    setFreeTextAnswer(prev => prev ? `${prev} ${samplePhrase}` : samplePhrase);
    setInterimVoiceText('');

    // Check for red flags
    const flags = detectRedFlags({
      freeText: samplePhrase,
      chiefComplaint: String(answers['q_chief_complaint'] || '')
    });
    if (flags.length > 0) {
      flags[0].patientId = currentPatient.id;
      triggerRedFlagAlert(flags[0]);
    }

    logAuditAction('VOICE_INPUT_SIMULATED', 'QUESTIONNAIRE', currentPatient.id, true, `Spoken sample added: ${samplePhrase}`);
  };

  // Handle Dynamic Symptom Input Submission
  const handleSymptomInputComplete = (data: {
    writtenRecord: WrittenSymptomRecord;
    selectedCatalogIds: string[];
    detectedRedFlags: RedFlag[];
  }) => {
    setWrittenRecord(data.writtenRecord);
    setSelectedCatalogTagIds(data.selectedCatalogIds);

    // Map chief complaint if user selected a primary tag
    if (data.selectedCatalogIds.length > 0) {
      const primaryId = data.selectedCatalogIds[0];
      let inferredComplaint = 'GENERAL';
      if (primaryId.includes('chest') || primaryId.includes('palpitation')) inferredComplaint = 'CHEST_PAIN';
      else if (primaryId.includes('cough') || primaryId.includes('breath') || primaryId.includes('wheeze')) inferredComplaint = 'BREATHLESSNESS';
      else if (primaryId.includes('abdom') || primaryId.includes('vomit') || primaryId.includes('diarrhea')) inferredComplaint = 'ABDOMINAL_PAIN';
      else if (primaryId.includes('headache') || primaryId.includes('dizziness')) inferredComplaint = 'HEADACHE';
      else if (primaryId.includes('fever')) inferredComplaint = 'FEVER';
      else if (primaryId.includes('joint') || primaryId.includes('back')) inferredComplaint = 'JOINT_PAIN';
      else if (primaryId.includes('prakriti') || primaryId.includes('ayush')) inferredComplaint = 'AYUSH_WELLNESS';

      setAnswers(prev => ({
        ...prev,
        q_chief_complaint: inferredComplaint
      }));
    }

    // Build tailored dynamic questions using clinical knowledge engine
    const dynamicQuestions = buildDynamicQuestions({
      writtenText: data.writtenRecord.rawText,
      selectedSymptomIds: data.selectedCatalogIds,
      chiefComplaint: answers['q_chief_complaint'] as string
    });

    setActiveQuestions(dynamicQuestions);
    setCurrentStepIndex(0);
    setEngineMode('DYNAMIC_QUESTIONS');

    // Trigger red flags if detected
    if (data.detectedRedFlags.length > 0) {
      data.detectedRedFlags.forEach(rf => {
        rf.patientId = currentPatient.id;
        triggerRedFlagAlert(rf);
      });
      setDetectedRedFlagsList(prev => [...prev, ...data.detectedRedFlags]);
    }

    logAuditAction(
      'DYNAMIC_SYMPTOMS_ENTERED',
      'PATIENT_INTAKE',
      currentPatient.id,
      true,
      `Symptoms recorded: "${data.writtenRecord.rawText}". Generated ${dynamicQuestions.length} tailored clinical questions.`
    );
  };

  // Option selection handler
  const handleSelectOption = (optionValue: string) => {
    if (currentQuestion.inputType === 'MULTI_CHOICE') {
      const currentList = (answers[currentQuestion.id] as string[]) || [];
      const updated = currentList.includes(optionValue)
        ? currentList.filter(v => v !== optionValue)
        : [...currentList, optionValue];
      setAnswers({ ...answers, [currentQuestion.id]: updated });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: optionValue });

      // Immediate check for red flag triggers on option
      const selectedOpt = currentQuestion.options?.find(o => o.value === optionValue);
      if (selectedOpt?.triggersRedFlag) {
        const flag: RedFlag = {
          id: `rf_auto_${Date.now()}`,
          patientId: currentPatient.id,
          severity: 'CRITICAL',
          symptom: selectedOpt.label[currentLanguage] || selectedOpt.label.en,
          triggerSource: 'PATIENT_INPUT',
          reason: selectedOpt.redFlagReason || 'Emergency clinical criteria satisfied.',
          actionRequired: 'Urgent bedside clinical triage evaluation required.',
          detectedAt: new Date().toISOString(),
          acknowledged: false
        };
        triggerRedFlagAlert(flag);
        setDetectedRedFlagsList(prev => [...prev, flag]);
      }
    }
  };

  const isOptionSelected = (val: string) => {
    const current = answers[currentQuestion.id];
    if (Array.isArray(current)) return current.includes(val);
    return current === val;
  };

  // Step Navigation
  const handleNext = () => {
    // Save free text if entered
    if (freeTextAnswer) {
      setAnswers(prev => ({ ...prev, [`${currentQuestion.id}_text`]: freeTextAnswer }));
      setFreeTextAnswer('');
      setInterimVoiceText('');
    }

    if (currentStepIndex < activeQuestions.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Completed interview -> Submit intake to Doctor's OPD Queue!
      finishIntakeSubmission();
    }
  };

  const finishIntakeSubmission = () => {
    const intakeId = `intk_${currentPatient.id}_${Date.now()}`;
    const chiefComplaint = String(answers['q_chief_complaint'] || 'Outpatient Consultation');

    const combinedFreeText = [
      freeTextAnswer,
      writtenRecord?.rawText,
      writtenRecord?.symptomTags?.join(', ')
    ].filter(Boolean).join('; ');

    const flags = detectRedFlags({
      chiefComplaint,
      selectedAnswers: answers,
      freeText: combinedFreeText
    });
    setDetectedRedFlagsList(flags);

    // Register intake in central state
    submitPatientIntake({
      id: intakeId,
      patientId: currentPatient.id,
      chiefComplaint,
      answers,
      freeTextAnswer,
      writtenSymptoms: writtenRecord || undefined,
      submittedAt: new Date().toISOString(),
      redFlags: flags,
      status: 'AWAITING_DOCTOR_SUMMARY'
    });

    setSubmittedIntakeId(intakeId);
    setIsSubmitted(true);
    stopGuidance();

    logAuditAction(
      'PATIENT_HISTORY_SUBMITTED_TO_DOCTOR',
      'PATIENT_INTAKE',
      intakeId,
      true,
      `Clinical history for ${currentPatient.fullName} successfully submitted. Awaiting doctor clinical summarization.`
    );
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
      // Return to dynamic symptom writing step
      setEngineMode('SYMPTOM_WRITING');
    }
  };

  const handleResetForNextPatient = () => {
    setIsSubmitted(false);
    setEngineMode('SYMPTOM_WRITING');
    setWrittenRecord(null);
    setSelectedCatalogTagIds([]);
    setCurrentStepIndex(0);
    setActiveQuestions(QUESTIONNAIRE_QUESTIONS);
    setAnswers({ q_chief_complaint: 'CHEST_PAIN' });
    setFreeTextAnswer('');
    setInterimVoiceText('');
  };

  const progressPct = Math.round(((currentStepIndex + 1) / activeQuestions.length) * 100);
  const sampleVoicePhrases = bhashini.getSamplePhrases(currentLanguage);

  // ==========================================
  // CONFIRMATION VIEW AFTER PATIENT ENTERS HISTORY
  // ==========================================
  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Success Header Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              इतिहास सफलतापूर्वक दर्ज हुआ • Dynamic History Successfully Submitted
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              आपकी स्वास्थ्य जानकारी डॉक्टर को भेज दी गई है
            </h1>
            <p className="text-sm text-slate-600 max-w-xl mx-auto mt-1">
              Your personalized clinical case history and written symptoms have been securely submitted to the Bharat Arogya OPD Queue.
              The attending physician can now review your intake and generate the AI Clinical Summary.
            </p>
          </div>

          {/* OPD Token & Dept Details Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-left grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">OPD Token</span>
              <span className="text-2xl font-black font-mono text-teal-700">
                {currentPatient.tokenNumber || 'CARDIO-04'}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Department & Room</span>
              <span className="text-sm font-bold text-slate-800 block">
                {currentPatient.assignedDepartment || 'AIIMS Cardiology OPD Room 14'}
              </span>
              <span className="text-xs text-slate-500">Attending: Dr. Alok Sharma, MD</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Clinical Status</span>
              <span className="inline-flex items-center text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 mt-0.5">
                <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" />
                Awaiting Doctor's Summary
              </span>
            </div>
          </div>

          {/* Submitted Data & Written Symptoms Summary Box */}
          <div className="bg-teal-50/50 border border-teal-200 rounded-xl p-4 text-left space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center">
              <FileText className="w-3.5 h-3.5 mr-1.5 text-teal-700" />
              दर्ज किए गए मुख्य लक्षण (Patient Reported Intake & Symptoms)
            </h3>

            {writtenRecord && (
              <div className="p-3 bg-white rounded-xl border border-teal-100 space-y-2 text-xs text-slate-700">
                {writtenRecord.rawText && (
                  <div>
                    <span className="font-semibold text-slate-900 block">मरीज द्वारा लिखे गए लक्षण (Written Symptoms):</span>
                    <p className="italic text-slate-800 mt-0.5">"{writtenRecord.rawText}"</p>
                  </div>
                )}

                {writtenRecord.symptomTags && writtenRecord.symptomTags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="font-semibold text-slate-900">पहचाने गए लक्षण (Tags):</span>
                    {writtenRecord.symptomTags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-medium text-[11px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-slate-600">
                  <div>
                    <span className="text-slate-400 block">अवधि (Duration):</span>
                    <span className="font-semibold text-slate-800">
                      {writtenRecord.duration ? writtenRecord.duration.replace(/_/g, ' ') : 'निर्दिष्ट नहीं (Not specified)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">तीव्रता (Severity):</span>
                    <span className="font-semibold text-slate-800">{writtenRecord.severityScore} / 10 ({writtenRecord.severityLevel})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">माध्यम (Mode):</span>
                    <span className="font-semibold text-slate-800">{writtenRecord.enteredVia}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="text-xs text-slate-700 space-y-1">
              <p>
                <span className="font-semibold text-slate-900">मुख्य शिकायत (Chief Complaint):</span>{' '}
                {String(answers['q_chief_complaint'] || 'Outpatient Consultation').replace(/_/g, ' ')}
              </p>
              {freeTextAnswer && (
                <p>
                  <span className="font-semibold text-slate-900">अतिरिक्त विवरण (Spoken Notes):</span>{' '}
                  "{freeTextAnswer}"
                </p>
              )}
              {detectedRedFlagsList.length > 0 && (
                <div className="flex items-center text-rose-700 font-semibold pt-1">
                  <AlertOctagon className="w-4 h-4 mr-1 text-rose-600 shrink-0" />
                  <span>{detectedRedFlagsList.length} Emergency Red-Flag criteria detected and escalated to triage!</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Options: Highlighted Doctor Summarize Trigger */}
          <div className="pt-2 space-y-3">
            <div className="p-4 rounded-xl bg-gradient-to-r from-teal-700 to-teal-900 text-white shadow-md text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-800/80 px-2.5 py-0.5 rounded-full border border-teal-500">
                  Doctor's Action
                </span>
                <h4 className="text-lg font-bold mt-1">डॉक्टर कक्ष में सारांश तैयार करें</h4>
                <p className="text-xs text-teal-100">
                  Switch to the Physician's Workspace to review the patient's written symptoms and generate the AI Clinical Summary.
                </p>
              </div>

              <button
                onClick={() => {
                  switchRole('DOCTOR');
                  if (onSwitchToDoctor) {
                    onSwitchToDoctor();
                  } else {
                    onComplete();
                  }
                }}
                className="px-5 py-2.5 bg-white hover:bg-slate-100 text-teal-900 font-bold rounded-xl text-sm shadow-md flex items-center space-x-2 shrink-0 transition-transform active:scale-95"
              >
                <Stethoscope className="w-4 h-4 text-teal-700" />
                <span>डॉक्टर व्यू में जाएँ (Switch to Doctor)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onComplete}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <UploadCloud className="w-4 h-4 text-slate-600" />
                <span>पुराने पर्चे स्कैन करें (Upload / Scan Reports)</span>
              </button>

              <button
                onClick={handleResetForNextPatient}
                className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4 text-slate-500" />
                <span>नया मरीज दर्ज करें (New Patient Intake)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MODE 1: DYNAMIC SYMPTOM WRITING ENTRY VIEW
  // ==========================================
  if (engineMode === 'SYMPTOM_WRITING') {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Intake Navigation Stepper */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center">
              1
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                Step 1 of 2: Dynamic Symptom Input
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Write, speak, or select symptoms for {currentPatient.fullName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                // Skip directly to standard questions
                setActiveQuestions(QUESTIONNAIRE_QUESTIONS);
                setEngineMode('DYNAMIC_QUESTIONS');
              }}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Skip to Standard Questions
            </button>
          </div>
        </div>

        {/* Dynamic Symptom Input Component */}
        <DynamicSymptomInput
          currentLanguage={currentLanguage}
          initialWrittenText={writtenRecord?.rawText || ''}
          initialSelectedTags={selectedCatalogTagIds}
          onComplete={handleSymptomInputComplete}
          onCancel={onComplete}
        />
      </div>
    );
  }

  // ==========================================
  // MODE 2: TAILORED DYNAMIC QUESTIONNAIRE VIEW
  // ==========================================
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Dynamic Intake Status & Symptom Edit Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
              Dynamic Intake: Tailored Case Taking
            </span>
            <span className="text-xs text-slate-500">
              ({activeQuestions.length} tailored questions)
            </span>
          </div>

          <button
            type="button"
            onClick={() => setEngineMode('SYMPTOM_WRITING')}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Edit / Write More Symptoms</span>
          </button>
        </div>

        {/* Written Symptoms Chip Summary */}
        {writtenRecord && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Active Symptoms:</span>
            {writtenRecord.rawText && (
              <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-medium italic truncate max-w-[240px]">
                "{writtenRecord.rawText}"
              </span>
            )}
            {writtenRecord.symptomTags?.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
            <span className="text-[11px] text-slate-400 ml-auto">
              Severity: {writtenRecord.severityScore}/10 ({writtenRecord.severityLevel})
            </span>
          </div>
        )}

        {/* Progress Header */}
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300 pt-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-teal-800 dark:text-teal-200 bg-teal-50 dark:bg-teal-950 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800 text-xs">
              सवाल {currentStepIndex + 1} of {activeQuestions.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {currentPatient.fullName} ({currentPatient.age} Y / {currentPatient.gender})
            </span>
          </div>

          <button
            onClick={() => {
              const promptText = currentQuestion.prompt[currentLanguage] || currentQuestion.prompt.en;
              speakGuidance(promptText);
            }}
            className="flex items-center space-x-1 text-teal-700 dark:text-teal-300 hover:text-teal-900 text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-50/60 dark:bg-teal-950/60 hover:bg-teal-100 transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>सुनें (Listen)</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        {/* Question Title */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQuestion.prompt[currentLanguage] || currentQuestion.prompt.en}
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">
            {currentQuestion.inputType === 'MULTI_CHOICE'
              ? 'आप एक से अधिक विकल्प चुन सकते हैं (Select all that apply)'
              : 'कृपया एक विकल्प चुनें या नीचे बोलकर / लिखकर उत्तर दें (Select an option, write or speak below)'}
          </p>
        </div>

        {/* Option Buttons */}
        {currentQuestion.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQuestion.options.map((opt) => {
              const selected = isOptionSelected(opt.value);
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.value)}
                  className={`p-4 rounded-xl text-left border-2 transition-all flex items-start justify-between min-h-[64px] ${
                    selected
                      ? 'border-teal-600 bg-teal-50/80 text-teal-950 font-semibold shadow-xs scale-[1.01]'
                      : 'border-slate-200 hover:border-teal-400 bg-white text-slate-800 hover:bg-slate-50'
                  } ${opt.triggersRedFlag ? 'hover:border-rose-300' : ''}`}
                >
                  <div className="flex-1 pr-2">
                    <span className="text-base sm:text-lg block">
                      {opt.label[currentLanguage] || opt.label.en}
                    </span>
                    {currentLanguage !== 'en' && opt.label.en && (
                      <span className="text-xs text-slate-500 block mt-0.5 font-normal">
                        {opt.label.en}
                      </span>
                    )}
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      selected ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Interactive Voice & Free Text Mode Panel */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center">
                <Mic className="w-3.5 h-3.5 mr-1 text-teal-600" />
                <span>आवाज या लिखकर उत्तर दें • Voice or Written Answer</span>
              </span>
              <p className="text-[11px] text-slate-500">
                Speak directly in your language or write specific details for this question.
              </p>
            </div>

            {/* Microphone Toggle Button */}
            <button
              onClick={toggleSpeechInput}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse ring-4 ring-rose-300/50'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>रिकॉर्डिंग बंद करें (Stop Listening)</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>🎤 माइक शुरू करें (Start Voice)</span>
                </>
              )}
            </button>
          </div>

          {/* Active Listening Audio Wave Visualizer */}
          {isListening && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center space-x-4 animate-in fade-in duration-200">
              <div className="flex items-center space-x-1 shrink-0">
                <span className="w-1.5 h-6 bg-rose-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-9 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-5 bg-rose-600 rounded-full animate-bounce [animation-delay:-0.4s]" />
                <span className="w-1.5 h-8 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
                <span className="w-1.5 h-4 bg-rose-600 rounded-full animate-bounce" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-rose-800">
                  🔴 सुन रहा हूँ... बोलिए (Listening now in your chosen language)
                </p>
                <p className="text-xs text-rose-600 italic mt-0.5 min-h-[18px]">
                  {interimVoiceText || 'अपनी समस्या विस्तार से बताएं... (Speak your symptoms)'}
                </p>
              </div>
            </div>
          )}

          {/* Error / Fallback Notification if Mic blocked */}
          {listeningError && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl p-3 flex items-start space-x-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{listeningError}</p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Tip: You can also click on the ready-to-test spoken samples below or type in the text box.
                </p>
              </div>
            </div>
          )}

          {/* Live Spoken Text Display / Textarea */}
          <textarea
            value={freeTextAnswer}
            onChange={(e) => setFreeTextAnswer(e.target.value)}
            placeholder="यदि आप कुछ और बताना चाहते हैं तो यहाँ लिखें या बोलें... (e.g. लक्षण कब शुरू हुआ, कितना दर्द है)"
            rows={2}
            className="w-full p-3.5 rounded-xl border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 bg-slate-50/50"
          />

          {/* Quick Voice Simulation / One-Click Test Phrases */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              💡 त्वरित बोलकर जाँचें (Click to Test Spoken Sample):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sampleVoicePhrases.slice(0, 3).map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickSpokenSample(sample)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-900 border border-slate-200 hover:border-teal-300 rounded-lg text-xs text-slate-700 text-left transition-colors flex items-center space-x-1"
                >
                  <span className="text-teal-600 font-bold">🗣️</span>
                  <span className="truncate max-w-[280px]">{sample}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
          <button
            onClick={handleBack}
            className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm flex items-center space-x-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{currentStepIndex === 0 ? 'लक्षण बदलें (Edit Symptoms)' : 'पीछे (Back)'}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex-1 sm:flex-initial px-7 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md shadow-teal-600/20 flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            {currentStepIndex === activeQuestions.length - 1 ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>इतिहास जमा करें (Submit Intake to Doctor)</span>
              </>
            ) : (
              <>
                <span>आगे बढ़ें (Next Question)</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
