import { User } from 'lucide-react';
import ChatBotIcon from "./ChatBotIcon";

export default function ChatMessage(props){
    const isModelMessage = props.chat.role === "model";

    return(
        <div className={`flex items-start space-x-3 mb-4 ${isModelMessage ? 'flex-row' : 'flex-row-reverse'}`}>
            {isModelMessage ? (
                <ChatBotIcon className="w-8 h-8 shrink-0 text-[#83a598]"/>
            ) : null}
            
            <div className={`
                flex items-center 
                max-w-[80%] 
                ${isModelMessage 
                    ? 'bg-[#32302f] text-[#ebdbb2]' 
                    : 'bg-[#458588] text-[#fbf1c7]'}
                rounded-xl 
                shadow-sm 
                overflow-hidden
            `}>
                {!isModelMessage && (
                    <div className="bg-[#504945] p-2">
                        <User 
                            className="w-6 h-6 text-[#fe8019]"
                            strokeWidth={1.5}
                        />
                    </div>
                )}
                
                <p className={`
                    p-3 
                    text-sm 
                    flex-1
                    ${isModelMessage ? '' : 'pl-2'}
                `}>
                    {props.chat.text}
                </p>
            </div>
        </div>        
    )
}
