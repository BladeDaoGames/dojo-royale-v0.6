import React, {useEffect} from 'react';
import { progressBarContainerImageUrl, 
    progressBarImageUrl } from '@/constants/assetPaths';
import { useTxnSenderStore } from '@/store/txnSenderStore';

export const TxnSender = () => {
    const { txnCountDown, decrementTxnCountDown } = useTxnSenderStore();
    //count down timer
    useEffect(() => {
        const interval = setInterval(() => {
            decrementTxnCountDown();
        }, 1000);
        return () => clearInterval(interval);
    }
    , []);

    return (
        <div className="w-[480px] 
            flex items-center
            ">
            <div
                className="w-full bg-transparent rounded-lg
                    mb-1 flex flex-nowrap justify-start items-center
                    px-1 h-[30px] mr-auto
                "
                style={{
                    backgroundImage: `url(${progressBarContainerImageUrl})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "0% 0%",
                    backgroundRepeat: "no-repeat",
                }}
                >
                    <div className="w-[10em] h-[12px]" 
                        style={{
                            backgroundImage: `url(${progressBarImageUrl})`,
                            backgroundSize: "100% 100%",
                            backgroundPosition: "100% 50%",
                            backgroundRepeat: "no-repeat",
                            }}
                    />
                </div>
            
            {/* Countdown */}
            <span className="text-sky-300 font-semibold
            w-[7em] px-2 mx-2
            flex flex-nowrap text-nowrap justify-center items-center
            ">{txnCountDown==0? "txn send..": txnCountDown}</span>
        </div>
    )
}
