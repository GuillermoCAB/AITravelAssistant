import React, { useContext, useState } from 'react';
import UserContext from '../../context/user/contex';
import Typograph from '../Typograph';
import CarMenuItem from '../CarMenuItem';
import ImageGallery from '../ImageGallery';
import CarInfo from '../CarInfo';

import './styles.css';
import carsArray from '../../constants/cars';

const Cars: React.FC = () => {
  const { selectedCar, setSelectedCar } = useContext(UserContext);
  const [imgTargetIndex, setImgTargetIndex] = useState<number>(0);

  return (
    <div id="Cars">
      <Typograph type="h4">Check our models:</Typograph>
      <div className="carousell">
        {carsArray.map(car => (
          <CarMenuItem
            car={car}
            isSelected={selectedCar.id === car.id}
            onSelect={() => setSelectedCar(car)}
          />
        ))}
      </div>
      <Typograph margin="70px 0 0" type="h4">
        {selectedCar.name}
      </Typograph>
      <ImageGallery
        selectedCar={selectedCar}
        imgTargetIndex={imgTargetIndex}
        setImgTargetIndex={setImgTargetIndex}
      />
      <CarInfo />
    </div>
  );
};

export default Cars;
