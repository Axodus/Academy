import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const Permission = await ethers.getContractFactory("PermissionRegistry");
  const permission = await Permission.deploy(deployer.address);
  await permission.deployed();
  console.log("PermissionRegistry:", permission.address);

  const Pointer = await ethers.getContractFactory("PointerRegistry");
  const pointer = await Pointer.deploy(deployer.address);
  await pointer.deployed();
  console.log("PointerRegistry:", pointer.address);

  const Vault = await ethers.getContractFactory("LockedNeuronsVault");
  const vault = await Vault.deploy(deployer.address);
  await vault.deployed();
  console.log("LockedNeuronsVault:", vault.address);

  const PoK = await ethers.getContractFactory("PoKMinter");
  const pok = await PoK.deploy(deployer.address, vault.address);
  await pok.deployed();
  console.log("PoKMinter:", pok.address);

  const issuerTx = await vault.setIssuer(pok.address, true);
  await issuerTx.wait();
  console.log("PoKMinter issuer enabled on LockedNeuronsVault");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
