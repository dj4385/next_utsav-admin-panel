export interface IAddLandingPageRequest {
    _id: string,
    brand_name: string,
    brand_logo: string,
    alt_brand_logo: string,
    background_image: string,
    heading: string,
    sub_heading: string,
    heading_image: string,
    alt_heading_image: string,
    story_heading: string,
    story: string,
    vision_heading: string,
    vision: string,
    mission_heading: string,
    mission: string,
    testimonial_section: string,
    gallery_section: string,
    gallery_heading: string,
    meta_title: string,
    meta_description: string,
    meta_image: string,
    landing_video: ILandingVideo[],
    card_events: ICardEvent[],
    the_testimonial: ITestimonial[]
}

export interface ILandingVideo {
    video_landing: string,
    heading: string,
    sub_heading: string,
    image: string,
    alt: string,
    video: string,
    _id: string
}

export interface ICardEvent {
    event_card: string,
    event_ui_type: string,
    heading: string,
    text: string,
    image: string,
    alt: string,
    icon: string,
    alt_icon: string,
    _id: string
}

export interface ITestimonial {
    testimonial: string,
    client: string,
    text: string,
    image: string,
    _id: string   
}