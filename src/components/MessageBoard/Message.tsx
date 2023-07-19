import React from 'react';
import './style.css';
import { SenderType, type MessageProps } from './type';
import ResponsiveImage from '../ResponsiveImage';

const Message: React.FC<MessageProps> = ({ message }) => {
  if (message.sender === SenderType.USER) {
    return (
      <div className="message-item">
        <div className="message-body user">{message.text}</div>
        <div className="message-triangle-user"></div>
        <div className="message-badge">
          <ResponsiveImage
            src={'/images/greenCheck/img.png'}
            alt="Assistant Badge"
            width={34}
            height={34}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="message-item">
      <div className="message-badge">
        <ResponsiveImage
          src={'/images/greenCheck/img.png'}
          alt="Assistant Badge"
          width={34}
          height={34}
        />
      </div>
      <div className="message-triangle"></div>
      <div className="message-body">{message.text}</div>
    </div>
  );
};

export default Message;
