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
        title: "Связанные услуги",
        description: "Форматы, в которых это направление может использоваться.",
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
        contact: "Email для ответа",
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
        contact: "Email для ответа",
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
        title: "Форма подключается отдельно",
        text: "Приём заявок настраивается вместе с защищённым адресом назначения. До этого момента здесь опубликованы только условия первой встречи.",
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
        title: "Related services",
        description: "Formats in which this area of work may be used.",
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
        contact: "Reply email",
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
        contact: "Reply email",
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
        title: "The form is connected separately",
        text: "Enquiry intake is set up together with a protected destination address. Until then, only the terms of the first meeting are published here.",
      },
    },
  },
} satisfies Record<Locale, unknown>;
