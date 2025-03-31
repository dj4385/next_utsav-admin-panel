import { useEffect, useState } from "react";
import Image from "next/image";
import { IMultiFileUploader } from "@/app/types/components/fileUploader/fileUploader";
import { UploadService } from "@/services/upload.service";
import { useToast } from "@/hooks/use-toast";
import ButtonComponent from "../core/Button/Button";

export default function MultipleFileUploader({
    url,
    urlType,
    onFileUpload
}: IMultiFileUploader) {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<any[]>([]);
    const [allowedFileExt, setAllowedFileExt] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const { toast } = useToast();

    const handleFileChange = (event: any) => {
        const selectedFiles: any[] = Array.from(event.target.files || []);
        if (selectedFiles.length > 0) {
            setFiles(selectedFiles);
            setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
        }
    };

    const handleUpload = async () => {
        if (!files) return;

        try {
            const uploadedUrls: string[] = [];
            const formData = new FormData();
            setLoading(true);
            for (const file of files) {
                formData.append("image", file);
            }

            const res: any = await UploadService.uploadMultipleFiles(formData);
            if (res?.status === 200 && res?.data?.imageUrls) {
                uploadedUrls.push(res.data.imageUrls);
            } else {
                toast({
                    title: "Error",
                    description: `Failed to upload`,
                    variant: "destructive",
                });
            }

            if (uploadedUrls.length > 0) {
                onFileUpload(uploadedUrls);
                toast({
                    title: "Success",
                    description: "Files uploaded successfully",
                });
            }

            setLoading(false);
            setFiles([]);
            setPreviews([]);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Error",
                description: "Something went wrong. Unable to upload file",
                variant: "destructive",
            })
        }
    };

    useEffect(() => {
        if (url.length) {
            setPreviews(url)
        }
    }, [url])

    useEffect(() => {
        if (urlType == 'image') {
            const imageExtension: any = process.env.NEXT_PUBLIC_IMAGE_EXTENSION;
            if (imageExtension) {
                setAllowedFileExt(imageExtension)
            }
        }
        if (urlType == 'video') {
            const videoExtension: any = process.env.NEXT_PUBLIC_VIDEO_EXTENSION;
            if (videoExtension) {
                setAllowedFileExt(videoExtension)
            }
        }
    }, [urlType])

    return (
        <div className="p-4 border rounded-xl shadow-md w-full">
            <input type="file" accept={allowedFileExt} multiple onChange={handleFileChange} className="mb-4" />
            {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative h-[150px] w-full">
                            {urlType === "image" ? (
                                <Image
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    width={150}
                                    height={150}
                                    className="h-full w-full rounded-md object-cover"
                                />
                            ) : (
                                <video
                                    src={preview}
                                    className="h-full w-full rounded-md"
                                    controls
                                ></video>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {
                files?.length ? <ButtonComponent label="Upload File" type="button" loading={loading} onClick={handleUpload}></ButtonComponent> : null
            }

        </div>
    );
}
