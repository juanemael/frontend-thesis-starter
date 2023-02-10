import { createChatBotMessage } from 'react-chatbot-kit';

const getConfig = (onClick) => {
  const config = {
    initialMessages: [createChatBotMessage(`Hello world`)],
    customComponents: {
        // Replaces the default header
      header: () => <div style={{ backgroundColor: 'red', padding: "5px", borderRadius: "3px" }}>This is the header <button onClick={window.close}>Close</button></div>
    },
  };
}
  
export default getConfig;