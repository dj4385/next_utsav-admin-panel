export interface IContactHeading {
    contactHeadingData: IContactHeadingData;
    setContactHeadingData: any;
}

export interface IContactHeadingData {
    heading: string;
    sub_heading: string;
    alt_header_image: string;
    header_image: string;
}

export interface IFeedback {
    feedbackData: IFeedbackData;
    setFeedbackData: any;
}

export interface IFeedbackData {
    feedback_email: string;
    feedback_heading: string;
    feedback_phone: string;
    feedback_sub_heading: string;
    head_office: string;
}

export interface IGlobalPresence {
    globalPresenceData: IGlobalPresenceData;
    setGlobalPresenceData: any;
    globalPresenceList: IGlobalPresenceList[];
    setGlobalPresenceList: any;
}

export interface IGlobalPresenceData {
    global_presence_heading: string;
    global_presence_sub_heading: string;
}

export interface IGlobalPresenceList {
    country_name: string;
    country_address: string;
    country_image: string;
    alt_country_image: string;
    _id: string;
}

export interface IContactFooter {
    contactFooterData: IContactFooterData;
    setContactFotterData: any;
    contactFooterList: IContactFooterList[];
    setContactFooterList: any;
}

export interface IContactFooterData {
    footer_image: string;
    alt_footer_image: string;
}

export interface IContactFooterList {
    country_name: string;
    country_address: string;
    country_image: string;
    alt_country_image: string;
    email: string;
    phone: string;
    _id: string;
}

export interface IWork {
    workData: IWorkData;
    setWorkData: any;
}

export interface IWorkData {
    work_email: string;
    work_email_heading: string;
}

export interface IChannelPartner {
    channelPartnerData: IChannelPartnerData;
    setChannelPartnerData: any
}

export interface IChannelPartnerData {
    channel_partner_email: string;
    channel_partner_email_heading: string;    
}

export interface IContactVenue {
    contactVenueData: IContactVenueData;
    setContactVenueData: any
}

export interface IContactVenueData {
    venue_email: string;
    venue_email_heading: string;
}