import { IContactUsData, IPopularLinksData } from "@/app/types/components/Foooter";
import { ContactUsInitialData, PopularLinksInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: PopularLinksInitialData = {
    isOpen: false,
    popularLinksModalList: [],
    popularLinksListItem: null
};

const PopularLinksSlice = createSlice({
    name: "PopularLinksSlice",
    initialState,
    reducers: {
        setPopularLinksModal: (state: PopularLinksInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setPopularLinksModalList: (state: PopularLinksInitialData = initialState, action: PayloadAction<IPopularLinksData[]>) => {
            state.popularLinksModalList = action.payload;
        },
        setPopularLinksListItem: (state: PopularLinksInitialData = initialState, action: PayloadAction<IPopularLinksData | null>) => {
            state.popularLinksListItem = action.payload
        },
    }
});

export const { setPopularLinksModal, setPopularLinksModalList, setPopularLinksListItem } = PopularLinksSlice.actions;
export default PopularLinksSlice.reducer;
