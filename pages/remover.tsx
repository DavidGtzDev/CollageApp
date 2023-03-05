import React, {useState} from "react";
import BrushTool from "./components/BrushTool";
import ImageUploader from "./components/ImageUploader";
import Navbar from "./components/Navbar";

export default function remover() {
  const [image, setImage] = useState<File>();

  const handleImageSelected = (selectedImage: File) => {
    setImage(selectedImage);
  };

  return (
    <div className="app">
      <Navbar></Navbar>
      <h1>Image Remover</h1>
      <BrushTool color="black" size={10} background={image}></BrushTool>
      <ImageUploader onSingleImageSelected={handleImageSelected}></ImageUploader>
    </div>
  );
}
