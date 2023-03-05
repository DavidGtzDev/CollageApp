import React, { useState, useRef, useEffect } from "react";


interface Props {
    color: string;
    size: number;
    background?: File;
}

const BrushTool: React.FC<Props> = ({ color, size, background }) => {
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [innerHeight, setInnerHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let backgroundURL = "none";
  if (background) {
    backgroundURL = "url(" + URL.createObjectURL(background) + ")";
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);

    if (context) {
      context.strokeStyle = color;
      context.lineJoin = "round";
      context.lineWidth = size;
    }

  }, []);

  const startPaint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      const boundingRect = canvas.getBoundingClientRect();
      const x = event.clientX - boundingRect.left;
      const y = event.clientY - boundingRect.top;

      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x, y);
      context.stroke();

      setIsPainting(true);
      setMousePosition({ x, y });
    }
  };

  const continuePaint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context && isPainting) {
      const boundingRect = canvas.getBoundingClientRect();
      const x = event.clientX - boundingRect.left;
      const y = event.clientY - boundingRect.top;

      context.lineTo(x, y);
      context.stroke();
      setMousePosition({ x, y });
    }
  };

  const stopPaint = () => {
    setIsPainting(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={innerWidth}
      height={innerHeight}
      onMouseDown={startPaint}
      onMouseMove={continuePaint}
      onMouseUp={stopPaint}
      onMouseLeave={stopPaint}
      style={{backgroundImage:  backgroundURL, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundColor: "gray" }}
    />
  );
};

export default BrushTool;



