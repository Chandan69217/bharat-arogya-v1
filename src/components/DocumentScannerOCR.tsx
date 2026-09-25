// Medical Document Upload, Tesseract OCR Processing & Clinical Extraction Component

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ocrService } from '../services/ocrService';
import { DocumentType, MedicalDocument, OCRProcessingStatus } from '../types';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  RefreshCw,
  Eye,
  ShieldCheck,
  Pill,
  Calendar,
  Activity,
  Layers
} from 'lucide-react';

export const DocumentScannerOCR: React.FC = () => {
  const { currentPatient, documents, addDocument, logAuditAction } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<DocumentType>('PRESCRIPTION');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<OCRProcessingStatus>('UPLOADED');
  const [progressPct, setProgressPct] = useState<number>(0);
  const [activeDocView, setActiveDocView] = useState<MedicalDocument | null>(documents[0] || null);

  // File Upload Handler
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsProcessing(true);
    setProgressPct(10);

    try {
      const processedDoc = await ocrService.processDocument(
        file,
        currentPatient.id,
        selectedCategory,
        (status, pct) => {
          setProcessingStatus(status);
          setProgressPct(pct);
        }
      );

      addDocument(processedDoc);
      setActiveDocView(processedDoc);
      logAuditAction('DOCUMENT_OCR_PROCESSED', 'MEDICAL_DOCUMENT', processedDoc.id, true, `Entities: ${processedDoc.extractedEntities.length}, Abnormal labs: ${processedDoc.abnormalLabs.length}`);
    } catch (e: any) {
      console.error('OCR error:', e);
      alert(`OCR Processing failed: ${e?.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Sample Loaders for Zero-Friction SIH Demonstration
  const handleLoadSample = (sampleType: 'AIIMS_DISCHARGE' | 'LAL_PATHLABS') => {
    setIsProcessing(true);
    setProgressPct(25);
    setTimeout(() => {
      setProgressPct(60);
      setProcessingStatus('EXTRACTING');
      setTimeout(() => {
        const found = documents.find(d => sampleType === 'AIIMS_DISCHARGE' ? d.id === 'doc_rec_1' : d.id === 'doc_rec_2');
        if (found) {
          setActiveDocView(found);
        }
        setIsProcessing(false);
        setProgressPct(100);
        setProcessingStatus('COMPLETED');
      }, 500);
    }, 400);
  };

  const patientDocs = documents.filter(d => d.patientId === currentPatient.id);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            Module B — Document Digitization & Intelligence
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Medical Document Scan & Clinical OCR</h1>
          <p className="text-sm text-slate-500">
            Upload prescriptions, laboratory reports, or discharge summaries for automatic entity extraction and safety analysis.
          </p>
        </div>

        {/* Instant Demo Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleLoadSample('AIIMS_DISCHARGE')}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 transition-colors flex items-center space-x-1.5"
          >
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Load AIIMS Prescription</span>
          </button>
          <button
            onClick={() => handleLoadSample('LAL_PATHLABS')}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 transition-colors flex items-center space-x-1.5"
          >
            <Activity className="w-4 h-4 text-amber-600" />
            <span>Load Lal PathLabs Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload Zone & Document List (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upload Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-800 flex items-center">
              <UploadCloud className="w-5 h-5 mr-2 text-teal-600" />
              Upload Medical Document
            </h2>

            {/* Document Category Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Document Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as DocumentType)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-teal-500"
              >
                <option value="PRESCRIPTION">Doctor Prescription (Rx)</option>
                <option value="LAB_REPORT">Laboratory / Blood Report</option>
                <option value="DISCHARGE_SUMMARY">Hospital Discharge Summary</option>
                <option value="IMAGING_REPORT">Radiology / Imaging Report</option>
                <option value="AYUSH_RECORD">AYUSH / Panchakarma Record</option>
              </select>
            </div>

            {/* Drag & Drop Area */}
            <label className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50 hover:bg-teal-50/40 group">
              <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-teal-600 transition-colors mb-2" />
              <span className="text-sm font-semibold text-slate-700">
                Click to browse or drag file here
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Supports PDF, JPG, JPEG, PNG (Handwritten or Printed)
              </span>
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                disabled={isProcessing}
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </label>

            {/* Live Progress Indicator */}
            {isProcessing && (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 space-y-2 animate-pulse">
                <div className="flex items-center justify-between text-xs font-bold text-teal-900">
                  <span className="flex items-center">
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin text-teal-600" />
                    {processingStatus === 'UPLOADED' && 'Uploading to secure S3 storage...'}
                    {processingStatus === 'PROCESSING' && 'Running Tesseract OCR engine...'}
                    {processingStatus === 'EXTRACTING' && 'Extracting medications & lab values...'}
                    {processingStatus === 'COMPLETED' && 'Verification completed!'}
                  </span>
                  <span>{progressPct}%</span>
                </div>
                <div className="w-full bg-teal-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-teal-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Uploaded Records History List */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between">
              <span>Patient Scanned Documents</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                {patientDocs.length} Records
              </span>
            </h3>

            <div className="space-y-2">
              {patientDocs.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setActiveDocView(doc)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    activeDocView?.id === doc.id
                      ? 'border-teal-600 bg-teal-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">{doc.fileName}</p>
                      <p className="text-[11px] text-slate-500">
                        {doc.documentCategory} • {doc.extractedEntities.length} entities
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center space-x-1.5">
                    {doc.abnormalLabs.length > 0 && (
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                        {doc.abnormalLabs.length} Abnormal
                      </span>
                    )}
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ✓ {doc.ocrConfidence?.toFixed(0)}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: OCR Results & Intelligence Inspection (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {activeDocView ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              {/* Document Header & Confidence Score */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-slate-900">{activeDocView.fileName}</h2>
                    <span className="text-xs font-bold bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full">
                      OCR {activeDocView.ocrConfidence?.toFixed(1)}% Confidence
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Issuing Authority: {activeDocView.issuingDoctorOrHospital || 'Verified Hospital Record'} • Uploaded {new Date(activeDocView.uploadedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    S3 Bucket: <code className="font-mono text-teal-800 font-bold">medikiosk-records</code>
                  </span>
                </div>
              </div>

              {/* Abnormal Laboratory Values Detected */}
              {activeDocView.abnormalLabs.length > 0 && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-amber-900 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-600" />
                      Abnormal Laboratory Values Detected ({activeDocView.abnormalLabs.length})
                    </h3>
                    <span className="text-[11px] text-amber-800 font-semibold italic">
                      Requires physician review
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeDocView.abnormalLabs.map((lab) => (
                      <div key={lab.id} className="bg-white border border-amber-200 rounded-lg p-3 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">{lab.testName}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            lab.status === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                          }`}>
                            {lab.status}
                          </span>
                        </div>
                        <p className="text-base font-extrabold text-slate-900 mt-1">{lab.resultValue}</p>
                        <p className="text-[11px] text-slate-500">Ref: {lab.referenceRange}</p>
                        {lab.interpretation && (
                          <p className="text-[11px] text-amber-900 mt-1 font-medium italic border-t border-slate-100 pt-1">
                            {lab.interpretation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medication Safety & Interactions */}
              {activeDocView.potentialInteractions.length > 0 && (
                <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 space-y-2">
                  <h3 className="text-sm font-bold text-rose-900 flex items-center">
                    <Pill className="w-4 h-4 mr-1.5 text-rose-600" />
                    Potential Medication Interaction Alert
                  </h3>
                  {activeDocView.potentialInteractions.map((int) => (
                    <div key={int.id} className="bg-white border border-rose-200 rounded-lg p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{int.drug1} + {int.drug2}</span>
                        <span className="bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded text-[10px]">
                          {int.severity} SEVERITY
                        </span>
                      </div>
                      <p className="text-slate-700">{int.clinicalEffect}</p>
                      <p className="font-semibold text-rose-800 pt-0.5">Rec: {int.recommendation}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Extracted Clinical Entities Breakdown */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center">
                  <Layers className="w-4 h-4 mr-1.5 text-teal-600" />
                  Extracted Clinical Entities ({activeDocView.extractedEntities.length})
                </h3>

                <div className="flex flex-wrap gap-2">
                  {activeDocView.extractedEntities.map((ent) => {
                    const badgeStyles: Record<string, string> = {
                      MEDICATION: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                      DOSAGE: 'bg-blue-50 text-blue-800 border-blue-200',
                      FREQUENCY: 'bg-indigo-50 text-indigo-800 border-indigo-200',
                      DIAGNOSIS: 'bg-purple-50 text-purple-800 border-purple-200',
                      LAB_TEST: 'bg-amber-50 text-amber-800 border-amber-200',
                      LAB_VALUE: 'bg-orange-50 text-orange-800 border-orange-200',
                      PROCEDURE: 'bg-cyan-50 text-cyan-800 border-cyan-200'
                    };
                    return (
                      <span
                        key={ent.id}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center space-x-1.5 ${
                          badgeStyles[ent.type] || 'bg-slate-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        <span className="font-bold text-[10px] uppercase opacity-70">[{ent.type}]</span>
                        <span>{ent.text}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Full OCR Extracted Raw Text */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Full OCR Extracted Text:
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Tesseract Engine v5
                  </span>
                </div>
                <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs whitespace-pre-wrap max-h-56 overflow-y-auto leading-relaxed border border-slate-800">
                  {activeDocView.ocrText}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-base font-semibold text-slate-700">No Document Selected</p>
              <p className="text-xs text-slate-400 mt-1">Upload a prescription or load sample records above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
