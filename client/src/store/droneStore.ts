import {create} from 'zustand';
import { type CarouselApi } from "@/components/ui/carousel"


interface droneStoreState {
    droneCarouselApi: CarouselApi;
    setDroneCarouselApi: (value: CarouselApi) => void;
}
export const useDroneStore = create<droneStoreState>((set) => ({
    droneCarouselApi: undefined,
    setDroneCarouselApi: (value: CarouselApi) => set({droneCarouselApi: value}),
}));
