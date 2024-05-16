import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const LobbyTabs = () => {
  return (
    <div className="border border-green-700">
      <Tabs defaultValue="account" className="w-full">


        <TabsList className="w-full flex
          bg-transparent px-0 rounded-t-xl overflow-hidden
          border border-yellow-400
          ">
            <input type='text' className="mr-auto ml-2 rounded-lg border border-slate-800 text-xl
              px-2 py-1
            "
              placeholder='Search room by owner or room id'
            />
          <TabsTrigger className="text-xl font-bold text-black rounded-t-xl" value="available">Available</TabsTrigger>
          <TabsTrigger className="text-xl font-bold text-black rounded-t-xl" value="playing">Playing</TabsTrigger>
          <TabsTrigger className="text-xl font-bold text-black rounded-t-xl" value="all">ALL</TabsTrigger>
        </TabsList>


        <TabsContent value="available">Available matches</TabsContent>
        <TabsContent value="playing">Those on-going matches</TabsContent>
        <TabsContent value="all">All that is playing</TabsContent>
      </Tabs>
    </div>
  )
}
