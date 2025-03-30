import { IAwardList } from "@/app/types/components/About";
import { AwardInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AwardInitialData = {
    isOpen: false,
    awardListItem: null,
    awardModalList: []
};

const AwardSlice = createSlice({
    name: "AwardSlice",
    initialState,
    reducers: {
        setAwardModal: (state: AwardInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setAwardModalList: (state: AwardInitialData = initialState, action: PayloadAction<IAwardList[]>) => {
            state.awardModalList = action.payload;
        },
        setAwardListItem: (state: AwardInitialData = initialState, action: PayloadAction<IAwardList | null>) => {
            state.awardListItem = action.payload
        },
    }
});

export const { setAwardModal, setAwardModalList, setAwardListItem } = AwardSlice.actions;
export default AwardSlice.reducer;
