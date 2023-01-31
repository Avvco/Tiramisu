import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

import { saveFrontendFiles } from '../script/save-address'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  const deployed = await deploy("RecordVerifier", {
    from: deployer,
    args: [],
    log: true,
  });

  if(deployed.newlyDeployed) {
    console.log(
      `contract "RecordVerifier" deployed at ${deployed.address} using ${deployed.receipt?.gasUsed} gas, from ${deployed.receipt?.from}`
    );
  }

  await saveFrontendFiles("verifier", deployed.address);
};
export default func;
func.tags = ['RecordVerifier'];