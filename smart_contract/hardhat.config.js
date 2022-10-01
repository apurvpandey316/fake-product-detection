require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/Zcq5rilmg6W0SOIkUwK0et4wJNsqlkfE",
      accounts: [
        "40177bdb2cc5516da2f97e3976fb100c10eeffb76197485710a654a75e6f69ee",
      ],
    },
  },
};
//deployed to: 0x228Ee8074144890CA814b10B81457C2b016E521E
