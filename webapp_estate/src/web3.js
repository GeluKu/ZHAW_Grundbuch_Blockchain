import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider); //using the web3 provider from browser (Metamask)

export default web3;