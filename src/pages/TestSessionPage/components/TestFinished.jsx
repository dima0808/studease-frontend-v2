import { useSelector } from 'react-redux';

const TestFinished = () => {
  const { testSession } = useSelector((state) => state.testSession);

  console.log('finished', testSession);

  return <h1>Test finished</h1>;
};

export default TestFinished;
