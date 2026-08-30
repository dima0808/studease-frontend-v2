import './CourseboardsPage.scss';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const CourseboardsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="courseboards-page">
      <p className="courseboards-page__kicker">Not built yet</p>
      <h1 className="courseboards-page__title">
        Courseboards
        <br />
        are on the way.
      </h1>
      <hr className="courseboards-page__rule" />
      <p className="courseboards-page__text">
        One page per course: every test in it, who has taken what, and the marks
        in one table. Nothing to see here until then — your tests and
        collections work as usual.
      </p>
      <div className="courseboards-page__actions">
        <Button
          theme="primary"
          size="lg"
          text="Back to tests"
          onClick={() => navigate(`/${ROUTES.TESTS}`)}
        />
        <a
          className="courseboards-page__link"
          href="mailto:studease@kpi.ua?subject=Courseboards"
        >
          Tell us what you need from it
        </a>
      </div>
    </div>
  );
};

export default CourseboardsPage;
