import React from 'react';
import { ResponsiveImageProps } from './type';

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  noLazy = false,
}) => {
  const baseName = src.split('.').slice(0, -1).join('.');
  const webpSrc = `${baseName}.webp`;
  const avifSrc = `${baseName}.avif`;

  return (
    <div className={`responsive-image-wrapper ${className ?? ''}`}>
      <picture>
        <source type="image/avif" srcSet={avifSrc} />
        <source type="image/webp" srcSet={webpSrc} />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={noLazy ? 'eager' : 'lazy'}
          decoding="async"
        />
      </picture>
    </div>
  );
};

export default ResponsiveImage;
