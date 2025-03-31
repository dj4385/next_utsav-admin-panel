import { IThemes } from "@/app/types/api/request/venue.request";
import { VenueThemeInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: VenueThemeInitialData = {
    isOpen: false,
    themeListItem: null,
    themeModalList: []
};

const VenueThemeSlice = createSlice({
    name: "VenueThemeSlice",
    initialState,
    reducers: {
        setVenueThemeModal: (state: VenueThemeInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setVenueThemeModalList: (state: VenueThemeInitialData = initialState, action: PayloadAction<IThemes[]>) => {
            state.themeModalList = action.payload;
        },
        setVenueThemeListItem: (state: VenueThemeInitialData = initialState, action: PayloadAction<IThemes | null>) => {
            state.themeListItem = action.payload
        },
    }
});

export const { setVenueThemeModal, setVenueThemeModalList, setVenueThemeListItem } = VenueThemeSlice.actions;
export default VenueThemeSlice.reducer;
