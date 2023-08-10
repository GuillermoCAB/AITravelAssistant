import axios from 'axios';
import { MessageData } from '../components/MessageBoard/type';

const sendMessageToBackend = async (messageData: MessageData) => {
  try {
    const response = await axios.post('/api/send-message', { messageData });
    return response.data;
  } catch (error) {
    console.error('Error sending message to backend:', error);
    throw error;
  }
};

export default sendMessageToBackend;