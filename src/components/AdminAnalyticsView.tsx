// Hospital Administration, OPD Intake Analytics (Recharts) & DPDP Audit Log Viewer

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';
import {
  Activity,
  ShieldCheck,
  Search,
  Download,
  Users,
  FileCheck,
  Clock,
  AlertTriangle,
  Database
} from 'lucide-react';

export const AdminAnalyticsView: React.FC = () => {
  const { auditLogs, patients, documents, triageRecords } = useApp();
  const [auditSearch, setAuditSearch] = useState<string>('');

  // Sample Aggregated Analytics Data for AIIMS / Indian Apex Hospital OPD
  const dailyVolumeData = [
    { day: 'Mon', patients: 840, completed: 812, redFlags: 42 },
    { day: 'Tue', patients: 920, completed: 890, redFlags: 51 },
    { day: 'Wed', patients: 1040, completed: 998, redFlags: 63 },
    { day: 'Thu', patients: 980, completed: 945, redFlags: 48 },
    { day: 'Fri', patients: 1120, completed: 1080, redFlags: 70 },
    { day: 'Sat', patients: 780, completed: 760, redFlags: 38 },
  ];

  const languageData = [
    { name: 'Hindi (हिन्दी)', value: 58, color: '#0d9488' },
    { name: 'English', value: 22, color: '#0284c7' },
    { name: 'Tamil (தமிழ்)', value: 8, color: '#8b5cf6' },
    { name: 'Telugu (తెలుగు)', value: 6, color: '#f59e0b' },
    { name: 'Bengali (বাংলা)', value: 4, color: '#ec4899' },
    { name: 'Marathi (मराठी)', value: 2, color: '#10b981' },
  ];

  const ocrPerformanceData = [
    { category: 'Prescription (Rx)', success: 94.2, count: 480 },
    { category: 'Lab Report', success: 97.8, count: 620 },
    { category: 'Discharge Summary', success: 95.1, count: 210 },
    { category: 'AYUSH Record', success: 91.4, count: 95 },
  ];

  const filteredLogs = auditLogs.filter(l =>
    l.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
    l.userName.toLowerCase().includes(auditSearch.toLowerCase()) ||
    l.resource.toLowerCase().includes(auditSearch.toLowerCase()) ||
    l.ipAddress.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            Role D — Hospital Administration & Informatics
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Bharat Arogya Operational Analytics & DPDP Audit</h1>
          <p className="text-xs text-slate-500">
            Hospital-wide performance metrics, OCR accuracy, intake velocity, and compliance telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(auditLogs, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `bharat_arogya_dpdp_audit_logs_${Date.now()}.json`;
              a.click();
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition-colors flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-teal-700" />
            <span>Export Audit Trail (DPDP)</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Patients Intake Today</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">1,120</p>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ 8.4% vs last week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Avg. Intake Duration</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">2 min 48s</p>
          <span className="text-[11px] text-slate-500">Target: &lt; 3 minutes</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Mean OCR Accuracy</span>
            <FileCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">95.4%</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Tesseract + Clinical NLP</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Red-Flag Detections</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-extrabold text-rose-700 mt-2">70 Cases</p>
          <span className="text-[11px] text-rose-600 font-semibold">100% escalated to P1 triage</span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Daily OPD Volume & Completion (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center">
              <Activity className="w-4 h-4 mr-1.5 text-teal-600" />
              <span>OPD Patient Intake & Completion Velocity</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">Weekly Trend</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="patients" name="Registered at Kiosk" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Clinical History Completed" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="redFlags" name="Red Flags Escalated" fill="#e11d48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Language Accessibility Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center">
              <Users className="w-4 h-4 mr-1.5 text-teal-600" />
              <span>Language Usage (Bhashini Engine)</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">% Share</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  label={({ name, percent }: any) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* DPDP Act 2023 Audit Log Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-1.5 text-teal-600" />
              <span>Digital Personal Data Protection (DPDP) Act 2023 Compliance Audit Log</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Immutable telemetry capturing consent, record views, summary confirmations, and ABHA operations.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={auditSearch}
              onChange={(e) => setAuditSearch(e.target.value)}
              placeholder="Search audit trail..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User & Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">IP / Terminal</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredLogs.slice(0, 15).map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-4 text-slate-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                  <td className="py-2.5 px-4 font-sans whitespace-nowrap">
                    <span className="font-bold text-slate-900 block">{log.userName}</span>
                    <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 whitespace-nowrap font-bold text-slate-800">
                    {log.action}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600 whitespace-nowrap">
                    {log.resource}
                  </td>
                  <td className="py-2.5 px-4 text-slate-500 whitespace-nowrap">
                    {log.ipAddress}
                  </td>
                  <td className="py-2.5 px-4 text-slate-700 font-sans max-w-xs truncate">
                    {log.details || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
