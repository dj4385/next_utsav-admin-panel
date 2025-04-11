import { IEventInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IEventInitialData = {
    isAddExperienceSuccess: false,
    isAddLocationSuccess: false,
    isAddCapacitySuccess: false,
    isAddCateringSuccess: false,
    isAddGoogleRatingSuccess: false,
    isAddAQIRequestSuccess: false,
    isAddVenueSuccess: false,
    isAddStateSuccess: false,
    isAddDesignSuccess: false,
    isAddPhotographerSuccess: false
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
        },
        setAddCapacitySuccess: (state: IEventInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isAddCapacitySuccess = action.payload;
        },
        setAddCateringSuccess: (state: IEventInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isAddCateringSuccess = action.payload;
        },
        setAddGoogleRatingSuccess: (state: IEventInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isAddGoogleRatingSuccess = action.payload;
        },
        setAddAQIRequestSuccess: (state: IEventInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isAddAQIRequestSuccess = action.payload;
        },
        setAddVenueSuccess: (state: IEventInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isAddVenueSuccess = action.payload;
        },
        setAddStateSuccess: (state: IEventInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isAddStateSuccess = action.payload;
        },
        setAddDesignSuccess: (state: IEventInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isAddDesignSuccess = action.payload;
        },
        setAddPhotographerSuccess: (state: IEventInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isAddPhotographerSuccess = action.payload;
        }
    }
});

export const {
    setAddExperinceSuccess, setAddLocationSuccess, setAddCapacitySuccess,
    setAddCateringSuccess, setAddGoogleRatingSuccess, setAddAQIRequestSuccess,
    setAddVenueSuccess, setAddStateSuccess, setAddDesignSuccess, setAddPhotographerSuccess
} = EventsSlice.actions;

export default EventsSlice.reducer;
