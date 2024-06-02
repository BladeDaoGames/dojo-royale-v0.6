mod systems {
    mod registrar;
    mod lobby;
    mod admin;
    mod utils;
}

mod models {
    mod coins;
    mod config;
    mod player;
    mod drone;
    mod game;
    mod moves;
    mod position;
}

mod interfaces {
    mod ierc20;
}

mod utils {
    mod hash;
    mod math;
    mod seed_gen;
    mod timestamp;
}

mod types {
    mod events;
    mod constants;
}

mod tests {
    mod test_world;
}

mod mocks {
    mod lords_mock;
}
