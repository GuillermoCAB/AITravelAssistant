import { ChatCompletionRequestMessage } from 'openai';
import React, { useEffect, useRef, useState } from 'react';
import { PanelMenuValues } from './type';
import { defaultValues } from './defaults';
import UserContext from './contex';
import carsArray from '../../constants/cars';
import { ISchedule } from '../../types/schedule';
import { IUser } from '../../types/user';
import { TokenType } from '../../types/services';
import { ICar } from '../../types/cars';

const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // Initialize from localStorage or use a default
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>(
    () => {
      const savedMessages = localStorage.getItem('messages');
      return savedMessages
        ? JSON.parse(savedMessages)
        : [...defaultValues.messages];
    }
  );

  const [user, setUser] = useState<Partial<IUser>>({});
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [panelMenu, setPanelMenu] = useState<PanelMenuValues>(
    PanelMenuValues.car
  );
  const [selectedCar, setSelectedCar] = useState<ICar>(carsArray[0]);
  const [panelIsLoading, setPanelIsLoading] = useState<boolean>(false);
  const token = useRef<TokenType>();

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  return (
    <UserContext.Provider
      value={{
        messages,
        user,
        schedule,
        panelMenu,
        selectedCar,
        panelIsLoading,
        token,
        setMessages,
        setUser,
        setSchedule,
        setPanelMenu,
        setSelectedCar,
        setPanelIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
