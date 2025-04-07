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
        <div className="relative mb-4 h-[150px] w-full">
          {
            urlType == 'image' ? <Image
            src={preview}
            alt="Preview"
            width={200}
            height={200}
            className="h-[100%] w-[100%] rounded-md"
          /> : <video src={preview} className="rounded-md h-full w-full" controls></video>
          }
          <button 
            onClick={() => {
              setPreview(null)
              const fileInput: any = document.querySelector('input[type="file"]');
              if (fileInput) fileInput.value = '';
            }}
            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      {/* {
        file ? <ButtonComponent label="Upload File" type="button" loading={loading} onClick={handleUpload}></ButtonComponent> : null
      } */}
      
    </div>
  );
}
