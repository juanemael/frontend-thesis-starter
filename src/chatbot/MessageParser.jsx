import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    // if (message.includes('hello')) {
      // actions.handleHello(message);
    // }
      actions.handleQuestion(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;