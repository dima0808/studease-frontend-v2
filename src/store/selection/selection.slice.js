import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  actionMode: 'view',
  selectedItems: [],
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    setActionMode(state, action) {
      state.actionMode = action.payload;
      state.selectedItems = [];
    },
    toggleItem(state, action) {
      const newItem = action.payload;
      if (state.selectedItems.some((item) => item.id === newItem.id)) {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.id !== newItem.id,
        );
      } else {
        state.selectedItems.push(newItem);
      }
    },
    selectAll(state, action) {
      state.selectedItems = action.payload;
    },
    clearSelection(state) {
      state.selectedItems = [];
    },
  },
});

export const { actions: selectionActions } = selectionSlice;
export default selectionSlice.reducer;
