// Central App State, Authentication, RBAC, Language & Accessibility Context

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  LanguageCode,
  PatientProfile,
  DoctorProfile,
  MedicalDocument,
  ClinicalSummary,
  TriageRecord,
  AuditLog,
  RedFlag,
  PatientConsent,
  PatientIntakeSubmission,
  DiagnosticLabOrder,
  PrescriptionOrder
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PATIENTS,
  INITIAL_DOCTORS,
  INITIAL_DOCUMENTS,
  INITIAL_SUMMARIES,
  INITIAL_TRIAGE_RECORDS,
  INITIAL_AUDIT_LOGS,
  INITIAL_TIMELINE,
  INITIAL_LAB_ORDERS,
  INITIAL_PRESCRIPTIONS
} from '../services/mockData';
import { bhashini } from '../services/bhashiniService';
import { aiSummaryService } from '../services/aiSummaryService';
import { detectRedFlags } from '../services/clinicalKnowledge';

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  audioGuidance: boolean;
  reduceMotion: boolean;
}

interface AppContextType {
  // Auth & RBAC
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  token: string;
  isAuthenticated: boolean;
  loginWithABHA: (abhaIdOrAddress: string, otp: string) => Promise<{ success: boolean; message: string; patient?: PatientProfile }>;
  loginAsDoctor: (doctorIdOrReg: string, passwordOrPin?: string) => Promise<{ success: boolean; message: string }>;
  loginAsLabTech: (techId: string) => Promise<{ success: boolean; message: string }>;
  loginAsPharmacist: (licenseOrId: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authModalInitialRole: UserRole | null;
  openAuthModalWithRole: (role: UserRole) => void;
  isPublicSiteView: boolean;
  setIsPublicSiteView: (val: boolean) => void;

  // Language & Audio
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  speakGuidance: (text: string) => void;
  stopGuidance: () => void;

  // Accessibility
  accessibility: AccessibilitySettings;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;

  // Kiosk Mode
  isKioskMode: boolean;
  setIsKioskMode: (active: boolean) => void;
  resetKioskSession: () => void;

  // Data Collections
  patients: PatientProfile[];
  currentPatient: PatientProfile;
  setCurrentPatientId: (id: string) => void;
  updatePatientProfile: (updated: PatientProfile) => void;
  doctors: DoctorProfile[];
  documents: MedicalDocument[];
  addDocument: (doc: MedicalDocument) => void;
  patientIntakes: Record<string, PatientIntakeSubmission>;
  submitPatientIntake: (intake: PatientIntakeSubmission) => void;
  generateDoctorSummary: (
    patientId: string,
    options?: { style?: 'STANDARD' | 'COMPREHENSIVE' | 'EMERGENCY'; language?: LanguageCode; notes?: string }
  ) => Promise<ClinicalSummary>;
  summaries: Record<string, ClinicalSummary>;
  saveSummary: (summary: ClinicalSummary) => void;
  deleteSummary: (patientId: string) => void;
  updatePhysicianReview: (
    patientId: string,
    doctorName: string,
    action: 'CONFIRMED' | 'CLARIFICATION_REQUESTED' | 'MODIFIED',
    notes: string,
    editedContent?: string
  ) => void;
  triageRecords: TriageRecord[];
  updateTriagePriority: (recordId: string, priority: 'P1_CRITICAL' | 'P2_URGENT' | 'P3_ROUTINE', notes?: string) => void;
  auditLogs: AuditLog[];
  logAuditAction: (action: string, resource: string, resourceId?: string, success?: boolean, details?: string) => void;

  // Diagnostics & Pharmacy
  labOrders: DiagnosticLabOrder[];
  updateLabOrder: (orderId: string, updates: Partial<DiagnosticLabOrder>) => void;
  submitLabResults: (
    orderId: string,
    results: { testName: string; resultValue: string; flag?: 'NORMAL' | 'HIGH' | 'LOW' | 'CRITICAL'; interpretation?: string }[]
  ) => void;
  prescriptions: PrescriptionOrder[];
  dispensePrescription: (prescriptionId: string, medicineIds: string[], batchNumber?: string) => void;

  // Active Red Flag Emergency Notification
  activeRedFlagAlert: RedFlag | null;
  dismissRedFlagAlert: () => void;
  triggerRedFlagAlert: (flag: RedFlag) => void;

  // Consent
  activeConsent: PatientConsent | null;
  grantConsent: (scope?: string[]) => void;
  withdrawConsent: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user defaults to Patient for immediate Kiosk demonstration
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS.find(u => u.role === 'PATIENT') || INITIAL_USERS[0]);
  const [token] = useState<string>('jwt_medikiosk_demo_token_2026');

