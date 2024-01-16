import React, { useContext, useMemo } from 'react';
import './style.css';

import { MessageBoard, ChatInput, Layout, Panel } from '../../components';

import UserContext from '../../context/user/contex';

import { useMeetingLogic } from '../../hooks/useMeeting';
import { useUserLogic } from '../../hooks/useUser';
import { useMessageHandler } from '../../hooks/useMessage';
import { usePanels } from '../../hooks/usePanels';

const Home: React.FC = () => {
  const { messages } = useContext(UserContext);

  const { scheduleMeeting, cancelMeeting, getUserSchedule } = useMeetingLogic();
  const { registerUser, checkUserCode, requireNewCode, updateInterests } =
    useUserLogic();
  const { selectCar } = usePanels();

  const availableFunctions: { [key: string]: Function } = useMemo(() => {
    return {
      scheduleMeeting,
      selectCar,
      registerUser,
      checkUserCode,
      requireNewCode,
      updateInterests,
      cancelMeeting,
      getUserSchedule,
    };
  }, [scheduleMeeting, cancelMeeting, getUserSchedule, updateInterests]);

  const { onSendMessage } = useMessageHandler(availableFunctions);

  return (
    <div id="Home">
      <Layout
        md="4"
        xl="4"
        display="flex"
        flexDirection="column"
        ow={{
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          borderRight: '1px solid var(--gray-color-transparent90)',
        }}
      >
        <MessageBoard messages={messages} />
        <ChatInput onSendMessage={onSendMessage} />
      </Layout>
      <Panel />
    </div>
  );
};

export default Home;
