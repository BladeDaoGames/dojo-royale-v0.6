import { AccountInterface } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { Direction, updatePositionWithDirection } from "../utils";
import {
    getEntityIdFromKeys,
    getEvents,
    setComponentsFromEvents,
} from "@dojoengine/utils";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { client }: { client: IWorld },
    contractComponents: ContractComponents,
    { Player, Game }: ClientComponents
) {
    const register_player = async (
        account: AccountInterface,
        name: string,
        profile_pic: number
      ) => {
        try {
          const { transaction_hash } = await client.lobby.register_player({
            account,
            name,
            profile_pic,
          });
          console.log(
            await account.waitForTransaction(transaction_hash, {
              retryInterval: 100,
            })
          );
          setComponentsFromEvents(
            contractComponents,
            getEvents(
              await account.waitForTransaction(transaction_hash, {
                retryInterval: 100,
              })
            )
          );
        } catch (e) {
          console.log(e);
        } finally {
        }
      };
    
      const set_profile_pic = async (
        account: AccountInterface,
        profile_pic: number
      ) => {
        try {
          const { transaction_hash } = await client.lobby.set_profile_pic({
            account,
            profile_pic,
          });
    
          console.log(
            await account.waitForTransaction(transaction_hash, {
              retryInterval: 100,
            })
          );
    
          setComponentsFromEvents(
            contractComponents,
            getEvents(
              await account.waitForTransaction(transaction_hash, {
                retryInterval: 100,
              })
            )
          );
        } catch (e) {
          console.log(e);
        } finally {
        }
      };

    return {
        register_player,
        set_profile_pic,
    };
}
