// Realistic Seed Data for Bharat Arogya (10 Patients, 5 Doctors, 2 Triage Staff, 1 Admin, Prescriptions, Labs, Summaries)

import {
  User,
  PatientProfile,
  DoctorProfile,
  StaffProfile,
  LabTechnicianProfile,
  PharmacistProfile,
  DiagnosticLabOrder,
  PrescriptionOrder,
  MedicalDocument,
  ClinicalTimelineEvent,
  ClinicalSummary,
  TriageRecord,
  AuditLog,
  LabResult,
  MedicationInteraction
} from '../types';

export const INITIAL_USERS: User[] = [
  // Admin
  {
    id: 'usr_admin_1',
    email: 'admin@medikiosk.gov.in',
    role: 'ADMIN',
    fullName: 'Dr. Vikramaditya Sen',
    phoneNumber: '+91 98101 23456',
    createdAt: '2026-01-01T08:00:00Z'
  },
  // Triage Staff
  {
    id: 'usr_triage_1',
    email: 'triage.nurse@medikiosk.gov.in',
    role: 'TRIAGE_STAFF',
    fullName: 'Sister Mary Joseph (Nursing Sister)',
    phoneNumber: '+91 98202 34567',
    createdAt: '2026-01-05T08:00:00Z'
  },
  {
    id: 'usr_triage_2',
    email: 'triage2@medikiosk.gov.in',
    role: 'TRIAGE_STAFF',
    fullName: 'Sunil Verma (Emergency Triage Officer)',
    phoneNumber: '+91 98202 34568',
    createdAt: '2026-01-05T08:00:00Z'
  },
  // Doctors
  {
    id: 'usr_doc_1',
    email: 'dr.sharma.cardio@hospital.gov.in',
    role: 'DOCTOR',
    fullName: 'Dr. Alok Sharma, MD, DM',
    phoneNumber: '+91 98303 45678',
    createdAt: '2026-01-10T09:00:00Z'
  },
  {
    id: 'usr_doc_2',
    email: 'dr.nair.med@hospital.gov.in',
    role: 'DOCTOR',
    fullName: 'Dr. Radhika Nair, MD (Internal Medicine)',
    phoneNumber: '+91 98303 45679',
    createdAt: '2026-01-10T09:00:00Z'
  },
  {
    id: 'usr_doc_3',
    email: 'dr.pandey.ayush@aiia.gov.in',
    role: 'DOCTOR',
    fullName: 'Vaidya Harish Pandey, MD (Ayurveda - Kayachikitsa)',
    phoneNumber: '+91 98303 45680',
    createdAt: '2026-01-12T09:00:00Z'
  },
  {
    id: 'usr_doc_4',
    email: 'dr.khan.pulmo@hospital.gov.in',
    role: 'DOCTOR',
    fullName: 'Dr. Tariq Khan, MD (Pulmonary Medicine)',
    phoneNumber: '+91 98303 45681',
    createdAt: '2026-01-12T09:00:00Z'
  },
  {
    id: 'usr_doc_5',
    email: 'dr.deshmukh.endo@hospital.gov.in',
    role: 'DOCTOR',
    fullName: 'Dr. Snehal Deshmukh, MD, DNB (Endocrinology)',
    phoneNumber: '+91 98303 45682',
    createdAt: '2026-01-14T09:00:00Z'
  },
  // Demo Patient (Ramesh Kumar - Red Flag Case)
  {
    id: 'usr_pat_1',
    email: 'ramesh.kumar@patient.in',
    role: 'PATIENT',
    fullName: 'Ramesh Chandra Kumar',
    phoneNumber: '+91 98765 43210',
    createdAt: '2026-09-20T07:30:00Z'
  },
  // Lab Technician
  {
    id: 'usr_lab_1',
    email: 'kavita.lab@hospital.gov.in',
    role: 'LAB_TECHNICIAN',
    fullName: 'Kavita Sharma, B.Sc MLT',
    phoneNumber: '+91 98404 12345',
    createdAt: '2026-01-15T08:00:00Z'
  },
  // Pharmacist
  {
    id: 'usr_pharm_1',
    email: 'rajesh.pharm@hospital.gov.in',
    role: 'PHARMACIST',
    fullName: 'Rajesh Gupta, B.Pharm, R.Ph',
    phoneNumber: '+91 98404 67890',
    createdAt: '2026-01-15T08:00:00Z'
  }
];

export const INITIAL_LAB_TECHNICIANS: LabTechnicianProfile[] = [
  {
    id: 'tech_1',
    userId: 'usr_lab_1',
    fullName: 'Kavita Sharma, B.Sc MLT',
    technicianId: 'TECH-PATH-8821',
    department: 'Central Pathology & Biochemistry Laboratory',
    qualification: 'B.Sc Medical Laboratory Technology (AIIMS)'
  }
];

export const INITIAL_PHARMACISTS: PharmacistProfile[] = [
  {
    id: 'pharm_1',
    userId: 'usr_pharm_1',
    fullName: 'Rajesh Gupta, B.Pharm, R.Ph',
    licenseNumber: 'PHARM-DEL-4921',
    dispensary: 'Central Hospital OPD Dispensary (Counter 3)',
    qualification: 'B.Pharm, Registered Pharmacist (Delhi Pharmacy Council)'
  }
];

