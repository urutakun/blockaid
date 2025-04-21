/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
        url: "http://192.168.1.7:8545"
    }
  }
};
