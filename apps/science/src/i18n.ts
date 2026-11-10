import type { Locale } from "@natali/profile";

export const scienceCopy: Record<string, any> = {
  ru: {
    siteLabel: "Science", fallbackSiteUrl: "https://science.invalid", crossSiteCategory: "Саморегуляция и здоровье", crossSiteLabel: "Наталия о саморегуляции и здоровье", crossSiteHrefBase: "https://wellness.invalid",
    nav: [
      { href: "/ru/", label: "Главная" }, { href: "/ru/about/", label: "Биография" }, { href: "/ru/research/", label: "Исследования" },
      { href: "/ru/publications/", label: "Публикации" }, { href: "/ru/education/", label: "Образование" }, { href: "/ru/projects/", label: "Проекты" },
      { href: "/ru/expert-services/", label: "Услуги" }, { href: "/ru/contact/", label: "Контакты" },
    ],
    updatedPrefix: "Обновлено", footer: "Научный и экспертный профиль Наталии Долговой.",
    sections: {
      credentials: { title: "Квалификации и академический путь", description: "Квалификации и хронология исследовательской деятельности." },
      publications: { title: "Библиографический реестр", description: "Работы под фамилиями Dolgova и Ovchinnikova относятся к одному авторскому профилю." },
      profiles: { title: "Научные профили и показатели", description: "Профили исследователя в международных базах данных и верифицированная наукометрия." },
      form: { title: "Бриф сотрудничества", description: "Не прикладывайте рукописи, персональные данные участников исследования или конфиденциальные материалы." },
    },
    form: {
      name: "Имя", organisation: "Организация", role: "Роль", email: "Email для ответа", language: "Язык", projectType: "Тип проекта", result: "Ожидаемый результат", audience: "Аудитория", timeline: "Сроки", budget: "Бюджетный диапазон", comment: "Комментарий", consent: "Я согласен(на) на обработку данных для ответа на запрос.", submit: "Отправить запрос", honeypot: "Не заполняйте это поле",
      notConnected: {
        title: "Прямая связь для обсуждения проектов",
        intro: "Для обсуждения исследовательских, аналитических и образовательных проектов напишите напрямую через личные сообщения или академические каналы:",
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
    siteLabel: "Science", fallbackSiteUrl: "https://science.invalid", crossSiteCategory: "Wellbeing & Practice", crossSiteLabel: "Nataliia on wellbeing and self-regulation", crossSiteHrefBase: "https://wellness.invalid",
    nav: [
      { href: "/en/", label: "Home" }, { href: "/en/about/", label: "Biography" }, { href: "/en/research/", label: "Research" },
      { href: "/en/publications/", label: "Publications" }, { href: "/en/education/", label: "Education" }, { href: "/en/projects/", label: "Projects" },
      { href: "/en/expert-services/", label: "Services" }, { href: "/en/contact/", label: "Contacts" },
    ],
    updatedPrefix: "Updated", footer: "Nataliia Dolgova’s research and expert profile.",
    sections: {
      credentials: { title: "Qualifications and academic path", description: "Qualifications and research chronology." },
      publications: { title: "Bibliographic register", description: "Works published under Dolgova and Ovchinnikova belong to one author profile." },
      profiles: { title: "Research profiles and metrics", description: "Author profiles across international scholarly databases and verified bibliometrics." },
      form: { title: "Collaboration brief", description: "Do not attach manuscripts, research-participant personal data or confidential material." },
    },
    form: {
      name: "Name", organisation: "Organisation", role: "Role", email: "Reply email", language: "Language", projectType: "Project type", result: "Intended result", audience: "Audience", timeline: "Timeline", budget: "Budget range", comment: "Comment", consent: "I agree to data processing in order to receive a response.", submit: "Submit an enquiry", honeypot: "Do not fill this field in",
      notConnected: {
        title: "Direct contact for project inquiries",
        intro: "To discuss research, analytical or educational collaboration, message directly via messaging or academic networks:",
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
  zh: {
    siteLabel: "Science", fallbackSiteUrl: "https://science.invalid", crossSiteLabel: "身心健康实践与咨询", crossSiteHrefBase: "https://wellness.invalid",
    nav: [
      { href: "/zh/", label: "首页" }, { href: "/zh/about/", label: "学者履历" }, { href: "/zh/research/", label: "学术研究" },
      { href: "/zh/publications/", label: "学术出版物" }, { href: "/zh/education/", label: "教育背景" }, { href: "/zh/projects/", label: "研究项目" },
      { href: "/zh/expert-services/", label: "专业咨询与服务" }, { href: "/zh/contact/", label: "联系方式" },
    ],
    updatedPrefix: "最后更新", footer: "娜塔莉亚·多尔戈娃的学术与专业咨询主页。",
    sections: {
      credentials: { title: "专业资质与学术历程", description: "学术资历、学位与科研教学时间线。" },
      publications: { title: "文献目录与出版名录", description: "以 Dolgova 与 Ovchinnikova 署名的学术成果均属于同一学者档案。" },
      profiles: { title: "学术标识与科研计量指标", description: "国际学术数据库中的学者档案及经核实的文献计量数据。" },
      form: { title: "合作意向简报", description: "请勿上传论文手稿、研究受试者个人敏感信息或涉密机密材料。" },
    },
    form: {
      name: "姓名", organisation: "机构 / 单位", role: "职务 / 角色", email: "回复邮箱", language: "首选沟通语言", projectType: "项目类型", result: "预期目标与成果", audience: "受众群体", timeline: "预期周期与时间表", budget: "预算范围", comment: "留言或需求说明", consent: "我同意为处理此合作咨询而处理上述个人数据。", submit: "提交合作咨询", honeypot: "请勿填写此项",
      notConnected: {
        title: "直接联系洽谈合作",
        intro: "如需探讨学术研究、深度分析、培训项目研发或专题演讲等合作，请直接通过 Telegram 或学术社交网络联系：",
        telegramBtn: "在 Telegram 上联系娜塔莉亚 (@natali_tvet_pro)",
        telegramUrl: "https://t.me/natali_tvet_pro",
        linkedinLabel: "LinkedIn 领英主页",
        linkedinUrl: "https://www.linkedin.com/in/natalidolgova",
        checklistTitle: "建议在首封沟通信息中注明：",
        checklistItems: [
          "您所在的机构名称及职务角色",
          "合作类型：科学研究、行业分析、课程设计、专题工作坊或特邀演讲",
          "预计周期、受众规模及交付形式（线上或线下）",
        ],
        responseTime: "通常在三个工作日内回复相关合作咨询。",
      },
    },
    languageOptions: [
      { value: "ru", label: "俄语 (Russian)" },
      { value: "en", label: "英语 (English)" },
      { value: "zh", label: "中文 (Chinese)" },
    ],
    projectTypeOptions: [
      { value: "research", label: "科学研究" },
      { value: "analytics", label: "行业分析与政策研究" },
      { value: "programme-design", label: "培训课程与培养方案研发" },
      { value: "facilitation", label: "引导式工作坊与学术研讨" },
      { value: "speaking", label: "特邀学术演讲与专题报告" },
    ],
    budgetOptions: [
      { value: "not-set", label: "暂未确定" },
      { value: "under-2500", label: "2,500 欧元以下" },
      { value: "2500-7500", label: "2,500 – 7,500 欧元" },
      { value: "over-7500", label: "7,500 欧元以上" },
    ],
  },
} satisfies Partial<Record<Locale, unknown>>;
