import React, {useState} from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from './Search';
import { RoomCardNew } from './RoomCardNew';
import { buttonCardImageUrl, modalCardContainerImageUrl, 
  buttonContainerImageUrl, dropdownImageUrl } from '@/constants/assetPaths';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const LobbyTabs = () => {
  const [createRoomModalStatus, setOpenCreateRoomModal] = useState(false);
  const onOpenCreateRoomModal = () => setOpenCreateRoomModal(true);
  const handleSearch = (searchQuery: string) => {
    // Logic to handle search action, e.g., filtering rooms
  };

  return (
    <div className="h-full w-full flex flex-col">
    <Tabs defaultValue="available" 
      className="w-full h-full overflow-y-hidden
      flex flex-col justify-start items-center
      ">


        <TabsList className="w-full flex
          bg-transparent px-0 py-4 rounded-t-xl overflow-hidden
          ">
          <Search onSearch={handleSearch} />
          <TabsTrigger className="text-xl font-bold text-white/50 rounded-t-xl" value="available">Available</TabsTrigger>
          <TabsTrigger className="text-xl font-bold text-white/50 rounded-t-xl" value="playing">Playing</TabsTrigger>
          <TabsTrigger className="text-xl font-bold text-white/50 rounded-t-xl" value="all">ALL</TabsTrigger>
        </TabsList>


        <TabsContent className="p-4 overflow-y-auto 
        w-full flex-grow
        grid grid-cols-2 grid-flow-row gap-x-3 gap-y-2 justify-start items-start
        " value="available">
          {
            Array.from({ length: 12 }).map((_, index) => (
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
      

      {/* Create Room Buttons */}
      <Dialog>
        <div className="flex items-center justify-end gap-3 my-2 ml-auto px-4">
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
        w-[1138px] h-[320px] bg-transparent border-none
        "
        showCloseButton={false}
        style={{ 
          backgroundImage: `url(${modalCardContainerImageUrl})`,
          backgroundSize: "114% 132%",
          backgroundPosition: "50% 70%",
          backgroundRepeat: "no-repeat",  
        }}
        >
          </DialogContent>
        </Dialog>

      </div>
    )
}
