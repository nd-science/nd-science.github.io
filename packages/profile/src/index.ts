/**
 * Общие модели и подтверждённые данные профессионального профиля.
 * Источник: docs/specs/00-professional-map.md и docs/specs/30-shared-implementation-contract.md.
 * Статусы описывают жизненный цикл и публикацию, а не достоверность сведений.
 */

export type Locale = "ru" | "en" | "zh" | "de" | "fr" | "es";
export type SiteKey = "wellness" | "science";

export interface LocaleConfig {
  code: Locale;
  label: string;
  htmlLang: string;
  ogLocale: string;
  sitemapLang: string;
  name: string;
}

export const SUPPORTED_LOCALES: Record<Locale, LocaleConfig> = {
  ru: { code: "ru", label: "RU", htmlLang: "ru", ogLocale: "ru_RU", sitemapLang: "ru-RU", name: "Русский" },
  en: { code: "en", label: "EN", htmlLang: "en", ogLocale: "en_US", sitemapLang: "en", name: "English" },
  zh: { code: "zh", label: "中文", htmlLang: "zh-Hans", ogLocale: "zh_CN", sitemapLang: "zh-Hans", name: "中文" },
  de: { code: "de", label: "DE", htmlLang: "de", ogLocale: "de_DE", sitemapLang: "de", name: "Deutsch" },
  fr: { code: "fr", label: "FR", htmlLang: "fr", ogLocale: "fr_FR", sitemapLang: "fr", name: "Français" },
  es: { code: "es", label: "ES", htmlLang: "es", ogLocale: "es_ES", sitemapLang: "es", name: "Español" },
};

export type LifecycleStatus =
  | "completed"
  | "current"
  | "in_progress"
  | "planned";

export type PublicationScope = "public" | "internal" | "consent_required";

export type ServiceAvailability = "available" | "pilot" | "planned";

export interface SiteConfig {
  key: SiteKey;
  name: string;
  theme: SiteKey;
  defaultLocale: Locale;
  locales: Locale[];
  fallbackUrl: string;
  responseTimeWorkingDays: number;
}

export interface LocalizedText {
  ru: string;
  en: string;
  zh?: string;
  de?: string;
  fr?: string;
  es?: string;
  [key: string]: string | undefined;
}

export interface Credential {
  /** Идентификатор совпадает с файлом записи в данных. */
  id: string;
  title: LocalizedText;
  issuer: LocalizedText;
  programme?: LocalizedText;
  startDate?: string;
  endDate?: string;
  year: number;
  hours?: number;
  lifecycleStatus: LifecycleStatus;
  publicationScope: PublicationScope;
  publicDocument?: string;
  sites: SiteKey[];
}

export interface ExperienceEntry {
  id: string;
  organisation: LocalizedText;
  role: LocalizedText;
  startDate: string;
  endDate?: string;
  summary: LocalizedText;
  outcomes?: LocalizedText[];
  publicationScope: PublicationScope;
  sites: SiteKey[];
}

export interface Method {
  id: string;
  slug: string;
  name: LocalizedText;
  summary: LocalizedText;
  useCases: LocalizedText[];
  typicalPractice?: LocalizedText;
  adaptation?: LocalizedText;
  limitations?: LocalizedText[];
  credentials: string[];
  relatedServices: string[];
  lifecycleStatus: LifecycleStatus;
  publicationScope: PublicationScope;
}

export type DeliveryMode = "online" | "in_person" | "hybrid";

export interface Money {
  amount: number;
  currency: "EUR";
  unit?: "session" | "participant" | "programme";
  /** Режим, для которого действует цена (например, €100 онлайн и €120 очно). */
  delivery?: DeliveryMode;
}

export interface Service {
  id: string;
  slug: string;
  site: SiteKey;
  name: LocalizedText;
  audience: LocalizedText;
  task: LocalizedText;
  includes: LocalizedText[];
  duration?: LocalizedText;
  delivery: DeliveryMode[];
  price?: Money | Money[];
  priceLabel?: LocalizedText;
  preparation?: LocalizedText[];
  outcome: LocalizedText;
  support?: LocalizedText;
  limitations?: LocalizedText[];
  relatedMethods?: string[];
  serviceAvailability: ServiceAvailability;
  publicationScope: PublicationScope;
  cta: { label: LocalizedText; href: string };
}

export type PublicationType =
  | "thesis"
  | "journal_article"
  | "book_chapter"
  | "conference_paper"
  | "abstract"
  | "professional_article"
  | "presentation";

export interface Publication {
  id: string;
  slug: string;
  title: string;
  /** Аннотация отсутствует в первичных источниках и добавляется после согласования. */
  summary?: LocalizedText;
  authors: string[];
  nataliaNameVariant: "Dolgova" | "Ovchinnikova";
  year: number;
  type: PublicationType;
  venue?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  language: string;
  researchAreas: string[];
  featured: boolean;
  publicationScope: PublicationScope;
}

export interface ResearchProject {
  id: string;
  slug: string;
  title: LocalizedText;
  period: LocalizedText;
  role: LocalizedText;
  audience?: LocalizedText;
  challenge: LocalizedText;
  work: LocalizedText;
  outcomes: LocalizedText[];
  relatedPublications?: string[];
  publicationScope: PublicationScope;
}

export interface ContentPage {
  id: string;
  site: SiteKey;
  locale: Locale;
  slug: string;
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  audience: string[];
  relatedMethods?: string[];
  relatedServices?: string[];
  cta?: {
    label: string;
    href: string;
  };
  publishedAt?: string;
  updatedAt: string;
  publicationScope: PublicationScope;
}

