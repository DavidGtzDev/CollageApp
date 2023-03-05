import React from "react";

type ImageCollageProps = {
  images: File[];
  layout?: "grid" | "masonry";
  background?: File;
};

const ImageCollage: React.FC<ImageCollageProps> = ({
  images,
  layout = "default",
  background,
}) => {
  let backgroundURL = "none";
  if (background) {
    backgroundURL = "url(" + URL.createObjectURL(background) + ")";
  }

  const getClassName = (index: number) => {
    switch (layout) {
      case "grid":
        return "image-collage__item--grid";
      case "masonry":
        return index % 2 === 0
          ? "image-collage__item--masonry-tall"
          : "image-collage__item--masonry-short";
      default:
        return "image-collage__item--default";
    }
  };

  return (
    <div>
      <div
        className={`image-collage image-collage--${layout}`}
        style={{
          backgroundImage: backgroundURL,
          backgroundSize: "cover",
          zIndex: 1,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Image ${index + 1}`}
            className={`image-collage__item ${getClassName(index)}`}
          />
        ))}
      </div>
      <div style={{ zIndex: 2 }}>

      </div>
    </div>
  );
};

export default ImageCollage;
