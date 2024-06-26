use starknet::ContractAddress;
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

const CONFIG_KEY: u8 = 1;

#[derive(Model, Copy, Drop, Serde)]
struct Config {
    #[key]
    key: u8,
    //------
    initialized: bool,
    owner_address: ContractAddress,
    treasury_address: ContractAddress,
    paused: bool,
}

#[derive(Copy, Drop)]
struct ConfigManager {
    world: IWorldDispatcher
}

#[generate_trait]
impl ConfigManagerTraitImpl of ConfigManagerTrait {
    fn new(world: IWorldDispatcher) -> ConfigManager {
        ConfigManager { world }
    }
    fn get(self: ConfigManager) -> Config {
        get!(self.world, (CONFIG_KEY), Config)
    }
    fn set(self: ConfigManager, config: Config) {
        set!(self.world, (config));
    }
    fn is_initialized(world: IWorldDispatcher) -> bool {
        (ConfigManagerTrait::new(world).get().initialized)
    }
    fn is_owner(world: IWorldDispatcher, address: ContractAddress) -> bool {
        (ConfigManagerTrait::new(world).get().owner_address == address)
    }
}
