import React from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '@/constants/routing/routePath';

import { quitButtonContainerImageUrl, quitButtonImageUrl
   } from '@/constants/assetPaths';
import { PlayerGameStatus } from './PlayerGameStatus';
import { Chat } from '@/components/Chat';

export const GameStatusPanel = () => {
    const navigate = useNavigate();
    return (
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
            
            <div className="max-w-[20em] w-full
            max-h-[15em] min-h-[10em] h-[15em]
            mb-2 mt-auto
            rounded-lg rounded-b-xl overflow-hidden
            ">
                <Chat />
            </div>

        </div>
    )
}