export const INITIAL_DOCTORS: DoctorProfile[] = [
  {
    id: 'doc_1',
    userId: 'usr_doc_1',
    fullName: 'Dr. Alok Sharma, MD, DM',
    specialization: 'Interventional Cardiology',
    qualification: 'MBBS, MD (Gen Med), DM (Cardiology)',
    department: 'Cardiology OPD',
    registrationNumber: 'MCI-2004-58912',
    system: 'ALLOPATHY',
    available: true
  },
  {
    id: 'doc_2',
    userId: 'usr_doc_2',
    fullName: 'Dr. Radhika Nair, MD',
    specialization: 'Internal Medicine & Geriatrics',
    qualification: 'MBBS, MD (Internal Medicine)',
    department: 'General Medicine OPD Room 14',
    registrationNumber: 'KMC-2011-89321',
    system: 'ALLOPATHY',
    available: true
  },
  {
    id: 'doc_3',
    userId: 'usr_doc_3',
    fullName: 'Vaidya Harish Pandey, BAMS, MD (Ayu)',
    specialization: 'Kayachikitsa & Dashavidha Pariksha',
    qualification: 'BAMS, MD (Ayurveda - AIIA New Delhi)',
    department: 'Ayush Integrated Clinic OPD Room 3',
    registrationNumber: 'CCIM-DEL-2015-1044',
    system: 'AYUSH',
    available: true
  },
  {
    id: 'doc_4',
    userId: 'usr_doc_4',
    fullName: 'Dr. Tariq Khan, MD',
    specialization: 'Pulmonology & Chest Medicine',
    qualification: 'MBBS, MD (Pulmonary Medicine)',
    department: 'Chest & Respiratory Clinic Room 7',
    registrationNumber: 'DMC-2009-44120',
    system: 'ALLOPATHY',
    available: true
  },
  {
    id: 'doc_5',
    userId: 'usr_doc_5',
    fullName: 'Dr. Snehal Deshmukh, MD, DNB',
    specialization: 'Diabetology & Metabolic Disorders',
    qualification: 'MBBS, MD (Med), DNB (Endocrinology)',
    department: 'Endocrinology & Diabetic Clinic Room 11',
    registrationNumber: 'MMC-2013-67210',
    system: 'ALLOPATHY',
    available: true
  }
];

export const INITIAL_PATIENTS: PatientProfile[] = [
  {
    id: 'pat_1',
    userId: 'usr_pat_1',
    fullName: 'Ramesh Chandra Kumar',
    age: 58,
    gender: 'MALE',
    bloodGroup: 'B+',
    preferredLanguage: 'hi',
    phoneNumber: '+91 98765 43210',
    address: 'H-42, Sector 12, Dwarka, New Delhi 110078',
    emergencyContactName: 'Geeta Kumar (Wife)',
    emergencyContactPhone: '+91 98765 43211',
    tokenNumber: 'CARDIO-04',
    assignedDepartment: 'Cardiology OPD',
    assignedDoctorId: 'doc_1',
    createdAt: '2026-09-21T07:15:00Z',
    abhaProfile: {
      abhaId: '91-4521-8890-1234',
      abhaAddress: 'ramesh.kumar@abdm',
      linkedAadhaarLast4: '8890',
      verified: true,
      linkedAt: '2026-02-14T10:00:00Z',
      kycStatus: 'VERIFIED'
    }
  },
  {
    id: 'pat_2',
    userId: 'usr_pat_2',
    fullName: 'Sunita Devi',
    age: 62,
    gender: 'FEMALE',
    bloodGroup: 'O+',
    preferredLanguage: 'hi',
    phoneNumber: '+91 98111 22334',
    address: 'Vill. Rampur, Post Sadar, Varanasi, UP',
    emergencyContactName: 'Praveen (Son)',
    emergencyContactPhone: '+91 98111 22335',
    tokenNumber: 'MED-12',
    assignedDepartment: 'General Medicine OPD Room 14',
    assignedDoctorId: 'doc_2',
    createdAt: '2026-09-21T07:30:00Z',
    abhaProfile: {
      abhaId: '14-9901-2244-5566',
      abhaAddress: 'sunitadevi1964@abdm',
      linkedAadhaarLast4: '2244',
      verified: true,
      linkedAt: '2026-01-20T11:20:00Z',
      kycStatus: 'VERIFIED'
    }
  },
  {
    id: 'pat_3',
    userId: 'usr_pat_3',
    fullName: 'Rajesh Patel',
    age: 46,
    gender: 'MALE',
    bloodGroup: 'A+',
    preferredLanguage: 'en',
    phoneNumber: '+91 98222 33445',
    address: 'B-201, Shanti Heights, Bodakdev, Ahmedabad',
    tokenNumber: 'ENDO-09',
    assignedDepartment: 'Endocrinology & Diabetic Clinic Room 11',
    assignedDoctorId: 'doc_5',
    createdAt: '2026-09-21T07:45:00Z',
    abhaProfile: {
      abhaId: '24-1188-7733-4411',
      abhaAddress: 'rajesh.patel@abdm',
      linkedAadhaarLast4: '7733',
      verified: true,
      linkedAt: '2026-03-01T09:00:00Z',
      kycStatus: 'VERIFIED'
    }
  },
  {
    id: 'pat_4',
    userId: 'usr_pat_4',
    fullName: 'Ananya Sharma',
    age: 34,
    gender: 'FEMALE',
    bloodGroup: 'AB+',
    preferredLanguage: 'en',
    phoneNumber: '+91 98333 44556',
    address: 'Flat 404, Palm Grove, Bengaluru',
    tokenNumber: 'AYUSH-02',
    assignedDepartment: 'Ayush Integrated Clinic OPD Room 3',
    assignedDoctorId: 'doc_3',
    createdAt: '2026-09-21T08:00:00Z',
    abhaProfile: {
      abhaId: '29-3344-5566-7788',
      abhaAddress: 'ananya.sharma@abdm',
      linkedAadhaarLast4: '5566',
      verified: true,
      linkedAt: '2026-02-18T14:30:00Z',
      kycStatus: 'VERIFIED'
    }
  },
  {
    id: 'pat_5',
    userId: 'usr_pat_5',
    fullName: 'Mohammed Farooq',
    age: 51,
    gender: 'MALE',
    bloodGroup: 'B-',
    preferredLanguage: 'te',
    phoneNumber: '+91 98444 55667',
    address: 'Charminar East, Hyderabad, Telangana',
    tokenNumber: 'PULMO-05',
    assignedDepartment: 'Chest & Respiratory Clinic Room 7',
    assignedDoctorId: 'doc_4',
    createdAt: '2026-09-21T08:15:00Z',
    abhaProfile: {
      abhaId: '36-4455-6677-8899',
      abhaAddress: 'farooq.hyd@abdm',
      linkedAadhaarLast4: '6677',
      verified: true,
      linkedAt: '2026-01-10T12:00:00Z',
      kycStatus: 'VERIFIED'
    }
  },
  {
    id: 'pat_6',
    userId: 'usr_pat_6',
    fullName: 'Lakshmi Narayanan',
    age: 67,
    gender: 'FEMALE',
    bloodGroup: 'O-',
    preferredLanguage: 'ta',
    phoneNumber: '+91 98555 66778',
    address: 'Mylapore, Chennai, Tamil Nadu',
    tokenNumber: 'MED-15',
    assignedDepartment: 'General Medicine OPD Room 14',
    assignedDoctorId: 'doc_2',
    createdAt: '2026-09-21T08:20:00Z'
  },
  {
    id: 'pat_7',
    userId: 'usr_pat_7',
    fullName: 'Gurpreet Singh',
    age: 42,
    gender: 'MALE',
    bloodGroup: 'A-',
    preferredLanguage: 'hi',
    phoneNumber: '+91 98666 77889',
    address: 'Model Town, Ludhiana, Punjab',
    tokenNumber: 'CARDIO-08',
    assignedDepartment: 'Cardiology OPD',
    assignedDoctorId: 'doc_1',
    createdAt: '2026-09-21T08:30:00Z'
  },
  {
    id: 'pat_8',
    userId: 'usr_pat_8',
    fullName: 'Amitav Ghosh',
    age: 55,
    gender: 'MALE',
    bloodGroup: 'B+',
    preferredLanguage: 'bn',
    phoneNumber: '+91 98777 88990',
    address: 'Salt Lake City, Sector 2, Kolkata',
    tokenNumber: 'AYUSH-05',
    assignedDepartment: 'Ayush Integrated Clinic OPD Room 3',
    assignedDoctorId: 'doc_3',
    createdAt: '2026-09-21T08:35:00Z'
  },
  {
    id: 'pat_9',
    userId: 'usr_pat_9',
    fullName: 'Priya Nair',
    age: 29,
    gender: 'FEMALE',
    bloodGroup: 'O+',
    preferredLanguage: 'en',
    phoneNumber: '+91 98888 99001',
    address: 'Kakkanad, Kochi, Kerala',
    tokenNumber: 'ENDO-14',
    assignedDepartment: 'Endocrinology & Diabetic Clinic Room 11',
    assignedDoctorId: 'doc_5',
    createdAt: '2026-09-21T08:40:00Z'
  },
  {
    id: 'pat_10',
    userId: 'usr_pat_10',
    fullName: 'Suresh Verma',
    age: 61,
    gender: 'MALE',
    bloodGroup: 'AB-',
    preferredLanguage: 'mr',
    phoneNumber: '+91 98999 00112',
    address: 'Kothrud, Pune, Maharashtra',
    tokenNumber: 'MED-18',
    assignedDepartment: 'General Medicine OPD Room 14',
    assignedDoctorId: 'doc_2',
    createdAt: '2026-09-21T08:45:00Z'
  }
];

