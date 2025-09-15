import classNames from "classnames";
import TestCard from "@/components/TestCard";
import { useSelector } from "react-redux";
import { filterTests } from "@/utils/filterTests";
import EmptyTests from "@/components/EmptyTests";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import './TestPage.scss'
import { useActions } from "@/hooks/useActions";

const TestPage = () => {
  const { viewMode, sortBy, search } = useSelector(state => state.filter)
  const { tests, isLoading, error } = useSelector(state => state.tests)
  const { selectedIds } = useSelector(state => state.selection)
  const { getAllTests } = useActions()

  const filteredTests = filterTests(tests, { sortBy, search })

  useEffect(() => {
    getAllTests()
  }, [getAllTests])

  if (isLoading) return <Loading text="tests"/>

  if (error) return <div className="error">{error}</div>

  if (filteredTests.length === 0) return <EmptyTests />

  return (
    <div
      key={viewMode + sortBy + search}
      className={classNames("test-page", {
        "test-page__grid": viewMode === "grid",
        "test-page__table": viewMode === "table",
      })}
    >
      {filteredTests.map((test, index) =>
        <TestCard
          key={test.id}
          index={index}
          wide={viewMode === "table"}
          selectedIds={selectedIds}
          {...test}
        />
      )}
    </div>
  )
}

export default TestPage
