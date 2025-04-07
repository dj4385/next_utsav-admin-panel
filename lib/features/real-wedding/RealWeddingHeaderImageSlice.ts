import { IHeaderImages } from "@/app/types/api/request/venue.request";
import { RealWeddingHeaderImageInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RealWeddingHeaderImageInitialData = {
    isOpen: false,
    realWeddingHeaderImageListItem: null,
    realWeddingHeaderImageModalList: []
};

const RealWeddingHeaderImageSlice = createSlice({
    name: "RealWeddingHeaderImageSlice",
    initialState,
    reducers: {
        setRealWeddingHeaderImageModal: (state: RealWeddingHeaderImageInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setRealWeddingHeaderImageModalList: (state: RealWeddingHeaderImageInitialData = initialState, action: PayloadAction<IHeaderImages[]>) => {
            state.realWeddingHeaderImageModalList = action.payload;
        },
        setRealWeddingHeaderImageListItem: (state: RealWeddingHeaderImageInitialData = initialState, action: PayloadAction<IHeaderImages | null>) => {
            state.realWeddingHeaderImageListItem = action.payload
        },
    }
});

export const { setRealWeddingHeaderImageModal, setRealWeddingHeaderImageModalList, setRealWeddingHeaderImageListItem } = RealWeddingHeaderImageSlice.actions;
export default RealWeddingHeaderImageSlice.reducer;
