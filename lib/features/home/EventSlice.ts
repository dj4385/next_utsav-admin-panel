import { IEventData } from "@/app/types/components/Home";
import { EventInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: EventInitialData = {
    isOpen: false,
    eventListItem: null,
    eventModalList: []
};

const EventSlice = createSlice({
    name: "EventSlice",
    initialState,
    reducers: {
        setEventModal: (state: EventInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setEventModalList: (state: EventInitialData = initialState, action: PayloadAction<IEventData[]>) => {
            state.eventModalList = action.payload;
        },
        setEventListItem: (state: EventInitialData = initialState, action: PayloadAction<IEventData | null>) => {
            state.eventListItem = action.payload
        },
    }
});

export const { setEventModal, setEventModalList, setEventListItem } = EventSlice.actions;
export default EventSlice.reducer;
