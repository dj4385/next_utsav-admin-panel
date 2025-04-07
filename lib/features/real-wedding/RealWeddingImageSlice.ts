import { IImages } from "@/app/types/api/request/venue.request";
import { RealWeddingImageInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RealWeddingImageInitialData = {
    isOpen: false,
    realWeddingImageListItem: null,
    realWeddingImageModalList: []
};

const RealWeddingImageSlice = createSlice({
    name: "RealWeddingImageSlice",
    initialState,
    reducers: {
        setRealWeddingImageModal: (state: RealWeddingImageInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setRealWeddingImageModalList: (state: RealWeddingImageInitialData = initialState, action: PayloadAction<IImages[]>) => {
            state.realWeddingImageModalList = action.payload;
        },
        setRealWeddingImageListItem: (state: RealWeddingImageInitialData = initialState, action: PayloadAction<IImages | null>) => {
            state.realWeddingImageListItem = action.payload
        },
    }
});

export const { setRealWeddingImageModal, setRealWeddingImageModalList, setRealWeddingImageListItem } = RealWeddingImageSlice.actions;
export default RealWeddingImageSlice.reducer;
