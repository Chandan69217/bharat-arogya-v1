// Ayushman Bharat Digital Mission (ABDM) / ABHA Integration Service

import { ABHAProfile, PatientConsent } from '../types';

export interface ABDMVerifyOTPResponse {
  success: boolean;
  message: string;
  abhaProfile?: ABHAProfile;
  txnId?: string;
  token?: string;
}

export class ABHAService {
  private isMockMode: boolean = true;

  constructor() {
    this.isMockMode = (import.meta as any).env?.VITE_ABHA_MOCK_MODE !== 'false';
  }

  // Request OTP for ABHA ID / Aadhaar verification
  public async requestOTP(abhaOrAadhaar: string): Promise<{ success: boolean; message: string; txnId: string }> {
    // Clean input
    const cleanId = abhaOrAadhaar.replace(/\s+/g, '').replace(/-/g, '');
    
    // Simulate ABDM Gateway call
    await new Promise(r => setTimeout(r, 600));

    return {
      success: true,
      message: `OTP sent successfully to the mobile number registered with ${cleanId.length === 12 ? 'Aadhaar' : 'ABHA ID'}. (For demo, use 123456)`,
      txnId: `txn_abdm_${Date.now()}`
    };
  }

  // Verify OTP and link ABHA
  public async verifyOTP(txnId: string, otp: string, inputId: string): Promise<ABDMVerifyOTPResponse> {
    await new Promise(r => setTimeout(r, 700));

    if (otp !== '123456' && otp.length !== 6) {
      return {
        success: false,
        message: 'Invalid OTP. Please enter the 6-digit code sent to your mobile (Demo OTP: 123456).'
      };
    }

    const formattedAbha = inputId.includes('@') 
      ? inputId 
      : (inputId.includes('-') ? inputId : '91-4521-8890-1234');

    const address = inputId.includes('@') ? inputId : 'ramesh.kumar@abdm';

    return {
      success: true,
      message: 'ABHA record successfully authenticated and linked via ABDM M1/M2 Gateway.',
      abhaProfile: {
        abhaId: formattedAbha,
        abhaAddress: address,
        linkedAadhaarLast4: '8890',
        verified: true,
        linkedAt: new Date().toISOString(),
        kycStatus: 'VERIFIED'
      },
      token: `abdm_token_${Date.now()}`
    };
  }

  // Generate DPDP Act 2023 & ABDM Compliant Consent Record
  public createConsentRecord(patientId: string, scope: string[]): PatientConsent {
    return {
      id: `cns_${Date.now()}`,
      patientId,
      purpose: 'Digital OPD Clinical History Acquisition & Medical Record Structuring',
      scope: scope.length > 0 ? scope : ['CLINICAL_HISTORY', 'PRESCRIPTION_OCR', 'TIMELINE_INTEGRATION'],
      status: 'ACTIVE',
      version: 'DPDP-2023-V2.1',
      grantedAt: new Date().toISOString(),
      dpdpCompliant: true,
      abdmConsentId: `abdm-cns-${Math.floor(100000 + Math.random() * 900000)}`
    };
  }

  // FHIR Bundle Export (Fast Healthcare Interoperability Resources for ABDM M3)
  public exportToFHIRBundle(patientName: string, abhaId: string, summary: any): any {
    return {
      resourceType: 'Bundle',
      id: `bundle-medikiosk-${Date.now()}`,
      type: 'document',
      timestamp: new Date().toISOString(),
      identifier: {
        system: 'https://healthid.ndhm.gov.in',
        value: abhaId
      },
      entry: [
        {
          fullUrl: `urn:uuid:patient-${Date.now()}`,
          resource: {
            resourceType: 'Patient',
            identifier: [{ system: 'https://healthid.ndhm.gov.in', value: abhaId }],
            name: [{ text: patientName }]
          }
        },
        {
          fullUrl: `urn:uuid:composition-${Date.now()}`,
          resource: {
            resourceType: 'Composition',
            status: 'final',
            type: {
              coding: [{ system: 'http://loinc.org', code: '34133-9', display: 'Summarization of episode note' }]
            },
            title: 'Bharat Arogya Clinical Intake Summary',
            section: [
              { title: 'Chief Complaint', text: { status: 'generated', div: summary.chiefComplaintSummary } },
              { title: 'History of Present Illness', text: { status: 'generated', div: summary.hpiSummary } },
              { title: 'Medications', text: { status: 'generated', div: summary.currentMedicationsSummary } },
              { title: 'Allergies', text: { status: 'generated', div: summary.drugAndAllergySummary } }
            ]
          }
        }
      ]
    };
  }
}

export const abhaService = new ABHAService();