// Sample Medical Documents with OCR & Entity data
export const INITIAL_DOCUMENTS: MedicalDocument[] = [
  {
    id: 'doc_rec_1',
    patientId: 'pat_1',
    fileName: 'AIIMS_Cardio_Discharge_Summary_2025.pdf',
    fileSize: 1845000,
    fileType: 'application/pdf',
    documentCategory: 'DISCHARGE_SUMMARY',
    uploadedAt: '2026-09-21T07:20:00Z',
    s3Key: 'patients/pat_1/documents/aiims_discharge_2025.pdf',
    signedUrl: 'https://s3.ap-south-1.amazonaws.com/medikiosk-records/demo_discharge_1.pdf',
    ocrStatus: 'COMPLETED',
    ocrConfidence: 94.2,
    documentDate: '2025-11-14',
    issuingDoctorOrHospital: 'AIIMS New Delhi, Dept of Cardiology',
    ocrText: `AIIMS NEW DELHI - DEPARTMENT OF CARDIOLOGY
PATIENT: Ramesh Chandra Kumar, 57 Y / Male
UHID: 10488219 | DATE OF ADMISSION: 10/11/2025 | DATE OF DISCHARGE: 14/11/2025
DIAGNOSIS: Non-ST Elevation Myocardial Infarction (NSTEMI), Post-PTCA with Stent to LAD.
PROCEDURE: Coronary Angiography and successful Drug Eluting Stent (Xience Sierra 3.0x28mm) to mid LAD.
DISCHARGE MEDICATIONS:
1. Tab Ecosprin 75 mg once daily after lunch
2. Tab Clopidogrel 75 mg once daily
3. Tab Atorvastatin 40 mg once daily at bedtime
4. Tab Metoprolol Succinate 25 mg once daily
5. Tab Pantoprazole 40 mg once daily before breakfast
6. Tab Metformin 500 mg twice daily with meals
LABS ON DISCHARGE: Troponin-I: 1.8 ng/mL (High), HbA1c: 8.4% (High), Serum Creatinine: 1.1 mg/dL, K+: 4.4 mEq/L.
ADVICE: Strict low salt diet, avoid heavy exertion, follow up after 3 months.`,
    extractedEntities: [
      { id: 'e1', type: 'DIAGNOSIS', text: 'Non-ST Elevation Myocardial Infarction (NSTEMI)', confidence: 0.98 },
      { id: 'e2', type: 'PROCEDURE', text: 'Post-PTCA with Drug Eluting Stent to LAD', confidence: 0.95 },
      { id: 'e3', type: 'MEDICATION', text: 'Ecosprin (Aspirin)', confidence: 0.97 },
      { id: 'e4', type: 'DOSAGE', text: '75 mg', confidence: 0.99 },
      { id: 'e5', type: 'FREQUENCY', text: 'once daily', confidence: 0.96 },
      { id: 'e6', type: 'MEDICATION', text: 'Clopidogrel', confidence: 0.97 },
      { id: 'e7', type: 'MEDICATION', text: 'Atorvastatin', confidence: 0.98 },
      { id: 'e8', type: 'DOSAGE', text: '40 mg', confidence: 0.99 },
      { id: 'e9', type: 'MEDICATION', text: 'Metformin', confidence: 0.98 },
      { id: 'e10', type: 'DOSAGE', text: '500 mg', confidence: 0.99 },
      { id: 'e11', type: 'FREQUENCY', text: 'twice daily', confidence: 0.97 },
      { id: 'e12', type: 'LAB_TEST', text: 'HbA1c', confidence: 0.95 },
      { id: 'e13', type: 'LAB_VALUE', text: '8.4%', confidence: 0.95 }
    ],
    abnormalLabs: [
      {
        id: 'l1',
        testName: 'Glycated Hemoglobin (HbA1c)',
        resultValue: '8.4 %',
        numericValue: 8.4,
        unit: '%',
        referenceRange: '4.0 - 5.6 %',
        status: 'HIGH',
        interpretation: 'Suboptimal glycemic control; elevated cardiovascular risk'
      },
      {
        id: 'l2',
        testName: 'Troponin-I',
        resultValue: '1.8 ng/mL',
        numericValue: 1.8,
        unit: 'ng/mL',
        referenceRange: '< 0.04 ng/mL',
        status: 'CRITICAL',
        interpretation: 'Myocardial injury marker positive on index admission'
      }
    ],
    potentialInteractions: [
      {
        id: 'pi_1',
        drug1: 'Clopidogrel 75mg',
        drug2: 'Aspirin (Ecosprin 75mg)',
        severity: 'MODERATE',
        clinicalEffect: 'Dual Antiplatelet Therapy (DAPT): Elevated bleeding risk balanced against stent thrombosis prevention in first 12 months.',
        recommendation: 'Targeted DAPT indicated post-DES. Ensure gastroprotection with Pantoprazole.'
      }
    ]
  },
  {
    id: 'doc_rec_2',
    patientId: 'pat_1',
    fileName: 'Lal_PathLabs_Renal_Lipid_Profile_Aug2026.png',
    fileSize: 940000,
    fileType: 'image/png',
    documentCategory: 'LAB_REPORT',
    uploadedAt: '2026-09-21T07:22:00Z',
    s3Key: 'patients/pat_1/documents/lal_pathlabs_aug2026.png',
    signedUrl: 'https://s3.ap-south-1.amazonaws.com/medikiosk-records/demo_lab_1.png',
    ocrStatus: 'COMPLETED',
    ocrConfidence: 91.8,
    documentDate: '2026-08-18',
    issuingDoctorOrHospital: 'Dr. Lal PathLabs, Dwarka Center',
    ocrText: `DR. LAL PATHLABS REPORT
PATIENT: Ramesh Chandra Kumar | REF BY: Self / Dr. Sharma
SPECIMEN: Serum Blood | DATE: 18-AUG-2026
TEST NAME               OBSERVED VALUE   REFERENCE INTERVAL   UNIT
Serum Creatinine        1.8              0.6 - 1.2            mg/dL  [HIGH]
Blood Urea Nitrogen     38               7 - 20               mg/dL  [HIGH]
Serum Potassium (K+)    5.6              3.5 - 5.1            mEq/L  [HIGH]
Serum Sodium (Na+)      139              135 - 145            mEq/L
HbA1c                   9.1              4.0 - 5.6            %      [HIGH]
Fasting Blood Sugar     184              70 - 99              mg/dL  [HIGH]`,
    extractedEntities: [
      { id: 'le1', type: 'LAB_TEST', text: 'Serum Creatinine', confidence: 0.98 },
      { id: 'le2', type: 'LAB_VALUE', text: '1.8 mg/dL', confidence: 0.98 },
      { id: 'le3', type: 'LAB_TEST', text: 'Serum Potassium', confidence: 0.97 },
      { id: 'le4', type: 'LAB_VALUE', text: '5.6 mEq/L', confidence: 0.97 },
      { id: 'le5', type: 'LAB_TEST', text: 'HbA1c', confidence: 0.96 },
      { id: 'le6', type: 'LAB_VALUE', text: '9.1 %', confidence: 0.96 }
    ],
    abnormalLabs: [
      {
        id: 'l3',
        testName: 'Serum Creatinine',
        resultValue: '1.8 mg/dL',
        numericValue: 1.8,
        unit: 'mg/dL',
        referenceRange: '0.6 - 1.2 mg/dL',
        status: 'HIGH',
        interpretation: 'Renal impairment detected; baseline was 1.1 mg/dL. Adjust nephrotoxic drugs.'
      },
      {
        id: 'l4',
        testName: 'Serum Potassium (K+)',
        resultValue: '5.6 mEq/L',
        numericValue: 5.6,
        unit: 'mEq/L',
        referenceRange: '3.5 - 5.1 mEq/L',
        status: 'HIGH',
        interpretation: 'Hyperkalemia alert: Value outside provided reference range — physician review recommended.'
      },
      {
        id: 'l5',
        testName: 'Glycated Hemoglobin (HbA1c)',
        resultValue: '9.1 %',
        numericValue: 9.1,
        unit: '%',
        referenceRange: '4.0 - 5.6 %',
        status: 'CRITICAL',
        interpretation: 'Poor diabetic control with microvascular progression.'
      }
    ],
    potentialInteractions: [
      {
        id: 'pi_2',
        drug1: 'Metformin 500mg (active)',
        drug2: 'Serum Creatinine 1.8 mg/dL',
        severity: 'HIGH',
        clinicalEffect: 'Impaired renal excretion with elevated creatinine increases risk of Metformin-associated Lactic Acidosis (MALA).',
        recommendation: 'Evaluate eGFR. Dosage reduction or discontinuation warranted if eGFR < 30-45 mL/min.'
      }
    ]
  }
];

