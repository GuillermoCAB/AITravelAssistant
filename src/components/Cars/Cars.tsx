import React, { useContext, useMemo, useState } from 'react';
import UserContext from '../../context/user/contex';
import Typograph from '../Typograph';
import ResponsiveImage from '../ResponsiveImage';

import './styles.css';
import carsArray from '../../constants/cars';

const Cars: React.FC = () => {
  const { selectedCar, setSelectedCar } = useContext(UserContext);
  const [targetIndex, setTargetIndex] = useState<number>(0);
  const [imgTargetIndex, setImgTargetIndex] = useState<number>(0);

  const previousIndex =
    targetIndex - 1 >= 0 ? targetIndex - 1 : carsArray.length - 1;

  const nextIndex =
    targetIndex + 1 <= carsArray.length - 1 ? targetIndex + 1 : 0;

  const moveBack = () => {
    targetIndex === 0
      ? setTargetIndex(carsArray.length - 1)
      : setTargetIndex(prev => prev - 1);
  };

  const moveForward = () => {
    targetIndex === carsArray.length - 1
      ? setTargetIndex(0)
      : setTargetIndex(prev => prev + 1);
  };

  const infos = useMemo(
    () => [
      {
        name: 'Horsepower',
        value: selectedCar.hp,
        unit: 'HP',
      },
      {
        name: selectedCar.torque ? 'Torque' : 'Battery size',
        value: selectedCar.torque || selectedCar.batterySize,
        unit: selectedCar.torque ? 'lb-ft' : 'kWh',
      },
      {
        name: '0-60 mph in',
        value: selectedCar.to60,
        unit: 'sec',
      },
    ],
    [selectedCar]
  );

  return (
    <div id="Cars">
      <Typograph type="h4">Check our models:</Typograph>
      <div className="carousell">
        <button onClick={moveBack} className="swipe">
          &lt;
        </button>
        <div
          onClick={() => setSelectedCar(carsArray[previousIndex])}
          className={`item ${
            selectedCar.id === carsArray[previousIndex].id ? 'selected' : ''
          }`}
        >
          <ResponsiveImage
            src={carsArray[previousIndex].thumbnail}
            alt="Etron Thumbnail"
            width={273}
            height={117}
          />
          <Typograph type="p">{carsArray[previousIndex].name}</Typograph>
        </div>

        <div
          onClick={() => setSelectedCar(carsArray[targetIndex])}
          className={`item ${
            selectedCar.id === carsArray[targetIndex].id ? 'selected' : ''
          }`}
        >
          <ResponsiveImage
            src={carsArray[targetIndex].thumbnail}
            alt="Etron Thumbnail"
            width={273}
            height={117}
          />
          <Typograph type="p">{carsArray[targetIndex].name}</Typograph>
        </div>

        <div
          onClick={() => setSelectedCar(carsArray[nextIndex])}
          className={`item ${
            selectedCar.id === carsArray[nextIndex].id ? 'selected' : ''
          }`}
        >
          <ResponsiveImage
            src={carsArray[nextIndex].thumbnail}
            alt="Etron Thumbnail"
            width={273}
            height={117}
          />
          <Typograph type="p">{carsArray[nextIndex].name}</Typograph>
        </div>
        <button onClick={moveForward} className="swipe">
          &gt;
        </button>
      </div>
      <Typograph margin="70px 0 0" type="h4">
        {selectedCar.name}
      </Typograph>
      <div className="gallery">
        <ResponsiveImage
          src={selectedCar?.images[imgTargetIndex]}
          alt="Etron Thumbnail"
          width={504}
          height={315}
        />
        <div className="optionsRow">
          {/* @ts-ignore */}
          {selectedCar.images.map((img, index) => {
            return (
              <div className="opt" onClick={() => setImgTargetIndex(index)}>
                <ResponsiveImage
                  src={img}
                  alt="car thumbg opt"
                  height={40}
                  width={63}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="info">
        {infos.map(info => {
          return (
            <div className="item">
              <Typograph bold={300} type="p">
                {info.name}
              </Typograph>
              <div className="row">
                <Typograph bold={400} type="h2">
                  {info.value}
                </Typograph>
                <Typograph bold={300} margin="0 0 8px 6px" type="p">
                  {info.unit}
                </Typograph>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cars;
