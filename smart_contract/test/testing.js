const { expect } = require("chai");
const hre = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

let products, owner;
const getContracts = async () => {
  if (products && owner) return;
  const Products = await hre.ethers.getContractFactory("Products");
  products = await Products.deploy();
  [owner] = await ethers.getSigners();
};
describe("Testing productsContract", function () {
  it("Deploy Products", async function () {
    // no product is added during the compilation of the contract
    await getContracts();
    expect(await products.productCount()).to.equal(0);
    expect(await products.manufactuerCount()).to.equal(0);
  });
  it("Adding manufactuers", async function () {
    try {
      await getContracts();
      await products.addManufactuers(10, "abcd", 18756);
      await products.addManufactuers(2, "a", 9865);
      await products.addManufactuers(1, "b", 986);
      await products.addManufactuers(4, "c", 1435);
      expect(await products.manufactuerCount()).to.equal(4);
    } catch (error) {
      console.error(error);
    }
  });
  it("Adding Products", async function () {
    // no product is added during the compilation of the contract
    await getContracts();
    await products.additionToBlockChain(
      "abcd",
      "ab",
      1,
      1,
      "ab",
      "0x8c0dcaccfc718d354e38541a969305c740877c04"
    );
    await products.additionToBlockChain(
      "ab",
      "cd",
      2,
      4,
      "abcd",
      "0x8c0dcaccfc718d354e38541a969305c740877c04"
    );
    await products.additionToBlockChain(
      "abcde",
      "ef",
      1,
      3,
      "ab",
      "0x8c0dcaccfc718d354e38541a969305c740877c04"
    );
    await products.additionToBlockChain(
      "abcd",
      "gh",
      2,
      19,
      "ab",
      "0x8c0dcaccfc718d354e38541a969305c740877c04"
    );
    expect(await products.productCount()).to.equal(4);
  });
  it("Checking Validity of the manufacturer", async function () {
    // no product is added during the compilation of the contract
    expect(await products.checkIfManufactuerIsValid(10)).to.equal(true);
    expect(await products.checkIfManufactuerIsValid(11)).to.equal(true);
    expect(await products.checkIfManufactuerIsValid(2)).to.equal(true);
  });
  it("Checking Validity of the products", async function () {
    // no product is added during the compilation of the contract
    expect(await products.checkIfProductIsValid("ab")).to.equal(true);
    expect(await products.checkIfProductIsValid("cd")).to.equal(true);
    expect(await products.checkIfProductIsValid("xy")).to.equal(false);
  });
});
// });
// describe("Testing manufactuers", function () {
//   it("Adding manufactuers", async function () {
//     try {
//       await getContracts();
//       await products.addManufactuers(10, "abcd", 18756);
//       await products.addManufactuers(2, "a", 9865);
//       await products.addManufactuers(1, "b", 986);
//       await products.addManufactuers(4, "c", 1435);
//       expect(await products.manufactuerCount()).to.equal(4);
//     } catch (error) {
//       console.error(error);
//     }
//   });
//   it("Getting products length for a given manufactuer", async function () {
//     await getContracts();
//     expect(await products.getMyProductsCount(2)).to.equal(2);
//     expect(await products.getMyProductsCount(4)).to.equal(0);
//   });
//   it("Getting products for a given manufactuer", async function () {
//     await getContracts();
//     const myProducts = await products.getMyProducts(2);
//     // console.log(myProducts);
//     const myProducts2 = await products.getMyProducts(4);
//     // console.log(myProducts2);
//     expect(myProducts.length).to.equal(2);
//     expect(myProducts2.length).to.equal(0);
//   });
// });
