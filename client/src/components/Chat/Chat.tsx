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

        {id: 1, user: "me", message: "hello"},
        {id: 2, user: "player1", message: "hi"},
        {id: 3, user: "player2", message: "yo"},
        {id: 4, user: "player3", message: "hey"},
        {id: 5, user: "player4", message: "sup"},
        {id: 6, user: "player5", message: "hello"},
        {id: 7, user: "player6", message: "hi"},
        {id: 1, user: "me", message: "hello"},

        {id: 1, user: "me", message: "hello"},
        {id: 2, user: "player1", message: "hi"},
        {id: 3, user: "player2", message: "yo"},
        {id: 4, user: "player3", message: "hey"},
        {id: 5, user: "player4", message: "sup"},
        {id: 6, user: "player5", message: "hello"},
        {id: 7, user: "player6", message: "hi"},
        {id: 1, user: "me", message: "hello"},
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
