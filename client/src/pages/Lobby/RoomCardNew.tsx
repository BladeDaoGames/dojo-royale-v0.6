import { roomCardImageUrl, ethIconImageUrl,
  profileIconImageUrl, cardDetailLineDivisorImageUrl,
  smallJoinButtonContainerImageUrl, smallPlayingButtonContainerImageUrl,
  waitstatusCardImageUrl
 } from "@/constants/assetPaths";
 import { FaEthereum, FaUser } from "react-icons/fa";


interface RoomCardProps {
  roomId: string;
  mapName: string;
  creatorName: string;
  stakeValue: string;
  playerCount: number;
  maxPlayers: number;
  roomJoinable: boolean;
}

export const RoomCardNew = ({
  roomId,
  mapName,
  creatorName,
  stakeValue,
  playerCount,
  maxPlayers,
  roomJoinable,
}: RoomCardProps) => {
  return (
    <div
      className="w-full text-white h-[8em] sm:h-[6em]
      bg-gray-700/50 rounded-md
      flex justify-start items-center
      px-2
      border border-teal-500/50
      relative
      "
    >

      {/* left status cards */}
      <div className="m-2 px-4 py-1 bg-sky-900/50 w-[11em] sm:w-[9em] rounded-md 
      flex flex-col gap-y-1 text-3xl sm:text-sm border
      "
      style={
        {
          backgroundImage: `url(${waitstatusCardImageUrl})`,
          backgroundSize: "101% 100%",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }
      }
      >

        {/* Eth detail block */}
        <div className="flex flex-nowrap items-center justify-start py-1
        
        ">
          <FaEthereum className="text-violet-950"/>
          <span className="ml-auto font-semibold flex justify-end mr-2">
            {stakeValue}
          </span>
        </div>
        
        {/* player number in room block */}
        <div className="flex flex-nowrap items-center justify-start py-1
        
        ">
          <FaUser className="mx-1 text-cyan-950/80" />
          <span className="ml-auto text-sky-200 font-semibold flex justify-end mr-2">
            {playerCount}/{maxPlayers}
          </span>
        </div>
        
      </div>

      {/* right info block */}
      <div className="w-full flex flex-col gap-y-1 text-sky-200 
      text-3xl sm:text-sm
      ">
        <div className="flex justify-between items-center px-3 py-1">
          <span>No. {roomId}</span>
          <span>{mapName}</span>
        </div>

        <div className="felx justify-start items-center px-3 py-1">
          <span>{creatorName}</span>
        </div>


      </div>
      
        <button
          className="w-[6em] sm:w-[3.5em] flex justify-center items-center py-1 px-4 sm:text-sm text-2xl text-white font-bold
          absolute bottom-0 right-0 mb-2.5 mr-5
          "
          style={{
            backgroundImage: `url(${roomJoinable?smallJoinButtonContainerImageUrl: smallPlayingButtonContainerImageUrl})`,
            backgroundSize: "110% 120%",
            backgroundPosition: "50% -2%",
            backgroundRepeat: "no-repeat",
          }}
        >
            {roomJoinable ? "Join" : "Spectate"}
        </button>
    </div>
  );
};