// Clinical Timeline Events
export const INITIAL_TIMELINE: ClinicalTimelineEvent[] = [
  {
    id: 'tl_1',
    patientId: 'pat_1',
    date: '2025-11-10',
    category: 'SURGERY',
    title: 'Emergency Primary Percutaneous Coronary Intervention (PTCA)',
    description: 'Admitted to AIIMS Cardiology with acute coronary syndrome. Drug-eluting stent placed to LAD.',
    department: 'Interventional Cardiology, AIIMS',
    doctorName: 'Dr. R. K. Singhal',
    severity: 'CRITICAL',
    tags: ['NSTEMI', 'PTCA', 'LAD Stent']
  },
  {
    id: 'tl_2',
    patientId: 'pat_1',
    date: '2025-11-14',
    category: 'MEDICATION',
    title: 'Discharged on Dual Antiplatelet Therapy & Statins',
    description: 'Initiated Ecosprin 75mg, Clopidogrel 75mg, Atorvastatin 40mg, Metformin 500mg BD.',
    department: 'Cardiology OPD',
    tags: ['DAPT', 'Statin', 'Metformin']
  },
  {
    id: 'tl_3',
    patientId: 'pat_1',
    date: '2026-08-18',
    category: 'INVESTIGATION',
    title: 'Renal Function & Glycemic Panel (Abnormalities Flagged)',
    description: 'Dr. Lal PathLabs: Creatinine jumped to 1.8 mg/dL, Potassium 5.6 mEq/L, HbA1c 9.1%.',
    department: 'Biochemistry / Pathology',
    severity: 'ABNORMAL',
    tags: ['High Creatinine', 'Hyperkalemia', 'Uncontrolled DM']
  },
  {
    id: 'tl_4',
    patientId: 'pat_1',
    date: '2026-09-21',
    category: 'CONSULTATION',
    title: 'Bharat Arogya Intake: Acute Crushing Chest Pain & Sweating',
    description: 'Patient presented to OPD Kiosk #1. Automated red-flag alert generated for potential recurrent ischemia.',
    department: 'Triage / Cardiology OPD',
    severity: 'CRITICAL',
    tags: ['Red Flag', 'Chest Pain', 'Triage P1']
  }
];

