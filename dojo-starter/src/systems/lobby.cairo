use starknet::{ContractAddress};

#[starknet::interface]
trait ILobby<TContractState> {
    fn register_player(self: @TContractState, name: felt252, profile_pic:u16);
    fn set_profile_pic(self: @TContractState, profile_pic: u16);
    fn selectDrone(self: @TContractState, game_id: u128, drone_id: u8);
    fn create_room(self: @TContractState, map_id: u8, minstake: u256, 
        maxplayers: u8, drone_id: u8);
    fn join_room(self: @TContractState, game_id: u128, stake: u256);
    fn leave_room(self: @TContractState, game_id: u128);
    //fn kick_user(self: @TContractState, game_id: u128, player_id: ContractAddress);
}

#[dojo::contract]
mod lobby {
    use super::{ILobby};
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use dojo_starter::models::{
        player::{Player, Drone, DroneStatus},
        drone::{Drones},
    };
    use dojo_starter::models::game::{Game, GameStatus, Vec2};
    use dojo_starter::models::config::{Config, ConfigManager, ConfigManagerTrait};
    use dojo_starter::models::coins::{
        Coin, CoinManager, CoinManagerTrait, CoinTrait, coins, ETH_TO_WEI};
    use dojo_starter::systems::utils;
    use dojo_starter::utils::{seed_gen::{make_seed}};
    use dojo_starter::types::events;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        PlayerRegistered: events::PlayerRegistered,
        ProfilePicSet: events::ProfilePicSet
    }

    #[abi(embed_v0)]
    impl LobbyImpl of ILobby<ContractState> {
        
        fn register_player(self: @ContractState, name: felt252, profile_pic: u16) {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let mut player = get!(self.world(), caller, (Player));

            //player.player_id = caller;
            player.current_game_id =0;
            player.current_slot=0;
            player.name = name;
            player.profile_pic = profile_pic;
            player.total_games = 0;
            player.total_wins = 0;
            player.total_losses = 0;
            player.ranking = 0;

            if (player.timestamp == 0) {
                player.timestamp = get_block_timestamp();
            }

            player.timestamp = get_block_timestamp();

            set!(self.world(), (player));

            emit!(self.world(), events::PlayerRegistered { player: caller, name, profile_pic })
        }

        fn set_profile_pic(self: @ContractState, profile_pic: u16) {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let mut player = get!(self.world(), caller, (Player));
            player.profile_pic = profile_pic;

            set!(self.world(), (player));

            emit!(self.world(), events::ProfilePicSet { player: caller, profile_pic })
        }

        fn selectDrone(self: @ContractState, game_id: u128, drone_id: u8) {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let mut player = get!(self.world(), caller, (Player));
            let drone = get!(self.world(), (drone_id), (Drones));

            // check if drone health is legit
            assert((drone.health > 0), 'No such Drone Id');

            set!(self.world(), (
                Drone 
            {
                player_id: caller,
                game_id: game_id,
                drone_id: drone_id,
                health: drone.health,
                atk: drone.atk,
                def: drone.def,
                spd: drone.spd,
                range: drone.range,
                artillery_range: drone.artillery_range,
                bombs_remaining: drone.bombs_remaining,
                drone_status: DroneStatus::Alive,
            }));
        }

        fn create_room(self: @ContractState, 
            map_id: u8, minstake: u256, 
            maxplayers: u8, drone_id: u8,
        ) {
            assert(ConfigManagerTrait::is_initialized(self.world()) == true, 'Not initialized');
            
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let game_id = make_seed(caller);

            let mut player:Player = get!(self.world(), caller, (Player));
            let creatorDrone:Drone = get!(self.world(), (caller,0), (Drone));

            // check if drone is more than 0 to assert that creator has a drone
            assert((creatorDrone.drone_id !=0) 
                && (creatorDrone.drone_id > 0), 
                'Lobby Drone Not Set');

            let coin: Coin = CoinManagerTrait::new(self.world()).get(1); //hard code LORDS
            let fee: u256 = coin.calc_fee(minstake);
            // transfer stake/fee from Challenger to the contract
            utils::deposit_stake(self.world(), 
                caller, 
                starknet::get_contract_address(), minstake, fee);
            
            let game = Game {
                game_id: game_id,
                map_id: map_id,
                minstake: minstake,
                currentpot: minstake,
                playercount: 1,
                maxplayers: maxplayers,

                player1: caller,
                player1_stake: minstake,
                player1_ready: false,
                player1_pos: Vec2 { x: 0, y: 0 },

                player2: utils::zero_address(),
                player2_stake: 0,
                player2_ready: false,
                player2_pos: Vec2 { x: 0, y: 0 },

                player3: utils::zero_address(),
                player3_stake: 0,
                player3_ready: false,
                player3_pos: Vec2 { x: 0, y: 0 },

                player4: utils::zero_address(),
                player4_stake: 0,
                player4_ready: false,
                player4_pos: Vec2 { x: 0, y: 0 },

                player5: utils::zero_address(),
                player5_stake: 0,
                player5_ready: false,
                player5_pos: Vec2 { x: 0, y: 0 },

                player6: utils::zero_address(),
                player6_stake: 0,
                player6_ready: false,
                player6_pos: Vec2 { x: 0, y: 0 },

                game_status: GameStatus::Lobby,
                winner: utils::zero_address(),
                winner_slot: 0,
                timestamp_start: get_block_timestamp(),
                timestamp_end: 0,
            };

            player.current_game_id = game_id;
            player.current_slot = 1;

            //transfer stake to contract

            set!(self.world(), (
                game, 
                Drone {
                player_id: caller,
                game_id: game_id,
                drone_id: creatorDrone.drone_id,
                health: creatorDrone.health,
                atk: creatorDrone.atk,
                def: creatorDrone.def,
                spd: creatorDrone.spd,
                range: creatorDrone.range,
                artillery_range: creatorDrone.artillery_range,
                bombs_remaining: creatorDrone.bombs_remaining,
                drone_status: DroneStatus::Alive,
            }, player));
        }

        fn join_room(self: @ContractState, game_id:u128, stake:u256){
            
            let caller = get_caller_address();

            // check game room object
            let mut game: Game = get!(self.world(), game_id, (Game));
            let mut player: Player = get!(self.world(), caller, (Player));
            
            // check if game is in lobby
            assert((game.game_status == GameStatus::Lobby), 'Game is not in Lobby');
            // check if number of players has maxed
            assert((game.playercount < game.maxplayers), 'Game is Full');
            // check if joiner staked minstake
            assert((stake >= game.minstake), 'Stake is not enough');

            
            let coin: Coin = CoinManagerTrait::new(self.world()).get(1); //hard code LORDS
            let fee: u256 = coin.calc_fee(stake);
            

            // assign joiner to slot
            // we are assuming the players are correctly placed in their 
            // respective slots
            if game.playercount == 2 {
                game.player2 = caller;
                game.player2_stake = stake;
                player.current_slot = 2;
            } else if game.playercount == 3 {
                game.player3 = caller;
                game.player3_stake = stake;
                player.current_slot = 3;
            } else if game.playercount == 4 {
                game.player4 = caller;
                game.player4_stake = stake;
                player.current_slot = 4;
            } else if game.playercount == 5 {
                game.player5 = caller;
                game.player5_stake = stake;
                player.current_slot = 5;
            } else if game.playercount == 6 {
                game.player6 = caller;
                game.player6_stake = stake;
                player.current_slot = 6;
            }
            
            // transfer stake to contract
            utils::deposit_stake(self.world(), 
                caller, 
                starknet::get_contract_address(), stake, fee);

            // game.currentpot += stake;
            game.playercount += 1;
            player.current_game_id = game_id;

            set!(self.world(), (game, player));

            //note: add more safety checks
        }

        fn leave_room(self: @ContractState, game_id:u128){

            let caller = get_caller_address();
            // check game room object
            let mut game:Game = get!(self.world(), game_id, (Game));
            
            let mut player:Player = get!(self.world(), caller, (Player));
            
            // check if game is in lobby
            assert((game.game_status == GameStatus::Lobby), 'Game is not in Lobby');
            
            // remove caller from his/her slot
            if player.current_slot == 6 {
                assert((game.player6 == caller), 
                'Player not in slot');
                game.player6 = utils::zero_address();
                // transfer game.player6_stake; back to player
                utils::withdraw_stake(self.world(), caller, game.player6_stake);
                game.currentpot -= game.player6_stake;
                game.player6_stake = 0;
                game.player6_ready = false;
                game.playercount -= 1;

            } else if player.current_slot == 5 {
                assert((game.player5 == caller), 
                'Player not in slot');
                game.player5 = utils::zero_address();
                // transfer game.player5_stake; back to player
                utils::withdraw_stake(self.world(), caller, game.player5_stake);
                game.currentpot -= game.player5_stake;
                game.player5_stake = 0;
                game.player5_ready = false;
                game.playercount -= 1;

            } else if player.current_slot == 4 {
                assert((game.player4 == caller), 
                'Player not in slot');
                game.player4 = utils::zero_address();
                // transfer game.player4_stake; back to player
                utils::withdraw_stake(self.world(), caller, game.player4_stake);
                game.currentpot -= game.player4_stake;
                game.player4_stake = 0;
                game.player4_ready = false;
                game.playercount -= 1;

            } else if player.current_slot == 3 {
                assert((game.player3 == caller), 
                'Player not in slot');
                game.player3 = utils::zero_address();
                // transfer game.player3_stake; back to player
                utils::withdraw_stake(self.world(), caller, game.player3_stake);
                game.currentpot -= game.player3_stake;
                game.player3_stake = 0;
                game.player3_ready = false;
                game.playercount -= 1;

            } else if player.current_slot == 2 {
                assert((game.player2 == caller), 
                'Player not in slot');
                game.player2 = utils::zero_address();
                // transfer game.player2_stake; back to player
                utils::withdraw_stake(self.world(), caller, game.player2_stake);
                game.currentpot -= game.player2_stake;
                game.player2_stake = 0;
                game.player2_ready = false;
                game.playercount -= 1;

            } else if player.current_slot == 1 {
                // Note, if player 1 leaves, the game is cancelled
                // so the routine should be elaborated
                assert((game.player1 == caller), 
                'Player not in slot');

                game.game_status = GameStatus::Cancelled;
                game.timestamp_end= get_block_timestamp();

                game.player1 = utils::zero_address();
                // return stake to player
                utils::withdraw_stake(self.world(), caller, game.player1_stake);
                // game.player1_stake
                game.player1_stake = 0;
                //game.player1_ready = false;
                //game.playercount -= 1;

                if (game.player2 != utils::zero_address()) {
                    game.player2 = utils::zero_address();
                    // return game.player2_stake;
                    utils::withdraw_stake(self.world(), caller, game.player2_stake);
                    game.player2_stake = 0;
                    let mut player2:Player = get!(self.world(), game.player2, (Player));
                    player2.current_game_id = 0;
                    player2.current_slot = 0;
                    set!(self.world(), (player2));
                }

                if (game.player3 != utils::zero_address()) {
                    game.player3 = utils::zero_address();
                    // return game.player3_stake;
                    utils::withdraw_stake(self.world(), caller, game.player3_stake);
                    game.player3_stake = 0;
                    let mut player3:Player = get!(self.world(), game.player3, (Player));
                    player3.current_game_id = 0;
                    player3.current_slot = 0;
                    set!(self.world(), (player3));
                }

                if (game.player4 != utils::zero_address()) {
                    game.player4 = utils::zero_address();
                    // return game.player4_stake;
                    utils::withdraw_stake(self.world(), caller, game.player4_stake);
                    game.player4_stake = 0;
                    let mut player4:Player = get!(self.world(), game.player4, (Player));
                    player4.current_game_id = 0;
                    player4.current_slot = 0;
                    set!(self.world(), (player4));
                }

                if (game.player5 != utils::zero_address()) {
                    game.player5 = utils::zero_address();
                    // return game.player5_stake;
                    utils::withdraw_stake(self.world(), caller, game.player5_stake);
                    game.player5_stake = 0;
                    let mut player5:Player = get!(self.world(), game.player5, (Player));
                    player5.current_game_id = 0;
                    player5.current_slot = 0;
                    set!(self.world(), (player5));
                }

                if (game.player6 != utils::zero_address()) {
                    game.player6 = utils::zero_address();
                    // return game.player6_stake;
                    utils::withdraw_stake(self.world(), caller, game.player6_stake);
                    game.player6_stake = 0;
                    let mut player6:Player = get!(self.world(), game.player6, (Player));
                    player6.current_game_id = 0;
                    player6.current_slot = 0;
                    set!(self.world(), (player6));
                }

            }
            
            set!(self.world(), (game));

            //note: add more safety checks
        }


        // change this to a utils function next time
        // fn kick_user(self: @ContractState, game_id:u128, player_id: ContractAddress){
        //     let caller = player_id;
        //     // check game room object
        //     let mut game:Game = get!(self.world(), game_id, (Game));
            
        //     let mut player:Player = get!(self.world(), player_id, (Player));

        //     // check if player in game
        //     assert((player.current_game_id == game_id), 'Player not in game');
             
        //     // check if game is in lobby
        //     assert((game.game_status == GameStatus::Lobby), 'Game is not in Lobby');
            
        //     // remove caller from his/her slot
        //     if player.current_slot == 6 {
        //         assert((game.player6 == caller), 
        //         'Player not in slot');
        //         game.player6 = utils::zero_address();
        //         // transfer game.player6_stake; back to player
        //         utils::withdraw_stake(self.world(), caller, game.player6_stake);
        //         game.currentpot -= game.player6_stake;
        //         game.player6_stake = 0;
        //         game.player6_ready = false;
        //         game.playercount -= 1;

        //     } else if player.current_slot == 5 {
        //         assert((game.player5 == caller), 
        //         'Player not in slot');
        //         game.player5 = utils::zero_address();
        //         // transfer game.player5_stake; back to player
        //         utils::withdraw_stake(self.world(), caller, game.player5_stake);
        //         game.currentpot -= game.player5_stake;
        //         game.player5_stake = 0;
        //         game.player5_ready = false;
        //         game.playercount -= 1;

        //     } else if player.current_slot == 4 {
        //         assert((game.player4 == caller), 
        //         'Player not in slot');
        //         game.player4 = utils::zero_address();
        //         // transfer game.player4_stake; back to player
        //         utils::withdraw_stake(self.world(), caller, game.player4_stake);
        //         game.currentpot -= game.player4_stake;
        //         game.player4_stake = 0;
        //         game.player4_ready = false;
        //         game.playercount -= 1;

        //     } else if player.current_slot == 3 {
        //         assert((game.player3 == caller), 
        //         'Player not in slot');
        //         game.player3 = utils::zero_address();
        //         // transfer game.player3_stake; back to player
        //         utils::withdraw_stake(self.world(), caller, game.player3_stake);
        //         game.currentpot -= game.player3_stake;
        //         game.player3_stake = 0;
        //         game.player3_ready = false;
        //         game.playercount -= 1;

        //     } else if player.current_slot == 2 {
        //         assert((game.player2 == caller), 
        //         'Player not in slot');
        //         game.player2 = utils::zero_address();
        //         // transfer game.player2_stake; back to player
        //         utils::withdraw_stake(self.world(), caller, game.player2_stake);
        //         game.currentpot -= game.player2_stake;
        //         game.player2_stake = 0;
        //         game.player2_ready = false;
        //         game.playercount -= 1;

        //     } else if player.current_slot == 1 {
        //         // Note, if player 1 leaves, the game is cancelled
        //         // so the routine should be elaborated
        //         assert((game.player1 == caller), 
        //         'Player not in slot');

        //         game.game_status = GameStatus::Cancelled;
        //         game.timestamp_end= get_block_timestamp();

        //         game.player1 = utils::zero_address();
        //         // return stake to player
        //         utils::withdraw_stake(self.world(), caller, game.player1_stake);
        //         // game.player1_stake
        //         game.player1_stake = 0;
        //         //game.player1_ready = false;
        //         //game.playercount -= 1;

        //         if (game.player2 != utils::zero_address()) {
        //             game.player2 = utils::zero_address();
        //             // return game.player2_stake;
        //             utils::withdraw_stake(self.world(), caller, game.player2_stake);
        //             game.player2_stake = 0;
        //             let mut player2:Player = get!(self.world(), game.player2, (Player));
        //             player2.current_game_id = 0;
        //             player2.current_slot = 0;
        //             set!(self.world(), (player2));
        //         }

        //         if (game.player3 != utils::zero_address()) {
        //             game.player3 = utils::zero_address();
        //             // return game.player3_stake;
        //             utils::withdraw_stake(self.world(), caller, game.player3_stake);
        //             game.player3_stake = 0;
        //             let mut player3:Player = get!(self.world(), game.player3, (Player));
        //             player3.current_game_id = 0;
        //             player3.current_slot = 0;
        //             set!(self.world(), (player3));
        //         }

        //         if (game.player4 != utils::zero_address()) {
        //             game.player4 = utils::zero_address();
        //             // return game.player4_stake;
        //             utils::withdraw_stake(self.world(), caller, game.player4_stake);
        //             game.player4_stake = 0;
        //             let mut player4:Player = get!(self.world(), game.player4, (Player));
        //             player4.current_game_id = 0;
        //             player4.current_slot = 0;
        //             set!(self.world(), (player4));
        //         }

        //         if (game.player5 != utils::zero_address()) {
        //             game.player5 = utils::zero_address();
        //             // return game.player5_stake;
        //             utils::withdraw_stake(self.world(), caller, game.player5_stake);
        //             game.player5_stake = 0;
        //             let mut player5:Player = get!(self.world(), game.player5, (Player));
        //             player5.current_game_id = 0;
        //             player5.current_slot = 0;
        //             set!(self.world(), (player5));
        //         }

        //         if (game.player6 != utils::zero_address()) {
        //             game.player6 = utils::zero_address();
        //             // return game.player6_stake;
        //             utils::withdraw_stake(self.world(), caller, game.player6_stake);
        //             game.player6_stake = 0;
        //             let mut player6:Player = get!(self.world(), game.player6, (Player));
        //             player6.current_game_id = 0;
        //             player6.current_slot = 0;
        //             set!(self.world(), (player6));
        //         }

        //     }
            
        //     set!(self.world(), (game));
        // }
    }
}

#[cfg(test)]
mod tests {}