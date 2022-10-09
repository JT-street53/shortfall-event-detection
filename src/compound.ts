import Web3 from "web3";
import { config } from "dotenv";

const env = config();

const options = {
  timeout: 3000,
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

const websocket = new Web3(
  new Web3.providers.WebsocketProvider(
    env.parsed!.RPC_WEBSOCKET_ENDPOINT,
    options
  )
);

const web3 = new Web3(env.parsed!.RPC_ENDPOINT);
const fs = require("fs");
const contractAddress: string = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643";
const ABI = JSON.parse(
  fs.readFileSync("abi/".concat(contractAddress, ".json"))
);
const newContract = new web3.eth.Contract(ABI, contractAddress);

var exchangeRate = 0.0;

// https://docs.compound.finance/v2/ctokens/
async function detect() {
  const exchangeRateCurrent = await newContract.methods
    .exchangeRateCurrent()
    .call();
  console.log("exchangeRateCurrent: ", exchangeRateCurrent / 10 ** 28);
  if (exchangeRateCurrent < exchangeRate) {
    console.log("Hacking Alert!!");
  }
}

async function main() {
  // Subscribe
  var subscription = websocket.eth
    .subscribe("newBlockHeaders", function (error, result) {
      if (!error) {
        console.log("-------------------------------");
        console.log("Block Number: ", result.number);
        console.log("-------------------------------");
        detect();
        return;
      }
      console.error("error: ", error);
    })
    .on("connected", function (subscriptionId) {
      console.log("subscriptionId: ", subscriptionId);
    })
    .on("data", function (blockHeader) {
      console.log("blockHeader: ", blockHeader);
    })
    .on("error", console.error);

  // unsubscribes the subscription
  subscription.unsubscribe(function (error, success) {
    if (success) {
      console.log("Successfully unsubscribed!");
    }
  });
}

main();
