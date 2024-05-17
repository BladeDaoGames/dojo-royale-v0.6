import React, {useState} from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from './Search';
import { RoomCardNew } from './RoomCardNew';
import { buttonCardImageUrl, modalCardContainerImageUrl, 
  buttonContainerImageUrl, dropdownImageUrl } from '@/constants/assetPaths';

  
 import { FaEthereum, FaUser } from "react-icons/fa";
 import { RiTreasureMapFill } from "react-icons/ri";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog";
import { set } from 'mobx';

export const LobbyTabs = () => {
  const [createRoomModalStatus, setOpenCreateRoomModal] = useState(false);
  const onOpenCreateRoomModal = () => setOpenCreateRoomModal(true);
  const handleSearch = (searchQuery: string) => {
    // Logic to handle search action, e.g., filtering rooms
  };

  // Modal states
  const [stakeValue, setStakeValue] = useState(0.01);

  return (
    <div className="h-full w-full flex flex-col">
    <Tabs defaultValue="available" 
      className="w-full h-full overflow-y-hidden
      flex flex-col justify-start items-center rounded-lg rounded-t-3xl
      pt-4
      border border-teal-500/50
      ">


        <TabsList className="w-full flex items-center
          bg-transparent rounded-t-xl
          border-b border-teal-500/50 rounded-b-none
          ">
          <Search onSearch={handleSearch} />
          <TabsTrigger className="text-xl font-bold text-white/50 rounded-t-xl rounded-b-none
          data-[state=active]:bg-gradient-to-l from-cyan-500 to-teal-500
          " value="available">Available</TabsTrigger>
          <TabsTrigger className="text-xl font-bold text-white/50 rounded-t-xl rounded-b-none
          data-[state=active]:bg-gradient-to-l from-cyan-500 to-teal-500
          " value="playing">Playing</TabsTrigger>
          <TabsTrigger className="text-xl font-bold text-white/50 rounded-t-xl rounded-b-none 
          data-[state=active]:bg-gradient-to-l from-cyan-500 to-teal-500
          " value="all">ALL</TabsTrigger>
        </TabsList>


        <TabsContent className="p-4 overflow-y-auto 
        w-full flex-grow
        grid grid-cols-2 grid-flow-row gap-x-3 gap-y-2 justify-start items-start
        " value="available">
          {
            Array.from({ length: 14 }).map((_, index) => (
                <RoomCardNew
                    roomId={"001"}
                    creatorName={"Musashi"}
                    mapName={`Ninja Village (12x12)`}
                    stakeValue={"500"}
                    playerCount={2}
                    maxPlayers={4}
                    roomJoinable={true}
                  />
            ))
          }
        </TabsContent>
        <TabsContent value="playing">Those on-going matches</TabsContent>
        <TabsContent value="all">All that is playing</TabsContent>
      </Tabs>
      

      {/* Create Room Buttons and Modal */}
      <Dialog>
        <div className="flex items-center justify-end gap-3 my-2 mt-4 ml-auto px-4">
          <DialogTrigger
            className="text-3xl sm:text-2xl text-white
            py-2 px-8
            "
            style={{
              backgroundImage: `url(${buttonCardImageUrl})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
            //onClick={onOpenCreateRoomModal}
          >
            Create Room +
          </DialogTrigger>
          <DialogTrigger
            className="text-3xl sm:text-2xl text-white
            py-2 px-8
            "
            style={{
              backgroundImage: `url(${buttonCardImageUrl})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
            onClick={onOpenCreateRoomModal}
          >
            Quick Join
          </DialogTrigger>
        </div>
        <DialogContent className="
        max-w-full w-2/5 bg-transparent
        flex flex-col justify-start items-center
        "
        showCloseButton={false}
        style={{ 
          backgroundImage: `url(${modalCardContainerImageUrl})`,
          backgroundSize: "114% 132%",
          backgroundPosition: "50% 70%",
          backgroundRepeat: "no-repeat",  
        }}
        >
            <div className="flex justify-center items-start 
            text-5xl pb-4 pt-2 w-full text-white font-semibold
            
            ">
              <span>Create Room</span>
            </div>
            <DialogDescription className="flex flex-col justify-center items-center gap-4
            w-full h-1/2 text-4xl text-white py-0
            "
            >

              {/* stake eth */}
              <div className="flex justify-center items-center w-2/3">
                <span className="px-2 py-2 text-4xl text-nowrap text-sky-200
                flex items-center flex-nowrap w-[17em]
                ">
                  <FaEthereum className="text-violet-300 mx-2"/>
                  <span className="mr-2">Stake ETH</span>
                </span>
                  <input
                    type="number"
                    value={stakeValue}
                    onChange={(e)=>setStakeValue(parseFloat(e.target.value))}
                    step={0.01}
                    min={0.01}
                    className="w-full rounded-md text-center 
                    bg-gray-900 text-sky-200 text-xl px-2 py-2
                    border-none
                    "
                    name="minstake"
                  />
              </div>
              
              {/* map size */}
              <div className="flex justify-center items-center w-2/3">
                <span className="px-2 py-2 text-4xl text-nowrap text-sky-200
                flex items-center flex-nowrap w-[17em]
                ">
                  
                  <RiTreasureMapFill className="text-cyan-300 mx-2"/>
                  <span className="mr-2">Map Size</span>
                </span>

                <select
                    className="rounded-lg text-center px-2 py-2 bg-gray-900 text-sky-200 text-xl
                    w-full
                    "
                    name="mapsize"
                  >
                    <option value="8x8">8x8</option>
                    <option value="10x10">10x10</option>
                    <option value="12x12">12x12</option>
                  </select>

              </div>
              
            </DialogDescription>

            {/* bottom buttons */}
            <DialogFooter className="w-full flex justify-start items-center
              mb-4 mt-0
              ">

                {/* Cancel Button */}
                <DialogClose>
                  <button
                    className="
                    flex justify-center items-center
                    text-4xl text-white font-semibold p-4 px-8"
                    style={{ 
                      backgroundImage: `url(${buttonContainerImageUrl})`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    Cancel
                  </button>
                </DialogClose>

                <button
                  className="flex justify-center items-center
                  text-4xl text-white font-semibold p-4 px-8"
                  style={{
                    backgroundImage: `url(${buttonContainerImageUrl})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                  }}
                  onClick={()=>{}}
                >
                  Create Room +
                </button>
                
              </DialogFooter>


          </DialogContent>
        </Dialog>

      </div>
    )
}
