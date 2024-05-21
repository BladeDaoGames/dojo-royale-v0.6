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
    <div
        className="w-full flex items-center 
        rounded-b-lg overflow-hidden
        "
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "0% 0%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* settings popup */}
        {/* {showSettings && <SettingsPopup onClose={toggleSettings} />} */}

        {/* show logo only after login play homepage */}
        {getHomePage ? (
          <>
            {/* Sound Icon */}
            <motion.div
              whileHover={ButtonHoverAnimation}
              onClick={flipMuteState}

              style={{
                backgroundImage: `url(${getMutedState? volumeMuteIconUrl: volumeOnIconUrl})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}

              className="
              text-6xl text-white
              h-[1em] aspect-square mx-8 my-2
              cursor-pointer ml-auto
              "
              />
          </>

        ) : (
          <>

            {/* Logo */}
            <div
              className="flex items-center
              h-full
              "
              onClick={onBackClick}
              style={{
                backgroundImage: `url(${titleBackgroundImageUrl})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "0% 0%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <motion.div whileHover={ButtonHoverAnimation}
                className=" text-4xl sm:text-2xl text-white cursor-pointer 
                flex justify-center items-center font-bold
                px-8 py-2 mr-16
                ">
                  LOOT ROYALE
              </motion.div>
            </div>
            
            {/* Wallet div, height based on sound icon 1em + configs */}
            <div className="flex items-center gap-x-2 py-2
            text-white ml-auto h-full
            ">

              {/* show address or create burner */}
              {account.account.address ? (

                // show address text
                <button
                  className="text-3xl sm:text-2xl px-4"
                  onClick={()=>{}}
                >
                  {formatAddress(account.account.address)}
                </button>
              ) : (

                // show create burner button
                <button
                  className="text-3xl sm:text-2xl px-4"
                  onClick={()=>account?.create()}
                >
                 {account?.isDeploying ? "deploying burner..." : "Create Burner"}
                </button>
              )}

              {/* settings icon/button */}
              <div
                className="mr-4 cursor-pointer 
                h-full aspect-square
                "
                style={{
                  backgroundImage: `url(${settingIconImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={toggleSettings}
              />
            </div>

          </>
        )}
      </div>
  );
};
