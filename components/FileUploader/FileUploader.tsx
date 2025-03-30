import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IFileUploader } from "@/app/types/components/fileUploader/fileUploader";
import { UploadService } from "@/services/upload.service";

export default function FileUploader({
  url,
  urlType
}: IFileUploader) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState<any>(null);
  const [allowedFileExt, setAllowedFileExt] = useState<string>('')

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append("image", file);

    try {
        const res: any = await UploadService.uploadFile(formData);
        console.log(res);
        
        if(res && res.status == 200) {

        }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {    
    if(url) {
      setPreview(url)
    }
  }, [url])

  useEffect(() => {
    if(urlType == 'image') {
      const imageExtension: any = process.env.NEXT_PUBLIC_IMAGE_EXTENSION;
      if(imageExtension) {
        setAllowedFileExt(imageExtension)
      }
    } 
    if(urlType == 'video') {
      const videoExtension: any = process.env.NEXT_PUBLIC_IMAGE_EXTENSION;
      if(videoExtension) {
        setAllowedFileExt(videoExtension)
      }
    }
  }, [urlType])

  return (
    <div className="p-4 border rounded-xl shadow-md w-full">
      <input type="file" accept={allowedFileExt} onChange={handleFileChange} className="mb-4" />      
      {preview && (
        <div className="mb-4 h-15 w-15">
          {
            urlType == 'image' ? <Image
            src={preview}
            alt="Preview"
            width={200}
            height={200}
            className="rounded-md"
          /> : <video src={preview} className="rounded-md" controls></video>
          }
          
        </div>
      )}
      <Button onClick={handleUpload} disabled={!file}>
        Upload File
      </Button>
    </div>
  );
}