// Preloaded Clinical Summary for Patient 1 (Ramesh Kumar)
export const INITIAL_SUMMARIES: Record<string, ClinicalSummary> = {
  pat_1: {
    id: 'sum_pat_1',
    patientId: 'pat_1',
    encounterId: 'enc_pat_1_20260921',
    generatedAt: '2026-09-21T07:25:00Z',
    isDraft: true, // Must always be draft initially
    sourceBreakdown: {
      patientReportedCount: 14,
      ocrDocumentsCount: 2,
      extractedEntitiesCount: 19
    },
    chiefComplaintSummary: 'Severe retrosternal chest tightness and pressure for past 3 hours, associated with cold diaphoresis and mild breathlessness.',
    hpiSummary: '58-year-old male with history of ischemic heart disease (post-LAD stenting in Nov 2025) and Type 2 Diabetes presents with sudden-onset substernal crushing pain starting around 04:30 AM today. Pain radiates to the left shoulder and medial arm. Rated 8/10 on visual analogue scale. Patient reports profuse cold sweating and nausea. Denies fever, productive cough, or syncopal episodes.',
    pastMedicalSurgicalSummary: '1. CAD / Post-PTCA with Drug Eluting Stent to LAD (AIIMS, Nov 2025).\n2. Type 2 Diabetes Mellitus x 8 years.\n3. Essential Hypertension x 12 years.',
    drugAndAllergySummary: 'ACTIVE MEDICATIONS: Ecosprin 75 mg OD, Clopidogrel 75 mg OD, Atorvastatin 40 mg OD, Metformin 500 mg BD, Pantoprazole 40 mg OD.\nALLERGIES: No known drug allergies (NKDA).',
    familyPersonalSummary: 'Family history of premature CAD (father had fatal MI at age 52). Non-smoker, non-alcoholic. Vegetarian diet.',
    reviewOfSystemsSummary: 'Cardiovascular: Positive for angina, diaphoresis. Respiratory: Mild exertional dyspnea. Gastrointestinal: Mild nausea, no vomiting. Neurological: No focal weakness or slurred speech.',
    investigationsSummary: '1. Lal PathLabs (18-Aug-2026): Serum Creatinine 1.8 mg/dL [ELEVATED], Serum Potassium 5.6 mEq/L [ELEVATED], HbA1c 9.1% [POOR CONTROL], Fasting Glucose 184 mg/dL.\n2. AIIMS Discharge (14-Nov-2025): Post-PTCA EF 50%, mid-LAD stent patent.',
    currentMedicationsSummary: 'Ecosprin 75mg OD, Clopidogrel 75mg OD, Atorvastatin 40mg OD, Metformin 500mg BD, Metoprolol 25mg OD.',
    clinicalTimelineSummary: 'Nov 2025 (NSTEMI / PTCA LAD) -> Aug 2026 (Elevated Creatinine 1.8 mg/dL & K+ 5.6) -> Sep 2026 (Acute Presentation with 8/10 chest pain & diaphoresis).',
    redFlagsList: [
      {
        id: 'rf_1',
        patientId: 'pat_1',
        severity: 'CRITICAL',
        symptom: 'Acute Retrosternal Chest Pain radiating to left arm with cold diaphoresis',
        triggerSource: 'PATIENT_INPUT',
        reason: 'High clinical suspicion for Acute Coronary Syndrome / acute stent thrombosis in a post-PCI diabetic patient.',
        actionRequired: 'Stat 12-lead ECG, cardiac troponin I/T, oxygen saturation, place in emergency resuscitation bay.',
        detectedAt: '2026-09-21T07:18:00Z',
        acknowledged: false
      }
    ],
    abnormalLabsList: [
      {
        id: 'l_cr',
        testName: 'Serum Creatinine',
        resultValue: '1.8 mg/dL',
        numericValue: 1.8,
        unit: 'mg/dL',
        referenceRange: '0.6 - 1.2 mg/dL',
        status: 'HIGH',
        interpretation: 'Renal impairment noted. Value outside standard laboratory reference range — physician review recommended.'
      },
      {
        id: 'l_k',
        testName: 'Serum Potassium (K+)',
        resultValue: '5.6 mEq/L',
        numericValue: 5.6,
        unit: 'mEq/L',
        referenceRange: '3.5 - 5.1 mEq/L',
        status: 'HIGH',
        interpretation: 'Hyperkalemia alert. Value outside provided reference range — physician review recommended.'
      },
      {
        id: 'l_a1c',
        testName: 'HbA1c',
        resultValue: '9.1 %',
        numericValue: 9.1,
        unit: '%',
        referenceRange: '4.0 - 5.6 %',
        status: 'CRITICAL',
        interpretation: 'Severely elevated glycated hemoglobin.'
      }
    ],
    drugInteractionsList: [
      {
        id: 'int_1',
        drug1: 'Metformin 500mg',
        drug2: 'Renal Impairment (Creatinine 1.8)',
        severity: 'HIGH',
        clinicalEffect: 'Accumulation risk and potential lactic acidosis with deteriorating renal clearance.',
        recommendation: 'Calculate eGFR; consider temporary withholding if contrast angiogram is required today.'
      }
    ],
    documentDerivedNotes: 'Extracted from 2 prior records (AIIMS Discharge 2025, Lal PathLabs 2026). Stent specifications: Xience Sierra 3.0x28mm to LAD.',
    uncertaintiesRequiringReview: [
      'Confirm exact adherence to Clopidogrel over the past 48 hours.',
      'Check whether patient took morning dose of Metformin and Metoprolol today.',
      'Correlate hyperkalemia (5.6 mEq/L) with current ECG rhythm.'
    ],
    physicianReview: {
      reviewed: false,
      actionTaken: undefined
    }
  }
};

