// Physician OPD Consultation Dashboard & Patient Queue

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClinicalSummaryViewer } from './ClinicalSummaryViewer';
import {
  Users,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Clock,
  Activity,
  HeartPulse,
  Pill,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { TriagePriority } from '../types';

export const DoctorDashboardView: React.FC = () => {
  const {
    patients,
    currentPatient,
    setCurrentPatientId,
    triageRecords,
    summaries,
    patientIntakes,
    documents,
    currentUser
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  const awaitingSummaryCount = patients.filter(p => !summaries[p.id] && patientIntakes[p.id]).length;

  // Filtered patient queue
  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tokenNumber && p.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.abhaProfile?.abhaId && p.abhaProfile.abhaId.includes(searchQuery));

    const matchesDept = departmentFilter === 'ALL' || (p.assignedDepartment && p.assignedDepartment.includes(departmentFilter));

    const triage = triageRecords.find(t => t.patientId === p.id);
    const matchesPriority = priorityFilter === 'ALL' || (triage && triage.priority === priorityFilter);

    return matchesSearch && matchesDept && matchesPriority;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top OPD Status Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              AIIMS OPD Clinic Room 14 — Active Session
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Attending: <span className="font-bold text-slate-800">{currentUser.fullName}</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Physician Clinical Intake Dashboard</h1>
          <p className="text-xs text-slate-500">
            Real-time patient triage queue with automated clinical summaries and red-flag prioritization.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap items-center gap-3 text-center">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
            <p className="text-xs font-semibold text-slate-500">Queue Total</p>
            <p className="text-xl font-bold text-slate-900">{patients.length}</p>
          </div>
          <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2">
            <p className="text-xs font-semibold text-teal-700">Awaiting Summary</p>
            <p className="text-xl font-bold text-teal-800">{awaitingSummaryCount}</p>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-2">
            <p className="text-xs font-semibold text-rose-600">P1 Critical</p>
            <p className="text-xl font-bold text-rose-700">
              {triageRecords.filter(t => t.priority === 'P1_CRITICAL').length}
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
            <p className="text-xs font-semibold text-emerald-600">Reviewed</p>
            <p className="text-xl font-bold text-emerald-700">
              {Object.values(summaries).filter(s => s.physicianReview?.reviewed).length}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Queue (4 cols) & Right Detail Case View (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Patient Queue */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center">
                <Users className="w-4 h-4 mr-1.5 text-teal-600" />
                <span>Today's Patient Queue</span>
              </h2>
              <span className="text-xs font-mono text-slate-500">
                {filteredPatients.length} Active
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search token, name, ABHA..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-teal-500"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-1/2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
              >
                <option value="ALL">All Depts</option>
                <option value="Cardiology">Cardiology</option>
                <option value="General Medicine">Gen Medicine</option>
                <option value="Ayush">AYUSH Clinic</option>
                <option value="Endocrinology">Endocrine</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-1/2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
              >
                <option value="ALL">All Priority</option>
                <option value="P1_CRITICAL">P1 Critical</option>
                <option value="P2_URGENT">P2 Urgent</option>
                <option value="P3_ROUTINE">P3 Routine</option>
              </select>
            </div>

            {/* Patients List */}
            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {filteredPatients.map((patient) => {
                const triage = triageRecords.find(t => t.patientId === patient.id);
                const summary = summaries[patient.id];
                const intake = patientIntakes[patient.id];
                const isSelected = currentPatient.id === patient.id;
                const isCritical = triage?.priority === 'P1_CRITICAL';
                const isReviewed = summary?.physicianReview?.reviewed;
                const needsSummary = !summary && Boolean(intake);

                return (
                  <button
                    key={patient.id}
                    onClick={() => setCurrentPatientId(patient.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/90 shadow-sm'
                        : isCritical
                        ? 'border-rose-300 bg-rose-50/50 hover:bg-rose-50'
                        : needsSummary
                        ? 'border-teal-200 bg-teal-50/30 hover:bg-teal-50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCritical
                          ? 'bg-rose-600 text-white animate-pulse'
                          : isReviewed
                          ? 'bg-emerald-100 text-emerald-800'
                          : needsSummary
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {patient.tokenNumber ? patient.tokenNumber.split('-')[1] || patient.tokenNumber.substring(0, 3) : 'OPD'}
                      </div>

                      <div className="truncate">
                        <div className="flex items-center space-x-1.5 truncate">
                          <p className="text-xs font-bold text-slate-900 truncate">{patient.fullName}</p>
                          {isReviewed && (
                            <span className="text-[10px] text-emerald-700 font-bold">✓</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">
                          {patient.age}Y • {patient.gender} • {patient.assignedDepartment?.split(' ')[0] || 'OPD'}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right space-y-0.5">
                      {isCritical && (
                        <span className="inline-block px-2 py-0.5 bg-rose-600 text-white font-extrabold text-[10px] rounded-full uppercase">
                          P1 Alert
                        </span>
                      )}
                      <div>
                        {needsSummary ? (
                          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                            <Sparkles className="w-2.5 h-2.5 mr-1 text-teal-600" />
                            Summarize
                          </span>
                        ) : (
                          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            isReviewed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {isReviewed ? 'Signed' : 'Draft'}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Active Patient Case Detail */}
        <div className="lg:col-span-8">
          <ClinicalSummaryViewer />
        </div>
      </div>
    </div>
  );
};
