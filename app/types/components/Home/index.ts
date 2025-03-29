
export interface IBrand {
    brandData: IBrandData,
    setBrandData: any
}

export interface IBrandData {
    brandName: string;
    brandLogo: string;
    brandAlt: string;
}

export interface IHero {
    heroData: IHeroData;
    setHeroData: any
}

export interface IHeroData {
    heading: string;
    subHeading: string;
    headingImgAlt: string;
    storyHeading: string;
    story: string;
    headingImg: string;
    backgroundImg: string;
}

export interface IVision {
    visionData: IVisionData;
    setVisionData: any
}

export interface IVisionData {
    visionHeading: string;
    vision: string;
}

export interface IMission {
    missionData: IMissionData;
    setMissionData: any
}

export interface IMissionData {
    missionHeading: string;
    mission: string;
}

export interface ITestimonial {
    testimonialData: ITestimonialData;
    setTestimonialData: any,
    testimonialList: ITestimonialList[],
    setTestimonialList: any
}

export interface ITestimonialList {
    testimonial: string;
    client: string;
    text: string;
    image: string;
    alt: string;
    _id: string;
}

export interface ITestimonialData {
    testimonial: string;
}

export interface IGallery {
    galleryData: IGalleryData;
    setGalleryData: any;
    galleryList: IGalleryList[],
    setGalleryList: any
}

export interface IGalleryList {
    gallery: string;
    image: string;
    alt: string;
    _id: string;
}

export interface IGalleryData {
    gallerySection: string;
    galleryHeading: string;
}

export interface IMeta {
    metaData: IMetaData;
    setMetaData: any
}

export interface IMetaData {
    metaTitle: string;
    metaDescription: string;
    metaImageUrl: string;
}

export interface ILandingVideoPage {
    landingVideoPageData: ILandingVideoPageData;
    setLandingVideoPageData: any;
}

export interface ILandingVideoPageData {
    heading: string;
    subHeading: string;
    image: string;
    alt: string;
    video: string;
    videoHeading: string;
    _id: string;
}

export interface IEvent {
    eventData: IEventData[];
    setEventData: any;
}

export interface IEventData {
    event_card: string;
    event_ui_type: string;
    heading: string;
    text: string;
    image: string;
    alt: string;
    icon: string;
    alt_icon: string;
    _id: string;
}
