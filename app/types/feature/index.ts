import { IAboutGalleryData, IAwardList, ITeamList } from "../components/About";
import { IEventData, IGalleryList, ITestimonialList } from "../components/Home";

export interface EventInitialData {
    isOpen: boolean,
    eventModalList: IEventData[]
    eventListItem: IEventData | null
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

export interface AwardInitialData {
    isOpen: boolean;
    awardModalList: IAwardList[];
    awardListItem: IAwardList | null;    
}
export interface TeamInitialData {
    isOpen: boolean;
    teamModalList: ITeamList[];
    teamListItem: ITeamList | null;
}
export interface AboutGalleryInitialData {
    isOpen: boolean;
    aboutGalleryModalList: IAboutGalleryData[];
    aboutGalleryListItem: IAboutGalleryData | null;

}