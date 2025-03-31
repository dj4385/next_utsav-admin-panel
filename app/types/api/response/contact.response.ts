export interface IContactResponse {
    _id: string;
    heading: string;
    sub_heading: string;
    header_image: string;
    alt_header_image: string;
    feedback_heading: string;
    feedback_sub_heading: string;
    feedback_phone: string;
    feedback_email: string;
    head_office: string;
    global_presence_heading: string;
    global_presence_sub_heading: string;
    footer_image: string;
    alt_footer_image: string;
    work_email_heading: string;
    work_email: string;
    channel_partner_email_heading: string;
    channel_partner_email: string;
    venue_email_heading: string;
    venue_email: string;
    meta_title: string;
    meta_description: string;
    meta_image: string | null;
    global_presence: IGlobalPresence[] ,
    footer_contact: IFooterContact[],
    social_media: ISocialMedia,
    __v: number,
}

export interface IGlobalPresence {
    country_name: string;
    country_address: string;
    country_image: string;
    alt_country_image: string;
    _id: string;
}

export interface IFooterContact {
    country_name: string;
    country_address: string;
    country_image: string;
    alt_country_image: string;
    email: string;
    phone: string;
    _id: string;
}

export interface ISocialMedia {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    _id: string;
}