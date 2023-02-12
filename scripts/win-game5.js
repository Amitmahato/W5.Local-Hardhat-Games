// add the game address here and update the contract name if necessary
const gameAddr = "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F";
const contractName = "Game5";

async function main() {
  // attach to the game
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  // do whatever you need to do to win the game here:

  // Uses default accounts[0] to interact with the smart contract,
  // so gas fee will be deducted from accounts[0]

  // Add allowance >= 10,000, doesn't depend on connected account's balance
  // since we are not actually transferring any ether, it's just a number
  await game.giveMeAllowance(15000);

  // Mint with amount >= 10,000 which is <= allowance already set
  await game.mint(12000);

  // Win the game now, after clearing the requirements
  const tx = await game.win();

  // did you win? Check the transaction receipt!
  // if you did, it will be in both the logs and events array
  const receipt = await tx.wait();
  console.log(receipt);

  // Only the event signature is considered as a topic
  // since the argument is not indexed, you don't get it logged as a topic
  console.log("Topics: ", receipt.events?.[0].topics);

  // You can get the arguments from `args`
  console.log("Event Args: ", receipt.events?.[0]?.args);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
