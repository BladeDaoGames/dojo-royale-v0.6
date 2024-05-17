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
        In Game
    
    </BasePage>
  )
}
