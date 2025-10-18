import GenericListPage from '@/components/GenericListPage';
import { useActions } from '@/hooks/useActions';
import CollectionCard from '@/components/CollectionCard';
import './CollectionsPage.scss';
import { selectCollections } from '@/store/collections/collections.slice';

const CollectionsPage = () => {
  const { getAllCollections } = useActions();
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
      hasSort
    />
  );
};

export default CollectionsPage;
