import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IFileUploader } from "@/app/types/components/fileUploader/fileUploader";
import { UploadService } from "@/services/upload.service";
import { useToast } from "@/hooks/use-toast";
import ButtonComponent from "../core/Button/Button";

export default function FileUploader({
  url,
  urlType,
  onFileUpload
}: IFileUploader) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState<any>(null);
  const [allowedFileExt, setAllowedFileExt] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const {toast} = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
      setLoading(true);
        const res: any = await UploadService.uploadFile(formData);
        console.log(res);
        
        if(res && res.status == 200 && res?.data?.imageUrl) {
          onFileUpload(res.data.imageUrl)
          toast({
            title: "Success",
            description: "File Uploaded Successfully"
          })
        } else {
          toast({
            title: "Error",
            description: "Unable to upload file",
            variant: "destructive",
          })
        }
        setLoading(false);
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
    if(url) {
      setPreview(url)
    } else {
      setPreview(null)
    }
  }, [url])

  useEffect(() => {
    if (file) {
      handleUpload()
    }
  }, [file])


  useEffect(() => {
    if(urlType == 'image') {
      const imageExtension: any = process.env.NEXT_PUBLIC_IMAGE_EXTENSION;
      if(imageExtension) {
        setAllowedFileExt(imageExtension)
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } 
    if(urlType == 'video') {
      const videoExtension: any = process.env.NEXT_PUBLIC_VIDEO_EXTENSION;
      if(videoExtension) {
        setAllowedFileExt(videoExtension);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  }, [urlType])

  useEffect(() => {
    if(!url) {
      const fileInput: any = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      setPreview(null)
    }
  }, [url])

  return (
    <div className="p-4 border rounded-xl shadow-md w-full">
      <input type="file" accept={allowedFileExt} onChange={handleFileChange} className="mb-4" />      
      {preview && (
        <div className="mb-4 h-[150px] w-full">
          {
            urlType == 'image' ? <Image
            src={preview}
            alt="Preview"
            width={200}
            height={200}
            className="h-[100%] w-[100%] rounded-md"
          /> : <video src={preview} className="rounded-md h-full w-full" controls></video>
          }
          
        </div>
      )}
      {/* {
        file ? <ButtonComponent label="Upload File" type="button" loading={loading} onClick={handleUpload}></ButtonComponent> : null
      } */}
      
    </div>
  );
}
