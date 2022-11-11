# A Detailed Tutorial to Understanding Mapping in Solidity
## Introduction
The end goal of smart contracts is to facilitate a secured activity—which is often transactional—between two or more entities, and data is always involved in the process. 

While smart contracts might not host data, they give a bedrock of efficient data classification and storage. 

This is where mapping becomes relevant for anyone who wants to build contracts with Solidity. If you don't know mapping, you cannot efficiently make basic and sophisticated smart contracts with Solidity. 

Against this backdrop, the goal of this piece is to walk you through the idea and the nitty-gritty of mapping in Solidity. 

## What is the essence of mapping in Solidity? 
The essence of mapping in Solidity is to create co-referentiality between an object and its value, such that the object can be easily trackable. In a word, mapping is a method of construing data structure in Solidity. 

Meanwhile, the idea of mapping is not entirely new. Recall that Solidity was fashioned after C++, Javascript, and Python. If you code in C++ and Javascript, you should know maps. 

In Python, think of mapping as something similar to how dictionaries work; that should give you a more relatable perspective. However, we must underscore that the mapping syntax in Solidity is not entirely the same as in its cousin languages. 

## Analogies to Explain How Mapping Works 
Here is a real-life illustration of how mapping works in Solidity:

Assuming there is a tech conference where everyone is given a tag for security and identification reasons. John, Grace, and Nana are guest speakers. John is given number 1; Grace, 2; and Nana, 3.

When the MC says, "Ladies and gentlemen, I hope you're enjoying yourself. Now, let's welcome the first speaker for this honorable event!" 

In the instant case, the MC doesn't need to mention names before John knows they are addressing him. The reason is that the number 1 is co-referential to the name John. 

This is precisely how mapping works in Solidity, and it helps us tie an object or something to a specific value. 

Here is another scenario to better paint the picture of mapping in Solidity:

During elections, in some places, the thumbnail of registered voters who have carried out their civic duties are always painted with a small brush of permanent blue color.

Thus, any voter with that color on his thumb has voted. That way, we can associate and identify voters with this color on their thumbnails. The mode of identification applied here is similar to how mapping works.


## How to Create Mapping in Solidity
There is a conventional method to create a mapping. Hence, the reason mapping has its syntax in Solidity, and here is it:
```
  mapping(theKey => theValue) public theName;
```

First, you need to start with the `mapping` keyword, which will inform the compiler that it should recognize the primary types, point to each other, and flow with the general mapping syntax.

Then you input your key type. Unlike other cousin languages, the data type for the key can be:
- Enum
- Bool
- Address
- Bytes, or
- String

Remember that you cannot use custom-made data types, including arrays and structs, as your key types; it will not work, and Solidity will throw off an error. In a nutshell, Solidity has a strict syntax for key types in mapping.

Moving on to the value types, Solidity accommodates all the data types to form a value pair in a mapping. You can use uint, string, and bytes. Depending on your contract, you can also use more sophisticated data types such as mappings and arrays; it is limitless.

The next step is to define the extent to which the mapping should be visible. If you declared it at the state, there are chances that you would want to reference it in the next part of the contract.

Therefore, you can set it to public or internal in that case. Finally, you should name your mapping. The name will be helpful to initialize the mapping and call it when necessary.

## What are the two types of mapping in Solidity?
The two types of mapping in solidity are simple and nested mapping. A simple mapping happens when we map a key type to a value pair. But a nested mapping is when another key type points to simple mapping.

Don’t fret if you do not get it. Here is a visual explanation:
```
mapping(address => DaoMembers) members;
mapping (bool => mapping(address => DaoMembers)) memberStatus;
```
The first mapping above is straightforward because the address was tied to DaoMembers. Recall that the value type can be any data type whatsoever.

Thus, we are making the address of each member of the DAO under the umbrella of members.

However, you will notice that the second mapping appears to be quite complicated; it is a nested mapping. Each of them has different use cases.

In the nested mapping, we are trying to monitor the status of each member of the DAO. Therefore, we need to first map the address to DaoMembers before nesting it to a boolean key type.

## What are the use cases of mapping in Solidity? 
The first thing you should know is that what will form the key and value types of your mapping depends on what you are building. To aid your understanding, we shall examine ERC-20 and ERC-721 contracts and learn creative real-time cases where mapping can be applied.

1. ### Tracking Balance
Since addresses are always in numbers and these addresses will have balances to know how much ether they have in the contracte, we can matchmake addresses and uint to track the balances of everyone who has interacted with the contract.
```
mapping(address => uint) public balanceOf; 
```
In the mapping above, we pointed addresses to uint so we can form a sort of hash table for balances of some addresses.

2. ### Tracking Allowance or Approvals
In implementations such as ERC-20, addresses can allow or approve the address that owns the contract to send ether on their behalf. 
```
mapping(address => mapping(address => uint)) public allowance; 
```
The mapping above is a nested one that involves two sets of addresses where one allows or approves the other to take a specific action.

