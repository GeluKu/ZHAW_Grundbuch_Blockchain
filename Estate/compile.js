const path = require('path'); // wichtig für Cross-Platform Kompatibilität
const fs = require ('fs');
const solc = require('solc'); // solc= Solidity Compiler

const estatePath = path.resolve(__dirname, 'contracts', 'Estate.sol'); //contracts ist der Ordner , Estate.sol der Smart Contract

const source = fs.readFileSync(estatePath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Estate']; // 1 = ein Smart Contract wird compiliert, :Estate bytecode für Smart Contract