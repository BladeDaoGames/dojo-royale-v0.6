import React, {ReactNode, useEffect, useRef} from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";

import { useMapSelectStore } from '@/store';

import { cn } from "@/lib/utils"
import { defaultMapImageUrl, arrowKeyImageUrl, mapsImageUrlarray } from '@/constants/assetPaths';


interface MapSelectCarouselItemProps {
    className?: string;
    title?:string;
    children?: ReactNode;
    // Add other props if CarouselItem accepts any specific props
}

const MapSelectCarouselItem: React.FC<MapSelectCarouselItemProps> = ({
        className, title, children, ...props}) =>{
    return (
        <CarouselItem className={cn(`aspect-square flex flex-col justify-start items-center
        px-10
        `,
            className)} {...props}

                    style={{
                        backgroundImage: `url(${defaultMapImageUrl})`,
                        backgroundSize: "104% 104%",
                        backgroundPosition: "40% -75%",
                        backgroundRepeat: "no-repeat",
                    }}>
                        <div className="w-full flex justify-center items-center
                        text-sky-300 text-2xl font-normal my-2 mb-4
                        ">
                            {title}
                        </div>
                        {children}
            </CarouselItem>
    )
}

export const MapSelectionCarousel = () => {
    
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);
    const { mapSelectCarouselApi, setMapSelectCarouselApi } = useMapSelectStore();

    useEffect(() => {
        if (!mapSelectCarouselApi) {
          return
        }
     
        mapSelectCarouselApi.on("select", () => {
          // Do something on select.
          //console.log("Selected Pilot:", pfpCarouselApi.selectedScrollSnap())
        })
      }, [mapSelectCarouselApi])

    return (
        <div className="flex items-center w-full px-16 py-8">

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
                className="text-arrow-colour-grey w-1/5
                hover:cursor-pointer aspect-square
                "
            />

            <Carousel className="w-full h-full">
                <CarouselContent className="
                
                ">
                    {
                        mapsImageUrlarray.map((imageUrl, index) => (
                            <MapSelectCarouselItem key={index} 
                                title={imageUrl.title}
                                className="aspect-square">
                                    
                            <img src={imageUrl.url} alt={imageUrl.title} 
                                className="w-full aspect-square"
                            />
                            </MapSelectCarouselItem>
                        ))
                    }
                    
                    <MapSelectCarouselItem key={1} className="aspect-square">
                        
                    </MapSelectCarouselItem>
                    <MapSelectCarouselItem key={2} className="aspect-square">
                        
                    </MapSelectCarouselItem>
                </CarouselContent>

                <CarouselPrevious 
                    ref={prevButtonRef}
                    className="hidden">Previous</CarouselPrevious>
                <CarouselNext 
                    ref={nextButtonRef}
                    className="hidden">Next</CarouselNext>
            </Carousel>
                
                {/* right arrow */}
                <div
                    onClick={() => nextButtonRef.current?.click()}
                    style={{ 
                    backgroundImage: `url(${arrowKeyImageUrl})`,
                    backgroundSize: "100% 118%",
                    backgroundPosition: "0% 0%",
                    backgroundRepeat: "no-repeat"
                }}
                    className="text-arrow-colour-grey w-1/5 aspect-square
                    hover:cursor-pointer
                    "
                />
        </div>
    )
}
