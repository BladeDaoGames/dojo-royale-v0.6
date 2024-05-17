import React, { useEffect } from 'react';

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useDroneStore } from '@/store';

import { characterCardImageUrl } from "@/constants/assetPaths";


export const DroneCarousel = () => {

    const { droneCarouselApi, setDroneCarouselApi } = useDroneStore();

    useEffect(() => {
        if (!droneCarouselApi) {
          return
        }
     
        droneCarouselApi.on("select", () => {
          // Do something on select.
          console.log("Selected Pilot:", droneCarouselApi.selectedScrollSnap())
        })
      }
    , [droneCarouselApi])

    return (
        <Carousel className="w-full" setApi={setDroneCarouselApi}>
            <CarouselContent className="">
                {Object.keys(characterCardImageUrl).map((k)=>characterCardImageUrl[k]).map((_, index) => (
                    <CarouselItem key={index} className="flex justify-center">
                        <Card className="aspect-square 
                        rounded-2xl overflow-hidden 
                        bg-transparent border-2 border-cyan-400/50
                        w-[15vh] h-[15vh]
                        " 
                            style={{
                                backgroundImage: `url(${characterCardImageUrl[index]})`,
                                backgroundSize: "180%",
                                backgroundPosition: "center center",
                            }}
                        />
                    </CarouselItem>
                ))} 
            </CarouselContent>
            <CarouselPrevious className="left-20 sm:left-10 bg-blue-300/30 cursor-pointer"/>
            <CarouselNext className="right-20 sm:right-10 bg-blue-300/30 cursor-pointer"/>
        </Carousel>
  )
}
