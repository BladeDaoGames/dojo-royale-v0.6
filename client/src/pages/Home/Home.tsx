import React, {useState} from 'react';
import { Navbar, SocialLink } from '@/components';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '@/constants/routing/routePath';
import { BasePage } from '../Base';
import { motion } from "framer-motion";

import { GiPlasticDuck } from "react-icons/gi";
import { BsDiscord } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { BsTrashFill } from "react-icons/bs";

import { Spinner } from "@/components/ui/spinner";

// wallets
import { useDojo } from "@/dojo/useDojo";
import { formatAddress } from '@/utils';

// asset paths
import { homeCardImageUrl, playerNameCardImageUrl, 
  buttonCardImageUrl, buttonCardShortImageUrl, 
  arrowKeyImageUrl } from '@/constants/assetPaths';

export const Home = () => {
  const navigate = useNavigate();
  const title = "LOOT ROYALE".split("");
  const [getPlay, setPlay] = useState(false);
  
  const {
    account,
  } = useDojo();

  const handleSetPlay = () => {
    setPlay(true);
    console.log(getPlay);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 1000,
        damping: 10,
        mass: 1,
      },
    },
  };

  return (
    <BasePage>
         <Navbar onBackClick={()=>navigate(ROUTES.home)} getHomePage={true}/>
    
          <div className="w-full flex-grow
          flex justify-center items-start
          pt-2
          ">


          {getPlay ? 

              // Render this card if getPlay is true
              (
                <div
                    className="flex flex-col items-center justify-center gap-4 
                    px-12 py-10 z-20 rounded-2xl overflow-hidden
                    w-[42em] h-[28em]
                    bg-white-beige-50 shadow-lg"
                    style={{ 
                      backgroundImage: `url(${playerNameCardImageUrl})`,
                      backgroundSize: "110% 130%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "50% 70%", 
                    }}
                  >

                    {/* PFP div */}
                    <div className="flex items-center justify-between 
                    w-full h-[10em] my-2 mb-3
                    z-20
                    ">
                      <div
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

                      <GiPlasticDuck className="border-4 border-blue-300/80
                      rounded-2xl 
                      bg-logo-background-dark-grey w-full h-full" />
                      
                      <div
                        style={{ 
                        backgroundImage: `url(${arrowKeyImageUrl})`,
                        backgroundSize: "100% 118%",
                        backgroundPosition: "0% 0%",
                        backgroundRepeat: "no-repeat"
                      }}
                        className="text-arrow-colour-grey w-full h-full
                        hover:cursor-pointer
                        "
                      ></div>
                    </div>
                    

                    {/* Registration Div */}
                    <div className="flex items-center justify-between gap-2
                    w-full
                    ">
                      <input
                        type="text"
                        className="w-[12em]
                        py-2 pb-2.5 px-5
                        flex items-center rounded-lg 
                        border-2 border-dark-gray-200 text-3xl"
                        placeholder="Register Name"
                        maxLength={31}
                      />

                      <button className="text-white bg-yellow-500
                      flex-grow flex items-center justify-center
                      py-3 px-4 rounded-lg font-semibold text-2xl
                      hover:bg-yellow-700
                      ">
                        Register Name
                      </button>

                    </div>
                    
                    {/* buttons div */}
                    <div className="flex gap-2 items-center justify-start text-white
                     w-full
                    ">
                      
                      {/* create burner */}
                      <button
                        style={{ backgroundImage: `url(${buttonCardImageUrl})`,
                        backgroundSize: "100% 105%",
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat", }}

                        onClick={() => account?.create()}
                        className="shadow-lg
                        flex justify-center items-center
                        text-nowrap
                        text-2xl py-5 px-3 font-semibold cursor-pointer
                        "
                      >
                        {account?.isDeploying ? <Spinner className="text-gray-700" size="medium"/> : "Create Burner"}
                      </button>
                      
                      {/* clear burner */}
                      <button
                        className="
                        shadow-lg
                        flex justify-center items-center
                        rounded-lg
                        text-2xl py-5 px-3 font-semibold cursor-pointer
                        "
                        onClick={() => account.clear()}
                        style={{ backgroundImage: `url(${buttonCardImageUrl})`,
                        backgroundSize: "120% 105%",
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat", }}
                      >
                        <BsTrashFill
                          className="text-4xl text-gray-500 cursor-pointer
                          
                          "
                        />
                      </button>

                      {/* select burner */}
                        <select
                            className="h-[3em] w-[10em] flex-grow px-2 
                            rounded-lg overflow-hidden
                            text-gray-800 font-semibold text-2xl
                            "
                            value={account ? account.account.address : ""}
                            onChange={(e) => account.select(e.target.value)}
                        >
                            {
                            account?.count>0 ?
                            account?.list().map((account, index) => {
                                return (
                                    <option value={account.address} key={index}>
                                        {formatAddress(account.address)}
                                    </option>
                                );
                            })
                            :
                            <option value="Create Burner Pls" key={0}>
                                No Burner Found
                            </option>
                            }
                        </select>
                      

                      <button
                        style={{ backgroundImage: `url(${buttonCardImageUrl})`,
                        backgroundSize: "120% 105%",
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat", }}

                        onClick={()=>navigate(ROUTES.waiting)}
                        className="shadow-lg
                        flex justify-center items-center 
                        w-[3em] rounded-lg overflow-hidden
                        text-2xl py-5 px-5 font-semibold cursor-pointer
                        "
                      >
                        Play
                      </button>

                    </div>

                  </div>
              ) 

              :              
              // Render this card if getPlay is false
              (    
                <div
                    className="flex flex-col items-center justify-start 
                    w-[42em] h-[28em] p-5 z-20 rounded-3xl overflow-hidden
                    text-white"
                    style={{
                      backgroundImage: `url(${homeCardImageUrl})`,
                      backgroundSize: "110% 120%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "50% 70%",
                    }}
                  >
                    <div className="flex flex-col flex-grow items-center justify-start 
                    w-full pt-6
                    ">
                      
                      {/* Title */}
                      <motion.div
                        className="text-5xl font-semibold mb-auto text-white"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {title.map((letter, index) => (
                          <motion.span key={index} variants={letterVariants}>
                            {letter}
                          </motion.span>
                        ))}
                      </motion.div>
                      
                      {/* Play Button */}
                      <button
                        style={{ 
                          backgroundImage: `url(${buttonCardImageUrl})`,
                          backgroundSize: "100% 100%",
                          backgroundPosition: "50% 50%",
                          backgroundRepeat: "no-repeat",
                        }}
                        onClick={handleSetPlay}
                        className="shadow-lg
                        flex justify-center items-center 
                        w-[8em]
                        text-4xl my-1 py-5 px-2 font-semibold cursor-pointer"
                      >
                        Play
                      </button>
                      
                      {/* How to Play Button */}
                      <button
                        style={{ 
                          backgroundImage: `url(${buttonCardShortImageUrl})`,
                          backgroundSize: "100% 100%",
                          backgroundPosition: "50% 50%",
                          backgroundRepeat: "no-repeat",
                        }}
                        onClick={() => {}}
                        className="shadow-lg
                        flex justify-center items-center 
                        w-[8em]
                        text-4xl my-1 py-5 px-2 font-semibold cursor-pointer"
                      >
                        How to Play
                      </button>
                      
                      {/* Socials Row */}
                      <div className="flex justify-between items-center 
                      w-full mt-8 py-4 pr-4
                      text-3xl text-white
                      ">
                        <div className="flex gap-6 ml-auto">
                          <SocialLink icon={<FaTwitter />} label="Twitter" className="" />
                          <SocialLink
                            icon={<BsDiscord />}
                            label="Discord"
                            className=" pr-4"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                )}
          </div>
    </BasePage>
  )
}