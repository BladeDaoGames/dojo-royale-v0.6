use debug::PrintTrait;
use traits::{Into, TryInto};
use starknet::{ContractAddress};

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use dojo_starter::models::coins::{Coin, CoinManagerTrait, CoinTrait};
use dojo_starter::types::constants::{constants, chances};
use dojo_starter::utils::math::{MathU8, MathU16};
use dojo_starter::interfaces::ierc20::{IERC20DispatcherTrait};



// https://github.com/starkware-libs/cairo/blob/main/corelib/src/pedersen.cairo
extern fn pedersen(a: felt252, b: felt252) -> felt252 implicits(Pedersen) nopanic;

#[inline(always)]
fn zero_address() -> ContractAddress {
    (starknet::contract_address_const::<0x0>())
}

// player need to allow contract to transfer funds first
// ierc20::approve(contract_address, max(wager.value, wager.fee));
fn deposit_stake(world: IWorldDispatcher, 
    from: ContractAddress, to: ContractAddress, stakeValue: u256, wager_fee: u256) {
    
    //let wager: Wager = get!(world, (duel_id), Wager);
    let coin : Coin = CoinManagerTrait::new(world).get(1); // hard code lords
    let total: u256 = (stakeValue + wager_fee);
    if (total > 0) {
        //let coin : Coin = CoinManagerTrait::new(world).get(wager.coin);
        let balance: u256 = coin.ierc20().balance_of(from);
        let allowance: u256 = coin.ierc20().allowance(from, to);
        assert(balance >= total, 'Insufficient balance for Fees');
        assert(allowance >= total, 'Not allowed to transfer Fees');
        coin.ierc20().transfer_from(from, to, total);
    }
}

fn withdraw_stake(world: IWorldDispatcher, to: ContractAddress, staked: u256) {
    //let wager: Wager = get!(world, (duel_id), Wager);
    let total: u256 = staked;
    if (total > 0) {
        let coin : Coin = CoinManagerTrait::new(world).get(1); // hard code lords
        let balance: u256 = coin.ierc20().balance_of(starknet::get_contract_address());
        assert(balance >= total, 'Withdraw not available'); // should never happen!
        coin.ierc20().transfer(to, total);
    }
}



