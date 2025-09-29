import classNames from "classnames";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/ErrorComponent";
import EmptyData from "@/components/EmptyData";
import { filterArr } from "@/utils/filterArr";

const GenericListPage = ({
                           name,              // "collections" | "tests"
                           selector,          // state => state.collections / state.tests
                           getAllAction,      // () => dispatch(...)
                           renderItem,        // (item, index, viewMode, selectedItems) => JSX
                           hasSort = false,   // якщо потрібне сортування
                         }) => {
  const { viewMode, search, sortBy } = useSelector(state => state.filter)
  const { data, isLoading, error } = useSelector(selector)
  const { selectedItems } = useSelector(state => state.selection)

  useEffect(() => {
    getAllAction()
  }, [getAllAction])

  const filteredData = filterArr(data, { search, ...(hasSort && { sortBy }) })

  if (isLoading) return <Loading text={name} />
  if (error) return <ErrorComponent description={error} onRetry={getAllAction} />
  if (filteredData.length === 0) return <EmptyData name={name} />

  return (
    <div
      key={viewMode + search + (hasSort ? sortBy : "")}
      className={classNames(`${name}-page`, {
        [`${name}-page__grid`]: viewMode === "grid",
        [`${name}-page__table`]: viewMode === "table",
      })}
    >
      <AnimatePresence>
        {filteredData.map((item, index) =>
          renderItem(item, index, viewMode, selectedItems)
        )}
      </AnimatePresence>
    </div>
  )
}

export default GenericListPage
