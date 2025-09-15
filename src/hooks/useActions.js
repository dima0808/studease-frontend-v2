import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { filterActions } from "@/store/filter/filter.slice";
import { selectionActions } from "@/store/selection/selection.slice";
import { testsActions } from "@/store/tests/tests.slice";
import * as testsAsyncActions from "@/store/tests/tests.actions";

const rootActions = {
  ...filterActions,
  ...selectionActions,
  ...testsActions,
  ...testsAsyncActions,
}

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}