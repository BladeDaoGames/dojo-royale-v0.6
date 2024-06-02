use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct Player {
    #[key]
    player_id: ContractAddress,
    //------------------------
    current_game_id: u128,
    current_slot: u8, // player 1/2/3/4/5/6

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
    drone_id: u8,
    health: u16,
    atk: u8,
    def: u8,
    spd: u8, //1 for regular
    range: u8,
    artillery_range: u8,
    bombs_remaining: u8,
    drone_status: DroneStatus
}

#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum DroneStatus {
    Alive,
    Dead
}
