import GenericListPage from '@/components/GenericListPage';
import { useActions } from '@/hooks/useActions';
import { useTranslation } from 'react-i18next';
import CollectionCard from '@/components/CollectionCard';
import { selectCollections } from '@/store/collections/collections.slice';

const CollectionsPage = () => {
  const { getAllCollections } = useActions();
  const { t } = useTranslation();
  return (
    <GenericListPage
      name="collections"
      selector={selectCollections}
      getAllAction={getAllCollections}
      renderItem={(collection, index, viewMode, selectedItems) => (
        <CollectionCard
          key={collection.id}
          index={index}
          wide={viewMode === 'table'}
          selectedItems={selectedItems}
          {...collection}
        />
      )}
      columns={[
        t('columns.collection'),
        t('columns.questions'),
        t('columns.usedInTests'),
        t('columns.status'),
        '',
      ]}
      hasSort
    />
  );
};

export default CollectionsPage;
