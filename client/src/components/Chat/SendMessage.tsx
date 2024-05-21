import React, {useState} from 'react';
import { IoSend } from "react-icons/io5";
import { useDojo } from "@/dojo/useDojo";
import { formatAddress } from '@/utils';

//firebase
//import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const SendMessage = () => {
  
  const {
    account,
  } = useDojo();

  const [value, setValue] = useState("");
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(value.trim() === "") {
      alert("Enter valid message!");
      return;
    }

    // try {
    //   await addDoc(collection(db, "messages"), {
    //     user:account?.account.address,
    //     message: value,
    //     createdAt: serverTimestamp()
    //   })
    // } catch(error) {
    //   console.log(error);
    // }
    setValue("");
  }

  return (
    <form className="
          mt-auto
          w-full h-[2.5em] rounded-xl
          py-1 gap-x-2
          flex justify-start items-center
          border border-sky-300
          "
      onSubmit={handleSendMessage} 
      >

            <input 
            className="h-full w-full ml-2
            rounded-lg bg-transparent
            px-2 text-sky-200
            focus:outline-none
            "
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            />

            <button className="h-full aspect-square mr-1
            flex justify-center items-center rounded-lg
            text-sky-300
            hover:bg-sky-300/80 hover:text-black
            border border-sky-300/80 px-2
            "
            type='submit'
            >
              <IoSend className="h-full"/>
            </button>

        </form>
  )
}
