import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";

const RPC = process.env["RPC_URL"] || "https://api.harmony.one";
const CHAIN_ID = Number(process.env["CHAIN_ID"] || 1666600000);
const PRIVATE_KEY = process.env["PRIVATE_KEY"];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: { optimizer: { enabled: true, runs: 200 } }
  },
  networks: {
    harmony: {
      url: RPC,
      chainId: CHAIN_ID,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      type: "http"
    }
  }
};

export default config;
