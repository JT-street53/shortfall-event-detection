"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const dotenv_1 = require("dotenv");
const env = (0, dotenv_1.config)();
const options = {
    timeout: 30000,
    clientConfig: {
        maxReceivedFrameSize: 100000000,
        maxReceivedMessageSize: 100000000,
    },
    reconnect: {
        auto: true,
        delay: 5000,
        maxAttempts: 15,
        onTimeout: false,
    },
};
const web3 = new web3_1.default(new web3_1.default.providers.WebsocketProvider(env.parsed.RPC_ENDPOINT, options));
async function detect() {
    const fs = require("fs");
    const contractAddress = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643";
    var ABI = JSON.parse(fs.readFileSync("abi/".concat(contractAddress, ".json")));
    var newContract = new web3.eth.Contract(ABI, contractAddress);
    // const crToken = Web3.CEther.at(0x3FDB...);
    // const tokens = await crToken.methods.balanceOfUnderlying(account).call();
    // console.log(newContract);
    console.log(await newContract.methods.exchangeRateStored().call());
    console.log(await newContract.methods.exchangeRateCurrent().call());
    console.log(await newContract.methods.decimals().call());
    console.log(await newContract.methods.interestRateModel().call());
    // console.log(0.020000 + ());
}
// https://docs.compound.finance/v2/ctokens/
async function main() {
    // Subscribe
    var subscription = web3.eth
        .subscribe("newBlockHeaders", function (error, result) {
        if (!error) {
            console.log("result: ", result);
            return;
        }
        console.error("error: ", error);
    })
        .on("connected", function (subscriptionId) {
        console.log("subscriptionId: ", subscriptionId);
    })
        .on("data", function (blockHeader) {
        console.log("blockHeader: ", blockHeader);
        detect();
    })
        .on("error", function () {
        console.log("error");
    });
    // unsubscribes the subscription
    subscription.unsubscribe(function (error, success) {
        if (success) {
            console.log("Successfully unsubscribed!");
        }
        console.error("error: ", error);
        console.error("error: ", error);
    });
}
main();
//# sourceMappingURL=compound.js.map