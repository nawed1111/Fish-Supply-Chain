// This script is designed to test the solidity smart contract - Tracking.sol
// and the various functions within

const Gateway = artifacts.require("Gateway");
contract("Gateway", function (accounts) {
  let upc = 1;
  const ownerID = accounts[0];
  const originFishermanID = accounts[1];
  const originCoastLocation = "-38.239 and 144.341490";
  let tunaNotes = "";
  let tunaPrice = web3.utils.toWei("0", "ether");
  // let tunaState = 0;
  const regulatorID = accounts[2];
  let auditStatus = "";
  const restaurantID = accounts[3];
  const emptyAddress = "0x0000000000000000000000000000000000000000";

  console.log("Ganache-cli accounts used here...");
  console.log("Contract owner: accounts[0] ", accounts[0]);
  console.log("Fisherman: accounts[1] ", accounts[1]);
  console.log("Regulator: accounts[2] ", accounts[2]);
  console.log("Restaurant accounts[3] ", accounts[3]);

  //1st Test
  it("Testing smart contract function catchTuna() that allows a Fisherman to catch Tuna", async () => {
    const gateway = await Gateway.deployed();
    await gateway.addFisherman(accounts[1], { from: accounts[1] });
    await gateway.catchTuna(upc, originFishermanID, originCoastLocation, {
      from: accounts[1],
    });

    const result = await gateway.queryTuna(upc, { from: accounts[1] });

    assert.equal(result[0], originFishermanID, "Error: Invalid owner ID");
    assert.equal(
      result[1],
      originCoastLocation,
      "Error: Invalid coast location"
    );
    assert.equal(result[2], tunaNotes, "Error: Invalid notes");
    assert.equal(result[3], tunaPrice, "Error: Invalid tuna price");
    assert.equal(result[4], 0, "Error: Invalid tuna state");
    assert.equal(result[5], emptyAddress, "Error: Invalid Regulator ID");
    assert.equal(result[6], auditStatus, "Error: Invalid audit status");
  });

  //2nd Test
  it("Testing smart contract function recordTuna() that allows a Fisherman to record Tuna fish details", async () => {
    const gateway = await Gateway.deployed();
    tunaNotes = "Test Tuna Fish Notes";
    tunaPrice = web3.utils.toWei("10", "ether");
    await gateway.recordTuna(upc, tunaPrice, tunaNotes, { from: accounts[1] });
    const result = await gateway.queryTuna(upc, { from: accounts[1] });

    assert.equal(result[2], tunaNotes, "Error: Invalid notes");
    assert.equal(result[3], tunaPrice, "Error: Invalid tuna price");
    assert.equal(result[4], 1, "Error: Invalid state");
  });

  //3rd Test
  it("Testing smart contract function auditTuna() that allows a Regulator to audit Tuna", async () => {
    const gateway = await Gateway.deployed();
    auditStatus = "Passed";
    await gateway.addRegulator(accounts[2], { from: accounts[2] });
    await gateway.auditTuna(upc, auditStatus, { from: accounts[2] });

    const result = await gateway.queryTuna(upc, { from: accounts[2] });
    assert.equal(result[5], regulatorID, "Error: Invalid Regulator ID");
    assert.equal(result[6], auditStatus, "Error: Invalid audit status");
  });

  //4th Test
  it("Testing smart contract function buyTuna that allows a Restaurant to buy Tuna", async () => {
    const gateway = await Gateway.deployed();
    const price = web3.utils.toWei("10", "ether");
    await gateway.addRestaurant(accounts[3], { from: accounts[3] });
    await gateway.buyTuna(upc, price, { from: accounts[3], value: price });
    const result = await gateway.queryTuna(upc, { from: accounts[3] });

    assert.equal(result[0], restaurantID, "Error: Invalid Owner");
    assert.equal(result[4], 3, "Error: Invalid Tuna state");
  });

  //5th Test
  it("Testing smart contract function transferOwnership() that allows assigning a new owner", async () => {
    const gateway = await Gateway.deployed();
    await gateway.transferOwner(accounts[5], { from: ownerID });
    const newOwner = await gateway.owner();
    assert.equal(newOwner, accounts[5], "Error: Incorrect new Owner");
  });
});
