import './Important.scss';
import ImportantIcon from '@/components/icons/ImportantIcon';

const Important = (props) => {
  const { text } = props;
  return (
    <div className="important">
      <ImportantIcon />
      <span>{text}</span>
    </div>
  );
};

export default Important;
