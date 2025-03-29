import { GalleryInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: GalleryInitialData = {
    isOpen: false
};

const GallerySlice = createSlice({
    name: "GallerySlice",
    initialState,
    reducers: {
        setGalleryModal: (state: GalleryInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
});

export const { setGalleryModal } = GallerySlice.actions;
export default GallerySlice.reducer;
