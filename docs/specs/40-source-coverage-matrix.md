# Матрица покрытия профессиональной анкеты

Дата: 29 октября 2026 года

Назначение: контроль полноты переноса 107 вопросов и двух итоговых таблиц в канонические ТЗ

## Легенда

- `PM` — [профессиональная карта](./00-professional-map.md)
- `W` — [Wellness ТЗ](./10-wellness-site-spec.md)
- `S` — [Science ТЗ](./20-science-site-spec.md)
- `C` — [общий технический контракт](./30-shared-implementation-contract.md)
- `public` — используется в публичном контенте
- `internal` — используется для проектирования, но не выводится посетителю
- `consent_required` — выводится после согласия конкретного человека или правообладателя
- `planned` — будущий продукт или направление

## Принцип переноса

Анкета и упомянутые в ней документы принимаются как фактическая база. Матрица не оценивает достоверность сведений: она показывает, куда перенесён каждый ответ, как он используется и не потерян ли при разделении Wellness и Science. Отдельные разрешения требуются только для публикации персональных данных, медиа, отзывов, клиентских случаев и материалов третьих лиц.

## Вопросы 1–20 Профессиональная идентичность и образование

| № | Тема | Покрытие | Использование |
| ---: | --- | --- | --- |
| 1 | Представление Наталии | PM «Профессиональная идентичность»; W §2 и главная; S §2 и главная | public |
| 2 | Профессиональные определения | PM «Профессиональная идентичность»; W и S positioning | public |
| 3 | Связь науки, психологии, образования и тела | PM «Ключевое отличие»; W «Отличия»; S «Связь с Wellness» | public |
| 4 | Профессиональная миссия | PM «Образ бренда»; W основное обещание | public |
| 5 | Путь к психологии и телесным практикам | PM «Профессиональная хронология»; W «О Наталии» | public, личные детали internal |
| 6 | Отличие от других специалистов | PM «Ключевое отличие»; W и S «Отличия» | public |
| 7 | Видение на три года | PM «Авторские программы»; W продуктовая линейка; C roadmap boundary | internal и planned |
| 8 | Высшее образование | PM «Образование и квалификации»; S «Биография и степени» | public |
| 9 | Научные степени | PM «Пять опорных фактов»; S positioning и about | public |
| 10 | Психологическое образование | PM qualifications; W about и psychology | public |
| 11 | Углублённые направления психологии | PM «Практические методы»; W psychology | public |
| 12 | Обучение нейроинтеграции | PM qualifications и methods; W neurointegration | public |
| 13 | Обучение дыхательным практикам | PM qualifications; W breathing | public; обучение in_progress |
| 14 | Соматические и телесные подходы | PM methods; W breathing и qigong | public |
| 15 | Обучение цигун | PM qualifications; W movement and qigong | public |
| 16 | Нейрогимнастика и движение | PM methods; W qigong; C content model | public |
| 17 | Другие курсы и программы | PM qualifications | public |
| 18 | Супервизия и этика | PM qualifications; W about; C release requirements | public в краткой форме |
| 19 | Текущее обучение | PM qualifications; W breathing и about | public как in_progress |
| 20 | Дипломы и сертификаты для сайта | PM publicity; C media rules | public с закрытыми персональными данными |

## Вопросы 21–32 Карьера и индивидуальная практика

| № | Тема | Покрытие | Использование |
| ---: | --- | --- | --- |
| 21 | Профессиональная хронология | PM «Профессиональная хронология»; S about | public |
| 22 | Основные направления карьеры | PM career summary; S research and education | public |
| 23 | Значимые проекты | PM projects; S projects | public |
| 24 | Преподавание и обучение взрослых | PM scale; S education | public |
| 25 | Число программ и материалов | PM scale; S home and education | public |
| 26 | Значимые результаты | PM scale and projects; S home; W trust facts | public |
| 27 | Начало индивидуальной работы | PM timeline and scale; W about | public |
| 28 | Реальные запросы | PM clients; W for individuals | public |
| 29 | Длительное сопровождение | PM services; W stress-recovery and FAQ | public |
| 30 | Группы и возраст | PM clients; W audience | public |
| 31 | Методы текущей индивидуальной работы | PM methods; W practice pages | public |
| 32 | Исключённые запросы и перенаправление | PM clients; W for individuals and FAQ | public |

