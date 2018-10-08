let Token = artifacts.require("./Token.sol");
let Crowdsale = artifacts.require("./TokenCrowdsale.sol")

let owner = "0xDc6234d567eBA03B465f519596E679A8d3959935";

module.exports = async function (deployer) {
    let token = await deployToken(deployer);
    let crowdsale = await deployTokenCrowdsale(deployer, token);

    await init(token, crowdsale);
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

async function deployTokenCrowdsale(deployer, token) {
    let rate = 1;
    let wallet = owner;
    let openingTime = Math.floor((new Date()).getTime() / 1000);
    let closingTime = openingTime + (1 * 60 * 60 * 24)*(1.75);
    let cap = 4000000000 * 10 ** 6;
    let minCap = 1000;
    let maxCap = 4000000000 * 10 ** 6;
    let goal = 800000000 * 10 ** 6;
    let tokenWallet = owner;
75    console.log("Deploying Token Crowdsale:");
    console.log("\tRate                 \t: %s", rate);
    console.log("\tWallet               \t: %s", wallet);
    console.log("\tOpening Time         \t: %s", openingTime);
    console.log("\tClosing Time         \t: %s", closingTime);
    console.log("\tCap                  \t: %s", cap);
    console.log("\tIndividual Min Cap   \t: %s", minCap);
    console.log("\tGoal                 \t: %s", goal);
    console.log("\tToken Address        \t: %s", token ? token.address : "");
    console.log("\tToken Wallet         \t: %s", tokenWallet);

    await deployer.deploy(Crowdsale, rate, wallet, token ? token.address : "", openingTime, closingTime, tokenWallet, goal, cap, minCap);

    if (Crowdsale.deployed())
        return Crowdsale.deployed();
}

async function init(token, crowdsale) {
    let allowance = 4000000000 * 10 ** 6;

    console.log("Minting and creating allowance for crowdsale contract.");
    console.log("Token address          \t: %s", token.address);
    console.log("Token Crowdsale address\t: %s", crowdsale.address);
    console.log("Tokens to mint         \t: %s", await token.cap());
    console.log("Allowance              \t: %s", allowance);

    await token.mint(owner, await token.cap());
    await token.approve(crowdsale.address, allowance);
}