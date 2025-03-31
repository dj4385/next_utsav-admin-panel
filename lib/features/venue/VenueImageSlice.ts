import { IImages } from "@/app/types/api/request/venue.request";
import { VenueImageInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: VenueImageInitialData = {
    isOpen: false,
    venueImageListItem: null,
    venueImageModalList: []
};

const VenueImageSlice = createSlice({
    name: "VenueImageSlice",
    initialState,
    reducers: {
        setVenueImageModal: (state: VenueImageInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setVenueImageModalList: (state: VenueImageInitialData = initialState, action: PayloadAction<IImages[]>) => {
            state.venueImageModalList = action.payload;
        },
        setVenueImageListItem: (state: VenueImageInitialData = initialState, action: PayloadAction<IImages | null>) => {
            state.venueImageListItem = action.payload
        },
    }
});

export const { setVenueImageModal, setVenueImageModalList, setVenueImageListItem } = VenueImageSlice.actions;
export default VenueImageSlice.reducer;
