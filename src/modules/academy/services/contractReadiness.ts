import { isAddress } from "ethers";
import lockedNeuronsVaultAbi from "../../../abis/LockedNeuronsVault.json";
import pokMinterAbi from "../../../abis/PoKMinter.json";
import { env } from "../../../config/env";

function addressStatus(address: string) {
  if (!address) return { configured: false, valid: false, address: null };
  return { configured: true, valid: isAddress(address), address };
}

export const academyContractReadiness = {
  getStatus() {
    const pokMinter = addressStatus(env.academyContracts.pokMinter);
    const lockedNeuronsVault = addressStatus(env.academyContracts.lockedNeuronsVault);

    return {
      mode: "readiness",
      chainId: env.academyContracts.chainId || null,
      rpcConfigured: Boolean(env.academyContracts.rpcUrl),
      writesEnabled: false,
      rewardExecutionEnabled: false,
      contracts: {
        PoKMinter: {
          ...pokMinter,
          abiFunctions: pokMinterAbi.filter((item: any) => item.type === "function").map((item: any) => item.name)
        },
        LockedNeuronsVault: {
          ...lockedNeuronsVault,
          abiFunctions: lockedNeuronsVaultAbi.filter((item: any) => item.type === "function").map((item: any) => item.name)
        }
      },
      readinessChecks: [
        { id: "pok-minter-address", ok: pokMinter.configured && pokMinter.valid, severity: "required-before-alpha" },
        { id: "locked-vault-address", ok: lockedNeuronsVault.configured && lockedNeuronsVault.valid, severity: "required-before-alpha" },
        { id: "contract-writes-disabled", ok: true, severity: "mvp-safety" }
      ]
    };
  }
};
