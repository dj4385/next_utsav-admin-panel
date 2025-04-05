import { IHeaderImages } from "@/app/types/api/request/venue.request";
import { VenueHeaderImageInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: VenueHeaderImageInitialData = {
    isOpen: false,
    venueHeaderImageListItem: null,
    venueHeaderImageModalList: []
};

const VenueHeaderImageSlice = createSlice({
    name: "VenueHeaderImageSlice",
    initialState,
    reducers: {
        setVenueHeaderImageModal: (state: VenueHeaderImageInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setVenueHeaderImageModalList: (state: VenueHeaderImageInitialData = initialState, action: PayloadAction<IHeaderImages[]>) => {
            state.venueHeaderImageModalList = action.payload;
        },
        setVenueHeaderImageListItem: (state: VenueHeaderImageInitialData = initialState, action: PayloadAction<IHeaderImages | null>) => {
            state.venueHeaderImageListItem = action.payload
        },
    }
});

export const { setVenueHeaderImageModal, setVenueHeaderImageModalList, setVenueHeaderImageListItem } = VenueHeaderImageSlice.actions;
export default VenueHeaderImageSlice.reducer;
