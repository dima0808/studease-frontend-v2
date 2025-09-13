import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actionMode: "view",
  selectedIds: [],
};

const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    setActionMode(state, action) {
      state.actionMode = action.payload;
      state.selectedIds = [];
    },
    toggleItem(state, action) {
      const itemId = action.payload;
      if (state.selectedIds.includes(itemId)) {
        state.selectedIds = state.selectedIds.filter(id => id !== itemId);
      } else {
        state.selectedIds.push(itemId);
      }
    },
    selectAll(state, action) {
      state.selectedIds = action.payload;
    },
    clearSelection(state) {
      state.selectedIds = [];
    },
  },
})

export const { actions: selectionActions } = selectionSlice
export default selectionSlice.reducer;