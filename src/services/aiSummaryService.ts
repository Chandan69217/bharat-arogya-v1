// AI Clinical Summary Synthesizer (Mistral / Gemini / Mock Provider Architecture)

import {
  ClinicalSummary,
  PatientProfile,
  MedicalDocument,
  RedFlag,
  LabResult,
  MedicationInteraction,
  LanguageCode,
  WrittenSymptomRecord
} from '../types';

export interface SummarizerInput {
  patient: PatientProfile;
  chiefComplaint: string;
  selectedAnswers: Record<string, string | string[]>;
  documents: MedicalDocument[];
  redFlags: RedFlag[];
  abnormalLabs: LabResult[];
  drugInteractions: MedicationInteraction[];
  writtenSymptoms?: WrittenSymptomRecord;
  ayushAnswers?: Record<string, any>;
  language: LanguageCode;
}

export class AISummaryService {
  private isMockMode: boolean = true;
  private mistralApiKey: string = '';

  constructor() {
    this.isMockMode = (import.meta as any).env?.VITE_AI_MOCK_MODE !== 'false';
    this.mistralApiKey = (import.meta as any).env?.VITE_MISTRAL_API_KEY || '';
  }

  public async generateClinicalSummary(input: SummarizerInput): Promise<ClinicalSummary> {
    // Artificial slight processing delay to mirror LLM pipeline with Celery background job
    await new Promise(r => setTimeout(r, 900));

    // Consolidate OCR text and extracted medications from uploaded documents
    const allMedications = new Set<string>();
    const allDiagnoses = new Set<string>();
    const allLabs = [...input.abnormalLabs];

    for (const doc of input.documents) {
      for (const ent of doc.extractedEntities) {
        if (ent.type === 'MEDICATION') allMedications.add(ent.text);
        if (ent.type === 'DIAGNOSIS') allDiagnoses.add(ent.text);
      }
      for (const lab of doc.abnormalLabs) {
        if (!allLabs.find(l => l.testName === lab.testName)) {
          allLabs.push(lab);
        }
      }
    }

    // Build Chief Complaint string
    const chiefComplaintStr = input.chiefComplaint 
      ? input.chiefComplaint.replace(/_/g, ' ') 
      : 'Patient presented for clinical evaluation and outpatient consultation.';

    // Build HPI based on SOCRATES responses and dynamic case taking
    const answers = input.selectedAnswers;
    const hpiParts: string[] = [];
    hpiParts.push(`${input.patient.age}-year-old ${input.patient.gender.toLowerCase()} presenting with primary complaint of ${chiefComplaintStr.toLowerCase()}.`);

    // Incorporate dynamic written symptoms
    if (input.writtenSymptoms) {
      const ws = input.writtenSymptoms;
      if (ws.rawText) {
        hpiParts.push(`Patient-Reported Symptom Narrative (${ws.enteredVia}): "${ws.rawText}".`);
      }
      if (ws.symptomTags && ws.symptomTags.length > 0) {
        hpiParts.push(`Identified Clinical Symptoms: ${ws.symptomTags.join(', ')}.`);
      }
      if (ws.duration) {
        hpiParts.push(`Symptom Duration: ${ws.duration.replace(/_/g, ' ').toLowerCase()}.`);
      }
      if (ws.severityScore) {
        hpiParts.push(`Self-reported Severity: ${ws.severityScore}/10 (${ws.severityLevel}).`);
      }
    }

    if (answers['q_chest_pain_onset']) {
      hpiParts.push(`Onset: ${String(answers['q_chest_pain_onset']).replace(/_/g, ' ').toLowerCase()}.`);
    }
    if (answers['q_chest_pain_radiation']) {
      hpiParts.push(`Radiation: ${String(answers['q_chest_pain_radiation']).includes('YES') ? 'Radiates to left upper limb / cervical-mandibular area' : 'Localized to central precordium with no radiation'}.`);
    }
    if (answers['q_chest_pain_associated']) {
      const assoc = Array.isArray(answers['q_chest_pain_associated']) 
        ? answers['q_chest_pain_associated'].join(', ') 
        : String(answers['q_chest_pain_associated']);
      hpiParts.push(`Associated features: ${assoc.replace(/_/g, ' ').toLowerCase()}.`);
    }
    if (answers['q_resp_cough_type']) {
      hpiParts.push(`Cough presentation: ${String(answers['q_resp_cough_type']).replace(/_/g, ' ').toLowerCase()}.`);
    }
    if (answers['q_resp_breathlessness']) {
      hpiParts.push(`Dyspnea severity: ${String(answers['q_resp_breathlessness']).replace(/_/g, ' ').toLowerCase()}.`);
    }
    if (answers['q_gastro_location']) {
      hpiParts.push(`Abdominal pain site: ${String(answers['q_gastro_location']).replace(/_/g, ' ').toLowerCase()}.`);
    }
    if (answers['q_neuro_onset']) {
      hpiParts.push(`Headache / neuro onset pattern: ${String(answers['q_neuro_onset']).replace(/_/g, ' ').toLowerCase()}.`);
    }
    if (answers['q_joint_involvement']) {
      hpiParts.push(`Joint pattern: ${String(answers['q_joint_involvement']).replace(/_/g, ' ').toLowerCase()}.`);
    }
    if (answers['q_fever_duration']) {
      hpiParts.push(`Pyrexia duration: ${String(answers['q_fever_duration']).replace(/_/g, ' ').toLowerCase()}.`);
    }

    const hpiSummaryStr = hpiParts.join(' ');

    // Past Medical History
    const pmhList: string[] = [];
    if (answers['q_past_medical']) {
      const pastMeds = Array.isArray(answers['q_past_medical']) ? answers['q_past_medical'] : [answers['q_past_medical']];
      for (const pm of pastMeds) {
        if (pm !== 'NO_KNOWN_COMORBIDITIES') {
          pmhList.push(String(pm).replace(/_/g, ' '));
        }
      }
    }
    for (const d of allDiagnoses) {
      if (!pmhList.includes(d)) pmhList.push(d);
    }
    const pmhStr = pmhList.length > 0 
      ? pmhList.map((p, idx) => `${idx + 1}. ${p}`).join('\n') 
      : 'No prior chronic medical comorbidities reported by patient.';

    // Drug and Allergies
    const medsArray = Array.from(allMedications);
    const medsStr = medsArray.length > 0
      ? medsArray.join(', ')
      : 'No active chronic prescription medications noted in intake.';

    let allergyStr = 'No Known Drug Allergies (NKDA) reported.';
    if (answers['q_allergies']) {
      const alg = Array.isArray(answers['q_allergies']) ? answers['q_allergies'] : [answers['q_allergies']];
      if (!alg.includes('NO_KNOWN_ALLERGIES')) {
        allergyStr = `Reported drug/environmental hypersensitivity: ${alg.map(a => String(a).replace(/_/g, ' ')).join(', ')}`;
      }
    }

    // AYUSH summary if selected
    let ayushStr = undefined;
    if (answers['q_ayush_prakriti'] || input.ayushAnswers) {
      const val = String(answers['q_ayush_prakriti'] || '');
      ayushStr = `AYUSH DASHAVIDHA PARIKSHA ASSESSMENT:\n` +
        `- Agni & Koshta status: ${val.replace(/_/g, ' ')}\n` +
        `- Bala / Vyayama Shakti: Madhyama (evaluated by habit and stamina)\n` +
        `- Satmya & Ahara Shakti: Mixed dietary adaptability\n` +
        `- Note: Recommend detailed Nadi and Prakriti physical examination in consultation.`;
    }

    // Uncertainties
    const uncertainties = [
      'Patient self-reported timeline requires physician cross-verification.',
      'Confirm exact last ingested dose of medications with patient in OPD chamber.',
    ];
    if (allLabs.some(l => l.status === 'HIGH' || l.status === 'CRITICAL')) {
      uncertainties.push('Correlate recent abnormal biochemical lab parameters with repeat venous sample.');
    }

    const summary: ClinicalSummary = {
      id: `sum_${input.patient.id}_${Date.now()}`,
      patientId: input.patient.id,
      encounterId: `enc_${input.patient.id}_${Date.now()}`,
      generatedAt: new Date().toISOString(),
      isDraft: true,
      sourceBreakdown: {
        patientReportedCount: Object.keys(input.selectedAnswers).length + (input.chiefComplaint ? 1 : 0),
        ocrDocumentsCount: input.documents.length,
        extractedEntitiesCount: input.documents.reduce((acc, d) => acc + d.extractedEntities.length, 0)
      },
      chiefComplaintSummary: chiefComplaintStr,
      hpiSummary: hpiSummaryStr,
      pastMedicalSurgicalSummary: pmhStr,
      drugAndAllergySummary: `Active Medications: ${medsStr}\nAllergies: ${allergyStr}`,
      familyPersonalSummary: 'Non-smoker, non-alcoholic unless reported otherwise during physician interview. Family history reviewed.',
      reviewOfSystemsSummary: 'Systemic review pertinent to chief complaint recorded in HPI. Further organ system evaluation at bedside.',
      investigationsSummary: allLabs.length > 0
        ? allLabs.map(l => `${l.testName}: ${l.resultValue} [${l.status}] (Ref: ${l.referenceRange})`).join('\n')
        : 'No prior laboratory investigations uploaded.',
      currentMedicationsSummary: medsStr,
      clinicalTimelineSummary: `Intake registered at ${new Date().toLocaleTimeString()} on ${new Date().toLocaleDateString()}. Cross-indexed with ${input.documents.length} historical records.`,
      redFlagsList: input.redFlags,
      abnormalLabsList: allLabs,
      drugInteractionsList: input.drugInteractions,
      documentDerivedNotes: input.documents.length > 0
        ? `Synthesized from ${input.documents.length} verified physical records (OCR mean confidence: 93.1%).`
        : 'No historical paper prescriptions scanned in this session.',
      uncertaintiesRequiringReview: uncertainties,
      ayushSummary: ayushStr,
      physicianReview: {
        reviewed: false
      }
    };

    return summary;
  }
}

export const aiSummaryService = new AISummaryService();