## Вопросы 33–41 Методы

| № | Тема | Покрытие | Использование |
| ---: | --- | --- | --- |
| 33 | Карта текущей практики | PM methods; W route map | public |
| 34 | Паспорта методов | PM methods; W psychology, neurointegration, breathing, qigong, play and story | public в редакционной версии |
| 35 | Определение нейроинтеграции | W neurointegration; PM methods | public |
| 36 | Дыхательные техники | W breathing; PM methods | public |
| 37 | Соматические практики | PM methods; W breathing and qigong | public |
| 38 | Когнитивные и психологические техники | W psychology; PM methods | public |
| 39 | Опросники состояния | C privacy and forms; W booking | internal process, названия могут быть public |
| 40 | Сочетание и смена методов | W psychology; PM brand principles | public |
| 41 | Что Наталия не использует | PM brand principles; W positioning | public |

## Вопросы 42–48 Клиенты и специализация

| № | Тема | Покрытие | Использование |
| ---: | --- | --- | --- |
| 42 | Основной клиент | PM clients; W audience | public |
| 43 | Женщины и мужчины | PM clients; W audience | public |
| 44 | Основная специализация | PM clients; W home and for individuals | public |
| 45 | Наиболее уверенные запросы | PM clients; W for individuals | public |
| 46 | Категории, с которыми Наталия не работает | PM clients; W FAQ and service limitations | public |
| 47 | Активное долголетие | PM methods and future directions; W resources | public и planned |
| 48 | Работа с организациями | PM organisations; W for organisations; S for organisations | public и planned |

## Вопросы 49–60 Услуги и продукты

| № | Тема | Покрытие | Использование |
| ---: | --- | --- | --- |
| 49 | Действующие услуги | PM services; W product line | public |
| 50 | Основная услуга | W positioning and product priorities | public |
| 51 | Первая встреча | W for individuals and booking | public |
| 52 | Последующие консультации | W for individuals and FAQ | public |
| 53 | Количество встреч | W for individuals and FAQ | public |
| 54 | Форматы работы | PM services; W product line | public |
| 55 | Паспорта услуг | PM services; W product line and page copy | public |
| 56 | Готовая 30-дневная программа | PM programmes; W product architecture | public как existing programme |
| 57 | Содержание программы | PM programmes; W stress-recovery | public |
| 58 | Номер отсутствует в исходной нумерации анкеты | Контент не создавался | n/a |
| 59 | Продукты без личного участия | PM programmes; W resources | internal: пока нет; planned |
| 60 | Нежелательные продукты | PM brand principles; W content rules | internal rule |

## Вопросы 61–74 Наука и доверие

| № | Тема | Покрытие | Использование |
| ---: | --- | --- | --- |
| 61 | Исследовательские направления | PM research; S research | public |
| 62 | Связь исследований и практики | PM key difference; W about; S home | public без смешения CTA |
| 63 | Важнейшие публикации | PM research; S publications | public |
| 64 | Конференции | S conferences | public |
| 65 | Исследовательские методы | PM research; S research | public |
| 66 | Организации и профессиональные сети | PM career; S about and conferences | public |
| 67 | Текущие собственные исследования | S research | public: активный собственный проект сейчас не заявлен |
| 68 | Номер отсутствует в исходной нумерации анкеты | Контент не создавался | n/a |
| 69 | Научный раздел | S route map and all content | public |
| 70 | Количественные показатели | PM scale; W and S trust blocks | public |
| 71 | Клиентские кейсы | C consent model; W future testimonials | internal до подготовки карточек, consent_required |
| 72 | Отзывы | PM publicity; C media and consent | consent_required |
| 73 | Выступления и публичные материалы | PM public resources; S conferences; W resources | public |
| 74 | Убедительные достижения | PM five facts; W and S home | public |

## Вопросы 75–84 Бренд и публичные ресурсы

