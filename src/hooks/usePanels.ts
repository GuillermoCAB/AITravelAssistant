import { useContext } from 'react';
import UserContext from '../context/user/contex';
import { PanelMenuValues } from '../context/user/type';
import carsArray from '../constants/cars';
import { SelectCarParams } from '../types/hooks';

export const usePanels = () => {
  const { setSelectedCar, setPanelMenu } = useContext(UserContext);

  const selectCar = ({ carName }: SelectCarParams): string => {
    const targetIndex = carsArray.findIndex(car => car.name === carName);

    if (targetIndex < 0)
      return `Can't find any car with the name of ${carName}`;

    setPanelMenu(PanelMenuValues.car);
    setSelectedCar(carsArray[targetIndex]);

    return `Changed UI to show ${carName} with success!`;
  };

  return {
    selectCar,
  };
};
