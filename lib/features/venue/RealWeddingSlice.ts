// import { IRealWeddings } from "@/app/types/api/request/venue.request";
// import { RealWeddingInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    isOpen: false,
    realWeddingListItem: null,
    realWeddingModalList: []
};

const RealWeddingSlice = createSlice({
    name: "RealWeddingSlice",
    initialState,
    reducers: {
        setRealWeddingModal: (state: any = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setRealWeddingModalList: (state: any = initialState, action: PayloadAction<any[]>) => {
            state.realWeddingModalList = action.payload;
        },
        setRealWeddingListItem: (state: any = initialState, action: PayloadAction<any | null>) => {
            state.realWeddingListItem = action.payload
        },
    }
});

export const { setRealWeddingModal, setRealWeddingModalList, setRealWeddingListItem } = RealWeddingSlice.actions;
export default RealWeddingSlice.reducer;
