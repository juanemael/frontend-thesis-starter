import React from 'react';
import axios from 'axios';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleQuestion = (question) => {
    const data = {
      sentences: question
    };
    console.log(data)
    async function getChatbotResponse(data) {
      try {
        await axios.post("http://localhost:19065/ask_chatbot", data, {
           headers: {
          'Content-Type': 'application/json'
        }
        }).then(function(response) {
          console.log(response.data)
          console.log(response.data.data)
          const botMessage = createChatBotMessage(response.data.data);
          setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
          }));
        })
      } catch (error) {
        console.log(error)
      }
    }
    getChatbotResponse(data);
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleQuestion,
          },
        });
      })}
    </div>
  );
};
  
export default ActionProvider;