import {createSlice} from "@reduxjs/toolkit";

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {},
  reducers: {
    setLayer: (state, action) => {
      const { dropdownId, layer } = action.payload;
      initializeDropdownState(state, dropdownId);
      state[dropdownId].layer = layer;
    },
    claimData: (state, action) => {
      const { dropdownId, body } = action.payload;
      initializeDropdownState(state, dropdownId);
      state[dropdownId].bodyState = body;
    },
    setCurrentItem: (state, action) => {
      const { dropdownId, currentItem } = action.payload;
      initializeDropdownState(state, dropdownId);
      state[dropdownId].currentItem = currentItem;
    },
    setAnimation: (state, action) => {
      const { dropdownId, animation } = action.payload;
      initializeDropdownState(state, dropdownId);
      state[dropdownId].animation = animation;
    },
    setSelectedItems: (state, action) => {
      const { dropdownId, selectedItems } = action.payload;
      initializeDropdownState(state, dropdownId);
      state[dropdownId].selectedItems = selectedItems;
    },
  },
});

const initializeDropdownState = (state, dropdownId) => {
  if (!state[dropdownId]) {
    state[dropdownId] = {
      layer: false,
      currentItem: -1,
      bodyState: [],
      animation: false,
      selectedItems: [], // Initialize selectedItems array
    };
  }
};

export const dropdownActions = { ...dropdownSlice.actions };
const dropdownReducer = dropdownSlice.reducer;
export default dropdownReducer;