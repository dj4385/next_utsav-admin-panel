export interface IBanner {
    bannerData: IBannerData;
    setBannerData: any;
}

export interface IBannerData {
    banner: string;
    alt_banner: string;
    banner_heading: string;
    banner_text: string;
}

export interface IRealWedding {
    readWeddingData: IRealWeddingData;
    setRealWeddingData: any;
}

export interface IRealWeddingData {
    real_weddings_image: string;
    alt_real_weddings_image: string;
    real_weddings_text: string;
    real_wedding_button: string;
}

export interface ILegacy {
    legacyData: ILegacyData;
    setLegacyData: any;
}

export interface ILegacyData {
    legacy_section: string;
    legacy_heading: string;
}

export interface IExperience {
    experienceData: IExperienceData;
    setExperienceData: any;
}

export interface IExperienceData {
    experience: string,
    experience_label: string,
    experience_icon: string,
    alt_experience_icon: string,
}

export interface ICountries {
    countriesData: ICountriesData;
    setCountriesData: any;
}

export interface ICountriesData {
    countries_served: string;
    countries_served_label: string;
    countries_served_icon: string;
    alt_countries_served_icon: string;
}

export interface IEventSection {
    eventData: IEventSectionData;
    setEventData: any;
}

export interface IEventSectionData {
    events_count: string,
    events_count_label: string,
    events_count_icon: string,
    alt_events_count_icon: string,
}
