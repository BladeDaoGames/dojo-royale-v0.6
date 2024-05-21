import { create } from 'zustand';
import { secondsTillTxnSend } from '@/config';

interface TxnSenderStoreState {
    txnCountDown: number;
    decrementTxnCountDown: () => void;  // No parameter needed since we're decrementing by 1 each time
}

export const useTxnSenderStore = create<TxnSenderStoreState>((set) => ({
    txnCountDown: secondsTillTxnSend,
    decrementTxnCountDown: () => set(state => ({
        txnCountDown: state.txnCountDown - 1 <= -1 ? 
            secondsTillTxnSend : 
            state.txnCountDown - 1
    })),
}));