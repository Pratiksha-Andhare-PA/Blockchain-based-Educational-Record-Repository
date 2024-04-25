import web3 from "../utils/web3";

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0x3b7ccCec1Cde47fb810B2320e1f0D1933B5Ca7ab';
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
