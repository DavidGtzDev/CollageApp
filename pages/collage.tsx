import React, { useState } from "react";
import ImageCollage from "./components/ImageCollage";
import Navbar from "./components/Navbar";
import ImageUploader from "./components/ImageUploader";

export default function collage() {
  const [images, setImages] = useState<File[]>([]);
  const [background, setBackground] = useState<File>();

  const handleImagesSelected = (selectedImages: File[]) => {
    setImages(selectedImages);
  };

  const handleBackgroundSelected = (selectedBackground: File) => {
    setBackground(selectedBackground);
  };

  return (
    <div className="app">
      <Navbar />
      <h1>Image Collage</h1>
      <ImageCollage images={images} background={background} layout="masonry" />
      <p>Upload Images</p>
      <ImageUploader onImagesSelected={handleImagesSelected} />
      <p>Upload Background</p>
      <ImageUploader onSingleImageSelected={handleBackgroundSelected} />
    </div>
  );
}