// Initial Triage Records
export const INITIAL_TRIAGE_RECORDS: TriageRecord[] = [
  {
    id: 'tr_1',
    patientId: 'pat_1',
    priority: 'P1_CRITICAL',
    status: 'PENDING_TRIAGE',
    redFlags: [
      {
        id: 'rf_1',
        patientId: 'pat_1',
        severity: 'CRITICAL',
        symptom: 'Acute Retrosternal Chest Pain radiating to left arm with cold diaphoresis',
        triggerSource: 'PATIENT_INPUT',
        reason: 'High clinical suspicion for Acute Coronary Syndrome.',
        actionRequired: 'Stat 12-lead ECG, priority doctor room transfer.',
        detectedAt: '2026-09-21T07:18:00Z',
        acknowledged: false
      }
    ],
    vitals: {
      bpSystolic: 154,
      bpDiastolic: 96,
      pulse: 104,
      spo2: 95,
      temperature: 98.4,
      respiratoryRate: 22
    },
    notes: 'Patient visibly pale and holding chest at Kiosk 1. Sister Mary dispatched wheelchair.',
    createdAt: '2026-09-21T07:19:00Z',
    updatedAt: '2026-09-21T07:19:00Z'
  },
  {
    id: 'tr_2',
    patientId: 'pat_5',
    priority: 'P2_URGENT',
    status: 'TRIAGED_TO_DOCTOR',
    redFlags: [],
    vitals: {
      bpSystolic: 130,
      bpDiastolic: 84,
      pulse: 88,
      spo2: 92,
      temperature: 99.1,
      respiratoryRate: 20
    },
    notes: 'Exertional dyspnea in known COPD patient. SpO2 92% on room air.',
    createdAt: '2026-09-21T08:16:00Z',
    updatedAt: '2026-09-21T08:25:00Z'
  },
  {
    id: 'tr_3',
    patientId: 'pat_2',
    priority: 'P3_ROUTINE',
    status: 'TRIAGED_TO_DOCTOR',
    redFlags: [],
    vitals: {
      bpSystolic: 124,
      bpDiastolic: 80,
      pulse: 76,
      spo2: 98,
      temperature: 98.6,
      respiratoryRate: 16
    },
    notes: 'Routine follow-up for joint pain and seasonal cough.',
    createdAt: '2026-09-21T07:35:00Z',
    updatedAt: '2026-09-21T07:40:00Z'
  }
];

// Preloaded Audit Logs (DPDP Act 2023 Compliance)
export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud_1',
    timestamp: '2026-09-21T07:15:22Z',
    userId: 'usr_pat_1',
    userRole: 'PATIENT',
    userName: 'Ramesh Chandra Kumar',
    action: 'PATIENT_AUTHENTICATED',
    resource: 'ABHA_PROFILE',
    resourceId: '91-4521-8890-1234',
    success: true,
    ipAddress: '10.0.12.4 (Kiosk Terminal #1)',
    details: 'OTP verification successful via ABDM Sandbox Gateway'
  },
  {
    id: 'aud_2',
    timestamp: '2026-09-21T07:16:05Z',
    userId: 'usr_pat_1',
    userRole: 'PATIENT',
    userName: 'Ramesh Chandra Kumar',
    action: 'CONSENT_GRANTED',
    resource: 'DPDP_ABDM_CONSENT',
    resourceId: 'cns_91-4521-8890',
    success: true,
    ipAddress: '10.0.12.4 (Kiosk Terminal #1)',
    details: 'Purpose: Outpatient Medical History Capture & OPD Consultation'
  },
  {
    id: 'aud_3',
    timestamp: '2026-09-21T07:18:12Z',
    userId: 'system',
    userRole: 'ADMIN',
    userName: 'Red Flag Detection Engine',
    action: 'RED_FLAG_TRIGGERED',
    resource: 'TRIAGE_ALERT',
    resourceId: 'rf_1',
    success: true,
    ipAddress: '127.0.0.1 (Local Engine)',
    details: 'Severity: CRITICAL - Acute crushing chest pain radiating to left arm + diaphoresis'
  },
  {
    id: 'aud_4',
    timestamp: '2026-09-21T07:22:45Z',
    userId: 'usr_pat_1',
    userRole: 'PATIENT',
    userName: 'Ramesh Chandra Kumar',
    action: 'DOCUMENT_UPLOADED_AND_OCR_PROCESSED',
    resource: 'MEDICAL_DOCUMENT',
    resourceId: 'doc_rec_2',
    success: true,
    ipAddress: '10.0.12.4 (Kiosk Terminal #1)',
    details: 'Lal_PathLabs_Renal_Lipid_Profile.png: 6 clinical entities, 3 abnormal labs identified'
  },
  {
    id: 'aud_5',
    timestamp: '2026-09-21T07:25:30Z',
    userId: 'system',
    userRole: 'ADMIN',
    userName: 'Mistral Clinical Summarizer',
    action: 'CLINICAL_SUMMARY_GENERATED',
    resource: 'CLINICAL_SUMMARY',
    resourceId: 'sum_pat_1',
    success: true,
    ipAddress: '127.0.0.1 (Local Engine)',
    details: 'Draft clinical summary compiled. Awaiting Physician Confirmation.'
  }
];

