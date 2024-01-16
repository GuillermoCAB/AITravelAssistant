import React, { useEffect, useRef } from 'react';
import './style.css';
import type { MessageBoardProps } from './type';
import Layout from '../Layout';
import Message from './Message';

const MessageBoard: React.FC<MessageBoardProps> = ({ messages }) => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTo({
        top: messageEndRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <Layout ow={{ maxHeight: '94%' }}>
      <div ref={messageEndRef} id="MessageBoard">
        {messages?.map(message => {
          return <Message message={message} />;
        })}
      </div>
    </Layout>
  );
};

export default MessageBoard;
