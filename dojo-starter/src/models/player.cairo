use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct Player {
    #[key]
    player_id: ContractAddress,
    //------------------------
    game_id: u128,
    name: felt252,
    profile_pic: u16,
    total_games: u16,
    total_wins: u16,
    total_losses: u16,
    ranking: u256,
    timestamp: u64, // Unix time, 1st registered
}

// hero drone for battling
#[derive(Model, Copy, Drop, Serde)]
struct Drone {
    #[key]
    player_id: ContractAddress,
    #[key]
    game_id: u128,
    drone: u16,
    health: u16,
    drone_status: DroneStatus
}

#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum DroneStatus {
    Alive,
    Dead
}
