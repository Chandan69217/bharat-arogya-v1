import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DiagnosticLabOrder, LabOrderPriority, LabOrderStatus } from '../types';
import {
  FlaskConical,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Barcode,
  Search,
  Filter,
  ArrowRight,
  Printer,
  ChevronDown,
  Building2,
  Send,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const LabTechnicianView: React.FC = () => {
  const { labOrders, updateLabOrder, submitLabResults, currentUser } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [activeOrderId, setActiveOrderId] = useState<string | null>(labOrders[0]?.id || null);

  // Form state for entering results on the active order
  const [testResultsInput, setTestResultsInput] = useState<Record<string, { value: string; flag: 'NORMAL' | 'HIGH' | 'LOW' | 'CRITICAL'; notes: string }>>({
    'High-Sensitivity Troponin-I (hs-cTnI)': { value: '1.8', flag: 'CRITICAL', notes: 'Positive acute myocardial injury biomarker' },
    'Serum Creatinine & eGFR': { value: '1.8', flag: 'HIGH', notes: 'Renal impairment; elevated from baseline' },
    'Serum Electrolytes (Na+, K+, Cl-)': { value: 'K+: 5.6', flag: 'HIGH', notes: 'Hyperkalemia warning' }
  });

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Filter orders
  const filteredOrders = labOrders.filter((order) => {
    const matchesSearch =
      order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.doctorName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterPriority === 'ALL') return true;
    if (filterPriority === 'STAT_URGENT') return order.priority === 'STAT_URGENT';
    if (filterPriority === 'PENDING') return order.status === 'ORDERED' || order.status === 'SAMPLE_COLLECTED';
    if (filterPriority === 'COMPLETED') return order.status === 'COMPLETED';
    return true;
  });

  const activeOrder = labOrders.find((o) => o.id === activeOrderId) || filteredOrders[0] || labOrders[0];

  // Mark Sample Collected
  const handleCollectSample = (order: DiagnosticLabOrder) => {
    const generatedBarcode = `BC-PATH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    updateLabOrder(order.id, {
      status: 'SAMPLE_COLLECTED',
      specimenBarcode: generatedBarcode,
      collectedAt: new Date().toISOString(),
      technicianName: currentUser.fullName
    });
    setNotificationMsg(`Specimen collected for ${order.patientName}. Tube barcode generated: ${generatedBarcode}`);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  // Submit Completed Results
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder) return;

    const payload = activeOrder.tests.map((test) => {
      const input = testResultsInput[test.testName] || {
        value: test.resultValue || 'Normal',
        flag: test.flag || 'NORMAL',
        notes: test.interpretation || 'Within normal parameters'
      };
      return {
        testName: test.testName,
        resultValue: input.value,
        flag: input.flag,
        interpretation: input.notes
      };
    });

    submitLabResults(activeOrder.id, payload);
    setNotificationMsg(`Diagnostic report verified and synced to attending physician queue for Token #${activeOrder.tokenNumber}.`);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  return (
    <div id="lab-technician-view" className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 py-4">
      {/* Top Staff Banner */}
      <div className="bg-gradient-to-r from-cyan-900 via-slate-900 to-teal-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-cyan-800/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  Diagnostic Laboratory Portal
                </span>
                <span className="text-xs text-slate-300">NABL & ABDM Certified Lab</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                Central Pathology & Biochemistry Laboratory
              </h1>
              <p className="text-xs sm:text-sm text-cyan-100/80">
                Logged in: {currentUser.fullName} • Staff ID: TECH-PATH-8821
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-xs">
            <div className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-center">
              <div className="text-lg font-black text-white">{labOrders.length}</div>
              <div className="text-[11px] text-slate-300">Total Orders</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-rose-500/20 border border-rose-400/30 text-center">
              <div className="text-lg font-black text-rose-300">
                {labOrders.filter((o) => o.priority === 'STAT_URGENT').length}
              </div>
              <div className="text-[11px] text-rose-200 font-semibold">STAT Urgent</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-center">
              <div className="text-lg font-black text-emerald-300">
                {labOrders.filter((o) => o.status === 'COMPLETED').length}
              </div>
              <div className="text-[11px] text-emerald-200">Completed</div>
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

      {/* Main Grid: Orders List & Detailed Result Entry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Orders Queue */}
        <div className="lg:col-span-5 space-y-3">
          {/* Search & Filter Header */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2.5">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient, token, doctor..."
                className="w-full px-3 py-2 pl-9 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex gap-1 overflow-x-auto text-[11px] font-semibold pb-1">
              {['ALL', 'STAT_URGENT', 'PENDING', 'COMPLETED'].map((filterKey) => (
                <button
                  key={filterKey}
                  type="button"
                  onClick={() => setFilterPriority(filterKey)}
                  className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    filterPriority === filterKey
                      ? 'bg-cyan-700 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filterKey.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-2.5">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
                No diagnostic orders match your search criteria.
              </div>
            ) : (
              filteredOrders.map((order) => {
                const isSelected = activeOrder?.id === order.id;
                return (
                  <div
                    key={order.id}
                    onClick={() => setActiveOrderId(order.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-50/70 border-cyan-500 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                            #{order.tokenNumber}
                          </span>
                          <span className="font-bold text-sm text-slate-900">{order.patientName}</span>
                          <span className="text-xs text-slate-500">
                            ({order.patientAge}y • {order.patientGender})
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{order.doctorName} • {order.department}</span>
                        </div>
                      </div>

                      {order.priority === 'STAT_URGENT' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                          STAT URGENT
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-100 text-slate-700">
                          ROUTINE
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <div className="text-slate-600 font-medium">
                        {order.tests.length} Tests Ordered: <span className="text-slate-900">{order.tests.map(t => t.testName.split(' ')[0]).join(', ')}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          order.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'SAMPLE_COLLECTED'
                            ? 'bg-cyan-100 text-cyan-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Order Details & Results Input */}
        <div className="lg:col-span-7">
          {activeOrder ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
              {/* Active Order Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-black px-2.5 py-1 rounded bg-slate-900 text-white">
                      Token #{activeOrder.tokenNumber}
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-900">{activeOrder.patientName}</h2>
                    <span className="text-xs text-slate-500">
                      ({activeOrder.patientAge} Years • {activeOrder.patientGender})
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Clinical Indication: <strong className="text-slate-900">{activeOrder.clinicalIndication}</strong>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="text-slate-500">Ordered by</div>
                  <div className="font-bold text-slate-900">{activeOrder.doctorName}</div>
                  <div className="text-[11px] text-slate-500">{activeOrder.department}</div>
                </div>
              </div>

              {/* Specimen Collection Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center">
                    <Barcode className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-700">Specimen Barcode & Tube Status</div>
                    <div className="text-xs text-slate-600">
                      {activeOrder.specimenBarcode ? (
                        <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {activeOrder.specimenBarcode}
                        </span>
                      ) : (
                        <span className="text-amber-700 font-semibold">Specimen not yet collected</span>
                      )}
                      {activeOrder.collectedAt && (
                        <span className="text-[11px] text-slate-500 ml-2">
                          (Collected at {new Date(activeOrder.collectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {activeOrder.status === 'ORDERED' && (
                  <button
                    type="button"
                    onClick={() => handleCollectSample(activeOrder)}
                    className="py-2 px-3.5 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Barcode className="w-4 h-4" />
                    <span>Collect Specimen & Barcode</span>
                  </button>
                )}
              </div>

              {/* Test Results Entry Form */}
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Ordered Diagnostic Tests ({activeOrder.tests.length})
                  </h3>
                  <span className="text-xs text-slate-500">Enter observed values & flag abnormal findings</span>
                </div>

                <div className="space-y-3">
                  {activeOrder.tests.map((test, idx) => {
                    const currentInput = testResultsInput[test.testName] || {
                      value: test.resultValue || '',
                      flag: test.flag || 'NORMAL',
                      notes: test.interpretation || ''
                    };

                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold text-xs text-slate-900">{test.testName}</div>
                            <div className="text-[11px] text-slate-500">
                              Specimen: <span className="font-semibold text-slate-700">{test.sampleType}</span> • Ref: {test.referenceRange}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-slate-500">Flag:</span>
                            <select
                              value={currentInput.flag}
                              onChange={(e) => {
                                const newFlag = e.target.value as 'NORMAL' | 'HIGH' | 'LOW' | 'CRITICAL';
                                setTestResultsInput(prev => ({
                                  ...prev,
                                  [test.testName]: { ...currentInput, flag: newFlag }
                                }));
                              }}
                              className={`text-xs font-bold py-1 px-2 rounded-md border ${
                                currentInput.flag === 'CRITICAL'
                                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                                  : currentInput.flag === 'HIGH' || currentInput.flag === 'LOW'
                                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              }`}
                            >
                              <option value="NORMAL">NORMAL</option>
                              <option value="HIGH">HIGH</option>
                              <option value="LOW">LOW</option>
                              <option value="CRITICAL">CRITICAL</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <input
                              type="text"
                              value={currentInput.value}
                              onChange={(e) => {
                                const val = e.target.value;
                                setTestResultsInput(prev => ({
                                  ...prev,
                                  [test.testName]: { ...currentInput, value: val }
                                }));
                              }}
                              placeholder={`Observed value (${test.unit || ''})`}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold text-slate-900 bg-white"
                              required
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={currentInput.notes}
                              onChange={(e) => {
                                const notes = e.target.value;
                                setTestResultsInput(prev => ({
                                  ...prev,
                                  [test.testName]: { ...currentInput, notes }
                                }));
                              }}
                              placeholder="Clinical interpretation notes"
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
                            />
                          </div>
                        </div>

                        {currentInput.flag === 'CRITICAL' && (
                          <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-[11px] flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>
                              <strong>Critical Threshold Warning:</strong> Submitting will trigger an urgent red-flag alert in the physician's emergency queue.
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
                  <div className="text-xs text-slate-500">
                    Signing Technologist: <strong className="text-slate-800">{currentUser.fullName}</strong>
                  </div>

                  <button
                    id="submit-lab-report-btn"
                    type="submit"
                    className="py-2.5 px-5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Verified Report to Doctor</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
              Select a diagnostic order from the queue to enter results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
