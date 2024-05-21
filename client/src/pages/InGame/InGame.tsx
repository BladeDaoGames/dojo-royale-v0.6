import React, {useState} from 'react';
import { BasePage } from '../Base';

import { Navbar } from '@/components';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '@/constants/routing/routePath';

import { GameStatusPanel, GameMap } from '.';

export const InGame = () => {
    const navigate = useNavigate();

    return (
      <BasePage className="text-white">
          <Navbar onBackClick={()=>navigate(ROUTES.home)} getHomePage={false}/>
      
          {/* Content */}
          <div className="
          w-full h-full
          flex justify-center items-start
          mx-4 p-2 px-4
          ">
          
            {/* Game Status */}
            <GameStatusPanel />

            {/* Game and Map */}
            <GameMap />

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
