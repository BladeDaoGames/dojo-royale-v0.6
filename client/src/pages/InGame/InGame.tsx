import React, {useState} from 'react';
import { BasePage } from '../Base';

import { Navbar } from '@/components';
import { useNavigate } from "react-router-dom";

import { ROUTES } from '@/constants/routing/routePath';

import { quitButtonContainerImageUrl, quitButtonImageUrl,
  playerInfoContainerImageUrl,
 } from '@/constants/assetPaths';

import { Chat } from '@/components/Chat';

export const InGame = () => {
    const navigate = useNavigate();
  return (
    <BasePage className="text-white">
        <Navbar onBackClick={()=>navigate(ROUTES.home)} getHomePage={false}/>
    
        {/* Content */}
        <div className="
        w-full h-full
        flex justify-between items-center gap-4
        my-2 mx-4 p-2 px-4
        ">
        
          {/* Game Status */}
          <div className="h-full overflow-hidden
          flex flex-col items-start justify-start
          border border-orange-500 rounded-md
          overflow-y-hidden
          ">

            {/* Quit button 4em */}
            <div className="
            w-[20em] h-[4em] flex items-center px-2
            mx-2
            border
            ">
              {/* Quit Button */}
              <div className="flex items-center 
                px-4 py-2 h-full
                "
                style={{
                  backgroundImage: `url(${quitButtonContainerImageUrl})`,
                  backgroundSize: "101% 110%",
                  backgroundPosition: "50% 0%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                
                <span className="mr-2 h-5/6 aspect-square" 
                  style={
                    {
                      backgroundImage: `url(${quitButtonImageUrl})`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                    }
                  }
                  />
                <span className="flex items-center justify-center text-2xl mr-2 pb-1">Quit</span>
                
              </div>

            </div>

            {/* <GameStatus/> 25em*/}
            <div className="
            w-fit h-[25em] border
            mx-2
            ">

              {/* Total Staked Bar */}
              <div
              className="w-[20em] h-full
              "
              style={{
                backgroundImage: `url(${playerInfoContainerImageUrl})`,
                backgroundSize: "99% 100%",
                backgroundPosition: "200% 0%",
                backgroundRepeat: "no-repeat",
              }}
            >
                <div className="flex flex-nowrap justify-start items-center text-3xl p-2 pb-4 border">
                  <p className="font-semibold text-sky-200"> Total Staked</p>
                  <p className="flex justify-end ml-auto text-sky-200 px-4 w-[3em]">80</p>
                </div>
              </div>

              

            </div>
            
            {/* chat window */}
            <div className="
            mx-2 w-fit max-h-[22em] min-h-[20em] h-full
            border border-purple-800
            flex flex-col justify-end items-start
            overflow-hidden
            ">

              <div className="w-[20em] h-full
              border border-sky-300/80 my-2
              rounded-lg  rounded-b-xl overflow-hidden">
                <Chat />
              </div>

            </div>
          </div>

          {/* Game and Map */}
          <div
            className="w-[700px] h-full border border-orange-400
            "
          >
            {/* Game */}
          </div>

          {/* Chat or Side Features */}
          <div
            className="h-full border border-pink-400
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
