use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct Game {
    #[key]
    game_id: u128,
    player_1: ContractAddress,
    player_1_pos: Vec2,

    player_2: ContractAddress,
    player_2_pos: Vec2,
    
    player_3: ContractAddress,
    player_3_pos: Vec2,

    player_4: ContractAddress,
    player_4_pos: Vec2,

    player_5: ContractAddress,
    player_5_pos: Vec2,

    player_6: ContractAddress,
    player_6_pos: Vec2,

    game_status: GameStatus,
    winner: ContractAddress,
    winner_slot: u8, // 0: unknown, 1: player a, 2: player b, 3: technical error
    // timestamps in unix epoch
    timestamp_start: u64, // Unix time, started
    timestamp_end: u64, // Unix time, ended
}


#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum GameStatus {
    Lobby,
    Awaiting,
    InProgress,
    Ended
}


#[derive(Copy, Drop, Serde, Introspect)]
struct Vec2 {
    x: u32,
    y: u32
}

trait Vec2Trait {
    fn is_zero(self: Vec2) -> bool;
    fn is_equal(self: Vec2, b: Vec2) -> bool;
}

impl Vec2Impl of Vec2Trait {
    fn is_zero(self: Vec2) -> bool {
        if self.x - self.y == 0 {
            return true;
        }
        false
    }

    fn is_equal(self: Vec2, b: Vec2) -> bool {
        self.x == b.x && self.y == b.y
    }
}

#[cfg(test)]
mod tests {
    use super::{Position, Vec2, Vec2Trait};

    #[test]
    #[available_gas(100000)]
    fn test_vec_is_zero() {
        assert(Vec2Trait::is_zero(Vec2 { x: 0, y: 0 }), 'not zero');
    }

    #[test]
    #[available_gas(100000)]
    fn test_vec_is_equal() {
        let position = Vec2 { x: 420, y: 0 };
        assert(position.is_equal(Vec2 { x: 420, y: 0 }), 'not equal');
    }
}