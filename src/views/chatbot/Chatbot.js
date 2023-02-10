import React, { useState } from 'react';
import Chatbot from "react-chatbot-kit";
import config from './../../chatbot/config';
// import getConfig from './chatbot/getConfig';
import MessageParser from './../../chatbot/MessageParser';
import ActionProvider from './../../chatbot/ActionProvider';

import 'react-chatbot-kit/build/main.css';
import './Chatbot.css';
import { Icon } from '@iconify/react';

const ChatbotKit = () => {
    const [show, toggleShow] = useState(false)
    const [showChatbot, ChatbotOn] = useState(<Icon icon="fluent:bot-24-filled" className="app-chatbot-button-icon" style={{ fontSize: '40', color: 'white', cursor: 'pointer' }} />);

    return (
        <div className='Chatbot'>
            <div style={{
                maxWidth: "500px",
                position: "fixed",
                right: "20px",
                bottom: "0px",
            }}>
                {!show && (
                <button className="app-chatbot-button" style={{margin:"25px", boxShadow:"none", borderRadius:"45%", backgroundColor:"#7367F0", border:"none"}} onClick={() => {
                    toggleShow((prev) => !prev);
                    if (show === false) {
                        ChatbotOn();
                    } else {
                        ChatbotOn(<Icon icon="fluent:bot-24-filled" className="app-chatbot-button-icon" style={{ fontSize: '40', color: 'white', cursor: 'pointer' }} />);
                    }
                }
                }>
                {showChatbot}
                </button>
                )}
                {show && (
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                    headerText={<text>Ask chatbot &nbsp; <div style={{float:"right", marginRight:"0"}}> <a href="" onClick={(e) => {
                        e.preventDefault();
                        toggleShow((prev) => !prev);
                        if (show === false) {
                            ChatbotOn();
                        } else {
                            ChatbotOn(<Icon icon="fluent:bot-24-filled" className="app-chatbot-button-icon" style={{ fontSize: '40', color: 'white', cursor: 'pointer' }} />);
                        }
                    }}>
                    <Icon icon="akar-icons:circle-x-fill" />
                    </a></div></text>}
                />
                )}
            </div>
        </div>
    )
}

export default ChatbotKit
