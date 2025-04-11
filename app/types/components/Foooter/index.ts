export interface ISocialLinks {
    socialLinks: ISocialLinksData;
    setSocialLinks: any;
}

export interface ISocialLinksData {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    logo: string;
}

export interface IContactUsCard {
    contactUs: IContactUsData[];
    setContactUs: any;
}

export interface IContactUsData {
    country: string;
    flagIcon: string;
    isExpanded: boolean;
    contactDetails: string;
    email: string;
    address: string;
    _id?: string;
    id?: string;
}

export interface IPopularLinks {
    popularLinks: IPopularLinksData[];
    setPopularLinks: any;
}

export interface IPopularLinksData {
    label: string;
    url: string;
    _id?: string;
    id?: string;
}   



