export interface IAddVenueRequest {
    venue_name: string;
    location: string;
    experience: string;
    venue: IVenue,
    gallery: IImages[],
    theme_options: IThemes[],
    // real_weddings: IRealWeddings[]
}

// export interface IRealWeddings {
//     couple: string,
//     description: string,
//     image: string
//     _id?: string;
// }

export interface IThemes {
    name: string,
    tab_name: string,
    description: string,
    theme_img_gallery: IThemeImgGallery[];
    _id?: string
}

export interface IThemeImgGallery {
    alt: string,
    images: string,
    is_wide: boolean
}

export interface IVenue {
    property_type: string,
    capacity: string,
    nearest_airport: INearestAirport,
    outdoor_catering_policy: string,
    air_quality_index: number,
    google_rating: number,
    google_rating_review: number,
    description: string;
    // location: ILocation,
    map_link: string,
}

// export interface ILocation {
//     city: string,
//     state: string,
//     address: string
// }

export interface INearestAirport {
    name: string,
    distance_km: number
}

export interface IImages {
    type: string,
    name: string,
    alt: string,
    images: string,
    video: string,
    _id?: string,
    id?: string
}