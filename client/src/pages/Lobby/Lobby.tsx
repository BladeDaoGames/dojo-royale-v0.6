import React, {useState} from 'react';
import { BasePage } from '../Base';
import { InventoryPanel } from './InventoryPanel';

import { Navbar } from '@/components';
import { useNavigate } from "react-router-dom";

import { ROUTES } from '@/constants/routing/routePath';

export const Lobby = () => {
    const navigate = useNavigate();

  return (
    <BasePage className="text-white">
        <Navbar onBackClick={()=>navigate(ROUTES.home)} getHomePage={false}/>
        
        {/* Content */}
        <div className="
        w-full flex-grow 
        flex justify-start gap-4 
        my-2 mx-4 p-2 px-4
        ">

            {/* Inventory */}
          <div className="w-1/3">
            <InventoryPanel/>
          </div>

        </div>
    </BasePage>
  )
}
