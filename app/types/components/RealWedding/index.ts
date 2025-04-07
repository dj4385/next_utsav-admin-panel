import { IHeaderImages, IImages } from "@/app/types/api/request/venue.request";

export interface IRealWeddingImages {
    realWeddingImagesList: IImages[],
    setRealWeddingImages: any
}

export interface IRealWeddingHeaderImage {
    setHeaderImageList: any;
    headerImageList: IHeaderImages[];
}