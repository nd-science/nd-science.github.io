# Техническое задание на Wellness сайт Наталии Долговой

Дата: 29 октября 2026 года

Статус: окончательное каноническое ТЗ для следующего этапа реализации

Приложение: [профессиональная карта](./00-professional-map.md)

Анкета и дипломы приняты как фактическая основа. Незакрытые вопросы ограничены правилами отмены, юридическими условиями, провайдерами интеграций, дизайном и теми ценами или пакетами, которых в анкете нет. Интеграции не активируются до отдельного этапа реализации.

## 1. Цель сайта

Wellness-сайт представляет частную практику Наталии, объясняет её комплексный подход «мозг — психика — тело», помогает взрослому посетителю выбрать подходящий формат и ведёт к платной первой встрече или запросу корпоративной программы.

Сайт должен за пять минут дать посетителю ответы на пять вопросов:

1. Кто такая Наталия и почему ей можно доверять.
2. С какими запросами она работает.
3. Какие методы и форматы использует.
4. Сколько стоит работа и как она организована.
5. Как оставить заявку и перейти к согласованию встречи.

## 2. Позиционирование

### Русская формулировка

**Наталия Долгова — практический психолог и тренер по нейроинтеграции. Она помогает руководителям и специалистам справляться с перегрузкой, лучше понимать своё состояние и осваивать навыки саморегуляции с помощью психологической работы, нейроинтеграции, дыхания и движения.**

Supporting line:

**Dr. phil., кандидат экономических наук, исследователь и специалист по обучению взрослых. Сложные задачи Наталия переводит в понятные последовательные шаги, подобранные под конкретного человека.**

### English wording

**Natalia Dolgova is a practical psychologist and neurointegration trainer. She helps leaders and professionals deal with overload, understand their current state and develop self-regulation skills through psychological work, neurointegration, breathing and movement.**

Supporting line:

**Dr. phil., Candidate of Economic Sciences, researcher and adult-learning specialist. Natalia turns complex challenges into clear, manageable steps adapted to the individual.**

### Основное обещание

Не готовое универсальное решение, а внимательная индивидуальная работа: разобраться в запросе, определить реалистичную цель, подобрать инструменты и оценивать их полезность вместе с клиентом.

### Отличия

- исследовательская подготовка и работа с данными;
- опыт обучения взрослых с 2011 года;
- квалификация практического психолога;
- подготовка тренера по нейроинтеграции;
- сочетание когнитивных, дыхательных, двигательных и образных инструментов;
- понятное объяснение метода и права клиента выбирать темп;
- краткосрочный фокус на одном согласованном запросе.

## 3. Аудитории

### Основной B2C-сегмент

Русско- и англоязычные руководители, топ-менеджеры, руководители отделов и специалисты 35+, работающие с высокой ответственностью и людьми. Типичные ситуации: повседневная перегрузка, выгорание, профессиональный переход, эмиграция, снижение концентрации, трудности расслабления и сна.

### Вторичный B2C-сегмент

Взрослые 30–45 лет, которые хотят лучше понимать свои реакции, формировать устойчивые привычки и освоить практические способы саморегуляции. Работа ведётся независимо от пола.

### B2B-сегмент

Руководители, команды, сотрудники компаний, образовательные организации и специалисты помогающих профессий. Предложения: воркшопы, вебинары, практики стабилизации состояния, профилактика перегрузки, обучение взрослых и фасилитация.

### Не целевая аудитория

Дети, семейные пары, клинические и кризисные запросы, а также случаи, требующие специализированной медицинской помощи.

## 4. Продуктовая линейка и монетизация

| Приоритет | Продукт | Состав | Цена | Статус |
| --- | --- | --- | ---: | --- |
| 1 | Индивидуальная психологическая консультация | Первая встреча 60 минут; последующие 50–60 минут; онлайн или очно | €100 онлайн; €120 очно | available |
| 2 | Четырёхнедельное сопровождение после стресса и выгорания | Персональная работа; содержание, частота взаимодействия и формат согласуются индивидуально | €600 | available |
| 3 | Нейроинтеграционное сопровождение | Работа с состоянием, мышлением и действиями | По согласованию | available |
| 4 | Индивидуальный оздоровительный цигун | 45 минут, онлайн или очно | €80 | available |
| 5 | Групповой цигун | Групповое занятие | €35 с участника | available / developing |
| 6 | Серия психологических консультаций | Пакет из 5 встреч | По действующему прайсу | available |
| 7 | Индивидуальная дыхательная практика | Подбор и освоение дыхательных упражнений | По согласованию | available; training in_progress |
| 8 | Корпоративная программа | Воркшоп, вебинар или программа для команды | Коммерческое предложение | planned |

