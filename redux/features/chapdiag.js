import { createSlice } from "@reduxjs/toolkit";

export const chapDiag = createSlice({
  name: "chapdiag",
  initialState: {
    open: false,
    url: "",
    id: null
  },
  reducers: {
    toggle: state => {
      state.open = !state.open;
    },
    closeChap: state => {
      state.open = false;
    },
    openChap: state => {
      state.open = true;
    },
    setUrl: (state, actions) => {
      state.url = actions.payload;
    },
    setId: (state, actions) => {
      state.id = actions.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const { toggle, closeChap, openChap, setUrl, setId } = chapDiag.actions;

export default chapDiag.reducer;
