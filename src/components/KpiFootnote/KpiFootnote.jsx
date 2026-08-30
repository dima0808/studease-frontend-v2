import classNames from 'classnames';
import './KpiFootnote.scss';

const KpiFootnote = ({ className, singleLine = false }) => (
  <p
    className={classNames(
      'kpi-footnote',
      { 'kpi-footnote--single': singleLine },
      className,
    )}
  >
    Igor Sikorsky Kyiv{singleLine ? ' ' : <br />}Polytechnic Institute
  </p>
);

export default KpiFootnote;
