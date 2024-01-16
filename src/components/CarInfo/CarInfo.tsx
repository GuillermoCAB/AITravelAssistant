import React, { useContext, useMemo } from 'react';

import './styles.css';
import Typograph from '../Typograph';
import UserContext from '../../context/user/contex';

const CarInfo: React.FC = () => {
  const { selectedCar } = useContext(UserContext);

  const infos = useMemo(
    () => [
      {
        name: 'Horsepower',
        value: selectedCar.hp,
        unit: 'HP',
      },
      {
        name: 'Battery size',
        value: selectedCar.batterySize,
        unit: 'kWh',
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
    <div id="CarInfo">
      {infos.map(info => (
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
      ))}
    </div>
  );
};

export default CarInfo;
