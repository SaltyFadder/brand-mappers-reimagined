import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ImageUploadProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
  folder?: string;
  className?: string;
}

export const ImageUpload = ({
  currentImage,
  onImageUploaded,
  folder = "general",
  className = "",
}: ImageUploadProps) => {
  const { uploadImage, uploading } = useImageUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file, folder);
    if (url) {
      onImageUploaded(url);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        onClick={() => inputRef.current?.click()}
        className="w-full h-full min-h-[80px] bg-muted rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors border-2 border-dashed border-border hover:border-primary/50 overflow-hidden"
      >
        {uploading ? (
          <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
        ) : currentImage ? (
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <ImageIcon className="w-6 h-6 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Click to upload</span>
          </>
        )}
      </div>
    </div>
  );
};
