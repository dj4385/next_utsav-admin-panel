import { ITestimonialList } from "@/app/types/components/Home";
import { TestimonialInitialData } from "@/app/types/feature";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TestimonialInitialData = {
    isOpen: false,
    testimonialModalList: [],
    testimonialListItem: null
};

const TestimonialSlice = createSlice({
    name: "TestimonialSlice",
    initialState,
    reducers: {
        setTestimonialModal: (state: TestimonialInitialData = initialState, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setTestimonialModalData: (state: TestimonialInitialData = initialState, action: PayloadAction<ITestimonialList[]>) => {
            state.testimonialModalList = action.payload
        },
        setTestimonialListItem: (state: TestimonialInitialData = initialState, action: PayloadAction<ITestimonialList | null>) => {
            state.testimonialListItem = action.payload
        },

    }
});

export const { setTestimonialModal, setTestimonialModalData, setTestimonialListItem } = TestimonialSlice.actions;
export default TestimonialSlice.reducer;
