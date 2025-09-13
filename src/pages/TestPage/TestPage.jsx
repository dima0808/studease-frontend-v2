import classNames from "classnames";
import TestCard from "@/components/TestCard";
import { useSelector } from "react-redux";
import { filterTests } from "@/utils/filterTests";
import EmptyTests from "@/components/EmptyTests";
import './TestPage.scss'

const TestPage = () => {
  const { viewMode, sortBy, search } = useSelector(state => state.filter)
  const { tests } = useSelector(state => state.tests)
  const { selectedIds } = useSelector(state => state.selection)


  const filteredTests = filterTests(tests, { sortBy, search })

  if (filteredTests.length === 0) {
    return (
      <EmptyTests />
    )
  }

  return (
    <div
      className={classNames("test-page", {
        "test-page__grid": viewMode === "grid",
        "test-page__table": viewMode === "table",
      })}
    >
      {filteredTests.map(test =>
        <TestCard key={test.id} wide={viewMode === "table"} selectedIds={selectedIds} {...test} />
      )}
    </div>
  )
}

export default TestPage