import React, {useState} from 'react';
import { BasePage } from '../Base';

import { Navbar } from '@/components';
import { useNavigate } from "react-router-dom";

import { ROUTES } from '@/constants/routing/routePath';

import { quitButtonContainerImageUrl, quitButtonImageUrl,
  mapSelectionTextContainerImageUrl, buttonCardImageUrl
 } from '@/constants/assetPaths';

import { PlayerGameStatus } from './PlayerGameStatus';
import { MapSelectionCarousel } from './MapSelectionCarousel';
import { Chat } from '@/components/Chat';
import { FaEthereum } from "react-icons/fa";

export const InGame = () => {
    const navigate = useNavigate();
    return (
      <BasePage className="text-white">
          <Navbar onBackClick={()=>navigate(ROUTES.home)} getHomePage={false}/>
      
          {/* Content */}
          <div className="
          w-full h-full
          flex justify-center items-center
          my-2 mx-4 p-2 px-4
          ">
          
            {/* Game Status */}
            <div className="h-full overflow-hidden
            flex flex-col items-start justify-start
            rounded-md grow
            overflow-y-hidden
            ">

              {/* Quit button 4em */}
              <div className="
              w-[20em] h-[4em] flex items-center px-2
              mx-2
              "
              onClick={()=>navigate(ROUTES.waiting)}
              >
                {/* Quit Button */}
                <div className="flex items-center 
                  px-4 py-2 h-full hover:cursor-pointer
                  "
                  onClick={() => {}}

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

              {/* <GameStatus/> 20em x 24em-min */}
              <PlayerGameStatus />

              {/* <Chat/> 20em*/}
              <div className="
              mx-2 w-fit max-h-[15em] min-h-[10em] h-full
              flex flex-col justify-end items-start mt-auto
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
              className="w-[700px] h-full
              "
            >
              <MapSelectionCarousel />
              
              {/* Map Selection Text */}
              <div className="w-full text-2xl font-normal
              flex justify-center items-center
              py-2 text-gray-300/80
              "
                style={{
                  backgroundImage: `url(${mapSelectionTextContainerImageUrl})`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
                >
                Homeowner is selecting map...
                </div>
              
              {/* Join Game Buttons */}
              <div className="w-full flex justify-center items-center
              py-2
              ">
                <button className="mx-2 py-4 px-8
                rounded-lg flex justify-center items-center flex-nowrap
                text-2xl font-semibold
                hover:bg-sky-300
                hover:text-sky-700 hover:font-bold
                "
                style={{ 
                  backgroundImage: `url(${buttonCardImageUrl})`,
                  backgroundSize: "100% 104%",
                  backgroundPosition: "0% 75%",
                  backgroundRepeat: "no-repeat",
                }}
                >
                  <FaEthereum className="text-sky-700"/> 
                  <span className="mx-2">20</span>
                  <span className="mx-2">|</span>
                  <span className="mx-2">Join Game</span>
                </button>

                <button className="mx-2 py-4 px-8
                rounded-lg flex justify-center items-center flex-nowrap
                text-2xl font-semibold
                hover:bg-sky-300
                hover:text-sky-700 hover:font-bold
                "
                style={{ 
                  backgroundImage: `url(${buttonCardImageUrl})`,
                  backgroundSize: "100% 104%",
                  backgroundPosition: "0% 75%",
                  backgroundRepeat: "no-repeat",
                }}
                >Start Game</button>
              
              </div>

            </div>

            {/* Chat or Side Features */}
            <div
              className="h-full grow
              "
            >
              <div className="
              w-[20em] h-[5em]
              ml-auto
              ">
              </div>
              
            </div>

          </div>
      
      </BasePage>
    )
}
