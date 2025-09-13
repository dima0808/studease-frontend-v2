import './Header.scss'
import ToggleButton from "@/components/ToggleButton";
import { ACTION_OPTIONS, VIEW_OPTIONS } from "@/constants/toggleOptions";
import TabsFilter from "@/components/TabsFilter";
import { TAB_FILTERS } from "@/constants/tabFilters";
import Button from "@/components/Button";
import SearchInput from "@/components/SearchInput";
import { useSelector } from "react-redux";
import { useActions } from "@/hooks/useActions";
import { filterTests } from "@/utils/filterTests";

const Header = () => {
  const { viewMode, sortBy, search } = useSelector(state => state.filter)
  const { actionMode, selectedIds } = useSelector(state => state.selection)
  const { tests } = useSelector(state => state.tests)
  const { setViewMode, setActionMode, selectAll, clearSelection, setSortBy } = useActions()

  const filteredTests = filterTests(tests, { sortBy, search })

  const filteredIds = filteredTests.map(test => test.id)

  const handelActiveIndex = (value) => {
    setSortBy(value)
    if (selectedIds.length > 1) {
      clearSelection()
    }
  }

  return (
    <div className="header">
      <div className="header__wrapper">
        <h1 className="header__title">Your tests</h1>
        <div className="header__view">
          <ToggleButton mode={viewMode} setMode={setViewMode} options={VIEW_OPTIONS} />
          <ToggleButton mode={actionMode} setMode={setActionMode} options={ACTION_OPTIONS} />
        </div>
      </div>
      <div className="header__wrapper">
        <TabsFilter activeIndex={sortBy} handelActiveIndex={handelActiveIndex} options={TAB_FILTERS} />
        <div className="header__view">
          {actionMode === 'select' ? (
            <>
              <Button text={selectedIds.length > 0 ? "Unselect All" : "Select All"} onClick={
                () => {
                  if (selectedIds.length > 0) {
                    clearSelection()
                  } else {
                    selectAll(filteredIds)
                  }
              }} />
              <Button text="Export" iconName="ExportIcon" />
              <Button text="Delete" iconName="RemoveIcon" />
            </>
          ) : (<>
            <Button text="Import" iconName="ImportIcon" />
            <Button theme="primary" text="Create a test" iconName="CreateIcon" />
          </>)}
          <SearchInput placeholder="Search" />
        </div>
      </div>
    </div>
  )
}

export default Header