import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { filterActions } from '@/store/filter/filter.slice';
import { selectionActions } from '@/store/selection/selection.slice';
import { testsActions } from '@/store/tests/tests.slice';
import * as testsAsyncActions from '@/store/tests/tests.actions';
import * as collectionsAsyncActions from '@/store/collections/collections.actions';
import * as authAsyncActions from '@/store/auth/auth.actions';
import * as testSessionAsyncActions from '@/store/testSession/testSession.actions';
import { authActions } from '@/store/auth/auth.slice';
import { testSessionActions } from '@/store/testSession/testSession.slice';

const rootActions = {
  ...authActions,
  ...filterActions,
  ...selectionActions,
  ...testsActions,
  ...testSessionActions,
  ...authAsyncActions,
  ...testsAsyncActions,
  ...collectionsAsyncActions,
  ...testSessionAsyncActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
