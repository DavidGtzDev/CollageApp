import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "../pretrained_model"


interface ImageUploaderProps {
    onImageLoad: (image: HTMLImageElement) => void;
}

export default function ai() {
  const [file, setFile] = useState<File | null>(null);
  const ModelDirection = "../pretrained_model";
  const model = tf.loadGraphModel(ModelDirection, {fromTFHub: false});

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };


  function imageToMatrix(image: HTMLImageElement): number[][] {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;
    const matrix: number[][] = [];

    if (ctx) {
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < imageData.data.length; i += 4) {
        const pixel = [
          imageData.data[i],
          imageData.data[i + 1],
          imageData.data[i + 2],
          imageData.data[i + 3],
        ];

        const grayscale = (pixel[0] + pixel[1] + pixel[2]) / 3;

        if (i % (imageData.width * 4) === 0) {
          matrix.push([grayscale]);
        } else {
          matrix[matrix.length - 1].push(grayscale);
        }
      }
    }

    return matrix;
  }

  function matrixToImage(
    matrix: number[][],
    canvas: HTMLCanvasElement
  ): HTMLImageElement {
    const ctx = canvas.getContext("2d");
    const image = new Image();

    canvas.width = matrix[0].length;
    canvas.height = matrix.length;

    if (ctx) {
      for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
          const value = matrix[row][col];
          ctx.fillStyle = `rgba(${value}, ${value}, ${value}, 255)`;
          ctx.fillRect(col, row, 1, 1);
        }
      }
    }

    image.src = canvas.toDataURL();

    return image;
  }

  return <div>
    ssssss
  </div>;
}
