import * as dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
import 'module-alias/register';
import '@nomiclabs/hardhat-etherscan';
import '@tenderly/hardhat-tenderly';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-contract-sizer';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import 'hardhat-deploy';

const accounts = process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : 'remote';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    rinkeby: {
      accounts: accounts,
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
    ropsten: {
      accounts: accounts,
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
  },
  solidity: {
    version: '0.8.13',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    tests: './test/test-hardhat',
  },
};