export interface WellnessEnquiry {
  kind: "wellness";
  locale: Locale;
  name: string;
  email: string;
  timezone: string;
  service: string;
  delivery: "online" | "in_person" | "any";
  request: string;
  adultConfirmed: true;
  consent: true;
}

export interface ScienceEnquiry {
  kind: "science";
  locale: Locale;
  name: string;
  organisation: string;
  email: string;
  comment: string;
  role?: string;
  projectType?: string;
  intendedResult?: string;
  audience?: string;
  timeline?: string;
  budgetRange?: string;
  consent: true;
}

export interface PublicProfile {
  displayName: LocalizedText;
  languages: Locale[];
  wellnessRole: LocalizedText;
  scienceRole: LocalizedText;
}

export const nataliaProfile: PublicProfile = {
  displayName: {
    ru: "Наталия Долгова",
    en: "Nataliia Dolgova",
    zh: "娜塔莉亚·多尔戈娃 (Nataliia Dolgova)",
    de: "Nataliia Dolgova",
    fr: "Nataliia Dolgova",
    es: "Nataliia Dolgova",
  },
  languages: ["ru", "en"],
  wellnessRole: {
    ru: "Практический психолог и тренер по нейроинтеграции",
    en: "Practical psychologist and neurointegration trainer",
    zh: "执业心理咨询师与神经整合训练师",
    de: "Praktische Psychologin und Neurointegrationstrainerin",
    fr: "Psychologue praticienne et formatrice en neuro-intégration",
    es: "Psicóloga práctica y entrenadora de neurointegración",
  },
  scienceRole: {
    ru: "Исследователь профессионального образования и обучения взрослых, Dr. phil., кандидат экономических наук",
    en: "Researcher in vocational education and adult learning, Dr. phil., Candidate of Economic Sciences",
    zh: "职业教育与成人学习研究者，哲学博士（Dr. phil.），经济学副博士",
    de: "Forscherin in Berufsbildung und Erwachsenenbildung, Dr. phil., Kandidatin der Wirtschaftswissenschaften",
    fr: "Chercheuse en formation professionnelle et éducation des adultes, Dr. phil., docteure en sciences économiques",
    es: "Investigadora en educación vocacional y aprendizaje de adultos, Dr. phil., candidata a doctora en ciencias económicas",
  },
};

/** Канонический стабильный URI сущности Person для Schema.org JSON-LD (AUD-P1-032). */
export const PERSON_CANONICAL_ID = "https://orcid.org/0000-0003-0816-2103#person";

/** Пять опорных фактов из профессиональной карты. */
export const keyFacts: LocalizedText[] = [
  {
    ru: "Dr. phil., Europa-Universität Flensburg, 2026, итоговая оценка magna cum laude",
    en: "Dr. phil., Europa-Universität Flensburg, 2026, overall magna cum laude",
    zh: "德国弗伦斯堡欧罗巴大学哲学博士（Dr. phil.），2026年，优等成绩（magna cum laude）",
    de: "Dr. phil., Europa-Universität Flensburg, 2026, Gesamtnote magna cum laude",
    fr: "Dr. phil., Europa-Universität Flensburg, 2026, mention magna cum laude",
    es: "Dr. phil., Europa-Universität Flensburg, 2026, calificación magna cum laude",
  },
  {
    ru: "Кандидат экономических наук, 2014",
    en: "Candidate of Economic Sciences, 2014",
    zh: "经济学副博士，2014年",
    de: "Kandidatin der Wirtschaftswissenschaften, 2014",
    fr: "Docteure en sciences économiques, 2014",
    es: "Candidata a doctora en ciencias económicas, 2014",
  },
  {
    ru: "Практический психолог, МПГУ, программа профессиональной переподготовки 1080 часов, 2026",
    en: "Practical psychologist, Moscow Pedagogical State University, 1,080-hour professional retraining programme, 2026",
    zh: "执业心理学家，莫斯科国立师范大学（MPGU）1080学时专业进修项目，2026年",
    de: "Praktische Psychologin, Staatliche Pädagogische Universität Moskau, 1.080-stündiges Weiterbildungsprogramm, 2026",
    fr: "Psychologue praticienne, Université pédagogique d'État de Moscou, programme de requalification de 1080 heures, 2026",
    es: "Psicóloga práctica, Universidad Pedagógica Estatal de Moscú, programa de readaptación profesional de 1080 horas, 2026",
  },
  {
    ru: "Исследования, преподавание и разработка образовательных программ с 2011 года",
    en: "Research, teaching and education programme design since 2011",
    zh: "自2011年起从事学术研究、大学教学及教育项目研发",
    de: "Forschung, Lehre und Bildungsprogrammentwicklung seit 2011",
    fr: "Recherche, enseignement et conception de programmes de formation depuis 2011",
    es: "Investigación, docencia y diseño de programas educativos desde 2011",
  },
  {
    ru: "Тренер по нейроинтеграции, профессиональная переподготовка 250 часов, 2024",
    en: "Neurointegration trainer, 250-hour professional retraining programme, 2024",
    zh: "神经整合训练师，250学时专业进修资质，2024年",
    de: "Neurointegrationstrainerin, 250-stündiges Weiterbildungsprogramm, 2024",
    fr: "Formatrice en neuro-intégration, programme de 250 heures, 2024",
    es: "Entrenadora de neurointegración, programa de 250 horas, 2024",
  },
];

