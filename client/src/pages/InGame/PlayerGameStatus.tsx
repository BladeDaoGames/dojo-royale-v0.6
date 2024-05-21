import React from 'react';
import { PlayerStatus, Status } from '@/components/PlayerStatus/PlayerStatus';
import { playerInfoContainerImageUrl } from '@/constants/assetPaths';

export const PlayerGameStatus = () => {
  return (
    <div
        className="max-w-[20em] w-full min-h-[24em] h-full my-2
        "
        style={{
        backgroundImage: `url(${playerInfoContainerImageUrl})`,
        backgroundSize: "99% 100%",
        backgroundPosition: "200% 0%",
        backgroundRepeat: "no-repeat",
        }}
    >   

        {/* total staked bar */}
        <div className="flex flex-nowrap justify-start items-center 
          w-full
          text-3xl p-2 pb-4 mb-2">
          <p className="font-semibold text-sky-200 pt-2"> Total Staked</p>
          <p className="flex justify-end ml-auto text-sky-200 px-4 pt-2 w-[3em]">80</p>
        </div>
        
        {/* player statuses */}
        <div className="h-full w-full flex flex-col gap-y-2">
        <PlayerStatus name="Player 1" status={Status.READY} stake={10}/>
        <PlayerStatus name="Player 2" status={Status.WAITING} stake={20}/>
        <PlayerStatus name="Player 3" status={Status.READY} stake={10}/>
        <PlayerStatus name="Player 4" status={Status.WAITING} stake={20}/>
        <PlayerStatus name="Player 5" status={Status.READY} stake={10}/>
        <PlayerStatus name="Player 6" status={Status.WAITING} stake={20}/>
        </div>
    </div>
  )
}
