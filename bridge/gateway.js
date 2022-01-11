import web3 from "./web3";
import Gateway from "../build/contracts/Gateway.json";
const instance = new web3.eth.Contract(
  Gateway.abi,
  "0x4ce7C36b9d2ca6A594E7a688897C94B42bCa859F"
);
export default instance;
