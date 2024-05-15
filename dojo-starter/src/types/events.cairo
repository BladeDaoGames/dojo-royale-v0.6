use traits::{Into, TryInto};
use starknet::{ContractAddress};


#[derive(Drop, starknet::Event)]
struct PlayerRegistered {
    player: ContractAddress,
    name: felt252,
    profile_pic: u16
}

#[derive(Drop, starknet::Event)]
struct ProfilePicSet {
    player: ContractAddress,
    profile_pic: u16
}