const prototypeRoot = new URL("./", document.currentScript.src);

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.href = new URL("favicon.svg", prototypeRoot).href;
favicon.type = "image/svg+xml";
document.head.append(favicon);

const content = {
  ru: {
    ui: {
      skip: "Перейти к содержанию",
      prototype: "Локальный черновой прототип · не публичный сайт и не оферта",
      pages: "Страницы сайта",
      language: "Язык прототипа",
      home: "Главная",
      verificationTitle: "До публичной версии",
      verificationIntro: "Эти вопросы должны получить проверяемый ответ до переноса страницы в production.",
      individual: "Для частных клиентов",
      organizations: "Для организаций",
      footer: "Концепция интерфейса вкладок · 29.10.2026",
      path: "Путь",
    },
    wellness: {
      label: "Wellness",
      descriptor: "практики и сопровождение",
      nav: [
        ["home", "Главная", "index.html"],
        ["psychology", "Психология", "psychology.html"],
        ["neurointegration", "Нейроинтеграция", "neurointegration.html"],
        ["breathing", "Дыхание", "breathing.html"],
        ["movement", "Движение и цигун", "movement-qigong.html"],
        ["playStory", "Игра и сказка", "play-and-story.html"],
        ["individuals", "Для себя", "individuals.html"],
        ["organizations", "Для организаций", "organizations.html"],
      ],
      map: [
        "Исследования и доказательность",
        "Обучение и объяснение",
        "Психология",
        "Нейроинтеграция",
        "Дыхание, движение и цигун",
        "Игровые и нарративные методы",
      ],
      pages: {
        home: {
          eyebrow: "Wellness-пространство",
          title: "Не набор дипломов, а карта пересечений",
          summary: "Прототип показывает, как исследовательский и образовательный опыт может соединяться с психологической подготовкой и практиками саморегуляции — без заявления об универсальном методе.",
          status: ["внутренний прототип", "факты проверяются"],
          cards: [
            ["Отдельные страницы", "Каждое направление получает свой URL, описание подготовки, границы и список доказательств."],
            ["Одна личность", "Общий визуальный язык помогает увидеть связь направлений, не смешивая их профессиональные статусы."],
            ["Две аудитории", "Предложения для частных клиентов и организаций разведены до появления цен, обещаний и форм записи."],
          ],
          verification: [
            "Согласовать с Наталией названия и место каждого направления.",
            "Сверить дипломы, сертификаты и статус текущей практики.",
            "Определить профессиональные, юридические и географические границы.",
          ],
          home: true,
        },
        psychology: {
          eyebrow: "Практика · требует проверки",
          title: "Психологическая работа",
          summary: "Анкета сообщает о квалификации практического психолога и текущей практике. Публичная страница появится после сверки документа, формата консультирования и профессиональных границ.",
          status: ["заявлена квалификация", "проверка документа"],
          cards: [
            ["Что объяснить", "С какими взрослыми запросами Наталия работает, как проходит первая встреча и чего консультация не заменяет."],
            ["Как показать подход", "Понятное обсуждение запроса, совместное определение цели и последовательность посильных шагов."],
            ["Чего не обещать", "Диагностику, лечение, одинаковый результат для всех или помощь вне подтверждённой компетенции."],
          ],
          verification: ["Оригинал диплома и допустимое публичное название квалификации.", "Кризисный протокол, исключённые запросы и перенаправление.", "Юрисдикции, договор, конфиденциальность и страхование."],
        },
        neurointegration: {
          eyebrow: "Практика · терминология уточняется",
          title: "Нейроинтеграция",
          summary: "В анкете указана подготовка тренера и использование метода. Страница должна простыми словами объяснить формат, упражнения и ограничения, не превращая термин в медицинское обещание.",
          status: ["подготовка заявлена", "границы уточняются"],
          cards: [
            ["Определение", "Краткое пользовательское объяснение без псевдонаучных причинных утверждений."],
            ["Формат", "Что происходит на встрече, какие навыки осваивает участник и что он может применять самостоятельно."],
            ["Связи", "Показать связь с обучением, вниманием и саморегуляцией, не подменяя психологию или медицину."],
          ],
          verification: ["Диплом, программа и организация обучения.", "Безопасность упражнений и противопоказания.", "Согласованная терминология для RU и EN."],
        },
        breathing: {
          eyebrow: "Практика · обучение продолжается",
          title: "Дыхательные практики",
          summary: "Дыхание рассматривается как инструмент саморегуляции. Анкета описывает продолжающееся обучение, поэтому прототип не представляет направление завершённой квалификацией или лечением.",
          status: ["в обучении", "не медицинская услуга"],
          cards: [
            ["Для сайта", "Объяснить цель упражнения, ожидаемый бытовой контекст и право остановиться в любой момент."],
            ["Для офиса", "Короткая практика может стать корпоративной гипотезой только после проверки безопасности и формата."],
            ["Самостоятельность", "Материалы должны помогать понять технику, не обещая универсальный физиологический эффект."],
          ],
          verification: ["Завершённые уровни обучения и право использовать названия школ.", "Противопоказания, скрининг и действия при дискомфорте.", "Разница между индивидуальной, групповой и записанной практикой."],
        },
        movement: {
          eyebrow: "Практика · разные статусы подготовки",
          title: "Движение и оздоровительный цигун",
          summary: "Цигун и начатое фитнес-обучение нельзя объединять под одной завершённой квалификацией. Страница показывает их как соседние, но отдельно проверяемые направления.",
          status: ["цигун заявлен", "фитнес в обучении"],
          cards: [
            ["Мягкое движение", "Низкоинтенсивные практики описываются через формат и доступность, а не через лечебный результат."],
            ["Цигун", "Нужно указать конкретные комплексы, подготовку инструктора и условия безопасного участия."],
            ["Фитнес", "До завершения обучения упоминается только как текущая профессиональная подготовка."],
          ],
          verification: ["Сертификаты и право преподавания конкретных комплексов.", "Ограничения по нагрузке и порядок допуска.", "Текущий уровень фитнес-квалификации и дата завершения."],
        },
        playStory: {
          eyebrow: "Методы · требуют отдельного обоснования",
          title: "Игра, метафора и сказка",
          summary: "Игровые и нарративные методы перечислены в анкете, но их специальная подготовка и область применения пока не подтверждены. Прототип сохраняет идею отдельной страницы, не объявляя готовую услугу.",
          status: ["заявлено в анкете", "страница-гипотеза"],
          cards: [
            ["Зачем отдельная страница", "Метод требует ясного объяснения аудитории, процесса и отличия от развлечения."],
            ["Для взрослых", "Публичный прототип ориентирован только на взрослых до отдельного решения о несовершеннолетних."],
            ["Границы", "Нельзя обещать переработку травмы или замену медицинской и психотерапевтической помощи."],
          ],
          verification: ["Специальное обучение и супервизия.", "Источники и допустимые формулировки эффективности.", "Возрастная аудитория, согласия и противопоказания."],
        },
        individuals: {
          eyebrow: "Аудитория · частные клиенты",
          title: "Сначала запрос, затем формат",
          summary: "Страница для частных клиентов должна помочь взрослому посетителю понять границы работы, выбрать следующий шаг и увидеть условия до передачи личных данных.",
          status: ["структура предложения", "условия не утверждены"],
          cards: [
            ["Первичное обращение", "Краткая форма запроса и предварительное согласование вместо мгновенной автоматической записи."],
            ["Форматы", "Разовая встреча, серия или сопровождение описываются только после утверждения состава и цены."],
            ["Прозрачные правила", "Стоимость, перенос, конфиденциальность и исключения должны быть доступны до оплаты."],
          ],
          verification: ["Платная или бесплатная первая встреча — источники расходятся.", "Лимит клиентов и число встреч в неделю.", "Форма, календарь, договор, оплата и обработка данных."],
        },
        organizations: {
          eyebrow: "Аудитория · организации",
          title: "Корпоративные форматы как проверяемые гипотезы",
          summary: "Воркшопы, офисные дыхательные практики и более длительные программы пока не являются публичной линейкой. Их нужно связать с реальной задачей команды и безопасным измерением результата.",
          status: ["B2B-гипотеза", "без обещаний продуктивности"],
          cards: [
            ["Вводный воркшоп", "Образовательный формат о нагрузке и навыках саморегуляции без диагностики сотрудников."],
            ["Офисная практика", "Короткая дыхательная или двигательная сессия с добровольным участием и альтернативой."],
            ["Программа", "Серия занятий возможна после пилота, обратной связи и согласования критериев результата."],
          ],
          verification: ["Компетенции ведущего и страховые требования.", "Скрининг, добровольность и защита данных сотрудников.", "Цены, договор, язык, очный или онлайн-формат."],
        },
      },
    },
    science: {
      label: "Science",
      descriptor: "исследования и экспертная работа",
      nav: [
        ["home", "Главная", "index.html"],
        ["research", "Исследования", "research.html"],
        ["publications", "Публикации", "publications.html"],
        ["education", "Образование", "education.html"],
        ["expertServices", "Экспертные услуги", "expert-services.html"],
        ["organizations", "Для организаций", "organizations.html"],
      ],
      map: ["Исследовательский вопрос", "Данные и источники", "Обучение взрослых", "Дизайн программ", "Публикации", "Прикладное сотрудничество"],
      pages: {
        home: {
          eyebrow: "Science-пространство",
          title: "Научный профиль, который можно проверить",
          summary: "Этот прототип отделяет академические факты от услуг и показывает, где посетитель увидит первичные источники, даты проверки и роль Наталии в каждом проекте.",
          status: ["внутренний прототип", "источники проверяются"],
          cards: [
            ["Факты со ссылками", "Степени, аффилиации и метрики публикуются только после сверки первичного источника."],
            ["Библиография", "Рецензируемые статьи, конференции и популярные материалы получают разные типы записей."],
            ["Услуги отдельно", "Экспертная работа не смешивается с академическими достижениями и не обещает публикацию."],
          ],
          verification: ["Сверить дипломы, профили и аффилиации.", "Собрать каноническую библиографию и устранить однофамильцев.", "Получить разрешения на примеры программ и проектов."],
          home: true,
        },
        research: {
          eyebrow: "Научная работа · источники обязательны",
          title: "Исследовательские направления и проекты",
          summary: "Страница связывает исследовательские темы с конкретными проектами, публикациями и ролями, а не с общим перечнем интересов.",
          status: ["темы предоставлены", "проекты проверяются"],
          cards: [
            ["Направления", "Образование, обучение взрослых и развитие образовательных программ требуют точных временных рамок."],
            ["Проекты", "Для каждого проекта нужны организация, роль, период, результат и разрешённая публичная ссылка."],
            ["Методы", "Качественные и количественные методы описываются через реальные исследования и источники."],
          ],
          verification: ["Текущие и завершённые аффилиации.", "Роль Наталии и права на публикацию результата.", "Связь каждого направления с проверяемой работой."],
        },
        publications: {
          eyebrow: "Библиография · в подготовке",
          title: "Публикации без смешения авторских профилей",
          summary: "Будущая страница группирует работы по типу и хранит первичную ссылку, DOI, год и проверенную принадлежность автору.",
          status: ["профили заявлены", "библиография не сверена"],
          cards: [
            ["Рецензируемые работы", "Отдельный список с полными библиографическими данными и DOI."],
            ["Конференции и проекты", "Материалы получают собственную категорию и не повышают метрики публикаций."],
            ["Научпоп и экспертные тексты", "Показываются отдельно при наличии права на публикацию."],
          ],
          verification: ["ORCID, Scopus и другие профили принадлежат Наталии.", "Нет публикаций однофамильцев.", "Метрики указаны по базе и дате, а не объединены."],
        },
        education: {
          eyebrow: "Образовательная работа",
          title: "Программы, преподавание и методология",
          summary: "Страница показывает не общий стаж, а конкретные программы, аудитории, роль Наталии и доступные подтверждения.",
          status: ["опыт заявлен", "примеры собираются"],
          cards: [
            ["Программы", "Название, аудитория, формат, период и вклад в разработку."],
            ["Преподавание", "Курсы и организации с подтверждаемыми датами и ролью."],
            ["Методология", "Примеры того, как сложная тема превращается в последовательность обучения."],
          ],
          verification: ["Разрешение организаций на упоминание.", "Материалы без чужой конфиденциальной информации.", "Точные даты, аудитории и результаты без завышения."],
        },
        expertServices: {
          eyebrow: "Коммерческий раздел · отдельно от академических фактов",
          title: "Экспертные и авторские услуги",
          summary: "Услуги могут включать анализ, структуру текста и образовательное проектирование, но не скрытое авторство, гарантированную публикацию или искусственное повышение метрик.",
          status: ["форматы уточняются", "этические границы обязательны"],
          cards: [
            ["Анализ и структура", "Помощь в логике исследования, аргументации и структуре материала."],
            ["Редакторская поддержка", "Граница между редактированием, соавторством и авторством описывается заранее."],
            ["Образовательный дизайн", "Проектирование программ и материалов оформляется как отдельная услуга."],
          ],
          verification: ["Точный перечень услуг и тем.", "Политика авторства, конфиденциальности и конфликтов интересов.", "Примеры работ с разрешением на показ."],
        },
        organizations: {
          eyebrow: "Сотрудничество · организации",
          title: "Исследовательская и образовательная работа для команд",
          summary: "Science-предложение организациям строится вокруг исследования, обучения и дизайна программ. Wellness-воркшопы остаются на другом сайте.",
          status: ["B2B-гипотеза", "кейсы требуют разрешения"],
          cards: [
            ["Исследование", "Диагностика образовательной задачи, сбор данных и аналитический отчёт в согласованных границах."],
            ["Программа", "Разработка очного, онлайн- или смешанного обучения под конкретную аудиторию."],
            ["Фасилитация", "Рабочие сессии и обсуждение решений без подмены управленческого консалтинга."],
          ],
          verification: ["Портфолио проектов и роль Наталии.", "Конфиденциальность данных организаций.", "Формат результата, цена, права на материалы и конфликт интересов."],
        },
      },
    },
  },
  en: {
    ui: {
      skip: "Skip to content",
      prototype: "Local draft prototype · not a public website or an offer",
      pages: "Website pages",
      language: "Prototype language",
      home: "Home",
      verificationTitle: "Before a public version",
      verificationIntro: "These questions need verifiable answers before the page moves into production.",
      individual: "For individuals",
      organizations: "For organisations",
      footer: "Tabbed workspace concept · 29 October 2026",
      path: "Path",
    },
    wellness: {
      label: "Wellness",
      descriptor: "practices and individual support",
      nav: [
        ["home", "Home", "index.html"],
        ["psychology", "Psychology", "psychology.html"],
        ["neurointegration", "Neurointegration", "neurointegration.html"],
        ["breathing", "Breathing", "breathing.html"],
        ["movement", "Movement and qigong", "movement-qigong.html"],
        ["playStory", "Play and story", "play-and-story.html"],
        ["individuals", "For yourself", "individuals.html"],
        ["organizations", "For organisations", "organizations.html"],
      ],
      map: ["Research and evidence", "Teaching and explanation", "Psychology", "Neurointegration", "Breathing, movement and qigong", "Play and narrative methods"],
      pages: {
        home: {
          eyebrow: "Wellness space",
          title: "Not a list of diplomas, but a map of intersections",
          summary: "The prototype explores how research and teaching experience may connect with psychological training and self-regulation practices without claiming a universal method.",
          status: ["internal prototype", "facts under review"],
          cards: [["Separate pages", "Each direction has its own URL, training status, boundaries and evidence checklist."], ["One person", "A shared visual system shows relationships without merging professional statuses."], ["Two audiences", "Offers for individuals and organisations remain separate until formats and terms are verified."]],
          verification: ["Agree the public names and role of every direction.", "Verify credentials and current-practice status.", "Define professional, legal and geographic boundaries."],
          home: true,
        },
        psychology: {
          eyebrow: "Practice · verification required",
          title: "Psychological work",
          summary: "The questionnaire reports a practical psychology qualification and current practice. A public page requires documentary, legal and professional review.",
          status: ["qualification reported", "document review pending"],
          cards: [["Explain", "Who the adult service is for, how the first meeting works and what it does not replace."], ["Show the approach", "A clear discussion of needs, a shared goal and manageable next steps."], ["Do not promise", "Diagnosis, treatment, identical outcomes or work beyond verified competence."]],
          verification: ["Original qualification and permitted public title.", "Crisis, exclusion and referral protocols.", "Jurisdictions, contract, privacy and insurance."],
        },
        neurointegration: {
          eyebrow: "Practice · terminology pending",
          title: "Neurointegration",
          summary: "Training and current use are reported in the questionnaire. The page needs a plain-language definition, format and limitations without medical claims.",
          status: ["training reported", "boundaries pending"],
          cards: [["Definition", "A reader-friendly explanation without unsupported causal claims."], ["Format", "What happens in a session and which skills a participant may practise independently."], ["Connections", "Links to learning, attention and self-regulation without replacing psychology or medicine."]],
          verification: ["Diploma, curriculum and training provider.", "Exercise safety and contraindications.", "Agreed RU and EN terminology."],
        },
        breathing: {
          eyebrow: "Practice · training in progress",
          title: "Breathing practices",
          summary: "Breathing is framed as a self-regulation tool. Ongoing training is reported, so the prototype does not present a completed qualification or treatment.",
          status: ["in training", "not medical treatment"],
          cards: [["For the website", "Explain the purpose, everyday context and the right to stop at any time."], ["For the office", "A short session remains a hypothesis until safety and delivery are reviewed."], ["Independence", "Materials may explain a skill but must not promise a universal physiological result."]],
          verification: ["Completed training levels and naming rights.", "Contraindications, screening and discomfort protocol.", "Differences between individual, group and recorded formats."],
        },
        movement: {
          eyebrow: "Practice · mixed preparation statuses",
          title: "Movement and health qigong",
          summary: "Qigong preparation and fitness training must not be presented as one completed qualification. They remain related but separately verified directions.",
          status: ["qigong reported", "fitness in training"],
          cards: [["Gentle movement", "Describe format and accessibility rather than therapeutic outcomes."], ["Qigong", "Name the actual routines, instructor preparation and safe participation conditions."], ["Fitness", "Mention only as ongoing professional training until completion."]],
          verification: ["Certificates and permission to teach specific routines.", "Load limits and participation screening.", "Current fitness level and expected completion date."],
        },
        playStory: {
          eyebrow: "Methods · separate evidence needed",
          title: "Play, metaphor and story",
          summary: "Play and narrative methods appear in the questionnaire, but specific preparation and scope are not yet verified. This remains a page hypothesis, not a ready service.",
          status: ["questionnaire statement", "page hypothesis"],
          cards: [["Why a separate page", "The method needs a clear audience, process and distinction from entertainment."], ["Adults first", "The public concept remains adult-only until work with minors is reviewed."], ["Boundaries", "Do not promise trauma processing or replacement for medical and psychotherapeutic care."]],
          verification: ["Specific training and supervision.", "Sources and permitted effectiveness language.", "Age group, consent and contraindications."],
        },
        individuals: {
          eyebrow: "Audience · individuals",
          title: "Start with the need, then select a format",
          summary: "The page should let an adult visitor understand boundaries, choose a next step and see terms before sharing personal information.",
          status: ["offer structure", "terms not approved"],
          cards: [["Initial enquiry", "A short needs form and preliminary review instead of instant booking."], ["Formats", "A single session, series or support programme only after scope and pricing are approved."], ["Clear terms", "Price, cancellation, privacy and exclusions should be visible before payment."]],
          verification: ["Paid or free introductory meeting — sources conflict.", "Client limit and weekly-session model.", "Form, calendar, contract, payment and data processing."],
        },
        organizations: {
          eyebrow: "Audience · organisations",
          title: "Corporate formats as testable hypotheses",
          summary: "Workshops, office breathing sessions and longer programmes are not a public offer yet. Each needs a real team problem and a safe outcome model.",
          status: ["B2B hypothesis", "no productivity promises"],
          cards: [["Intro workshop", "Education about workload and self-regulation without employee diagnosis."], ["Office practice", "A short breathing or movement session with voluntary participation and an alternative."], ["Programme", "A series may follow a pilot, feedback and agreed outcome criteria."]],
          verification: ["Facilitator competence and insurance requirements.", "Screening, consent and employee data protection.", "Pricing, contract, language and delivery mode."],
        },
      },
    },
    science: {
      label: "Science",
      descriptor: "research and expert work",
      nav: [["home", "Home", "index.html"], ["research", "Research", "research.html"], ["publications", "Publications", "publications.html"], ["education", "Education", "education.html"], ["expertServices", "Expert services", "expert-services.html"], ["organizations", "For organisations", "organizations.html"]],
      map: ["Research question", "Data and sources", "Adult learning", "Programme design", "Publications", "Applied collaboration"],
      pages: {
        home: {
          eyebrow: "Science space",
          title: "A scientific profile that can be checked",
          summary: "The prototype separates academic facts from services and reserves a visible place for primary sources, review dates and Natalia's role in every project.",
          status: ["internal prototype", "sources under review"],
          cards: [["Sourced facts", "Degrees, affiliations and metrics appear only after primary-source review."], ["Bibliography", "Peer-reviewed papers, conferences and popular materials use different record types."], ["Services apart", "Expert work remains distinct from academic achievement and never guarantees publication."]],
          verification: ["Verify degrees, profiles and affiliations.", "Build a canonical bibliography and remove namesakes.", "Obtain permission for programme and project examples."],
          home: true,
        },
        research: {
          eyebrow: "Research · sources required",
          title: "Research directions and projects",
          summary: "The page connects themes to actual projects, publications and roles rather than presenting an unsourced list of interests.",
          status: ["themes provided", "projects under review"],
          cards: [["Directions", "Education, adult learning and programme development need precise timeframes."], ["Projects", "Every project needs an organisation, role, period, output and permitted public link."], ["Methods", "Qualitative and quantitative methods are shown through real work and sources."]],
          verification: ["Current and past affiliations.", "Natalia's role and publication rights.", "Evidence linking each direction to completed work."],
        },
        publications: {
          eyebrow: "Bibliography · in preparation",
          title: "Publications without merged author profiles",
          summary: "The future page groups work by type and stores a primary link, DOI, year and verified authorship.",
          status: ["profiles reported", "bibliography not reconciled"],
          cards: [["Peer-reviewed work", "A separate list with complete bibliographic fields and DOI."], ["Conferences and projects", "Their own category without inflating publication metrics."], ["Popular and expert writing", "Shown separately where publication rights are confirmed."]],
          verification: ["ORCID, Scopus and other profiles belong to Natalia.", "No namesake publications remain.", "Metrics are separated by database and date."],
        },
        education: {
          eyebrow: "Educational work",
          title: "Programmes, teaching and methodology",
          summary: "The page presents concrete programmes, audiences, roles and evidence rather than an undifferentiated claim of experience.",
          status: ["experience reported", "examples being collected"],
          cards: [["Programmes", "Name, audience, format, period and contribution."], ["Teaching", "Courses and organisations with verifiable dates and roles."], ["Methodology", "Examples of turning complex material into a learning sequence."]],
          verification: ["Permission to name organisations.", "No confidential third-party material.", "Accurate dates, audiences and outcomes."],
        },
        expertServices: {
          eyebrow: "Commercial section · separate from academic facts",
          title: "Expert and writing services",
          summary: "Services may support analysis, structure and educational design, but not hidden authorship, guaranteed publication or artificial metric growth.",
          status: ["formats pending", "ethical limits required"],
          cards: [["Analysis and structure", "Support with research logic, argument and document structure."], ["Editorial support", "Editing, co-authorship and authorship boundaries are agreed in advance."], ["Educational design", "Programme and learning-material design is a separate service."]],
          verification: ["Exact services and subjects.", "Authorship, privacy and conflict-of-interest policy.", "Work samples with display permission."],
        },
        organizations: {
          eyebrow: "Collaboration · organisations",
          title: "Research and educational work for teams",
          summary: "The Science offer focuses on research, education and programme design. Wellness workshops remain on the other website.",
          status: ["B2B hypothesis", "case permissions pending"],
          cards: [["Research", "Define an educational problem, gather data and deliver an agreed analytical output."], ["Programme", "Design in-person, online or blended learning for a specific audience."], ["Facilitation", "Working sessions and decision support without pretending to be management consulting."]],
          verification: ["Project portfolio and Natalia's role.", "Organisational data confidentiality.", "Deliverable, price, rights and conflict-of-interest terms."],
        },
      },
    },
  },
};

