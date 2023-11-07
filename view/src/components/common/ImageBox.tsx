import { createCanvasImage } from '@/util/tool';
import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

type ImageBoxProps = {
  placeholder?: boolean;
  hideSize?: boolean;
  src?: string;
  alt?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
};

function ImageBox({
  placeholder = false,
  hideSize = false,
  src,
  alt,
  title,
  width,
  height,
}: ImageBoxProps) {
  const [replaceImage, setReplaceImage] = useState<string>('null');
  const sizeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    handleResize();
    if (sizeRef.current) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(sizeRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [src, title, alt, width, height, hideSize]);

  function handleResize() {
    if (sizeRef.current) {
      const dataURL = createCanvasImage(
        sizeRef.current.width,
        sizeRef.current.height,
        hideSize,
      );
      setReplaceImage(dataURL);
    }
  }

  return (
    <Box
      ref={sizeRef}
      component="img"
      src={placeholder ? replaceImage : src}
      alt={alt}
      title={title}
      width={width}
      height={height}
      loading="lazy"
    />
  );
}

export default ImageBox;
