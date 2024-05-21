import React, {useEffect, useState, useRef} from 'react';
import { Message } from './Message';
import { SendMessage } from './SendMessage';

interface MessageProps {
  id: number;
  user: string;
  message: string;
}

interface ChatProps {
  serverMessages?: MessageProps[];
}

export const Chat: React.FC<ChatProps> = ({serverMessages=[]}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView(
        // { behavior: "smooth" }
      );
    }
  };

  useEffect(scrollToBottom, [messages])

  
  useEffect(() => {
    if(import.meta.env.VITE_DEVMODE=="true"){
      setMessages([
        {id: 1, user: "me", message: "hello"},
        {id: 2, user: "player1", message: "hi"},
        {id: 3, user: "player2", message: "yo"},
        {id: 4, user: "player3", message: "hey"},
        {id: 5, user: "player4", message: "sup"},
        {id: 6, user: "player5", message: "hello"},
        {id: 7, user: "player6", message: "hi"},

        {id: 11, user: "me", message: "hello"},
        {id: 21, user: "player1", message: "hi"},
        {id: 31, user: "player2", message: "yo"},
        {id: 41, user: "player3", message: "hey"},
        {id: 51, user: "player4", message: "sup"},
        {id: 61, user: "player5", message: "hello"},
        {id: 71, user: "player6", message: "hi"},
        {id: 18, user: "me", message: "hello"},

        {id: 12, user: "me", message: "hello"},
        {id: 22, user: "player1", message: "hi"},
        {id: 32, user: "player2", message: "yo"},
        {id: 42, user: "player3", message: "hey"},
        {id: 52, user: "player4", message: "sup"},
        {id: 62, user: "player5", message: "hello"},
        {id: 72, user: "player6", message: "hi"},
        {id: 188, user: "me", message: "hello"},
      ])
    }else{
      setMessages(serverMessages)
    }
  }, [])

  return (
    <div className="w-full h-full bg-black/50
    flex flex-col justify-start items-center
    p-2 overflow-hidden
    ">
      

      {/* chat window */}
      <div className="
      h-full w-full mb-2 rounded-lg
      overflow-y-auto
      ">
        {messages.map((message) => (
          <Message key={message.id} message={message.message} user={message.user} />
        ))}
          <div ref={messagesEndRef}></div>
        </div>

      {/* chat input */}
      <SendMessage/>

    </div>
  )
}
