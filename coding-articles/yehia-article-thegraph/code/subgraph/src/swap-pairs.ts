import { Erc20 } from "./../generated/SwapPairs/Erc20";
import { log } from "@graphprotocol/graph-ts";
import { PairCreated } from "../generated/SwapPairs/SwapPairs";
import { CreatedPair, Token } from "../generated/schema";

export function handlePairCreated(event: PairCreated): void {
  let createdPair = new CreatedPair(event.transaction.hash.toHexString());

  createdPair.timestamp = event.block.timestamp;

  const tokenOContract = Erc20.bind(event.params.token0);
  const token1Contract = Erc20.bind(event.params.token1);

  if (tokenOContract.try_name().reverted) {
    log.error("token0 name not found {}", [
      event.transaction.hash.toHexString()
    ]);
    return;
  }
  if (token1Contract.try_name().reverted) {
    log.error("token1 name not found {}", [
      event.transaction.hash.toHexString()
    ]);
    return;
  }
  let token0 = Token.load(event.params.token0.toHexString());
  let token1 = Token.load(event.params.token1.toHexString());
  if (!token0) {
    token0 = new Token(event.params.token0.toHexString());
    let token0Name = tokenOContract.name();
    if (isString(token0Name)) {
      token0.name = tokenOContract.name();
    }
    token0.name = tokenOContract.name();
    token0.save();
  }
  if (!token1) {
    token1 = new Token(event.params.token1.toHexString());
    token1.name = token1Contract.name();

    token1.save();
  }
  createdPair.token0 = event.params.token0.toHexString();
  createdPair.token1 = event.params.token1.toHexString();

  createdPair.save();
}
