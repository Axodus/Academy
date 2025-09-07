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
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