Первая встреча платная. Порядок: форма первичного обращения → необходимые опросники → согласование запроса → оплата → выбор времени.

## 5. Карта страниц

Все маршруты зеркально существуют в `/ru/` и `/en/`.

| Маршрут | Страница | Основная задача | CTA |
| --- | --- | --- | --- |
| `/` | Главная | Позиционирование и быстрый выбор направления | Записаться на консультацию |
| `/about/` | О Наталии | Биография, квалификации, подход и ценности | Выбрать формат |
| `/for-individuals/` | Для частных клиентов | Запросы, форматы, цены и процесс | Оставить заявку |
| `/programs/stress-recovery/` | Сопровождение после стресса и выгорания | Продажа четырёхнедельного формата | Обсудить участие |
| `/practices/psychology/` | Психологическая работа | Объяснить консультацию и методы | Записаться |
| `/practices/neurointegration/` | Нейроинтеграция | Объяснить систему и формат сопровождения | Обсудить запрос |
| `/practices/breathing/` | Дыхательные практики | Объяснить техники, формат и подготовку | Выбрать занятие |
| `/practices/movement-qigong/` | Движение и цигун | Представить индивидуальные и групповые занятия | Записаться на занятие |
| `/practices/play-and-story/` | Игра, метафора и история | Объяснить образные методы | Узнать о консультации |
| `/for-organizations/` | Для организаций | Корпоративные форматы | Запросить предложение |
| `/resources/` | Материалы | Статьи, видео, аудио и подписка | Получать материалы |
| `/booking/` | Запись и условия | Форма, цены, этапы, перенос и отмена | Отправить заявку |
| `/faq/` | Вопросы и ответы | Снять барьеры до заявки | Оставить заявку |

Юридические маршруты определены в общем техническом контракте.

## 6. Пользовательские сценарии

### Частный клиент

Поиск или публикация → главная → «Для частных клиентов» → подходящая услуга → квалификация → цена и условия → форма → оплата → календарь.

### Посетитель, выбирающий метод

Главная → вкладка практики → объяснение метода → связанные услуги → FAQ → заявка.

### Корпоративный заказчик

Science или LinkedIn → «Для организаций» → форматы и опыт → форма брифа → предварительный звонок → коммерческое предложение.

### Читатель материала

Поиск → статья или видео → связанная практика → услуга → заявка либо подписка.

## 7. Готовые тексты страниц

Тексты ниже являются контентным контрактом. Компоненты могут менять длину строк и расположение блоков, но не смысл.

### 7.1 Главная

#### RU

**SEO title:** Наталия Долгова — психолог и тренер по нейроинтеграции

**Description:** Индивидуальные консультации, нейроинтеграция, дыхательные практики и оздоровительный цигун для взрослых и руководителей. Онлайн и очно в Белграде.

**H1:** Понятные шаги к более устойчивому состоянию

Когда нагрузка накапливается, бывает трудно одновременно думать, чувствовать и действовать. Я помогаю взрослым разобраться в запросе, определить реалистичную цель и подобрать инструменты, которые можно применять в повседневной жизни.

В работе я соединяю психологическое консультирование, нейроинтеграцию, дыхание, движение и опыт обучения взрослых. Состав работы зависит от человека, его ситуации и обратной связи.

**Факты:** Dr. phil. · кандидат экономических наук · практический психолог · тренер по нейроинтеграции · работа с людьми с 2011 года.

**Раздел «С чем можно обратиться»:** перегрузка и выгорание; стресс и трудности расслабления; сон и вечернее возбуждение; концентрация и решения; адаптация после переезда; профессиональные и жизненные изменения; устойчивые привычки и саморегуляция.

**CTA:** Записаться на платную первую консультацию

**Secondary CTA:** Посмотреть все форматы

#### EN

**SEO title:** Natalia Dolgova — Psychologist and Neurointegration Trainer

**Description:** Individual consultations, neurointegration, breathing practices and health qigong for adults and leaders. Online and in person in Belgrade.

**H1:** Clear steps towards a more stable state

