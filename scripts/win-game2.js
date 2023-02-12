// add the game address here and update the contract name if necessary
const gameAddr = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";
const contractName = "Game2";

async function main() {
  // attach to the game
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  // do whatever you need to do to win the game here:

  // Uses default accounts[0] to interact with the smart contract,
  // so gas fee will be deducted from accounts[0]
  // unless contract is connected to some other account
  // Set X such that X > 0
  await game.setX(15);
  // Set Y such that Y > 0 and X + Y = 50
  await game.setY(35);

  // Win the game now
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
