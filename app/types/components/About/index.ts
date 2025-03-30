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

export interface IVenue {
    venueData: IVenueData;
    setVenueData: any;
}

export interface IVenueData {
    venues_count: string;
    venue_label: string;
    venues_count_icon: string;
    alt_venues_count_icon: string;
}

export interface ICelebration {
    celebrationData: ICelebrationData;
    setCelebrationData: any
}

export interface ICelebrationData {
    celebration_heading: string,
    celebration_text: string,
    celebration_image: string,
    alt_celebration_image: string,
    celebration_pitch: string,
}

export interface IAward {
    awardData: IAwardData,
    setAwardData: any
}

export interface IAwardData {
    awards_section: string;
}

export interface ITeam {
    teamData: ITeamData,
    setTeamData: any
}

export interface ITeamData {
    team_section: string;
}

export interface IPrefooter {
    preFooterData: IPreFooterData;
    setPreFooterData: any
}

export interface IPreFooterData {
    pre_footer_image: string,
    pre_alt_footer_image: string,
    pre_footer_text: string,
}

export interface IAboutGallery {
    aboutGalleryData: IAboutGalleryData[],
    setAboutGalleryData: any
}

export interface IAboutGalleryData {
    id: number;
    isWide: boolean
    image: string;
    alt: string;
    about: number;
    _id: string;
}