When demands build up, it can become difficult to think, feel and act at the same time. I help adults understand their situation, define a realistic goal and choose tools they can use in everyday life.

My work combines psychological consultation, neurointegration, breathing, movement and adult-learning expertise. The process is adapted to the individual, their circumstances and their feedback.

**Key facts:** Dr. phil. · Candidate of Economic Sciences · practical psychologist · neurointegration trainer · working with people since 2011.

**What you can bring:** overload and burnout; stress and difficulty relaxing; sleep and evening overactivation; concentration and decisions; adapting after relocation; professional and life transitions; sustainable habits and self-regulation.

**CTA:** Book a paid first consultation

**Secondary CTA:** Explore all formats

### 7.2 О Наталии

#### RU

**H1:** Исследовательский взгляд и практическая работа с человеком

Я начала профессиональную деятельность в образовании в 2011 году: преподавала, проводила исследования, разрабатывала программы и сопровождала проекты взрослых слушателей и руководителей. Эта работа научила меня задавать точные вопросы, объяснять сложное и строить освоение навыков шаг за шагом.

Позже я дополнила этот опыт психологической подготовкой, нейроинтеграцией, цигун и дыхательными практиками. В 2026 году я получила квалификацию практического психолога в МПГУ. Я также являюсь тренером по нейроинтеграции, Dr. phil. Europa-Universität Flensburg и кандидатом экономических наук. Практику поддерживают регулярные супервизии и интервизии.

Для меня важно, чтобы человек понимал, что мы делаем и зачем, мог давать обратную связь и сохранял право выбирать подходящий темп.

**CTA:** Посмотреть квалификации и форматы работы

#### EN

**H1:** A research perspective combined with individual practice

I began my professional career in education in 2011, teaching, conducting research, designing programmes and supporting adult learners and leaders. This work taught me to ask precise questions, explain complex ideas clearly and build learning step by step.

I later expanded this experience through professional training in psychology, neurointegration, qigong and breathing practices. In 2026, I qualified as a practical psychologist at Moscow Pedagogical State University. I am also a neurointegration trainer, hold a Dr. phil. from Europa-Universität Flensburg and am a Candidate of Economic Sciences. My practice is supported by regular supervision and peer consultation.

It matters to me that people understand what we are doing and why, can give feedback and retain the right to choose a pace that works for them.

**CTA:** Explore qualifications and ways of working

### 7.3 Для частных клиентов

#### RU

**H1:** Индивидуальная работа для взрослых

Ко мне обращаются при повседневном стрессе, профессиональном выгорании, перегрузке, трудностях расслабления и сна, снижении концентрации, адаптации после переезда и изменении карьерного пути.

Первая встреча длится 60 минут. Мы знакомимся, обсуждаем условия, уточняем запрос и предыдущий опыт, формулируем возможную цель и следующий шаг. Последующие встречи продолжаются 50–60 минут. Количество определяется запросом и обратной связью; можно начать с одной консультации.

Стоимость: €100 онлайн и €120 очно. Между встречами поддержка предоставляется только тогда, когда она входит в выбранный формат.

Я работаю со взрослыми и не принимаю детские, семейные, клинические и кризисные запросы.

**CTA:** Оставить первичную заявку

#### EN

**H1:** Individual work for adults

People come to me with everyday stress, professional burnout, overload, difficulty relaxing or sleeping, reduced concentration, relocation adjustment and career transitions.

The first meeting lasts 60 minutes. We meet, review the working terms, clarify the request and previous experience, define a possible goal and agree on a next step. Follow-up meetings last 50–60 minutes. The number of sessions depends on the request and feedback; you can begin with one consultation.

Price: €100 online and €120 in person. Support between sessions is provided only when it is part of the selected format.

I work with adults and do not take child, family, clinical or crisis cases.

**CTA:** Submit an initial enquiry

### 7.4 Четырёхнедельное сопровождение

#### RU

**H1:** Четыре недели работы со стрессом и перегрузкой

Персональный формат для работы с восстановлением ресурсов, снижением перегрузки и формированием устойчивых изменений. Содержание, частота взаимодействия, упражнения, материалы и объём обратной связи согласуются индивидуально.

Стоимость четырёх недель сопровождения — €600. До оплаты Наталия и клиент уточняют запрос и формат работы.

**CTA:** Обсудить участие

#### EN

**H1:** Four weeks of work with stress and overload

