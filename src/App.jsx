import { useState } from 'react'
import ChatBotIcon from './Components/ChatBotIcon'
import UserIcon from './Components/UserIcon'
import ChatForm from './Components/ChatForm'
import ChatMessage from './Components/ChatMessage'

function App() {
  const [chatHistory,setChatHistory] = useState([]);

  const generateBotResponse = async(history) => {
   
    history = history.map(({role,text}) => ({role,parts:[{text}]}))
   
    const requestOptions = {
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body: JSON.stringify({ })
    }  
    
    
    try{

      // Make the api call to get the bot's response.
         
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.error.message || "Something went wrong!")
      }
      console.log(data);
    }catch(error){
      console.log("Error aya hai");
    }
  }


  return (
  <div className="container">
    <div className="chatbot-popup">
        {/* ChatBot Header Start */}
        <div className="chat-header">
          <div className="header-info">
            <ChatBotIcon/>
            <span className="logo-text">BargainBuddy</span>
          </div>
          {/* Button add nhi kara */}
        </div>
      {/* ChatBot Header End */}


      {/* ChatBot Body Start */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatBotIcon/>
            <p className="message-text">
              Hey there <br />How can I help you today?
            </p>
          </div>
          {chatHistory.map((chat,index) => (
            <ChatMessage key={index} chat={chat}/>
          ))}
        </div>
      {/* ChatBot Body End */}


      {/* ChatBot Footer Start */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory = {setChatHistory} generateBotResponse={generateBotResponse}/>
          
           
        </div>
      {/* ChatBot Footer End */}
    </div>
    
  </div>      
  )
}

export default App
