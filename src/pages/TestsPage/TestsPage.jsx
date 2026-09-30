import GenericListPage from '@/components/GenericListPage';
import TestCard from '@/components/TestCard';
import { useActions } from '@/hooks/useActions';
import { useTranslation } from 'react-i18next';
import { selectTests } from '@/store/tests/tests.slice';

const TestsPage = () => {
  const { getAllTests } = useActions();
  const { t } = useTranslation();

  return (
    <GenericListPage
      name="tests"
      selector={selectTests}
      getAllAction={getAllTests}
      renderItem={(test, index, viewMode, selectedItems) => (
        <TestCard
          key={test.id}
          index={index}
          wide={viewMode === 'table'}
          selectedItems={selectedItems}
          {...test}
        />
      )}
      columns={[
        t('columns.test'),
        t('columns.opens'),
        t('columns.closes'),
        t('columns.takingNow'),
        t('columns.status'),
        '',
      ]}
      hasSort
    />
  );
};

export default TestsPage;
