/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/6AggC5DqAidYCCq3LGxWhThDb7slFi8L',
      accounts: ['0xc1a6b32e00e2c3e57e6bd7c459de2dea0b0b063ee4956878e77178f16f96eb90']
    }
  },
}
