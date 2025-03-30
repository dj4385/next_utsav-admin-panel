import { IGalleryList, ITestimonialList } from "../components/Home";

export interface EventInitialData {
    isOpen: boolean
}

export interface TestimonialInitialData {
    isOpen: boolean,
    testimonialModalList: ITestimonialList[]
    testimonialListItem: ITestimonialList | null
}

export interface GalleryInitialData {
    isOpen: boolean;
    galleryModalList: IGalleryList[]
    galleryListItem: IGalleryList | null
}
