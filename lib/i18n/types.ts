export type Locale =
  | 'en'
  | 'ar'
  | 'es'
  | 'ru'
  | 'fr'
  | 'pt'
  | 'de'
  | 'ja'
  | 'ko'
  | 'vi';

export type Direction = 'ltr' | 'rtl';

export interface LocaleConfig {
  code: Locale;
  nativeName: string;
  englishName: string;
  dir: Direction;
}

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr' },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr' },
  { code: 'ru', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr' },
  { code: 'fr', nativeName: 'Français', englishName: 'French', dir: 'ltr' },
  {
    code: 'pt',
    nativeName: 'Português',
    englishName: 'Portuguese',
    dir: 'ltr',
  },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr' },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr' },
  { code: 'ko', nativeName: '한국어', englishName: 'Korean', dir: 'ltr' },
  {
    code: 'vi',
    nativeName: 'Tiếng Việt',
    englishName: 'Vietnamese',
    dir: 'ltr',
  },
];

export interface Translations {
  topline: {
    company: string;
    tagline: string;
  };
  header: {
    wordmarkSub: string;
    navProducts: string;
    navColors: string;
    navFactory: string;
    navFilms: string;
    cta: string;
    skipLink: string;
    menuClose: string;
    menuOpen: string;
    langSelectLabel: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    title3: string;
    desc1: string;
    desc2: string;
    btnProducts: string;
    btnContact: string;
    note: string;
    visualLabel: string;
    collectionIndex: string;
    scrollPrompt: string;
  };
  proof: {
    yearVal: string;
    yearLabel: string;
    colorsVal: string;
    colorsLabel: string;
    partnerVal: string;
    partnerLabel: string;
    badge1: string;
    badge2: string;
  };
  products: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtitle1: string;
    subtitle2: string;
    cardTag: string;
    cardViewSpec: string;
    items: {
      everyday: { name: string; note: string };
      depth: { name: string; note: string };
      standout: { name: string; note: string };
    };
    rangeNote: string;
    rangeCta: string;
  };
  colors: {
    caption: string;
    eyebrow: string;
    title1: string;
    title2: string;
    desc: string;
    finePrint: string;
    sampleBtn: string;
    sampleWaMsg: string;
    names: {
      navy: string;
      white: string;
      red: string;
      yellow: string;
      sky: string;
      pink: string;
      purple: string;
      wine: string;
      lavender: string;
    };
  };
  about: {
    eyebrow: string;
    title1: string;
    title2: string;
    p1: string;
    p2: string;
    point1: string;
    point2: string;
    point3: string;
    fbLink: string;
    estYear: string;
    location: string;
    appEyebrow: string;
    appTitle1: string;
    appTitle2: string;
    appP1: string;
    appP2: string;
    appLink: string;
  };
  factoryShowcase: {
    eyebrow: string;
    heading1: string;
    heading2: string;
    intro: string;
    watchLink: string;
    stories: Array<{ num: string; title: string; desc: string }>;
    photos: Record<string, { label: string; title: string; desc: string }>;
    store: {
      photoLabel: string;
      eyebrow: string;
      title1: string;
      title2: string;
      p1: string;
      p2: string;
      visitBtn: string;
      visitWaMsg: string;
      location: string;
      detailEyebrow: string;
      detailTitle1: string;
      detailTitle2: string;
      detailP: string;
      talkTeam: string;
    };
  };
  factoryFilms: {
    eyebrow: string;
    heading1: string;
    heading2: string;
    intro1: string;
    intro2: string;
    tiktokLink: string;
    fieldNotes: string;
    playlistHeading: string;
    videoError: string;
    openVideo: string;
    watchTiktok: string;
    moreTiktok: string;
    items: Record<string, { title: string; category: string; desc: string }>;
  };
  faq: {
    eyebrow: string;
    title1: string;
    title2: string;
    moreQuestions: string;
    items: Array<{ q: string; a: string }>;
  };
  contact: {
    eyebrow: string;
    title1: string;
    title2: string;
    desc1: string;
    desc2: string;
    contactRole: string;
    waWechat: string;
    locationChina: string;
    formHeading: string;
    formSub: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    reqLabel: string;
    reqPlaceholder: string;
    submitBtn: string;
    formNote: string;
    readyTitle: string;
    readyDesc: string;
    readyBtn: string;
    waMsgTemplate: string;
  };
  productDialog: {
    title: string;
    subtitle: string;
    badge: string;
    heading: string;
    brandLabel: string;
    brandVal: string;
    countsLabel: string;
    countsVal: string;
    exampleLabel: string;
    exampleVal: string;
    packingLabel: string;
    packingVal: string;
    finePrint: string;
    quoteBtn: string;
    quoteWaMsg: string;
  };
  footer: {
    company: string;
    rights: string;
    tagline: string;
    waAria: string;
  };
}
