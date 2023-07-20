import { ChatCompletionRequestMessage } from 'openai';
import React, { useEffect, useState } from 'react';
import UserContext from './contex';
import { ScheduleType } from './type';
import { defaultValues } from './defaults';

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
  const [userId, setUserId] = useState<string>(() => {
    const savedUserId = localStorage.getItem('userId');
    return savedUserId ?? '';
  });

  const [schedule, setSchedule] = useState<ScheduleType>(() => {
    const savedSchedule = localStorage.getItem('schedule');
    return savedSchedule ? JSON.parse(savedSchedule) : {};
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }, [schedule]);

  return (
    <UserContext.Provider
      value={{
        messages,
        userId,
        schedule,
        setMessages,
        setUserId,
        setSchedule,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
