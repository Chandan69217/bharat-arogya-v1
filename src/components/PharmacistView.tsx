import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PrescriptionOrder, LanguageCode } from '../types';
import {
  Pill,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Printer,
  Search,
  Languages,
  ArrowRight,
  PackageCheck,
  Building2,
  Calendar,
  AlertCircle,
  FileText,
  BadgeAlert
} from 'lucide-react';

export const PharmacistView: React.FC = () => {
  const { prescriptions, dispensePrescription, currentUser } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [activePrescriptionId, setActivePrescriptionId] = useState<string | null>(prescriptions[0]?.id || null);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('hi');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Filter prescriptions
  const filteredRx = prescriptions.filter((rx) => {
    const matchesSearch =
      rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.prescriptionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'PENDING') return rx.status === 'PENDING';
    if (filterStatus === 'DISPENSED') return rx.status === 'DISPENSED';
    return true;
  });

  const activeRx = prescriptions.find((rx) => rx.id === activePrescriptionId) || filteredRx[0] || prescriptions[0];

  const handleDispenseAll = (rx: PrescriptionOrder) => {
    const medIds = rx.medicines.map((m) => m.id);
    const batchNum = `BT-DEL-${Math.floor(1000 + Math.random() * 9000)}`;
    dispensePrescription(rx.id, medIds, batchNum);
    setNotificationMsg(`Prescription #${rx.prescriptionNumber} for ${rx.patientName} successfully dispensed and marked in hospital inventory.`);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  return (
    <div id="pharmacist-view" className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 py-4">
      {/* Top Pharmacy Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-emerald-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-amber-800/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Hospital OPD Dispensary
                </span>
                <span className="text-xs text-slate-300">ABDM e-Prescription & Pharmacy Gateway</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                Central OPD Dispensary (Counter 3)
              </h1>
              <p className="text-xs sm:text-sm text-amber-100/80">
                Logged in: {currentUser.fullName} • Reg License: PHARM-DEL-4921
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-3 text-xs">
            <div className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-center">
              <div className="text-lg font-black text-white">{prescriptions.length}</div>
              <div className="text-[11px] text-slate-300">e-Prescriptions</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-center">
              <div className="text-lg font-black text-amber-300">
                {prescriptions.filter((p) => p.status === 'PENDING').length}
              </div>
              <div className="text-[11px] text-amber-200 font-semibold">Pending Dispense</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-center">
              <div className="text-lg font-black text-emerald-300">
                {prescriptions.filter((p) => p.status === 'DISPENSED').length}
              </div>
              <div className="text-[11px] text-emerald-200">Dispensed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notificationMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">{notificationMsg}</span>
        </div>
      )}

      {/* Main Grid: Prescriptions Queue & Dispense Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: e-Rx Queue */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2.5">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by patient, token, Rx#..."
                className="w-full px-3 py-2 pl-9 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex gap-1 overflow-x-auto text-[11px] font-semibold pb-1">
              {['ALL', 'PENDING', 'DISPENSED'].map((filterKey) => (
                <button
                  key={filterKey}
                  type="button"
                  onClick={() => setFilterStatus(filterKey)}
                  className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    filterStatus === filterKey
                      ? 'bg-amber-700 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filterKey}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredRx.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
                No prescriptions match your filter criteria.
              </div>
            ) : (
              filteredRx.map((rx) => {
                const isSelected = activeRx?.id === rx.id;
                return (
                  <div
                    key={rx.id}
                    onClick={() => setActivePrescriptionId(rx.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/70 border-amber-500 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                            #{rx.tokenNumber}
                          </span>
                          <span className="font-bold text-sm text-slate-900">{rx.patientName}</span>
                          <span className="text-xs text-slate-500">
                            ({rx.patientAge}y • {rx.patientGender})
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{rx.doctorName} • {rx.department}</span>
                        </div>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rx.status === 'DISPENSED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rx.status}
                      </span>
                    </div>

                    <div className="mt-3 text-xs text-slate-700 line-clamp-1">
                      <span className="font-semibold text-slate-500">Rx: </span>
                      {rx.medicines.map((m) => m.medicineName).join(', ')}
                    </div>

                    {rx.safetyAlerts.length > 0 && (
                      <div className="mt-2 text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-1 rounded border border-rose-200 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        <span>Drug Interaction Flagged: {rx.safetyAlerts[0].clinicalEffect.slice(0, 45)}...</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Prescription Details & Dispensing */}
        <div className="lg:col-span-7">
          {activeRx ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                      Token #{activeRx.tokenNumber}
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-900">{activeRx.patientName}</h2>
                    <span className="text-xs text-slate-500">
                      ({activeRx.patientAge} Years • {activeRx.patientGender})
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Rx ID: <span className="font-mono font-bold text-slate-800">{activeRx.prescriptionNumber}</span>
                  </div>
                  <div className="text-xs text-slate-700 mt-0.5">
                    Diagnosis: <strong>{activeRx.diagnosis}</strong>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="text-slate-500">Prescribing Physician</div>
                  <div className="font-bold text-slate-900">{activeRx.doctorName}</div>
                  <div className="text-[11px] text-slate-500">{activeRx.department}</div>
                </div>
              </div>

              {/* Patient Allergies Banner */}
              {activeRx.patientAllergies.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <BadgeAlert className="w-4 h-4 text-amber-700 shrink-0" />
                  <div>
                    <span className="font-bold">Recorded Patient Allergies: </span>
                    <span>{activeRx.patientAllergies.join(', ')}</span>
                  </div>
                </div>
              )}

              {/* Drug-Drug Interaction Warning Box */}
              {activeRx.safetyAlerts.length > 0 && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-rose-800">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Clinical Drug-Drug Safety Audit:</span>
                  </div>
                  {activeRx.safetyAlerts.map((alert) => (
                    <div key={alert.id} className="text-[11px] text-rose-900 pl-5">
                      • <strong>{alert.drug1} + {alert.drug2}:</strong> {alert.clinicalEffect} ({alert.recommendation})
                    </div>
                  ))}
                </div>
              )}

              {/* Multilingual Patient Instructions Language Picker */}
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                  <Languages className="w-4 h-4 text-emerald-700" />
                  <span>Dosage Label Language for Patient:</span>
                </div>

                <div className="flex gap-1 text-[11px]">
                  {[
                    { code: 'hi', label: 'हिंदी' },
                    { code: 'en', label: 'English' },
                    { code: 'ta', label: 'தமிழ்' },
                    { code: 'te', label: 'తెలుగు' },
                    { code: 'bn', label: 'বাংলা' },
                    { code: 'mr', label: 'मराठी' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setSelectedLanguage(lang.code as LanguageCode)}
                      className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                        selectedLanguage === lang.code
                          ? 'bg-emerald-700 text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prescribed Medicines List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Prescribed Medications ({activeRx.medicines.length})
                </h3>

                {activeRx.medicines.map((med) => {
                  const localInstruction = med.instructionsLocal?.[selectedLanguage] || med.instructions;
                  return (
                    <div
                      key={med.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-extrabold text-sm text-slate-900">{med.medicineName}</div>
                          <div className="text-xs text-slate-500 font-mono">
                            Generic: {med.genericName} • Dosage: {med.dosage}
                          </div>
                        </div>

                        <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          Stock: {med.stockAvailable} Tabs
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700">
                        <span className="font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                          {med.frequency}
                        </span>
                        <span className="text-slate-500">Duration: {med.duration}</span>
                      </div>

                      {/* Local language label display */}
                      <div className="p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 font-medium">
                        <span className="text-[10px] text-slate-500 uppercase font-bold mr-1">Instructions:</span>
                        {localInstruction}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dispense Actions Footer */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  {activeRx.status === 'DISPENSED' ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Dispensed by {activeRx.dispensedBy || currentUser.fullName}
                    </span>
                  ) : (
                    <span>Dispensary Counter 3 • Awaiting Dispensation</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-2.5 px-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Label</span>
                  </button>

                  {activeRx.status !== 'DISPENSED' && (
                    <button
                      id="dispense-prescription-btn"
                      type="button"
                      onClick={() => handleDispenseAll(activeRx)}
                      className="py-2.5 px-5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <PackageCheck className="w-4 h-4" />
                      <span>Dispense & Record Stock</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
              Select an electronic prescription from the queue.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
