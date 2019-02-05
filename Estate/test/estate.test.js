const assert = require('assert');
const testRPC = require('ethereumjs-testrpc');
const Web3 = require('web3');  //W von Web3 da ein Konstruktor Funktion
const web3 = new Web3(testRPC.provider());
const {interface, bytecode} = require('../compile'); // interface = ABI, bytecode=bytecode des Smart Contracts

let accounts;
let estate;

beforeEach(async() => {
    // Liste alle Ethereum Accounts von TestRPC lokal Ethereum
    accounts = await web3.eth.getAccounts();

    // Der Smart Contract wird über den ersten Ethereum Account accounts[0]

    estate= await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode, arguments: ['gelu.liuta@gmail.com', 10000]})
    .send({from:accounts[0], gas:'1000000'});
});

//Testing Account Creation & Smart Contract Deployment on TestRPC
describe ('Estate Object', ()=> {
    it('can deploy TestRPC Nodes', ()=> {
        console.log(accounts);
    });
    it('can deploy a smart contract', ()=> {
        console.log('Contract deployed has the adress: ', estate.options.address);
        assert.ok(estate.options.address);
    });

    it('contructor test with default values', async ()=>{
        const eMail = await estate.methods.email().call();
        assert.equal(eMail, 'gelu.liuta@gmail.com');
    });

    it('can change E-Mail Adress of the contract', async ()=>{
       await estate.methods.setEmail('ady.liuta@gmail.com').send({from: accounts[0]});
       const eMail = await estate.methods.email().call();
        assert.equal(eMail, 'ady.liuta@gmail.com');
    });
});