// Clinical Knowledge Base: Questionnaire, Red Flags, Lab Reference Ranges, and Drug Interactions

import { LanguageCode, LanguageOption, QuestionnaireQuestion, LabResult, MedicationInteraction, RedFlag } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari' },
];

export interface SymptomCatalogItem {
  id: string;
  category: 'CARDIAC' | 'RESPIRATORY' | 'GASTRO' | 'NEURO' | 'INFECTIOUS' | 'MUSCULOSKELETAL' | 'GENITOURINARY' | 'SKIN' | 'AYUSH' | 'GENERAL';
  label: Record<LanguageCode, string>;
  keywords: string[];
  isRedFlagWarning?: boolean;
  redFlagReason?: string;
}

// Master Common Symptoms Catalog for Dynamic Case Taking & Symptom Writing
export const COMMON_SYMPTOM_CATALOG: SymptomCatalogItem[] = [
  {
    id: 'sym_chest_pain',
    category: 'CARDIAC',
    label: {
      en: 'Chest Pain / Pressure',
      hi: 'छाती में दर्द या भारीपन',
      ta: 'மார்பு வலி / அழுத்தம்',
      te: 'ఛాతీ నొప్పి / ఒత్తిడి',
      bn: 'বুকে ব্যথা বা চাপ',
      mr: 'छातीत दुखणे किंवा जडपणा'
    },
    keywords: ['chest pain', 'chest', 'chhati', 'seene', 'angina', 'crushing', 'heavy chest', 'pressure in chest', 'heart pain', 'सीने में दर्द'],
    isRedFlagWarning: true,
    redFlagReason: 'Potential acute coronary syndrome or myocardial ischemia.'
  },
  {
    id: 'sym_shortness_breath',
    category: 'RESPIRATORY',
    label: {
      en: 'Breathlessness / Wheezing',
      hi: 'सांस फूलना या घबराहट',
      ta: 'மூச்சுத் திணறல்',
      te: 'శ్వాస తీసుకోవడంలో ఇబ్బంది',
      bn: 'শ্বাসকষ্ট বা হাঁপানি',
      mr: 'दम लागणे किंवा धाप लागणे'
    },
    keywords: ['shortness of breath', 'breathless', 'dyspnea', 'saans', 'dam', 'wheezing', 'gasping', 'सांस फूलना'],
    isRedFlagWarning: true,
    redFlagReason: 'Potential acute respiratory failure or severe bronchospasm.'
  },
  {
    id: 'sym_fever',
    category: 'INFECTIOUS',
    label: {
      en: 'High Fever & Chills',
      hi: 'तेज बुखार और ठंड लगना',
      ta: 'காய்ச்சல் மற்றும் குளிர்',
      te: 'తీవ్ర జ్వరం మరియు చలి',
      bn: 'তীব্র জ্বর ও কাঁপুনি',
      mr: 'ताप आणि थंडी वाजणे'
    },
    keywords: ['fever', 'bukhar', 'tap', 'pyrexia', 'chills', 'thand', 'shivering', 'बुखार'],
    isRedFlagWarning: false
  },
  {
    id: 'sym_cough',
    category: 'RESPIRATORY',
    label: {
      en: 'Cough / Sputum',
      hi: 'खांसी और कफ / बलगम',
      ta: 'இருமல் மற்றும் சளி',
      te: 'దగ్గు మరియు కఫం',
      bn: 'কাশি এবং কফ',
      mr: 'खोकला आणि कफ'
    },
    keywords: ['cough', 'khansi', 'khokla', 'phlegm', 'sputum', 'balgam', 'खांसी'],
    isRedFlagWarning: false
  },
  {
    id: 'sym_headache',
    category: 'NEURO',
    label: {
      en: 'Severe Headache / Migraine',
      hi: 'तेज सिरदर्द या माइग्रेन',
      ta: 'கடுமையான தலைவலி',
      te: 'తీవ్రమైన తలనొప్పి',
      bn: 'তীব্র মাথাব্যথা বা মাইগ্রেন',
      mr: 'तीव्र डोकेदुखी किंवा मायग्रेन'
    },
    keywords: ['headache', 'sir dard', 'sar dard', 'migraine', 'thunderclap', 'head pain', 'सिरदर्द'],
    isRedFlagWarning: false
  },
  {
    id: 'sym_abdominal_pain',
    category: 'GASTRO',
    label: {
      en: 'Stomach / Abdominal Pain',
      hi: 'पेट में दर्द या मरोड़',
      ta: 'வயிற்று வலி',
      te: 'కడుపు నొప్పి',
      bn: 'পেটে ব্যথা বা মোচড়',
      mr: 'पोटदुखी किंवा पोटात मुरडा'
    },
    keywords: ['stomach pain', 'abdominal pain', 'pet dard', 'pait dard', 'cramps', 'gastric', 'पेट दर्द'],
    isRedFlagWarning: false
  },
  {
    id: 'sym_vomiting',
    category: 'GASTRO',
    label: {
      en: 'Vomiting / Nausea',
      hi: 'उल्टी होना या जी मिचलाना',
      ta: 'வாந்தி அல்லது குமட்டல்',
      te: 'వాంతులు లేదా వికారం',
      bn: 'বমি বা বমি বমি ভাব',
      mr: 'उलटी किंवा मळमळ'
    },
    keywords: ['vomiting', 'nausea', 'ulti', 'ji michlana', 'vomit', 'उल्टी'],
    isRedFlagWarning: false
  },
  {
    id: 'sym_loose_motion',
    category: 'GASTRO',
    label: {
      en: 'Loose Motions / Diarrhea',
      hi: 'दस्त (लूज मोशन) या पतले शौच',
      ta: 'வயிற்றுப்போக்கு',
      te: 'విరేచనాలు',
      bn: 'পাতলা পায়খানা বা ডায়রিয়া',
      mr: 'पातळ शौचास होणे किंवा जुलाब'
    },
    keywords: ['loose motion', 'diarrhea', 'dast', 'watery stool', 'dysentery', 'दस्त'],
    isRedFlagWarning: false
  },
  {
    id: 'sym_joint_pain',
    category: 'MUSCULOSKELETAL',
    label: {
      en: 'Joint Pain & Swelling',
      hi: 'जोड़ों में दर्द व सूजन (घुटने/कमर)',
      ta: 'மூட்டு வலி மற்றும் வீக்கம்',
      te: 'కీళ్ల నొప్పులు మరియు వాపు',
      bn: 'গাঁটে ব্যথা এবং ফোলাভাব',
      mr: 'सांधेदुखी आणि सूज'
    },
    keywords: ['joint pain', 'knee pain', 'jod dard', 'ghutne', 'swelling', 'sandhi', 'arthritis', 'जोड़ों में दर्द'],
    isRedFlagWarning: false
  },
  {
    id: 'sym_burning_urination',
    category: 'GENITOURINARY',
    label: {
      en: 'Burning in Urination / UTI',
      hi: 'पेशाब में जलन या बार-बार आना',
      ta: 'சிறுநீர் கழிக்கும் போது எரிச்சல்',
      te: 'మూత్రవిసర్జనలో మంట',
      bn: 'প্রস্রাবে জ্বালাপোড়া',
      mr: 'लघवी करताना जळजळ'
    },
    keywords: ['burning urination', 'peshab me jalan', 'uti', 'urine burning', 'mutra jalan', 'पेशाब में जलन'],
    isRedFlagWarning: false
  },
  {
    id: 'sym_dizziness',
    category: 'NEURO',
    label: {
      en: 'Dizziness / Blackout / Fainting',
      hi: 'चक्कर आना या आंखों के आगे अंधेरा',
      ta: 'தலைச்சுற்றல் / மயக்கம்',
      te: 'తలతిరుగుట / కళ్లు తిరుగుట',
      bn: 'মাথা ঘোরা বা অজ্ঞান হওয়া',
      mr: 'चक्कर येणे किंवा भोवळ येणे'
    },
    keywords: ['dizziness', 'giddiness', 'chakkar', 'syncope', 'fainting', 'blackout', 'चक्कर'],
    isRedFlagWarning: true,
    redFlagReason: 'Risk of hemodynamic collapse or syncope.'
  },
  {
    id: 'sym_skin_rash',
    category: 'SKIN',
    label: {
      en: 'Skin Rash & Itching',
      hi: 'त्वचा पर चकत्ते या खुजली',
      ta: 'தோல் தடிப்பு மற்றும் அரிப்பு',
      te: 'చర్మ దద్దుర్లు మరియు దురద',
      bn: 'ত্বকে ফুসকুড়ি এবং চুলকানি',
      mr: 'त्वचेवर पुरळ आणि खाज'
    },
    keywords: ['skin rash', 'rash', 'itching', 'khujli', 'chakatte', 'allergy', 'चकत्ते'],
    isRedFlagWarning: false
  },
  {
    id: 'sym_back_pain',
    category: 'MUSCULOSKELETAL',
    label: {
      en: 'Severe Back Pain / Sciatica',
      hi: 'कमर या पीठ में तेज दर्द',
      ta: 'கடுமையான முதுகு வலி',
      te: 'తీవ్రమైన వెన్నునొప్పి',
      bn: 'তীব্র পিঠে বা কোমরে ব্যথা',
      mr: 'पाठदुखी किंवा कंबरदुखी'
    },
    keywords: ['back pain', 'kamar dard', 'peeth dard', 'spine pain', 'sciatica', 'कमर दर्द'],
    isRedFlagWarning: false
  },
  {
    id: 'sym_acidity',
    category: 'GASTRO',
    label: {
      en: 'Acidity / Heartburn / Gas',
      hi: 'एसिडिटी या सीने में जलन / गैस',
      ta: 'நெஞ்செரிச்சல் / அமிலத்தன்மை',
      te: 'ఎసిడిటీ / గుండెల్లో మంట',
      bn: 'অ্যাসিডিটি বা বুক জ্বালা',
      mr: 'ऍसिडिटी किंवा छातीत जळजळ'
    },
    keywords: ['acidity', 'gas', 'heartburn', 'seene me jalan', 'reflux', 'एसिडिटी'],
    isRedFlagWarning: false
  },
  {
    id: 'sym_fatigue',
    category: 'GENERAL',
    label: {
      en: 'Extreme Weakness / Fatigue',
      hi: 'बहुत अधिक कमजोरी व थकान',
      ta: 'கடுமையான பலவீனம் / சோர்வு',
      te: 'తీవ్ర బలహీనత / అలసట',
      bn: 'প্রচণ্ড দুর্বলতা বা ক্লান্তি',
      mr: 'खूप जास्त अशक्तपणा व थकवा'
    },
    keywords: ['weakness', 'fatigue', 'kamzori', 'thakan', 'susti', 'lethargy', 'कमजोरी'],
    isRedFlagWarning: false
  },
  {
    id: 'sym_ayush_prakriti',
    category: 'AYUSH',
    label: {
      en: 'AYUSH Assessment (Dosha / Prakriti)',
      hi: 'आयुर्वेदिक प्रकृति व अग्नि परीक्षण',
      ta: 'ஆயுர்வேத பிரகிருதி மதிப்பீடு',
      te: 'ఆయుర్వేద ప్రకృతి మూల్యాంకనం',
      bn: 'আয়ুর্বেদিক প্রকৃতি মূল্যায়ন',
      mr: 'आयुर्वेदिक प्रकृती मूल्यांकन'
    },
    keywords: ['ayurveda', 'ayush', 'prakriti', 'vata', 'pitta', 'kapha', 'agni', 'आयुर्वेद'],
    isRedFlagWarning: false
  }
];

