import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IFileUploader } from "@/app/types/components/fileUploader/fileUploader";
import { UploadService } from "@/services/upload.service";

export default function FileUploader({
    imageUrl
}: IFileUploader) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState<any>(null);

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
    console.log(imageUrl);
    
    if(imageUrl) {
        setPreview(imageUrl)
    }
  }, [imageUrl])

  return (
    <div className="p-4 border rounded-xl shadow-md w-full">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      {console.log(imageUrl, preview)}
      {preview && (
        <div className="mb-4">
          <Image
            src={preview}
            alt="Preview"
            width={200}
            height={200}
            className="rounded-md"
          />
        </div>
      )}
      <Button onClick={handleUpload} disabled={!file}>
        Upload File
      </Button>
    </div>
  );
}
