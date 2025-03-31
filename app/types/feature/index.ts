import { IImages, IRealWeddings, IThemes } from "../api/request/venue.request";
import { IAboutGalleryData, IAwardList, IRealWeddingData, ITeamList } from "../components/About";
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

export interface RealWeddingInitialData {
    isOpen: boolean;
    realWeddingModalList: IRealWeddings[];
    realWeddingListItem: IRealWeddings | null;
}

export interface VenueThemeInitialData {
    isOpen: boolean;
    themeModalList: IThemes[];
    themeListItem: IThemes | null;
}

export interface VenueImageInitialData {
    isOpen: boolean;
    venueImageModalList: IImages[];
    venueImageListItem: IImages | null;
}