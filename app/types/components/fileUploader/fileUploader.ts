export interface IFileUploader {
    url: string,
    urlType: string,
    onFileUpload: (url: string) => void
}