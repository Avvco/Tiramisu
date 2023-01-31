import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

import { saveFrontendFiles } from '../script/save-address'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const deployed = await deploy("MedicalStaff", {
    from: deployer,
    args: [],
    log: true,
  });

  if (deployed.newlyDeployed) {
    console.log(
      `contract "MedicalStaff" deployed at ${deployed.address} using ${deployed.receipt?.gasUsed} gas, from ${deployed.receipt?.from}`
    );
  }

  await saveFrontendFiles("medical", deployed.address);
};
export default func;
func.tags = ['MedicalStaff'];