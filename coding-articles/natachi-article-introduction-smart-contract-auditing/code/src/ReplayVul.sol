// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract SimpleNFTMarketplace {
    mapping(address => uint256) public balances;
    mapping(uint256 => address) public tokenOwners;
    mapping(address => uint256) public nonces;

    function buyToken(uint256 _tokenId, uint256 _price, uint256 _nonce) public {
        require(tokenOwners[_tokenId] != address(0), "Token does not exist");
        require(balances[msg.sender] >= _price, "Insufficient balance");
        require(_nonce > nonces[msg.sender], "Nonce must be greater than the previous nonce");
        balances[msg.sender] -= _price;
        balances[tokenOwners[_tokenId]] += _price;
        tokenOwners[_tokenId] = msg.sender;
        nonces[msg.sender] = _nonce;
    }
}
