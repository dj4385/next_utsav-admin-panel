import { IGlobalPresenceList } from "@/app/types/components/Contact";
import { GlobalPresenceInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: GlobalPresenceInitialData = {
    isOpen: false,
    globalPresenceModalList: [],
    globalPresenceListItem: null
};

const GlobalPresenceSlice = createSlice({
    name: "GlobalPresenceSlice",
    initialState,
    reducers: {
        setGlobalPresenceModal: (state: GlobalPresenceInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setGlobalPresenceModalList: (state: GlobalPresenceInitialData = initialState, action: PayloadAction<IGlobalPresenceList[]>) => {
            state.globalPresenceModalList = action.payload;
        },
        setGlobalPresenceListItem: (state: GlobalPresenceInitialData = initialState, action: PayloadAction<IGlobalPresenceList | null>) => {
            state.globalPresenceListItem = action.payload
        },
    }
});

export const { setGlobalPresenceModal, setGlobalPresenceModalList, setGlobalPresenceListItem } = GlobalPresenceSlice.actions;
export default GlobalPresenceSlice.reducer;
