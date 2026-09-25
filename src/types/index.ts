// Bharat Arogya Domain Types & Clinical Data Models

export type UserRole = 'PATIENT' | 'DOCTOR' | 'LAB_TECHNICIAN' | 'PHARMACIST' | 'TRIAGE_STAFF' | 'ADMIN';

export type LanguageCode = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  script: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ABHAProfile {
  abhaId: string; // e.g., 91-4521-8890-1234
  abhaAddress: string; // e.g., ramesh.kumar@abdm
  linkedAadhaarLast4?: string;
  verified: boolean;
  linkedAt: string;
  kycStatus: 'VERIFIED' | 'PENDING' | 'MANUAL_REVIEW';
}

export interface PatientProfile {
  id: string;
  userId: string;
  abhaProfile?: ABHAProfile;
  fullName: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup?: string;
  preferredLanguage: LanguageCode;
  phoneNumber: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  tokenNumber?: string;
  assignedDepartment?: string;
  assignedDoctorId?: string;
  createdAt: string;
}

export interface DoctorProfile {
  id: string;
  userId: string;
  fullName: string;
  specialization: string;
  qualification: string;
  department: string;
  registrationNumber: string;
  system: 'ALLOPATHY' | 'AYUSH' | 'INTEGRATED';
  available: boolean;
}

export interface StaffProfile {
  id: string;
  userId: string;
  fullName: string;
  department: string;
  shift: string;
}

export interface LabTechnicianProfile {
  id: string;
  userId: string;
  fullName: string;
  technicianId: string;
  department: string;
  qualification: string;
}

export interface PharmacistProfile {
  id: string;
  userId: string;
  fullName: string;
  licenseNumber: string;
  dispensary: string;
  qualification: string;
}

export type LabOrderPriority = 'STAT_URGENT' | 'URGENT' | 'ROUTINE';
export type LabOrderStatus = 'ORDERED' | 'SAMPLE_COLLECTED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

export interface LabTestItem {
  testName: string;
  sampleType: string;
  status: 'PENDING' | 'COLLECTED' | 'REPORTED';
  resultValue?: string;
  unit?: string;
  referenceRange?: string;
  interpretation?: string;
  flag?: 'NORMAL' | 'HIGH' | 'LOW' | 'CRITICAL';
}

export interface DiagnosticLabOrder {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  tokenNumber: string;
  doctorId: string;
  doctorName: string;
  department: string;
  clinicalIndication: string;
  priority: LabOrderPriority;
  status: LabOrderStatus;
  tests: LabTestItem[];
  specimenBarcode?: string;
  collectedAt?: string;
  reportedAt?: string;
  technicianName?: string;
  createdAt: string;
}

export type PrescriptionStatus = 'PENDING' | 'VERIFIED' | 'DISPENSED' | 'CANCELLED';

export interface PrescribedMedicine {
  id: string;
  medicineName: string;
  genericName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  instructionsLocal?: Record<LanguageCode, string>;
  dispensed: boolean;
  batchNumber?: string;
  stockAvailable: number;
}

export interface PrescriptionOrder {
  id: string;
  prescriptionNumber: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  tokenNumber: string;
  doctorId: string;
  doctorName: string;
  department: string;
  diagnosis: string;
  medicines: PrescribedMedicine[];
  status: PrescriptionStatus;
  safetyAlerts: MedicationInteraction[];
  patientAllergies: string[];
  dispensedAt?: string;
  dispensedBy?: string;
  createdAt: string;
}

export interface PatientConsent {
  id: string;
  patientId: string;
  purpose: string;
  scope: string[];
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  version: string;
  grantedAt: string;
  revokedAt?: string;
  ipAddress?: string;
  userAgent?: string;
  dpdpCompliant: boolean;
  abdmConsentId?: string;
}

export type RedFlagSeverity = 'CRITICAL' | 'HIGH' | 'MODERATE';

export interface RedFlag {
  id: string;
  patientId: string;
  encounterId?: string;
  severity: RedFlagSeverity;
  symptom: string;
  triggerSource: 'PATIENT_INPUT' | 'DOCUMENT_OCR' | 'LAB_RESULT' | 'VITAL_ALERT';
  reason: string;
  actionRequired: string;
  detectedAt: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}

export type TriagePriority = 'P1_CRITICAL' | 'P2_URGENT' | 'P3_ROUTINE';

