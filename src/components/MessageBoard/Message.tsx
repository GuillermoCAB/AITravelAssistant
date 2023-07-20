import React from 'react';
import './style.css';
import { MessageProps } from './type';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import ResponsiveImage from '../ResponsiveImage';

const Message: React.FC<MessageProps> = ({ message }) => {
  if (
    message.role === ChatCompletionRequestMessageRoleEnum.System ||
    message.role === ChatCompletionRequestMessageRoleEnum.Function
  ) {
    return;
  }

  if (message.function_call) {
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
        <div className="message-body">{message.function_call.name}</div>
      </div>
    );
  }

  if (message.role === ChatCompletionRequestMessageRoleEnum.User) {
    return (
      <div className="message-item">
        <div className="message-body user">{message.content}</div>
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
      <div className="message-body">{message.content}</div>
    </div>
  );
};

export default Message;
