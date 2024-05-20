import {create} from 'zustand';
import { type CarouselApi } from "@/components/ui/carousel"


interface mapSelectStoreState {
    mapSelectCarouselApi: CarouselApi;
    setMapSelectCarouselApi: (value: CarouselApi) => void;
}
export const useMapSelectStore = create<mapSelectStoreState>((set) => ({
    mapSelectCarouselApi: undefined,
    setMapSelectCarouselApi: (value: CarouselApi) => set({mapSelectCarouselApi: value}),
}));