A personal format focused on restoring resources, reducing overload and developing sustainable changes. The content, frequency of contact, exercises, materials and scope of feedback are agreed individually.

The price for four weeks of support is €600. Natalia and the client clarify the request and working format before payment.

**CTA:** Discuss participation

### 7.5 Психологическая работа

#### RU

**H1:** Психологическое консультирование с понятной структурой

Работа начинается с запроса и контекста. Вместе мы выбираем конкретную задачу, исследуем привычные мысли, эмоции и действия, при необходимости используем согласованное упражнение и завершаем встречу рефлексией и следующим шагом.

В работе применяются интегративный подход, инструменты КПТ и ACT, практики осознанности, метафорические и нарративные методы. Подход меняется, если клиенту некомфортно, запрос изменился или используемый инструмент не приносит субъективной пользы.

**CTA:** Записаться на консультацию

#### EN

**H1:** Psychological consultation with a clear structure

The work begins with your request and its context. Together, we choose a specific task, explore habitual thoughts, emotions and actions, use an agreed exercise when appropriate, and close the session with reflection and a next step.

The work may include an integrative approach, CBT and ACT tools, mindfulness practices, and metaphorical or narrative methods. The approach changes when a client feels uncomfortable, the request changes or the current tool is not subjectively useful.

**CTA:** Book a consultation

### 7.6 Нейроинтеграция

#### RU

**H1:** Нейроинтеграция для состояния, мышления и действий

Нейроинтеграция — прикладная система саморегуляции и организации жизненного контекста. Она помогает замечать собственное состояние, исследовать привычные модели мышления и выстраивать действия без постоянного давления на силу воли.

Работа строится вокруг трёх элементов: НейроБаланс — наблюдение и регуляция состояния; НейроСёрфинг — работа с саботажем и повторяющимися паттернами; НейроСпринты — организация целей короткими циклами с регулярной рефлексией.

Наталия имеет квалификацию тренера по нейроинтеграции и сертификаты Neurointegration Expert и Neurointegration Trainer.

**CTA:** Обсудить нейроинтеграционное сопровождение

#### EN

**H1:** Neurointegration for state, thinking and action

Neurointegration is an applied system of self-regulation and life-context management. It helps people notice their current state, explore habitual thinking patterns and organise action without relying on constant force of will.

The work is organised around three elements: NeuroBalance for observing and regulating state; NeuroSurfing for working with self-sabotage and repeated patterns; and NeuroSprints for organising goals in short cycles with regular reflection.

Natalia is qualified as a neurointegration trainer and holds Neurointegration Expert and Neurointegration Trainer certificates.

**CTA:** Discuss neurointegration support

### 7.7 Дыхательные практики

#### RU

**H1:** Дыхание как практический инструмент саморегуляции

На индивидуальном занятии мы определяем задачу, обсуждаем самочувствие и подбираем подходящий вариант практики. Наталия использует подходы школы Бутейко, Стрельниковой, восточные оздоровительные практики, квадратное дыхание и дыхание с удлинённым выдохом.

Практика осваивается постепенно. Интенсивность, задержки и длительность подбираются индивидуально; при тяжёлых лёгочных и сердечно-сосудистых состояниях, эпилепсии, беременности или других противопоказаниях требуется предварительная консультация профильного врача.

Наталия продолжает обучение по программам Oxygen Advantage Advanced Instructor и Functional Breathing Instructor.

**CTA:** Выбрать индивидуальное занятие

#### EN

**H1:** Breathing as a practical self-regulation tool

In an individual session, we define the task, discuss your current condition and choose an appropriate practice. Natalia uses approaches from the Buteyko and Strelnikova schools, Eastern health practices, box breathing and extended-exhalation exercises.

The practice is introduced gradually. Intensity, breath holds and duration are adapted to the individual. People with serious respiratory or cardiovascular conditions, epilepsy, pregnancy or other contraindications should consult an appropriate medical professional first.

Natalia is continuing her Oxygen Advantage Advanced Instructor and Functional Breathing Instructor training.

**CTA:** Choose an individual session

### 7.8 Движение и цигун

#### RU

**H1:** Оздоровительный цигун и мягкое движение

Занятие сочетает плавные движения, дыхание и внимание. Наталия проходила подготовку во Всероссийской Федерации Цигун, Оздоровительного Цигун, Даоинь и Тайцзицюань у Виктора Борисовича Стерликова по комплексам «Ба Дуань Цзин», «Лето. ОГОНЬ» и «Осень Вэйци».