export const professionalIdentifiers = {
  orcid: "0000-0003-0816-2103",
  orcidUrl: "https://orcid.org/0000-0003-0816-2103",
  researcherId: "A-9484-2016",
  researcherIdUrl: "https://www.webofscience.com/wos/author/record/A-9484-2016",
  scopusAuthorId: "57202091034",
  scopusUrl: "https://www.scopus.com/authid/detail.uri?authorId=57202091034",
  elibraryAuthorId: "687073",
  elibraryUrl: "https://www.elibrary.ru/author_profile.asp?id=687073",
  elibraryItemsUrl: "https://www.elibrary.ru/author_items.asp?authorid=687073&show_refs=1",
  googleScholarUserId: "BtLwD8UAAAAJ",
  googleScholarUrl: "https://scholar.google.com/citations?user=BtLwD8UAAAAJ",
} as const;

export interface ScientificMetric {
  database: string;
  databaseUrl: string;
  hIndex: number;
  documents: number;
  citations: number;
  checkedAt: string;
  notes: LocalizedText;
}

/** Подтверждённые наукометрические показатели по состоянию на 30.10.2026. */
export const verifiedMetrics: ScientificMetric[] = [
  {
    database: "Google Scholar",
    databaseUrl: professionalIdentifiers.googleScholarUrl,
    hIndex: 13,
    documents: 71,
    citations: 486,
    checkedAt: "2026-10-30",
    notes: {
      ru: "Верифицированный профиль цитирований Google Академии (Europa-Universität Flensburg)",
      en: "Verified Google Scholar citation profile (Europa-Universität Flensburg)",
      zh: "谷歌学术认证引文档案（弗伦斯堡欧罗巴大学）",
    },
  },
  {
    database: "РИНЦ / eLibrary",
    databaseUrl: "https://www.elibrary.ru/author_profile.asp?id=687073",
    hIndex: 12,
    documents: 64,
    citations: 475,
    checkedAt: "2026-10-30",
    notes: {
      ru: "Российский индекс научного цитирования (eLibrary.ru): 64 работы, 475 цитирований, публикации по экономике, управлению университетами и образованию",
      en: "Russian Science Citation Index (eLibrary.ru): 64 publications, 475 citations across higher education, management and economics",
      zh: "俄罗斯科学引文索引 (eLibrary.ru)：64篇文献，475次引用，涵盖高等教育、大学管理与经济学领域",
    },
  },
  {
    database: "Scopus (Elsevier)",
    databaseUrl: "https://www.scopus.com/authid/detail.uri?authorId=57202091034",
    hIndex: 2,
    documents: 7,
    citations: 9,
    checkedAt: "2026-10-29",
    notes: {
      ru: "Рецензируемые публикации и международные цитирования (Scopus Preview)",
      en: "Peer-reviewed publications and international citations (Scopus Preview)",
      zh: "同行评审出版物与国际引文（Scopus Preview）",
    },
  },
  {
    database: "OpenAlex",
    databaseUrl: "https://openalex.org/authors/A5054879320",
    hIndex: 3,
    documents: 29,
    citations: 20,
    checkedAt: "2026-10-29",
    notes: {
      ru: "Открытый международный библиографический каталог (включая массив ранних публикаций)",
      en: "Open international bibliographic catalogue (including earlier career publications)",
      zh: "开放式国际书目文献库（包含早期学术出版物）",
    },
  },
];

export interface PublicResource {
  id: string;
  label: LocalizedText;
  url: string;
}

/** Публичные ресурсы из профессиональной карты. */
export const publicResources: PublicResource[] = [
  {
    id: "telegram-direct",
    label: { ru: "Telegram для записи (1:1)", en: "Telegram 1:1 enquiries" },
    url: "https://t.me/natali_tvet_pro",
  },
  {
    id: "telegram-breathing",
    label: { ru: "Telegram «Про дыхание»", en: "Telegram “About breathing”" },
    url: "https://t.me/natalicompass",
  },
  {
    id: "vk-direct",
    label: { ru: "ВКонтакте (сообщения)", en: "VK Direct Messages" },
    url: "https://vk.me/97402865",
  },
  {
    id: "b17-profile",
    label: { ru: "Профиль на B17.ru", en: "B17.ru Psychologist Profile" },
    url: "https://www.b17.ru/dolgova_nataliya/",
  },
  {
    id: "trainer-neurointegration",
    label: { ru: "Реестр тренеров нейроинтеграции", en: "Neurointegration Trainer Directory" },
    url: "https://trainer.neurointegration.org/profile/966067701912-nataliya-dolgova",
  },
  {
    id: "breathing-waiting-list",
    label: { ru: "Лист ожидания клуба «Здоровое дыхание»", en: "Healthy Breathing Club waitlist" },
    url: "https://forms.yandex.ru/u/6aabc44f90fa7b004ca6d189",
  },
  {
    id: "telegram-spo",
    label: { ru: "Telegram «А что в СПО?»", en: "Telegram “What’s in TVET?”" },
    url: "http://t.me/spolife",
  },
  {
    id: "youtube",
    label: { ru: "YouTube", en: "YouTube" },
    url: "https://www.youtube.com/Natalicompass",
  },
  {
    id: "linkedin",
    label: { ru: "LinkedIn", en: "LinkedIn" },
    url: "https://www.linkedin.com/in/natalidolgova",
  },
  {
    id: "linkedin-group-tvet",
    label: { ru: "LinkedIn-группа What’s in TVET?", en: "LinkedIn group What’s in TVET?" },
    url: "https://www.linkedin.com/groups/12713149",
  },
  {
    id: "linkedin-group-brics",
    label: { ru: "LinkedIn-группа TVET League BRICS+", en: "LinkedIn group TVET League BRICS+" },
    url: "https://www.linkedin.com/groups/9504349",
  },
  {
    id: "ok-kompas",
    label: { ru: "Одноклассники, «Компас долголетия»", en: "Odnoklassniki, “Longevity Compass”" },
    url: "https://ok.ru/group/70000040256133",
  },
  {
    id: "vk-main",
    label: { ru: "VK", en: "VK" },
    url: "https://vk.com/natali_tvet_pro",
  },
  {
    id: "vk-spo",
    label: { ru: "VK «А что в СПО?»", en: "VK “What’s in TVET?”" },
    url: "https://vk.com/a_chto_v_spo",
  },
  {
    id: "vk-breathing",
    label: { ru: "VK «Дыхательные практики»", en: "VK “Breathing practices”" },
    url: "https://vk.com/natalicompasss",
  },
  {
    id: "instagram",
    label: { ru: "Instagram", en: "Instagram" },
    url: "https://www.instagram.com/natalicompass",
  },
  {
    id: "forbes",
    label: { ru: "Forbes Education Russia", en: "Forbes Education Russia" },
    url: "https://www.forbes.ru/profile/510916-natalia-dolgova",
  },
  {
    id: "email",
    label: { ru: "Email", en: "Email" },
    url: "mailto:nataliia.e.ovchinnikova@gmail.com",
  },
];

