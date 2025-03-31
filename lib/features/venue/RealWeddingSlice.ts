import { IRealWeddings } from "@/app/types/api/request/venue.request";
import { RealWeddingInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RealWeddingInitialData = {
    isOpen: false,
    realWeddingListItem: null,
    realWeddingModalList: []
};

const RealWeddingSlice = createSlice({
    name: "RealWeddingSlice",
    initialState,
    reducers: {
        setRealWeddingModal: (state: RealWeddingInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setRealWeddingModalList: (state: RealWeddingInitialData = initialState, action: PayloadAction<IRealWeddings[]>) => {
            state.realWeddingModalList = action.payload;
        },
        setRealWeddingListItem: (state: RealWeddingInitialData = initialState, action: PayloadAction<IRealWeddings | null>) => {
            state.realWeddingListItem = action.payload
        },
    }
});

export const { setRealWeddingModal, setRealWeddingModalList, setRealWeddingListItem } = RealWeddingSlice.actions;
export default RealWeddingSlice.reducer;
