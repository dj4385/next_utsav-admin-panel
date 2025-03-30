import { ITestimonialList } from "../components/Home";

export interface EventInitialData {
    isOpen: boolean
}

export interface TestimonialInitialData {
    isOpen: boolean,
    testimonialModalList: ITestimonialList[]
}

export interface GalleryInitialData {
    isOpen: boolean;
}
