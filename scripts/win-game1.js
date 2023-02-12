// add the game address here and update the contract name if necessary
const gameAddr = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
const contractName = "Game1";

async function main() {
  // attach to the game
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  // do whatever you need to do to win the game here:
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
