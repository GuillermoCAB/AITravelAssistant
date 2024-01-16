import React from 'react';
import ResponsiveImage from '../ResponsiveImage';

import './styles.css';
import { ICar } from '../../types/cars';

const ImageGallery: React.FC<{
  selectedCar: ICar;
  imgTargetIndex: number;
  setImgTargetIndex: (index: number) => void;
}> = ({ selectedCar, imgTargetIndex, setImgTargetIndex }) => (
  <div id="ImageGallery">
    <ResponsiveImage
      src={selectedCar?.images[imgTargetIndex]}
      alt={selectedCar.name}
      width={504}
      height={315}
    />
    <div className="optionsRow">
      {selectedCar.images.map((img, index) => (
        <div className="opt" onClick={() => setImgTargetIndex(index)}>
          <ResponsiveImage
            src={img}
            alt="car thumb opt"
            height={40}
            width={63}
          />
        </div>
      ))}
    </div>
  </div>
);

export default ImageGallery;
