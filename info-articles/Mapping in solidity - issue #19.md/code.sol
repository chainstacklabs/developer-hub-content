// SPDX-License-Identifier : MIT

 pragma solidity ^0.8.17;

  contract MappingLesson{
    
    mapping(address => uint) public theBalanceOf;

    function settingMapping() external{
     theBalanceOf[msg.sender] = 3 ether;
    }
    
    function gettingMapping() external view{
      // for set address
      uint bal = theBalanceOf[msg.sender];

      // for unset address
      uint bal13 = theBalanceOf[address(13)];
    }

    function updatingMapping() external{
       theBalanceOf[msg.sender] += 13 ether;
      
       // this will be the result of 13 + 3
       // 16 total ethers
    }

    function clearingMapping() external{
      delete theBalanceOf[address(13)];
      delete theBalanceOf[msg.sender];
    }


  }


   contract MappingArrays{
      mapping(uint => string[]) public theArrays;

      function setArrary(uint theKey, string memory John, string memory Grace, string memory Gold) external {
          theArrays[theKey] = [John, Grace, Gold];
      }

      function getArrays(uint theKey) public view returns(string[] memory){
        return theArrays[theKey];
      }
  }

  contract LoopingMaps{
    
    string[] theirNames;
    mapping(string => uint) depositsOf;

    function looping() public {
     
     depositsOf["John"] = 5 ether;
     depositsOf["Grace"] = 10 ether;
     depositsOf["Gold"] = 15 ether;

     theirNames.push("John");
     theirNames.push("Grace");
     theirNames.push("Gold");

       for(uint i = 0; i < theirNames.length; i++){
      depositsOf[theirNames[i]] += 1 ether;
    }

      }
  }

  contract IterableMapping{
     
     // mapping of the addresses
     mapping(address => uint) public theBalanceOf;
     // mapping to check the addresses with successful transactions
     mapping(address => bool) public successful;
     // the array of addresses
     address[] public keys;

     function setBalances(address _key, uint _value) public{
      theBalanceOf[_key] = _value;

      // setting the logic successful transactions

      if(!successful[_key])  {
        successful[_key] = true;
        keys.push(_key);
      }
     }

      function getLength() public view returns(uint){
        return keys.length;
      }

      function getTheI(uint i) public view returns(uint) {
        return theBalanceOf[keys[i]];
      }
      
      function getGenesis() public view returns(uint) {
        return theBalanceOf[keys[0]];
      }

      function getTheLast() public view returns(uint) {
       return theBalanceOf[keys[keys.length -1]];
      }
     }

     



  
