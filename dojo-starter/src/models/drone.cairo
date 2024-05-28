
#[derive(Model, Copy, Drop, Serde)]
struct Drones {
    #[key]
    drone_id: u8,
    health: u16,
    atk: u8,
    def: u8,
    spd: u8, //1 for regular
    range: u8,
    artillery_range: u8,
    bombs_remaining: u8
}