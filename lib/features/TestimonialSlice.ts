import { TestimonialInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TestimonialInitialData = {
    isOpen: false
};

const TestimonialSlice = createSlice({
    name: "TestimonialSlice",
    initialState,
    reducers: {
        setTestimonialModal: (state: TestimonialInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
});

export const { setTestimonialModal } = TestimonialSlice.actions;
export default TestimonialSlice.reducer;
