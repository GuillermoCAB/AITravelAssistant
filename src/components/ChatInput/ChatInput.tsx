import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.css';
import type { ChatInputProps } from './type';
import Button from '../Button';

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const MAX_HEIGHT = 300;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      let scrollHeight = textareaRef.current.scrollHeight;
      if (scrollHeight > MAX_HEIGHT) {
        scrollHeight = MAX_HEIGHT;
      }
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [message]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = useCallback(() => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  }, [onSendMessage, message]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <>
      <div className="chat-input">
        <textarea
          ref={textareaRef}
          className="chat-input-field"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          rows={1}
        />
        <Button
          disabled={!message.length}
          color="secondary"
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default ChatInput;