3. ### Identifying owners
There are instances when you will need to track the owners of some IDs in ERC-721. This is how to do it:
```
mapping(uint => address) internal _ownerOf;
```
Since we are more concerned about IDs, we will point uint to address.

## How Mappings Are Stored in Solidity
Mapping in itself is not capable of storing data. The only extent to which they are helpful in helping us tie some key types to value types. This is why you will discover that you cannot get the “.length” of mappings because they do not store actual data in real-time.

But while it does not store data, we will need the hash of the key to trace its value pair. The hashes are stored in the storage slots of the contract. As a result, mappings can only declared at the state level and should be stored in storage; not calldata or memory. 

There are a couple of reasons for this strict data location syntax. First, memory and calldata have a temporary nature, and are always declared locally. Therefore, they are unfit to be the data location of hashes that will be needed from time to time. 

But in the case of storage, it. Thus, it is the fittest data location.

## How to Set, Get, Update and Delete Mappings
It is one thing to know how to create mappings, but it is another thing to be skillful with it while building your contract. You can set, get, update, and delete mappings in Solidity. Here is an example of such contracts:
```
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
```
Now, let us break these processes down.

### Setting Mapping
Setting the value for mapping is quite straightforward; place the mapping beside an address that receives ether and assign it to a value.
```
function settingMapping() external{
     theBalanceOf[msg.sender] = 3 ether;
    }
```
### Getting Mapping
You can fetch the value of a mapping. But to do that, you need to create a variable and assign it to the address mapping.

At this point, remember that you can get the value of both the mappings you have set and those you have not.

In the former case, Solidity will return the value you set to it. But for unset mappings, if the slot does not have a value yet, it will return the default value of uint, which is zero.
```
 function gettingMapping() external view{
      // for set address
      uint bal = theBalanceOf[msg.sender];
 
      // for unset address
      uint bal13 = theBalanceOf[address(13)];
    }
```

Having said that, another way to get the value of a mapping is by calling a getter function. With this method, you do not necessarily need to assign the mapping to a new varibale. For instance:
```
 function getmapping() public view returns(uint){
      return theBalanceOf[msg.sender];
    }
```

### Updating Mapping
You may need to work with the current state of mapping, whether you would like to increase or decrease it. Thus, you have to update the mapping.

If you increase the value of the mapping during the updating process, be aware that the incrementaion will be an addition to the current value.

For instance, if the mapping value is 3 and you update it to 13, the total value will now be 16.
```
function updatingMapping() external{
       theBalanceOf[msg.sender] += 13 ether;
       }
```
But you need to note an important fact: you cannot update the mapping of a value you have not set.

### Clearing Mapping
Perhaps you want to get rid of the value in a mapping, you can clear it by using the `delete keyword`.
```
 function clearingMapping() external{
      delete theBalanceOf[address(13)];
      delete theBalanceOf[msg.sender];
      }
```

## How to Work with Arrays in Mapping
There is a slight variation when you have strings of arrays as the value type of your mapping, especially when it is a dynamic array. In such instances, be mindful of your parameters.
```
 contract MappingArrays{
      mapping(uint => string[]) public theArrays;
 
      function setArrary(uint theKey, string memory John, string memory Grace, string memory Gold) external {
          theArrays[theKey] = [John, Grace, Gold];
      }
 
      function getArrays(uint theKey) public view returns(string[] memory){
        return theArrays[theKey];
      }
      }
```
In the `setArray function`, we defined the key and the strings in the array, and we also set them to memory because we will be using them locally and temporarily.

Then we assign the key of the array to the members of the array; that is how to set the mapping of an array.

In the second function, we tried to get the value of the mapping. Hence, we inserted the key in the first parameter and requested the function to return in strings since the arrays are in strings.

## How to Loop Through Mapping
It is quite impossible to loop through mapping because that was how the syntax was structured. Fortunately, there is a smart way to do that.

Recall that each mapping would always contain a key type, add that key to an array, and iterate over that array. Once you loop over the array that holds the key in the mapping, you are iterating indirectly through the actual mapping itself.

This is an example:
```
contract LoopingMaps{
   
    string[] theirNames;
    mapping(string => uint) depositsOf;
 
    function looping() external {
     
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
  ```
The contract above is about the amounts of ether some people have deposited. We want to track their names, so we will use the string type to store the data.
The second step was to set the mapping by assigning value to each of its keys. Then push the array into each of the key types.

Everything we have done so far was to ensure the mapping was loopable. Now, using the for loop syntax, we can loop their names and increment the array balances with 1 ether. 

## Iterable mapping
In a case where the key type of your mapping is an array, you cannot iterate through it to get its element, at least on the surface. Fortunately, there is a way to iterate through the values of a mapping. 

