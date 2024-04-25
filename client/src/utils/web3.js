import Web3 from 'web3';
import contractData from './contracts/EducationContract.json'; 

const web3 = new Web3(window.ethereum || window.web3.currentProvider);

const abi = contractData.abi;
const networkId = '3'; // This should match the network ID in your Truffle config for Ropsten
const contractAddress = contractData.networks[networkId] && contractData.networks[networkId].address;

if (!contractAddress) {
  console.error("Contract not deployed on the detected network.");
}

const educationContract = new web3.eth.Contract(abi, contractAddress);

export { web3, educationContract };
