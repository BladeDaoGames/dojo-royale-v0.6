import React, { useState } from "react";
import { motion } from "framer-motion";
import {formatAddress } from "@/utils";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import SettingsPopup from "./SettingsPopup";

// wallets
import { useDojo } from "@/dojo/useDojo";

// Asset Paths
import { backgroundImageUrl, titleBackgroundImageUrl, 
  settingIconImageUrl, volumeMuteIconUrl, 
  volumeOnIconUrl } from "@/constants/assetPaths";

interface NavbarProps {
  onBackClick: () => void;
  getHomePage: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onBackClick, getHomePage }) => {
  const [getMutedState, setMutedState] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const ButtonHoverAnimation = {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  };

  const {
    account,
  } = useDojo();


  const flipMuteState = () => {
    setMutedState(!getMutedState);
  };
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  return (
    <div className="w-full relative z-50 rounded-b-lg overflow-hidden">
      {showSettings && <SettingsPopup onClose={toggleSettings} />}
      <div
        className="w-full h-[7em] flex justify-between items-center gap-10 py-4"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {getHomePage ? (
          <div className="text-6xl text-white pr-10 flex ml-auto">
            <motion.div
              whileHover={ButtonHoverAnimation}
              onClick={flipMuteState}
            >
              {getMutedState ? (
                <div
                  style={{
                    backgroundImage: `url(${volumeMuteIconUrl})`,
                  }}
                  className="cursor-pointer bg-contain bg-no-repeat bg-center w-[56px] h-[56px] 2.5xl:w-[64px] 2.5xl:h-[64px] 3xl:w-[80px] 3xl:h-[80px]"
                />
              ) : (
                <div
                  style={{
                    backgroundImage: `url(${volumeOnIconUrl})`,
                  }}
                  className="cursor-pointer bg-contain bg-no-repeat bg-center w-[56px] h-[56px] 2.5xl:w-[64px] 2.5xl:h-[64px] 3xl:w-[80px] 3xl:h-[80px]"
                />
              )}
            </motion.div>
          </div>
        ) : (
          <>
            <div
              className="flex items-center gap-4 py-5 -mt-3 w-1/4"
              onClick={onBackClick}
              style={{
                backgroundImage: `url(${titleBackgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <motion.div whileHover={ButtonHoverAnimation}>
                <div className=" text-4xl 3xl:text-5xl text-white cursor-pointer text-center ml-6 font-extrabold">
                  LOOT ROYALE
                </div>
              </motion.div>
            </div>

            <div className="text-white flex gap-5 ml-auto">
              {account.account.address ? (
                <button
                  className="text-3xl 3xl:text-4xl"
                  onClick={()=>{}}
                >
                  {formatAddress(account.account.address)}
                </button>
              ) : (
                <button
                  className="text-3xl 3xl:text-4xl"
                  onClick={()=>account?.create()}
                >
                 {account?.isDeploying ? "deploying burner..." : "Create Burner"}
                </button>
              )}

              <div
                className="mr-4 w-[56px] h-[56px] 2.5xl:w-[64px] 2.5xl:h-[64px] 3xl:w-[80px] 3xl:h-[80px] bg-no-repeat bg-contain bg-center cursor-pointer"
                style={{
                  backgroundImage: `url(${settingIconImageUrl})`,
                }}
                onClick={toggleSettings}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
