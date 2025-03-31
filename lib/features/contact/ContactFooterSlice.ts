import { IContactFooterList } from "@/app/types/components/Contact";
import { ContactFooterInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ContactFooterInitialData = {
    isOpen: false,
    contactFooterModalList: [],
    contactFooterListItem: null
};

const ContactFooterSlice = createSlice({
    name: "ContactFooterSlice",
    initialState,
    reducers: {
        setContactFooterModal: (state: ContactFooterInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setContactFooterModalList: (state: ContactFooterInitialData = initialState, action: PayloadAction<IContactFooterList[]>) => {
            state.contactFooterModalList = action.payload;
        },
        setContactFooterListItem: (state: ContactFooterInitialData = initialState, action: PayloadAction<IContactFooterList | null>) => {
            state.contactFooterListItem = action.payload
        },
    }
});

export const { setContactFooterModal, setContactFooterModalList, setContactFooterListItem } = ContactFooterSlice.actions;
export default ContactFooterSlice.reducer;