/** Публичный контактный адрес электронной почты (DEC-044). */
export const publicContactEmail = "nataliia.e.ovchinnikova@gmail.com";

export interface CommunityGroup {
  id: string;
  name: string;
  platform: "linkedin" | "telegram" | "vk";
  url: string;
  role: LocalizedText;
  description: LocalizedText;
  audienceScope?: LocalizedText;
}

/** Профессиональные сообщества и группы Наталии (DEC-042). */
export const professionalCommunities: CommunityGroup[] = [
  {
    id: "whats-in-tvet",
    name: "What’s in TVET?",
    platform: "linkedin",
    url: "https://www.linkedin.com/groups/12713149",
    role: { ru: "Основатель и модератор", en: "Founder & Moderator", zh: "创始人兼版主" },
    description: {
      ru: "Международное экспертное сообщество в сфере профессионального образования и подготовки инженерно-педагогических кадров",
      en: "International expert community in technical and vocational education, training, and educator preparation",
      zh: "技术与职业教育培训（TVET）及工程教育师资培养领域的国际专家社区",
    },
    audienceScope: { ru: "Исследователи, эксперты и преподаватели TVET", en: "TVET researchers, educators, and policy specialists", zh: "职业教育研究者、专家及教师" },
  },
  {
    id: "tvet-league-brics",
    name: "TVET League BRICS+",
    platform: "linkedin",
    url: "https://www.linkedin.com/groups/9504349",
    role: { ru: "Основатель и координатор", en: "Founder & Coordinator", zh: "创始人兼协调员" },
    description: {
      ru: "Международная сеть и экспертная площадка сотрудничества в сфере профессионального образования стран БРИКС+",
      en: "International network and platform for vocational education collaboration across BRICS+ countries",
      zh: "金砖国家+（BRICS+）职业教育与技能培训国际合作网络及专家智库平台",
    },
    audienceScope: { ru: "Исследовательские группы и образовательные организации БРИКС+", en: "Research teams and educational institutions across BRICS+", zh: "金砖国家+教育机构与科研团队" },
  },
];

/** Прямые контакты и ссылки из визитки natalicompass.aqulas.me. */
export const wellnessDirectContacts = {
  telegram1to1: "https://t.me/natali_tvet_pro",
  telegramChannel: "https://t.me/natalicompass",
  vkDirect: "https://vk.me/97402865",
  b17Profile: "https://www.b17.ru/dolgova_nataliya/",
  neurointegrationProfile: "https://trainer.neurointegration.org/profile/966067701912-nataliya-dolgova",
  breathingClubWaitlist: "https://forms.yandex.ru/u/6aabc44f90fa7b004ca6d189",
  legal: {
    offerContract: "https://disk.yandex.ru/i/kHnE1PbPWDsADA",
    informedConsent: "https://disk.yandex.ru/i/BYRuqg6yed5EvA",
    privacyPolicy: "https://disk.yandex.ru/i/15FgjGfGxgZ6MQ",
    personalDataConsent: "https://disk.yandex.ru/i/UR1mtOvJKJePBQ",
  },
} as const;

/** Идентификаторы, пригодные для schema.org `sameAs`. */
export const sameAsLinks: string[] = [
  professionalIdentifiers.orcidUrl,
  professionalIdentifiers.googleScholarUrl,
  professionalIdentifiers.scopusUrl,
  professionalIdentifiers.researcherIdUrl,
  professionalIdentifiers.elibraryUrl,
  "https://www.linkedin.com/in/natalidolgova",
  "https://www.youtube.com/Natalicompass",
  "https://www.b17.ru/dolgova_nataliya/",
  "https://trainer.neurointegration.org/profile/966067701912-nataliya-dolgova",
  "https://t.me/natalicompass",
  "https://macau.uni-kiel.de/receive/macau_mods_00002008",
  "https://www.researchgate.net/profile/Natalia-Dolgova-2",
];

export interface GeoLocation {
  city?: LocalizedText;
  country: LocalizedText;
  countryCode: string;
  timezone?: string;
  serviceModes: DeliveryMode[];
  workingHours?: {
    days: string[];
    opens: string;
    closes: string;
  };
  policy: LocalizedText;
}

