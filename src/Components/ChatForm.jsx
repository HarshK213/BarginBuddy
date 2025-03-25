import React,{useRef} from "react";

export default function ChatForm(props){

    const inputRef = useRef()

    function handleformsubmit(e){
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if(!userMessage) return;

        inputRef.current.value = "";
        console.log(userMessage)
        
        // Update chat history with the user's message
        props.setChatHistory(history => [...history,{role : "user", text: userMessage}])

        // Delay 600ms before showing "Thinking..." and generating response
        setTimeout(() => {
            // Add a "Thinking..." placeholder for the bot's response
            props.setChatHistory((history) => [...history, {role: "model", text: "Thinking...."}]);
            
            // Call the functino to generate the both's response
            props.generateBotResponse([...props.chatHistory, {role: "user", text: userMessage}]);
        
        },600);


    }

    return(
        <form action="#" className="chat-form" onSubmit={handleformsubmit}>
          <input ref={inputRef} type="text" placeholder='Product Name or Link ...' className='message-input' required/>
          <button class="material-symbols-outlined">
            stat_1
          </button>
        </form>
    )
}