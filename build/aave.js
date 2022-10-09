"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
async function main() {
    const web3 = new web3_1.default("https://mainnet.infura.io/v3/b583160797e24b88a643ad9a38b0f5aa");
    const fs = require("fs");
    const contractAddress = "0xBcca60bB61934080951369a648Fb03DF4F96263C";
    var ABI = JSON.parse(fs.readFileSync("abi/".concat(contractAddress, ".json")));
    var newContract = new web3.eth.Contract(ABI, contractAddress);
    // const crToken = Web3.CEther.at(0x3FDB...);
    // const tokens = await crToken.methods.balanceOfUnderlying(account).call();
    console.log(newContract);
    // console.log(await newContract.methods.totalSupply().call());
}
main();
//# sourceMappingURL=aave.js.map