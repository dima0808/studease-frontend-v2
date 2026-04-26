import React, { useState } from 'react';
import './FaqPage.scss';
import { fadeUp } from '@/constants/motionVariants';
import Button from '@/components/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Clipboard } from 'lucide-react';

const snippets = {
  collection: `{
  "schemaVersion": 1,
  "kind": "collection",
  "exportedAt": "2026-04-26T00:00:00.000Z",
  "data": {
    "name": "Frontend Basics Collection",
    "questions": [
      {
        "content": "Which hook is used for local state in React?",
        "points": 1,
        "type": "single_choice",
        "answers": [
          { "content": "useMemo", "isCorrect": false },
          { "content": "useState", "isCorrect": true },
          { "content": "useEffect", "isCorrect": false }
        ]
      },
      {
        "content": "Choose JavaScript primitive types.",
        "points": 2,
        "type": "multiple_choices",
        "answers": [
          { "content": "string", "isCorrect": true },
          { "content": "number", "isCorrect": true },
          { "content": "array", "isCorrect": false },
          { "content": "boolean", "isCorrect": true }
        ]
      },
      {
        "content": "Explain what asynchronous code means.",
        "points": 3,
        "type": "essay",
        "answers": []
      },
      {
        "content": "Match HTTP status codes with meanings.",
        "points": 4,
        "type": "matching",
        "answers": [
          { "leftOption": "200", "rightOption": "OK" },
          { "leftOption": "201", "rightOption": "Created" },
          { "leftOption": "404", "rightOption": "Not Found" }
        ]
      }
    ]
  }
}`,
  test: `{
  "schemaVersion": 1,
  "kind": "test",
  "exportedAt": "2026-04-26T00:00:00.000Z",
  "data": {
    "name": "JavaScript Checkpoint",
    "openDate": "20.09.2026 12:00",
    "deadline": "30.09.2026 12:00",
    "minutesToComplete": 30,
    "maximumScore": 10,
    "questions": [
      {
        "content": "What does DOM stand for?",
        "points": 1,
        "type": "single_choice",
        "answers": [
          { "content": "Document Object Model", "isCorrect": true },
          { "content": "Data Object Mode", "isCorrect": false }
        ]
      }
    ],
    "samples": []
  }
}`,
  bundle: `{
  "schemaVersion": 1,
  "kind": "collections",
  "exportedAt": "2026-04-26T00:00:00.000Z",
  "items": [
    {
      "name": "HTML Basics",
      "questions": []
    },
    {
      "name": "CSS Basics",
      "questions": []
    }
  ]
}`,
};

const guideCards = [
  {
    title: 'Export одного тесту або колекції',
    text: 'Відкрийте сторінку Tests або Collections, натисніть меню дій на картці й оберіть Export. Система завантажить JSON-файл, який можна імпортувати назад у StudEase.',
  },
  {
    title: 'Export декількох елементів',
    text: 'Перемкніть режим дій у Select, виберіть потрібні тести або колекції та натисніть Export. Буде створено bundle-файл з масивом items.',
  },
  {
    title: 'Import одного елемента',
    text: 'На сторінці Tests або Collections натисніть Import і виберіть JSON. Якщо у файлі один елемент, відкриється форма створення з уже заповненими полями.',
  },
  {
    title: 'Import bundle-файлу',
    text: 'Якщо файл містить декілька items, система створить їх одразу. Bundle тестів імпортуйте зі сторінки Tests, bundle колекцій - зі сторінки Collections.',
  },
];

const questionTypes = [
  {
    type: 'single_choice',
    description:
      'Одна правильна відповідь. У answers лише один обʼєкт має isCorrect: true.',
  },
  {
    type: 'multiple_choices',
    description:
      'Кілька правильних відповідей. Кожен правильний варіант має isCorrect: true.',
  },
  {
    type: 'essay',
    description:
      'Відкрите питання. Для нього залишайте answers порожнім масивом.',
  },
  {
    type: 'matching',
    description:
      'Пари для співставлення. У файлі достатньо leftOption і rightOption; неправильні пари не потрібно додавати.',
  },
];

const generalFaq = [
  {
    question: 'З чого краще проходити тести?',
    answer:
      'Рекомендовано проходити тести з компʼютера або ноутбука в сучасному браузері: Google Chrome, Microsoft Edge або Firefox. З телефона чи планшета тест також може працювати, але на малому екрані окремі елементи можуть бути менш зручними.',
  },
  {
    question: 'Що робити, якщо сторінка тесту зависла або не відкривається?',
    answer:
      'Перевірте інтернет-зʼєднання й оновіть сторінку. Якщо проблема не зникла, очистіть кеш браузера або спробуйте зайти з іншого пристрою.',
  },
  {
    question: 'Як відбувається проходження тесту?',
    answer:
      'Після старту питання зʼявляються по одному. Студент обирає або вводить відповідь і переходить далі. Після завершення система зберігає результат.',
  },
  {
    question: 'Які типи питань можуть бути в тесті?',
    answer:
      'Підтримуються питання з однією правильною відповіддю, з кількома правильними відповідями, відкриті питання та завдання на співставлення пар.',
  },
  {
    question: 'Чи можна повернутися до попереднього питання?',
    answer:
      'У більшості випадків ні. Тест побудований так, щоб студент уважно перевіряв відповідь перед переходом до наступного питання.',
  },
  {
    question: 'Що робити, якщо закінчився час?',
    answer:
      'Після завершення таймера тест автоматично завершується, а вже вибрані або введені відповіді зберігаються.',
  },
  {
    question: 'Чи можна пройти тест повторно?',
    answer:
      'Повторне проходження можливе лише за дозволом адміністратора або викладача.',
  },
  {
    question: 'Чому оцінка може не відображатися після завершення тесту?',
    answer:
      'Оцінка показується тільки тоді, коли це дозволено налаштуваннями тесту. Якщо оцінку приховано, студент бачить лише інформацію про завершення або свої відповіді.',
  },
];

