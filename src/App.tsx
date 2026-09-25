/**
 * Bharat Arogya — AI Clinical History & Patient Case-Taking Platform
 * Built for Indian Hospitals (SIH / AIIMS Specification)
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { Navbar } from './components/Navbar';
import { EmergencyRedFlagModal } from './components/EmergencyRedFlagModal';
import { KioskWelcomeStep } from './components/KioskWelcomeStep';
import { ConversationalHistoryEngine } from './components/ConversationalHistoryEngine';
import { DocumentScannerOCR } from './components/DocumentScannerOCR';
import { ClinicalSummaryViewer } from './components/ClinicalSummaryViewer';
import { DoctorDashboardView } from './components/DoctorDashboardView';
import { TriageStaffView } from './components/TriageStaffView';
import { AdminAnalyticsView } from './components/AdminAnalyticsView';
import { PatientPortalView } from './components/PatientPortalView';
import { LabTechnicianView } from './components/LabTechnicianView';
import { PharmacistView } from './components/PharmacistView';
import { PublicPlatformSite } from './components/PublicPlatformSite';
import { RoleAuthModal } from './components/RoleAuthModal';
import { ShieldCheck, Stethoscope } from 'lucide-react';

const BharatArogyaMain: React.FC = () => {
  const {
    currentUser,
    isKioskMode,
    isPublicSiteView,
    setIsPublicSiteView,
    showAuthModal,
    setShowAuthModal,
    authModalInitialRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>(
    currentUser.role === 'PATIENT' ? 'kiosk_intake' : 'doctor_queue'
  );
  const [intakeStarted, setIntakeStarted] = useState<boolean>(false);

  // Automatically align default active tab when role changes
  useEffect(() => {
    if (currentUser.role === 'DOCTOR') {
      setActiveTab('doctor_queue');
    } else if (currentUser.role === 'LAB_TECHNICIAN') {
      setActiveTab('lab_orders');
    } else if (currentUser.role === 'PHARMACIST') {
      setActiveTab('pharmacy_dispense');
    } else if (currentUser.role === 'TRIAGE_STAFF') {
      setActiveTab('triage_dashboard');
    } else if (currentUser.role === 'ADMIN') {
      setActiveTab('admin_analytics');
    } else if (currentUser.role === 'PATIENT') {
      setActiveTab('kiosk_intake');
    }
  }, [currentUser.role]);

  return (
    <div
      id="bharat-arogya-app-root"
      className={`min-h-screen flex flex-col bg-slate-100 text-slate-900 ${
        isKioskMode && !isPublicSiteView ? 'select-none' : ''
      }`}
    >
      {/* 1. Accessibility Toolbar (Top Bar for High-Contrast, Font Resizing, Bhashini Voice Guide) */}
      <AccessibilityToolbar />

      {/* 2. Main Role Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 3. Global Emergency Red-Flag Alert Modal */}
      <EmergencyRedFlagModal />

      {/* 4. Role Authentication Modal (ABHA ID with OTP & Doctor/Lab/Pharmacist logins) */}
      <RoleAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialRole={authModalInitialRole}
      />

      {/* 5. Main Application Workspace or Public Information Site */}
      {isPublicSiteView ? (
        <PublicPlatformSite />
      ) : (
        <main id="main-content-view" className="flex-1 py-6">
          {/* Patient Tabs */}
          {activeTab === 'kiosk_intake' && (
            <div>
              {!intakeStarted ? (
                <KioskWelcomeStep onStartHistory={() => setIntakeStarted(true)} />
              ) : (
                <ConversationalHistoryEngine
                  onComplete={() => {
                    setActiveTab('document_ocr');
                  }}
                  onSwitchToDoctor={() => {
                    setActiveTab('doctor_queue');
                  }}
                />
              )}
            </div>
          )}

          {activeTab === 'document_ocr' && <DocumentScannerOCR />}

          {activeTab === 'clinical_summary' && <ClinicalSummaryViewer />}

          {activeTab === 'patient_portal' && <PatientPortalView />}

          {/* Doctor Tab */}
          {activeTab === 'doctor_queue' && <DoctorDashboardView />}

          {/* Lab Technician Tab */}
          {activeTab === 'lab_orders' && <LabTechnicianView />}

          {/* Pharmacist Tab */}
          {activeTab === 'pharmacy_dispense' && <PharmacistView />}

          {/* Triage & Admin Tabs */}
          {activeTab === 'triage_dashboard' && <TriageStaffView />}

          {activeTab === 'admin_analytics' && <AdminAnalyticsView />}

          {activeTab === 'admin_audit' && <AdminAnalyticsView />}
        </main>
      )}

      {/* 6. Hospital Footer & Regulatory Compliance Bar */}
      {!isPublicSiteView && (
        <footer className="bg-white border-t border-slate-200 py-4 px-4 sm:px-6 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
              <div className="flex items-center space-x-1.5 text-teal-800 font-bold whitespace-nowrap">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Bharat Arogya (भारत आरोग्य)</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span className="whitespace-nowrap">AIIMS Smart OPD Specification</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center text-emerald-700 font-semibold whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                DPDP Act 2023 & ABDM Level-3 Certified
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400 text-[11px]">
              <span>Tesseract OCR v5</span>
              <span>Bhashini Multilingual NLP</span>
              <span>FHIR v4.0.1</span>
              <span className="text-teal-700 font-semibold">Active Session</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BharatArogyaMain />
    </AppProvider>
  );
}
