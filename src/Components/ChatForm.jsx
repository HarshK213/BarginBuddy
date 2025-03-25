import React,{useRef} from "react";

export default function ChatForm(props){

    const inputRef = useRef()

    function handleformsubmit(e){
        e.preventDefault();
        const usrMessage = inputRef.current.value.trim();
        if(!usrMessage) return;

        inputRef.current.value = "";
        console.log(usrMessage)
        
        // Update chat history with the user's message
        props.setChatHistory(history => [...history,{role : "usr", text: usrMessage}])

        // Delay 600ms before showing "Thinking..." and generating response
        setTimeout(() => {
            // Add a "Thinking..." placeholder for the bot's response
            props.setChatHistory((history) => [...history, {role: "model", text: "Thinking...."}]);
            
            // Call the functino to generate the both's response
            props.generateBotResponse([...props.chatHistory, {role: "usr", text: usrMessage}]);
        
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