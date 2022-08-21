const { ethers } = require("hardhat");
async function main() {
    console.log('xxxxxxxxxxxxxxxxxxx')
    const e1155 = await ethers.getContractFactory("Marvel1155")
    //0x131Db19FE3fEF92eFbb9D0C6AD3ceD255418abAF

    //Start deployment, returning a promise that resolves to a contract object
    const erc1155 = await e1155.deploy()
    await erc1155.deployed()
    console.log("Contract deployed to address:", erc1155.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })