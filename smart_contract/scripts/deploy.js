const main = async () => {
  const Products = await hre.ethers.getContractFactory("Products");
  const products = await Products.deploy();

  await products.deployed();
  console.log("Products deployed to: ", products.address);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const runmain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runmain();
