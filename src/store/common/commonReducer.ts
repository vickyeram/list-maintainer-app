import { createSlice } from "@reduxjs/toolkit";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "../../utils/helper";

interface InitialState {
  checklist: any;
  notes: any;
  reminders: any;
  currentContent: string;
}

export const commonReducer = createSlice({
  name: "common",
  initialState: {
    checklist: getItemFromLocalStorage("checklist")
      ? getItemFromLocalStorage("checklist").data
      : [],
    notes: getItemFromLocalStorage("notes")
      ? getItemFromLocalStorage("notes").data
      : [],
    reminders: getItemFromLocalStorage("reminders")
      ? getItemFromLocalStorage("reminders").data
      : [],
    currentContent: "",
  } as InitialState,
  reducers: {
    addCheckList: (state, action) => {
      const dataToStore = { data: [...state.checklist, action.payload] };
      setItemInLocalStorage("checklist", dataToStore);
      state.checklist = [...state.checklist, action.payload];
    },
    editCheckList: (state, action) => {
      const dataToStore = { data: action.payload };
      setItemInLocalStorage("checklist", dataToStore);
      state.checklist = action.payload;
    },
    addNotes: (state, action) => {
      const dataToStore = { data: [...state.notes, action.payload] };
      setItemInLocalStorage("notes", dataToStore);
      state.notes = [...state.notes, action.payload];
    },
    setReminders: (state, action) => {
      const dataToStore = { data: [...state.reminders, action.payload] };
      setItemInLocalStorage("reminders", dataToStore);
      state.reminders = [...state.reminders, action.payload];
    },
    setCurrentContent: (state, action) => {
      state.currentContent = action.payload;
    },
  },
});

export const {
  addCheckList,
  editCheckList,
  addNotes,
  setReminders,
  setCurrentContent,
} = commonReducer.actions;

export default commonReducer.reducer;
