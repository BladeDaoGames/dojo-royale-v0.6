use dojo_starter::models::drone::Drones;


#[dojo::interface]
trait IRegistrar {

    fn add_drone(
        drone_id: u8,
        health: u16,
        atk: u8,
        def: u8,
        spd: u8, //1 for regular
        range: u8,
        artillery_range: u8,
        bombs_remaining: u8
    );

}


#[dojo::contract]
mod registrar {
    use super::{IRegistrar};
    use starknet::{ContractAddress, get_caller_address};
    use dojo_starter::models::{drone::{Drones}};

    #[abi(embed_v0)]
    impl RegistrarImpl of IRegistrar<ContractState> {
    
        fn add_drone(world: IWorldDispatcher,
            drone_id: u8,
            health: u16,
            atk: u8,
            def: u8,
            spd: u8,
            range: u8,
            artillery_range: u8,
            bombs_remaining: u8
        ){
            let drone = Drones {
                drone_id,
                health,
                atk: u8,
                def: u8,
                spd: u8,
                range: u8,
                artillery_range: u8,
                bombs_remaining: u8
            };

            set!(world, (drone));
        }
    }
}