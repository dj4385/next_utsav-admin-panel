import { IHeaderImages, IImages, IThemes } from "../../api/request/venue.request";

export interface IRealWeddingsProps {
    // realWeddings: IRealWeddings[];
    setRealWeddings: any;
}

export interface IThemeForm {
    themeFormList: IThemes[],
    setThemeFormList: any
}

export interface IVenueImages {
    venueImagesList: IImages[],
    setVenueImages: any
}

export interface IHeaderImage {
    setHeaderImageList: any;
    headerImageList: IHeaderImages[];
}
