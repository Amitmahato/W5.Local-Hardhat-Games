// add the game address here and update the contract name if necessary
const gameAddr = "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f";
const contractName = "Game4";

async function main() {
  // attach to the game
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  // do whatever you need to do to win the game here:

  // Uses default accounts[0] to interact with the smart contract,
  // so gas fee will be deducted from accounts[0]
  // Win the game now, by passing a value such that:
  // x + 210 = 255 + 1 (making 0) + 10 (then making 10), therefor x = 56
  const tx = await game.win(56);

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
