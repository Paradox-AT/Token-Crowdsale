let Token = artifacts.require("./Token.sol");

let owner = "0xf5c807f06508fb2f4055780649a58a2e562bbf86";

module.exports = async function (deployer) {
    let token = await deployToken(deployer);

    await init(token);
};


async function deployToken(deployer) {
    let name = "Sportist";
    let symbol = "S";
    let decimals = 6;
    let cap = 10000000000 * 10 ** 6;

    console.log("Deploying Token:");
    console.log("\tName    \t: %s", name);
    console.log("\tSymbol  \t: %s", symbol);
    console.log("\tDecimals\t: %s", decimals);
    console.log("\tCap     \t: %s", cap);

    await deployer.deploy(Token, name, symbol, decimals, cap);

    if (await Token.deployed())
        return await Token.deployed();
}

async function init(token) {
    let allowance = 4000000000 * 10 ** 6;

    console.log("Minting tokens.");
    console.log("Token address          \t: %s", token.address);
    console.log("Tokens to mint         \t: %s", await token.cap());

    await token.mint(owner, await token.cap());
}