import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const PK = process.env["PRIVATE_KEY"] || "0x0000000000000000000000000000000000000000000000000000000000000000";
const RPC = process.env["RPC_URL"] || "https://api.harmony.one";
const CHAIN_ID = Number(process.env["CHAIN_ID"] || 1666600000);

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: { optimizer: { enabled: true, runs: 200 } }
  },
  networks: {
    harmony: {
      url: RPC,
      chainId: CHAIN_ID,
      accounts: [PK]
    }
  }
};

export default config;
