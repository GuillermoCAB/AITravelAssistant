import React from 'react';
import './style.css';
import { MessageProps } from './type';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import ResponsiveImage from '../ResponsiveImage';

const Message: React.FC<MessageProps> = ({ message }) => {
  if (
    message.role === ChatCompletionRequestMessageRoleEnum.System ||
    message.role === ChatCompletionRequestMessageRoleEnum.Function ||
    message.function_call
  ) {
    return;
  }

  if (message.role === ChatCompletionRequestMessageRoleEnum.User) {
    return (
      <div className="message-item">
        <div className="message-body user">{message.content}</div>
        <div className="message-triangle-user"></div>
        <div className="message-badge user">
          <ResponsiveImage
            src={'/images/userIcon/img.png'}
            alt="Assistant Badge"
            width={31.1}
            height={27.6}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="message-item">
      <div className="message-badge">
        <ResponsiveImage
          src={'/images/logo/img.png'}
          alt="Assistant Badge"
          width={37.7}
          height={19.1}
        />
      </div>
      <div className="message-triangle"></div>
      <div className="message-body">{message.content}</div>
    </div>
  );
};

export default Message;