Let us take some minutes to examine that:
```
 contract IterableMapping{
     
     // mapping of the addresses
     mapping(address => uint) public theBalanceOf;
     // mapping to check the addresses with successful transactions
     mapping(address => bool) public successful;
     // the array of addresses
     address[] public keys;
 
     function setBalances(address _key, uint _value) public{
      theBalanceOf[_key] = _value;
 
      // setting the logic of successful transactions
 
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
 ```

In this contract, we created two mappings with an array of addresses being their key type. We have to set the key and the value pairs, which we did in the `setBalances function`.
```
 function setBalances(address _key, uint _value) public{
      theBalanceOf[_key] = _value;
 
      // setting the logic of successful transactions
 
      if(!successful[_key])  {
        successful[_key] = true;
        keys.push(_key);
      }
     }
```
We passed the key and value pairs variables into the parameter and assigned the key of the balances to the value. It is time to set the second mapping, which has a boolean value.

Recall that the default value of bool is false. Therefore, we declared the negation of the successful mapping against the key. Then we stated that the compiler should push the key into the array if a successful key is true.
```
  function getLength() public view returns(uint){
        return keys.length;
      }

This function attempts to get the length of the array.

  function getTheI(uint i) public view returns(uint) {
        return theBalanceOf[keys[i]];
      }
```
We will need the `i variable` when we want to run a loop. Thus, this function returned the balances of keys that form the i variable. Once you have this, you can loop through the mappings we examined earlier in this guide.
```
    function getGenesis() public view returns(uint) {
        return theBalanceOf[keys[0]];
      }
 
      function getTheLast() public view returns(uint) {
       return theBalanceOf[keys[keys.length -1]];
      }
```
These two getter functions retrieved the balances of key[0], which is the array's first element, and the array's last member, which is the length minus 1.

## Creating a Custom Contract in Solidity to Explain Mapping
Since we have learned much about mapping, let us create a simple contract and use the knowledge in real time.
```
// SPDX-License-Identifier: MIT
 pragma solidity ^0.8.16;
 
  contract TheWallet{
      address public John;
 
      constructor() {
          John == msg.sender;
      }
   
    mapping(address => uint) public hisBalance;
    mapping (address=> mapping(address => uint)) public allowThem;
   
    function deposit() public payable {
        hisBalance[msg.sender] += msg.value;
    }
 
    function withdrawal() public payable {
        (bool sent, ) = msg.sender.call{value: hisBalance[msg.sender]}("");
        require(sent, "cannot withdraw");
    }
 
    function transfer(address receiver, uint token) public returns(bool){
        allowThem[msg.sender][receiver] += token;
        hisBalance[msg.sender] += token;
        hisBalance[receiver] -= token;
        return true;
    }
 
    function remainingMoney() public view returns (uint) {
        return address(this).balance;
    }
  }
 ```
 

This contract is a simple wallet contract where users can deposit, transfer, and know the remaining Ethers in the contract. Here, we used mapping to track both balances and allowance.

The next stage is to compile and deploy this contract using Hardhat. Go to the Hardhat folder on your device, locate the contracts folder and write your contract there. Perhaps you have not installed Hardhat in your terminal, paste this on your Vs Code terminal:
```
npm install --save-dev hardhat
```
Then paste this to create a new hardhat project:
```
 npx hardhat
```
For the compilation, run this command:
```
npx hardhat compile
```
Once that is successful, the next phase is deployment to your favorite testnet using the Chainstack Ethereum URL. First, you will need to configure your hardhat. Therefore, locate a hardhat.config file and paste this script. You can create a new one if you could not find it too.
```
require("@nomicfoundation/hardhat-toolbox");

const Chainstack_API_KEY = "KEY";

const Mumbai_PRIVATE_KEY = "YOUR GOERLI PRIVATE KEY";
module.exports = {
  solidity: "0.8.17",

 networks: {

   goerli: {

     url: `https://eth-goerli.chainstackapi.io/v2/${Chainstack_API_KEY}`,
          // simply add your Chainstack URL here

     accounts: [GOERLI_PRIVATE_KEY]
   }

 }

};
```
The final step is to write a deployment script. Create a deploy.js file where you will write your deployment script - you can choose either Javascript or Typescript. 
Then you can deploy to a testnet. But before doing that, you wouold have to write a deploy script that is specific to your contract:
```
npx hardhat run scripts/deploy.js --network goerli
```

Congratulations, you have written a contract with mapping; compiled and deployed it to Goerli with Hardhat!

### Summary - Mapping in Solidity
In this article, we explained mapping in Solidity;  the types, how to use it, how to work with mappings in arrays, how to loop through mappings, and how to iterate through them.

If you have read through this article and coded along, you should know what mappings are and how to use them in Solidity. It can be the case that you do not understand everything for now, but that is fine, and you will know it better with practice.










