import { useState } from 'react';
import './FaqPage.scss';
import Button from '@/components/Button';
import Lockup from '@/components/Lockup';
import KpiFootnote from '@/components/KpiFootnote';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { ArrowLeft, Check, ChevronDown, Clipboard } from 'lucide-react';
import { snippets } from './jsonSnippets.data';
import { copyToClipboard } from '@/utils/copyToClipboard';

const SECTION_VALUES = ['general', 'transfer'];

/** Renders `**bold**` runs — the words a student is hunting for on screen. */
const RichText = ({ text }) => (
  <>
    {text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
      index % 2 ? <strong key={index}>{part}</strong> : part,
    )}
  </>
);

const CodeExample = ({ id, title, description, code, copiedId, onCopy }) => {
  const { t } = useTranslation();

  return (
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
          title={t('faq.copyJson')}
        >
          {copiedId === id ? <Check size={16} /> : <Clipboard size={16} />}
        </button>
      </div>
      <pre className="faq-page__code">
        <code>{code}</code>
      </pre>
    </section>
  );
};

const Faq = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [copiedId, setCopiedId] = useState(null);
  const [activeSection, setActiveSection] = useState('general');
  const [openQuestion, setOpenQuestion] = useState(0);

  const faqQuestions = t('faq.questions', { returnObjects: true });
  const guideCards = t('faq.transfer.guideCards', { returnObjects: true });
  const questionTypes = t('faq.transfer.questionTypes', { returnObjects: true });
  const rail = t('faq.rail', { returnObjects: true });
  const examples = t('faq.transfer.examples', { returnObjects: true });

  const handleCopy = async (id, code) => {
    if (!(await copyToClipboard(code))) return;

    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="faq-page">
      <div className="faq-page__bar">
        <Lockup />
        <Button
          text={t('faq.back')}
          icon={ArrowLeft}
          iconSize={16}
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="faq-page__body">
        <div className="faq-page__main">
          <p className="faq-page__kicker">{t('faq.kicker')}</p>
          <h1 className="faq-page__title">{t('faq.title')}</h1>

          <div className="faq-page__tabs">
            {SECTION_VALUES.map((section) => (
              <button
                key={section}
                type="button"
                className={classNames('faq-page__tab', {
                  'faq-page__tab--active': activeSection === section,
                })}
                onClick={() => setActiveSection(section)}
              >
                {t(`faq.sections.${section}`)}
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
                <Trans
                  i18nKey="faq.transfer.lede"
                  components={{ code: <code /> }}
                />
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

              <h2 className="faq-page__heading">
                {t('faq.transfer.typesHeading')}
              </h2>
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

              <h2 className="faq-page__heading">
                {t('faq.transfer.filesHeading')}
              </h2>
              <div className="faq-page__examples">
                <CodeExample
                  id="collection"
                  title={examples.collectionTitle}
                  description={examples.collectionDescription}
                  code={snippets.collection}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                />
                <CodeExample
                  id="test"
                  title={examples.testTitle}
                  description={examples.testDescription}
                  code={snippets.test}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                />
                <CodeExample
                  id="bundle"
                  title={examples.bundleTitle}
                  description={examples.bundleDescription}
                  code={snippets.bundle}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                />
              </div>
            </div>
          )}
        </div>

        <aside className="faq-page__rail">
          {rail.map((item) => (
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
