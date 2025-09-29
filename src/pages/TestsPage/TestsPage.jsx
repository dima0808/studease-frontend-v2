import GenericListPage from "@/components/GenericListPage"
import TestCard from "@/components/TestCard"
import { useActions } from "@/hooks/useActions"
import './TestsPage.scss'
import { selectTests } from "@/store/tests/tests.slice";

const TestsPage = () => {
  const { getAllTests } = useActions()
  return (
    <GenericListPage
      name="tests"
      selector={selectTests}
      getAllAction={getAllTests}
      renderItem={(test, index, viewMode, selectedItems) => (
        <TestCard
          key={test.id}
          index={index}
          wide={viewMode === "table"}
          selectedItems={selectedItems}
          {...test}
        />
      )}
      hasSort
    />
  )
}

export default TestsPage