const CodeExample = ({ id, title, description, code, copiedId, onCopy }) => (
  <section className="faq-page__example">
    <div className="faq-page__example-header">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button
        type="button"
        className="faq-page__copy"
        onClick={() => onCopy(id, code)}
        title="Copy JSON"
      >
        {copiedId === id ? <Check size={18} /> : <Clipboard size={18} />}
      </button>
    </div>
    <pre className="faq-page__code">
      <code>{code}</code>
    </pre>
  </section>
);

const Faq = () => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);
  const [activeSection, setActiveSection] = useState('general');

  const handleCopy = async (id, code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch (error) {
      console.error('Failed to copy FAQ snippet:', error);
    }
  };

  return (
    <div className="faq-page">
      <Motion.div
        className="faq-page__header"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
      >
        <div className="faq-page__title-row">
          <Button
            className="info-layout-page__back"
            text={<FaArrowLeft size={21} />}
            onClick={() => navigate(-1)}
          />
          <div>
            <h1 className="faq-page__title">FAQ</h1>
            <p className="faq-page__subtitle">
              Довідка для проходження тестів і перенесення даних через JSON.
            </p>
          </div>
        </div>
      </Motion.div>

      <div className="faq-page__switcher" aria-label="FAQ sections">
        <button
          type="button"
          className={activeSection === 'general' ? 'is-active' : ''}
          onClick={() => setActiveSection('general')}
        >
          Загальні запитання про тести
        </button>
        <button
          type="button"
          className={activeSection === 'transfer' ? 'is-active' : ''}
          onClick={() => setActiveSection('transfer')}
        >
          Інформація про імпорт та експорт тестів
        </button>
      </div>

      {activeSection === 'general' && (
        <section className="faq-page__general">
          <div className="faq-page__section-heading">
            <h2>Загальні питання про тести</h2>
            <p>Базові правила проходження тестів і типові ситуації.</p>
          </div>
          <div className="faq-page__general-list">
            {generalFaq.map((item, index) => (
              <Motion.article
                key={item.question}
                className="faq-page__general-item"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={(index + 3) * 0.08}
              >
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </Motion.article>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'transfer' && (
        <>
          <Motion.section
            className="faq-page__intro"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <div>
              <span className="faq-page__eyebrow">JSON format</span>
              <h2>
                Файли мають бути простими, версіонованими і без службових id
              </h2>
            </div>
            <p>
              StudEase очікує `schemaVersion: 1`, поле `kind` і дані в `data`
              або `items`. Старі id, статистика сесій, кількість проходжень і
              обчислювані поля не потрібні: система створить нові записи сама.
            </p>
          </Motion.section>

          <section className="faq-page__section-heading">
            <h2>JSON import/export</h2>
            <p>Як переносити тести й колекції між файлами та StudEase.</p>
          </section>

          <section className="faq-page__cards">
            {guideCards.map((card, index) => (
              <Motion.article
                key={card.title}
                className="faq-page__card"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={(index + 3) * 0.1}
              >
                <span>{index + 1}</span>
                <h2>{card.title}</h2>
                <p>{card.text}</p>
              </Motion.article>
            ))}
          </section>

          <section className="faq-page__types">
            <h2>Типи питань у JSON</h2>
            <div className="faq-page__type-grid">
              {questionTypes.map((item) => (
                <div key={item.type} className="faq-page__type">
                  <code>{item.type}</code>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="faq-page__examples">
            <CodeExample
              id="collection"
              title="Приклад колекції"
              description="Містить усі підтримувані типи питань."
              code={snippets.collection}
              copiedId={copiedId}
              onCopy={handleCopy}
            />
            <CodeExample
              id="test"
              title="Приклад тесту"
              description="Тест має дати, час проходження, питання і optional samples."
              code={snippets.test}
              copiedId={copiedId}
              onCopy={handleCopy}
            />
            <CodeExample
              id="bundle"
              title="Приклад bundle-файлу"
              description="Формат для імпорту або експорту декількох елементів."
              code={snippets.bundle}
              copiedId={copiedId}
              onCopy={handleCopy}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Faq;
