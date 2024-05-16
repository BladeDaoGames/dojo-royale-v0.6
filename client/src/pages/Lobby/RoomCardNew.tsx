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
      className="w-full text-white h-[8em]
      bg-gray-700/50 rounded-md
      flex justify-start items-center
      px-2
      border border-sky-400
      relative
      "
    >

      {/* left status cards */}
      <div className="m-2 px-2 py-1 bg-sky-900/50 w-[11em] rounded-md 
      flex flex-col gap-y-1
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
        <div className="flex flex-nowrap items-center justify-start px-3 py-1
        ">
          <FaEthereum className="text-3xl text-indigo-400/80"/>
          <span className="ml-auto text-3xl font-semibold">
            {stakeValue}
          </span>
        </div>
        
        {/* player number in room block */}
        <div className="flex flex-nowrap items-center justify-start px-2 py-1
        ">
          <FaUser className="text-3xl mx-1 text-cyan-950/80" />
          <span className="ml-auto text-3xl text-sky-200 font-semibold">
            {playerCount}/{maxPlayers}
          </span>
        </div>
        
      </div>

      {/* right info block */}
      <div className="w-full flex flex-col gap-y-1 text-sky-200 text-2xl
      
      ">
        <div className="flex justify-between items-center px-3 py-1 text-3xl">
          <span>No. {roomId}</span>
          <span>{mapName}</span>
        </div>

        <div className="felx justify-start items-center px-3 py-1 text-3xl">
          <span>{creatorName}</span>
        </div>


      </div>
      
        <button
          className="w-[6em] h-12 text-2xl text-white font-bold
          absolute bottom-0 right-0 mb-2.5 mr-5
          "
          style={{
            backgroundImage: `url(${roomJoinable?smallJoinButtonContainerImageUrl: smallPlayingButtonContainerImageUrl})`,
            backgroundSize: "110% 120%",
            backgroundPosition: "50% -2%",
            backgroundRepeat: "no-repeat",
          }}
        >
            {roomJoinable ? "Join" : "Playing"}
        </button>
    </div>
  );
};
