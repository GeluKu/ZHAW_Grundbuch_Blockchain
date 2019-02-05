const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');


const provider = new HDWalletProvider (
    'away torch cement pact spread inhale student unfold possible power wet bullet',
     'https://rinkeby.infura.io/v3/921a5e6844a446e8a421e76cde73c7a2');
 
    
const web3 = new Web3(provider);

console.log('Start deployment auf Rinkeby...');

const deployFunction = async () => {

    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy contract from the Rinkeby account: ', accounts[0]);

    estate= await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode, arguments: ['gelu.liuta@gmail.com', 10000]})
    .send({from:accounts[0], gas:'1000000'});

    console.log(interface);
    console.log('The adress of the new contract is: ', estate.options.address);

    console.log('Deployment abgeschlossen');
};

deployFunction();