Индивидуальное занятие длится 45 минут и стоит €80. Групповое занятие стоит €35 с участника. Для онлайн-формата нужны свободное пространство, стабильная связь и удобная одежда.

Амплитуда и формат упражнений адаптируются под возможности участника. При травмах, обострениях и ограничениях движения формат предварительно согласуется.

**CTA:** Записаться на занятие

#### EN

**H1:** Health qigong and gentle movement

The session combines gentle movement, breathing and attention. Natalia trained with Viktor Borisovich Sterlikov through the All-Russian Federation of Qigong, Health Qigong, Daoyin and Taijiquan in the Ba Duan Jin, Summer Fire and Autumn Weiqi sequences.

An individual 45-minute session costs €80. A group session costs €35 per participant. Online participation requires free space, a stable connection and comfortable clothing.

The range and format of movement are adapted to the participant. Injuries, acute conditions and movement limitations should be discussed in advance.

**CTA:** Book a session

### 7.9 Игра, метафора и история

#### RU

**H1:** Образные способы увидеть ситуацию по-новому

Иногда проблему легче исследовать через образ, сюжет или роль, чем через прямое объяснение. В консультации могут использоваться метафорические ассоциативные карты, создание и переписывание историй, ролевые модели и нарративная рефлексия.

Это не тест с единственно правильной интерпретацией. Значение образа определяет сам клиент, а метод используется только с его согласия и в связи с конкретным запросом.

**CTA:** Узнать, как проходит консультация

#### EN

**H1:** Image-based ways to see a situation differently

Sometimes a situation is easier to explore through an image, story or role than through direct explanation. A consultation may include metaphorical associative cards, creating or rewriting stories, role-based models and narrative reflection.

This is not a test with one correct interpretation. The client determines what an image means, and the method is used only with their agreement and in relation to a specific request.

**CTA:** Learn how a consultation works

### 7.10 Для организаций

#### RU

**H1:** Программы для руководителей и команд

Наталия разрабатывает корпоративные форматы по стабилизации состояния, профилактике перегрузки, работоспособности и обучению навыкам саморегуляции. Формат может включать вводный воркшоп, вебинар, практическое занятие или более длительную программу.

В основе — опыт разработки 40+ программ, работа с 2000+ педагогов, руководителями образовательных организаций и командами цифровой трансформации.

После первичного брифа согласуются аудитория, задача, длительность, формат, материалы и критерии обратной связи.

**CTA:** Запросить корпоративное предложение

#### EN

**H1:** Programmes for leaders and teams

Natalia designs organisational formats focused on state regulation, overload prevention, sustainable performance and self-regulation skills. The format may be an introductory workshop, webinar, practical session or a longer programme.

The work draws on experience designing 40+ programmes and working with 2,000+ educators, educational leaders and digital-transformation teams.

After an initial brief, the audience, task, duration, format, materials and feedback criteria are agreed.

**CTA:** Request an organisational proposal

### 7.11 Материалы

#### RU

**H1:** Материалы для самостоятельного знакомства с подходом

Здесь публикуются короткие объясняющие видео, статьи и аудиопрактики о стрессе, перегрузке, дыхании, привычках, профессиональных переходах, активном долголетии и научных исследованиях.

План выпуска: в первый месяц — одно короткое видео и один текстовый материал в неделю; затем — не реже одного нового материала в месяц.

Материалы помогают познакомиться с подходом, но не заменяют индивидуальную консультацию.

**CTA:** Подписаться на обновления

#### EN

**H1:** Resources for exploring the approach independently

This section contains short explanatory videos, articles and audio practices about stress, overload, breathing, habits, professional transitions, active longevity and scientific research.

Publishing rhythm: during the first month, one short video and one written resource each week; afterwards, at least one new item per month.

The resources introduce the approach but do not replace an individual consultation.

**CTA:** Subscribe for updates

### 7.12 Запись и условия

#### RU

**H1:** Запись на первую встречу

1. Заполните короткую форму и опишите запрос без лишних чувствительных подробностей.
2. Получите подтверждение, что формат подходит для первичной встречи.
3. Заполните необходимые опросники и ознакомьтесь с условиями.
4. Оплатите консультацию.
5. Выберите время в доступном календаре.

Первая встреча длится 60 минут и стоит €100 онлайн или €120 очно. Перенос желательно оформить не позднее чем за 24 часа. Исключительные обстоятельства обсуждаются отдельно.

