import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { filterActions } from "@/store/filter/filter.slice";
import { selectionActions } from "@/store/selection/selection.slice";
import { testsActions } from "@/store/tests/tests.slice";
import * as testsAsyncActions from "@/store/tests/tests.actions";
import * as authAsyncActions from "@/store/auth/auth.actions";
import { authActions } from "@/store/auth/auth.slice";

const rootActions = {
  ...authActions,
  ...filterActions,
  ...selectionActions,
  ...testsActions,
  ...authAsyncActions,
  ...testsAsyncActions,
}

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}