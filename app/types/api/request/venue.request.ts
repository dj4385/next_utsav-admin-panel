export interface IAddVenueRequest {
    venue: IVenue,
    theme_options: string[],
    themes: IThemes[],
    real_weddings: IRealWeddings[]
}

export interface IRealWeddings {
    couple: string,
    description: string,
    image: string
}

export interface IThemes {
    name: string,
    description: string,
    images: string[]
}

export interface IVenue {
    name: string,
    property_type: string,
    capacity: string,
    outdoor_catering_policy: string,
    air_quality_index: number,
    google_rating: number,
    location: ILocation,
    nearest_airport: INearestAirport,
    images: IImanges []
}

export interface ILocation {
    city: string,
    state: string,
    address: string
}

export interface INearestAirport {
    name: string,
    distance_km: number
}

export interface IImanges {
    type: string,
    url: string,
    urls: string[]
}