export interface TriageRecord {
  id: string;
  patientId: string;
  priority: TriagePriority;
  status: 'PENDING_TRIAGE' | 'ESCALATED' | 'TRIAGED_TO_DOCTOR' | 'DISCHARGED';
  redFlags: RedFlag[];
  assignedNurse?: string;
  vitals?: {
    bpSystolic?: number;
    bpDiastolic?: number;
    pulse?: number;
    spo2?: number;
    temperature?: number;
    respiratoryRate?: number;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type EntityType = 
  | 'MEDICATION' 
  | 'DOSAGE' 
  | 'FREQUENCY' 
  | 'DURATION' 
  | 'DIAGNOSIS' 
  | 'SYMPTOM' 
  | 'LAB_TEST' 
  | 'LAB_VALUE' 
  | 'REFERENCE_RANGE' 
  | 'PROCEDURE' 
  | 'ALLERGY' 
  | 'HOSPITAL' 
  | 'DOCTOR' 
  | 'DATE';

export interface ExtractedClinicalEntity {
  id: string;
  type: EntityType;
  text: string;
  normalizedValue?: string;
  confidence: number;
  sourceContext?: string;
}

export type LabStatus = 'NORMAL' | 'LOW' | 'HIGH' | 'CRITICAL';

export interface LabResult {
  id: string;
  testName: string;
  resultValue: string;
  numericValue?: number;
  unit: string;
  referenceRange: string;
  status: LabStatus;
  interpretation?: string;
}

export interface MedicationInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: 'LOW' | 'MODERATE' | 'HIGH';
  clinicalEffect: string;
  recommendation: string;
}

export type DocumentType = 
  | 'PRESCRIPTION' 
  | 'LAB_REPORT' 
  | 'DISCHARGE_SUMMARY' 
  | 'IMAGING_REPORT' 
  | 'AYUSH_RECORD' 
  | 'OTHER';

export type OCRProcessingStatus = 
  | 'UPLOADED' 
  | 'PROCESSING' 
  | 'EXTRACTING' 
  | 'COMPLETED' 
  | 'FAILED';

export interface MedicalDocument {
  id: string;
  patientId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  documentCategory: DocumentType;
  uploadedAt: string;
  s3Key: string;
  signedUrl: string;
  ocrStatus: OCRProcessingStatus;
  ocrText?: string;
  ocrConfidence?: number;
  extractedEntities: ExtractedClinicalEntity[];
  abnormalLabs: LabResult[];
  potentialInteractions: MedicationInteraction[];
  documentDate?: string;
  issuingDoctorOrHospital?: string;
  errorMessage?: string;
}

export type TimelineCategory = 
  | 'CONSULTATION' 
  | 'MEDICATION' 
  | 'INVESTIGATION' 
  | 'DIAGNOSIS' 
  | 'SURGERY' 
  | 'DOCUMENT_UPLOAD';

export interface ClinicalTimelineEvent {
  id: string;
  patientId: string;
  date: string;
  category: TimelineCategory;
  title: string;
  description: string;
  department?: string;
  doctorName?: string;
  documentId?: string;
  severity?: 'NORMAL' | 'ABNORMAL' | 'CRITICAL';
  tags: string[];
}

export interface AyushAssessment {
  prakriti?: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha' | 'Tridoshaja';
  vikriti?: string;
  agni?: 'Mandagni' | 'Tikshnagni' | 'Vishamagni' | 'Samagni';
  koshta?: 'Krura' | 'Mrudu' | 'Madhyama';
  aharaShakti?: 'Pravara' | 'Madhyama' | 'Avara';
  vyayamaShakti?: 'Pravara' | 'Madhyama' | 'Avara';
  sattva?: 'Pravara' | 'Madhyama' | 'Avara';
  satmya?: string;
  aharaViharaNotes?: string;
}

export interface ChiefComplaintItem {
  complaint: string;
  duration: string;
  severity: 'MILD' | 'MODERATE' | 'SEVERE';
}

export interface ClinicalHistoryData {
  id: string;
  patientId: string;
  chiefComplaints: ChiefComplaintItem[];
  historyOfPresentIllness: {
    onsetDate?: string;
    character?: string;
    location?: string;
    radiation?: string;
    aggravatingFactors?: string[];
    relievingFactors?: string[];
    associatedSymptoms?: string[];
    severityScore?: number; // 1-10
  };
  pastMedicalHistory: string[];
  pastSurgicalHistory: string[];
  drugHistory: {
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    prescribedFor: string;
  }[];
  allergyHistory: {
    allergen: string;
    reaction: string;
    severity: 'MILD' | 'MODERATE' | 'SEVERE';
  }[];
  familyHistory: string[];
  personalHistory: {
    diet: 'VEGETARIAN' | 'NON_VEGETARIAN' | 'EGGETARIAN' | 'VEGAN';
    appetite: 'NORMAL' | 'REDUCED' | 'INCREASED';
    sleep: 'ADEQUATE' | 'DISTURBED' | 'INSOMNIA';
    bowelBladder: 'REGULAR' | 'IRREGULAR';
    tobaccoUse: boolean;
    alcoholUse: boolean;
  };
  reviewOfSystems: {
    system: string;
    findings: string;
    positive: boolean;
  }[];
  ayushAssessment?: AyushAssessment;
  completedAt: string;
}

export interface WrittenSymptomRecord {
  rawText: string;
  symptomTags: string[];
  duration?: string;
  severityScore?: number; // 1 to 10
  severityLevel?: 'MILD' | 'MODERATE' | 'SEVERE';
  bodyLocation?: string;
  onset?: string;
  enteredVia: 'TYPED' | 'VOICE' | 'SUGGESTION_CHIPS';
  detectedRedFlags?: string[];
  timestamp?: string;
  recordedAt?: string;
}

export interface PatientIntakeSubmission {
  id: string;
  patientId: string;
  chiefComplaint: string;
  answers: Record<string, string | string[]>;
  freeTextAnswer?: string;
  writtenSymptoms?: WrittenSymptomRecord;
  submittedAt: string;
  redFlags: RedFlag[];
  status: 'AWAITING_DOCTOR_SUMMARY' | 'SUMMARIZED' | 'REVIEWED';
}

export interface ClinicalSummary {
  id: string;
  patientId: string;
  encounterId: string;
  generatedAt: string;
  sourceBreakdown: {
    patientReportedCount: number;
    ocrDocumentsCount: number;
    extractedEntitiesCount: number;
  };
  chiefComplaintSummary: string;
  hpiSummary: string;
  pastMedicalSurgicalSummary: string;
  drugAndAllergySummary: string;
  familyPersonalSummary: string;
  reviewOfSystemsSummary: string;
  investigationsSummary: string;
  currentMedicationsSummary: string;
  clinicalTimelineSummary: string;
  redFlagsList: RedFlag[];
  abnormalLabsList: LabResult[];
  drugInteractionsList: MedicationInteraction[];
  documentDerivedNotes: string;
  uncertaintiesRequiringReview: string[];
  ayushSummary?: string;
  physicianReview: {
    reviewed: boolean;
    reviewedBy?: string;
    reviewedDoctorName?: string;
    reviewedAt?: string;
    editedContent?: string;
    additionalClinicalNotes?: string;
    provisionalImpressionNotes?: string;
    actionTaken?: 'CONFIRMED' | 'CLARIFICATION_REQUESTED' | 'MODIFIED';
  };
  isDraft: boolean; // Must always be true initially
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userRole: UserRole;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  success: boolean;
  ipAddress: string;
  details?: string;
}

export interface QuestionnaireOption {
  id: string;
  label: Record<LanguageCode, string>;
  value: string;
  triggersRedFlag?: boolean;
  redFlagReason?: string;
  nextQuestionBranchId?: string;
}

export interface QuestionnaireQuestion {
  id: string;
  category: 'CHIEF_COMPLAINT' | 'HPI' | 'PAST_HISTORY' | 'MEDS' | 'ALLERGIES' | 'PERSONAL' | 'AYUSH';
  prompt: Record<LanguageCode, string>;
  audioPrompt?: Record<LanguageCode, string>;
  inputType: 'SINGLE_CHOICE' | 'MULTI_CHOICE' | 'TEXT_OR_VOICE' | 'NUMBER' | 'DATE' | 'SEVERITY_SCALE';
  options?: QuestionnaireOption[];
  skippable: boolean;
  conditionalOn?: {
    questionId: string;
    operator: 'EQUALS' | 'CONTAINS' | 'IN';
    value: string | string[];
  };
  redFlagTriggers?: {
    value: string;
    severity: RedFlagSeverity;
    reason: string;
  }[];
}
