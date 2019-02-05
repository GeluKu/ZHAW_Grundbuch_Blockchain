pragma solidity ^0.4.25;

//Definition eines Smart Contract für das Eigentum (z.B. Grundstück oder Haus)
//Definition of a smart contract for a property (for example land, house)

contract Estate {
  address public owner; //owner of the property
  mapping (address => uint) balances; //testcode
  string public greeting; //some test code - to be deleted latter

  bool public status;   //is the property visible or not for the blockchain participants 
  string public email;  //contact for the property owner
    

  // attributes according to Swiss land register
  string public landRegister; //local land register - in Switzerland Grundbuchamt;

  uint public propertyNumber; //ID for the property according to the land register - LiegenschaftNummer;
                              //In Switzerland - eGrid / For other markets a unique has number derived on ID  uint public planNumber;     //Plan number for the property - PlanNummer;

  uint public propertyValue;    //property value according to owner estimation LiegenschaftWert;

  string public propertyType;   //type of property (house, land, etc.) - GrundstueckArt;
  uint public propertyArea;     // surface in m2 - Flaeche;
  string public propertyGeolocation;  //location of the property - OrtBezeichnung;

  uint public propertyInsurance;  //inssurance of the property - GebauedeVersicherung;

  string public propertyNotes; //memo field for extra information  - Vorbemerkungen
  string public propertyCollateral; //collateral - Grundpfandrechte
  string public propertyEasements; //property easements Dienstbarkeiten

//Smart Contract Constructor
constructor(string memory eMail, uint propValue) public {
    owner = msg.sender;
    status = true;
    email = eMail;
    propertyValue = propValue; 

  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

function setPropertyValue(uint newValue) public {
    propertyValue = newValue;
}

function getPropertyValue() public view returns (uint pValue) {
    return propertyValue;
}

function setEmail(string memory eMailAdress) public {
    email = eMailAdress;
}

function queryBalance() public view returns (uint256) {
        return address(this).balance;
    }

}