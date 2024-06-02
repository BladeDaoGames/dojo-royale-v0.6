
mod constants {
    // const HASH_SALT_MASK: u256 = 0xffffffffffffffff; // 64 bits
    const HASH_SALT_MASK: u256 = 0x1fffffffffffff;   // 53 bits (Number.MAX_SAFE_INTEGER, 9007199254740991)
}

mod chances {
    const NEVER: u8 = 0;
    const ALWAYS: u8 = 100;
    
    // Pistols chances (percentage) at X paces
    const PISTOLS_KILL_AT_STEP_1: u8 = 5;
    const PISTOLS_KILL_AT_STEP_10: u8 = 20;
    const PISTOLS_HIT_AT_STEP_1: u8 = 100;
    const PISTOLS_HIT_AT_STEP_10: u8 = 20;
    const PISTOLS_GLANCE_AT_STEP_1: u8 = 20;
    const PISTOLS_GLANCE_AT_STEP_10: u8 = 15;

    // Blades chances (percentage)
    const BLADES_KILL: u8 = 15;
    const BLADES_HIT: u8 = 75;
    const BLADES_GLANCE: u8 = 0;
}
