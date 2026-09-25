// Main Bharat Arogya Responsive Header & Role Navigation Bar
// Fully localized across 6 Indian languages with strict role authentication & public landing integration

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../services/translations';
import {
  Stethoscope,
  Users,
  Activity,
  ShieldCheck,
  FileText,
  AlertTriangle,
  RotateCcw,
  FlaskConical,
  Pill,
  Menu,
  X,
  LogIn,
  LogOut,
  Globe,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const {
    currentUser,
    patients,
    currentPatient,
    setCurrentPatientId,
    triageRecords,
    resetKioskSession,
    isAuthenticated,
    logout,
    setShowAuthModal,
    isPublicSiteView,
    setIsPublicSiteView,
    currentLanguage,
    labOrders,
    prescriptions
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = getTranslation(currentLanguage).nav;

  const criticalTriageCount = triageRecords.filter(
    (r) => r.priority === 'P1_CRITICAL' && r.status !== 'DISCHARGED'
  ).length;

  const statLabCount = labOrders.filter((o) => o.priority === 'STAT_URGENT' && o.status !== 'COMPLETED').length;
  const pendingRxCount = prescriptions.filter((p) => p.status === 'PENDING').length;

  const handleNavClick = (tab: string) => {
    setIsPublicSiteView(false);
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleOpenPublicSite = () => {
    setIsPublicSiteView(true);
    setMobileMenuOpen(false);
  };

  const handleAuthClick = () => {
    setShowAuthModal(true);
    setMobileMenuOpen(false);
  };

  const handleGetStarted = () => {
    setIsPublicSiteView(false);
    setActiveTab('kiosk_intake');
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav id="bharat-arogya-navbar" className="bg-white border-b border-slate-200 shadow-xs sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand / Logo - Guaranteed single-line across all screen sizes */}
          <div className="flex items-center shrink-0 min-w-0">
            <button
              id="brand-home-btn"
              onClick={handleOpenPublicSite}
              className="flex items-center gap-2 sm:gap-2.5 text-left group whitespace-nowrap cursor-pointer select-none shrink-0"
              title="Return to Public Platform Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-800 via-teal-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform shrink-0">
                <Stethoscope className="w-5 h-5 text-emerald-100" />
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 whitespace-nowrap">
                  {t.brandName}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap hidden xs:inline-block">
                  ABDM
                </span>
              </div>
            </button>
          </div>

          {/* Center Navigation Tabs (Role-Adaptive on Desktop) */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {/* Public Site Tab */}
            <button
              id="nav-public-site-btn"
              onClick={handleOpenPublicSite}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isPublicSiteView
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.platformInfo}</span>
            </button>

            {/* If Authenticated and on Public Site: Quick Return to Dashboard */}
            {isPublicSiteView && isAuthenticated && (
              <button
                id="nav-return-dashboard-btn"
                onClick={() => setIsPublicSiteView(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Activity className="w-3.5 h-3.5 text-teal-700" />
                <span>Return to {currentUser.role.replace('_', ' ')} Dashboard</span>
              </button>
            )}

            {/* DASHBOARD ROLE TABS (Displayed only when not in public site) */}
            {!isPublicSiteView && (
              <>
                {/* PATIENT TABS */}
                {currentUser.role === 'PATIENT' && (
                  <>
                    <button
                      id="nav-tab-history"
                      onClick={() => handleNavClick('kiosk_intake')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                        activeTab === 'kiosk_intake'
                          ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {t.clinicalHistory}
                    </button>
                    <button
                      id="nav-tab-ocr"
                      onClick={() => handleNavClick('document_ocr')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                        activeTab === 'document_ocr'
                          ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {t.scanOcr}
                    </button>
                    <button
                      id="nav-tab-summary"
                      onClick={() => handleNavClick('clinical_summary')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                        activeTab === 'clinical_summary'
                          ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {t.caseSummary}
                    </button>
                    <button
                      id="nav-tab-portal"
                      onClick={() => handleNavClick('patient_portal')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                        activeTab === 'patient_portal'
                          ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {t.healthTimeline}
                    </button>
                  </>
                )}

                {/* DOCTOR TABS */}
                {currentUser.role === 'DOCTOR' && (
                  <>
                    <button
                      id="nav-tab-doc-queue"
                      onClick={() => handleNavClick('doctor_queue')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'doctor_queue'
                          ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5 text-teal-700" />
                      <span>{t.doctorQueue}</span>
                      {criticalTriageCount > 0 && (
                        <span className="px-1.5 py-0.2 text-[10px] font-bold bg-rose-600 text-white rounded-full animate-pulse">
                          {criticalTriageCount} P1
                        </span>
                      )}
                    </button>
                    <button
                      id="nav-tab-doc-review"
                      onClick={() => handleNavClick('clinical_summary')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'clinical_summary'
                          ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-teal-700" />
                      <span>{t.physicianReview}</span>
                    </button>
                    <button
                      id="nav-tab-doc-timeline"
                      onClick={() => handleNavClick('patient_portal')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'patient_portal'
                          ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5 text-teal-700" />
                      <span>{t.healthTimeline}</span>
                    </button>
                  </>
                )}

                {/* LAB TECHNICIAN TABS */}
                {currentUser.role === 'LAB_TECHNICIAN' && (
                  <button
                    id="nav-tab-lab-orders"
                    onClick={() => handleNavClick('lab_orders')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === 'lab_orders'
                        ? 'bg-cyan-50 text-cyan-900 font-bold border border-cyan-200'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <FlaskConical className="w-3.5 h-3.5 text-cyan-700" />
                    <span>{t.labOrders}</span>
                    {statLabCount > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold bg-rose-600 text-white rounded-full">
                        {statLabCount} STAT
                      </span>
                    )}
                  </button>
                )}

                {/* PHARMACIST TABS */}
                {currentUser.role === 'PHARMACIST' && (
                  <button
                    id="nav-tab-pharmacy"
                    onClick={() => handleNavClick('pharmacy_dispense')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === 'pharmacy_dispense'
                        ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Pill className="w-3.5 h-3.5 text-amber-700" />
                    <span>{t.pharmacyDispense}</span>
                    {pendingRxCount > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold bg-amber-600 text-white rounded-full">
                        {pendingRxCount}
                      </span>
                    )}
                  </button>
                )}

                {/* TRIAGE TABS */}
                {currentUser.role === 'TRIAGE_STAFF' && (
                  <>
                    <button
                      id="nav-tab-triage"
                      onClick={() => handleNavClick('triage_dashboard')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'triage_dashboard'
                          ? 'bg-rose-50 text-rose-900 font-bold border border-rose-200'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>{t.triageDashboard}</span>
                      {criticalTriageCount > 0 && (
                        <span className="px-1.5 py-0.2 text-[10px] font-bold bg-rose-600 text-white rounded-full animate-pulse">
                          {criticalTriageCount}
                        </span>
                      )}
                    </button>
                    <button
                      id="nav-tab-triage-all"
                      onClick={() => handleNavClick('doctor_queue')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                        activeTab === 'doctor_queue'
                          ? 'bg-teal-50 text-teal-800 font-bold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {t.doctorQueue}
                    </button>
                  </>
                )}

                {/* ADMIN TABS */}
                {currentUser.role === 'ADMIN' && (
                  <>
                    <button
                      id="nav-tab-admin-analytics"
                      onClick={() => handleNavClick('admin_analytics')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'admin_analytics'
                          ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5 text-teal-700" />
                      <span>{t.hospitalAnalytics}</span>
                    </button>
                    <button
                      id="nav-tab-admin-audit"
                      onClick={() => handleNavClick('admin_audit')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === 'admin_audit'
                          ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                      <span>{t.auditLogs}</span>
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Right: Auth & Primary Action Controls (NO role-switching dropdown/pill buttons) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* If Not Authenticated or on Public Site: Show Login and Get Started */}
            {!isAuthenticated || isPublicSiteView ? (
              <>
                <button
                  id="nav-login-btn"
                  onClick={handleAuthClick}
                  className="py-1.5 px-2.5 sm:px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t.login}</span>
                </button>

                <button
                  id="nav-get-started-btn"
                  onClick={handleGetStarted}
                  className="py-1.5 px-3 sm:px-3.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                  <span>{t.getStarted}</span>
                </button>
              </>
            ) : (
              /* If Authenticated & in Dashboard: Show Active Role Badge and Sign Out */
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold max-w-[130px] truncate">{currentUser.fullName}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                    {currentUser.role.replace('_', ' ')}
                  </span>
                </div>

                {/* Reset Kiosk Session (for Patient terminal mode) */}
                {currentUser.role === 'PATIENT' && (
                  <button
                    id="reset-kiosk-btn"
                    onClick={resetKioskSession}
                    className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title={t.resetKiosk}
                    aria-label={t.resetKiosk}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}

                {/* Sign Out Button */}
                <button
                  id="nav-logout-btn"
                  onClick={handleLogout}
                  className="py-1.5 px-2.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                  title={t.logout}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.logout}</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Expanded Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-3">
          {/* Active User Info or Login Prompt */}
          {isAuthenticated ? (
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.fullName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{currentUser.fullName}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{t.activeRole}: {currentUser.role}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold text-xs"
              >
                {t.logout}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAuthClick}
                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>{t.login}</span>
              </button>
              <button
                onClick={handleGetStarted}
                className="p-2.5 rounded-lg bg-emerald-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.getStarted}</span>
              </button>
            </div>
          )}

          {/* Quick Navigation Links */}
          <div className="space-y-1">
            <button
              onClick={handleOpenPublicSite}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-emerald-700" />
              <span>{t.platformInfo}</span>
            </button>

            {!isPublicSiteView && isAuthenticated && (
              <>
                {currentUser.role === 'PATIENT' && (
                  <>
                    <button
                      onClick={() => handleNavClick('kiosk_intake')}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                    >
                      {t.clinicalHistory}
                    </button>
                    <button
                      onClick={() => handleNavClick('document_ocr')}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                    >
                      {t.scanOcr}
                    </button>
                    <button
                      onClick={() => handleNavClick('clinical_summary')}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                    >
                      {t.caseSummary}
                    </button>
                    <button
                      onClick={() => handleNavClick('patient_portal')}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                    >
                      {t.healthTimeline}
                    </button>
                  </>
                )}

                {currentUser.role === 'DOCTOR' && (
                  <>
                    <button
                      onClick={() => handleNavClick('doctor_queue')}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
                    >
                      <span>{t.doctorQueue}</span>
                      {criticalTriageCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
                          {criticalTriageCount} Critical
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => handleNavClick('clinical_summary')}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                    >
                      {t.physicianReview}
                    </button>
                    <button
                      onClick={() => handleNavClick('patient_portal')}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100"
                    >
                      {t.healthTimeline}
                    </button>
                  </>
                )}

                {currentUser.role === 'LAB_TECHNICIAN' && (
                  <button
                    onClick={() => handleNavClick('lab_orders')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
                  >
                    <span>{t.labOrders}</span>
                    {statLabCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
                        {statLabCount} STAT
                      </span>
                    )}
                  </button>
                )}

                {currentUser.role === 'PHARMACIST' && (
                  <button
                    onClick={() => handleNavClick('pharmacy_dispense')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
                  >
                    <span>{t.pharmacyDispense}</span>
                    {pendingRxCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-amber-600 text-white font-bold text-[10px]">
                        {pendingRxCount} Pending
                      </span>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
