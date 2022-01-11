import web3 from "./web3";
import Gateway from "../build/contracts/Gateway.json";
const instance = new web3.eth.Contract(
  Gateway.abi,
  "<paste_deployed_contract_address_here>"
);
export default instance;
