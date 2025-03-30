import { IGalleryList } from "@/app/types/components/Home";
import { GalleryInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: GalleryInitialData = {
    isOpen: false,
    galleryListItem: null,
    galleryModalList: []

};

const GallerySlice = createSlice({
    name: "GallerySlice",
    initialState,
    reducers: {
        setGalleryModal: (state: GalleryInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setGalleryModalList: (state: GalleryInitialData = initialState, action: PayloadAction<IGalleryList[]>) => {
            state.galleryModalList = action.payload;
        },
        setGalleryListItem: (state: GalleryInitialData = initialState, action: PayloadAction<IGalleryList | null>) => {
            state.galleryListItem = action.payload
        },
    }
});

export const { setGalleryModal, setGalleryListItem, setGalleryModalList } = GallerySlice.actions;
export default GallerySlice.reducer;
