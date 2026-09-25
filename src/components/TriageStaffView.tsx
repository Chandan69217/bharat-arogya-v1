// Triage Staff Emergency Queue & Priority Management Component

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  HeartPulse,
  Activity,
  PhoneCall,
  CheckCircle2,
  Clock,
  User,
  ArrowUpRight,
  ShieldAlert,
  Send
} from 'lucide-react';
import { TriagePriority } from '../types';

export const TriageStaffView: React.FC = () => {
  const {
    triageRecords,
    patients,
    updateTriagePriority,
    setCurrentPatientId,
    logAuditAction
  } = useApp();

  const [selectedRecordId, setSelectedRecordId] = useState<string>(triageRecords[0]?.id || '');
  const [nurseNotes, setNurseNotes] = useState<string>('');

  const activeRecord = triageRecords.find(r => r.id === selectedRecordId) || triageRecords[0];
  const activePatient = patients.find(p => p.id === activeRecord?.patientId);

  const handleUpdatePriority = (newPriority: TriagePriority) => {
    if (!activeRecord) return;
    updateTriagePriority(activeRecord.id, newPriority, nurseNotes);
    setNurseNotes('');
    logAuditAction('TRIAGE_ACTION_TAKEN', 'TRIAGE_RECORD', activeRecord.id, true, `Nurse set priority to ${newPriority}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            Role C — Emergency Triage Desk
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">OPD Red-Flag & Triage Priority Desk</h1>
          <p className="text-xs text-slate-500">
            Monitors real-time emergency symptoms detected at patient self-service kiosks.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2">
            <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
            <span className="text-xs font-bold text-rose-900">
              {triageRecords.filter(r => r.priority === 'P1_CRITICAL').length} Emergency Alerts Active
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Triage List */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-800">Incoming Kiosk Triage Queue</h2>

          <div className="space-y-2">
            {triageRecords.map((rec) => {
              const patient = patients.find(p => p.id === rec.patientId);
              const isSelected = activeRecord?.id === rec.id;
              const isP1 = rec.priority === 'P1_CRITICAL';

              return (
                <button
                  key={rec.id}
                  onClick={() => {
                    setSelectedRecordId(rec.id);
                    if (patient) setCurrentPatientId(patient.id);
                  }}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex flex-col space-y-2 ${
                    isSelected
                      ? 'border-rose-600 bg-rose-50/80 shadow-xs'
                      : isP1
                      ? 'border-rose-300 bg-rose-50/40 hover:bg-rose-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                        isP1 ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                      }`}>
                        {rec.priority}
                      </span>
                      <span className="font-bold text-sm text-slate-900">{patient?.fullName}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {new Date(rec.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {rec.redFlags.length > 0 && (
                    <p className="text-xs font-semibold text-rose-800 flex items-center">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 shrink-0 text-rose-600" />
                      <span className="truncate">{rec.redFlags[0].symptom}</span>
                    </p>
                  )}

                  {rec.vitals && (
                    <div className="flex items-center space-x-3 text-[11px] text-slate-600 font-mono bg-white/70 p-1.5 rounded-lg border border-slate-200">
                      <span>BP: {rec.vitals.bpSystolic}/{rec.vitals.bpDiastolic}</span>
                      <span>HR: {rec.vitals.pulse}</span>
                      <span>SpO2: {rec.vitals.spo2}%</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Triage Detail & Action Station */}
        <div className="lg:col-span-7">
          {activeRecord && activePatient ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              {/* Patient Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold text-slate-900">{activePatient.fullName}</h3>
                    <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      Token: {activePatient.tokenNumber || 'P1-EMERGENCY'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Age: {activePatient.age} Y • Gender: {activePatient.gender} • Phone: {activePatient.phoneNumber}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-xs font-extrabold rounded-full ${
                    activeRecord.priority === 'P1_CRITICAL' ? 'bg-rose-600 text-white animate-pulse' : 'bg-amber-500 text-white'
                  }`}>
                    {activeRecord.priority}
                  </span>
                </div>
              </div>

              {/* Red Flags Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center">
                  <ShieldAlert className="w-4 h-4 mr-1.5 text-rose-600" />
                  <span>Detected Emergency Symptoms:</span>
                </h4>

                {activeRecord.redFlags.map((rf) => (
                  <div key={rf.id} className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs space-y-2">
                    <p className="font-bold text-sm text-rose-950">{rf.symptom}</p>
                    <p className="text-slate-700 leading-relaxed">{rf.reason}</p>
                    <div className="bg-white p-2.5 rounded-lg border border-rose-200 font-semibold text-rose-900">
                      Standard Action: {rf.actionRequired}
                    </div>
                  </div>
                ))}
              </div>

              {/* Vitals Recording Station */}
              {activeRecord.vitals && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Bedside Triage Vitals:
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    <div className="p-2.5 bg-slate-50 border rounded-xl text-center">
                      <p className="text-[10px] text-slate-500 font-semibold">BP (mmHg)</p>
                      <p className="text-sm font-bold text-slate-900 font-mono">{activeRecord.vitals.bpSystolic}/{activeRecord.vitals.bpDiastolic}</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 border rounded-xl text-center">
                      <p className="text-[10px] text-slate-500 font-semibold">Pulse (bpm)</p>
                      <p className="text-sm font-bold text-slate-900 font-mono">{activeRecord.vitals.pulse}</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 border rounded-xl text-center">
                      <p className="text-[10px] text-slate-500 font-semibold">SpO2 (%)</p>
                      <p className="text-sm font-bold text-slate-900 font-mono">{activeRecord.vitals.spo2}%</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 border rounded-xl text-center">
                      <p className="text-[10px] text-slate-500 font-semibold">Temp (°F)</p>
                      <p className="text-sm font-bold text-slate-900 font-mono">{activeRecord.vitals.temperature}</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 border rounded-xl text-center">
                      <p className="text-[10px] text-slate-500 font-semibold">Resp Rate</p>
                      <p className="text-sm font-bold text-slate-900 font-mono">{activeRecord.vitals.respiratoryRate}</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 border rounded-xl text-center">
                      <p className="text-[10px] text-slate-500 font-semibold">Status</p>
                      <p className="text-xs font-bold text-emerald-700">{activeRecord.status}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Triage Nurse Action & Notes */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700">
                  Nursing Triage Observations / Handover Notes:
                </label>
                <textarea
                  value={nurseNotes}
                  onChange={(e) => setNurseNotes(e.target.value)}
                  placeholder="Enter notes (e.g., patient transferred to ECG room via wheelchair, oxygen mask 4L applied, Dr. Sharma informed)..."
                  rows={2}
                  className="w-full p-3 border border-slate-300 rounded-xl text-xs outline-none focus:border-teal-500"
                />

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => handleUpdatePriority('P1_CRITICAL')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Escalate to P1 (Code Red)</span>
                  </button>

                  <button
                    onClick={() => handleUpdatePriority('P2_URGENT')}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    <span>Route to Urgent Bay (P2)</span>
                  </button>

                  <button
                    onClick={() => handleUpdatePriority('P3_ROUTINE')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl border border-slate-300 transition-colors"
                  >
                    <span>Normal OPD Queue (P3)</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border">
              Select a triage record from the left queue.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
