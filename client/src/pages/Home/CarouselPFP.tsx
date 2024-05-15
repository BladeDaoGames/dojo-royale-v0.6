import React, {useRef, useEffect} from 'react';

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

import { arrowKeyImageUrl, pfpCardImageUrl } from '@/constants/assetPaths';

import { usePfpStore } from '@/store/pfpStore';


export const CarouselPFP = () => {

    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);
    //const [api, setApi] = React.useState<CarouselApi>()
    const { pfpCarouselApi, setPfpCarouselApi } = usePfpStore();
    
    useEffect(() => {
        if (!pfpCarouselApi) {
          return
        }
     
        pfpCarouselApi.on("select", () => {
          // Do something on select.
          //console.log("Selected Pilot:", pfpCarouselApi.selectedScrollSnap())
        })
      }, [pfpCarouselApi])

    return (
        <div className="flex items-center justify-between 
                        w-full h-[10em] my-2 mb-3
                        z-20
                        ">

                        {/* Left Arrow */}
                        <div
                            onClick={() => prevButtonRef.current?.click()}
                            style={{
                            backgroundImage: `url(${arrowKeyImageUrl})`,
                            transform: "scaleX(-1)",
                            backgroundSize: "100% 118%",
                            backgroundPosition: "0% 0%",
                            backgroundRepeat: "no-repeat", 
                            }}
                            className="text-arrow-colour-grey w-full h-full
                            hover:cursor-pointer
                            "
                        />

                        <Carousel className="
                                    border-4 border-blue-300/80
                                    rounded-2xl 
                                    w-full h-full
                                    flex items-center justify-center
                                    overflow-hidden
                                "
                            setApi={setPfpCarouselApi}
                                >
                            <CarouselContent className="">
                                {pfpCardImageUrl.map((imageUrl, index) => (
                                    <CarouselItem key={index} 
                                        className="flex justify-center items-center
                                        h-[150px] aspect-square
                                        "
                                        style={
                                            {
                                                backgroundImage: `url(${imageUrl})`,
                                                backgroundSize: "104% 118%",
                                                backgroundPosition: "-50% 0%",
                                                backgroundRepeat: "no-repeat",
                                            }
                                        }
                                    >
                                        {/* <img className="border border-green-700"
                                        src={imageUrl} alt="pfp" /> */}
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            
                            <CarouselPrevious className="hidden" ref={prevButtonRef} />
                            <CarouselNext className="hidden" ref={nextButtonRef}/>
                        </Carousel>
                        
                        {/* Right Arrow */}
                        <div
                            onClick={() => nextButtonRef.current?.click()}
                            style={{ 
                            backgroundImage: `url(${arrowKeyImageUrl})`,
                            backgroundSize: "100% 118%",
                            backgroundPosition: "0% 0%",
                            backgroundRepeat: "no-repeat"
                        }}
                            className="text-arrow-colour-grey w-full h-full
                            hover:cursor-pointer
                            "
                        />

                        </div>
        
  )
}
