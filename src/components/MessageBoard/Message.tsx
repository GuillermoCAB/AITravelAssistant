import React, { useEffect } from 'react';
import './style.css';
import { MessageData, MessageProps } from './type';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import ResponsiveImage from '../ResponsiveImage';
import sendMessageToBackend from '../../utils/messageToBackend'

const Message: React.FC<MessageProps> = ({ message }) => {

  useEffect(() => {
    if (message.role === ChatCompletionRequestMessageRoleEnum.User) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          const messageData: MessageData = {
            content: message.content || '',
            timestamp: new Date().toISOString(),
            latitude,
            longitude,
            user: 'anonymous', // Replace with actual user information when available
          };

          // Call the sendMessageToBackend function to send the message data to the backend
          sendMessageToBackend(messageData)
            .then(response => {
              console.log('Message sent to backend:', response);
            })
            .catch(error => {
              console.error('Error sending message to backend:', error);
            });
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, [message]);

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
