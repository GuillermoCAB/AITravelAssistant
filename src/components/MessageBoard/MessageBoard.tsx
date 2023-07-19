import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import type { MessageBoardProps } from './type';
import Layout from '../Layout';
import Message from './Message';

const MessageBoard: React.FC<MessageBoardProps> = ({ messages }) => {
  return (
    <Layout ow={{ maxHeight: '94%' }}>
      <div id="MessageBoard">
        {messages.map(message => {
          return <Message message={message} />;
        })}
      </div>
    </Layout>
  );
};

export default MessageBoard;