function pageHref(locale, site, pageKey = "home") {
  const siteContent = content[locale][site];
  const item = siteContent.nav.find(([key]) => key === pageKey) || siteContent.nav[0];
  return new URL(`${site}/${locale}/${item[2]}`, prototypeRoot).href;
}

function renderCards(cards) {
  return cards
    .map(([title, text]) => `<article class="card"><h3>${title}</h3><p>${text}</p></article>`)
    .join("");
}

function renderPage() {
  const { locale = "ru", site = "wellness", page = "home" } = document.body.dataset;
  const localeContent = content[locale] || content.ru;
  const siteContent = localeContent[site] || localeContent.wellness;
  const pageContent = siteContent.pages[page] || siteContent.pages.home;
  const ui = localeContent.ui;
  const otherLocale = locale === "ru" ? "en" : "ru";
  const otherLocalePage = content[otherLocale][site].pages[page] ? page : "home";
  const routeItem = siteContent.nav.find(([key]) => key === page) || siteContent.nav[0];
  const routeText = `/${locale}/${routeItem[2] === "index.html" ? "" : routeItem[2].replace(".html", "/")}`;

  document.documentElement.lang = locale;
  document.title = `${pageContent.title} — Natalia ${siteContent.label}`;

  const pageTabs = siteContent.nav
    .map(([key, label]) => {
      const current = key === page ? ' aria-current="page"' : "";
      return `<li><a href="${pageHref(locale, site, key)}"${current}>${label}</a></li>`;
    })
    .join("");

  const map = pageContent.home
    ? `<div class="intersection-map" aria-label="${locale === "ru" ? "Карта пересечения направлений" : "Map of intersecting directions"}">
        <div class="map-center">${locale === "ru" ? "Наталия" : "Natalia"}</div>
        ${siteContent.map.map((item) => `<div class="map-node">${item}</div>`).join("")}
      </div>`
    : `<aside class="intersection-map" aria-label="${locale === "ru" ? "Контекст направления" : "Direction context"}">
        <div class="map-center">${siteContent.label}</div>
        ${siteContent.map.map((item) => `<div class="map-node">${item}</div>`).join("")}
      </aside>`;

  const audienceLinks = site === "wellness"
    ? `<div class="audience-links">
        <a class="audience-link" href="${pageHref(locale, "wellness", "individuals")}">${ui.individual}</a>
        <a class="audience-link" href="${pageHref(locale, "wellness", "organizations")}">${ui.organizations}</a>
      </div>`
    : `<div class="audience-links">
        <a class="audience-link" href="${pageHref(locale, "science", "expertServices")}">${locale === "ru" ? "Экспертные услуги" : "Expert services"}</a>
        <a class="audience-link" href="${pageHref(locale, "science", "organizations")}">${ui.organizations}</a>
      </div>`;

  document.body.innerHTML = `
    <a class="skip-link" href="#main-content">${ui.skip}</a>
    <div class="prototype-banner" role="status">${ui.prototype}</div>
    <div class="workspace">
      <div class="workspace-shell">
        <header class="workspace-topbar">
          <a class="identity" href="${pageHref(locale, site)}">
            <span class="identity-mark" aria-hidden="true">ND</span>
            <span>${locale === "ru" ? "Наталия Долгова" : "Natalia Dolgova"}</span>
          </a>
          <p class="site-label"><span aria-hidden="true"></span>${siteContent.label}</p>
          <nav aria-label="${ui.language}">
            <ul class="locale-switcher">
              <li><a href="${pageHref("ru", site, locale === "ru" ? page : otherLocalePage)}" lang="ru"${locale === "ru" ? ' aria-current="page"' : ""}>RU</a></li>
              <li><a href="${pageHref("en", site, locale === "en" ? page : otherLocalePage)}" lang="en"${locale === "en" ? ' aria-current="page"' : ""}>EN</a></li>
            </ul>
          </nav>
        </header>
        <nav class="page-nav" aria-label="${ui.pages}"><ul class="page-tabs">${pageTabs}</ul></nav>
        <div class="context-bar"><span>${ui.path}:</span><strong>${routeText}</strong></div>
        <main class="content-canvas" id="main-content">
          <div class="hero-grid">
            <div>
              <p class="eyebrow">${pageContent.eyebrow}</p>
              <h1>${pageContent.title}</h1>
              <p class="lead">${pageContent.summary}</p>
              <div class="status-row">${pageContent.status.map((status) => `<span class="status-chip">${status}</span>`).join("")}</div>
            </div>
            ${map}
          </div>
          <section class="section-block" aria-labelledby="page-structure">
            <div class="section-heading">
              <p class="eyebrow">${locale === "ru" ? "Структура страницы" : "Page structure"}</p>
              <h2 id="page-structure">${locale === "ru" ? "Что посетитель должен понять" : "What a visitor should understand"}</h2>
            </div>
            <div class="card-grid">${renderCards(pageContent.cards)}</div>
          </section>
          <section class="verification-panel" aria-labelledby="verification-title">
            <div>
              <p class="eyebrow">${locale === "ru" ? "Редакционный шлюз" : "Editorial gate"}</p>
              <h2 id="verification-title">${ui.verificationTitle}</h2>
              <p>${ui.verificationIntro}</p>
            </div>
            <ul class="verification-list">${pageContent.verification.map((item) => `<li>${item}</li>`).join("")}</ul>
          </section>
          ${audienceLinks}
        </main>
        <footer class="workspace-footer"><span>${ui.footer}</span><span>${siteContent.label} · ${siteContent.descriptor}</span></footer>
      </div>
    </div>`;

  const activePage = document.querySelector('.page-tabs a[aria-current="page"]');
  window.requestAnimationFrame(() => activePage?.scrollIntoView({ block: "nearest", inline: "center" }));
}

renderPage();

