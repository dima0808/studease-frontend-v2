import './SidebarCreation.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, ROUTES_NAV } from '@/constants/routes';

const Sidebar = (props) => {
  const { addQuestion, addCollection, showAIGenerationBlock } = props;

  const { pathname } = useLocation();
  const isTest = pathname === `/${ROUTES.CREATE_TEST}`;

  const navigate = useNavigate();

  return (
    <div className="sidebar-creation">
      <button onClick={() => navigate(-1)} className="sidebar-creation__btn">
        ==Back==
      </button>
      <button onClick={addQuestion} className="sidebar-creation__btn">
        Add Question
      </button>
      {isTest && (
        <button onClick={addCollection} className="sidebar-creation__btn">
          Add Collection
        </button>
      )}
      <button onClick={showAIGenerationBlock} className="sidebar-creation__btn">
        AI Generation
      </button>
      <button className="sidebar-creation__btn">Create Test</button>
    </div>
  );
};

export default Sidebar;
