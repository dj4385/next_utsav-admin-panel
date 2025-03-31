export interface IFileUploader {
    url: string,
    urlType: string,
    onFileUpload: (url: string) => void
}

export interface IMultiFileUploader {
    url: string[],
    urlType: string,
    onFileUpload: (url: string[]) => void
}