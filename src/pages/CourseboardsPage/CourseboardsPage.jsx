import './CourseboardsPage.scss';
import { Fragment } from 'react';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';

const CourseboardsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="courseboards-page">
      <p className="courseboards-page__kicker">{t('courseboards.kicker')}</p>
      <h1 className="courseboards-page__title">
        {t('courseboards.title')
          .split('\n')
          .map((line, index, lines) => (
            <Fragment key={line + index}>
              {line}
              {index < lines.length - 1 && <br />}
            </Fragment>
          ))}
      </h1>
      <hr className="courseboards-page__rule" />
      <p className="courseboards-page__text">{t('courseboards.text')}</p>
      <div className="courseboards-page__actions">
        <Button
          theme="primary"
          size="lg"
          text={t('courseboards.back')}
          onClick={() => navigate(`/${ROUTES.TESTS}`)}
        />
        <a
          className="courseboards-page__link"
          href="mailto:studease@kpi.ua?subject=Courseboards"
        >
          {t('courseboards.contact')}
        </a>
      </div>
    </div>
  );
};

export default CourseboardsPage;
