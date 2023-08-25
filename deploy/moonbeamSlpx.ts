import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployFunction: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  network,
}: HardhatRuntimeEnvironment) {
  console.log("Running MoonbeamSlpx deploy script");

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deployer is :", deployer);

  if (
    network.name == "moonbeam" ||
    network.name == "moonbeam_local" ||
    network.name == "moonbase_alpha"
  ) {
    const addressToAccount = await deploy("AddressToAccount", {
      from: deployer,
      log: true,
      deterministicDeployment: false,
    });

    const buildCallData = await deploy("BuildCallData", {
      from: deployer,
      log: true,
      deterministicDeployment: false,
    });

    await deploy("MoonbeamSlpx", {
      from: deployer,
      log: true,
      deterministicDeployment: false,
      libraries: {
        AddressToAccount: addressToAccount.address,
        BuildCallData: buildCallData.address,
      },
      proxy: {
        proxyContract: "OpenZeppelinTransparentProxy",
        execute: {
          init: {
            methodName: "initialize",
            args: [
              "0xFFffffFf7cC06abdF7201b350A1265c62C8601d2",
              2030,
              "0x0801",
            ],
          },
        },
      },
    });
  }
  if (network.name == "moonriver" || network.name == "moonriver_local") {
    const addressToAccount = await deploy("AddressToAccount", {
      from: deployer,
      log: true,
      deterministicDeployment: false,
    });

    const buildCallData = await deploy("BuildCallData", {
      from: deployer,
      log: true,
      deterministicDeployment: false,
    });

    await deploy("MoonbeamSlpx", {
      from: deployer,
      log: true,
      deterministicDeployment: false,
      libraries: {
        AddressToAccount: addressToAccount.address,
        BuildCallData: buildCallData.address,
      },
      proxy: {
        proxyContract: "OpenZeppelinTransparentProxy",
        execute: {
          init: {
            methodName: "initialize",
            args: [
              "0xFFfFFfFFF075423be54811EcB478e911F22dDe7D",
              2001,
              "0x020a",
            ],
          },
        },
      },
    });
  }
};

export default deployFunction;

deployFunction.dependencies = [""];

deployFunction.tags = ["MoonbeamSlpx"];
