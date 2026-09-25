// Comprehensive Multilingual Translation Catalog for Bharat Arogya
// Full parity across 6 languages: English (en), Hindi (hi), Tamil (ta), Telugu (te), Bengali (bn), Marathi (mr)

import { LanguageCode } from '../types';

export interface Translations {
  nav: {
    brandName: string;
    brandSubtitle: string;
    platformInfo: string;
    login: string;
    getStarted: string;
    logout: string;
    roleAuth: string;
    resetKiosk: string;
    clinicalHistory: string;
    scanOcr: string;
    caseSummary: string;
    healthTimeline: string;
    doctorQueue: string;
    physicianReview: string;
    labOrders: string;
    pharmacyDispense: string;
    triageDashboard: string;
    hospitalAnalytics: string;
    auditLogs: string;
    activeRole: string;
    switchRole: string;
    signedInAs: string;
  };
  accessibility: {
    languageLabel: string;
    highContrast: string;
    audioOn: string;
    audioOff: string;
    kioskActive: string;
    desktopView: string;
    demoMode: string;
    audioEnabledSpoken: string;
    audioDisabledSpoken: string;
  };
  publicSite: {
    abdmStrip: string;
    privacy: string;
    fhir: string;
    bhashini: string;
    heroBadge: string;
    heroTitle: string;
    heroDesc: string;
    patientLoginBtn: string;
    doctorLoginBtn: string;
    launchKioskBtn: string;
    fasterStat: string;
    fasterLabel: string;
    languagesStat: string;
    languagesLabel: string;
    alertStat: string;
    alertLabel: string;
    abdmStat: string;
    abdmLabel: string;
    rolesSectionBadge: string;
    rolesSectionTitle: string;
    rolesSectionDesc: string;
    featuresBadge: string;
    featuresTitle: string;
    ctaHeading: string;
    ctaSubtitle: string;
  };
  kioskWelcome: {
    title: string;
    subtitle: string;
    step1Badge: string;
    step1Title: string;
    continueBtn: string;
    step2Badge: string;
    step2Title: string;
    step2Subtitle: string;
    abhaLabel: string;
    getOtpBtn: string;
    connectingAbdm: string;
    enterOtpLabel: string;
    verifyOtpBtn: string;
    verifiedNotice: string;
    skipWalkIn: string;
    step3Badge: string;
    step3Title: string;
    purposeLabel: string;
    purposeText: string;
    securityLabel: string;
    securityText: string;
    revokeLabel: string;
    revokeText: string;
    consentAgreeBtn: string;
    consentDeclineBtn: string;
    welcomePatient: string;
    tokenLabel: string;
    opdLabel: string;
    readyMessage: string;
    startInterviewBtn: string;
  };
  historyEngine: {
    questionLabel: string;
    ofLabel: string;
    listen: string;
    selectMultiPrompt: string;
    selectSinglePrompt: string;
    voiceSectionTitle: string;
    voiceSectionDesc: string;
    startVoiceBtn: string;
    stopVoiceBtn: string;
    listeningAlert: string;
    speakPromptPlaceholder: string;
    writePromptPlaceholder: string;
    testPhrasesLabel: string;
    editSymptomsBtn: string;
    backBtn: string;
    nextQuestionBtn: string;
    submitIntakeBtn: string;
  };
  roleAuth: {
    title: string;
    subtitle: string;
    patientTab: string;
    doctorTab: string;
    labTab: string;
    pharmTab: string;
    abhaNumberLabel: string;
    requestOtpBtn: string;
    enterOtpLabel: string;
    verifyPatientBtn: string;
    demoPatientHelper: string;
    doctorRegLabel: string;
    doctorPinLabel: string;
    doctorLoginBtn: string;
    labIdLabel: string;
    labDeptLabel: string;
    labLoginBtn: string;
    pharmLicenseLabel: string;
    pharmCounterLabel: string;
    pharmLoginBtn: string;
    cancelBtn: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    nav: {
      brandName: 'Bharat Arogya',
      brandSubtitle: 'AI Clinical Case-Taking',
      platformInfo: 'Platform Info',
      login: 'Sign In',
      getStarted: 'Get Started',
      logout: 'Sign Out',
      roleAuth: 'Portal Access',
      resetKiosk: 'Reset Kiosk Session',
      clinicalHistory: '1. Clinical History',
      scanOcr: '2. Scan Documents',
      caseSummary: '3. Case Summary',
      healthTimeline: 'Health Records & ABHA',
      doctorQueue: 'OPD Patient Queue',
      physicianReview: 'Physician Case Review',
      labOrders: 'Diagnostic Lab Orders',
      pharmacyDispense: 'Hospital Dispensary',
      triageDashboard: 'Red-Flag Emergency Triage',
      hospitalAnalytics: 'Hospital OPD Analytics',
      auditLogs: 'DPDP Audit Logs',
      activeRole: 'Active Role',
      switchRole: 'Switch Role',
      signedInAs: 'Signed in as'
    },
    accessibility: {
      languageLabel: 'Language:',
      highContrast: 'High Contrast',
      audioOn: 'Audio ON',
      audioOff: 'Audio OFF',
      kioskActive: 'Kiosk Active',
      desktopView: 'Desktop View',
      demoMode: 'ABDM / Bhashini Demo Mode',
      audioEnabledSpoken: 'Audio assistance enabled. Prompts will now be read aloud.',
      audioDisabledSpoken: 'Audio guidance turned off.'
    },
    publicSite: {
      abdmStrip: 'Ayushman Bharat Digital Mission (ABDM) • National Health Authority Level-3 Compliant',
      privacy: 'DPDP Act 2023 Sovereign Privacy',
      fhir: 'FHIR v4 Certified',
      bhashini: 'Bhashini Multilingual AI',
      heroBadge: 'National Unified Healthcare Platform • Bharat Arogya',
      heroTitle: 'Unified AI Clinical Intake, Dynamic History & ABDM Health Platform',
      heroDesc: 'Engineered for Indian OPDs, Primary Health Centers (PHCs), District Hospitals, and Medical Colleges. Enabling multilingual voice intake in 6 regional languages, automated red-flag triage, and physician-supervised clinical summaries.',
      patientLoginBtn: 'Patient Portal (ABHA Login)',
      doctorLoginBtn: 'Doctor & Clinical Login',
      launchKioskBtn: 'Get Started (OPD Intake)',
      fasterStat: '70% Faster',
      fasterLabel: 'OPD Registration & Triage',
      languagesStat: '6 Languages',
      languagesLabel: 'Bhashini Multilingual Voice',
      alertStat: '< 30 Seconds',
      alertLabel: 'Emergency Red-Flag Alert',
      abdmStat: '100% ABDM',
      abdmLabel: 'M1, M2 & M3 Certified',
      rolesSectionBadge: 'Integrated Clinical Portals',
      rolesSectionTitle: 'One Unified Platform for the Entire Care Continuum',
      rolesSectionDesc: 'Tailored workflows for hospital stakeholders with granular DPDP Act 2023 consent architecture.',
      featuresBadge: 'Next-Gen Capabilities',
      featuresTitle: 'Built for High-Volume Indian Public & Private Hospitals',
      ctaHeading: 'Ready to Transform Hospital OPD Intake?',
      ctaSubtitle: 'Experience the AI-powered clinical history platform built for the Ayushman Bharat Digital Mission.'
    },
    kioskWelcome: {
      title: 'Bharat Arogya — Patient Self-Registration & Clinical Case Intake',
      subtitle: 'Record your symptoms simply before meeting your OPD physician.',
      step1Badge: 'Step 1: Select Language',
      step1Title: 'Please select your preferred language:',
      continueBtn: 'Continue',
      step2Badge: 'Step 2: ABHA Verification',
      step2Title: 'Enter your ABHA Number or Mobile:',
      step2Subtitle: '(Enter your 14-digit ABHA Number or Mobile. Demo data pre-filled)',
      abhaLabel: 'ABHA ID / Mobile Number:',
      getOtpBtn: 'Get Mobile OTP',
      connectingAbdm: 'Connecting to ABDM...',
      enterOtpLabel: 'Enter 6-Digit OTP (Demo OTP: 123456):',
      verifyOtpBtn: 'Verify OTP & Link ABHA Record',
      verifiedNotice: 'ABHA Verified & Linked to Aadhaar KYC',
      skipWalkIn: 'Skip / Continue as Walk-In OPD Patient →',
      step3Badge: 'Step 3: Patient Consent (DPDP Act 2023)',
      step3Title: 'Health Data Collection & Processing Consent',
      purposeLabel: 'Purpose:',
      purposeText: 'To securely transfer your current illness, past medications, and lab reports to your OPD consulting physician.',
      securityLabel: 'Data Security:',
      securityText: 'Your health records are sovereignly encrypted and accessible only by your designated attending clinician.',
      revokeLabel: 'Revocation:',
      revokeText: 'You may withdraw this clinical consent at any time via your ABHA health locker.',
      consentAgreeBtn: 'I Consent & Agree',
      consentDeclineBtn: 'Decline',
      welcomePatient: 'Welcome',
      tokenLabel: 'Token Number',
      opdLabel: 'Assigned OPD Clinic',
      readyMessage: 'We will now ask a few simple questions about your current health condition. You can answer by speaking in your language or touching buttons on the screen.',
      startInterviewBtn: 'Start Clinical Interview'
    },
    historyEngine: {
      questionLabel: 'Question',
      ofLabel: 'of',
      listen: 'Listen',
      selectMultiPrompt: 'Select all options that apply to you',
      selectSinglePrompt: 'Select an option, write or speak below',
      voiceSectionTitle: 'Voice or Written Answer',
      voiceSectionDesc: 'Speak directly in your language or write specific details for this question.',
      startVoiceBtn: 'Start Voice',
      stopVoiceBtn: 'Stop Listening',
      listeningAlert: 'Listening now in your chosen language... Please speak clearly',
      speakPromptPlaceholder: 'Speak your symptoms in your preferred language...',
      writePromptPlaceholder: 'If you want to add more details, type or speak here... (e.g. onset, severity, what makes it worse)',
      testPhrasesLabel: 'Quick Spoken Testing Samples (Click to simulate speech):',
      editSymptomsBtn: 'Edit Symptoms',
      backBtn: 'Back',
      nextQuestionBtn: 'Next Question',
      submitIntakeBtn: 'Submit Intake to Doctor'
    },
    roleAuth: {
      title: 'Secure Clinical Authentication & ABHA Access',
      subtitle: 'Ayushman Bharat Digital Mission (ABDM) Gateway & Hospital Staff SSO',
      patientTab: 'Patient (ABHA)',
      doctorTab: 'Doctor OPD',
      labTab: 'Lab Technician',
      pharmTab: 'Pharmacist',
      abhaNumberLabel: 'ABHA ID / Mobile Number',
      requestOtpBtn: 'Send ABDM OTP',
      enterOtpLabel: '6-Digit Aadhaar OTP',
      verifyPatientBtn: 'Verify OTP & Access Records',
      demoPatientHelper: 'Pre-filled demo credentials ready for instant verification',
      doctorRegLabel: 'Medical Council Registration (MCI/NMC)',
      doctorPinLabel: 'Consultant Clinical PIN',
      doctorLoginBtn: 'Physician Sign In',
      labIdLabel: 'Lab Technician Credential ID',
      labDeptLabel: 'Laboratory Section',
      labLoginBtn: 'Sign In to Diagnostic Laboratory',
      pharmLicenseLabel: 'Registered Pharmacist License',
      pharmCounterLabel: 'OPD Dispensary Station',
      pharmLoginBtn: 'Sign In to Pharmacy',
      cancelBtn: 'Close'
    }
  },
  hi: {
    nav: {
      brandName: 'भारत आरोग्य',
      brandSubtitle: 'एआई क्लिनिकल हिस्ट्री प्लेटफॉर्म',
      platformInfo: 'प्लेटफॉर्म जानकारी',
      login: 'लॉगिन करें',
      getStarted: 'शुरू करें',
      logout: 'लॉगआउट',
      roleAuth: 'पोर्टल एक्सेस',
      resetKiosk: 'सत्र रीसेट करें',
      clinicalHistory: '1. क्लिनिकल इतिहास',
      scanOcr: '2. दस्तावेज स्कैन',
      caseSummary: '3. केस सारांश',
      healthTimeline: 'स्वास्थ्य रिकॉर्ड व आभा',
      doctorQueue: 'ओपीडी मरीज कतार',
      physicianReview: 'चिकित्सक केस समीक्षा',
      labOrders: 'डायग्नोस्टिक लैब ऑर्डर्स',
      pharmacyDispense: 'अस्पताल दवाखाना',
      triageDashboard: 'इमरजेंसी रेड-फ्लैग ट्राइएज',
      hospitalAnalytics: 'अस्पताल एनालिटिक्स',
      auditLogs: 'डीपीडीपी ऑडिट लॉग्स',
      activeRole: 'सक्रिय भूमिका',
      switchRole: 'भूमिका बदलें',
      signedInAs: 'लॉग इन किया गया:'
    },
    accessibility: {
      languageLabel: 'भाषा:',
      highContrast: 'हाई कंट्रास्ट',
      audioOn: 'ऑडियो चालू',
      audioOff: 'ऑडियो बंद',
      kioskActive: 'कियोस्क सक्रिय',
      desktopView: 'डेस्कटॉप दृश्य',
      demoMode: 'आभा / भाषिणी डेमो मोड',
      audioEnabledSpoken: 'ऑडियो सहायता चालू कर दी गई है। सवाल अब बोलकर सुनाए जाएंगे।',
      audioDisabledSpoken: 'ऑडियो मार्गदर्शन बंद कर दिया गया है।'
    },
    publicSite: {
      abdmStrip: 'आयुष्मान भारत डिजिटल मिशन (ABDM) • राष्ट्रीय स्वास्थ्य प्राधिकरण स्तर-3 अनुपालन',
      privacy: 'डीपीडीपी अधिनियम 2023 संप्रभु गोपनीयता',
      fhir: 'एफएचआईआर v4 प्रमाणित',
      bhashini: 'भाषिणी बहुभाषी एआई',
      heroBadge: 'राष्ट्रीय एकीकृत स्वास्थ्य सेवा मंच • भारत आरोग्य',
      heroTitle: 'एकीकृत एआई क्लिनिकल इनटेक, गतिशील इतिहास और आभा स्वास्थ्य मंच',
      heroDesc: 'भारतीय ओपीडी, प्राथमिक स्वास्थ्य केंद्रों (PHC), जिला अस्पतालों और मेडिकल कॉलेजों के लिए विकसित। 6 क्षेत्रीय भाषाओं में आवाज इनटेक, स्वचालित रेड-फ्लैग ट्राइएज और डॉक्टर-पर्यवेक्षित केस सारांश की सुविधा।',
      patientLoginBtn: 'मरीज पोर्टल (आभा लॉगिन)',
      doctorLoginBtn: 'डॉक्टर एवं क्लिनिकल लॉगिन',
      launchKioskBtn: 'शुरू करें (ओपीडी कियोस्क)',
      fasterStat: '70% तेज',
      fasterLabel: 'ओपीडी पंजीकरण एवं ट्राइएज',
      languagesStat: '6 भाषाएं',
      languagesLabel: 'भाषिणी बहुभाषी आवाज प्रणाली',
      alertStat: '< 30 सेकंड',
      alertLabel: 'आपातकालीन रेड-फ्लैग चेतावनी',
      abdmStat: '100% आभा',
      abdmLabel: 'एम1, एम2 व एम3 प्रमाणित',
      rolesSectionBadge: 'एकीकृत क्लिनिकल भूमिकाएं',
      rolesSectionTitle: 'संपूर्ण स्वास्थ्य सेवा के लिए एक एकीकृत मंच',
      rolesSectionDesc: 'डीपीडीपी अधिनियम 2023 सहमति वास्तुकला के साथ अस्पताल हितधारकों के लिए अनुकूलित कार्यप्रवाह।',
      featuresBadge: 'अत्याधुनिक क्षमताएं',
      featuresTitle: 'उच्च मरीज भार वाले भारतीय अस्पतालों के लिए विशेष रूप से निर्मित',
      ctaHeading: 'क्या आप अस्पताल ओपीडी इनटेक बदलने के लिए तैयार हैं?',
      ctaSubtitle: 'आयुष्मान भारत डिजिटल मिशन के अनुरूप एआई क्लिनिकल इतिहास मंच का अनुभव करें।'
    },
    kioskWelcome: {
      title: 'भारत आरोग्य — मरीज स्व-पंजीकरण एवं क्लिनिकल केस इनटेक',
      subtitle: 'अस्पताल ओपीडी में डॉक्टर से मिलने से पहले अपनी बीमारी की जानकारी यहाँ सरलता से दर्ज करें।',
      step1Badge: 'चरण 1: भाषा चुनें',
      step1Title: 'कृपया अपनी पसंदीदा भाषा चुनें:',
      continueBtn: 'आगे बढ़ें',
      step2Badge: 'चरण 2: आभा सत्यापन',
      step2Title: 'अपना आभा नंबर या मोबाइल दर्ज करें:',
      step2Subtitle: '(अपना 14 अंकों का आभा नंबर या मोबाइल दर्ज करें। डेमो डेटा पहले से भरा है)',
      abhaLabel: 'आभा आईडी / मोबाइल नंबर:',
      getOtpBtn: 'मोबाइल ओटीपी प्राप्त करें',
      connectingAbdm: 'आभा गेटवे से कनेक्ट हो रहा है...',
      enterOtpLabel: '6 अंकों का ओटीपी दर्ज करें (डेमो: 123456):',
      verifyOtpBtn: 'ओटीपी सत्यापित करें एवं रिकॉर्ड जोड़ें',
      verifiedNotice: 'आभा सत्यापित एवं आधार केवाईसी से लिंक',
      skipWalkIn: 'छोड़ें / वॉक-इन ओपीडी मरीज के रूप में आगे बढ़ें →',
      step3Badge: 'चरण 3: मरीज सहमति (डीपीडीपी 2023)',
      step3Title: 'स्वास्थ्य डेटा संग्रह और प्रसंस्करण सहमति',
      purposeLabel: 'उद्देश्य:',
      purposeText: 'आपकी वर्तमान बीमारी, पूर्व दवाइयाँ और लैब रिपोर्ट को सुरक्षित रूप से डॉक्टर के पास ओपीडी कक्ष में पहुँचाने हेतु।',
      securityLabel: 'डेटा सुरक्षा:',
      securityText: 'आपकी जानकारी पूरी तरह एन्क्रिप्टेड है और केवल आपके परामर्श करने वाले डॉक्टर द्वारा ही देखी जा सकती है।',
      revokeLabel: 'सहमति वापसी:',
      revokeText: 'आप किसी भी समय अपने आभा लॉकर से अपनी सहमति वापस ले सकते हैं।',
      consentAgreeBtn: 'मैं सहमत हूँ',
      consentDeclineBtn: 'अस्वीकार करें',
      welcomePatient: 'स्वागत है',
      tokenLabel: 'टोकन संख्या',
      opdLabel: 'विभागीय ओपीडी',
      readyMessage: 'अब हम आपसे आपकी वर्तमान बीमारी के बारे में कुछ आसान सवाल पूछेंगे। आप अपनी भाषा में बोलकर या स्क्रीन पर बटन दबाकर उत्तर दे सकते हैं।',
      startInterviewBtn: 'बातचीत शुरू करें'
    },
    historyEngine: {
      questionLabel: 'सवाल',
      ofLabel: 'का',
      listen: 'सुनें',
      selectMultiPrompt: 'आप एक से अधिक विकल्प चुन सकते हैं',
      selectSinglePrompt: 'कृपया एक विकल्प चुनें या नीचे बोलकर / लिखकर उत्तर दें',
      voiceSectionTitle: 'आवाज या लिखकर उत्तर दें',
      voiceSectionDesc: 'सीधे अपनी भाषा में बोलें या इस प्रश्न के लिए विवरण लिखें।',
      startVoiceBtn: 'माइक शुरू करें',
      stopVoiceBtn: 'रिकॉर्डिंग बंद करें',
      listeningAlert: 'सुन रहा हूँ... कृपया स्पष्ट बोलिए',
      speakPromptPlaceholder: 'अपनी समस्या विस्तार से बताएं...',
      writePromptPlaceholder: 'यदि आप कुछ और बताना चाहते हैं तो यहाँ लिखें या बोलें... (जैसे कब शुरू हुआ, कितना दर्द है)',
      testPhrasesLabel: 'त्वरित बोलकर जाँचें (नमूने पर क्लिक करें):',
      editSymptomsBtn: 'लक्षण बदलें',
      backBtn: 'पीछे',
      nextQuestionBtn: 'आगे बढ़ें',
      submitIntakeBtn: 'इतिहास डॉक्टर को भेजें'
    },
    roleAuth: {
      title: 'सुरक्षित क्लिनिकल प्रमाणीकरण एवं आभा एक्सेस',
      subtitle: 'आयुष्मान भारत डिजिटल मिशन (ABDM) गेटवे एवं अस्पताल स्टाफ लॉगिन',
      patientTab: 'मरीज (आभा)',
      doctorTab: 'डॉक्टर ओपीडी',
      labTab: 'लैब तकनीशियन',
      pharmTab: 'फार्मासिस्ट',
      abhaNumberLabel: 'आभा आईडी / मोबाइल नंबर',
      requestOtpBtn: 'ओटीपी भेजें',
      enterOtpLabel: '6 अंकों का आधार ओटीपी',
      verifyPatientBtn: 'सत्यापित करें व रिकॉर्ड देखें',
      demoPatientHelper: 'त्वरित सत्यापन के लिए डेमो क्रेडेंशियल पहले से मौजूद',
      doctorRegLabel: 'मेडिकल काउंसिल पंजीकरण (MCI/NMC)',
      doctorPinLabel: 'कंसल्टेंट क्लिनिकल पिन',
      doctorLoginBtn: 'डॉक्टर साइन इन',
      labIdLabel: 'लैब तकनीशियन आईडी',
      labDeptLabel: 'प्रयोगशाला अनुभाग',
      labLoginBtn: 'प्रयोगशाला पोर्टल में साइन इन करें',
      pharmLicenseLabel: 'पंजीकृत फार्मासिस्ट लाइसेंस',
      pharmCounterLabel: 'ओपीडी वितरण काउंटर',
      pharmLoginBtn: 'फार्मेसी में साइन इन करें',
      cancelBtn: 'बंद करें'
    }
  },
  ta: {
    nav: {
      brandName: 'பாரத் ஆரோக்கியா',
      brandSubtitle: 'AI மருத்துவ வரலாற்று தளம்',
      platformInfo: 'தள தகவல்',
      login: 'உள்நுழைக',
      getStarted: 'தொடங்குங்கள்',
      logout: 'வெளியேறு',
      roleAuth: 'போர்டல் அணுகல்',
      resetKiosk: 'கியோஸ்க் மீட்டமைக்க',
      clinicalHistory: '1. மருத்துவ வரலாறு',
      scanOcr: '2. ஆவண ஸ்கேன்',
      caseSummary: '3. வழக்கு சுருக்கம்',
      healthTimeline: 'சுகாதார பதிவுகள் & ABHA',
      doctorQueue: 'OPD நோயாளி வரிசை',
      physicianReview: 'மருத்துவர் வழக்கு ஆய்வு',
      labOrders: 'ஆய்வக ஆர்டர்கள்',
      pharmacyDispense: 'மருந்தகம் & விநியோகம்',
      triageDashboard: 'அவசர சிகிச்சை பிரிவு',
      hospitalAnalytics: 'மருத்துவமனை பகுப்பாய்வு',
      auditLogs: 'DPDP தணிக்கை பதிவுகள்',
      activeRole: 'செயலில் உள்ள பங்கு',
      switchRole: 'பங்கு மாற்றுக',
      signedInAs: 'உள்நுழைந்துள்ளவர்:'
    },
    accessibility: {
      languageLabel: 'மொழி:',
      highContrast: 'அதிக மாறுபாடு',
      audioOn: 'ஆடியோ ஆன்',
      audioOff: 'ஆடியோ ஆஃப்',
      kioskActive: 'கியோஸ்க் செயலில்',
      desktopView: 'டெஸ்க்டாப் பார்வை',
      demoMode: 'ABDM / பாஷினி டெமோ பயன்முறை',
      audioEnabledSpoken: 'ஆடியோ உதவி இயக்கப்பட்டது. கேள்விகள் இப்போது சத்தமாக வாசிக்கப்படும்.',
      audioDisabledSpoken: 'ஆடியோ வழிகாட்டுதல் அணைக்கப்பட்டது.'
    },
    publicSite: {
      abdmStrip: 'ஆயுஷ்மான் பாரத் டிஜிட்டல் மிஷன் (ABDM) • நிலை-3 இணக்கம்',
      privacy: 'DPDP சட்டம் 2023 தனியுரிமை',
      fhir: 'FHIR v4 சான்றளிக்கப்பட்டது',
      bhashini: 'பாஷினி பலமொழி AI',
      heroBadge: 'தேசிய ஒருங்கிணைந்த சுகாதார தளம் • பாரத் ஆரோக்கியா',
      heroTitle: 'ஒருங்கிணைந்த AI மருத்துவ பதிவு, வரலாறு & ABDM சுகாதார தளம்',
      heroDesc: 'இந்திய OPD-கள், ஆரம்ப சுகாதார நிலையங்கள் (PHC), மாவட்ட மருத்துவமனைகள் மற்றும் மருத்துவக் கல்லூரிகளுக்காக வடிவமைக்கப்பட்டது. 6 பிராந்திய மொழிகளில் குரல் பதிவு மற்றும் அவசர சிகிச்சை எச்சரிக்கை.',
      patientLoginBtn: 'நோயாளி போர்டல் (ABHA உள்நுழைவு)',
      doctorLoginBtn: 'மருத்துவர் & மருத்துவ உள்நுழைவு',
      launchKioskBtn: 'தொடங்குங்கள் (OPD கியோஸ்க்)',
      fasterStat: '70% விரைவு',
      fasterLabel: 'OPD பதிவு & ட்ரையேஜ்',
      languagesStat: '6 மொழிகள்',
      languagesLabel: 'பாஷினி பலமொழி குரல் அமைப்பு',
      alertStat: '< 30 வினாடிகள்',
      alertLabel: 'அவசர சிகிச்சை எச்சரிக்கை',
      abdmStat: '100% ABDM',
      abdmLabel: 'M1, M2 & M3 சான்றளிக்கப்பட்டது',
      rolesSectionBadge: 'ஒருங்கிணைந்த மருத்துவ பாத்திரங்கள்',
      rolesSectionTitle: 'முழுமையான சிகிச்சைக்கான ஒரே தளம்',
      rolesSectionDesc: 'மருத்துவமனை பணியாளர்களுக்கான பிரத்யேக பணிப்பாய்வு மற்றும் DPDP 2023 பாதுகாப்பு.',
      featuresBadge: 'மேம்பட்ட தொழில்நுட்பம்',
      featuresTitle: 'அதிக மக்கள் தொகை கொண்ட இந்திய மருத்துவமனைகளுக்காக உருவாக்கப்பட்டது',
      ctaHeading: 'மருத்துவமனை OPD பதிவை மாற்ற தயாரா?',
      ctaSubtitle: 'ஆயுஷ்மான் பாரத் டிஜிட்டல் மிஷன் சார்ந்த AI மருத்துவ வரலாற்று தளத்தை அனுபவியுங்கள்.'
    },
    kioskWelcome: {
      title: 'பாரத் ஆரோக்கியா — நோயாளி பதிவு மற்றும் மருத்துவ வழக்கு பதிவு',
      subtitle: 'மருத்துவரை சந்திப்பதற்கு முன் உங்கள் நோய் அறிகுறிகளை இங்கு எளிதாக பதிவு செய்யுங்கள்.',
      step1Badge: 'படி 1: மொழியைத் தேர்ந்தெடுக்கவும்',
      step1Title: 'தயவுசெய்து உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்:',
      continueBtn: 'தொடரவும்',
      step2Badge: 'படி 2: ABHA சரிபார்ப்பு',
      step2Title: 'உங்கள் ABHA எண் அல்லது மொபைல் எண்ணை உள்ளிடவும்:',
      step2Subtitle: '(உங்கள் 14 இலக்க ABHA எண் அல்லது மொபைலை உள்ளிடவும். டெமோ தரவு நிரப்பப்பட்டுள்ளது)',
      abhaLabel: 'ABHA ஐடி / மொபைல் எண்:',
      getOtpBtn: 'மொபைல் OTP பெறுக',
      connectingAbdm: 'ABDM உடன் இணைகிறது...',
      enterOtpLabel: '6 இலக்க OTP ஐ உள்ளிடவும் (டெமோ: 123456):',
      verifyOtpBtn: 'OTP சரிபார்த்து பதிவை இணைக்கவும்',
      verifiedNotice: 'ABHA சரிபார்க்கப்பட்டு ஆதார் KYC உடன் இணைக்கப்பட்டது',
      skipWalkIn: 'தவிர் / பொது OPD நோயாளியாக தொடரவும் →',
      step3Badge: 'படி 3: நோயாளி ஒப்புதல் (DPDP 2023)',
      step3Title: 'சுகாதார தரவு சேகரிப்பு மற்றும் செயலாக்க ஒப்புதல்',
      purposeLabel: 'நோக்கம்:',
      purposeText: 'உங்கள் தற்போதைய நோய், முந்தைய மருந்துகள் மற்றும் ஆய்வக அறிக்கைகளை மருத்துவரிடம் பாதுகாப்பாக வழங்க.',
      securityLabel: 'தரவு பாதுகாப்பு:',
      securityText: 'உங்கள் சுகாதாரத் தரவு குறியாக்கம் செய்யப்பட்டுள்ளது மற்றும் உங்கள் மருத்துவர் மட்டுமே பார்க்க முடியும்.',
      revokeLabel: 'திரும்பப் பெறுதல்:',
      revokeText: 'நீங்கள் எந்த நேரத்திலும் உங்கள் ஒப்புதலை திரும்பப் பெறலாம்.',
      consentAgreeBtn: 'நான் ஒப்புக்கொள்கிறேன்',
      consentDeclineBtn: 'நிராகரிக்கவும்',
      welcomePatient: 'வரவேற்கிறோம்',
      tokenLabel: 'டோக்கன் எண்',
      opdLabel: 'ஒதுக்கப்பட்ட OPD பிரிவு',
      readyMessage: 'இப்போது உங்கள் உடல்நலப் பிரச்சனைகள் குறித்து சில எளிய கேள்விகளைக் கேட்போம். உங்கள் மொழியில் பேசியோ அல்லது திரையைத் தொட்டோ பதிலளிக்கலாம்.',
      startInterviewBtn: 'மருத்துவ நேர்காணலைத் தொடங்குங்கள்'
    },
    historyEngine: {
      questionLabel: 'கேள்வி',
      ofLabel: 'இல்',
      listen: 'கேளுங்கள்',
      selectMultiPrompt: 'பொருந்தும் அனைத்து விருப்பங்களையும் தேர்ந்தெடுக்கவும்',
      selectSinglePrompt: 'ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும், அல்லது கீழே பேசவும் / எழுதவும்',
      voiceSectionTitle: 'குரல் அல்லது எழுத்து மூலம் பதிலளிக்கவும்',
      voiceSectionDesc: 'உங்கள் மொழியில் நேரடியாகப் பேசுங்கள் அல்லது குறிப்புகளை எழுதுங்கள்.',
      startVoiceBtn: 'குரல் தொடங்கு',
      stopVoiceBtn: 'பதிவை நிறுத்து',
      listeningAlert: 'உங்கள் மொழியில் கேட்கிறது... தெளிவாகப் பேசுங்கள்',
      speakPromptPlaceholder: 'உங்கள் நோய் அறிகுறிகளை விவரிக்கவும்...',
      writePromptPlaceholder: 'கூடுதல் விவரங்களைச் சேர்க்க விரும்பினால், இங்கே தட்டச்சு செய்யவும் அல்லது பேசவும்...',
      testPhrasesLabel: 'மாதிரி சொற்றொடர்களை சோதிக்க கிளிக் செய்க:',
      editSymptomsBtn: 'அறிகுறிகளைத் திருத்து',
      backBtn: 'பின்னால்',
      nextQuestionBtn: 'அடுத்த கேள்வி',
      submitIntakeBtn: 'மருத்துவரிடம் சமர்ப்பிக்கவும்'
    },
    roleAuth: {
      title: 'பாதுகாப்பான மருத்துவ அங்கீகாரம் & ABHA அணுகல்',
      subtitle: 'ABDM நுழைவாயில் & மருத்துவமனை ஊழியர்கள் உள்நுழைவு',
      patientTab: 'நோயாளி (ABHA)',
      doctorTab: 'மருத்துவர் OPD',
      labTab: 'ஆய்வக வல்லுநர்',
      pharmTab: 'மருந்தாளர்',
      abhaNumberLabel: 'ABHA ஐடி / மொபைல் எண்',
      requestOtpBtn: 'ABDM OTP அனுப்புக',
      enterOtpLabel: '6 இலக்க ஆதார் OTP',
      verifyPatientBtn: 'OTP சரிபார்த்து உள்நுழைக',
      demoPatientHelper: 'உடனடி சோதனைக்கான டெமோ சான்றுகள் தயார்',
      doctorRegLabel: 'மருத்துவ கவுன்சில் பதிவு எண் (MCI/NMC)',
      doctorPinLabel: 'மருத்துவர் PIN குறியீடு',
      doctorLoginBtn: 'மருத்துவர் உள்நுழைவு',
      labIdLabel: 'ஆய்வக தொழில்நுட்ப வல்லுநர் ஐடி',
      labDeptLabel: 'ஆய்வகப் பிரிவு',
      labLoginBtn: 'ஆய்வக போர்ட்டலில் உள்நுழைக',
      pharmLicenseLabel: 'பதிவுசெய்யப்பட்ட மருந்தாளர் உரிமம்',
      pharmCounterLabel: 'மருந்து விநியோக கவுண்டர்',
      pharmLoginBtn: 'மருந்தகத்தில் உள்நுழைக',
      cancelBtn: 'மூடு'
    }
  },
  te: {
    nav: {
      brandName: 'భారత్ ఆరోగ్య',
      brandSubtitle: 'AI క్లినికల్ కేస్-టేకింగ్',
      platformInfo: 'ప్లాట్‌ఫారమ్ సమాచారం',
      login: 'లాగిన్ చేయండి',
      getStarted: 'ప్రారంభించండి',
      logout: 'లాగ్ అవుట్',
      roleAuth: 'పోర్టల్ యాక్సెస్',
      resetKiosk: 'కియోస్క్ రీసెట్',
      clinicalHistory: '1. క్లినికల్ చరిత్ర',
      scanOcr: '2. పత్రాల స్కాన్',
      caseSummary: '3. కేస్ సారాంశం',
      healthTimeline: 'ఆరోగ్య రికార్డులు & ABHA',
      doctorQueue: 'OPD రోగి క్యూ',
      physicianReview: 'వైద్యుల కేస్ సమీక్ష',
      labOrders: 'డయాగ్నస్టిక్ ల్యాబ్ ఆర్డర్లు',
      pharmacyDispense: 'ఆసుపత్రి డిస్పెన్సరీ',
      triageDashboard: 'ఎమర్జెన్సీ రెడ్-ఫ్లాగ్ ట్రయేజ్',
      hospitalAnalytics: 'ఆసుపత్రి విశ్లేషణలు',
      auditLogs: 'DPDP ఆడిట్ లాగ్స్',
      activeRole: 'క్రియాశీల పాత్ర',
      switchRole: 'పాత్రను మార్చండి',
      signedInAs: 'లాగిన్ చేసినవారు:'
    },
    accessibility: {
      languageLabel: 'భాష:',
      highContrast: 'అధిక కాంట్రాస్ట్',
      audioOn: 'ఆడియో ఆన్',
      audioOff: 'ఆడియో ఆఫ్',
      kioskActive: 'కియోస్క్ క్రియాశీలం',
      desktopView: 'డెస్క్‌టాప్ వీక్షణ',
      demoMode: 'ABDM / భాషిణి డెమో మోడ్',
      audioEnabledSpoken: 'ఆడియో సహాయం ప్రారంభించబడింది. ప్రశ్నలు ఇప్పుడు చదివి వినిపించబడతాయి.',
      audioDisabledSpoken: 'ఆడియో మార్గదర్శకత్వం నిలిపివేయబడింది.'
    },
    publicSite: {
      abdmStrip: 'ఆయుష్మాన్ భారత్ డిజిటల్ మిషన్ (ABDM) • లెవల్-3 కంప్లైంట్',
      privacy: 'DPDP చట్టం 2023 సార్వభౌమ గోప్యత',
      fhir: 'FHIR v4 సర్టిఫైడ్',
      bhashini: 'భాషిణి బహుభాషా AI',
      heroBadge: 'జాతీయ సమగ్ర ఆరోగ్య వేదిక • భారత్ ఆరోగ్య',
      heroTitle: 'సమగ్ర AI క్లినికల్ ఇన్‌టేక్, డైనమిక్ హిస్టరీ & ABDM హెల్త్ ప్లాట్‌ఫారమ్',
      heroDesc: 'భారతీయ OPDలు, ప్రాథమిక ఆరోగ్య కేంద్రాలు (PHC), జిల్లా ఆసుపత్రుల కోసం రూపొందించబడింది. 6 ప్రాంతీయ భాషలలో వాయిస్ ఇన్‌టేక్ మరియు ఎమర్జెన్సీ రెడ్-ఫ్లాగ్ ట్రయేజ్ సదుపాయం.',
      patientLoginBtn: 'రోగి పోర్టల్ (ABHA లాగిన్)',
      doctorLoginBtn: 'డాక్టర్ & క్లినికల్ లాగిన్',
      launchKioskBtn: 'ప్రారంభించండి (OPD కియోస్క్)',
      fasterStat: '70% వేగవంతం',
      fasterLabel: 'OPD నమోదు & ట్రయేజ్',
      languagesStat: '6 భాషలు',
      languagesLabel: 'భాషిణి బహుభాషా వాయిస్ సిస్టమ్',
      alertStat: '< 30 సెకన్లు',
      alertLabel: 'అత్యవసర రెడ్-ఫ్లాగ్ హెచ్చరిక',
      abdmStat: '100% ABDM',
      abdmLabel: 'M1, M2 & M3 సర్టిఫైడ్',
      rolesSectionBadge: 'సమగ్ర క్లినికల్ పాత్రలు',
      rolesSectionTitle: 'పూర్తి ఆరోగ్య సంరక్షణ కోసం ఒకే వేదిక',
      rolesSectionDesc: 'DPDP 2023 సమ్మతి ఆర్కిటెక్చర్‌తో ఆసుపత్రి భాగస్వాముల కోసం ప్రత్యేక వర్క్‌ఫ్లోలు.',
      featuresBadge: 'అధునాతన ఫీచర్లు',
      featuresTitle: 'భారతీయ ఆసుపత్రుల కోసం ప్రత్యేకంగా రూపొందించబడింది',
      ctaHeading: 'ఆసుపత్రి OPD నమోదును మార్చడానికి సిద్ధంగా ఉన్నారా?',
      ctaSubtitle: 'ఆయుష్మాన్ భారత్ డిజిటల్ మిషన్‌కు అనుగుణంగా AI క్లినికల్ చరిత్ర వేదికను అనుభవించండి.'
    },
    kioskWelcome: {
      title: 'భారత్ ఆరోగ్య — రోగి స్వీయ నమోదు & క్లినికల్ కేస్ ఇన్‌టేక్',
      subtitle: 'డాక్టర్‌ను కలవడానికి ముందు మీ వ్యాధి లక్షణాలను ఇక్కడ సులభంగా నమోదు చేయండి.',
      step1Badge: 'దశ 1: భాషను ఎంచుకోండి',
      step1Title: 'దయచేసి మీకు నచ్చిన భాషను ఎంచుకోండి:',
      continueBtn: 'కొనసాగించండి',
      step2Badge: 'దశ 2: ABHA ధృవీకరణ',
      step2Title: 'మీ ABHA సంఖ్య లేదా మొబైల్ సంఖ్యను నమోదు చేయండి:',
      step2Subtitle: '(మీ 14 అంకెల ABHA సంఖ్య లేదా మొబైల్‌ను నమోదు చేయండి. డెమో డేటా నింపబడింది)',
      abhaLabel: 'ABHA ID / మొబైల్ సంఖ్య:',
      getOtpBtn: 'మొబైల్ OTP పొందండి',
      connectingAbdm: 'ABDM కి కనెక్ట్ చేస్తోంది...',
      enterOtpLabel: '6 అంకెల OTP ని నమోదు చేయండి (డెమో: 123456):',
      verifyOtpBtn: 'OTP ధృవీకరించి రికార్డును లింక్ చేయండి',
      verifiedNotice: 'ABHA ధృవీకరించబడింది & ఆధార్ KYC తో లింక్ చేయబడింది',
      skipWalkIn: 'దాటవేయి / వాక్-ఇన్ OPD రోగిగా కొనసాగించండి →',
      step3Badge: 'దశ 3: రోగి సమ్మతి (DPDP 2023)',
      step3Title: 'ఆరోగ్య డేటా సేకరణ మరియు ప్రాసెసింగ్ సమ్మతి',
      purposeLabel: 'ప్రయోజనం:',
      purposeText: 'మీ ప్రస్తుత అనారోగ్యం, గత మందులు మరియు ల్యాబ్ నివేదికలను మీ కన్సల్టింగ్ డాక్టర్‌కు సురక్షితంగా బదిలీ చేయడానికి.',
      securityLabel: 'డేటా భద్రత:',
      securityText: 'మీ ఆరోగ్య డేటా ఎన్‌క్రిప్ట్ చేయబడింది మరియు కేవలం మీ డాక్టర్ మాత్రమే చూడగలరు.',
      revokeLabel: 'సమ్మతి ఉపసంహరణ:',
      revokeText: 'మీరు ఎప్పుడైనా మీ సమ్మతిని ఉపసంహరించుకోవచ్చు.',
      consentAgreeBtn: 'నేను అంగీకరిస్తున్నాను',
      consentDeclineBtn: 'తిరస్కరించండి',
      welcomePatient: 'స్వాగతం',
      tokenLabel: 'టోకెన్ సంఖ్య',
      opdLabel: 'కేటాయించిన OPD విభాగం',
      readyMessage: 'ఇప్పుడు మేము మీ అనారోగ్యం గురించి కొన్ని సాధారణ ప్రశ్నలను అడుగుతాము. మీరు మీ భాషలో మాట్లాడి లేదా స్క్రీన్‌పై తాకి సమాధానం ఇవ్వవచ్చు.',
      startInterviewBtn: 'క్లినికల్ ఇంటర్వ్యూ ప్రారంభించండి'
    },
    historyEngine: {
      questionLabel: 'ప్రశ్న',
      ofLabel: 'లో',
      listen: 'వినండి',
      selectMultiPrompt: 'వర్తించే అన్ని ఎంపికలను ఎంచుకోండి',
      selectSinglePrompt: 'ఒక ఎంపికను ఎంచుకోండి, లేదా క్రింద మాట్లాడండి / రాయండి',
      voiceSectionTitle: 'వాయిస్ లేదా వ్రాతపూర్వక సమాధానం',
      voiceSectionDesc: 'మీ భాషలో నేరుగా మాట్లాడండి లేదా వివరాలను రాయండి.',
      startVoiceBtn: 'వాయిస్ ప్రారంభించండి',
      stopVoiceBtn: 'రికార్డింగ్ ఆపండి',
      listeningAlert: 'మీ భాషలో వింటోంది... దయచేసి స్పష్టంగా మాట్లాడండి',
      speakPromptPlaceholder: 'మీ లక్షణాలను వివరించండి...',
      writePromptPlaceholder: 'మరిన్ని వివరాలను జోడించాలనుకుంటే, ఇక్కడ టైప్ చేయండి లేదా మాట్లాడండి...',
      testPhrasesLabel: 'నమూనా వాక్యాలను పరీక్షించడానికి క్లిక్ చేయండి:',
      editSymptomsBtn: 'లక్షణాలను సవరించండి',
      backBtn: 'వెనుకకు',
      nextQuestionBtn: 'తదుపరి ప్రశ్న',
      submitIntakeBtn: 'డాక్టర్‌కు సమర్పించండి'
    },
    roleAuth: {
      title: 'సురక్షిత క్లినికల్ ప్రమాణీకరణ & ABHA యాక్సెస్',
      subtitle: 'ABDM గేట్‌వే & హాస్పిటల్ స్టాఫ్ లాగిన్',
      patientTab: 'రోగి (ABHA)',
      doctorTab: 'డాక్టర్ OPD',
      labTab: 'ల్యాబ్ టెక్నీషియన్',
      pharmTab: 'ఫార్మసిస్ట్',
      abhaNumberLabel: 'ABHA ID / మొబైల్ సంఖ్య',
      requestOtpBtn: 'ABDM OTP పంపండి',
      enterOtpLabel: '6 అంకెల ఆధార్ OTP',
      verifyPatientBtn: 'OTP ధృవీకరించి లాగిన్ చేయండి',
      demoPatientHelper: 'తక్షణ పరీక్ష కోసం డెమో ఆధారాలు సిద్ధంగా ఉన్నాయి',
      doctorRegLabel: 'మెడికల్ కౌన్సిల్ రిజిస్ట్రేషన్ (MCI/NMC)',
      doctorPinLabel: 'డాక్టర్ PIN',
      doctorLoginBtn: 'డాక్టర్ లాగిన్',
      labIdLabel: 'ల్యాబ్ టెక్నీషియన్ ఐడి',
      labDeptLabel: 'ప్రయోగశాల విభాగం',
      labLoginBtn: 'ల్యాబ్ పోర్టల్ లాగిన్',
      pharmLicenseLabel: 'రిజిస్టర్డ్ ఫార్మసిస్ట్ లైసెన్స్',
      pharmCounterLabel: 'మందుల పంపిణీ కౌంటర్',
      pharmLoginBtn: 'ఫార్మసీ లాగిన్',
      cancelBtn: 'మూసివేయి'
    }
  },
  bn: {
    nav: {
      brandName: 'ভারত আরোগ্য',
      brandSubtitle: 'এআই ক্লিনিক্যাল ইতিহাস প্ল্যাটফর্ম',
      platformInfo: 'প্ল্যাটফর্ম তথ্য',
      login: 'লগইন করুন',
      getStarted: 'শুরু করুন',
      logout: 'লগআউট',
      roleAuth: 'পোর্টাল অ্যাক্সেস',
      resetKiosk: 'কিয়স্ক রিসেট করুন',
      clinicalHistory: '১. ক্লিনিক্যাল ইতিহাস',
      scanOcr: '২. নথি স্ক্যান',
      caseSummary: '৩. কেস সারাংশ',
      healthTimeline: 'স্বাস্থ্য রেকর্ড ও ABHA',
      doctorQueue: 'ওপিডি রোগী সারি',
      physicianReview: 'চিকিৎসক কেস পর্যালোচনা',
      labOrders: 'ল্যাবরেটরি অর্ডার',
      pharmacyDispense: 'হাসপাতাল ফার্মেসি',
      triageDashboard: 'জরুরি রেড-ফ্ল্যাগ ট্রায়াজ',
      hospitalAnalytics: 'হাসপাতাল বিশ্লেষণ',
      auditLogs: 'DPDP অডিট লগ',
      activeRole: 'সক্রিয় ভূমিকা',
      switchRole: 'ভূমিকা পরিবর্তন করুন',
      signedInAs: 'লগইন করেছেন:'
    },
    accessibility: {
      languageLabel: 'ভাষা:',
      highContrast: 'উচ্চ বৈসাদৃশ্য',
      audioOn: 'অডিও চালু',
      audioOff: 'অডিও বন্ধ',
      kioskActive: 'কিয়স্ক সক্রিয়',
      desktopView: 'ডেস্কটপ ভিউ',
      demoMode: 'ABDM / ভাষিণী ডেমো মোড',
      audioEnabledSpoken: 'অডিও সহায়তা চালু করা হয়েছে। প্রশ্নগুলি এখন পড়ে শোনানো হবে।',
      audioDisabledSpoken: 'অডিও নির্দেশনা বন্ধ করা হয়েছে।'
    },
    publicSite: {
      abdmStrip: 'আয়ুষ্মান ভারত ডিজিটাল মিশন (ABDM) • লেভেল-৩ অনুবর্তী',
      privacy: 'DPDP আইন ২০২৩ সার্বভৌম গোপনীয়তা',
      fhir: 'FHIR v4 প্রত্যয়িত',
      bhashini: 'ভাষিণী বহুভাষিক AI',
      heroBadge: 'জাতীয় একীভূত স্বাস্থ্য প্ল্যাটফর্ম • ভারত আরোগ্য',
      heroTitle: 'একীভূত AI ক্লিনিক্যাল ইনটেক, গতিশীল ইতিহাস ও ABDM স্বাস্থ্য প্ল্যাটফর্ম',
      heroDesc: 'ভারতীয় ওপিডি, প্রাথমিক স্বাস্থ্য কেন্দ্র (PHC), জেলা হাসপাতাল ও মেডিকেল কলেজের জন্য নির্মিত। ৬টি আঞ্চলিক ভাষায় ভয়েস ইনটেক এবং জরুরি রেড-ফ্ল্যাগ ট্রায়াজ সুবিধা।',
      patientLoginBtn: 'রোগী পোর্টাল (ABHA লগইন)',
      doctorLoginBtn: 'ডাক্তার ও ক্লিনিক্যাল লগইন',
      launchKioskBtn: 'শুরু করুন (ওপিডি কিয়স্ক)',
      fasterStat: '৭০% দ্রুত',
      fasterLabel: 'ওপিডি নিবন্ধন ও ট্রায়াজ',
      languagesStat: '৬টি ভাষা',
      languagesLabel: 'ভাষিণী বহুভাষিক ভয়েস সিস্টেম',
      alertStat: '< ৩০ সেকেন্ড',
      alertLabel: 'জরুরি রেড-ফ্ল্যাগ সতর্কতা',
      abdmStat: '১০০% ABDM',
      abdmLabel: 'M1, M2 ও M3 প্রত্যয়িত',
      rolesSectionBadge: 'সমন্বিত ক্লিনিক্যাল ভূমিকা',
      rolesSectionTitle: 'সম্পূর্ণ স্বাস্থ্যসেবার জন্য একক প্ল্যাটফর্ম',
      rolesSectionDesc: 'DPDP ২০২৩ সম্মতি আর্কিটেকচারের সাথে হাসপাতাল স্টেকহোল্ডারদের জন্য উপযুক্ত কর্মপ্রবাহ।',
      featuresBadge: 'উন্নত প্রযুক্তি',
      featuresTitle: 'উচ্চ রোগী সম্পন্ন ভারতীয় হাসপাতালের জন্য বিশেষভাবে নির্মিত',
      ctaHeading: 'হাসপাতাল ওপিডি ইনটেক পরিবর্তন করতে প্রস্তুত?',
      ctaSubtitle: 'আয়ুষ্মান ভারত ডিজিটাল মিশন অনুসারী AI ক্লিনিক্যাল ইতিহাস প্ল্যাটফর্মের অভিজ্ঞতা নিন।'
    },
    kioskWelcome: {
      title: 'ভারত আরোগ্য — রোগী স্ব-নিবন্ধন ও ক্লিনিক্যাল কেস ইনটেক',
      subtitle: 'ডাক্তারের সাথে দেখা করার আগে আপনার রোগের লক্ষণগুলি এখানে সহজে রেকর্ড করুন।',
      step1Badge: 'ধাপ ১: ভাষা নির্বাচন করুন',
      step1Title: 'দয়া করে আপনার পছন্দের ভাষা নির্বাচন করুন:',
      continueBtn: 'এগিয়ে যান',
      step2Badge: 'ধাপ ২: ABHA যাচাইকরণ',
      step2Title: 'আপনার ABHA নম্বর বা মোবাইল লিখুন:',
      step2Subtitle: '(আপনার ১৪ সংখ্যার ABHA নম্বর বা মোবাইল লিখুন। ডেমো তথ্য আগে থেকেই পূরণ করা আছে)',
      abhaLabel: 'ABHA আইডি / মোবাইল নম্বর:',
      getOtpBtn: 'মোবাইল OTP পান',
      connectingAbdm: 'ABDM এর সাথে সংযোগ হচ্ছে...',
      enterOtpLabel: '৬ অঙ্কের OTP লিখুন (ডেমো: 123456):',
      verifyOtpBtn: 'OTP যাচাই করে রেকর্ড লিঙ্ক করুন',
      verifiedNotice: 'ABHA যাচাইকৃত এবং আধার KYC-র সাথে যুক্ত',
      skipWalkIn: 'এড়িয়ে যান / সাধারণ ওপিডি রোগী হিসাবে চালিয়ে যান →',
      step3Badge: 'ধাপ ৩: রোগীর সম্মতি (DPDP 2023)',
      step3Title: 'স্বাস্থ্য তথ্য সংগ্রহ ও প্রক্রিয়াকরণ সম্মতি',
      purposeLabel: 'উদ্দেশ্য:',
      purposeText: 'আপনার বর্তমান অসুস্থতা, পূর্বের ওষুধ এবং ল্যাব রিপোর্ট নিরাপদে ওপিডি চিকিৎসকের কাছে পাঠানোর জন্য।',
      securityLabel: 'তথ্য নিরাপত্তা:',
      securityText: 'আপনার স্বাস্থ্য তথ্য সম্পূর্ণ এনক্রিপ্ট করা এবং শুধুমাত্র আপনার নির্ধারিত চিকিৎসক দেখতে পারবেন।',
      revokeLabel: 'সম্মতি প্রত্যাহার:',
      revokeText: 'আপনি যে কোনো সময় আপনার সম্মতি প্রত্যাহার করতে পারেন।',
      consentAgreeBtn: 'আমি সম্মত',
      consentDeclineBtn: 'প্রত্যাখ্যান করুন',
      welcomePatient: 'স্বাগতম',
      tokenLabel: 'টোকেন নম্বর',
      opdLabel: 'নির্ধারিত ওপিডি ক্লিনিক',
      readyMessage: 'এখন আমরা আপনার অসুস্থতা সম্পর্কে কয়েকটি সহজ প্রশ্ন জিজ্ঞাসা করব। আপনি নিজের ভাষায় কথা বলে বা স্ক্রিন স্পর্শ করে উত্তর দিতে পারেন।',
      startInterviewBtn: 'ক্লিনিক্যাল সাক্ষাৎকার শুরু করুন'
    },
    historyEngine: {
      questionLabel: 'প্রশ্ন',
      ofLabel: 'এর',
      listen: 'শুনুন',
      selectMultiPrompt: 'প্রযোজ্য সমস্ত বিকল্প নির্বাচন করুন',
      selectSinglePrompt: 'একটি বিকল্প নির্বাচন করুন, অথবা নিচে বলুন / লিখুন',
      voiceSectionTitle: 'ভয়েস বা লিখিত উত্তর',
      voiceSectionDesc: 'সরাসরি আপনার ভাষায় কথা বলুন বা এই প্রশ্নের বিস্তারিত লিখুন।',
      startVoiceBtn: 'ভয়েস শুরু করুন',
      stopVoiceBtn: 'রেকর্ডিং বন্ধ করুন',
      listeningAlert: 'আপনার ভাষায় শুনছি... অনুগ্রহ করে স্পষ্টভাবে বলুন',
      speakPromptPlaceholder: 'আপনার লক্ষণগুলি বিস্তারিতভাবে বলুন...',
      writePromptPlaceholder: 'আরও বিশদ যোগ করতে চাইলে, এখানে টাইপ করুন বা বলুন...',
      testPhrasesLabel: 'নমুনা বাক্যাংশ পরীক্ষা করতে ক্লিক করুন:',
      editSymptomsBtn: 'লক্ষণ পরিবর্তন করুন',
      backBtn: 'পিছনে',
      nextQuestionBtn: 'পরবর্তী প্রশ্ন',
      submitIntakeBtn: 'ডাক্তারের কাছে জমা দিন'
    },
    roleAuth: {
      title: 'নিরাপদ ক্লিনিক্যাল প্রমাণীকরণ ও ABHA অ্যাক্সেস',
      subtitle: 'ABDM গেটওয়ে ও হাসপাতাল স্টাফ লগইন',
      patientTab: 'রোগী (ABHA)',
      doctorTab: 'ডাক্তার ওপিডি',
      labTab: 'ল্যাব টেকনিশিয়ান',
      pharmTab: 'ফার্মাসিস্ট',
      abhaNumberLabel: 'ABHA আইডি / মোবাইল নম্বর',
      requestOtpBtn: 'ABDM OTP পাঠান',
      enterOtpLabel: '৬ অঙ্কের আধার OTP',
      verifyPatientBtn: 'OTP যাচাই করে লগইন করুন',
      demoPatientHelper: 'তাত্ক্ষণিক পরীক্ষার জন্য ডেমো তথ্য প্রস্তুত',
      doctorRegLabel: 'মেডিকেল কাউন্সিল রেজিস্ট্রেশন (MCI/NMC)',
      doctorPinLabel: 'কনসালট্যান্ট পিন',
      doctorLoginBtn: 'ডাক্তার লগইন',
      labIdLabel: 'ল্যাব টেকনিশিয়ান আইডি',
      labDeptLabel: 'ল্যাবরেটরি বিভাগ',
      labLoginBtn: 'ল্যাব পোর্টালে লগইন করুন',
      pharmLicenseLabel: 'নিবন্ধিত ফার্মাসিস্ট লাইসেন্স',
      pharmCounterLabel: 'ওপিডি ডিসপেনসারি কাউন্টার',
      pharmLoginBtn: 'ফার্মেসিতে লগইন করুন',
      cancelBtn: 'বন্ধ করুন'
    }
  },
  mr: {
    nav: {
      brandName: 'भारत आरोग्य',
      brandSubtitle: 'एआय क्लिनिकल केस-टेकिंग प्लॅटफॉर्म',
      platformInfo: 'प्लॅटफॉर्म माहिती',
      login: 'लॉगिन करा',
      getStarted: 'सुरू करा',
      logout: 'लॉगआउट',
      roleAuth: 'पोर्टल प्रवेश',
      resetKiosk: 'किओस्क सत्र रीसेट',
      clinicalHistory: '१. क्लिनिकल इतिहास',
      scanOcr: '२. कागदपत्रे स्कॅन',
      caseSummary: '३. केस सारांश',
      healthTimeline: 'आरोग्य नोंदी आणि ABHA',
      doctorQueue: 'ओपीडी रुग्ण रांग',
      physicianReview: 'वैद्यकीय केस पुनरावलोकन',
      labOrders: 'प्रयोगशाळा ऑर्डर्स',
      pharmacyDispense: 'रुग्णालय औषध वितरण',
      triageDashboard: 'तातडीचे रेड-फ्लॅग ट्रायज',
      hospitalAnalytics: 'रुग्णालय विश्लेषण',
      auditLogs: 'DPDP ऑडिट नोंदी',
      activeRole: 'सक्रिय भूमिका',
      switchRole: 'भूमिका बदला',
      signedInAs: 'लॉग इन:'
    },
    accessibility: {
      languageLabel: 'भाषा:',
      highContrast: 'उच्च कॉन्ट्रास्ट',
      audioOn: 'ऑडिओ चालू',
      audioOff: 'ऑडिओ बंद',
      kioskActive: 'किओस्क सक्रिय',
      desktopView: 'डेस्कटॉप दृश्य',
      demoMode: 'ABDM / भाषिणी डेमो मोड',
      audioEnabledSpoken: 'ऑडिओ सहाय्य सुरू केले आहे. प्रश्न आता वाचून दाखवले जातील.',
      audioDisabledSpoken: 'ऑडिओ मार्गदर्शन बंद केले आहे.'
    },
    publicSite: {
      abdmStrip: 'आयुष्मान भारत डिजिटल मिशन (ABDM) • स्तर-३ अनुपालन',
      privacy: 'DPDP कायदा २०२३ सार्वभौम गोपनीयता',
      fhir: 'FHIR v4 प्रमाणित',
      bhashini: 'भाषिणी बहुभाषिक AI',
      heroBadge: 'राष्ट्रीय एकीकृत आरोग्य सेवा प्लॅटफॉर्म • भारत आरोग्य',
      heroTitle: 'एकीकृत AI क्लिनिकल इनटेक, गतिशील इतिहास आणि ABDM आरोग्य प्लॅटफॉर्म',
      heroDesc: 'भारतीय ओपीडी, प्राथमिक आरोग्य केंद्रे (PHC), जिल्हा रुग्णालये आणि वैद्यकीय महाविद्यालयांसाठी विकसित. ६ प्रादेशिक भाषांमध्ये व्हॉइस इनटेक, स्वयंचलित रेड-फ्लॅग ट्रायज आणि डॉक्टर-पर्यवेक्षित क्लिनिकल सारांश.',
      patientLoginBtn: 'रुग्ण पोर्टल (ABHA लॉगिन)',
      doctorLoginBtn: 'डॉक्टर आणि क्लिनिकल लॉगिन',
      launchKioskBtn: 'सुरू करा (ओपीडी किओस्क)',
      fasterStat: '७०% वेगवान',
      fasterLabel: 'ओपीडी नोंदणी आणि ट्रायज',
      languagesStat: '६ भाषा',
      languagesLabel: 'भाषिणी बहुभाषिक व्हॉइस प्रणाली',
      alertStat: '< ३० सेकंद',
      alertLabel: 'तातडीचा रेड-फ्लॅग इशारा',
      abdmStat: '१००% ABDM',
      abdmLabel: 'M1, M2 आणि M3 प्रमाणित',
      rolesSectionBadge: 'एकीकृत क्लिनिकल भूमिका',
      rolesSectionTitle: 'संपूर्ण आरोग्य सेवेसाठी एकसंध प्लॅटफॉर्म',
      rolesSectionDesc: 'DPDP २०२३ संमती रचनेसह रुग्णालय कर्मचाऱ्यांसाठी योग्य कार्यप्रवाह.',
      featuresBadge: 'प्रगत तंत्रज्ञान',
      featuresTitle: 'मोठ्या रुग्णसंख्येच्या भारतीय रुग्णालयांसाठी विशेष निर्मित',
      ctaHeading: 'रुग्णालय ओपीडी इनटेक बदलण्यास सज्ज आहात?',
      ctaSubtitle: 'आयुष्मान भारत डिजिटल मिशन अनुरूप AI क्लिनिकल इतिहास प्लॅटफॉर्मचा अनुभव घ्या.'
    },
    kioskWelcome: {
      title: 'भारत आरोग्य — रुग्ण स्व-नोंदणी आणि क्लिनिकल केस इनटेक',
      subtitle: 'डॉक्टरांना भेटण्यापूर्वी तुमच्या आजाराची लक्षणे येथे सहज नोंदवा.',
      step1Badge: 'पायरी १: भाषा निवडा',
      step1Title: 'कृपया तुमची पसंतीची भाषा निवडा:',
      continueBtn: 'पुढे जा',
      step2Badge: 'पायरी २: ABHA पडताळणी',
      step2Title: 'तुमचा ABHA क्रमांक किंवा मोबाईल नंबर टाका:',
      step2Subtitle: '(तुमचा १४ अंकी ABHA क्रमांक किंवा मोबाईल टाका. डेमो डेटा आधीच भरलेला आहे)',
      abhaLabel: 'ABHA आयडी / मोबाईल क्रमांक:',
      getOtpBtn: 'मोबाईल OTP मिळवा',
      connectingAbdm: 'ABDM गेटवेशी जोडत आहे...',
      enterOtpLabel: '६ अंकी OTP टाका (डेमो: 123456):',
      verifyOtpBtn: 'OTP पडताळून रेकॉर्ड लिंक करा',
      verifiedNotice: 'ABHA पडताळणी यशस्वी आणि आधार KYC शी जोडले',
      skipWalkIn: 'वगळा / वॉक-इन ओपीडी रुग्ण म्हणून सुरू ठेवा →',
      step3Badge: 'पायरी ३: रुग्ण संमती (DPDP 2023)',
      step3Title: 'आरोग्य डेटा संकलन आणि प्रक्रिया संमती',
      purposeLabel: 'उद्देश:',
      purposeText: 'तुमचा सध्याचा आजार, पूर्वीची औषधे आणि लॅब रिपोर्ट सुरक्षितपणे डॉक्टरांकडे पोहोचवण्यासाठी.',
      securityLabel: 'डेटा सुरक्षा:',
      securityText: 'तुमचा आरोग्य डेटा पूर्णपणे एन्क्रिप्ट केलेला आहे आणि फक्त तुमच्या डॉक्टरांनाच दिसेल.',
      revokeLabel: 'संमती मागे घेणे:',
      revokeText: 'तुम्ही कधीही तुमची संमती मागे घेऊ शकता.',
      consentAgreeBtn: 'मी सहमत आहे',
      consentDeclineBtn: 'नाकारा',
      welcomePatient: 'स्वागत आहे',
      tokenLabel: 'टोकन क्रमांक',
      opdLabel: 'नियुक्त ओपीडी विभाग',
      readyMessage: 'आता आम्ही तुमच्या आजाराबद्दल काही सोपे प्रश्न विचारू. तुम्ही तुमच्या भाषेत बोलून किंवा स्क्रीनवर टॅप करून उत्तरे देऊ शकता.',
      startInterviewBtn: 'क्लिनिकल मुलाखत सुरू करा'
    },
    historyEngine: {
      questionLabel: 'प्रश्न',
      ofLabel: 'पैकी',
      listen: 'ऐका',
      selectMultiPrompt: 'लागू असलेले सर्व पर्याय निवडा',
      selectSinglePrompt: 'कृपया एक पर्याय निवडा किंवा खाली बोला / लिहा',
      voiceSectionTitle: 'आवाज किंवा लिहून उत्तर द्या',
      voiceSectionDesc: 'थेट तुमच्या भाषेत बोला किंवा या प्रश्नासाठी तपशील लिहा.',
      startVoiceBtn: 'व्हॉइस सुरू करा',
      stopVoiceBtn: 'रेकॉर्डिंग थांबवा',
      listeningAlert: 'तुमच्या भाषेत ऐकत आहे... कृपया स्पष्ट बोला',
      speakPromptPlaceholder: 'तुमची लक्षणे सविस्तर सांगा...',
      writePromptPlaceholder: 'काही अधिक सांगायचे असल्यास, येथे लिहा किंवा बोला... (उदा. कधी सुरू झाले, किती वेदना आहेत)',
      testPhrasesLabel: 'चाचणीसाठी नमुना वाक्यांवर क्लिक करा:',
      editSymptomsBtn: 'लक्षणे बदला',
      backBtn: 'मागे',
      nextQuestionBtn: 'पुढील प्रश्न',
      submitIntakeBtn: 'इतिहास डॉक्टरांना पाठवा'
    },
    roleAuth: {
      title: 'सुरक्षित क्लिनिकल प्रमाणीकरण आणि ABHA प्रवेश',
      subtitle: 'ABDM गेटवे आणि हॉस्पिटल स्टाफ लॉगिन',
      patientTab: 'रुग्ण (ABHA)',
      doctorTab: 'डॉक्टर ओपीडी',
      labTab: 'प्रयोगशाळा तंत्रज्ञ',
      pharmTab: 'फार्मसिस्ट',
      abhaNumberLabel: 'ABHA आयडी / मोबाईल क्रमांक',
      requestOtpBtn: 'ABDM OTP पाठवा',
      enterOtpLabel: '६ अंकी आधार OTP',
      verifyPatientBtn: 'OTP पडताळून रेकॉर्ड पहा',
      demoPatientHelper: 'त्वरित चाचणीसाठी डेमो माहिती तयार',
      doctorRegLabel: 'मेडिकल कौन्सिल नोंदणी क्रमांक (MCI/NMC)',
      doctorPinLabel: 'कन्सल्टंट पिन',
      doctorLoginBtn: 'डॉक्टर लॉगिन',
      labIdLabel: 'लॅब तंत्रज्ञ आयडी',
      labDeptLabel: 'प्रयोगशाळा विभाग',
      labLoginBtn: 'लॅब पोर्टलवर लॉगिन करा',
      pharmLicenseLabel: 'नोंदणीकृत फार्मसिस्ट परवाना',
      pharmCounterLabel: 'औषध वितरण काउंटर',
      pharmLoginBtn: 'फार्मसीमध्ये लॉगिन करा',
      cancelBtn: 'बंद करा'
    }
  }
};

export function getTranslation(lang: LanguageCode): Translations {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
