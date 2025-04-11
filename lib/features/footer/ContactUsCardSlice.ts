import { IContactFooterList } from "@/app/types/components/Contact";
import { IContactUsData } from "@/app/types/components/Foooter";
import { ContactFooterInitialData, ContactUsInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ContactUsInitialData = {
    isOpen: false,
    contactUsModalList: [],
    contactUsListItem: null
};

const ContactUsCardSlice = createSlice({
    name: "ContactUsCardSlice",
    initialState,
    reducers: {
        setContactUsCardModal: (state: ContactUsInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setContactUsCardModalList: (state: ContactUsInitialData = initialState, action: PayloadAction<IContactUsData[]>) => {
            state.contactUsModalList = action.payload;
        },
        setContactUsCardListItem: (state: ContactUsInitialData = initialState, action: PayloadAction<IContactUsData | null>) => {
            state.contactUsListItem = action.payload
        },
    }
});

export const { setContactUsCardModal, setContactUsCardModalList, setContactUsCardListItem } = ContactUsCardSlice.actions;
export default ContactUsCardSlice.reducer;
