import Phaser from "phaser";
import { useEffect, useRef } from "react";

/**
 * usePhaserGame hook is used to integrate Phaser into the React application. Acting as a middleware
 * @param config receives a config of phaser game
 * @returns returns a reference of a phaser game object
 */
export const usePhaserGame = (config: Phaser.Types.Core.GameConfig) => {
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  useEffect(() => {
    if (phaserGameRef.current) return;

    phaserGameRef.current = new Phaser.Game(config);

    return () => {
      phaserGameRef.current?.destroy(true);
      phaserGameRef.current = null;
    };
  }, []);
  return phaserGameRef;
};
