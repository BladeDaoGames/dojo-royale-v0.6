import React, {useState} from 'react';
import { BasePage } from '../Base';

import { Navbar } from '@/components';
import { useNavigate } from "react-router-dom";

import { ROUTES } from '@/constants/routing/routePath';

export const InGame = () => {
    const navigate = useNavigate();
  return (
    <BasePage className="text-white">
        <Navbar onBackClick={()=>navigate(ROUTES.home)} getHomePage={false}/>
    
        {/* Content */}
        <div className="
        w-full
        h-full
        flex justify-center items-start gap-4 
        my-2 mx-4 p-2 px-4
        ">
        
          {/* Game Status */}
          <div className="flex-grow h-full overflow-hidden
          flex flex-col items-start justify-start
          border border-white/50 rounded-md
          ">
            <div className="
            w-full h-[5em]
            border
            ">

            </div>
            {/* <GameStatus/> */}
            <div className="
            w-full h-[25em]
            border border-green-800
            ">
              Ready & Total Staked
            </div>

            <div className="
            w-full flex-grow
            border border-purple-800
            ">
              Chat
            </div>
          </div>

          {/* Game and Map */}
          <div
            className="w-[680px] h-full border border-orange-400
            "
          >
            {/* Game */}
          </div>

          {/* Chat or Side Features */}
          <div
            className="flex-grow h-full border border-pink-400
            "
          >
            <div className="
            w-full h-[5em]
            border
            ">

            </div>
            {/* <Chat/> */}
            </div>

        </div>
    
    </BasePage>
  )
}
