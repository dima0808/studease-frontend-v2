import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { filterActions } from "@/store/filter/filter.slice";
import { selectionActions } from "@/store/selection/selection.slice";
import { testsActions } from "@/store/tests/tests.slice";

const rootActions = {
  ...filterActions,
  ...selectionActions,
  ...testsActions
}

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}