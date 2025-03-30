import { IAboutGalleryData } from "@/app/types/components/About";
import { AboutGalleryInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AboutGalleryInitialData = {
    isOpen: false,
    aboutGalleryListItem: null,
    aboutGalleryModalList: []
};

const AboutGallerySlice = createSlice({
    name: "AboutGallerySlice",
    initialState,
    reducers: {
        setAboutGalleryModal: (state: AboutGalleryInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setAboutGalleryModalList: (state: AboutGalleryInitialData = initialState, action: PayloadAction<IAboutGalleryData[]>) => {
            state.aboutGalleryModalList = action.payload;
        },
        setAboutGalleryListItem: (state: AboutGalleryInitialData = initialState, action: PayloadAction<IAboutGalleryData | null>) => {
            state.aboutGalleryListItem = action.payload
        },
    }
});

export const { setAboutGalleryModal, setAboutGalleryModalList, setAboutGalleryListItem } = AboutGallerySlice.actions;
export default AboutGallerySlice.reducer;
