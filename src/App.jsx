import { useState, useRef, useEffect } from 'react'
import { User } from 'lucide-react';
import ChatBotIcon from './Components/ChatBotIcon'
import ChatForm from './Components/ChatForm'
import ChatMessage from './Components/ChatMessage'

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef(null);

  const generateBotResponse = async(history) => {
    history = history.map(({role,text}) => ({role,parts:[{text}]}))
   
    const requestOptions = {
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body: JSON.stringify({ })
    }  
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.error.message || "Something went wrong!")
      }
      console.log(data);
    } catch(error) {
      console.log("Error aya hai");
    }
  }

  // Automatically scroll to bottom when chat history changes
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-[#1d2021] flex items-center justify-center p-4">
      {/* ChatBot Container */}
      <div className="w-full max-w-4xl mx-auto bg-[#282828] rounded-2xl shadow-2xl border border-[#3c3836] overflow-hidden flex flex-col h-[90vh] max-h-[900px]">
        {/* ChatBot Header */}
        <div className="bg-[#458588] text-[#fbf1c7] p-4 flex items-center justify-between border-b border-[#3c3836]">
          <div className="flex items-center space-x-3">
            <ChatBotIcon className="w-10 h-10 text-[#fbf1c7]"/>
            <span className="text-2xl font-bold tracking-wide">BargainBuddy</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="hover:bg-[#689d6a] p-2 rounded-full transition text-[#fbf1c7]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </button>
          </div>
        </div>

        {/* ChatBot Body - Scrollable */}
        <div 
          ref={chatBodyRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#1d2021] custom-scrollbar"
        >
          {/* Initial Welcome Message */}
          <div className="flex items-start space-x-3 mb-4">
            <ChatBotIcon className="w-10 h-10 shrink-0 text-[#83a598]"/>
            <div className="bg-[#32302f] p-4 rounded-xl shadow-lg max-w-[80%] text-[#ebdbb2]">
              <p className="leading-relaxed">
                Hey there! 👋 <br />
                <span className="text-[#fe8019]">How can I help you hunt down the best bargains today?</span>
              </p>
            </div>
          </div>

          {/* Chat History */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat}/>
          ))}
        </div>

        {/* ChatBot Footer - Fixed Position */}
        <div className="bg-[#282828] border-t border-[#3c3836] p-2">
          <ChatForm 
            chatHistory={chatHistory} 
            setChatHistory={setChatHistory} 
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1d2021;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #665c54;
          border-radius: 6px;
          border: 3px solid #1d2021;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #7c6f64;
        }
      `}</style>
    </div>
  )
}

export default App