import React, {useState} from 'react';
import { BasePage } from '../Base';
import { InventoryPanel } from './InventoryPanel';

import { Navbar } from '@/components';
import { useNavigate } from "react-router-dom";

import { ROUTES } from '@/constants/routing/routePath';

import { LobbyTabs } from './LobbyTabs';

import { waitingRoomCardImageUrl } from '@/constants/assetPaths';

export const Lobby = () => {
    const navigate = useNavigate();

  return (
    <BasePage className="text-white">
        <Navbar onBackClick={()=>navigate(ROUTES.home)} getHomePage={false}/>
        
        {/* Content */}
        <div className="
        w-full border border-purple-500 
        h-full overflow-y-scroll
        flex justify-start gap-4 
        my-2 mx-4 p-2 px-4
        ">

            {/* Inventory */}
          <div className="w-1/3">
            <InventoryPanel/>
          </div>

          {/* Lobby Tabs */}
          <div
            className="w-full h-full flex flex-col px-4 mt-2"
            style={{
              backgroundImage: `url(${waitingRoomCardImageUrl})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
          >

            <LobbyTabs/>
          </div>

        </div>
    </BasePage>
  )
}