export const INITIAL_LAB_ORDERS: DiagnosticLabOrder[] = [
  {
    id: 'ord_lab_1',
    patientId: 'pat_1',
    patientName: 'Ramesh Chandra Kumar',
    patientAge: 58,
    patientGender: 'MALE',
    tokenNumber: 'CARD-042',
    doctorId: 'doc_1',
    doctorName: 'Dr. Alok Sharma, MD, DM',
    department: 'Cardiology OPD Room 12',
    clinicalIndication: 'Acute recurrent retrosternal chest pain + post-stent evaluation',
    priority: 'STAT_URGENT',
    status: 'SAMPLE_COLLECTED',
    specimenBarcode: 'BC-PATH-2026-9041',
    collectedAt: '2026-09-21T07:40:00Z',
    technicianName: 'Kavita Sharma, B.Sc MLT',
    createdAt: '2026-09-21T07:35:00Z',
    tests: [
      {
        testName: 'High-Sensitivity Troponin-I (hs-cTnI)',
        sampleType: 'Serum / EDTA Plasma',
        status: 'COLLECTED',
        referenceRange: '< 0.04 ng/mL',
        unit: 'ng/mL'
      },
      {
        testName: 'Serum Creatinine & eGFR',
        sampleType: 'Serum',
        status: 'COLLECTED',
        referenceRange: '0.7 - 1.2 mg/dL',
        unit: 'mg/dL'
      },
      {
        testName: 'Serum Electrolytes (Na+, K+, Cl-)',
        sampleType: 'Serum',
        status: 'COLLECTED',
        referenceRange: 'K+: 3.5 - 5.1 mEq/L',
        unit: 'mEq/L'
      }
    ]
  },
  {
    id: 'ord_lab_2',
    patientId: 'pat_2',
    patientName: 'Priya Patel',
    patientAge: 42,
    patientGender: 'FEMALE',
    tokenNumber: 'MED-019',
    doctorId: 'doc_2',
    doctorName: 'Dr. Radhika Nair, MD',
    department: 'General Medicine Room 14',
    clinicalIndication: 'Persistent low-grade fever with joint arthralgia & fatigue for 10 days',
    priority: 'ROUTINE',
    status: 'ORDERED',
    createdAt: '2026-09-21T08:15:00Z',
    tests: [
      {
        testName: 'Complete Blood Count (CBC) with Platelets',
        sampleType: 'Whole Blood (EDTA)',
        status: 'PENDING',
        referenceRange: 'Hb: 12.0-15.5 g/dL, TLC: 4000-11000',
        unit: 'g/dL'
      },
      {
        testName: 'Erythrocyte Sedimentation Rate (ESR)',
        sampleType: 'Citrated Blood',
        status: 'PENDING',
        referenceRange: '0 - 20 mm/hr',
        unit: 'mm/hr'
      },
      {
        testName: 'Dengue Serology (NS1 + IgM/IgG ELISA)',
        sampleType: 'Serum',
        status: 'PENDING',
        referenceRange: 'Negative',
        unit: 'index'
      }
    ]
  },
  {
    id: 'ord_lab_3',
    patientId: 'pat_3',
    patientName: 'Mohammad Tariq',
    patientAge: 65,
    patientGender: 'MALE',
    tokenNumber: 'MED-024',
    doctorId: 'doc_2',
    doctorName: 'Dr. Radhika Nair, MD',
    department: 'Internal Medicine',
    clinicalIndication: 'Uncontrolled Type 2 Diabetes Mellitus with bilateral pedal edema',
    priority: 'URGENT',
    status: 'COMPLETED',
    specimenBarcode: 'BC-PATH-2026-8892',
    collectedAt: '2026-09-21T06:30:00Z',
    reportedAt: '2026-09-21T07:15:00Z',
    technicianName: 'Kavita Sharma, B.Sc MLT',
    createdAt: '2026-09-21T06:15:00Z',
    tests: [
      {
        testName: 'Glycated Hemoglobin (HbA1c)',
        sampleType: 'Whole Blood (EDTA)',
        status: 'REPORTED',
        resultValue: '9.4',
        unit: '%',
        referenceRange: '< 5.7 %',
        flag: 'HIGH',
        interpretation: 'Poor glycemic control. Target for age is < 7.0%.'
      },
      {
        testName: 'Fasting Plasma Glucose (FPG)',
        sampleType: 'Fluoride Plasma',
        status: 'REPORTED',
        resultValue: '210',
        unit: 'mg/dL',
        referenceRange: '70 - 100 mg/dL',
        flag: 'HIGH',
        interpretation: 'Marked fasting hyperglycemia.'
      },
      {
        testName: 'Urine Microalbumin / Creatinine Ratio (ACR)',
        sampleType: 'Spot Urine',
        status: 'REPORTED',
        resultValue: '185',
        unit: 'mg/g',
        referenceRange: '< 30 mg/g',
        flag: 'HIGH',
        interpretation: 'Microalbuminuria indicating diabetic kidney disease stage II.'
      }
    ]
  }
];