Онлайн-встречи доступны на русском и английском языках. Очные встречи проходят в Белграде.

**CTA:** Отправить заявку

#### EN

**H1:** Book a first meeting

1. Complete a short form and describe your request without unnecessary sensitive detail.
2. Receive confirmation that the format is suitable for an initial meeting.
3. Complete the necessary questionnaires and review the working terms.
4. Pay for the consultation.
5. Choose an available time in the calendar.

The first meeting lasts 60 minutes and costs €100 online or €120 in person. Rescheduling should normally be requested at least 24 hours in advance. Exceptional circumstances are discussed individually.

Online meetings are available in Russian and English. In-person meetings take place in Belgrade.

**CTA:** Submit an enquiry

### 7.13 FAQ

#### RU

**Это терапия или обучение?** Формат зависит от услуги. Психологическая консультация работает с индивидуальным запросом; нейроинтеграция, дыхание и цигун включают освоение конкретных инструментов.

**Можно начать с одной встречи?** Да. После первой консультации продолжение обсуждается совместно; пакет не обязателен.

**Сколько встреч потребуется?** Количество зависит от запроса, цели и обратной связи. Подход ориентирован на краткосрочную работу с одним согласованным запросом.

**Есть ли поддержка между встречами?** Только если она входит в выбранную программу или отдельно согласована.

**С какими запросами Наталия не работает?** Детские, семейные, клинические и кризисные запросы направляются к соответствующим специалистам.

**Можно заниматься онлайн?** Да. Консультации и большинство практик доступны онлайн; очные встречи проходят в Белграде.

#### EN

**Is this therapy or training?** It depends on the service. Psychological consultation focuses on an individual request; neurointegration, breathing and qigong include learning specific tools.

**Can I start with one meeting?** Yes. Further work is discussed together after the first consultation; a package is not required.

**How many meetings will I need?** The number depends on the request, goal and feedback. The approach is oriented towards short-term work with one agreed request.

**Is there support between sessions?** Only when it is included in the selected programme or agreed separately.

**Which requests does Natalia not take?** Child, family, clinical and crisis requests are referred to the appropriate specialists.

**Can I work online?** Yes. Consultations and most practices are available online; in-person meetings take place in Belgrade.

## 8. Дизайн и навигация

Основа взаимодействия — [концепция вкладок и папок](../design/workspace-navigation-concept.md). Верхний уровень показывает бренд Wellness и отдельную ссылку на Science, а ряд вкладок открывает самостоятельные страницы только внутри Wellness. Активная вкладка визуально соединена с содержимым и имеет `aria-current="page"`.

Визуальная тема Wellness:

- тёплый светлый фон;
- шалфей, глина и мягкий янтарь как акценты;
- спокойные поверхности и умеренные скругления;
- фотографии Наталии и реальные детали практики вместо абстрактных медицинских изображений;
- карта «Исследование × Обучение × Психика × Мозг × Тело» как навигация по направлениям;
- никакой визуализации медицинского диагноза или гарантированного результата.

## 9. Контентная модель

Wellness использует типы `Service`, `Method`, `Audience`, `Resource`, `FAQItem`, `Credential`, `Testimonial` и `ContentPage` из общего контракта.

Для каждой услуги обязательны: RU/EN-название, аудитория, задача, формат, длительность, цена, `serviceAvailability`, подготовка, результат встречи, поддержка, ограничения, CTA и связанные методы.

Для каждого метода обязательны: простое объяснение, обучение Наталии, применение, типичное упражнение, адаптация, ограничения, связанные услуги и `lifecycleStatus`.

## 10. Формы и интеграции

- Короткая первичная форма не собирает диагнозы и подробную историю здоровья.
- После ручного согласования система отправляет ссылку на условия, необходимые опросники и оплату.
- Календарь становится доступным после оплаты либо ручного подтверждения администратора.
- Платёжный провайдер подключается через адаптер; валюта отображения — евро.
- Для корпоративной заявки используется отдельная форма: организация, роль, размер группы, задача, формат, язык, сроки и контакт.
- Email-подписка требует отдельного согласия.

## 11. SEO GEO и аналитика

Основные кластеры: психолог для руководителей; стресс и выгорание; психологическая консультация онлайн; адаптация после переезда; нейроинтеграция; дыхательные практики; цигун онлайн; корпоративное благополучие.