/** Географическое позиционирование практики (DEC-GEO-01). */
export const practiceLocations = {
  belgrade: {
    city: { ru: "Белград", en: "Belgrade" },
    country: { ru: "Сербия", en: "Serbia" },
    countryCode: "RS",
    timezone: "Europe/Belgrade",
    serviceModes: ["in_person"] as DeliveryMode[],
    workingHours: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "23:00",
    },
    policy: {
      ru: "Очные встречи в Белграде проводятся по предварительной записи. Точный адрес кабинета согласуется персонально после подтверждения запроса.",
      en: "In-person sessions in Belgrade take place by prior appointment. The exact address is confirmed individually after booking.",
    },
  },
  online: {
    coverage: { ru: "По всему миру", en: "Worldwide" },
    languages: ["ru", "en"] as Locale[],
    serviceModes: ["online"] as DeliveryMode[],
    policy: {
      ru: "Онлайн-консультации и программы проводятся по видеосвязи на русском и английском языках.",
      en: "Online consultations and programmes are conducted via video link in Russian and English.",
    },
  },
} as const;

/** Институциональные академические локации (Science). */
export const academicLocations = [
  {
    institution: { ru: "Европейский университет Фленсбурга", en: "Europa-Universität Flensburg" },
    city: { ru: "Фленсбург", en: "Flensburg" },
    country: { ru: "Германия", en: "Germany" },
    countryCode: "DE",
    role: { ru: "Докторантура (Dr. phil., magna cum laude)", en: "Doctoral research (Dr. phil., magna cum laude)" },
  },
  {
    institution: { ru: "Московский педагогический государственный университет", en: "Moscow Pedagogical State University" },
    city: { ru: "Москва", en: "Moscow" },
    country: { ru: "Россия", en: "Russia" },
    countryCode: "RU",
    role: { ru: "Профессиональная переподготовка (Практическая психология)", en: "Professional retraining (Practical Psychology)" },
  },
] as const;


