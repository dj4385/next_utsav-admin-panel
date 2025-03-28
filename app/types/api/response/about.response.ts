export interface IAddAboutPageRequest {
    _id: string,
    id: number;
    banner: string,
    alt_banner: string,
    banner_heading: string,
    banner_text: string,
    real_weddings_image: string,
    alt_real_weddings_image: string,
    real_weddings_text: string,
    real_wedding_button: string,
    legacy_section: string,
    legacy_heading: string,
    experience: number,
    experience_label: string,
    experience_icon: string,
    alt_experience_icon: string,
    countries_served: number,
    countries_served_label: string,
    countries_served_icon: string,
    alt_countries_served_icon: string,
    events_count: number,
    events_count_label: string,
    events_count_icon: string,
    alt_events_count_icon: string,
    venues_count: number;
    venue_label: string,
    venues_count_icon: string,
    alt_venues_count_icon: string,
    about_gallery: IAboutGallery[]
    celebration_heading: string,
    celebration_text: string,
    celebration_image: string,
    alt_celebration_image: string,
    celebration_pitch: string,
    awards_section: string,
    about_awards: IAboutAwards[],
    team_section: string,
    managing_team: IManagingTeam[],
    pre_footer_image: string,
    pre_alt_footer_image: string,
    pre_footer_text: string,
    meta_title: string,
    meta_description: string,
    meta_image: string,
    __v: number,
}

export interface IAboutGallery {
    id: number;
    isWide: boolean;
    image: string;
    alt: string;
    about: number;
    _id: string;
}

export interface IAboutAwards {
    id: number;
    title: string;
    heading: string;
    name: string;
    about: number;
    _id: string;
}

export interface IManagingTeam {
    id: number,
    image: string,
    alt: string,
    name: string,
    designation: string,
    quotes: string,
    about: number,
    _id: string,
}