Каждая индексируемая страница получает уникальные RU/EN `title`, `description`, `h1`, canonical, hreflang, Open Graph и видимые авторство с датой обновления.

Schema.org: `Person`, `Service`, `Article`, `FAQPage`, `VideoObject`, `BreadcrumbList`. Разметка должна совпадать с видимым текстом.

События аналитики: просмотр услуги, переход к форме, начало формы, успешная отправка, переход к оплате, переход к календарю, заявка организации, подписка. Содержание запроса и ответы опросников в аналитику не передаются.

## 12. Редакционная безопасность заявлений

Этот раздел регулирует рекламную точность и не ставит под сомнение образование, дипломы или практический опыт Наталии. Следующие исходные формулировки не публикуются дословно, потому что они слишком категоричны, медицински широки или превращают наблюдение в гарантированный результат.

| Исходный смысл анкеты | Редакционное решение | Публичная формулировка |
| --- | --- | --- |
| «Одобрено современной наукой», «сердце и сосуды работают идеально» | Не использовать универсальное одобрение и идеальный медицинский эффект | «Оздоровительный цигун сочетает мягкое движение, дыхание и внимание; нагрузка адаптируется к участнику» |
| «Увеличивает серое вещество и уменьшает миндалевидное тело» | Не переносить нейровизуализационный результат отдельного исследования на каждого клиента | «Практики осознанности используются для тренировки внимания и навыков саморегуляции» |
| «Метафорические карты обходят защиты и показывают бессознательное» | Не представлять интерпретацию карты как диагностику или доступ к скрытой истине | «Изображения помогают обсуждать ассоциации, взглянуть на ситуацию с другой стороны и сформулировать собственные смыслы» |
| «Метаболический мусор в нейронах» и жёсткий предел концентрации 90–120 минут | Не использовать упрощённый физиологический механизм и универсальный предел | «Регулярные паузы и смена типа нагрузки могут помогать поддерживать внимание; ритм подбирается индивидуально» |
| «Дыхание — единственный автономный процесс, которым можно управлять» | Убрать исключительность и абсолют | «Дыхание — один из доступных способов осознанно влиять на текущее состояние» |
| «Нейроинтеграция возвращает мозг в зону высокой эффективности» | Не обещать конкретное состояние мозга или производительность | «Практика помогает замечать признаки перегрузки и осваивать персональные способы саморегуляции» |
| Улучшение сна, снижение тревожности, счастье или восстановление как ожидаемый итог | Представлять как возможное наблюдение или цель, а не обещание | «Работа может быть направлена на сон, напряжение, ясность запроса и устойчивые повседневные действия; результат индивидуален» |
| Работа с психосоматикой и восстановление после заболеваний | Не создавать впечатление лечения медицинских состояний | «Практика не заменяет диагностику и лечение; при медицинских симптомах нужна консультация профильного специалиста» |
| Ссылки на отдельные исследования, авторов или популярные источники | Не использовать как доказательство гарантированного эффекта услуги | Публиковать только в редакционных материалах с контекстом, ограничениями и первичной ссылкой |

Общие правила:

- описывать процесс, формат и навык, а не обещанный исход;
- отделять личное наблюдение, отзыв клиента и научный результат;
- не использовать диагнозы как SEO-приманку для немедицинской услуги;
- не собирать и не передавать в аналитику чувствительные данные о здоровье;
- сохранять противопоказания и рекомендацию обратиться к врачу там, где практика может требовать медицинской оценки.

## 13. Критерии приёмки

- Все 13 страниц существуют на русском и английском и имеют одинаковую структуру.
- Имя, титулы, цены, длительность и статусы совпадают с профессиональной картой.
- Первая встреча везде платная; бесплатная встреча нигде не обещается.
- Основной CTA частного сценария ведёт на форму первичного обращения.
- Wellness не продаёт научные тексты и не использует Science CTA.
- Все методы связаны хотя бы с одной услугой, а все услуги — с подходящими методами.
- На каждой услуге видны цена либо «по согласованию», формат и следующий шаг.
- RU/EN-паритет проверен автоматически и вручную.
- Страницы доступны с клавиатуры, соответствуют WCAG 2.2 AA и корректно работают при 320, 390, 768 и 1440 px.
- До утверждения контента и интеграций сохраняется `PUBLIC_SITE_STATUS=draft` и `noindex`.
