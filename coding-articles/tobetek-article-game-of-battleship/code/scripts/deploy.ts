import { ethers } from "hardhat";

async function main() {
  const [owner, otherAccount, otherAccount2] = await ethers.getSigners();
  const Battleship = await ethers.getContractFactory("BattleShip");
  const battleship = await Battleship.deploy([
    owner.address,
    otherAccount.address,
  ]);

  await battleship.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