export const credentials: Credential[] = [
  {
    id: "ranhighs-finance",
    title: {
      ru: "Финансы и кредит, специализация «Банковское дело», квалификация «Экономист»",
      en: "Finance and Credit, Banking specialisation, qualification “Economist”",
    },
    issuer: { ru: "РАНХиГС, Орёл", en: "RANEPA, Oryol" },
    startDate: "2007",
    endDate: "2012",
    year: 2012,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "law-oiu-mvd",
    title: {
      ru: "Юриспруденция, специалитет с отличием",
      en: "Law, specialist degree with honours",
    },
    issuer: {
      ru: "Орловский юридический институт МВД России",
      en: "Oryol Law Institute of the Ministry of the Interior of Russia",
    },
    startDate: "2007",
    endDate: "2013",
    year: 2013,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "phd-economics",
    title: {
      ru: "Кандидат экономических наук, специальность 08.00.10 «Финансы, денежное обращение и кредит»",
      en: "Candidate of Economic Sciences, speciality 08.00.10 “Finance, Money Circulation and Credit”",
    },
    issuer: {
      ru: "Орловский государственный учебно-научно-производственный комплекс",
      en: "Oryol State Educational, Research and Production Complex",
    },
    year: 2014,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "hse-masters",
    title: {
      ru: "Магистр менеджмента, профиль «Управление в высшем образовании»",
      en: "Master of Management, “Management in Higher Education” track",
    },
    issuer: {
      ru: "НИУ ВШЭ, Институт образования",
      en: "National Research University Higher School of Education, Institute of Education",
    },
    startDate: "2014",
    endDate: "2017",
    year: 2017,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "dr-phil-flensburg",
    title: {
      ru: "Dr. phil.; диссертация Key Factors of Online Course Perceived Effectiveness for Preparing TVET Engineering Teachers in Russia; magna cum laude",
      en: "Dr. phil.; dissertation Key Factors of Online Course Perceived Effectiveness for Preparing TVET Engineering Teachers in Russia; magna cum laude",
    },
    issuer: { ru: "Europa-Universität Flensburg, Fakultät I", en: "Europa-Universität Flensburg, Faculty I" },
    startDate: "2022",
    endDate: "2026-03-12",
    year: 2026,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["science", "wellness"],
  },
  {
    id: "mphu-psychology",
    title: {
      ru: "Профессиональная переподготовка «Практическая психология», 1080 часов; квалификация «Практический психолог»; 36 часов супервизии; диплом выдан 27.02.2026",
      en: "Professional retraining “Practical Psychology”, 1,080 hours; qualification “Practical Psychologist”; 36 hours of supervision; diploma issued 27.02.2026",
    },
    issuer: {
      ru: "МПГУ, Институт педагогики и психологии",
      en: "Moscow Pedagogical State University, Institute of Pedagogy and Psychology",
    },
    startDate: "2025-02-25",
    endDate: "2026-02-19",
    year: 2026,
    hours: 1080,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["wellness"],
  },
  {
    id: "neurointegration-trainer",
    title: {
      ru: "Профессиональная переподготовка «Тренер по нейроинтеграции», 250 часов",
      en: "Professional retraining “Neurointegration Trainer”, 250 hours",
    },
    issuer: { ru: "Институт нейроинтеграции", en: "Institute of Neurointegration" },
    startDate: "2024-03-04",
    endDate: "2024-06-30",
    year: 2024,
    hours: 250,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["wellness"],
  },
  {
    id: "neurointegration-expert-trainer",
    title: {
      ru: "Neurointegration Expert, 125 часов; Neurointegration Trainer, 125 часов",
      en: "Neurointegration Expert, 125 hours; Neurointegration Trainer, 125 hours",
    },
    issuer: { ru: "Институт нейроинтеграции", en: "Institute of Neurointegration" },
    year: 2024,
    hours: 250,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["wellness"],
  },
  {
    id: "neurointegration-coach-cpd",
    title: {
      ru: "Professional Development for Certified Neurointegration Coach, 47 часов; 20 ICF CCE hours",
      en: "Professional Development for Certified Neurointegration Coach, 47 hours; 20 ICF CCE hours",
    },
    issuer: { ru: "Институт нейроинтеграции", en: "Institute of Neurointegration" },
    year: 2026,
    hours: 47,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["wellness"],
  },
  {
    id: "spbu-psychology",
    title: { ru: "«Психология», 72 часа", en: "“Psychology”, 72 hours" },
    issuer: { ru: "СПбГУ", en: "Saint Petersburg State University" },
    year: 2024,
    hours: 72,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["wellness"],
  },
  {
    id: "facilitation",
    title: { ru: "«Фасилитация», 72 академических часа", en: "“Facilitation”, 72 academic hours" },
    issuer: {
      ru: "СПбПУ Петра Великого",
      en: "Peter the Great St. Petersburg Polytechnic University",
    },
    year: 2023,
    hours: 72,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["science", "wellness"],
  },
  {
    id: "york-womens-leadership",
    title: { ru: "Women’s Leadership", en: "Women’s Leadership" },
    issuer: { ru: "University of York", en: "University of York" },
    year: 2022,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "qigong-instructor",
    title: {
      ru: "Подготовка инструкторов оздоровительного цигун; комплексы «Ба Дуань Цзин», «Лето. ОГОНЬ», «Осень Вэйци»",
      en: "Health qigong instructor training; Ba Duan Jin, Summer Fire and Autumn Weiqi sequences",
    },
    issuer: {
      ru: "Всероссийская Федерация Цигун, Оздоровительного Цигун, Даоинь и Тайцзицюань; преподаватель Виктор Борисович Стерликов",
      en: "All-Russian Federation of Qigong, Health Qigong, Daoyin and Taijiquan; teacher Viktor Borisovich Sterlikov",
    },
    startDate: "2025",
    endDate: "2026",
    year: 2026,
    lifecycleStatus: "current",
    publicationScope: "public",
    sites: ["wellness"],
  },
  {
    id: "thousand-projections",
    title: {
      ru: "Информационный курс по психологическим картам «1000 проекций»",
      en: "Information course on psychological cards “1000 Projections”",
    },
    issuer: { ru: "Компания «1000 идей»", en: "1000 Ideas company" },
    year: 2024,
    lifecycleStatus: "completed",
    publicationScope: "public",
    sites: ["wellness"],
  },
  {
    id: "oxygen-advantage",
    title: {
      ru: "Advanced Instructor Training и Functional Breathing Instructor Training",
      en: "Advanced Instructor Training and Functional Breathing Instructor Training",
    },
    issuer: { ru: "Oxygen Advantage", en: "Oxygen Advantage" },
    year: 2026,
    lifecycleStatus: "in_progress",
    publicationScope: "public",
    sites: ["wellness"],
  },
  {
    id: "study-active",
    title: {
      ru: "Level 2 Gym Instructor начат; Level 3 Personal Trainer, Level 4 Advanced Personal Training и RSPH Level 4 Award in Nutrition входят в запланированную траекторию Master PT Bundle",
      en: "Level 2 Gym Instructor started; Level 3 Personal Trainer, Level 4 Advanced Personal Training and RSPH Level 4 Award in Nutrition are planned within the Master PT Bundle track",
    },
    issuer: { ru: "Study Active", en: "Study Active" },
    year: 2026,
    lifecycleStatus: "in_progress",
    publicationScope: "public",
    sites: ["wellness"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "international-relations-2011",
    organisation: { ru: "Орловский филиал РАНХиГС", en: "Oryol branch of RANEPA" },
    role: {
      ru: "Специалист по международным связям",
      en: "International relations specialist",
    },
    startDate: "2011",
    endDate: "2013",
    summary: {
      ru: "Международные программы, иностранные студенты, академическое сотрудничество",
      en: "International programmes, international students, academic cooperation",
    },
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "teacher-economics-2012",
    organisation: { ru: "РАНХиГС, Орёл", en: "RANEPA, Oryol" },
    role: {
      ru: "Преподаватель экономических дисциплин",
      en: "Teacher of economics disciplines",
    },
    startDate: "2012",
    endDate: "2014",
    summary: { ru: "Преподавание студентам", en: "Teaching students" },
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "senior-teacher-belgu-2014",
    organisation: {
      ru: "НИУ «БелГУ»",
      en: "Belgorod State National Research University (BelSU)",
    },
    role: {
      ru: "Старший преподаватель экономических дисциплин",
      en: "Senior teacher of economics disciplines",
    },
    startDate: "2014",
    endDate: "2015",
    summary: {
      ru: "Преподавание и образовательная работа",
      en: "Teaching and educational work",
    },
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "skolkovo-2014",
    organisation: {
      ru: "Московская школа управления СКОЛКОВО",
      en: "SKOLKOVO Moscow School of Management",
    },
    role: {
      ru: "Исследовательская стажировка, исследователь и старший аналитик",
      en: "Research internship, researcher and senior analyst",
    },
    startDate: "2014",
    endDate: "2019",
    summary: {
      ru: "Исследования, аналитика, образовательные программы, трансформация образования",
      en: "Research, analytics, education programmes, education transformation",
    },
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "hse-education-2017",
    organisation: {
      ru: "Институт образования НИУ ВШЭ",
      en: "Institute of Education, National Research University Higher School of Education",
    },
    role: { ru: "Аналитическая работа", en: "Analytical work" },
    startDate: "2017",
    endDate: "2017",
    summary: { ru: "Исследования образования", en: "Education research" },
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "independent-2019",
    organisation: { ru: "Независимая практика", en: "Independent practice" },
    role: {
      ru: "Независимая аналитическая и консультационная работа",
      en: "Independent analytical and consulting work",
    },
    startDate: "2019",
    summary: {
      ru: "Образование, развитие взрослых, personal development coaching, проектная поддержка",
      en: "Education, adult development, personal development coaching, project support",
    },
    publicationScope: "public",
    sites: ["science", "wellness"],
  },
  {
    id: "ginfo-2020",
    organisation: { ru: "ГИНФО", en: "GINFO" },
    role: {
      ru: "Преподавание, модерация и сопровождение проектов",
      en: "Teaching, moderation and project support",
    },
    startDate: "2020",
    endDate: "2020",
    summary: {
      ru: "Сопровождение проектов руководителей образовательных организаций",
      en: "Support for projects by heads of education organisations",
    },
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "university-2035-2020",
    organisation: { ru: "Университет 20.35", en: "University 20.35" },
    role: { ru: "Старший аналитик", en: "Senior analyst" },
    startDate: "2020",
    endDate: "2021",
    summary: {
      ru: "Компетентностные модели, цифровое обучение, исследования",
      en: "Competence models, digital learning, research",
    },
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "ranhighs-digital-2020",
    organisation: { ru: "РАНХиГС", en: "RANEPA" },
    role: {
      ru: "Эксперт, преподаватель и модератор программ цифровой трансформации",
      en: "Expert, teacher and moderator of digital-transformation programmes",
    },
    startDate: "2020",
    endDate: "2022",
    summary: {
      ru: "Обучение взрослых и сопровождение проектов",
      en: "Adult learning and project support",
    },
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "soyuz-ssuz-2021",
    organisation: { ru: "Союз директоров ССУЗ", en: "Association of Secondary Vocational Education Directors" },
    role: {
      ru: "Заместитель исполнительного директора",
      en: "Deputy executive director",
    },
    startDate: "2021",
    endDate: "2023",
    summary: {
      ru: "Работа с профессиональным сообществом СПО",
      en: "Work with the TVET professional community",
    },
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "doctoral-flensburg-2022",
    organisation: { ru: "Europa-Universität Flensburg", en: "Europa-Universität Flensburg" },
    role: { ru: "Докторская подготовка", en: "Doctoral studies" },
    startDate: "2022",
    endDate: "2026",
    summary: {
      ru: "Исследование онлайн-подготовки педагогов СПО",
      en: "Research on online preparation for TVET educators",
    },
    publicationScope: "public",
    sites: ["science"],
  },
  {
    id: "private-practice-2026",
    organisation: { ru: "Частная практика", en: "Private practice" },
    role: {
      ru: "Психологическое консультирование и нейроинтеграционное сопровождение",
      en: "Psychological consultation and neurointegration support",
    },
    startDate: "2026-03",
    summary: {
      ru: "Частная психологическая практика с марта 2026 года",
      en: "Private psychological practice since March 2026",
    },
    publicationScope: "public",
    sites: ["wellness"],
  },
];

export interface ResearchArea {
  id: string;
  label: LocalizedText;
}

export const researchAreas: ResearchArea[] = [
  {
    id: "banking-regional",
    label: {
      ru: "Устойчивость банковской системы и региональное развитие",
      en: "Banking-system resilience and regional development",
      zh: "银行系统韧性与区域发展",
    },
  },
  {
    id: "education-finance",
    label: {
      ru: "Финансирование и управление образованием",
      en: "Education finance and management",
      zh: "教育财政与教育治理",
    },
  },
  {
    id: "academic-mobility",
    label: {
      ru: "Международная академическая мобильность",
      en: "International academic mobility",
      zh: "国际学术流动",
    },
  },
  {
    id: "university-industry",
    label: {
      ru: "Взаимодействие университетов и индустрии",
      en: "University–industry relations",
      zh: "大学与产业界协同",
    },
  },
  {
    id: "human-capital",
    label: { ru: "Человеческий капитал", en: "Human capital", zh: "人力资本" },
  },
  {
    id: "digital-transformation",
    label: { ru: "Цифровая трансформация", en: "Digital transformation", zh: "数字化转型" },
  },
  {
    id: "digital-competencies",
    label: { ru: "Цифровые компетенции", en: "Digital competencies", zh: "数字素养与数字能力" },
  },
  {
    id: "tvet-educators",
    label: {
      ru: "Профессиональное образование и подготовка педагогов СПО",
      en: "Vocational education and TVET educator preparation",
      zh: "职业教育与职业院校工程教育师资培训",
    },
  },
  {
    id: "online-learning-effectiveness",
    label: {
      ru: "Воспринимаемая эффективность онлайн-обучения взрослых",
      en: "Perceived effectiveness of online learning for adults",
      zh: "成人在线学习感知有效性",
    },
  },
  {
    id: "competence-models",
    label: {
      ru: "Образовательные программы и компетентностные модели",
      en: "Learning programmes and competence models",
      zh: "培养方案与胜任力模型",
    },
  },
];

export const researchMethods: LocalizedText[] = [
  { ru: "Количественный и качественный анализ", en: "Quantitative and qualitative analysis", zh: "定量与定性分析" },
  { ru: "Опросы", en: "Surveys", zh: "问卷调查" },
  { ru: "Интервью", en: "Interviews", zh: "深度访谈" },
  { ru: "Смешанные методы", en: "Mixed methods", zh: "混合研究方法" },
  { ru: "Триангуляция", en: "Triangulation", zh: "三角互证法" },
  { ru: "Систематизация литературы", en: "Literature synthesis", zh: "文献综述与综合" },
];

/** Масштаб опыта из профессиональной карты. */
export const scaleFacts: LocalizedText[] = [
  { ru: "Профессиональная работа — с июля 2011 года", en: "Professional work since July 2011", zh: "从事专业工作始于2011年7月" },
  { ru: "Консультирование — с 2019 года", en: "Consulting since 2019", zh: "提供专业咨询始于2019年" },
  {
    ru: "Частная психологическая практика — с марта 2026 года",
    en: "Private psychological practice since March 2026",
    zh: "私人心理咨询实践始于2026年3月",
  },
  {
    ru: "40+ разработанных программ повышения квалификации и подготовки педагогов",
    en: "40+ designed professional-development and educator-training programmes",
    zh: "研发与设计40余个教师进修与师资培训项目",
  },
  { ru: "37 образовательных проектов", en: "37 education projects", zh: "37个教育项目" },
  {
    ru: "2000+ обученных педагогов из 35 регионов",
    en: "2,000+ educators trained across 35 regions",
    zh: "培训来自35个地区的2000余名教师",
  },
  { ru: "Более 3000 часов занятий", en: "Over 3,000 hours of teaching", zh: "授课与指导超3000课时" },
  {
    ru: "100+ публикаций; выступления на российских и международных профессиональных мероприятиях",
    en: "100+ publications; presentations at Russian and international professional events",
    zh: "发表100余篇学术出版物；受邀在俄罗斯及国际学术会议发表演讲",
  },
  {
    ru: "18 случаев personal development coaching и индивидуальной аналитической поддержки",
    en: "18 cases of personal development coaching and individual analytical support",
    zh: "完成18例个人发展教练及个体分析咨询个案",
  },
  {
    ru: "Отдельный проект на 144 часа для 320 преподавателей",
    en: "A separate 144-hour project for 320 educators",
    zh: "面向320名教师的独立大型144学时进修项目",
  },
];

export interface Talk {
  id: string;
  event: LocalizedText;
  year: number;
  title: string;
  place?: string;
}

/** Доклады и профессиональные сообщества из Science-ТЗ. */
export const talks: Talk[] = [
  {
    id: "jvet-2026",
    event: {
      ru: "JVET Early Career Researcher Day Conference 2026, University of Glasgow",
      en: "JVET Early Career Researcher Day Conference 2026, University of Glasgow",
    },
    year: 2026,
    title:
      "Vocational Educator Training as a Structural Condition for Equitable School-to-Work Transitions",
    place: "Glasgow",
  },
  {
    id: "ecer-2025",
    event: { ru: "ECER 2025", en: "ECER 2025" },
    year: 2025,
    title:
      "Exploring Educators’ Perspectives: Key Qualitative Insights on the Effectiveness of Online Courses for TVET Engineering Educators",
  },
  {
    id: "inap-2025",
    event: { ru: "INAP 2025", en: "INAP 2025" },
    year: 2025,
    title:
      "Next-Gen Learning: The Role of Advanced Technologies in Preparing TVET Engineering Educators",
  },
  {
    id: "crossing-boundaries-2025",
    event: {
      ru: "Crossing Boundaries 2025",
      en: "Crossing Boundaries 2025",
    },
    year: 2025,
    title:
      "Factors Influencing the Effectiveness of Online Training for VET Engineering Educators",
  },
  {
    id: "jvet-16th-2025",
    event: {
      ru: "16th International JVET Conference 2025",
      en: "16th International JVET Conference 2025",
    },
    year: 2025,
    title: "16th International JVET Conference",
    place: "Oxford",
  },
  {
    id: "stories-2025",
    event: { ru: "STORIES 2025, University of Oxford", en: "STORIES 2025, University of Oxford" },
    year: 2025,
    title: "Future-Ready TVET Engineering Educators",
    place: "Oxford",
  },
];

/** Профессиональные сети из Science-ТЗ. */
export const researchNetworks: LocalizedText[] = [
  { ru: "VETNET", en: "VETNET" },
  {
    ru: "European Emerging Researchers Network of VETNET",
    en: "European Emerging Researchers Network of VETNET",
  },
  { ru: "JVET Early Career Researchers network", en: "JVET Early Career Researchers network" },
];

const bibtexTypeMap: Record<PublicationType, string> = {
  thesis: "phdthesis",
  journal_article: "article",
  book_chapter: "incollection",
  conference_paper: "inproceedings",
  abstract: "misc",
  professional_article: "misc",
  presentation: "misc",
};

/** Экспорт записи публикации в формате BibTeX. */
export function publicationToBibTeX(publication: Publication): string {
  const fields: string[] = [`  title = {${publication.title}}`];
  fields.push(`  author = {${publication.authors.join(" and ")}}`);
  fields.push(`  year = {${publication.year}}`);
  if (publication.venue) {
    fields.push(`  howpublished = {${publication.venue}}`);
  }
  if (publication.doi) {
    fields.push(`  doi = {${publication.doi}}`);
  }
  if (publication.url) {
    fields.push(`  url = {${publication.url}}`);
  }

  return `@${bibtexTypeMap[publication.type]}{${publication.id},\n${fields.join(",\n")}\n}`;
}
