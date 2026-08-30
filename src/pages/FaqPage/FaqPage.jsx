import { useState } from 'react';
import './FaqPage.scss';
import Button from '@/components/Button';
import Lockup from '@/components/Lockup';
import KpiFootnote from '@/components/KpiFootnote';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ChevronDown, Clipboard } from 'lucide-react';
import { faqQuestions } from './faqQuestions.data';
import { snippets } from './jsonSnippets.data';
import { guideCards, questionTypes, RAIL } from './transferGuide.data';

const SECTIONS = [
  { value: 'general', label: 'Taking a test' },
  { value: 'transfer', label: 'Import & export' },
];

/** Renders `**bold**` runs — the words a student is hunting for on screen. */
const RichText = ({ text }) => (
  <>
    {text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
      index % 2 ? <strong key={index}>{part}</strong> : part,
    )}
  </>
);

const CodeExample = ({ id, title, description, code, copiedId, onCopy }) => (
  <section className="faq-page__example">
    <div className="faq-page__example-header">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <button
        type="button"
        className="faq-page__copy"
        onClick={() => onCopy(id, code)}
        title="Copy JSON"
      >
        {copiedId === id ? <Check size={16} /> : <Clipboard size={16} />}
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
  const [openQuestion, setOpenQuestion] = useState(0);

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
      <div className="faq-page__bar">
        <Lockup />
        <Button
          text="Back"
          icon={ArrowLeft}
          iconSize={16}
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="faq-page__body">
        <div className="faq-page__main">
          <p className="faq-page__kicker">Help</p>
          <h1 className="faq-page__title">Before you ask</h1>

          <div className="faq-page__tabs">
            {SECTIONS.map((section) => (
              <button
                key={section.value}
                type="button"
                className={classNames('faq-page__tab', {
                  'faq-page__tab--active': activeSection === section.value,
                })}
                onClick={() => setActiveSection(section.value)}
              >
                {section.label}
              </button>
            ))}
          </div>

          {activeSection === 'general' && (
            <div className="faq-page__list">
              {faqQuestions.map((item, index) => {
                const isOpen = openQuestion === index;

                return (
                  <div className="faq-page__item" key={item.question}>
                    <button
                      type="button"
                      className="faq-page__question"
                      aria-expanded={isOpen}
                      onClick={() => setOpenQuestion(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        size={18}
                        strokeWidth={2.4}
                        className={classNames('faq-page__chevron', {
                          'faq-page__chevron--open': isOpen,
                        })}
                      />
                    </button>
                    {isOpen && (
                      <p className="faq-page__answer">
                        <RichText text={item.answer} />
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeSection === 'transfer' && (
            <div className="faq-page__transfer">
              <p className="faq-page__lede">
                StudEase expects <code>schemaVersion: 1</code>, a{' '}
                <code>kind</code>, and the payload in <code>data</code> or{' '}
                <code>items</code>. Old ids, session counts and anything the
                server computes are not needed — it creates fresh records.
              </p>

              <div className="faq-page__list">
                {guideCards.map((card, index) => (
                  <div className="faq-page__item" key={card.title}>
                    <div className="faq-page__step">
                      <span className="faq-page__step-index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="faq-page__step-title">{card.title}</h3>
                        <p className="faq-page__step-text">{card.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="faq-page__heading">Question types in JSON</h2>
              <div className="faq-page__list">
                {questionTypes.map((item) => (
                  <div className="faq-page__item" key={item.type}>
                    <div className="faq-page__step">
                      <code className="faq-page__type">{item.type}</code>
                      <p className="faq-page__step-text">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="faq-page__heading">Files, in full</h2>
              <div className="faq-page__examples">
                <CodeExample
                  id="collection"
                  title="A collection"
                  description="Carries every supported question type."
                  code={snippets.collection}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                />
                <CodeExample
                  id="test"
                  title="A test"
                  description="Dates, minutes to complete, questions, optional samples."
                  code={snippets.test}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                />
                <CodeExample
                  id="bundle"
                  title="A bundle"
                  description="The shape for importing or exporting several items."
                  code={snippets.bundle}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                />
              </div>
            </div>
          )}
        </div>

        <aside className="faq-page__rail">
          {RAIL.map((item) => (
            <div className="faq-page__rail-item" key={item.title}>
              <h2 className="faq-page__rail-title">{item.title}</h2>
              <p className="faq-page__rail-text">{item.text}</p>
            </div>
          ))}
          <KpiFootnote className="faq-page__rail-footnote" />
        </aside>
      </div>
    </div>
  );
};

export default Faq;
