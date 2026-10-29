import type { Locale } from "@natali/profile";

export const scienceCopy = {
  ru: {
    siteLabel: "Science", fallbackSiteUrl: "https://science.invalid", crossSiteLabel: "Wellness — практический профиль", crossSiteHrefBase: "https://wellness.invalid",
    nav: [
      { href: "/ru/", label: "Главная" }, { href: "/ru/about/", label: "Биография" }, { href: "/ru/research/", label: "Исследования" },
      { href: "/ru/publications/", label: "Публикации" }, { href: "/ru/education/", label: "Образование" }, { href: "/ru/projects/", label: "Проекты" },
      { href: "/ru/expert-services/", label: "Услуги" }, { href: "/ru/contact/", label: "Контакт" },
    ],
    updatedPrefix: "Обновлено", footer: "Научный и экспертный профиль Наталии Долговой.",
    sections: {
      credentials: { title: "Образование и степени", description: "Квалификации и профессиональная хронология Наталии." },
      publications: { title: "Библиографический реестр", description: "Работы под фамилиями Dolgova и Ovchinnikova относятся к одному авторскому профилю." },
      profiles: { title: "Научные профили", description: "Метрики публикуются только раздельно по базе и с датой обновления." },
      form: { title: "Бриф сотрудничества", description: "Не прикладывайте рукописи, персональные данные участников исследования или конфиденциальные материалы." },
    },
    form: { name: "Имя", organisation: "Организация", role: "Роль", email: "Email для ответа", language: "Язык", projectType: "Тип проекта", result: "Ожидаемый результат", audience: "Аудитория", timeline: "Сроки", budget: "Бюджетный диапазон", comment: "Комментарий", consent: "Я согласен(на) на обработку данных для ответа на запрос.", submit: "Отправить запрос", honeypot: "Не заполняйте это поле", notConnected: "Форма будет активирована в защищённом preview после настройки Turnstile, Resend и адреса назначения." },
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
    siteLabel: "Science", fallbackSiteUrl: "https://science.invalid", crossSiteLabel: "Wellness — practice profile", crossSiteHrefBase: "https://wellness.invalid",
    nav: [
      { href: "/en/", label: "Home" }, { href: "/en/about/", label: "Biography" }, { href: "/en/research/", label: "Research" },
      { href: "/en/publications/", label: "Publications" }, { href: "/en/education/", label: "Education" }, { href: "/en/projects/", label: "Projects" },
      { href: "/en/expert-services/", label: "Services" }, { href: "/en/contact/", label: "Contact" },
    ],
    updatedPrefix: "Updated", footer: "Natalia Dolgova’s research and expert profile.",
    sections: {
      credentials: { title: "Education and degrees", description: "Natalia’s qualifications and professional chronology." },
      publications: { title: "Bibliographic register", description: "Works published under Dolgova and Ovchinnikova belong to one author profile." },
      profiles: { title: "Research profiles", description: "Metrics are shown separately by database and always with an as-of date." },
      form: { title: "Collaboration brief", description: "Do not attach manuscripts, research-participant personal data or confidential material." },
    },
    form: { name: "Name", organisation: "Organisation", role: "Role", email: "Reply email", language: "Language", projectType: "Project type", result: "Intended result", audience: "Audience", timeline: "Timeline", budget: "Budget range", comment: "Comment", consent: "I agree to data processing in order to receive a response.", submit: "Submit an enquiry", honeypot: "Do not fill this field in", notConnected: "The form will be activated in the protected preview after Turnstile, Resend and the destination address are configured." },
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