| № | Тема | Покрытие | Использование |
| ---: | --- | --- | --- |
| 75 | Качества бренда | PM brand; W and S tone | public |
| 76 | Номер отсутствует в исходной нумерации анкеты | Контент не создавался | n/a |
| 77 | Мифы о психологии, дыхании, стрессе и мозге | W resources and content plan | public editorial topics |
| 78 | Профессиональные интересы | PM brand; W resources; S research | public |
| 79 | Степень личного контента | PM publicity; W about | public/internal split |
| 80 | «Компас долголетия» | PM public resources; W resources | public как отдельный media project |
| 81 | Социальные сети и площадки | PM public resources; C sameAs data | public |
| 82 | Профессиональные профили | PM public resources; S about and publications | public |
| 83 | Номер отсутствует в исходной нумерации анкеты | Контент не создавался | n/a |
| 84 | Видео и аудиопрактики | W resources; C media model | public и planned cadence |

## Вопросы 85–94 Организация практики

| № | Тема | Покрытие | Использование |
| ---: | --- | --- | --- |
| 85 | Страны и языки | PM organisation of work; W booking; C i18n | public |
| 86 | Онлайн и очно | PM organisation; W booking | public |
| 87 | Часовые пояса | PM organisation; W booking | public в понятной форме |
| 88 | Число консультаций | PM organisation; W operations | internal capacity |
| 89 | Организация записи | W booking; C workflow | public и technical |
| 90 | Оплата и отмена | W booking; C payment workflow | public |
| 91 | Страна и профессиональный статус | PM organisation; C legal content | public в legal разделе |
| 92 | Конфиденциальность и этика | C privacy and legal requirements; W booking | public legal pages |
| 93 | Номер отсутствует в исходной нумерации анкеты | Контент не создавался | n/a |
| 94 | Номер отсутствует в исходной нумерации анкеты | Контент не создавался | n/a |

## Вопросы 95–107 Приоритеты и самопозиционирование

| № | Тема | Покрытие | Использование |
| ---: | --- | --- | --- |
| 95 | Пять обязательных фактов | PM five facts; W and S home | public |
| 96 | Три приоритетные услуги | W product priorities and routes | public |
| 97 | Обязательные страницы | W and S route maps | public architecture |
| 98 | Задачи посетителя | W and S goals and journeys | public architecture |
| 99 | Референсы | W and S design directions | internal design input |
| 100 | Понимание и действие за пять минут | W and S goals, home and CTA | public |
| 101 | «Я помогаю...» | W positioning | public |
| 102 | Отличие подхода | PM key difference; W positioning | public |
| 103 | Важное в работе | PM brand; W about | public |
| 104 | Что не обещает Наталия | W promise and FAQ | public |
| 105 | Когда обратиться | W home and for individuals | public |
| 106 | Наука и практика | PM key difference; W and S about | public |
| 107 | Главная мысль | PM brand; W closing copy | public |

## Итоговые таблицы анкеты

| Источник | Покрытие | Результат |
| --- | --- | --- |
| Таблица 1 «Направление / статус» | PM «Практические методы»; W practice pages; C `LifecycleStatus` | Все направления получили `current`, `in_progress` или `planned` без статуса достоверности |
| Таблица 2 «Формат / сейчас или планирую» | PM «Действующие услуги и цены»; W product line; C `ServiceAvailability` | Действующие и будущие форматы разделены на `available`, `pilot`, `planned` |

## Канонические RU EN формулировки

В строках выше указаны страницы, на которых находится полный готовый текст. Таблица ниже фиксирует короткие двуязычные формулировки для повторяющихся сущностей; внутренние и планируемые ответы не превращаются в публичное обещание до смены их статуса.

