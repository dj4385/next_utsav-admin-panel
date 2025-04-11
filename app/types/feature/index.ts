import { IHeaderImages, IImages, IThemes } from "../api/request/venue.request";
import { IAboutGalleryData, IAwardList, IRealWeddingData, ITeamList } from "../components/About";
import { IContactFooterList, IGlobalPresenceList } from "../components/Contact";
import { IEventData, IGalleryList, ITestimonialList } from "../components/Home";
import { IContactUsData, IPopularLinksData } from "../components/Foooter";
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

// export interface RealWeddingInitialData {
//     isOpen: boolean;
//     realWeddingModalList: IRealWeddings[];
//     realWeddingListItem: IRealWeddings | null;
// }

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

export interface VenueHeaderImageInitialData {
    isOpen: boolean;
    venueHeaderImageModalList: IHeaderImages[];
    venueHeaderImageListItem: IHeaderImages | null;
}

export interface GlobalPresenceInitialData {
    isOpen: boolean;
    globalPresenceModalList: IGlobalPresenceList[];
    globalPresenceListItem: IGlobalPresenceList | null;
}

export interface ContactFooterInitialData {
    isOpen: boolean;
    contactFooterModalList: IContactFooterList[];
    contactFooterListItem: IContactFooterList | null;
}

export interface IEventInitialData {
    isAddLocationSuccess: boolean;
    isAddExperienceSuccess: boolean;
    isAddCapacitySuccess: boolean;
    isAddCateringSuccess: boolean;
    isAddGoogleRatingSuccess: boolean;
    isAddAQIRequestSuccess: boolean;
    isAddVenueSuccess: boolean;
    isAddStateSuccess: boolean;
    isAddDesignSuccess: boolean;
    isAddPhotographerSuccess: boolean;
}

export interface ILoadingInitialData {
    isLoading: boolean;
}

export interface RealWeddingImageInitialData {
    isOpen: boolean;
    realWeddingImageModalList: IImages[];
    realWeddingImageListItem: IImages | null;
}

export interface RealWeddingHeaderImageInitialData {
    isOpen: boolean;
    realWeddingHeaderImageModalList: IHeaderImages[];
    realWeddingHeaderImageListItem: IHeaderImages | null;
}

export interface ContactUsInitialData {
    isOpen: boolean;
    contactUsModalList: IContactUsData[];
    contactUsListItem: IContactUsData | null;
}

export interface PopularLinksInitialData {
    isOpen: boolean;
    popularLinksModalList: IPopularLinksData[];
    popularLinksListItem: IPopularLinksData | null;
}


