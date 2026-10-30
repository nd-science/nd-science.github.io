import type { Locale } from "@natali/profile";

export const scienceCopy = {
  ru: {
    siteLabel: "Science", fallbackSiteUrl: "https://science.invalid", crossSiteLabel: "Практика саморегуляции и консультации", crossSiteHrefBase: "https://wellness.invalid",
    nav: [
      { href: "/ru/", label: "Главная" }, { href: "/ru/about/", label: "Биография" }, { href: "/ru/research/", label: "Исследования" },
      { href: "/ru/publications/", label: "Публикации" }, { href: "/ru/education/", label: "Образование" }, { href: "/ru/projects/", label: "Проекты" },
      { href: "/ru/expert-services/", label: "Услуги" }, { href: "/ru/contact/", label: "Контакты" },
    ],
    updatedPrefix: "Обновлено", footer: "Научный и экспертный профиль Наталии Долговой.",
    sections: {
      credentials: { title: "Квалификации и академический путь", description: "Квалификации и профессиональная хронология Наталии." },
      publications: { title: "Библиографический реестр", description: "Работы под фамилиями Dolgova и Ovchinnikova относятся к одному авторскому профилю." },
      profiles: { title: "Научные профили", description: "Метрики публикуются только раздельно по базе и с датой обновления." },
      form: { title: "Бриф сотрудничества", description: "Не прикладывайте рукописи, персональные данные участников исследования или конфиденциальные материалы." },
    },
    form: {
      name: "Имя", organisation: "Организация", role: "Роль", email: "Email для ответа", language: "Язык", projectType: "Тип проекта", result: "Ожидаемый результат", audience: "Аудитория", timeline: "Сроки", budget: "Бюджетный диапазон", comment: "Комментарий", consent: "Я согласен(на) на обработку данных для ответа на запрос.", submit: "Отправить запрос", honeypot: "Не заполняйте это поле",
      notConnected: {
        title: "Прямая связь для обсуждения проектов",
        intro: "Пока веб-форма настраивается, экспертные запросы можно направить напрямую через личные сообщения или академические каналы:",
        telegramBtn: "Написать Наталии в Telegram (@natali_tvet_pro)",
        telegramUrl: "https://t.me/natali_tvet_pro",
        linkedinLabel: "Профиль в LinkedIn",
        linkedinUrl: "https://www.linkedin.com/in/natalidolgova",
        checklistTitle: "Что желательно указать в первом сообщении:",
        checklistItems: [
          "Организация и ваша роль",
          "Тип задачи: исследование, аналитика, разработка программы, фасилитация или выступление",
          "Предполагаемые сроки, аудитория и формат (онлайн/очно)",
        ],
        responseTime: "Ответ на релевантные запросы — до трёх рабочих дней.",
      },
    },
    languageOptions: [
      { value: "ru", label: "русский" },
      { value: "en", label: "английский" },
    ],
    projectTypeOptions: [
      { value: "research", label: "исследование" },
      { value: "analytics", label: "аналитика" },
      { value: "programme-design", label: "проектирование программ" },
      { value: "facilitation", label: "фасилитация" },
      { value: "speaking", label: "выступление" },
    ],
    budgetOptions: [
      { value: "not-set", label: "Пока не определён" },
      { value: "under-2500", label: "до €2,500" },
      { value: "2500-7500", label: "€2,500–€7,500" },
      { value: "over-7500", label: "от €7,500" },
    ],
  },
  en: {
    siteLabel: "Science", fallbackSiteUrl: "https://science.invalid", crossSiteLabel: "Wellbeing Practice & Counselling", crossSiteHrefBase: "https://wellness.invalid",
    nav: [
      { href: "/en/", label: "Home" }, { href: "/en/about/", label: "Biography" }, { href: "/en/research/", label: "Research" },
      { href: "/en/publications/", label: "Publications" }, { href: "/en/education/", label: "Education" }, { href: "/en/projects/", label: "Projects" },
      { href: "/en/expert-services/", label: "Services" }, { href: "/en/contact/", label: "Contacts" },
    ],
    updatedPrefix: "Updated", footer: "Nataliia Dolgova’s research and expert profile.",
    sections: {
      credentials: { title: "Qualifications and academic path", description: "Nataliia’s qualifications and professional chronology." },
      publications: { title: "Bibliographic register", description: "Works published under Dolgova and Ovchinnikova belong to one author profile." },
      profiles: { title: "Research profiles", description: "Metrics are shown separately by database and always with an as-of date." },
      form: { title: "Collaboration brief", description: "Do not attach manuscripts, research-participant personal data or confidential material." },
    },
    form: {
      name: "Name", organisation: "Organisation", role: "Role", email: "Reply email", language: "Language", projectType: "Project type", result: "Intended result", audience: "Audience", timeline: "Timeline", budget: "Budget range", comment: "Comment", consent: "I agree to data processing in order to receive a response.", submit: "Submit an enquiry", honeypot: "Do not fill this field in",
      notConnected: {
        title: "Direct contact for project inquiries",
        intro: "While the enquiry form is being configured, expert proposals can be sent directly via messaging or academic networks:",
        telegramBtn: "Message Nataliia on Telegram (@natali_tvet_pro)",
        telegramUrl: "https://t.me/natali_tvet_pro",
        linkedinLabel: "LinkedIn Profile",
        linkedinUrl: "https://www.linkedin.com/in/natalidolgova",
        checklistTitle: "Recommended details for your initial message:",
        checklistItems: [
          "Organisation and your role",
          "Project type: research, analytics, programme design, facilitation, or speaking",
          "Expected timeline, audience, and format (online/in person)",
        ],
        responseTime: "Replies to relevant inquiries within three business days.",
      },
    },
    languageOptions: [
      { value: "ru", label: "Russian" },
      { value: "en", label: "English" },
    ],
    projectTypeOptions: [
      { value: "research", label: "Research" },
      { value: "analytics", label: "Analytics" },
      { value: "programme-design", label: "Programme design" },
      { value: "facilitation", label: "Facilitation" },
      { value: "speaking", label: "Speaking" },
    ],
    budgetOptions: [
      { value: "not-set", label: "Not set yet" },
      { value: "under-2500", label: "Under €2,500" },
      { value: "2500-7500", label: "€2,500–€7,500" },
      { value: "over-7500", label: "€7,500+" },
    ],
  },
} satisfies Record<Locale, unknown>;
