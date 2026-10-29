/**
 * Общие модели и подтверждённые данные профессионального профиля.
 * Источник: docs/specs/00-professional-map.md и docs/specs/30-shared-implementation-contract.md.
 * Статусы описывают жизненный цикл и публикацию, а не достоверность сведений.
 */

export type Locale = "ru" | "en";
export type SiteKey = "wellness" | "science";

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
  role: string;
  email: string;
  projectType: string;
  intendedResult: string;
  audience: string;
  timeline: string;
  budgetRange: string;
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
    en: "Natalia Dolgova",
  },
  languages: ["ru", "en"],
  wellnessRole: {
    ru: "Практический психолог и тренер по нейроинтеграции",
    en: "Practical psychologist and neurointegration trainer",
  },
  scienceRole: {
    ru: "Исследователь профессионального образования и обучения взрослых, Dr. phil., кандидат экономических наук",
    en: "Researcher in vocational education and adult learning, Dr. phil., Candidate of Economic Sciences",
  },
};

/** Пять опорных фактов из профессиональной карты. */
export const keyFacts: LocalizedText[] = [
  {
    ru: "Dr. phil., Europa-Universität Flensburg, 2026, итоговая оценка magna cum laude",
    en: "Dr. phil., Europa-Universität Flensburg, 2026, overall magna cum laude",
  },
  {
    ru: "Кандидат экономических наук, 2014",
    en: "Candidate of Economic Sciences, 2014",
  },
  {
    ru: "Практический психолог, МПГУ, программа профессиональной переподготовки 1080 часов, 2026",
    en: "Practical psychologist, Moscow Pedagogical State University, 1,080-hour professional retraining programme, 2026",
  },
  {
    ru: "Исследования, преподавание и разработка образовательных программ с 2011 года",
    en: "Research, teaching and education programme design since 2011",
  },
  {
    ru: "Тренер по нейроинтеграции, профессиональная переподготовка 250 часов, 2024",
    en: "Neurointegration trainer, 250-hour professional retraining programme, 2024",
  },
];

export const professionalIdentifiers = {
  orcid: "0000-0003-0816-2103",
  orcidUrl: "https://orcid.org/0000-0003-0816-2103",
  researcherId: "A-9484-2016",
  scopusAuthorId: "57202091034",
} as const;

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
  "https://www.linkedin.com/in/natalidolgova",
  "https://www.youtube.com/Natalicompass",
];

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
    },
  },
  {
    id: "education-finance",
    label: {
      ru: "Финансирование и управление образованием",
      en: "Education finance and management",
    },
  },
  {
    id: "academic-mobility",
    label: {
      ru: "Международная академическая мобильность",
      en: "International academic mobility",
    },
  },
  {
    id: "university-industry",
    label: {
      ru: "Взаимодействие университетов и индустрии",
      en: "University–industry relations",
    },
  },
  {
    id: "human-capital",
    label: { ru: "Человеческий капитал", en: "Human capital" },
  },
  {
    id: "digital-transformation",
    label: { ru: "Цифровая трансформация", en: "Digital transformation" },
  },
  {
    id: "digital-competencies",
    label: { ru: "Цифровые компетенции", en: "Digital competencies" },
  },
  {
    id: "tvet-educators",
    label: {
      ru: "Профессиональное образование и подготовка педагогов СПО",
      en: "Vocational education and TVET educator preparation",
    },
  },
  {
    id: "online-learning-effectiveness",
    label: {
      ru: "Воспринимаемая эффективность онлайн-обучения взрослых",
      en: "Perceived effectiveness of online learning for adults",
    },
  },
  {
    id: "competence-models",
    label: {
      ru: "Образовательные программы и компетентностные модели",
      en: "Learning programmes and competence models",
    },
  },
];

export const researchMethods: LocalizedText[] = [
  { ru: "Количественный и качественный анализ", en: "Quantitative and qualitative analysis" },
  { ru: "Опросы", en: "Surveys" },
  { ru: "Интервью", en: "Interviews" },
  { ru: "Смешанные методы", en: "Mixed methods" },
  { ru: "Триангуляция", en: "Triangulation" },
  { ru: "Систематизация литературы", en: "Literature synthesis" },
];

/** Масштаб опыта из профессиональной карты. */
export const scaleFacts: LocalizedText[] = [
  { ru: "Профессиональная работа — с июля 2011 года", en: "Professional work since July 2011" },
  { ru: "Консультирование — с 2019 года", en: "Consulting since 2019" },
  {
    ru: "Частная психологическая практика — с марта 2026 года",
    en: "Private psychological practice since March 2026",
  },
  {
    ru: "40+ разработанных программ повышения квалификации и подготовки педагогов",
    en: "40+ designed professional-development and educator-training programmes",
  },
  { ru: "37 образовательных проектов", en: "37 education projects" },
  {
    ru: "2000+ обученных педагогов из 35 регионов",
    en: "2,000+ educators trained across 35 regions",
  },
  { ru: "Более 3000 часов занятий", en: "Over 3,000 hours of teaching" },
  {
    ru: "100+ публикаций; выступления на российских и международных профессиональных мероприятиях",
    en: "100+ publications; presentations at Russian and international professional events",
  },
  {
    ru: "18 случаев personal development coaching и индивидуальной аналитической поддержки",
    en: "18 cases of personal development coaching and individual analytical support",
  },
  {
    ru: "Отдельный проект на 144 часа для 320 преподавателей",
    en: "A separate 144-hour project for 320 educators",
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