  // Language & Accessibility
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('hi');
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    highContrast: false,
    audioGuidance: false,
    reduceMotion: false
  });
  const [isKioskMode, setIsKioskMode] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPublicSiteView, setIsPublicSiteView] = useState<boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<UserRole | null>(null);

  // Diagnostics & Pharmacy collections
  const [labOrders, setLabOrders] = useState<DiagnosticLabOrder[]>(INITIAL_LAB_ORDERS);
  const [prescriptions, setPrescriptions] = useState<PrescriptionOrder[]>(INITIAL_PRESCRIPTIONS);

  // Core Data Stores
  const [patients, setPatients] = useState<PatientProfile[]>(INITIAL_PATIENTS);
  const [currentPatientId, setCurrentPatientIdState] = useState<string>(INITIAL_PATIENTS[0].id);
  const [doctors] = useState<DoctorProfile[]>(INITIAL_DOCTORS);
  const [documents, setDocuments] = useState<MedicalDocument[]>(INITIAL_DOCUMENTS);
  const [summaries, setSummaries] = useState<Record<string, ClinicalSummary>>(INITIAL_SUMMARIES);
  const [triageRecords, setTriageRecords] = useState<TriageRecord[]>(INITIAL_TRIAGE_RECORDS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [activeRedFlagAlert, setActiveRedFlagAlert] = useState<RedFlag | null>(null);

  // Patient Intake Submissions (Recorded when patient completes Kiosk interview)
  const [patientIntakes, setPatientIntakes] = useState<Record<string, PatientIntakeSubmission>>({
    pat_1: {
      id: 'intk_pat_1',
      patientId: 'pat_1',
      chiefComplaint: 'CHEST_PAIN',
      answers: {
        q_chief_complaint: 'CHEST_PAIN',
        q_chest_pain_onset: 'ACUTE_HOURS',
        q_chest_pain_radiation: 'YES_LEFT_ARM_JAW',
        q_chest_pain_associated: ['DIAPHORESIS', 'DYSPNEA'],
        q_past_medical: ['HYPERTENSION', 'DIABETES_TYPE_2']
      },
      freeTextAnswer: 'सीने में अचानक तेज जकड़न महसूस हुई जो बायीं बांह तक फैल रही है। बहुत पसीना आ रहा है।',
      submittedAt: new Date(Date.now() - 15 * 60000).toISOString(),
      redFlags: [],
      status: 'AWAITING_DOCTOR_SUMMARY'
    },
    pat_2: {
      id: 'intk_pat_2',
      patientId: 'pat_2',
      chiefComplaint: 'FEVER_COUGH',
      answers: {
        q_chief_complaint: 'FEVER_COUGH',
        q_fever_duration: 'DURATION_3_TO_7_DAYS',
        q_past_medical: ['ASTHMA_COPD']
      },
      freeTextAnswer: '3 दिनों से बुखार और खांसी है। रात में सांस लेने में घरघराहट होती है।',
      submittedAt: new Date(Date.now() - 35 * 60000).toISOString(),
      redFlags: [],
      status: 'SUMMARIZED'
    },
    pat_3: {
      id: 'intk_pat_3',
      patientId: 'pat_3',
      chiefComplaint: 'DYSPNEA_BREATHLESSNESS',
      answers: {
        q_chief_complaint: 'DYSPNEA_BREATHLESSNESS',
        q_past_medical: ['ASTHMA_COPD'],
        q_allergies: ['POLLEN_DUST']
      },
      freeTextAnswer: 'सीढ़ियां चढ़ने पर सांस फूलने लगती है। इनहेलर लेने से थोड़ा आराम मिलता है।',
      submittedAt: new Date(Date.now() - 45 * 60000).toISOString(),
      redFlags: [],
      status: 'AWAITING_DOCTOR_SUMMARY'
    },
    pat_4: {
      id: 'intk_pat_4',
      patientId: 'pat_4',
      chiefComplaint: 'ABDOMINAL_PAIN',
      answers: {
        q_chief_complaint: 'ABDOMINAL_PAIN',
        q_ayush_prakriti: 'PITTA_TIKSHNAGNI'
      },
      freeTextAnswer: 'खाने के बाद पेट के ऊपरी हिस्से में तेज जलन और दर्द होता है।',
      submittedAt: new Date(Date.now() - 60 * 60000).toISOString(),
      redFlags: [],
      status: 'AWAITING_DOCTOR_SUMMARY'
    }
  });

  // Consent State
  const [activeConsent, setActiveConsent] = useState<PatientConsent | null>({
    id: 'cns_initial_1',
    patientId: INITIAL_PATIENTS[0].id,
    purpose: 'Digital OPD Clinical History Acquisition & Medical Record Structuring',
    scope: ['CLINICAL_HISTORY', 'PRESCRIPTION_OCR', 'TIMELINE_INTEGRATION'],
    status: 'ACTIVE',
    version: 'DPDP-2023-V2.1',
    grantedAt: new Date().toISOString(),
    dpdpCompliant: true,
    abdmConsentId: 'abdm-cns-882190'
  });

  const currentPatient = patients.find(p => p.id === currentPatientId) || patients[0];

  const setCurrentPatientId = (id: string) => {
    setCurrentPatientIdState(id);
    logAuditAction('PATIENT_RECORD_ACCESSED', 'PATIENT_PROFILE', id, true, `Loaded profile of patient ${id}`);
  };

  const updatePatientProfile = (updated: PatientProfile) => {
    setPatients(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  // Role switching & Auth handlers
  const openAuthModalWithRole = (role: UserRole) => {
    setAuthModalInitialRole(role);
    setShowAuthModal(true);
  };

  const switchRole = (role: UserRole) => {
    const matchedUser = INITIAL_USERS.find(u => u.role === role);
    if (matchedUser) {
      setCurrentUser(matchedUser);
      setIsAuthenticated(true);
      setIsPublicSiteView(false);
      logAuditAction('ROLE_SWITCH', 'USER_SESSION', matchedUser.id, true, `Switched view to role: ${role}`);
      
      // Auto-exit kiosk mode for clinicians, staff, and pharmacy/lab
      if (role === 'DOCTOR' || role === 'ADMIN' || role === 'TRIAGE_STAFF' || role === 'LAB_TECHNICIAN' || role === 'PHARMACIST') {
        setIsKioskMode(false);
      } else {
        setIsKioskMode(true);
      }
    }
  };

  const loginWithABHA = async (abhaIdOrAddress: string, otp: string): Promise<{ success: boolean; message: string; patient?: PatientProfile }> => {
    if (!otp || otp.trim().length < 4) {
      return { success: false, message: 'Please enter a valid 6-digit OTP' };
    }

    const cleanInput = abhaIdOrAddress.trim().toLowerCase();
    const matched = patients.find(p => 
      (p.abhaProfile?.abhaId && p.abhaProfile.abhaId.toLowerCase().includes(cleanInput)) ||
      (p.abhaProfile?.abhaAddress && p.abhaProfile.abhaAddress.toLowerCase().includes(cleanInput)) ||
      p.phoneNumber.replace(/\s+/g, '').includes(cleanInput) ||
      p.fullName.toLowerCase().includes(cleanInput)
    ) || patients[0];

    setCurrentPatientIdState(matched.id);
    const patUser: User = {
      id: matched.userId || `usr_${matched.id}`,
      email: matched.abhaProfile?.abhaAddress ? `${matched.abhaProfile.abhaAddress}` : `${matched.id}@patient.in`,
      role: 'PATIENT',
      fullName: matched.fullName,
      phoneNumber: matched.phoneNumber,
      createdAt: matched.createdAt
    };

    setCurrentUser(patUser);
    setIsAuthenticated(true);
    setIsKioskMode(true);
    setIsPublicSiteView(false);
    setShowAuthModal(false);

    logAuditAction('ABHA_OTP_LOGIN', 'ABHA_AUTH_GATEWAY', matched.id, true, `Authenticated via ABHA: ${matched.abhaProfile?.abhaId || matched.phoneNumber} with Aadhaar KYC`);
    return { 
      success: true, 
      message: `Namaste ${matched.fullName}! Verified with ABDM National Health Authority (ABHA: ${matched.abhaProfile?.abhaId || 'Linked'}).`, 
      patient: matched 
    };
  };

  const loginAsDoctor = async (doctorIdOrReg: string): Promise<{ success: boolean; message: string }> => {
    const clean = doctorIdOrReg.trim().toLowerCase();
    const matchedDoc = doctors.find(d => 
      d.id.toLowerCase() === clean ||
      d.registrationNumber.toLowerCase().includes(clean) ||
      d.fullName.toLowerCase().includes(clean)
    ) || doctors[0];

    const docUser = INITIAL_USERS.find(u => u.id === matchedDoc.userId) || {
      id: matchedDoc.userId,
      email: `${matchedDoc.id}@hospital.gov.in`,
      role: 'DOCTOR' as const,
      fullName: matchedDoc.fullName,
      createdAt: new Date().toISOString()
    };

    setCurrentUser(docUser);
    setIsAuthenticated(true);
    setIsKioskMode(false);
    setIsPublicSiteView(false);
    setShowAuthModal(false);

    logAuditAction('DOCTOR_LOGIN', 'MEDICAL_COUNCIL_AUTH', matchedDoc.id, true, `Logged in: ${matchedDoc.fullName} (${matchedDoc.registrationNumber})`);
    return { success: true, message: `${matchedDoc.fullName} authenticated for ${matchedDoc.department}.` };
  };

  const loginAsLabTech = async (techId: string): Promise<{ success: boolean; message: string }> => {
    const labUser = INITIAL_USERS.find(u => u.role === 'LAB_TECHNICIAN') || {
      id: 'usr_lab_1',
      email: 'kavita.lab@hospital.gov.in',
      role: 'LAB_TECHNICIAN' as const,
      fullName: 'Kavita Sharma, B.Sc MLT',
      createdAt: new Date().toISOString()
    };

    setCurrentUser(labUser);
    setIsAuthenticated(true);
    setIsKioskMode(false);
    setIsPublicSiteView(false);
    setShowAuthModal(false);

    logAuditAction('LAB_TECH_LOGIN', 'LAB_PORTAL_AUTH', techId || labUser.id, true, `Logged in: ${labUser.fullName}`);
    return { success: true, message: `Lab Technician ${labUser.fullName} signed into Diagnostic Laboratory Portal.` };
  };

  const loginAsPharmacist = async (licenseOrId: string): Promise<{ success: boolean; message: string }> => {
    const pharmUser = INITIAL_USERS.find(u => u.role === 'PHARMACIST') || {
      id: 'usr_pharm_1',
      email: 'rajesh.pharm@hospital.gov.in',
      role: 'PHARMACIST' as const,
      fullName: 'Rajesh Gupta, B.Pharm, R.Ph',
      createdAt: new Date().toISOString()
    };

    setCurrentUser(pharmUser);
    setIsAuthenticated(true);
    setIsKioskMode(false);
    setIsPublicSiteView(false);
    setShowAuthModal(false);

    logAuditAction('PHARMACIST_LOGIN', 'DISPENSARY_AUTH', licenseOrId || pharmUser.id, true, `Logged in: ${pharmUser.fullName}`);
    return { success: true, message: `Pharmacist ${pharmUser.fullName} signed into Hospital OPD Dispensary.` };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsPublicSiteView(true);
    logAuditAction('USER_LOGOUT', 'SESSION', currentUser.id, true, `User ${currentUser.fullName} signed out.`);
  };

  const updateLabOrder = (orderId: string, updates: Partial<DiagnosticLabOrder>) => {
    setLabOrders(prev => prev.map(o => o.id === orderId ? { ...o, ...updates } : o));
    logAuditAction('LAB_ORDER_UPDATED', 'DIAGNOSTIC_ORDER', orderId, true, `Status changed to ${updates.status || 'updated'}`);
  };

  const submitLabResults = (
    orderId: string,
    results: { testName: string; resultValue: string; flag?: 'NORMAL' | 'HIGH' | 'LOW' | 'CRITICAL'; interpretation?: string }[]
  ) => {
    setLabOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const updatedTests = o.tests.map(t => {
        const found = results.find(r => r.testName === t.testName);
        if (found) {
          return {
            ...t,
            status: 'REPORTED' as const,
            resultValue: found.resultValue,
            flag: found.flag || 'NORMAL',
            interpretation: found.interpretation
          };
        }
        return t;
      });
      return {
        ...o,
        status: 'COMPLETED' as const,
        tests: updatedTests,
        reportedAt: new Date().toISOString()
      };
    }));

    // Trigger red flag alert if any test is CRITICAL
    const criticalTest = results.find(r => r.flag === 'CRITICAL');
    if (criticalTest) {
      triggerRedFlagAlert({
        id: `rf_lab_${Date.now()}`,
        patientId: labOrders.find(o => o.id === orderId)?.patientId || 'pat_1',
        severity: 'CRITICAL',
        symptom: `Critical Lab Value: ${criticalTest.testName} = ${criticalTest.resultValue}`,
        triggerSource: 'LAB_RESULT',
        reason: criticalTest.interpretation || `Critical biomarker threshold exceeded for ${criticalTest.testName}`,
        actionRequired: 'Immediate physician evaluation required; notify attending consultant',
        detectedAt: new Date().toISOString(),
        acknowledged: false
      });
    }

    logAuditAction('LAB_RESULTS_SUBMITTED', 'DIAGNOSTIC_REPORT', orderId, true, `Submitted results for ${results.length} tests`);
  };

  const dispensePrescription = (prescriptionId: string, medicineIds: string[], batchNumber?: string) => {
    setPrescriptions(prev => prev.map(rx => {
      if (rx.id !== prescriptionId) return rx;
      const updatedMeds = rx.medicines.map(m => {
        if (medicineIds.includes(m.id)) {
          return {
            ...m,
            dispensed: true,
            batchNumber: batchNumber || `BT-${Math.floor(1000 + Math.random() * 9000)}`
          };
        }
        return m;
      });
      const allDispensed = updatedMeds.every(m => m.dispensed);
      return {
        ...rx,
        medicines: updatedMeds,
        status: allDispensed ? 'DISPENSED' : 'VERIFIED',
        dispensedAt: new Date().toISOString(),
        dispensedBy: currentUser.fullName
      };
    }));
    logAuditAction('MEDICATION_DISPENSED', 'PRESCRIPTION', prescriptionId, true, `Dispensed ${medicineIds.length} medications`);
  };

  // Language & Audio
  const setLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    logAuditAction('LANGUAGE_CHANGED', 'LOCALIZATION', lang, true, `Language switched to ${lang}`);
  };

  const speakGuidance = (text: string) => {
    if (accessibility.audioGuidance) {
      bhashini.speakText(text, currentLanguage);
    }
  };

  const stopGuidance = () => {
    bhashini.stopSpeaking();
  };

  const updateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    setAccessibility(prev => ({ ...prev, ...settings }));
  };

  // Kiosk Session Reset (clears temporary memory, auto-timeout protection)
  const resetKioskSession = () => {
    bhashini.stopSpeaking();
    setActiveRedFlagAlert(null);
    setCurrentPatientIdState(INITIAL_PATIENTS[0].id);
    logAuditAction('KIOSK_SESSION_RESET', 'KIOSK_TERMINAL', 'kiosk_01', true, 'Session data cleared at terminal');
  };

  // Documents
  const addDocument = (doc: MedicalDocument) => {
    setDocuments(prev => [doc, ...prev]);
    logAuditAction('DOCUMENT_UPLOADED', 'MEDICAL_DOCUMENT', doc.id, true, `Uploaded ${doc.fileName}`);
  };

  // Patient Intake Submission (from Kiosk)
  const submitPatientIntake = (intake: PatientIntakeSubmission) => {
    setPatientIntakes(prev => ({
      ...prev,
      [intake.patientId]: intake
    }));

    // Check if patient triage record needs updating with detected red-flags
    if (intake.redFlags && intake.redFlags.length > 0) {
      triggerRedFlagAlert(intake.redFlags[0]);
    }

    logAuditAction(
      'PATIENT_INTAKE_SUBMITTED',
      'PATIENT_INTAKE',
      intake.id,
      true,
      `Intake submitted for ${intake.patientId}. Chief Complaint: ${intake.chiefComplaint}`
    );
  };

  // Doctor Action: Summarize Medical History using AI
  const generateDoctorSummary = async (
    patientId: string,
    options?: { style?: 'STANDARD' | 'COMPREHENSIVE' | 'EMERGENCY'; language?: LanguageCode; notes?: string }
  ): Promise<ClinicalSummary> => {
    const targetPatient = patients.find(p => p.id === patientId) || currentPatient;
    const intake = patientIntakes[patientId];
    const patientDocs = documents.filter(d => d.patientId === patientId);

    const chiefComplaint = intake?.chiefComplaint || 'Outpatient Consultation';
    const selectedAnswers = intake?.answers || {};
    const freeText = [
      intake?.freeTextAnswer,
      intake?.writtenSymptoms?.rawText,
      intake?.writtenSymptoms?.symptomTags?.join(' ')
    ].filter(Boolean).join(' ');

    // Re-verify red flags
    const flags = detectRedFlags({
      chiefComplaint,
      selectedAnswers,
      freeText
    });

    const summary = await aiSummaryService.generateClinicalSummary({
      patient: targetPatient,
      chiefComplaint,
      selectedAnswers,
      documents: patientDocs,
      redFlags: flags,
      abnormalLabs: [],
      drugInteractions: [],
      writtenSymptoms: intake?.writtenSymptoms,
      language: options?.language || currentLanguage
    });

    // If options include doctor notes, append them
    if (options?.notes) {
      summary.physicianReview.additionalClinicalNotes = options.notes;
    }

    setSummaries(prev => ({
      ...prev,
      [patientId]: summary
    }));

    // Update intake status to SUMMARIZED
    setPatientIntakes(prev => {
      if (!prev[patientId]) return prev;
      return {
        ...prev,
        [patientId]: {
          ...prev[patientId],
          status: 'SUMMARIZED'
        }
      };
    });

    logAuditAction(
      'DOCTOR_GENERATED_AI_SUMMARY',
      'CLINICAL_SUMMARY',
      summary.id,
      true,
      `Physician ${currentUser.fullName} generated AI summary for patient ${patientId} (Style: ${options?.style || 'STANDARD'})`
    );

    return summary;
  };

  // Delete / Reset Summary
  const deleteSummary = (patientId: string) => {
    setSummaries(prev => {
      const next = { ...prev };
      delete next[patientId];
      return next;
    });
    setPatientIntakes(prev => {
      if (!prev[patientId]) return prev;
      return {
        ...prev,
        [patientId]: {
          ...prev[patientId],
          status: 'AWAITING_DOCTOR_SUMMARY'
        }
      };
    });
    logAuditAction('CLINICAL_SUMMARY_RESET', 'CLINICAL_SUMMARY', patientId, true, `Doctor requested re-summarization for patient ${patientId}`);
  };

  // Clinical Summary
  const saveSummary = (summary: ClinicalSummary) => {
    setSummaries(prev => ({
      ...prev,
      [summary.patientId]: summary
    }));
    logAuditAction('CLINICAL_SUMMARY_SAVED', 'CLINICAL_SUMMARY', summary.id, true, `Generated summary for ${summary.patientId}`);
  };

  // Doctor Review Action
  const updatePhysicianReview = (
    patientId: string,
    doctorName: string,
    action: 'CONFIRMED' | 'CLARIFICATION_REQUESTED' | 'MODIFIED',
    notes: string,
    editedContent?: string
  ) => {
    setSummaries(prev => {
      const existing = prev[patientId];
      if (!existing) return prev;
      return {
        ...prev,
        [patientId]: {
          ...existing,
          isDraft: false,
          physicianReview: {
            reviewed: true,
            reviewedBy: currentUser.id,
            reviewedDoctorName: doctorName,
            reviewedAt: new Date().toISOString(),
            actionTaken: action,
            additionalClinicalNotes: notes,
            editedContent: editedContent || existing.hpiSummary
          }
        }
      };
    });

    logAuditAction('PHYSICIAN_REVIEW_COMPLETED', 'CLINICAL_SUMMARY', patientId, true, `Review marked as ${action} by ${doctorName}`);
  };

  // Triage update
  const updateTriagePriority = (recordId: string, priority: 'P1_CRITICAL' | 'P2_URGENT' | 'P3_ROUTINE', notes?: string) => {
    setTriageRecords(prev => prev.map(rec => {
      if (rec.id === recordId) {
        return {
          ...rec,
          priority,
          status: priority === 'P1_CRITICAL' ? 'ESCALATED' : 'TRIAGED_TO_DOCTOR',
          notes: notes || rec.notes,
          updatedAt: new Date().toISOString()
        };
      }
      return rec;
    }));
    logAuditAction('TRIAGE_PRIORITY_UPDATED', 'TRIAGE_RECORD', recordId, true, `Priority set to ${priority}`);
  };

  // Audit Logger
  const logAuditAction = (action: string, resource: string, resourceId?: string, success = true, details?: string) => {
    const newLog: AuditLog = {
      id: `aud_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      userId: currentUser.id,
      userRole: currentUser.role,
      userName: currentUser.fullName,
      action,
      resource,
      resourceId,
      success,
      ipAddress: '10.0.12.4 (OPD Terminal)',
      details
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 99)]);
  };

  // Red Flag Alerts
  const triggerRedFlagAlert = (flag: RedFlag) => {
    setActiveRedFlagAlert(flag);
    // Escalates triage
    setTriageRecords(prev => {
      const existing = prev.find(r => r.patientId === flag.patientId);
      if (existing) {
        return prev.map(r => r.patientId === flag.patientId ? {
          ...r,
          priority: 'P1_CRITICAL',
          status: 'ESCALATED',
          redFlags: [...r.redFlags, flag]
        } : r);
      } else {
        return [{
          id: `tr_${Date.now()}`,
          patientId: flag.patientId,
          priority: 'P1_CRITICAL',
          status: 'ESCALATED',
          redFlags: [flag],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          notes: 'Automated Red-Flag detection triggered immediate P1 Critical escalation.'
        }, ...prev];
      }
    });

    logAuditAction('RED_FLAG_ESCALATION', 'TRIAGE_ALERT', flag.id, true, flag.reason);
  };

  const dismissRedFlagAlert = () => {
    setActiveRedFlagAlert(null);
  };

  // Consent
  const grantConsent = (scope?: string[]) => {
    const cns: PatientConsent = {
      id: `cns_${Date.now()}`,
      patientId: currentPatient.id,
      purpose: 'Digital OPD Clinical History Acquisition & Medical Record Structuring',
      scope: scope || ['CLINICAL_HISTORY', 'PRESCRIPTION_OCR', 'TIMELINE_INTEGRATION'],
      status: 'ACTIVE',
      version: 'DPDP-2023-V2.1',
      grantedAt: new Date().toISOString(),
      dpdpCompliant: true,
      abdmConsentId: `abdm-cns-${Math.floor(100000 + Math.random() * 900000)}`
    };
    setActiveConsent(cns);
    logAuditAction('DPDP_CONSENT_GRANTED', 'CONSENT_RECORD', cns.id, true, 'Patient accepted electronic health consent');
  };

  const withdrawConsent = () => {
    if (activeConsent) {
      setActiveConsent({
        ...activeConsent,
        status: 'REVOKED',
        revokedAt: new Date().toISOString()
      });
      logAuditAction('DPDP_CONSENT_REVOKED', 'CONSENT_RECORD', activeConsent.id, true, 'Patient revoked electronic health consent');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        token,
        isAuthenticated,
        loginWithABHA,
        loginAsDoctor,
        loginAsLabTech,
        loginAsPharmacist,
        logout,
        showAuthModal,
        setShowAuthModal,
        authModalInitialRole,
        openAuthModalWithRole,
        isPublicSiteView,
        setIsPublicSiteView,
        labOrders,
        updateLabOrder,
        submitLabResults,
        prescriptions,
        dispensePrescription,
        currentLanguage,
        setLanguage,
        speakGuidance,
        stopGuidance,
        accessibility,
        updateAccessibility,
        isKioskMode,
        setIsKioskMode,
        resetKioskSession,
        patients,
        currentPatient,
        setCurrentPatientId,
        updatePatientProfile,
        doctors,
        documents,
        addDocument,
        patientIntakes,
        submitPatientIntake,
        generateDoctorSummary,
        summaries,
        saveSummary,
        deleteSummary,
        updatePhysicianReview,
        triageRecords,
        updateTriagePriority,
        auditLogs,
        logAuditAction,
        activeRedFlagAlert,
        dismissRedFlagAlert,
        triggerRedFlagAlert,
        activeConsent,
        grantConsent,
        withdrawConsent
      }}
    >
      <div className={`${accessibility.highContrast ? 'contrast-125 saturate-150' : ''} ${
        accessibility.fontSize === 'large' ? 'text-lg' : accessibility.fontSize === 'xlarge' ? 'text-xl' : 'text-base'
      }`}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