| Сущность из анкеты | RU | EN |
| --- | --- | --- |
| Основное имя | Наталия Долгова | Natalia Dolgova |
| Science identity | Исследователь образования, преподаватель и разработчик образовательных программ | Education researcher, educator and learning programme designer |
| Wellness identity | Практический психолог и тренер по нейроинтеграции | Practical psychologist and neurointegration trainer |
| Dr. phil. | Dr. phil., Europa-Universität Flensburg, 2026, magna cum laude | Dr. phil., Europa-Universität Flensburg, 2026, magna cum laude |
| Российская научная степень | Кандидат экономических наук, 2014 | Candidate of Economic Sciences, 2014 |
| Психологическая квалификация | Практический психолог, МПГУ, 1080 часов, 2026 | Practical psychologist, MPGU, 1,080 hours, 2026 |
| Нейроинтеграция | Тренер по нейроинтеграции, 250 часов, 2024 | Neurointegration trainer, 250 hours, 2024 |
| Продолжающееся обучение | Продолжающееся обучение | Training in progress |
| Профессиональный опыт | Профессиональная работа с 2011 года | Professional work since 2011 |
| Консультирование | Индивидуальное консультирование с 2019 года | Individual consultation work since 2019 |
| Психологическая практика | Частная психологическая практика с марта 2026 года | Private psychological practice since March 2026 |
| Масштаб программ | 40+ программ и 37 образовательных проектов | 40+ programmes and 37 education projects |
| Обученные специалисты | 2000+ педагогов из 35 регионов | 2,000+ educators from 35 regions |
| Учебная нагрузка | Более 3000 часов занятий | More than 3,000 teaching hours |
| Публикации | 100+ публикаций | 100+ publications |
| Психологическая консультация | Индивидуальная психологическая консультация | Individual psychological consultation |
| Первая встреча | Платная первая консультация, 60 минут | Paid first consultation, 60 minutes |
| Цена онлайн | €100 онлайн | €100 online |
| Цена очно | €120 очно в Белграде | €120 in person in Belgrade |
| Серия консультаций | Пакет из пяти встреч | Five-session package |
| Четырёхнедельный формат | Четырёхнедельное индивидуальное сопровождение, €600 | Four-week individual support, €600 |
| Цигун | Оздоровительный цигун: €80 индивидуально; €35 с участника в группе | Health qigong: €80 individual; €35 per group participant |
| Дыхание | Дыхательные практики с индивидуальным подбором интенсивности | Breathing practices with individually adapted intensity |
| КПТ | Инструменты когнитивно-поведенческого подхода | Cognitive behavioural tools |
| ACT | Инструменты терапии принятия и ответственности | Acceptance and Commitment Therapy tools |
| MBSR | Практики осознанности и снижения стресса | Mindfulness and stress-reduction practices |
| Метафорические карты | Образная рефлексия и обсуждение ассоциаций | Image-based reflection and exploration of associations |
| География | Онлайн по всему миру; очно в Белграде | Online worldwide; in person in Belgrade |
| Языки | Русский и английский | Russian and English |
| Основной Wellness CTA | Записаться на платную первую консультацию | Book a paid first consultation |
| Основной Science CTA | Обсудить исследовательский или образовательный проект | Discuss a research or education project |
| Диссертация | Факторы воспринимаемой эффективности онлайн-подготовки педагогов инженерных направлений СПО | Factors shaping the perceived effectiveness of online preparation for TVET engineering educators |
| Научные методы | Количественный, качественный и смешанный анализ; опросы, интервью, триангуляция и систематизация литературы | Quantitative, qualitative and mixed-methods analysis; surveys, interviews, triangulation and literature synthesis |
| Текущий собственный проект | Активный собственный исследовательский проект сейчас не заявлен | No active independent research project is currently stated |
| Science cross-link | Перейти к практике Wellness | Explore the Wellness practice |
| Wellness cross-link | Перейти к исследованиям и публикациям | Explore research and publications |

## Контроль отсутствия вымысла

- Новые степени, организации, цены, публикации, методы и показатели не добавлялись.
- Маркетинговые формулировки построены только из профессиональной карты и ответов анкеты.
- Где в анкете отсутствуют кейсы, имена клиентов или содержание отзывов, публичные тексты не создаются до получения материала и согласия.
- Номера 58, 68, 76, 83, 93 и 94 отсутствуют в исходной нумерации; вместо реконструкции это зафиксировано явно.
- Юридические страницы используют предоставленные Наталией документы, но не копируют в Git приватные ссылки, реквизиты и специальные категории данных.

## Контроль RU EN

| Проверка | Wellness | Science |
| --- | --- | --- |
| Одинаковый набор страниц | required | required |
| Одинаковые факты и числа | required | required |
| Одинаковые цены | required | n/a |
| Одинаковые публикации | n/a | required |
| Одинаковые CTA по смыслу | required | required |
| Локализованные title и description | required | required |
| Переключение на эквивалентный route id | required | required |
