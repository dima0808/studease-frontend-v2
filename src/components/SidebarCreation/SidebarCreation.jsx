import './SidebarCreation.scss';
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const {
    addQuestion,
  } = props

  const navigate = useNavigate();

  return (
    <div className="sidebar-creation">
      <button onClick={() => navigate(-1)} className="sidebar-creation__btn">==Back==</button>
      <button onClick={addQuestion} className="sidebar-creation__btn">Add Question</button>
      <button className="sidebar-creation__btn">Add Collection</button>
      <button className="sidebar-creation__btn">AI Generation</button>
      <button className="sidebar-creation__btn">Create Test</button>
    </div>
  );
};

export default Sidebar;
