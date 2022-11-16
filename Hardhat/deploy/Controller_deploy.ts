import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  const deployed = await deploy("Controller", {
    from: deployer,
    args: [],
    log: true,
  });

  if(deployed.newlyDeployed) {
    console.log(
      `contract "Controller" deployed at ${deployed.address} using ${deployed.receipt?.gasUsed} gas, from ${deployed.receipt?.from}`
    );
  }
};
export default func;
func.tags = ['Controller'];