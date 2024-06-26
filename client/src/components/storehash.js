import web3 from "../utils/web3";

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0xeEB2Bbfe8680CFE80c4030b2b7bfCf8D240c2074';
//use the ABI from your contract
const abi = [
  {


            "constant": true,
            "inputs": [],
            "name": "getHash",
            "outputs": [
                {
                    "name": "x",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "x",
                    "type": "string"
                }
            ],
            "name": "sendHash",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"


  }
]
export default new web3.eth.Contract(abi, address);
