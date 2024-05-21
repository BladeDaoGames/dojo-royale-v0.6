import React from 'react';

import { mapSelectionTextContainerImageUrl, buttonCardImageUrl
} from '@/constants/assetPaths';

import { MapSelectionCarousel } from './MapSelectionCarousel';
import { FaEthereum } from "react-icons/fa";

export const GameMap = () => {
  return (
    <div
    className="w-[700px] h-full flex flex-col
    justify-start items-center 
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
  )
}
