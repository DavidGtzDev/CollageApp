import React, { ChangeEvent, useState } from 'react';
import styles from './styles.module.css';

interface ImageUploaderProps {
  onImagesSelected?: (images: File[]) => void ;
  onSingleImageSelected?: (image: File) => void;
}


const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesSelected, onSingleImageSelected }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageSelection = (event: ChangeEvent<HTMLInputElement>) => {
    if(onImagesSelected){
        const files = Array.from(event.target.files ?? []);
        setSelectedImages(files);
        onImagesSelected(files);
    }else if(onSingleImageSelected && event.target.files?.length){
        const file = event.target.files?.[0];
        setSelectedImages([file]);
        onSingleImageSelected(file);
    }
    
  };

  return (
    <div className={styles.uploader}>
      <input type="file" multiple onChange={handleImageSelection} />
    </div>
  );
};

export default ImageUploader;
