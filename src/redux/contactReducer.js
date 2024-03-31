import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
  name: "contactBook",
  initialState: {
    contacts: [],
  },
  reducers: {
    addToContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteFromContact: (state, action) => {
      const filteredArr = state.contacts.filter((c) => c.id !== action.payload);
      state.contacts = filteredArr;
    },
    updateContact: (state, action) => {
      const { id, ...updatedContact } = action.payload;
      state.contacts = state.contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      );
    },
  },
});

export const { addToContact, deleteFromContact, updateContact } = contactSlice.actions;
