import React from 'react';
import { singlePlayerContainerImageUrl } from '@/constants/assetPaths';

import { CiUser } from "react-icons/ci";
import { FaHourglassEnd } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";

interface PlayerStatusProps {
    name: string;
    status: Status;
    stake: number;
}

export enum Status {
    READY = "READY",
    WAITING="WAITING",
}

export const PlayerStatus = ({name, status, stake}: PlayerStatusProps) => {
  return (
    <div
        className="flex items-center text-2xl py-2 px-4 mx-2"
        style={{
        backgroundImage: `url(${singlePlayerContainerImageUrl})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        }}
    >
        <CiUser className=""/>
        <span className="mx-2">{name}</span>
        {status === Status.READY ? 
            <FaThumbsUp className="text-orange-400 h-full aspect-square mx-2"/> : 
            <FaHourglassEnd className="text-gray-600 h-full aspect-square mx-2" />}
        <span className="ml-auto text-sky-200">{stake}</span>
  </div>
  )
}
