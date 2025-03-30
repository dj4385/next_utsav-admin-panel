
export interface IBrand {
    brandData: IBrandData,
    setBrandData: any
}

export interface IBrandData {
    brand_name: string;
    brand_logo: string;
    alt_brand_logo: string;
}

export interface IHero {
    heroData: IHeroData;
    setHeroData: any
}

export interface IHeroData {
    heading: string;
    sub_heading: string;
    alt_heading_image: string;
    story_heading: string;
    story: string;
    heading_image: string;
    background_image: string;
}

export interface IVision {
    visionData: IVisionData;
    setVisionData: any
}

export interface IVisionData {
    vision_heading: string;
    vision: string;
}

export interface IMission {
    missionData: IMissionData;
    setMissionData: any
}

export interface IMissionData {
    mission_heading: string;
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
    testimonial_section: string;
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
    gallery_section: string;
    gallery_heading: string;
}

export interface IMeta {
    metaData: IMetaData;
    setMetaData: any
}

export interface IMetaData {
    meta_title: string;
    meta_description: string;
    meta_image: string;
}

export interface ILandingVideoPage {
    landingVideoPageData: ILandingVideoPageData;
    setLandingVideoPageData: any;
}

export interface ILandingVideoPageData {
    heading: string;
    sub_heading: string;
    image: string;
    alt: string;
    video: string;
    video_landing: string;
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

export interface IContact {
    contactData: IContactData;
    setContactData: any;
}

export interface IContactData {
    heading: string;
    sub_heading: string;
    email: string;
    phone: string;
    button: string;
    _id: string;
}
