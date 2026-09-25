import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles,
  Mic,
  MicOff,
  PenTool,
  Search,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Activity,
  Stethoscope,
  ChevronRight,
  RotateCcw,
  Clock,
  HeartPulse,
  Tag
} from 'lucide-react';
import {
  LanguageCode,
  WrittenSymptomRecord,
  RedFlag
} from '../types';
import {
  COMMON_SYMPTOM_CATALOG,
  SymptomCatalogItem,
  parseWrittenSymptoms,
  detectRedFlags
} from '../services/clinicalKnowledge';

interface DynamicSymptomInputProps {
  currentLanguage: LanguageCode;
  initialWrittenText?: string;
  initialSelectedTags?: string[];
  onComplete: (symptomData: {
    writtenRecord: WrittenSymptomRecord;
    selectedCatalogIds: string[];
    detectedRedFlags: RedFlag[];
  }) => void;
  onCancel?: () => void;
}

export const DynamicSymptomInput: React.FC<DynamicSymptomInputProps> = ({
  currentLanguage,
  initialWrittenText = '',
  initialSelectedTags = [],
  onComplete,
  onCancel
}) => {
  const [writtenText, setWrittenText] = useState(initialWrittenText);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(initialSelectedTags);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [duration, setDuration] = useState<string>('FEW_DAYS');
  const [severityScore, setSeverityScore] = useState<number>(6);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  // Setup Web Speech API for voice mode transcription
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      const langMap: Record<LanguageCode, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        bn: 'bn-IN',
        mr: 'mr-IN'
      };
      recognition.lang = langMap[currentLanguage] || 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setWrittenText(prev => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition notice:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission not granted. You can type freely.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [currentLanguage]);

  const toggleVoiceMode = () => {
    if (!recognitionRef.current) {
      setSpeechError('Voice dictation is not supported in this browser. Please type symptoms.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    } else {
      setSpeechError(null);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    }
  };

  // Real-time clinical symptom parser
  const parsedAnalysis = useMemo(() => {
    return parseWrittenSymptoms(writtenText, currentLanguage);
  }, [writtenText, currentLanguage]);

  // Merge explicitly chosen tags with parsed keywords
  const activeSymptomTags = useMemo(() => {
    const tags = new Set<string>();
    selectedTagIds.forEach(id => {
      const item = COMMON_SYMPTOM_CATALOG.find(c => c.id === id);
      if (item) tags.add(item.label[currentLanguage] || item.label.en);
    });
    parsedAnalysis.matchedSymptoms.forEach(item => {
      tags.add(item.label[currentLanguage] || item.label.en);
    });
    return Array.from(tags);
  }, [selectedTagIds, parsedAnalysis.matchedSymptoms, currentLanguage]);

  // Compute live red flags from written input and selected tags
  const liveRedFlags = useMemo(() => {
    return detectRedFlags({
      freeText: `${writtenText} ${activeSymptomTags.join(' ')}`,
      selectedAnswers: { selectedTags: selectedTagIds }
    });
  }, [writtenText, activeSymptomTags, selectedTagIds]);

  // Filter symptom catalog chips
  const filteredCatalog = useMemo(() => {
    return COMMON_SYMPTOM_CATALOG.filter(item => {
      const matchCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const localizedLabel = (item.label[currentLanguage] || item.label.en).toLowerCase();
      const engLabel = item.label.en.toLowerCase();
      const keywordMatch = item.keywords.some(kw => kw.toLowerCase().includes(q));

      return localizedLabel.includes(q) || engLabel.includes(q) || keywordMatch;
    });
  }, [selectedCategory, searchQuery, currentLanguage]);

  const toggleSymptomTag = (id: string) => {
    setSelectedTagIds(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleApplyPresetExample = (exampleText: string, catalogId?: string) => {
    setWrittenText(exampleText);
    if (catalogId && !selectedTagIds.includes(catalogId)) {
      setSelectedTagIds(prev => [...prev, catalogId]);
    }
  };

  const handleSubmit = () => {
    const severityLevel: 'MILD' | 'MODERATE' | 'SEVERE' =
      severityScore >= 8 ? 'SEVERE' : severityScore >= 5 ? 'MODERATE' : 'MILD';

    const writtenRecord: WrittenSymptomRecord = {
      rawText: writtenText.trim(),
      symptomTags: activeSymptomTags,
      duration,
      severityScore,
      severityLevel,
      enteredVia: isListening ? 'VOICE' : writtenText.trim() ? 'TYPED' : 'SUGGESTION_CHIPS',
      detectedRedFlags: liveRedFlags.map(rf => rf.symptom)
    };

    onComplete({
      writtenRecord,
      selectedCatalogIds: selectedTagIds,
      detectedRedFlags: liveRedFlags
    });
  };

  const categories = [
    { id: 'ALL', label: 'All Symptoms' },
    { id: 'CARDIAC', label: 'Chest & Heart' },
    { id: 'RESPIRATORY', label: 'Cough & Breath' },
    { id: 'GASTRO', label: 'Stomach & Digestion' },
    { id: 'NEURO', label: 'Head & Brain' },
    { id: 'INFECTIOUS', label: 'Fever & Infection' },
    { id: 'MUSCULOSKELETAL', label: 'Joints & Back' },
    { id: 'AYUSH', label: 'AYUSH / Wellness' }
  ];

  const durationOptions = [
    { id: 'ACUTE_24H', label: '< 24 Hours (Today)' },
    { id: 'FEW_DAYS', label: '2 to 7 Days' },
    { id: 'SUBACUTE_WEEKS', label: '1 to 3 Weeks' },
    { id: 'CHRONIC_MONTHS', label: '> 1 Month (Chronic)' }
  ];

  const localizedPlaceholder: Record<LanguageCode, string> = {
    en: 'Write your symptoms here in your own words (e.g. "Severe burning pain in stomach since yesterday, feeling like vomiting after food, mild fever..."). You can also click the microphone to speak.',
    hi: 'अपनी परेशानी या लक्षण यहाँ अपने शब्दों में लिखें (जैसे: "कल शाम से पेट में तेज दर्द और जलन है, खाना खाने के बाद उल्टी जैसा लगता है...)। आप बोलकर भी लिखवा सकते हैं।',
    ta: 'உங்கள் உடல்நலப் பிரச்சனையை உங்கள் சொந்த வார்த்தைகளில் இங்கே எழுதவும் அல்லது பேசவும்...',
    te: 'మీ లక్షణాలను ఇక్కడ మీ స్వంత మాటలలో రాయండి లేదా మాట్లాడండి...',
    bn: 'আপনার সমস্যা নিজের ভাষায় এখানে লিখুন বা কথা বলুন...',
    mr: 'तुमची लक्षणे येथे स्वतःच्या शब्दांत लिहा किंवा बोलून सांगा...'
  };

  const hasContent = writtenText.trim().length > 0 || selectedTagIds.length > 0;

  return (
    <div id="dynamic-symptom-input-container" className="space-y-6 max-w-4xl mx-auto">
      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-xl mt-0.5">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Dynamic Case Taking & Symptom Writing</span>
              <span className="text-xs px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-medium rounded-full">
                Bharat Arogya Clinical Intake
              </span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              Describe how you are feeling in your own words or select from the symptom tags below.
              Bharat Arogya will dynamically personalize the follow-up medical questionnaire based on your exact symptoms.
            </p>
          </div>
        </div>

        <button
          id="btn-voice-dictate-toggle"
          type="button"
          onClick={toggleVoiceMode}
          className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm ${
            isListening
              ? 'bg-rose-600 text-white animate-pulse shadow-rose-500/25'
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4 text-white" />
              <span>Listening... Click to Stop</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Speak Symptoms (Voice Mode)</span>
            </>
          )}
        </button>
      </div>

      {speechError && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs sm:text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{speechError}</span>
        </div>
      )}

      {/* Free Text Writing Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="patient-written-symptoms"
            className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Describe Symptoms in Detail:</span>
          </label>

          {writtenText && (
            <button
              type="button"
              onClick={() => setWrittenText('')}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear text</span>
            </button>
          )}
        </div>

        <div className="relative">
          <textarea
            id="patient-written-symptoms"
            rows={4}
            value={writtenText}
            onChange={e => setWrittenText(e.target.value)}
            placeholder={localizedPlaceholder[currentLanguage] || localizedPlaceholder.en}
            className="w-full p-4 rounded-xl text-base text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-y"
          />

          {isListening && (
            <div className="absolute right-3 bottom-3 flex items-center gap-2 px-2.5 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>Recording microphone input</span>
            </div>
          )}
        </div>

        {/* Quick Example Symptom Prompts */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
          <span className="font-medium text-slate-600 dark:text-slate-400">Quick examples:</span>
          <button
            type="button"
            onClick={() =>
              handleApplyPresetExample(
                'Severe chest heaviness and sweating after climbing stairs',
                'sym_chest_pain'
              )
            }
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 text-slate-700 dark:text-slate-300 transition-colors"
          >
            "Chest heaviness & sweating"
          </button>
          <button
            type="button"
            onClick={() =>
              handleApplyPresetExample(
                'High fever with shivering and body aches for 3 days',
                'sym_fever'
              )
            }
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 text-slate-700 dark:text-slate-300 transition-colors"
          >
            "High fever & chills"
          </button>
          <button
            type="button"
            onClick={() =>
              handleApplyPresetExample(
                'Severe stomach cramps and vomiting after oily dinner',
                'sym_abdominal_pain'
              )
            }
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 text-slate-700 dark:text-slate-300 transition-colors"
          >
            "Stomach cramps & vomiting"
          </button>
          <button
            type="button"
            onClick={() =>
              handleApplyPresetExample(
                'Knee joint pain and severe morning stiffness',
                'sym_joint_pain'
              )
            }
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 text-slate-700 dark:text-slate-300 transition-colors"
          >
            "Knee joint pain & morning stiffness"
          </button>
        </div>

        {/* Live Clinical Tag Extraction Preview */}
        {activeSymptomTags.length > 0 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Detected Clinical Symptoms ({activeSymptomTags.length}):</span>
            </span>
            {activeSymptomTags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/80"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Real-time Red Flag Alert Banner */}
        {liveRedFlags.length > 0 && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200 font-semibold text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <span>Clinical Safety Alert: Urgent Symptoms Detected</span>
            </div>
            <p className="text-xs text-rose-700 dark:text-rose-300">
              The symptoms you entered match clinical high-risk priority criteria. Bharat Arogya will notify the triage and emergency team immediately upon submission.
            </p>
            <ul className="text-xs text-rose-800 dark:text-rose-200 list-disc list-inside space-y-1">
              {liveRedFlags.map(rf => (
                <li key={rf.id} className="font-medium">
                  {rf.symptom} — <span className="font-normal">{rf.actionRequired}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Attribute Fine-tuning: Duration & Severity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Duration selector */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>How long have you had these symptoms?</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {durationOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDuration(opt.id)}
                className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left border ${
                  duration === opt.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Severity Scale */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Pain / Severity Rating:</span>
            </label>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                severityScore >= 8
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-200'
                  : severityScore >= 5
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-200'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200'
              }`}
            >
              {severityScore} / 10 —{' '}
              {severityScore >= 8 ? 'Severe' : severityScore >= 5 ? 'Moderate' : 'Mild'}
            </span>
          </div>

          <input
            id="symptom-severity-slider"
            type="range"
            min={1}
            max={10}
            value={severityScore}
            onChange={e => setSeverityScore(Number(e.target.value))}
            className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>1 (Very Mild)</span>
            <span>5 (Moderate Discomfort)</span>
            <span>10 (Severe / Unbearable)</span>
          </div>
        </div>
      </div>

      {/* Multilingual Symptom Tag Catalog Picker */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Or Select from Common Symptoms (Touch or Click to Add):</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select one or multiple symptoms. The intake questionnaire will dynamically reorder questions.
            </p>
          </div>

          {/* Search bar inside catalog */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search symptoms..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-1">
          {filteredCatalog.map(item => {
            const isSelected = selectedTagIds.includes(item.id);
            const labelText = item.label[currentLanguage] || item.label.en;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleSymptomTag(item.id)}
                className={`p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all border flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <div className="truncate">
                  <span className="block truncate font-semibold">{labelText}</span>
                  {currentLanguage !== 'en' && item.label.en && (
                    <span
                      className={`block text-[11px] truncate ${
                        isSelected ? 'text-emerald-100' : 'text-slate-400'
                      }`}
                    >
                      {item.label.en}
                    </span>
                  )}
                </div>

                <div className="shrink-0">
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : item.isRedFlagWarning ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  ) : (
                    <span className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Return to Welcome
          </button>
        )}

        <button
          id="btn-proceed-dynamic-casetaking"
          type="button"
          onClick={handleSubmit}
          className={`w-full sm:w-auto ml-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base transition-all shadow-md ${
            hasContent
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 active:scale-[0.98]'
              : 'bg-emerald-600/80 hover:bg-emerald-600 text-white shadow-emerald-600/10'
          }`}
        >
          <span>
            {hasContent
              ? `Proceed with Case Taking (${activeSymptomTags.length} Symptoms Recorded)`
              : 'Proceed with Standard Questionnaire'}
          </span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
