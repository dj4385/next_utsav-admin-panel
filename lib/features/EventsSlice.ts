import { IEventInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IEventInitialData = {
    isAddExperienceSuccess: false,
    isAddLocationSuccess: false
};

const EventsSlice = createSlice({
    name: "EventsSlice",
    initialState,
    reducers: {
        setAddExperinceSuccess: (state: IEventInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isAddExperienceSuccess = action.payload;
        },
        setAddLocationSuccess: (state: IEventInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isAddLocationSuccess = action.payload;
        }
    }
});

export const { setAddExperinceSuccess, setAddLocationSuccess } = EventsSlice.actions;
export default EventsSlice.reducer;
