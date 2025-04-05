import { ILoadingInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ILoadingInitialData = {
    isLoading: false
};

const LoadingSlice = createSlice({
    name: "LoadingSlice",
    initialState,
    reducers: {
        setLoading: (state: ILoadingInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
});

export const {
    setLoading
} = LoadingSlice.actions;

export default LoadingSlice.reducer;
