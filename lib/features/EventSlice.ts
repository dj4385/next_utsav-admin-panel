import { EventInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: EventInitialData = {
    isOpen: false
};

const EventSlice = createSlice({
    name: "EventSlice",
    initialState,
    reducers: {
        setEventModal: (state: EventInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
});

export const { setEventModal } = EventSlice.actions;
export default EventSlice.reducer;
