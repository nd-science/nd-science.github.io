import type { Locale } from "@natali/profile";

interface SectionHeadingCopy {
  title: string;
  description?: string;
}

/**
 * Служебные строки интерфейса Wellness-сайта.
 * Контент страниц хранится в контентных коллекциях (docs/specs/10-wellness-site-spec.md).
 */
export const wellnessCopy = {
  ru: {
    siteLabel: "Wellness",
    crossSiteLabel: "Академический профиль (Dr. phil.)",
    crossSiteHrefBase: "https://science.invalid",
    fallbackSiteUrl: "https://wellness.invalid",
    nav: [
      { href: "/ru/", label: "Главная" },
      { href: "/ru/for-individuals/", label: "Для частных клиентов" },
      { href: "/ru/practices/psychology/", label: "Психология" },
      { href: "/ru/practices/neurointegration/", label: "Нейроинтеграция" },
      { href: "/ru/practices/breathing/", label: "Дыхание" },
      { href: "/ru/practices/movement-qigong/", label: "Движение и цигун" },
      { href: "/ru/practices/play-and-story/", label: "Игра и сказка" },
      { href: "/ru/for-organizations/", label: "Для организаций" },
      { href: "/ru/booking/", label: "Контакты" },
    ],
    updatedPrefix: "Обновлено",
    footer: "Черновой wellness-сайт. Не является медицинской рекомендацией.",
    sections: {
      services: {
        title: "Форматы и цены",
        description:
          "Для каждого формата указаны длительность, стоимость и следующий шаг. Первая встреча платная.",
      } satisfies SectionHeadingCopy,
      methods: {
        title: "Направления работы",
        description:
          "Пять направлений, которые можно комбинировать под конкретный запрос.",
      } satisfies SectionHeadingCopy,
      relatedServices: {
        title: "Форматы работы и цены",
        description: "Форматы, в которых применяется этот подход, и варианты начала работы.",
      } satisfies SectionHeadingCopy,
      credentials: {
        title: "Квалификации",
        description:
          "Образование и профессиональная подготовка, на которых основана работа.",
      } satisfies SectionHeadingCopy,
      enquiry: {
        title: "Форма первичного обращения",
        description:
          "Короткая форма не собирает диагнозы и подробную историю здоровья.",
      } satisfies SectionHeadingCopy,
      organisationForm: {
        title: "Корпоративный бриф",
        description:
          "После брифа согласуются аудитория, задача, длительность, формат, материалы и критерии обратной связи.",
      } satisfies SectionHeadingCopy,
    },
    serviceFields: {
      audience: "Для кого",
      task: "Задача",
      format: "Формат",
      duration: "Длительность",
      price: "Стоимость",
      includes: "Входит в формат",
      outcome: "Результат встречи",
    },
    delivery: {
      online: "онлайн",
      in_person: "очно",
      hybrid: "онлайн и очно",
    },
    units: {
      participant: "с участника",
    },
    availability: {
      pilot: "Формируется группа",
      planned: "Планируется",
    },
    lifecycle: {
      current: "сейчас",
      in_progress: "обучение продолжается",
      planned: "планируется",
    },
    forms: {
      private: {
        name: "Имя",
        contact: "Контакт для связи (Telegram, WhatsApp, Email или телефон)",
        contactPlaceholder: "@username в Telegram, WhatsApp (+7 / +381...) или email",
        contactHint: "Укажите удобный для вас способ — Наталия ответит именно туда.",
        language: "Язык встреч",
        timezone: "Часовой пояс",
        format: "Предпочтительный формат",
        service: "Услуга",
        servicePlaceholder: "Выберите услугу",
        request: "Кратко опишите запрос",
        requestHint: "Без лишних чувствительных подробностей — уточним детали на встрече.",
        adult: "Мне исполнилось 18 лет.",
        consent:
          "Я согласен(на) на обработку персональных данных для ответа на обращение.",
        submit: "Отправить заявку",
        honeypot: "Не заполняйте это поле",
      },
      organisation: {
        organisation: "Организация",
        role: "Ваша роль",
        contact: "Контакт для связи (Telegram, WhatsApp, Email или телефон)",
        contactPlaceholder: "@username в Telegram, WhatsApp, телефон или email",
        contactHint: "Укажите удобный способ связи для обсуждения брифа.",
        language: "Язык",
        groupSize: "Размер группы",
        task: "Задача",
        format: "Желаемый формат",
        timeline: "Сроки",
        comment: "Комментарий",
        consent:
          "Я согласен(на) на обработку персональных данных для ответа на обращение.",
        submit: "Отправить бриф",
        honeypot: "Не заполняйте это поле",
      },
      languageOptions: [
        { value: "ru", label: "русский" },
        { value: "en", label: "английский" },
      ],
      formatOptions: [
        { value: "online", label: "онлайн" },
        { value: "in_person", label: "очно" },
        { value: "any", label: "неважно" },
      ],
      notConnected: {
        title: "Прямая запись и согласование времени",
        text: "Пока веб-форма настраивается, запись на установочную встречу или обращение по корпоративным программам открыты напрямую в личных сообщениях.",
        privateTitle: "Прямая запись на установочную встречу",
        privateIntro: "Напишите Наталии в Telegram для согласования времени и деталей консультации:",
        telegramBtn: "Написать в Telegram: @natali_tvet_pro",
        telegramUrl: "https://t.me/natali_tvet_pro",
        b17Label: "Анкета и запись на B17.ru",
        b17Url: "https://www.b17.ru/dolgova_nataliya/",
        vkLabel: "Личные сообщения ВКонтакте",
        vkUrl: "https://vk.me/97402865",
        checklistTitle: "Что указать в сообщении:",
        checklistItems: [
          "Ваше имя и часовой пояс",
          "Кратко суть запроса (без чувствительных медицинских деталей)",
          "Предпочтительный формат: онлайн или очно в Белграде",
        ],
        orgTitle: "Корпоративный запрос и программы для команд",
        orgIntro: "Для обсуждения воркшопов, тренингов и программ стресс-менеджмента для вашей организации напишите напрямую:",
        orgChecklistTitle: "Что указать в запросе:",
        orgChecklistItems: [
          "Организация и ваша роль",
          "Примерный размер группы и ключевые задачи команды",
          "Ориентировочные сроки и предпочтительный формат",
        ],
        responseTime: "Ответ на сообщение — обычно в течение одного рабочего дня.",
      },
    },
  },
  en: {
    siteLabel: "Wellness",
    crossSiteLabel: "Academic & Research Profile (Dr. phil.)",
    crossSiteHrefBase: "https://science.invalid",
    fallbackSiteUrl: "https://wellness.invalid",
    nav: [
      { href: "/en/", label: "Home" },
      { href: "/en/for-individuals/", label: "For individuals" },
      { href: "/en/practices/psychology/", label: "Psychology" },
      { href: "/en/practices/neurointegration/", label: "Neurointegration" },
      { href: "/en/practices/breathing/", label: "Breathing" },
      { href: "/en/practices/movement-qigong/", label: "Movement & qigong" },
      { href: "/en/practices/play-and-story/", label: "Play & story" },
      { href: "/en/for-organizations/", label: "For organisations" },
      { href: "/en/booking/", label: "Contacts" },
    ],
    updatedPrefix: "Updated",
    footer: "Draft wellness website. It does not provide medical advice.",
    sections: {
      services: {
        title: "Formats and prices",
        description:
          "Each format lists its duration, price and next step. The first meeting is paid.",
      } satisfies SectionHeadingCopy,
      methods: {
        title: "Areas of work",
        description:
          "Five areas that can be combined around a specific request.",
      } satisfies SectionHeadingCopy,
      relatedServices: {
        title: "Formats and pricing",
        description: "Formats in which this approach is used, and ways to begin.",
      } satisfies SectionHeadingCopy,
      credentials: {
        title: "Qualifications",
        description:
          "Education and professional training behind the practice.",
      } satisfies SectionHeadingCopy,
      enquiry: {
        title: "Initial enquiry form",
        description:
          "The short form does not collect diagnoses or a detailed health history.",
      } satisfies SectionHeadingCopy,
      organisationForm: {
        title: "Organisational brief",
        description:
          "The brief is followed by agreeing the audience, task, duration, format, materials and feedback criteria.",
      } satisfies SectionHeadingCopy,
    },
    serviceFields: {
      audience: "For whom",
      task: "Task",
      format: "Format",
      duration: "Duration",
      price: "Price",
      includes: "Includes",
      outcome: "Outcome of the meeting",
    },
    delivery: {
      online: "online",
      in_person: "in person",
      hybrid: "online and in person",
    },
    units: {
      participant: "per participant",
    },
    availability: {
      pilot: "Group forming",
      planned: "Planned",
    },
    lifecycle: {
      current: "current",
      in_progress: "training in progress",
      planned: "planned",
    },
    forms: {
      private: {
        name: "Name",
        contact: "Contact info (Telegram, WhatsApp, Email, or Phone)",
        contactPlaceholder: "@username on Telegram, WhatsApp (+7 / +381...), or email",
        contactHint: "Enter your preferred channel — Nataliia will reply directly there.",
        language: "Meeting language",
        timezone: "Time zone",
        format: "Preferred format",
        service: "Service",
        servicePlaceholder: "Choose a service",
        request: "Briefly describe your request",
        requestHint: "Without unnecessary sensitive detail — we will clarify the specifics in the meeting.",
        adult: "I am 18 or older.",
        consent: "I agree to the processing of personal data in order to respond to this enquiry.",
        submit: "Submit an enquiry",
        honeypot: "Do not fill this field in",
      },
      organisation: {
        organisation: "Organisation",
        role: "Your role",
        contact: "Contact info (Telegram, WhatsApp, Email, or Phone)",
        contactPlaceholder: "@username on Telegram, WhatsApp, phone, or email",
        contactHint: "Enter your preferred channel to discuss the brief.",
        language: "Language",
        groupSize: "Group size",
        task: "Task",
        format: "Desired format",
        timeline: "Timeline",
        comment: "Comment",
        consent: "I agree to the processing of personal data in order to respond to this enquiry.",
        submit: "Submit a brief",
        honeypot: "Do not fill this field in",
      },
      languageOptions: [
        { value: "ru", label: "Russian" },
        { value: "en", label: "English" },
      ],
      formatOptions: [
        { value: "online", label: "online" },
        { value: "in_person", label: "in person" },
        { value: "any", label: "either" },
      ],
      notConnected: {
        title: "Direct booking and consultations",
        text: "While the web form is being configured, session bookings and corporate inquiries are open directly via messaging.",
        privateTitle: "Direct booking for an introductory consultation",
        privateIntro: "Message Nataliia on Telegram to arrange a convenient time and session details:",
        telegramBtn: "Message on Telegram: @natali_tvet_pro",
        telegramUrl: "https://t.me/natali_tvet_pro",
        b17Label: "B17.ru psychologist profile",
        b17Url: "https://www.b17.ru/dolgova_nataliya/",
        vkLabel: "VK direct messages",
        vkUrl: "https://vk.me/97402865",
        checklistTitle: "What to include in your message:",
        checklistItems: [
          "Your name and time zone",
          "Brief description of your request (without sensitive medical details)",
          "Preferred format: online or in person in Belgrade",
        ],
        orgTitle: "Corporate inquiries and workshops",
        orgIntro: "To discuss workshops, webinars, or stress resilience programs for your team, please reach out directly:",
        orgChecklistTitle: "What to include in your inquiry:",
        orgChecklistItems: [
          "Organisation and your role",
          "Approximate group size and team objectives",
          "Estimated timeline and preferred format",
        ],
        responseTime: "Reply within one business day.",
      },
    },
  },
} satisfies Record<Locale, unknown>;
