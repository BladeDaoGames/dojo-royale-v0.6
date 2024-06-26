import React, { useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { inventoryBoxImageUrl, inventoryCardImageUrl, 
    selectedInventoryBoxImageUrl } from "@/constants/assetPaths";
import { DroneCarousel } from "./Carousel";

export const InventoryPanel = () => {
  
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  return (
    <div
      className="
        h-full 
        flex flex-col justify-start items-center
        text-white
        py-2
        "
      style={{
        backgroundImage: `url(${inventoryCardImageUrl})`,
        backgroundSize: "103% 100%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="w-full my-2 py-2 pt-4">
        {/* <Carousel slide={false} indicators={false} className="">
          <div
            key={`drone`}
            className="
                    border-2 border-white rounded-2xl
                    w-[15vh] h-[15vh] mb-8 overflow-hidden
                    hover:border-white
                    "
            style={{
              backgroundImage: `url(./characters/animated/drone.gif)`,
              backgroundSize: "180%",
              backgroundPosition: "center center",
            }}
          />

          <div
            key={`gaser`}
            className="
                    border-2 border-white rounded-2xl
                    w-[15vh] h-[15vh] mb-8 overflow-hidden
                    hover:border-white
                    "
            style={{
              backgroundImage: `url(./characters/animated/gaser.gif)`,
              backgroundSize: "180%",
              backgroundPosition: "center center",
            }}
          />

          <div
            key={`gunner`}
            className="
                    border-2 border-white rounded-2xl
                    w-[15vh] h-[15vh] mb-8 overflow-hidden
                    hover:border-white
                "
            style={{
              backgroundImage: `url(./characters/animated/gunner.gif)`,
              backgroundSize: "180%",
              backgroundPosition: "center center",
            }}
          />
        </Carousel> */}
        <DroneCarousel />
      </div>
    
    {/* Inventory Boxes */}
      <div className="w-full 
      flex flex-col justify-start items-center
      px-2
      overflow-hidden
      ">
        <p
          className="text-2xl sm:text-base my-2 w-full
        mx-2 px-2 font-medium text-white
        flex justify-start items-center
        "
        >
          INVENTORY
        </p>

        <div
          className="grid grid-cols-4 gap-1
          w-full overflow-y-auto
          justify-center items-center"
        >
          {
            //render div below 16 times with a loop
            Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className="w-full aspect-square
                    rounded-lg
                    cursor-pointer
                    hover:border-2 hover:border-cyan-500
                    "
                style={{ backgroundImage: `url(${inventoryBoxImageUrl})`,
                        backgroundSize: "102% 102%",
                        backgroundPosition: "-50% -100%",
                        backgroundRepeat: "no-repeat",
                    }}
                onClick={() => setSelectedItem(index)}
              >
                {selectedItem === index && (
                  <div
                    className="w-[98px] h-[98px] -top-1 -left-1 absolute"
                    style={{
                      backgroundImage: `url(${selectedInventoryBoxImageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                )}
              </div>
            ))
          }
        </div>

        <p className="w-full m-2 text-lg">
          <span className="flex flex-nowrap items-center">
            <BsExclamationCircleFill className="mx-1" />
            <span className="mx-1">Select Battle Item</span>
          </span>
        </p>
      </div>

    </div>
  );
};
