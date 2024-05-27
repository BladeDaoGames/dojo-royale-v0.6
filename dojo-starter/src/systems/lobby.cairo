use starknet::{ContractAddress};

#[starknet::interface]
trait ILobby<TContractState> {
    fn register_player(self: @TContractState, name: felt252, profile_pic:u16);
    fn set_profile_pic(self: @TContractState, profile_pic: u16);
    fn create_room(self: @TContractState, minstake: u256, drone: u16);
    // fn join_room(self: @TContractState);
    // fn leave_room(self: @TContractState);
}

#[dojo::contract]
mod lobby {
    use super::{ILobby};
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use dojo_starter::models::{player::{Player, Drone, DroneStatus}};
    use dojo_starter::models::game::{Game, GameStatus, Vec2};
    use dojo_starter::utils::{utils, seed_gen::{make_seed}};
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

        fn create_room(self: @ContractState, minstake: u256, drone: u16) {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let game_id = make_seed(caller);

            let creatorDrone = get!(self.world(), (caller,0), (Drone));

            // check if drone is more than 0 to assert that creator has a drone
            assert((creatorDrone.drone !=0) 
                && (creatorDrone.drone > 0), 
                'Lobby Drone Not Set');

            let mut game = Game {
                game_id: game_id,
                minstake: minstake,

                player1: caller,
                player1_stake: minstake,
                player1_ready: false,
                player1_pos: Vec2 { x: 0, y: 0 },

                player2: ContractAddress::zero(),
                player2_stake: 0,
                player2_ready: false,
                player2_pos: Vec2 { x: 0, y: 0 },

                player3: ContractAddress::zero(),
                player3_stake: 0,
                player3_ready: false,
                player3_pos: Vec2 { x: 0, y: 0 },

                player4: ContractAddress::zero(),
                player4_stake: 0,
                player4_ready: false,
                player4_pos: Vec2 { x: 0, y: 0 },

                player5: ContractAddress::zero(),
                player5_stake: 0,
                player5_ready: false,
                player5_pos: Vec2 { x: 0, y: 0 },

                player6: ContractAddress::zero(),
                player6_stake: 0,
                player6_ready: false,
                player6_pos: Vec2 { x: 0, y: 0 },

                game_status: GameStatus::Lobby,
                winner: ContractAddress::zero(),
                winner_slot: 0,
                timestamp_start: get_block_timestamp(),
                timestamp_end: 0,
            };

            set!(self.world(), (game, Drone {
                player_id: caller,
                game_id: game_id,
                drone: creatorDrone.drone,
                health: 100,
                drone_status: DroneStatus::Alive,
            }));
        }


    }
}

#[cfg(test)]
mod tests {}