export const INITIAL_PRESCRIPTIONS: PrescriptionOrder[] = [
  {
    id: 'rx_ord_1',
    prescriptionNumber: 'RX-2026-AIIMS-4081',
    patientId: 'pat_1',
    patientName: 'Ramesh Chandra Kumar',
    patientAge: 58,
    patientGender: 'MALE',
    tokenNumber: 'CARD-042',
    doctorId: 'doc_1',
    doctorName: 'Dr. Alok Sharma, MD, DM',
    department: 'Cardiology OPD',
    diagnosis: 'Acute Coronary Syndrome (Unstable Angina) s/p PTCA LAD 2024, Hypertension',
    createdAt: '2026-09-21T07:45:00Z',
    status: 'PENDING',
    patientAllergies: ['Sulfa Drugs', 'Penicillin (Mild Rash)'],
    safetyAlerts: [
      {
        id: 'pi_rx_1',
        drug1: 'Clopidogrel 75mg',
        drug2: 'Aspirin 75mg',
        severity: 'MODERATE',
        clinicalEffect: 'Dual Antiplatelet Therapy (DAPT) elevates gastrointestinal bleeding risk.',
        recommendation: 'Ensure co-prescription of PPI (Pantoprazole 40mg od before breakfast).'
      }
    ],
    medicines: [
      {
        id: 'med_1',
        medicineName: 'Ecosprin 75 mg Tablet',
        genericName: 'Aspirin (Enteric Coated)',
        dosage: '75 mg',
        frequency: 'Once Daily (OD)',
        duration: '30 Days',
        instructions: 'Take after lunch with water',
        instructionsLocal: {
          en: 'Take after lunch with water',
          hi: 'दोपहर के भोजन के बाद पानी के साथ लें',
          ta: 'மதிய உணவுக்குப் பிறகு தண்ணீருடன் உட்கொள்ளவும்',
          te: 'మధ్యాహ్న భోజనం తర్వాత నీటితో తీసుకోండి',
          bn: 'দুপুরের খাবারের পর জল দিয়ে খান',
          mr: 'दुपारच्या जेवणानंतर पाण्यासोबत घ्या'
        },
        dispensed: false,
        stockAvailable: 2400
      },
      {
        id: 'med_2',
        medicineName: 'Clavix 75 mg Tablet',
        genericName: 'Clopidogrel Bisulfate',
        dosage: '75 mg',
        frequency: 'Once Daily (OD)',
        duration: '30 Days',
        instructions: 'Take at night after food',
        instructionsLocal: {
          en: 'Take at night after food',
          hi: 'रात के खाने के बाद लें',
          ta: 'இரவு உணவுக்குப் பிறகு உட்கொள்ளவும்',
          te: 'రాత్రి భోజనం తర్వాత తీసుకోండి',
          bn: 'রাতের খাবারের পর খান',
          mr: 'रात्रीच्या जेवणानंतर घ्या'
        },
        dispensed: false,
        stockAvailable: 1850
      },
      {
        id: 'med_3',
        medicineName: 'Pan 40 mg Tablet',
        genericName: 'Pantoprazole Sodium Gastro-resistant',
        dosage: '40 mg',
        frequency: 'Once Daily (OD) Before Food',
        duration: '30 Days',
        instructions: 'Take 30 mins before breakfast on empty stomach',
        instructionsLocal: {
          en: 'Take 30 mins before breakfast on empty stomach',
          hi: 'नाश्ते से 30 मिनट पहले खाली पेट लें',
          ta: 'காலை உணவுக்கு 30 நிமிடங்களுக்கு முன் வெறும் வயிற்றில் உட்கொள்ளவும்',
          te: 'ఉదయం అల్పాహారానికి 30 నిమిషాల ముందు ఖాళీ కడుపుతో తీసుకోండి',
          bn: 'সকালের জলখাবারের ৩০ মিনিট আগে খালি পেটে খান',
          mr: 'सकाळच्या नाश्त्याच्या ३० मिनिटे आधी उपाशीपोटी घ्या'
        },
        dispensed: false,
        stockAvailable: 3100
      },
      {
        id: 'med_4',
        medicineName: 'Atorva 40 mg Tablet',
        genericName: 'Atorvastatin Calcium',
        dosage: '40 mg',
        frequency: 'Once Daily at Bedtime (HS)',
        duration: '30 Days',
        instructions: 'Take at bedtime',
        instructionsLocal: {
          en: 'Take at bedtime',
          hi: 'रात को सोने से पहले लें',
          ta: 'தூங்குவதற்கு முன் உட்கொள்ளவும்',
          te: 'పడుకునే ముందు తీసుకోండి',
          bn: 'ঘুমানোর আগে খান',
          mr: 'झोपण्यापूर्वी घ्या'
        },
        dispensed: false,
        stockAvailable: 1540
      }
    ]
  },
  {
    id: 'rx_ord_2',
    prescriptionNumber: 'RX-2026-AIIMS-3982',
    patientId: 'pat_3',
    patientName: 'Mohammad Tariq',
    patientAge: 65,
    patientGender: 'MALE',
    tokenNumber: 'MED-024',
    doctorId: 'doc_2',
    doctorName: 'Dr. Radhika Nair, MD',
    department: 'Internal Medicine',
    diagnosis: 'Type 2 Diabetes Mellitus with Diabetic Nephropathy & Hypertension',
    createdAt: '2026-09-21T07:20:00Z',
    status: 'DISPENSED',
    dispensedAt: '2026-09-21T07:35:00Z',
    dispensedBy: 'Rajesh Gupta, B.Pharm (Counter 3)',
    patientAllergies: [],
    safetyAlerts: [],
    medicines: [
      {
        id: 'med_31',
        medicineName: 'Teneligliptin 20 mg Tablet',
        genericName: 'Teneligliptin Hydrobromide',
        dosage: '20 mg',
        frequency: 'Once Daily (OD)',
        duration: '30 Days',
        instructions: 'Take before breakfast',
        dispensed: true,
        batchNumber: 'BT-TENE-2026-89',
        stockAvailable: 890
      },
      {
        id: 'med_32',
        medicineName: 'Telma 40 mg Tablet',
        genericName: 'Telmisartan',
        dosage: '40 mg',
        frequency: 'Once Daily (OD)',
        duration: '30 Days',
        instructions: 'Take in the morning with water',
        dispensed: true,
        batchNumber: 'BT-TEL-2026-44',
        stockAvailable: 2100
      }
    ]
  }
];
