// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract RoboPunksNFT is ERC721, Ownable
{
  uint256 public mintPrice;  // initializing variables costs gas
  uint256 public totalSupply; // total Supply to an individual wallet
  uint256 public maxSupply;  
  uint256 public maxPerWallet;  
  bool public isPublicMintEnabled;  // is it minting day
  string public baseTokenUri;   // nft images DB URI
  address payable public withdrawWallet;  // address to recieve funds
  mapping(address => uint256) public walletMints; // keeps tracks of all mints and their respective wallets

  constructor() payable ERC721('RoboPunksNFT', 'RP')
  {
    mintPrice = 0.02 ether;
    totalSupply = 0;
    maxSupply = 1000;
    maxPerWallet = 3;
    // set withdraw wallet address
  }
  
  function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner 
  {
    isPublicMintEnabled = _isPublicMintEnabled;
  }

  function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner
  {
    baseTokenUri = _baseTokenUri;
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory)
  {
    // method tokenURI already exists in ERC721 we'll have to override and customize it
    require(_exists(_tokenId), "Token doesn't exist!");
    return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), ".json")); 
    // abi.encodepacked() helps concatenate the filename
  }

  function withdraw() external onlyOwner
  {
    //call withdrawWallet and pass the balance to its value property
    (bool success, ) = withdrawWallet.call{value: address(this).balance}('');
    require(success, 'withdraw failed');
  }

  function mint(uint256 _quantity) public payable 
  {
    require(isPublicMintEnabled, 'minting not enabled');
    require(msg.value == _quantity * mintPrice, 'worng mint value');
    require(totalSupply + _quantity <= maxSupply, 'sold out');
    require(walletMints[msg.sender] + _quantity <= maxPerWallet, 'exceeded max mints per wallet');

    for (uint256 i = 0; i < _quantity; i++)
    {
      uint256 newTokenId = totalSupply + 1;
      totalSupply++;  // effect: change in variable value must happen before _safeMint interaction
      _safeMint(msg.sender, newTokenId);  //interaction
    }
  }
}
