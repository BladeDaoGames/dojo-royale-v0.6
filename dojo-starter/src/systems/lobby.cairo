use starknet::{ContractAddress};

#[starknet::interface]
trait ILobby<TContractState> {
    fn register_player(self: @TContractState, name: felt252, profile_pic:u16);
    fn set_profile_pic(self: @TContractState, profile_pic: u16);
    // fn create_room(self: @TContractState);
    // fn join_room(self: @TContractState);
    // fn leave_room(self: @TContractState);
}

#[dojo::contract]
mod lobby {
    use super::{ILobby};
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use dojo_starter::models::{player::{Player, Drone}};
    use dojo_starter::models::game::Game;
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
    }
}

#[cfg(test)]
mod tests {}