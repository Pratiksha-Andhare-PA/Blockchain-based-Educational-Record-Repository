const Web3 = require('web3');
const contract = require('./build/contracts/SimpleStorage.json');

async function main() {
    const web3 = new Web3('http://localhost:7545'); // Connect to the Ganache
    const id = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[id];
    const accounts = await web3.eth.getAccounts();

    const simpleStorage = new web3.eth.Contract(
        contract.abi,
        deployedNetwork.address,
    );

    // Set data to the contract
    const receipt = await simpleStorage.methods.set(123).send({ from: accounts[0], gas: 500000000 });
    console.log('Transaction receipt:', receipt);

    // Get data from the contract
    const response = await simpleStorage.methods.get().call();
    console.log('Stored data:', response);
}

main().then(() => process.exit(0)).catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
