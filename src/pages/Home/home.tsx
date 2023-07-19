import React, { useState } from 'react';
import './style.css';
import { SenderType } from '../../components/MessageBoard/type';
import type { IMessage } from '../../components/MessageBoard/type';

import { MessageBoard, ChatInput, Layout } from '../../components';

const Home: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: 'd823hf8h38h835hg',
      text: "Hello I'm audi a7 assistant, how can I help you?",
      sender: SenderType.AI,
    },
    {
      id: 'd23d2f5534',
      text: 'Hi I want to know more about the A7 engine please.',
      sender: SenderType.USER,
    },
  ]);

  return (
    <div id="Home">
      <Layout
        md="4"
        xl="4"
        display="flex"
        flexDirection="column"
        ow={{
          backgroundColor: 'var(--primary-color-transparent90)',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <MessageBoard messages={messages} />
        <ChatInput
          onSendMessage={(message: string) => console.log('Message:', message)}
        />
      </Layout>
    </div>
  );
};

export default Home;
