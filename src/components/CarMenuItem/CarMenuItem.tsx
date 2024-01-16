import React from 'react';
import Typograph from '../Typograph';
import ResponsiveImage from '../ResponsiveImage';

import './styles.css';
import { ICar } from '../../types/cars';

const CarMenuItem: React.FC<{
  car: ICar;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ car, isSelected, onSelect }) => (
  <div
    id="CarMenuItem"
    onClick={onSelect}
    className={`${isSelected ? 'selected' : ''}`}
  >
    <ResponsiveImage
      src={car.thumbnail}
      alt={car.name}
      width={273}
      height={117}
    />
    <Typograph type="p">{car.name}</Typograph>
  </div>
);

export default CarMenuItem;
