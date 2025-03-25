import ChatBotIcon from "./ChatBotIcon";

export default function ChatMessage(props){

    return(
        <div className={`message ${props.chat.role === "model" ? "bot" : "usr"}-message`}>
            {props.chat.role === "model" && <ChatBotIcon/>}
          <p className="message-text">
            {props.chat.text }
          </p>
          {/* <UserIcon/> */}
        </div>        
    )
}