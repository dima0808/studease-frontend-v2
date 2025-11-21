import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  viewMode: localStorage.getItem('filter') || 'grid',
  search: '',
  sortBy: 'all',
  isCollapsed: localStorage.getItem('isCollapsed') === 'true' || false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setViewMode(state, action) {
      state.viewMode = action.payload;
      localStorage.setItem('filter', state.viewMode);
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setIsCollapsed(state, action) {
      state.isCollapsed = action.payload;
      localStorage.setItem('isCollapsed', state.isCollapsed);
    },
  },
});

export const { actions: filterActions } = filterSlice;
export default filterSlice.reducer;
