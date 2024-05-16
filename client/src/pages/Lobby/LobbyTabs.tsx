import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from './Search';
import { RoomCardNew } from './RoomCardNew'

export const LobbyTabs = () => {
  const handleSearch = (searchQuery: string) => {
    // Logic to handle search action, e.g., filtering rooms
  };

  return (
    <div className="border border-green-700 h-full flex flex-col">
      <Tabs defaultValue="account" className="w-full flex-grow
      flex flex-col justify-start items-center
      border-2 border-purple-500">


        <TabsList className="w-full flex
          bg-transparent px-0 rounded-t-xl overflow-hidden
          border-2 border-pink-500
          ">
          <Search onSearch={handleSearch} />
          <TabsTrigger className="text-xl font-bold text-white/50 rounded-t-xl" value="available">Available</TabsTrigger>
          <TabsTrigger className="text-xl font-bold text-white/50 rounded-t-xl" value="playing">Playing</TabsTrigger>
          <TabsTrigger className="text-xl font-bold text-white/50 rounded-t-xl" value="all">ALL</TabsTrigger>
        </TabsList>


        <TabsContent className="p-4 overflow-y-auto 
        w-full flex-grow
        grid grid-cols-2 grid-flow-row gap-x-3 gap-y-2 justify-start items-start
        border border-yellow-400
        " value="available">
          {
            Array.from({ length: 10 }).map((_, index) => (
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
    </div>
  )
}