export const QUESTIONNAIRE_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'q_chief_complaint',
    category: 'CHIEF_COMPLAINT',
    prompt: {
      en: 'What is the main health problem that brought you to the hospital today?',
      hi: 'आज आपको अस्पताल किस मुख्य समस्या के कारण आना पड़ा?',
      ta: 'இன்று நீங்கள் மருத்துவமனைக்கு வரக் காரணமான முக்கிய பிரச்சனை என்ன?',
      te: 'ఈ రోజు మిమ్మల్ని ఆసుపత్రికి తీసుకువచ్చిన ప్రధాన సమస్య ఏమిటి?',
      bn: 'আজ হাসপাতালে আসার প্রধান সমস্যা বা কারণ কী?',
      mr: 'आज तुम्हाला रुग्णालयात येण्याचे मुख्य कारण काय आहे?'
    },
    audioPrompt: {
      en: 'Please select or speak your chief medical complaint.',
      hi: 'कृपया अपनी मुख्य शारीरिक समस्या चुनें या बोलें।',
      ta: 'உங்கள் முக்கிய உடல்நலப் பிரச்சனையைத் தேர்ந்தெடுக்கவும் அல்லது பேசவும்.',
      te: 'దయచేసి మీ ప్రధాన ఆరోగ్య సమస్యను ఎంచుకోండి లేదా మాట్లాడండి.',
      bn: 'অনুগ্রহ করে আপনার প্রধান সমস্যাটি নির্বাচন করুন বা বলুন।',
      mr: 'कृपया आपली मुख्य तक्रार निवडा किंवा बोला.'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: false,
    options: [
      {
        id: 'opt_chest_pain',
        value: 'CHEST_PAIN',
        label: {
          en: 'Chest Pain / Discomfort',
          hi: 'छाती में दर्द या भारीपन',
          ta: 'மார்பு வலி / அசௌகரியம்',
          te: 'ఛాతీ నొప్పి / అసౌకర్యం',
          bn: 'বুকে ব্যথা বা অস্বস্তি',
          mr: 'छातीत दुखणे किंवा जडपणा'
        },
        triggersRedFlag: true,
        redFlagReason: 'Chest pain requires immediate clinical triage to rule out Acute Coronary Syndrome.',
        nextQuestionBranchId: 'q_chest_pain_onset'
      },
      {
        id: 'opt_fever',
        value: 'FEVER',
        label: {
          en: 'Fever / Chills',
          hi: 'बुखार या ठंड लगना',
          ta: 'காய்ச்சல் / குளிர்',
          te: 'జ్వరం / చలి',
          bn: 'জ্বর বা কাঁপুনি',
          mr: 'ताप किंवा थंडी वाजणे'
        },
        nextQuestionBranchId: 'q_fever_duration'
      },
      {
        id: 'opt_cough_breath',
        value: 'COUGH_BREATH',
        label: {
          en: 'Cough / Breathing Difficulty',
          hi: 'खांसी या सांस लेने में परेशानी',
          ta: 'இருமல் / மூச்சுத் திணறல்',
          te: 'దగ్గు / శ్వాస తీసుకోవడంలో ఇబ్బంది',
          bn: 'কাশি বা শ্বাসকষ্ট',
          mr: 'खोकला किंवा श्वास घेण्यास त्रास'
        },
        nextQuestionBranchId: 'q_cough_type'
      },
      {
        id: 'opt_abdominal_pain',
        value: 'ABDOMINAL_PAIN',
        label: {
          en: 'Stomach Pain / Indigestion',
          hi: 'पेट दर्द या अपच',
          ta: 'வயிற்று வலி / அஜீரணம்',
          te: 'కడుపు నొప్పి / అజీర్ణం',
          bn: 'পেটে ব্যথা বা বদহজম',
          mr: 'पोटदुखी किंवा अपचन'
        },
        nextQuestionBranchId: 'q_stomach_site'
      },
      {
        id: 'opt_diabetes_htn',
        value: 'DIABETES_HTN_FOLLOWUP',
        label: {
          en: 'Diabetes / Blood Pressure Regular Checkup',
          hi: 'मधुमेह (शुगर) / बीपी नियमित जांच',
          ta: 'சர்க்கரை நோய் / ரத்த அழுத்தம் பரிசோதனை',
          te: 'మధుమేహం / రక్తపోటు సాధారణ తనిఖీ',
          bn: 'ডায়াবেটিস / রক্তচাপ নিয়মিত পরীক্ষা',
          mr: 'मधुमेह / रक्तदाब नियमित तपासणी'
        },
        nextQuestionBranchId: 'q_past_medical'
      },
      {
        id: 'opt_headache',
        value: 'HEADACHE_DIZZINESS',
        label: {
          en: 'Severe Headache / Dizziness',
          hi: 'सिरदर्द या चक्कर आना',
          ta: 'தலைவலி / தலைசுற்றல்',
          te: 'తీవ్రమైన తలనొప్పి / తలతిరుగుట',
          bn: 'তীব্র মাথাব্যথা বা মাথা ঘোরা',
          mr: 'डोकेदुखी किंवा चक्कर येणे'
        },
        nextQuestionBranchId: 'q_headache_type'
      },
      {
        id: 'opt_ayush_consult',
        value: 'AYUSH_WELLNESS',
        label: {
          en: 'Ayurvedic Intake / Prakriti Evaluation',
          hi: 'आयुर्वेदिक परामर्श / प्रकृति परीक्षण',
          ta: 'ஆயுர்வேத ஆலோசனை / பிரகிருதி மதிப்பீடு',
          te: 'ఆయుర్వేద సంప్రదింపులు / ప్రకృతి మూల్యాంకనం',
          bn: 'আয়ুর্বেদিক পরামর্শ / প্রকৃতি পরীক্ষা',
          mr: 'आयुर्वेदिक सल्ला / प्रकृती परीक्षण'
        },
        nextQuestionBranchId: 'q_ayush_prakriti'
      },
      {
        id: 'opt_other',
        value: 'OTHER',
        label: {
          en: 'Other Problem (Describe)',
          hi: 'अन्य समस्या (विवरण दें)',
          ta: 'மற்ற பிரச்சனைகள்',
          te: 'ఇతర సమస్య',
          bn: 'অন্যান্য সমস্যা',
          mr: 'इतर समस्या'
        },
        nextQuestionBranchId: 'q_other_text'
      }
    ]
  },
  // SOCRATES Branch 1: Chest Pain
  {
    id: 'q_chest_pain_onset',
    category: 'HPI',
    prompt: {
      en: 'When did this chest pain begin, and did it start suddenly?',
      hi: 'यह छाती का दर्द कब शुरू हुआ, और क्या यह अचानक हुआ?',
      ta: 'இந்த மார்பு வலி எப்போது தொடங்கியது? திடீரென்று தொடங்கியதா?',
      te: 'ఈ ఛాతీ నొప్పి ఎప్పుడు ప్రారంభమైంది? అకస్మాత్తుగా మొదలైందా?',
      bn: 'বুকে ব্যথা কখন শুরু হয়েছিল এবং এটি কি হঠাৎ শুরু হয়েছিল?',
      mr: 'हे छातीत दुखणे कधी सुरू झाले आणि ते अचानक झाले का?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: false,
    options: [
      {
        id: 'cp_onset_acute',
        value: 'ACUTE_UNDER_2_HOURS',
        label: {
          en: 'Sudden onset within last 2-4 hours (Severe)',
          hi: 'पिछले 2-4 घंटों में अचानक शुरू हुआ (तीव्र)',
          ta: 'கடந்த 2-4 மணி நேரத்திற்குள் திடீரென்று',
          te: 'గత 2-4 గంటల్లో అకస్మాత్తుగా',
          bn: 'গত ২-৪ ঘন্টার মধ্যে হঠাৎ শুরু',
          mr: 'मागील २-४ तासात अचानक सुरू झाले'
        },
        triggersRedFlag: true,
        redFlagReason: 'Hyperacute chest pain onset requires urgent ECG within 10 minutes.'
      },
      {
        id: 'cp_onset_today',
        value: 'SINCE_MORNING',
        label: {
          en: 'Since morning / Today',
          hi: 'आज सुबह से / आज ही',
          ta: 'இன்று காலை முதல்',
          te: 'ఈ ఉదయం నుండి',
          bn: 'আজ সকাল থেকে',
          mr: 'आज सकाळपासून'
        }
      },
      {
        id: 'cp_onset_days',
        value: 'FEW_DAYS',
        label: {
          en: 'Intermittent for several days/weeks',
          hi: 'कई दिनों या हफ्तों से रुक-रुक कर',
          ta: 'பல நாட்களாக விட்டு விட்டு',
          te: 'కొన్ని రోజులుగా వచ్చిపోతోంది',
          bn: 'কয়েক দিন ধরে মাঝে মাঝে',
          mr: 'काही दिवसांपासून थांबून थांबून'
        }
      }
    ]
  },
  {
    id: 'q_chest_pain_radiation',
    category: 'HPI',
    prompt: {
      en: 'Does the chest pain spread to your left arm, shoulder, neck, jaw, or back?',
      hi: 'क्या यह दर्द आपके बाएं हाथ, कंधे, गर्दन, जबड़े या पीठ की तरफ फैलता है?',
      ta: 'இந்த வலி இடது கை, தோள்பட்டை, கழுத்து அல்லது முதுகிற்கு பரவுகிறதா?',
      te: 'ఈ నొప్పి ఎడమ చేయి, భుజం, మెడ లేదా వీపుకు పాకుతుందా?',
      bn: 'ব্যথা কি বাম হাত, কাঁধ, ঘাড় বা পিঠে ছড়িয়ে পড়ছে?',
      mr: 'हे दुखणे डाव्या हाताकडे, खांद्याकडे, मानेकडे किंवा पाठीकडे पसरते का?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: false,
    options: [
      {
        id: 'cp_rad_yes',
        value: 'YES_LEFT_ARM_JAW',
        label: {
          en: 'Yes, radiates to left arm / jaw / neck',
          hi: 'हाँ, बाएं हाथ, जबड़े या गर्दन में फैलता है',
          ta: 'ஆம், இடது கை / தாடை / கழுத்தில் பரவுகிறது',
          te: 'అవును, ఎడమ చేయి లేదా దవడకు పాకుతుంది',
          bn: 'হ্যাঁ, বাম হাত বা চোয়ালে ছড়াচ্ছে',
          mr: 'होय, डाव्या हाताकडे किंवा जबड्याकडे पसरते'
        },
        triggersRedFlag: true,
        redFlagReason: 'Radiation to left arm/jaw has high predictive value for myocardial ischemia.'
      },
      {
        id: 'cp_rad_no',
        value: 'NO_RADIATION',
        label: {
          en: 'No, stays in one central area',
          hi: 'नहीं, केवल एक ही जगह रहता है',
          ta: 'இல்லை, ஒரு பகுதியில் மட்டுமே',
          te: 'లేదు, ఒకే చోట ఉంది',
          bn: 'না, একই স্থানে আছে',
          mr: 'नाही, एकाच जागी आहे'
        }
      }
    ]
  },
  {
    id: 'q_chest_pain_associated',
    category: 'HPI',
    prompt: {
      en: 'Are you experiencing cold sweating, difficulty breathing, or severe nausea?',
      hi: 'क्या आपको ठंडा पसीना, सांस फूलना, या उल्टी जैसा महसूस हो रहा है?',
      ta: 'குளிர்ந்த வியர்வை, மூச்சுத் திணறல் அல்லது வாந்தி உணர்வு உள்ளதா?',
      te: 'చల్లని చెమటలు, శ్వాస ఆడకపోవడం లేదా వికారం ఉందా?',
      bn: 'ঠান্ডা ঘাম, শ্বাসকষ্ট বা তীব্র বমি বমি ভাব হচ্ছে?',
      mr: 'गार घाम येणे, दम लागणे किंवा उलट्यासारखे वाटणे होत आहे का?'
    },
    inputType: 'MULTI_CHOICE',
    skippable: true,
    options: [
      {
        id: 'cp_assoc_sweat',
        value: 'DIAPHORESIS_SWEATING',
        label: {
          en: 'Profuse cold sweating',
          hi: 'बहुत अधिक ठंडा पसीना',
          ta: 'அதிக குளிர்ந்த வியர்வை',
          te: 'విపరీతమైన చల్లని చెమట',
          bn: 'প্রচণ্ড ঠান্ডা ঘাম',
          mr: 'खूप गार घाम'
        },
        triggersRedFlag: true,
        redFlagReason: 'Diaphoresis with chest pain is an emergency red flag.'
      },
      {
        id: 'cp_assoc_dyspnea',
        value: 'SHORTNESS_OF_BREATH',
        label: {
          en: 'Shortness of breath / Gasping',
          hi: 'सांस फूलना या सांस लेने में भारी तकलीफ',
          ta: 'மூச்சுத் திணறல்',
          te: 'శ్వాస ఆడకపోవడం',
          bn: 'শ্বাসকষ্ট',
          mr: 'दम लागणे'
        },
        triggersRedFlag: true,
        redFlagReason: 'Acute dyspnea associated with chest pain.'
      },
      {
        id: 'cp_assoc_nausea',
        value: 'NAUSEA_VOMITING',
        label: {
          en: 'Nausea or vomiting',
          hi: 'जी मिचलाना या उल्टी होना',
          ta: 'குமட்டல் அல்லது வாந்தி',
          te: 'వికారం లేదా వాంతులు',
          bn: 'বমি বমি ভাব বা বমি',
          mr: 'मळमळ किंवा उलटी'
        }
      },
      {
        id: 'cp_assoc_none',
        value: 'NONE',
        label: {
          en: 'None of these',
          hi: 'इनमें से कोई नहीं',
          ta: 'இவற்றில் எதுவும் இல்லை',
          te: 'ఇవేవీ లేవు',
          bn: 'কোনটিই নয়',
          mr: 'यांपैकी काहीही नाही'
        }
      }
    ]
  },
  // Fever Branch
  {
    id: 'q_fever_duration',
    category: 'HPI',
    prompt: {
      en: 'How many days have you had the fever?',
      hi: 'आपको बुखार कितने दिनों से है?',
      ta: 'எத்தனை நாட்களாக காய்ச்சல் உள்ளது?',
      te: 'ఎన్ని రోజులుగా జ్వరం ఉంది?',
      bn: 'কত দিন ধরে জ্বর আছে?',
      mr: 'किती दिवसांपासून ताप आहे?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: false,
    options: [
      {
        id: 'f_dur_1_2',
        value: '1_TO_2_DAYS',
        label: {
          en: '1 to 2 days',
          hi: '1 से 2 दिन',
          ta: '1 முதல் 2 நாட்கள்',
          te: '1 నుండి 2 రోజులు',
          bn: '১ থেকে ২ দিন',
          mr: '१ ते २ दिवस'
        }
      },
      {
        id: 'f_dur_3_7',
        value: '3_TO_7_DAYS',
        label: {
          en: '3 to 7 days',
          hi: '3 से 7 दिन',
          ta: '3 முதல் 7 நாட்கள்',
          te: '3 నుండి 7 రోజులు',
          bn: '৩ থেকে ৭ দিন',
          mr: '३ ते ७ दिवस'
        }
      },
      {
        id: 'f_dur_week_plus',
        value: 'MORE_THAN_A_WEEK',
        label: {
          en: 'More than 1 week (Prolonged)',
          hi: '1 सप्ताह से अधिक (लगातार)',
          ta: 'ஒரு வாரத்திற்கு மேல்',
          te: 'ఒక వారం కంటే ఎక్కువ',
          bn: 'এক সপ্তাহের বেশি',
          mr: '१ आठवड्यापेक्षा जास्त'
        }
      }
    ]
  },
  // Past Medical History
  {
    id: 'q_past_medical',
    category: 'PAST_HISTORY',
    prompt: {
      en: 'Do you have any known existing medical conditions?',
      hi: 'क्या आपको पहले से कोई पुरानी बीमारी या समस्या है?',
      ta: 'உங்களுக்கு ஏற்கனவே ஏதேனும் உடல்நல பாதிப்புகள் உள்ளதா?',
      te: 'మీకు గతంలో ఉన్న దీర్ఘకాలిక వ్యాధులు ఏమైనా ఉన్నాయా?',
      bn: 'আপনার কি আগে থেকেই কোনো জানা রোগ আছে?',
      mr: 'तुम्हाला आधीपासून काही जुनाट आजार आहेत का?'
    },
    inputType: 'MULTI_CHOICE',
    skippable: true,
    options: [
      {
        id: 'pmh_htn',
        value: 'HYPERTENSION',
        label: {
          en: 'High Blood Pressure (Hypertension)',
          hi: 'उच्च रक्तचाप (हाई बीपी)',
          ta: 'உயர் ரத்த அழுத்தம்',
          te: 'అధిక రక్తపోటు (బీపీ)',
          bn: 'উচ্চ রক্তচাপ (হাই প্রেশার)',
          mr: 'उच्च रक्तदाब (हाय बीपी)'
        }
      },
      {
        id: 'pmh_dm',
        value: 'DIABETES_MELLITUS_TYPE_2',
        label: {
          en: 'Diabetes (Sugar)',
          hi: 'मधुमेह (शुगर)',
          ta: 'சர்க்கரை நோய்',
          te: 'మధుమేహం (షుగర్)',
          bn: 'ডায়াবেটিস',
          mr: 'मधुमेह (शुगर)'
        }
      },
      {
        id: 'pmh_cad',
        value: 'CORONARY_ARTERY_DISEASE',
        label: {
          en: 'Heart Disease / Prior Stent / Heart Attack',
          hi: 'हृदय रोग / पुराना स्टेंट / दिल का दौरा',
          ta: 'இதய நோய் / ஸ்டென்ட்',
          te: 'గుండె జబ్బు / గతంలో స్టెంట్',
          bn: 'হৃদরোগ / হার্ট অ্যাটাক',
          mr: 'हृदयरोग / आधीचा स्टेंट'
        }
      },
      {
        id: 'pmh_asthma',
        value: 'ASTHMA_COPD',
        label: {
          en: 'Asthma / Breathing issue (Inhaler user)',
          hi: 'अस्थमा / दमा / इनहेलर का उपयोग',
          ta: 'ஆஸ்துமா / மூச்சு பிரச்சனை',
          te: 'ఉబ్బసం / ఆస్తమా',
          bn: 'অ্যাজমা / শ্বাসকষ্ট',
          mr: 'अस्थमा / दम्याचा त्रास'
        }
      },
      {
        id: 'pmh_ckd',
        value: 'CHRONIC_KIDNEY_DISEASE',
        label: {
          en: 'Kidney Disease',
          hi: 'गुर्दे (किडनी) की बीमारी',
          ta: 'சிறுநீரக நோய்',
          te: 'కిడ్నీ సమస్య',
          bn: 'কিডনি রোগ',
          mr: 'मूत्रपिंडाचा (किडनी) आजार'
        }
      },
      {
        id: 'pmh_none',
        value: 'NO_KNOWN_COMORBIDITIES',
        label: {
          en: 'None / Healthy previously',
          hi: 'कोई बीमारी नहीं / पहले पूर्ण स्वस्थ',
          ta: 'எதுவும் இல்லை',
          te: 'ఏమీ లేవు',
          bn: 'কোনোটিই নেই',
          mr: 'काहीही नाही'
        }
      }
    ]
  },
  // Allergies
  {
    id: 'q_allergies',
    category: 'ALLERGIES',
    prompt: {
      en: 'Are you allergic to any medicines or injections?',
      hi: 'क्या आपको किसी दवा या इंजेक्शन से एलर्जी है?',
      ta: 'உங்களுக்கு ஏதேனும் மருந்து அல்லது ஊசிக்கு அலர்ஜி உள்ளதா?',
      te: 'మీకు ఏదైనా మందులు లేదా ఇంజెక్షన్ల వల్ల అలెర్జీ ఉందా?',
      bn: 'আপনার কি কোনো ওষুধ বা ইঞ্জেকশনে অ্যালার্জি আছে?',
      mr: 'तुम्हाला कोणत्याही औषधाची किंवा इंजेक्शनची ॲलर्जी आहे का?'
    },
    inputType: 'MULTI_CHOICE',
    skippable: true,
    options: [
      {
        id: 'all_pnc',
        value: 'PENICILLIN_AMOXYCILLIN',
        label: {
          en: 'Penicillin / Amoxicillin',
          hi: 'पेनिसिलिन / अमोक्सिसिलिन',
          ta: 'பென்சிலின்',
          te: 'పెన్సిలిన్',
          bn: 'পেনিসিলিন',
          mr: 'पेनिसिलिन'
        }
      },
      {
        id: 'all_sulfa',
        value: 'SULFA_DRUGS',
        label: {
          en: 'Sulfa Drugs / Cotrimoxazole',
          hi: 'सल्फा दवाइयाँ',
          ta: 'சல்ஃபா மருந்துகள்',
          te: 'సల్ఫా మందులు',
          bn: 'সালফা ওষুধ',
          mr: 'सल्फा औषधे'
        }
      },
      {
        id: 'all_nsaid',
        value: 'NSAID_ASPIRIN_BRUFEN',
        label: {
          en: 'Painkillers (Brufen / Aspirin / Diclofenac)',
          hi: 'दर्द निवारक दवाइयाँ (ब्रूफेन / डिस्प्रिन)',
          ta: 'வலி நிவாரணி மருந்துகள்',
          te: 'నొప్పి నివారణ మందులు',
          bn: 'ব্যথানাশক ওষুধ',
          mr: 'वेदनानाशक औषधे'
        }
      },
      {
        id: 'all_none',
        value: 'NO_KNOWN_ALLERGIES',
        label: {
          en: 'No Known Drug Allergies (NKDA)',
          hi: 'किसी दवा से कोई ज्ञात एलर्जी नहीं',
          ta: 'எந்த மருந்து அலர்ஜியும் இல்லை',
          te: 'తెలిసిన ఔషధ అలెర్జీలు లేవు',
          bn: 'জানা কোনো ওষুধের অ্যালার্জি নেই',
          mr: 'कोणतीही ज्ञात ॲलर्जी नाही'
        }
      }
    ]
  },
  // AYUSH: Prakriti & Agni Assessment
  {
    id: 'q_ayush_prakriti',
    category: 'AYUSH',
    prompt: {
      en: 'Ayurvedic Assessment: How is your natural digestion (Agni) and bowel habit (Koshta)?',
      hi: 'आयुर्वेदिक मूल्यांकन: आपकी स्वाभाविक पाचन शक्ति (अग्नि) और पेट की शुद्धि (कोष्ठ) कैसी है?',
      ta: 'ஆயுர்வேத மதிப்பீடு: உங்கள் செரிமானம் மற்றும் குடல் இயக்கம் எவ்வாறு உள்ளது?',
      te: 'ఆయుర్వేద మూల్యాంకనం: మీ జీర్ణక్రియ మరియు మలబద్ధకం ఎలా ఉంది?',
      bn: 'আয়ুর্বেদিক মূল্যায়ন: আপনার হজম শক্তি এবং পেট পরিষ্কার কেমন থাকে?',
      mr: 'आयुर्वेदिक मूल्यमापन: तुमची पचनशक्ती आणि पोट साफ होण्याची स्थिती कशी आहे?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: true,
    options: [
      {
        id: 'ay_samagni',
        value: 'SAMAGNI_MADHYAMA',
        label: {
          en: 'Balanced digestion; regular soft stools (Samagni / Madhyama Koshta)',
          hi: 'संतुलित भूख और नियमित सामान्य पेट साफ (समाग्नि)',
          ta: 'சீரான செரிமானம் (சமாக்னி)',
          te: 'సమతుల్య జీర్ణక్రియ (సమాగ్ని)',
          bn: 'সুষম হজম (সমগ্নি)',
          mr: 'संतुलित पचन (समाग्नी)'
        }
      },
      {
        id: 'ay_mandagni',
        value: 'MANDAGNI_KRURA',
        label: {
          en: 'Slow, heavy digestion, bloating, constipation (Mandagni / Krura Koshta)',
          hi: 'मंद भूख, पेट भारी होना, कब्ज की शिकायत (मंदाग्नि / क्रूर कोष्ठ)',
          ta: 'மந்தமான செரிமானம், மலச்சிக்கல் (மந்தாக்னி)',
          te: 'నెమ్మది జీర్ణక్రియ, మలబద్ధకం (మందాగ్ని)',
          bn: 'মৃদু হজম, কোষ্ঠকাঠিন্য (মন্দাগ্নি)',
          mr: 'मंद पचन, बद्धकोष्ठता (मंदाग्नी)'
        }
      },
      {
        id: 'ay_tikshnagni',
        value: 'TIKSHNAGNI_MRUDU',
        label: {
          en: 'Intense frequent hunger, burning sensation, loose stools (Tikshnagni / Mrudu Koshta)',
          hi: 'तीव्र भूख, जलन, आसानी से पतला शौच (तीक्ष्णाग्नि / मृदु कोष्ठ)',
          ta: 'அதிக பசி, எரிச்சல் உணர்வு (தீக்ஷ்ணாக்னி)',
          te: 'తీవ్రమైన ఆకలి, మంట (తీక్ష్ణాగ్ని)',
          bn: 'তীব্র ক্ষুধা, বুক জ্বালা (তীক্ষ্ণাগ্নি)',
          mr: 'तीव्र भूक, जळजळ (तीक्ष्णाग्नी)'
        }
      }
    ]
  },
  // Respiratory Branch Questions
  {
    id: 'q_resp_cough_type',
    category: 'HPI',
    prompt: {
      en: 'What is the nature of your cough and sputum?',
      hi: 'आपकी खांसी और बलगम का स्वरूप कैसा है?',
      ta: 'உங்கள் இருமல் மற்றும் சளியின் தன்மை என்ன?',
      te: 'మీ దగ్గు మరియు కఫం స్వభావం ఏమిటి?',
      bn: 'আপনার কাশি এবং কফের ধরন কেমন?',
      mr: 'तुमचा खोकला आणि कफाचे स्वरूप कसे आहे?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: false,
    options: [
      {
        id: 'resp_cough_dry',
        value: 'DRY_IRRITATING',
        label: {
          en: 'Dry irritating cough (no phlegm)',
          hi: 'सूखी खांसी (बलगम नहीं आता)',
          ta: 'வறட்டு இருமல்',
          te: 'పొడి దగ్గు (కఫం లేదు)',
          bn: 'শুকনো কাশি (কফ নেই)',
          mr: 'कोरडा खोकला (कफ नाही)'
        }
      },
      {
        id: 'resp_cough_productive',
        value: 'PRODUCTIVE_YELLOW_GREEN',
        label: {
          en: 'Thick yellowish / greenish sputum',
          hi: 'पीला या हरा गाढ़ा बलगम आता है',
          ta: 'மஞ்சள் / பச்சை சளி',
          te: 'పసుపు లేదా ఆకుపచ్చ కఫం',
          bn: 'হলুদ বা সবুজ ঘন কফ',
          mr: 'पिवळा किंवा हिरवा कफ'
        }
      },
      {
        id: 'resp_cough_blood',
        value: 'HEMOPTYSIS_BLOOD_STREAKS',
        label: {
          en: 'Coughing up blood or red streaks (Urgent)',
          hi: 'खांसी में खून या लाल छींटे आना (गंभीर)',
          ta: 'இருமலில் ரத்தம் வருதல் (அவசரம்)',
          te: 'దగ్గులో రక్తం రావడం (అత్యవసరం)',
          bn: 'কাশির সাথে রক্ত আসা (জরুরি)',
          mr: 'खोकल्यातून रक्त येणे (तातडीचे)'
        },
        triggersRedFlag: true,
        redFlagReason: 'Active hemoptysis carries risk of major airway compromise and requires urgent imaging/evaluation.'
      }
    ]
  },
  {
    id: 'q_resp_breathlessness',
    category: 'HPI',
    prompt: {
      en: 'How severe is your shortness of breath or difficulty breathing?',
      hi: 'सांस लेने में कितनी अधिक परेशानी या तकलीफ हो रही है?',
      ta: 'உங்கள் மூச்சுத் திணறல் எவ்வளவு தீவிரமாக உள்ளது?',
      te: 'శ్వాస తీసుకోవడంలో ఎంత తీవ్రమైన ఇబ్బంది ఉంది?',
      bn: 'শ্বাসকষ্ট কতটা তীব্র?',
      mr: 'श्वास घेण्यास किती त्रास होत आहे?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: false,
    options: [
      {
        id: 'resp_sob_mild',
        value: 'ON_FAST_WALKING',
        label: {
          en: 'Mild — only when walking fast or stairs',
          hi: 'हल्की — केवल तेज चलने या सीढ़ी चढ़ने पर',
          ta: 'லேசானது — வேகமாக நடக்கும் போது மட்டும்',
          te: 'తేలికపాటి — వేగంగా నడిచినప్పుడు మాత్రమే',
          bn: 'সামান্য — দ্রুত হাঁটার সময়',
          mr: 'किरकोळ — वेगाने चालताना'
        }
      },
      {
        id: 'resp_sob_mod',
        value: 'ON_ROUTINE_CHORES',
        label: {
          en: 'Moderate — on routine walking / dressing',
          hi: 'मध्यम — सामान्य काम करने या चलने पर',
          ta: 'மிதமானது — வழக்கமான வேலைகளில்',
          te: 'మధ్యస్థ — సాధారణ పనుల్లో',
          bn: 'মাঝারি — সাধারণ কাজকর্মে',
          mr: 'मध्यम — दैनंदिन कामात'
        }
      },
      {
        id: 'resp_sob_severe',
        value: 'AT_REST_OR_LYING_FLAT',
        label: {
          en: 'Severe at rest / Unable to complete full sentences (Critical)',
          hi: 'गंभीर — बैठे-बैठे भी सांस फूलना या लेट न पाना (अति गंभीर)',
          ta: 'தீவிரமானது — ஓய்வில் இருக்கும் போதும் (முக்கியமானது)',
          te: 'తీవ్రమైనది — కూర్చున్నా శ్వాస ఆడకపోవడం (అత్యవసరం)',
          bn: 'প্রচণ্ড — বিশ্রামে থাকলেও শ্বাসকষ্ট (জরুরি)',
          mr: 'गंभीर — बसल्या जागेवरही दम लागणे (तातडीचे)'
        },
        triggersRedFlag: true,
        redFlagReason: 'Severe respiratory distress at rest or orthopnea warrants immediate oxygenation and triage escalation.'
      }
    ]
  },
  // Gastrointestinal Branch Questions
  {
    id: 'q_gi_pain_location',
    category: 'HPI',
    prompt: {
      en: 'Where exactly is your stomach or abdominal pain located?',
      hi: 'पेट में दर्द मुख्य रूप से किस जगह पर महसूस हो रहा है?',
      ta: 'வயிற்று வலி சரியாக எந்தப் பகுதியில் உள்ளது?',
      te: 'కడుపు నొప్పి ఖచ్చితంగా ఎక్కడ ఉంది?',
      bn: 'পেটে ব্যথা ঠিক কোন জায়গায় হচ্ছে?',
      mr: 'पोटात दुखणे नेमके कोणत्या भागात होत आहे?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: false,
    options: [
      {
        id: 'gi_loc_epigastric',
        value: 'UPPER_CENTRAL_EPIGASTRIC',
        label: {
          en: 'Upper center (under ribs / burning acidity feeling)',
          hi: 'ऊपर बीच में (पसलियों के नीचे / जलन व एसिडिटी)',
          ta: 'மேல் நடுப்பகுதி (எரிச்சல்)',
          te: 'పై మధ్య భాగం (మంట)',
          bn: 'উপরের মাঝখানে (বুক জ্বালা)',
          mr: 'वरच्या मधोमध (जळजळ)'
        }
      },
      {
        id: 'gi_loc_rlq',
        value: 'RIGHT_LOWER_ABDOMEN',
        label: {
          en: 'Right lower side of abdomen (Sharp / Appendicitis check)',
          hi: 'दाहिने तरफ नीचे के हिस्से में (तीव्र दर्द / अपेंडिक्स शंका)',
          ta: 'வலது கீழ் வயிற்றுப் பகுதி',
          te: 'కుడి వైపు కడుపు కింది భాగం',
          bn: 'ডান পাশের নিচের তলপেট',
          mr: 'उजव्या बाजूला पोटाच्या खालच्या भागात'
        },
        triggersRedFlag: true,
        redFlagReason: 'Localized right lower quadrant abdominal pain raises suspicion of acute appendicitis.'
      },
      {
        id: 'gi_loc_generalized',
        value: 'ALL_OVER_CRAMPING',
        label: {
          en: 'Generalized cramps across entire stomach',
          hi: 'पूरे पेट में मरोड़ और दर्द',
          ta: 'முழு வயிற்றிலும் வலி',
          te: 'కడుపు అంతటా నొప్పి',
          bn: 'পুরো পেটে মোচড় দিয়ে ব্যথা',
          mr: 'संपूर्ण पोटात मुरडा'
        }
      }
    ]
  },
  {
    id: 'q_gi_vomiting_nausea',
    category: 'HPI',
    prompt: {
      en: 'Are you experiencing vomiting, and what does it look like?',
      hi: 'क्या आपको उल्टी हो रही है, और उल्टी में क्या निकल रहा है?',
      ta: 'உங்களுக்கு வாந்தி வருகிறதா?',
      te: 'మీకు వాంతులు అవుతున్నాయా?',
      bn: 'আপনার কি বমি হচ্ছে?',
      mr: 'तुम्हाला उलट्या होत आहेत का?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: false,
    options: [
      {
        id: 'gi_vom_none',
        value: 'NO_VOMITING',
        label: {
          en: 'No vomiting, mild nausea only',
          hi: 'उल्टी नहीं है, केवल थोड़ा जी मिचलाता है',
          ta: 'வாந்தி இல்லை, லேசான குமட்டல்',
          te: 'వాంతులు లేవు, స్వల్ప వికారం',
          bn: 'বমি নেই, সামান্য বমি ভাব',
          mr: 'उलटी नाही, केवळ मळमळ'
        }
      },
      {
        id: 'gi_vom_food',
        value: 'FOOD_AND_WATER',
        label: {
          en: 'Vomiting ingested food / watery bile (1-3 times)',
          hi: 'खाना या पानी की उल्टी (1 से 3 बार)',
          ta: 'உணவு அல்லது நீர் வாந்தி',
          te: 'ఆహారం లేదా నీళ్ల వాంతి',
          bn: 'খাওয়া খাবার বমি হওয়া',
          mr: 'अन्न किंवा पाण्याची उलटी'
        }
      },
      {
        id: 'gi_vom_blood',
        value: 'HEMATEMESIS_BLOOD_OR_BLACK',
        label: {
          en: 'Vomiting blood or dark black coffee-ground material (Urgent)',
          hi: 'उल्टी में खून या गहरा काला पदार्थ निकलना (अति गंभीर)',
          ta: 'வாந்தியில் ரத்தம் வருதல் (அவசரம்)',
          te: 'వాంతిలో రక్తం లేదా నల్లని పదార్థం (అత్యవసరం)',
          bn: 'বমিতে রক্ত বা কালো পদার্থ (জরুরি)',
          mr: 'उलटीत रक्त किंवा काळा पदार्थ पडणे (तातडीचे)'
        },
        triggersRedFlag: true,
        redFlagReason: 'Upper gastrointestinal bleeding (hematemesis/coffee-ground emesis) is an emergency.'
      }
    ]
  },
  // Neurological Branch Questions
  {
    id: 'q_neuro_onset_quality',
    category: 'HPI',
    prompt: {
      en: 'How did this headache begin, and how intense is it?',
      hi: 'यह सिरदर्द कैसे शुरू हुआ और इसका दर्द कितना तीव्र है?',
      ta: 'இந்த தலைவலி எவ்வாறு தொடங்கியது?',
      te: 'ఈ తలనొప్పి ఎలా మొదలైంది?',
      bn: 'মাথাব্যথা কীভাবে শুরু হয়েছিল?',
      mr: 'ही डोकेदुखी कशी सुरू झाली?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: false,
    options: [
      {
        id: 'neuro_thunderclap',
        value: 'THUNDERCLAP_SUDDEN_PEAK',
        label: {
          en: 'Instant explosive peak within seconds — "Worst headache of life" (Critical)',
          hi: 'बिजली कड़कने जैसा अचानक तीव्र दर्द — "जीवन का सबसे भयंकर सिरदर्द" (गंभीर)',
          ta: 'திடீரென்று தீவிரமான தலைவலி (முக்கியமானது)',
          te: 'క్షణాల్లో మొదలైన అత్యంత తీవ్ర తలనొప్పి (అత్యవసరం)',
          bn: 'হঠাৎ বিদ্যুতের মতো তীব্র মাথাব্যথা (জরুরি)',
          mr: 'अचानक वीज पडल्यासारखी तीव्र डोकेदुखी (तातडीचे)'
        },
        triggersRedFlag: true,
        redFlagReason: 'Thunderclap headache presentation carries high suspicion of subarachnoid hemorrhage (SAH).'
      },
      {
        id: 'neuro_throbbing',
        value: 'THROBBING_ONE_SIDED',
        label: {
          en: 'Throbbing / pulsating on one side with light sensitivity (Migraine type)',
          hi: 'एक तरफ धड़कने वाला दर्द और रोशनी से परेशानी (माइग्रेन प्रकार)',
          ta: 'ஒரு பக்க துடிக்கும் தலைவலி',
          te: 'ఒక వైపు తీవ్రంగా కొట్టుకునే నొప్పి (మైగ్రేన్)',
          bn: 'একপাশে দপদপ করা ব্যথা',
          mr: 'एका बाजूला ठसठसणारे दुखणे'
        }
      },
      {
        id: 'neuro_dull',
        value: 'DULL_HEAVY_BAND',
        label: {
          en: 'Dull heavy pressure across forehead or neck',
          hi: 'माथे या गर्दन के पीछे भारीपन व खिंचाव',
          ta: 'மந்தமான கனத்த அழுத்தம்',
          te: 'నుదుటిపై భారంగా ఉండడం',
          bn: 'কপালে ভারী চাপ',
          mr: 'कपाळावर जडपणा'
        }
      }
    ]
  },
  {
    id: 'q_neuro_redflags',
    category: 'HPI',
    prompt: {
      en: 'Do you have sudden weakness in arm/leg, slurred speech, or facial drooping?',
      hi: 'क्या आपको हाथ-पैर में कमजोरी, बोलने में लड़खड़ाहट, या मुंह टेढ़ा होना महसूस हुआ?',
      ta: 'கை/கால்களில் பலவீனம் அல்லது வாய் கோணுதல் உள்ளதா?',
      te: 'చేయి/కాలులో బలహీనత లేదా మాట తడబడటం ఉందా?',
      bn: 'হাত-পায়ে দুর্বলতা বা কথা জড়িয়ে যাওয়া আছে কি?',
      mr: 'हात-पायात अशक्तपणा किंवा बोलताना जीभ जड होणे होत आहे का?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: false,
    options: [
      {
        id: 'neuro_fast_yes',
        value: 'FAST_NEURO_DEFICIT_PRESENT',
        label: {
          en: 'Yes, sudden weakness in one side or difficulty speaking (Critical FAST Stroke alert)',
          hi: 'हाँ, एक तरफ कमजोरी या बोलने में लड़खड़ाहट (लकवा / स्ट्रोक का गंभीर लक्षण)',
          ta: 'ஆம், பக்கவாதம் போன்ற திடீர் பலவீனம் (அவசரம்)',
          te: 'అవును, ఒక వైపు బలహీనత లేదా మాటలో ఇబ్బంది (అత్యవసరం)',
          bn: 'হ্যাঁ, একপাশে দুর্বলতা বা কথা অস্পষ্ট (জরুরি)',
          mr: 'होय, एका बाजूला अशक्तपणा किंवा बोलण्यात अडखळणे (तातडीचे)'
        },
        triggersRedFlag: true,
        redFlagReason: 'FAST stroke criteria satisfied: Unilateral weakness and/or speech difficulty within potential thrombolysis window.'
      },
      {
        id: 'neuro_fast_no',
        value: 'NO_FOCAL_DEFICIT',
        label: {
          en: 'No weakness or facial change; movement and speech are normal',
          hi: 'नहीं, हाथ-पैर व बोली सामान्य है, कोई लकवे जैसा लक्षण नहीं',
          ta: 'இல்லை, இயக்கம் மற்றும் பேச்சு சாதாரணமாக உள்ளது',
          te: 'లేదు, కదలికలు మరియు మాట సాధారణంగా ఉన్నాయి',
          bn: 'না, হাত-পা ও কথা স্বাভাবিক',
          mr: 'नाही, कोणतीही कमजोरी नाही'
        }
      }
    ]
  },
  // Musculoskeletal Branch Questions
  {
    id: 'q_joint_affected',
    category: 'HPI',
    prompt: {
      en: 'Which joints or body parts are primarily causing pain?',
      hi: 'मुख्य रूप से किन जोड़ों या अंगों में दर्द हो रहा है?',
      ta: 'முக்கியமாக எந்த மூட்டுகளில் வலி உள்ளது?',
      te: 'ప్రధానంగా ఏ కీళ్లలో నొప్పి ఉంది?',
      bn: 'প্রধানত কোন কোন জয়েন্টে ব্যথা হচ্ছে?',
      mr: 'प्रामुख्याने कोणत्या सांध्यांमध्ये दुखत आहे?'
    },
    inputType: 'MULTI_CHOICE',
    skippable: false,
    options: [
      {
        id: 'jt_knees',
        value: 'KNEE_JOINTS',
        label: {
          en: 'Knee joints (one or both)',
          hi: 'घुटनों के जोड़ (एक या दोनों)',
          ta: 'முழங்கால் மூட்டுகள்',
          te: 'మోకాళ్ల కీళ్లు',
          bn: 'হাঁটুর জয়েন্ট',
          mr: 'गुडघ्यांचे सांधे'
        }
      },
      {
        id: 'jt_back',
        value: 'LOWER_BACK_SPINE',
        label: {
          en: 'Lower back / Spine / Hip',
          hi: 'कमर के निचले हिस्से या रीढ़ की हड्डी में',
          ta: 'கீழ் முதுகு / இடுப்பு',
          te: 'నడుము / వెన్నెముక',
          bn: 'কোমর বা মেরুদণ্ড',
          mr: 'कंबर किंवा मणका'
        }
      },
      {
        id: 'jt_hands',
        value: 'HANDS_FINGERS_WRISTS',
        label: {
          en: 'Small joints of hands / fingers / wrists',
          hi: 'हाथ की उंगलियां या कलाई के छोटे जोड़',
          ta: 'கை விரல்கள் / மணிக்கட்டு',
          te: 'చేతి వేళ్లు / మణికట్టు',
          bn: 'হাতের আঙুল বা কব্জি',
          mr: 'हाताची बोटे किंवा मनगट'
        }
      }
    ]
  },
  {
    id: 'q_joint_stiffness',
    category: 'HPI',
    prompt: {
      en: 'Do you have morning stiffness lasting more than 30 minutes, or visible joint swelling?',
      hi: 'क्या सुबह उठने पर जोड़ों में 30 मिनट से ज्यादा अकड़न या सूजन रहती है?',
      ta: 'காலையில் மூட்டு விறைப்பு 30 நிமிடங்களுக்கு மேல் உள்ளதா?',
      te: 'ఉదయం పూట కీళ్ల బిగుతు 30 నిమిషాలకు పైగా ఉంటుందా?',
      bn: 'সকালে ৩০ মিনিটের বেশি গাঁট শক্ত হয়ে থাকে কি?',
      mr: 'सकाळी सांधे ३० मिनिटांपेक्षा जास्त कडक होतात का?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: true,
    options: [
      {
        id: 'jt_stiff_yes',
        value: 'YES_MORNING_STIFFNESS_AND_SWELLING',
        label: {
          en: 'Yes, severe morning stiffness and swelling (Inflammatory pattern)',
          hi: 'हाँ, सुबह तेज अकड़न व जोड़ों में सूजन रहती है',
          ta: 'ஆம், காலை விறைப்பு மற்றும் வீக்கம் உள்ளது',
          te: 'అవును, ఉదయం బిగుతు మరియు వాపు ఉన్నాయి',
          bn: 'হ্যাঁ, সকালে শক্ত ভাব এবং ফোলা থাকে',
          mr: 'होय, सकाळी कडकपणा आणि सूज असते'
        }
      },
      {
        id: 'jt_stiff_no',
        value: 'NO_SIGNIFICANT_STIFFNESS',
        label: {
          en: 'No morning stiffness; pain worsens after walking or climbing',
          hi: 'सुबह अकड़न नहीं होती; चलने-फिरने पर दर्द बढ़ता है',
          ta: 'இல்லை, நடக்கும் போது மட்டுமே வலி அதிகரிக்கிறது',
          te: 'లేదు, నడిచినప్పుడు మాత్రమే నొప్పి పెరుగుతుంది',
          bn: 'না, হাঁটার পর ব্যথা বাড়ে',
          mr: 'नाही, चालण्याने दुखणे वाढते'
        }
      }
    ]
  },
  // Dynamic Written Symptom Clarification Questions
  {
    id: 'q_written_duration_onset',
    category: 'HPI',
    prompt: {
      en: 'When did these written symptoms begin, and how have they progressed?',
      hi: 'आपके लिखे हुए ये लक्षण कब शुरू हुए, और समय के साथ इनमें क्या बदलाव आया?',
      ta: 'நீங்கள் குறிப்பிட்ட இந்த அறிகுறிகள் எப்போது தொடங்கின?',
      te: 'మీరు పేర్కొన్న ఈ లక్షణాలు ఎప్పుడు ప్రారంభమయ్యాయి?',
      bn: 'আপনার উল্লেখিত উপসর্গগুলি কখন শুরু হয়েছিল?',
      mr: 'तुम्ही नमूद केलेली ही लक्षणे कधी सुरू झाली?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: false,
    options: [
      {
        id: 'wr_dur_acute',
        value: 'ACUTE_UNDER_24_HOURS',
        label: {
          en: 'Sudden onset today (within last 24 hours)',
          hi: 'आज अचानक शुरू हुआ (पिछले 24 घंटों में)',
          ta: 'இன்று திடீரென்று தொடங்கியது',
          te: 'ఈ రోజే అకస్మాత్తుగా మొదలైంది',
          bn: 'আজ হঠাৎ শুরু হয়েছে (গত ২৪ ঘন্টায়)',
          mr: 'आज अचानक सुरू झाले (मागील २४ तासात)'
        }
      },
      {
        id: 'wr_dur_days',
        value: 'FEW_DAYS_GETTING_WORSE',
        label: {
          en: 'Past 2 to 7 days, and getting progressively worse',
          hi: 'पिछले 2 से 7 दिनों से है और धीरे-धीरे बढ़ रहा है',
          ta: 'கடந்த 2-7 நாட்களாக அதிகரித்து வருகிறது',
          te: 'గత 2-7 రోజులుగా క్రమంగా పెరుగుతోంది',
          bn: 'গত ২-৭ দিন ধরে ক্রমশ বাড়ছে',
          mr: 'मागील २-७ दिवसांपासून वाढत आहे'
        }
      },
      {
        id: 'wr_dur_chronic',
        value: 'CHRONIC_WEEKS_OR_MONTHS',
        label: {
          en: 'Longstanding for several weeks or months',
          hi: 'काफी समय से (कई हफ्तों या महीनों से)',
          ta: 'பல வாரங்களாக அல்லது மாதங்களாக',
          te: 'కొన్ని వారాలు లేదా నెలలుగా ఉంది',
          bn: 'কয়েক সপ্তাহ বা মাস ধরে চলছে',
          mr: 'अनेक आठवडे किंवा महिन्यांपासून आहे'
        }
      }
    ]
  },
  {
    id: 'q_written_severity_impact',
    category: 'HPI',
    prompt: {
      en: 'How severely do these symptoms impact your daily activities or sleep?',
      hi: 'इन लक्षणों से आपके दैनिक कामकाज या नींद पर कितना असर पड़ रहा है?',
      ta: 'இந்த அறிகுறிகள் உங்கள் அன்றாட செயல்பாடுகளை எவ்வாறு பாதிக்கின்றன?',
      te: 'ఈ లక్షణాలు మీ రోజువారీ పనులపై ఎంత ప్రభావం చూపుతున్నాయి?',
      bn: 'এই উপসর্গগুলি আপনার দৈনন্দিন কাজ বা ঘুমে কতটা প্রভাব ফেলছে?',
      mr: 'या लक्षणांमुळे तुमच्या दैनंदिन कामावर किंवा झोपेवर किती परिणाम होत आहे?'
    },
    inputType: 'SINGLE_CHOICE',
    skippable: false,
    options: [
      {
        id: 'wr_imp_mild',
        value: 'MILD_MANAGEABLE',
        label: {
          en: 'Mild — Able to carry on routine work with slight discomfort',
          hi: 'हल्का — थोड़ा असहजता है पर रोजमर्रा का काम कर पा रहे हैं',
          ta: 'லேசானது — வழக்கமான வேலைகளைச் செய்ய முடிகிறது',
          te: 'తేలికపాటి — పనులు చేసుకోగలుగుతున్నారు',
          bn: 'সামান্য — কাজ চালিয়ে যেতে পারছেন',
          mr: 'किरकोळ — दैनंदिन कामे चालू ठेवता येतात'
        }
      },
      {
        id: 'wr_imp_mod',
        value: 'MODERATE_INTERRUPTS_WORK',
        label: {
          en: 'Moderate — Difficulty performing job/chores or sleeping peacefully',
          hi: 'मध्यम — काम करने में परेशानी हो रही है और नींद टूट रही है',
          ta: 'மிதமானது — வேலை செய்ய சிரமம், தூக்கம் தடைபடுகிறது',
          te: 'మధ్యస్థ — పనులు చేయడం కష్టం, నిద్రకు భంగం',
          bn: 'মাঝারি — কাজ করতে সমস্যা হচ্ছে',
          mr: 'मध्यम — कामात अडचण येत आहे'
        }
      },
      {
        id: 'wr_imp_severe',
        value: 'SEVERE_BEDRIDDEN',
        label: {
          en: 'Severe — Bedridden or unable to move/eat comfortably (Urgent)',
          hi: 'गंभीर — बिस्तर से उठना या खाना-पीना भी मुश्किल हो गया है',
          ta: 'தீவிரமானது — படுக்கையை விட்டு எழ முடியவில்லை',
          te: 'తీవ్రమైనది — మంచం దిగలేకపోతున్నారు',
          bn: 'তীব্র — বিছানায় পড়ে থাকার মতো অবস্থা',
          mr: 'गंभीर — अंथरुणाला खिळल्यासारखे झाले आहे'
        }
      }
    ]
  },
  // Medications Question
  {
    id: 'q_current_medications',
    category: 'MEDS',
    prompt: {
      en: 'Are you currently taking any daily medicines regularly?',
      hi: 'क्या आप वर्तमान में नियमित रूप से कोई दवाई ले रहे हैं?',
      ta: 'நீங்கள் தற்போது ஏதேனும் மருந்துகளைத் தொடர்ந்து உட்கொள்கிறீர்களா?',
      te: 'మీరు ప్రస్తుతం క్రమం తప్పకుండా ఏవైనా మందులు వాడుతున్నారా?',
      bn: 'আপনি কি বর্তমানে নিয়মিত কোনো ওষুধ খাচ্ছেন?',
      mr: 'तुम्ही सध्या नियमितपणे कोणती औषधे घेत आहात का?'
    },
    inputType: 'MULTI_CHOICE',
    skippable: true,
    options: [
      {
        id: 'med_htn',
        value: 'BP_MEDICINES_AMLODIPINE_TELMISARTAN',
        label: {
          en: 'High Blood Pressure pills (Telmisartan / Amlodipine)',
          hi: 'हाई बीपी की दवा (टेल्मिसार्टन / एम्लोडिपिन)',
          ta: 'ரத்த அழுத்த மாத்திரைகள்',
          te: 'బీపీ మందులు',
          bn: 'রক্তচাপের ওষুধ',
          mr: 'रक्तदाबाची औषधे'
        }
      },
      {
        id: 'med_dm',
        value: 'DIABETES_METFORMIN_INSULIN',
        label: {
          en: 'Diabetes tablets or Insulin (Metformin / Glimepiride)',
          hi: 'शुगर / मधुमेह की गोली या इंसुलिन',
          ta: 'சர்க்கரை நோய் மருந்துகள் / இன்சுலின்',
          te: 'మధుమేహం మందులు లేదా ఇన్సులిన్',
          bn: 'ডায়াবেটিসের ওষুধ বা ইনসুলিন',
          mr: 'मधुमेहाची औषधे किंवा इन्सुलिन'
        }
      },
      {
        id: 'med_thinner',
        value: 'BLOOD_THINNERS_ASPIRIN_CLOPIDOGREL',
        label: {
          en: 'Blood thinners / Heart pills (Aspirin / Clopidogrel / Atorvastatin)',
          hi: 'खून पतला करने या दिल की गोली (एस्पिरिन / इकोस्प्रिन / एटोरवास्टेटिन)',
          ta: 'ரத்தத்தை நீர்க்கச் செய்யும் மருந்துகள் (ஆஸ்பிரின்)',
          te: 'రక్తం పల్చబరిచే మందులు (ఆస్పిరిన్)',
          bn: 'রক্ত পাতলা করার ওষুধ (অ্যাসপিরিন)',
          mr: 'रक्त पातळ करणारी औषधे'
        }
      },
      {
        id: 'med_ayush',
        value: 'AYURVEDIC_HERBAL_REMEDIES',
        label: {
          en: 'Ayurvedic / Homeopathic / Herbal supplements',
          hi: 'आयुर्वेदिक काढ़ा, चूर्ण, या हर्बल सप्लीमेंट्स',
          ta: 'ஆயுர்வேத / சித்த மருந்துகள்',
          te: 'ఆయుర్వేద / మూలికా మందులు',
          bn: 'আয়ুর্বেদিক বা ভেষজ ওষুধ',
          mr: 'आयुर्वेदिक किंवा वनौषधी औषधे'
        }
      },
      {
        id: 'med_none',
        value: 'NO_REGULAR_MEDICATIONS',
        label: {
          en: 'No regular medications taken',
          hi: 'कोई नियमित दवाई नहीं लेते',
          ta: 'வழக்கமான மருந்துகள் எதுவும் இல்லை',
          te: 'ఎటువంటి సాధారణ మందులు వాడటం లేదు',
          bn: 'কোনো নিয়মিত ওষুধ নেই',
          mr: 'कोणतीही नियमित औषधे घेत नाही'
        }
      }
    ]
  }
];

// Helper: Parse written symptoms free-text into matched catalog items, duration, and red-flags
export function parseWrittenSymptoms(text: string, language: LanguageCode = 'en'): {
  matchedSymptoms: SymptomCatalogItem[];
  detectedDuration?: string;
  detectedSeverity?: 'MILD' | 'MODERATE' | 'SEVERE';
  detectedRedFlags: string[];
} {
  if (!text || text.trim() === '') {
    return { matchedSymptoms: [], detectedRedFlags: [] };
  }

  const cleanText = text.toLowerCase();
  const matchedSymptoms: SymptomCatalogItem[] = [];
  const detectedRedFlags: string[] = [];

  // Match against symptom catalog keywords
  for (const item of COMMON_SYMPTOM_CATALOG) {
    const hasMatch = item.keywords.some(kw => cleanText.includes(kw.toLowerCase()));
    if (hasMatch) {
      matchedSymptoms.push(item);
      if (item.isRedFlagWarning && item.redFlagReason) {
        detectedRedFlags.push(item.redFlagReason);
      }
    }
  }

  // Detect duration cues
  let detectedDuration: string | undefined;
  if (/today|आज|morning|सुबह|hours|घंटे|kal se|yesterday/i.test(cleanText)) {
    detectedDuration = 'ACUTE_UNDER_24_HOURS';
  } else if (/days|दिन|din|week|हफ्ता|hafte/i.test(cleanText)) {
    detectedDuration = 'FEW_DAYS';
  } else if (/month|महीने|mahine|saal|year|purana|chronic/i.test(cleanText)) {
    detectedDuration = 'CHRONIC';
  }

  // Detect severity cues
  let detectedSeverity: 'MILD' | 'MODERATE' | 'SEVERE' | undefined;
  if (/severe|tez|bahut|heavy|unbearable|emergency|तीव्र|असहनीय|bhayanak|crushing/i.test(cleanText)) {
    detectedSeverity = 'SEVERE';
  } else if (/mild|halka|thoda|कम|slight/i.test(cleanText)) {
    detectedSeverity = 'MILD';
  } else if (text.length > 5) {
    detectedSeverity = 'MODERATE';
  }

  return {
    matchedSymptoms,
    detectedDuration,
    detectedSeverity,
    detectedRedFlags
  };
}

// Helper: Build Dynamic Clinical Questions tailored specifically to patient's written or chosen symptoms
export function buildDynamicQuestions(input: {
  writtenText?: string;
  selectedSymptomIds?: string[];
  chiefComplaint?: string;
  answers?: Record<string, string | string[]>;
}): QuestionnaireQuestion[] {
  const dynamicList: QuestionnaireQuestion[] = [];
  const allQuestionMap = new Map<string, QuestionnaireQuestion>();
  QUESTIONNAIRE_QUESTIONS.forEach(q => allQuestionMap.set(q.id, q));

  // Determine active categories from written symptoms, chosen tags, or chief complaint
  const activeCategories = new Set<string>();
  const combinedText = `${input.writtenText || ''} ${input.chiefComplaint || ''} ${JSON.stringify(input.selectedSymptomIds || [])}`.toLowerCase();

  // 1. Always start with chief complaint / written symptoms verification if needed
  const qChief = allQuestionMap.get('q_chief_complaint');
  if (qChief) dynamicList.push(qChief);

  // 2. Identify clinical domains from symptoms
  if (
    combinedText.includes('chest') ||
    combinedText.includes('chhati') ||
    combinedText.includes('seene') ||
    combinedText.includes('angina') ||
    combinedText.includes('sym_chest_pain') ||
    input.chiefComplaint === 'CHEST_PAIN'
  ) {
    activeCategories.add('CARDIAC');
  }

  if (
    combinedText.includes('cough') ||
    combinedText.includes('breath') ||
    combinedText.includes('khansi') ||
    combinedText.includes('saans') ||
    combinedText.includes('wheez') ||
    combinedText.includes('sym_shortness_breath') ||
    combinedText.includes('sym_cough') ||
    input.chiefComplaint === 'COUGH_BREATH'
  ) {
    activeCategories.add('RESPIRATORY');
  }

  if (
    combinedText.includes('fever') ||
    combinedText.includes('bukhar') ||
    combinedText.includes('tap') ||
    combinedText.includes('chills') ||
    combinedText.includes('sym_fever') ||
    input.chiefComplaint === 'FEVER'
  ) {
    activeCategories.add('INFECTIOUS');
  }

  if (
    combinedText.includes('stomach') ||
    combinedText.includes('abdomen') ||
    combinedText.includes('pet dard') ||
    combinedText.includes('vomit') ||
    combinedText.includes('ulti') ||
    combinedText.includes('diarrhea') ||
    combinedText.includes('dast') ||
    combinedText.includes('sym_abdominal_pain') ||
    combinedText.includes('sym_vomiting') ||
    combinedText.includes('sym_loose_motion') ||
    input.chiefComplaint === 'ABDOMINAL_PAIN'
  ) {
    activeCategories.add('GASTRO');
  }

  if (
    combinedText.includes('headache') ||
    combinedText.includes('sir dard') ||
    combinedText.includes('sar dard') ||
    combinedText.includes('migraine') ||
    combinedText.includes('dizz') ||
    combinedText.includes('chakkar') ||
    combinedText.includes('sym_headache') ||
    combinedText.includes('sym_dizziness') ||
    input.chiefComplaint === 'HEADACHE_DIZZINESS'
  ) {
    activeCategories.add('NEURO');
  }

  if (
    combinedText.includes('joint') ||
    combinedText.includes('knee') ||
    combinedText.includes('back') ||
    combinedText.includes('ghutne') ||
    combinedText.includes('kamar') ||
    combinedText.includes('jod') ||
    combinedText.includes('sym_joint_pain') ||
    combinedText.includes('sym_back_pain')
  ) {
    activeCategories.add('MUSCULOSKELETAL');
  }

  // Inject tailored domain questions dynamically based on matched categories
  if (activeCategories.has('CARDIAC')) {
    ['q_chest_pain_onset', 'q_chest_pain_radiation', 'q_chest_pain_associated'].forEach(id => {
      const q = allQuestionMap.get(id);
      if (q && !dynamicList.some(item => item.id === id)) dynamicList.push(q);
    });
  }

  if (activeCategories.has('RESPIRATORY')) {
    ['q_resp_cough_type', 'q_resp_breathlessness'].forEach(id => {
      const q = allQuestionMap.get(id);
      if (q && !dynamicList.some(item => item.id === id)) dynamicList.push(q);
    });
  }

  if (activeCategories.has('INFECTIOUS')) {
    ['q_fever_duration'].forEach(id => {
      const q = allQuestionMap.get(id);
      if (q && !dynamicList.some(item => item.id === id)) dynamicList.push(q);
    });
  }

  if (activeCategories.has('GASTRO')) {
    ['q_gi_pain_location', 'q_gi_vomiting_nausea'].forEach(id => {
      const q = allQuestionMap.get(id);
      if (q && !dynamicList.some(item => item.id === id)) dynamicList.push(q);
    });
  }

  if (activeCategories.has('NEURO')) {
    ['q_neuro_onset_quality', 'q_neuro_redflags'].forEach(id => {
      const q = allQuestionMap.get(id);
      if (q && !dynamicList.some(item => item.id === id)) dynamicList.push(q);
    });
  }

  if (activeCategories.has('MUSCULOSKELETAL')) {
    ['q_joint_affected', 'q_joint_stiffness'].forEach(id => {
      const q = allQuestionMap.get(id);
      if (q && !dynamicList.some(item => item.id === id)) dynamicList.push(q);
    });
  }

  // If patient has written custom text and no standard domain caught it or to clarify custom symptom specifics
  if (input.writtenText && input.writtenText.trim().length > 3 && activeCategories.size === 0) {
    ['q_written_duration_onset', 'q_written_severity_impact'].forEach(id => {
      const q = allQuestionMap.get(id);
      if (q && !dynamicList.some(item => item.id === id)) dynamicList.push(q);
    });
  }

  // 3. Core Safety Modules: Past Medical History & Comorbidities
  const qPmh = allQuestionMap.get('q_past_medical');
  if (qPmh && !dynamicList.some(item => item.id === 'q_past_medical')) dynamicList.push(qPmh);

  // 4. Current Medications
  const qMeds = allQuestionMap.get('q_current_medications');
  if (qMeds && !dynamicList.some(item => item.id === 'q_current_medications')) dynamicList.push(qMeds);

  // 5. Drug Allergies
  const qAllergies = allQuestionMap.get('q_allergies');
  if (qAllergies && !dynamicList.some(item => item.id === 'q_allergies')) dynamicList.push(qAllergies);

  // 6. AYUSH assessment if requested or relevant
  if (
    combinedText.includes('ayush') ||
    combinedText.includes('prakriti') ||
    combinedText.includes('dosha') ||
    combinedText.includes('ayurved') ||
    input.chiefComplaint === 'AYUSH_WELLNESS'
  ) {
    const qAyush = allQuestionMap.get('q_ayush_prakriti');
    if (qAyush && !dynamicList.some(item => item.id === 'q_ayush_prakriti')) dynamicList.push(qAyush);
  }

  return dynamicList.length > 0 ? dynamicList : QUESTIONNAIRE_QUESTIONS;
}

// Clinical Rule-based Red Flag Detector
export function detectRedFlags(input: {
  chiefComplaint?: string;
  selectedAnswers?: Record<string, string | string[]>;
  freeText?: string;
  ocrText?: string;
}): RedFlag[] {
  const flags: RedFlag[] = [];
  const textBlob = `${input.chiefComplaint || ''} ${JSON.stringify(input.selectedAnswers || {})} ${input.freeText || ''} ${input.ocrText || ''}`.toLowerCase();

  // Rule 1: Acute Coronary Syndrome (ACS) / Severe Chest Pain
  if (
    (textBlob.includes('chest_pain') || textBlob.includes('chest pain') || textBlob.includes('छाती में दर्द')) &&
    (textBlob.includes('left_arm') || textBlob.includes('jaw') || textBlob.includes('sweat') || textBlob.includes('diaphoresis') || textBlob.includes('shortness_of_breath') || textBlob.includes('सांस'))
  ) {
    flags.push({
      id: `rf_acs_${Date.now()}`,
      patientId: '',
      severity: 'CRITICAL',
      symptom: 'Acute Chest Pain with Radiation / Autonomic Features',
      triggerSource: 'PATIENT_INPUT',
      reason: 'Symptom constellation strongly suggests potential acute myocardial ischemia / Acute Coronary Syndrome (ACS).',
      actionRequired: 'IMMEDIATE TRIAGE ESCALATION: Transfer to Resuscitation/ECG bay within 10 minutes. Oxygen and vitals monitoring.',
      detectedAt: new Date().toISOString(),
      acknowledged: false
    });
  }

  // Rule 2: Acute Neurological Deficit / Stroke (FAST)
  if (
    textBlob.includes('facial droop') ||
    textBlob.includes('slurred speech') ||
    textBlob.includes('weakness in one side') ||
    textBlob.includes('hemiparesis') ||
    textBlob.includes('paralysis') ||
    textBlob.includes('लकवा')
  ) {
    flags.push({
      id: `rf_stroke_${Date.now()}`,
      patientId: '',
      severity: 'CRITICAL',
      symptom: 'Sudden Unilateral Weakness / Slurred Speech (FAST Alert)',
      triggerSource: 'PATIENT_INPUT',
      reason: 'Focal neurological deficit indicative of possible acute ischemic or hemorrhagic stroke within therapeutic window.',
      actionRequired: 'CODE STROKE: Immediate physician evaluation, stat non-contrast Head CT, assess last known normal time.',
      detectedAt: new Date().toISOString(),
      acknowledged: false
    });
  }

  // Rule 3: Severe Respiratory Distress / Stridor
  if (
    textBlob.includes('stridor') ||
    textBlob.includes('gasping for air') ||
    textBlob.includes('blue lips') ||
    textBlob.includes('cyanosis') ||
    textBlob.includes('severe breathing difficulty')
  ) {
    flags.push({
      id: `rf_airway_${Date.now()}`,
      patientId: '',
      severity: 'CRITICAL',
      symptom: 'Impending Airway Compromise / Severe Respiratory Distress',
      triggerSource: 'PATIENT_INPUT',
      reason: 'Hypoxemia / severe respiratory muscle fatigue detected.',
      actionRequired: 'Airway assessment, continuous SpO2, high-flow supplemental oxygen.',
      detectedAt: new Date().toISOString(),
      acknowledged: false
    });
  }

  // Rule 4: Massive Hemorrhage / Hematemesis
  if (
    textBlob.includes('vomiting blood') ||
    textBlob.includes('hematemesis') ||
    textBlob.includes('coughing blood') ||
    textBlob.includes('hemoptysis') ||
    textBlob.includes('खून की उल्टी')
  ) {
    flags.push({
      id: `rf_bleed_${Date.now()}`,
      patientId: '',
      severity: 'HIGH',
      symptom: 'Active Gastrointestinal or Pulmonary Hemorrhage',
      triggerSource: 'PATIENT_INPUT',
      reason: 'Acute blood loss risk requiring volume resuscitation and source control.',
      actionRequired: 'Establish large-bore IV access, type & crossmatch, emergency physician assessment.',
      detectedAt: new Date().toISOString(),
      acknowledged: false
    });
  }

  // Rule 5: Thunderclap Headache / Potential Subarachnoid Hemorrhage
  if (
    textBlob.includes('thunderclap') ||
    textBlob.includes('worst headache') ||
    textBlob.includes('thunderclap_sudden_peak') ||
    textBlob.includes('जीवन का सबसे भयंकर सिरदर्द')
  ) {
    flags.push({
      id: `rf_sah_${Date.now()}`,
      patientId: '',
      severity: 'CRITICAL',
      symptom: 'Sudden Explosive Thunderclap Headache',
      triggerSource: 'PATIENT_INPUT',
      reason: 'Thunderclap pattern carries high clinical probability of acute aneurysmal subarachnoid hemorrhage (SAH).',
      actionRequired: 'Emergency non-contrast head CT within 1 hour; assess need for LP if CT normal.',
      detectedAt: new Date().toISOString(),
      acknowledged: false
    });
  }

  // Rule 6: Syncope / Sudden Loss of Consciousness
  if (
    textBlob.includes('fainting') ||
    textBlob.includes('syncope') ||
    textBlob.includes('blackout') ||
    textBlob.includes('बेहोश') ||
    textBlob.includes('आंखों के आगे अंधेरा')
  ) {
    flags.push({
      id: `rf_syncope_${Date.now()}`,
      patientId: '',
      severity: 'HIGH',
      symptom: 'Transient Loss of Consciousness / Syncope',
      triggerSource: 'PATIENT_INPUT',
      reason: 'Risk of cardiogenic arrhythmia, structural heart disease, or orthostatic collapse.',
      actionRequired: 'Stat 12-lead ECG, orthostatic blood pressure check, cardiac monitor rhythm review.',
      detectedAt: new Date().toISOString(),
      acknowledged: false
    });
  }

  // Rule 7: Severe Allergic Reaction / Anaphylaxis
  if (
    textBlob.includes('throat closing') ||
    textBlob.includes('lip swelling') ||
    textBlob.includes('tongue swelling') ||
    textBlob.includes('anaphylaxis') ||
    textBlob.includes('गले में सूजन')
  ) {
    flags.push({
      id: `rf_anaphylaxis_${Date.now()}`,
      patientId: '',
      severity: 'CRITICAL',
      symptom: 'Impending Airway Anaphylaxis',
      triggerSource: 'PATIENT_INPUT',
      reason: 'Mucosal angioedema with respiratory distress.',
      actionRequired: 'Immediate Intramuscular Epinephrine (1:1000) 0.5mg, IV antihistamines, airway prep.',
      detectedAt: new Date().toISOString(),
      acknowledged: false
    });
  }

  return flags;
}

// Lab Reference Range Catalog
export const LAB_REFERENCE_CATALOG = [
  { testName: 'Hemoglobin (Hb)', unit: 'g/dL', min: 13.0, max: 17.0, criticalLow: 7.0, criticalHigh: 20.0 },
  { testName: 'Glycated Hemoglobin (HbA1c)', unit: '%', min: 4.0, max: 5.6, criticalLow: 3.5, criticalHigh: 10.0 },
  { testName: 'Serum Creatinine', unit: 'mg/dL', min: 0.6, max: 1.2, criticalLow: 0.3, criticalHigh: 3.0 },
  { testName: 'Serum Potassium (K+)', unit: 'mEq/L', min: 3.5, max: 5.1, criticalLow: 2.8, criticalHigh: 6.0 },
  { testName: 'Serum Sodium (Na+)', unit: 'mEq/L', min: 135, max: 145, criticalLow: 120, criticalHigh: 160 },
  { testName: 'Fasting Blood Sugar (FBS)', unit: 'mg/dL', min: 70, max: 99, criticalLow: 50, criticalHigh: 300 },
  { testName: 'Random Blood Sugar (RBS)', unit: 'mg/dL', min: 70, max: 140, criticalLow: 50, criticalHigh: 350 },
  { testName: 'Total Leukocyte Count (TLC)', unit: '/mcL', min: 4000, max: 11000, criticalLow: 2000, criticalHigh: 25000 },
  { testName: 'Platelet Count', unit: '/mcL', min: 150000, max: 450000, criticalLow: 50000, criticalHigh: 1000000 },
  { testName: 'Serum Bilirubin (Total)', unit: 'mg/dL', min: 0.2, max: 1.2, criticalLow: 0.1, criticalHigh: 15.0 },
  { testName: 'SGPT / ALT', unit: 'U/L', min: 7, max: 56, criticalLow: 0, criticalHigh: 500 },
];

export function evaluateLabValue(testName: string, numericValue: number): { status: 'NORMAL' | 'LOW' | 'HIGH' | 'CRITICAL'; referenceRange: string; interpretation: string } {
  const matched = LAB_REFERENCE_CATALOG.find(c => testName.toLowerCase().includes(c.testName.toLowerCase().split(' ')[0]));
  if (!matched) {
    return {
      status: 'NORMAL',
      referenceRange: 'Standard laboratory reference',
      interpretation: 'Refer to institutional laboratory manual'
    };
  }

  const rangeStr = `${matched.min} - ${matched.max} ${matched.unit}`;
  if (numericValue <= matched.criticalLow) {
    return {
      status: 'CRITICAL',
      referenceRange: rangeStr,
      interpretation: `Critical Low alert: Value ${numericValue} ${matched.unit} is severely below lower threshold (${matched.min} ${matched.unit}). Physician review mandated.`
    };
  }
  if (numericValue >= matched.criticalHigh) {
    return {
      status: 'CRITICAL',
      referenceRange: rangeStr,
      interpretation: `Critical High alert: Value ${numericValue} ${matched.unit} exceeds critical threshold (${matched.criticalHigh} ${matched.unit}). Physician review mandated.`
    };
  }
  if (numericValue < matched.min) {
    return {
      status: 'LOW',
      referenceRange: rangeStr,
      interpretation: `Sub-normal value: ${numericValue} ${matched.unit} is below reference range (${matched.min} - ${matched.max} ${matched.unit}).`
    };
  }
  if (numericValue > matched.max) {
    return {
      status: 'HIGH',
      referenceRange: rangeStr,
      interpretation: `Elevated value: ${numericValue} ${matched.unit} exceeds standard reference range (${matched.min} - ${matched.max} ${matched.unit}).`
    };
  }
  return {
    status: 'NORMAL',
    referenceRange: rangeStr,
    interpretation: `Within standard reference range (${matched.min} - ${matched.max} ${matched.unit}).`
  };
}

// Known Drug-Drug Interactions Catalog
export const DRUG_INTERACTION_RULES: {
  drug1Regex: RegExp;
  drug2Regex: RegExp;
  severity: 'LOW' | 'MODERATE' | 'HIGH';
  clinicalEffect: string;
  recommendation: string;
}[] = [
  {
    drug1Regex: /clopidogrel/i,
    drug2Regex: /omeprazole|esomeprazole/i,
    severity: 'HIGH',
    clinicalEffect: 'Omeprazole inhibits CYP2C19 bioactivation of Clopidogrel, reducing antiplatelet efficacy and increasing thrombotic/stent risk.',
    recommendation: 'Switch proton pump inhibitor to Pantoprazole or Rabeprazole which has minimal CYP2C19 inhibition.'
  },
  {
    drug1Regex: /metformin/i,
    drug2Regex: /contrast|iohexol|iopamidol/i,
    severity: 'HIGH',
    clinicalEffect: 'Risk of contrast-induced acute nephropathy precipitating severe Metformin-associated lactic acidosis.',
    recommendation: 'Withhold Metformin at time of or prior to iodinated radiocontrast procedure; restart 48h after eGFR confirmation.'
  },
  {
    drug1Regex: /atorvastatin|simvastatin/i,
    drug2Regex: /clarithromycin|erythromycin/i,
    severity: 'HIGH',
    clinicalEffect: 'Potent CYP3A4 inhibition elevates statin serum levels by 4- to 10-fold, sharply increasing rhabdomyolysis risk.',
    recommendation: 'Temporarily withhold statin therapy during course of macrolide antibiotic or substitute Azithromycin.'
  },
  {
    drug1Regex: /warfarin|acenocoumarol/i,
    drug2Regex: /aspirin|ibuprofen|diclofenac|naproxen/i,
    severity: 'HIGH',
    clinicalEffect: 'Synergistic bleeding risk and mucosal ulceration; significant elevation of major gastrointestinal hemorrhage.',
    recommendation: 'Avoid systemic NSAIDs; use Paracetamol for analgesia or monitor INR tightly with gastroprotection.'
  },
  {
    drug1Regex: /ramipril|enalapril|losartan|telmisartan/i,
    drug2Regex: /spironolactone|potassium chloride/i,
    severity: 'MODERATE',
    clinicalEffect: 'Dual potassium-sparing mechanisms lead to clinically dangerous hyperkalemia (> 5.5 mEq/L).',
    recommendation: 'Serial serum potassium and creatinine monitoring within 1-2 weeks of concurrent prescription.'
  },
  {
    drug1Regex: /guggulu|ayurvedic guggul/i,
    drug2Regex: /aspirin|warfarin|clopidogrel/i,
    severity: 'MODERATE',
    clinicalEffect: 'Herbal Commiphora mukul (Guggulu) exhibits intrinsic mild antiplatelet activity, potential bleeding synergy.',
    recommendation: 'Document dual allopathic-AYUSH intake; observe for subcutaneous bruising or epistaxis.'
  }
];

export function checkMedicationInteractions(medications: string[]): MedicationInteraction[] {
  const interactions: MedicationInteraction[] = [];
  const medStringList = medications.map(m => m.trim().toLowerCase());

  for (let i = 0; i < medStringList.length; i++) {
    for (let j = i + 1; j < medStringList.length; j++) {
      const m1 = medStringList[i];
      const m2 = medStringList[j];

      for (const rule of DRUG_INTERACTION_RULES) {
        if (
          (rule.drug1Regex.test(m1) && rule.drug2Regex.test(m2)) ||
          (rule.drug1Regex.test(m2) && rule.drug2Regex.test(m1))
        ) {
          interactions.push({
            id: `int_${Date.now()}_${i}_${j}`,
            drug1: medications[i],
            drug2: medications[j],
            severity: rule.severity,
            clinicalEffect: rule.clinicalEffect,
            recommendation: rule.recommendation
          });
        }
      }
    }
  }

  return interactions;
}
