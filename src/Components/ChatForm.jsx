import React, { useRef } from "react";
import { Search, Send } from "lucide-react";

export default function ChatForm(props) {
    const inputRef = useRef(null);

    function handleformsubmit(e) {
        e.preventDefault();
        const usrMessage = inputRef.current.value.trim();
        if (!usrMessage) return;

        inputRef.current.value = "";
        console.log(usrMessage);
        
        // Update chat history with the user's message
        props.setChatHistory(history => [...history, { role: "usr", text: usrMessage }]);

        // Delay 600ms before showing "Thinking..." and generating response
        setTimeout(() => {
            // Add a "Thinking..." placeholder for the bot's response
            props.setChatHistory((history) => [...history, { role: "model", text: "Sochne De Bhai...." }]);
            
            // Call the function to generate the bot's response
            props.generateBotResponse([...props.chatHistory, { role: "usr", text: usrMessage }]);
        }, 600);
    }

    return (
        <div className="w-full px-4 py-2 bg-[#282828] border-t border-[#3c3836]">
            <form 
                onSubmit={handleformsubmit} 
                className="w-full flex items-center bg-[#32302f] rounded-xl overflow-hidden border border-[#504945]"
            >
                {/* Optional attachment/action button */}
                <button 
                    type="button" 
                    className="p-3 text-[#83a598] hover:bg-[#504945] transition duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>

                {/* Main input */}
                <input 
                    ref={inputRef} 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 px-4 py-3 bg-[#32302f] text-[#ebdbb2] 
                        placeholder-[#928374] 
                        focus:outline-none 
                        text-base w-full 
                        transition-all duration-300"
                    required
                />

                {/* Mic button (optional) */}
                <button 
                    type="button" 
                    className="p-3 text-[#83a598] hover:bg-[#504945] transition duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </button>

                {/* Submit button */}
                <button 
                    type="submit" 
                    className="p-3 bg-[#458588] text-[#fbf1c7] 
                        hover:bg-[#689d6a] 
                        transition duration-300 
                        flex items-center justify-center"
                >
                    <Send 
                        className="h-6 w-6 group-hover:scale-110 transition-transform" 
                        strokeWidth={2.5}
                    />
                </button>
            </form>
        </div>
    );
}