import {useState} from 'react';
import {ethers, BigNumber} from 'ethers';  // use BigNumber cuz solidity cannot arbitrarily store laor use large numbers
import {Box, Button, Flex, Input, Text} from '@chakra-ui/react';
import roboPunksNFT from '../RoboPunksNFT.json'

const roboPunksNFTAddress = '0xb90dBc02eEDeD35D7EDA09Dcb8Aa03ce6CcD43C5'

const MainMint = ({accounts, setAccounts})=>{
  const [mintAmount, setMintAmount] = useState(1)  //default mint amount
  const isConnected = Boolean(accounts[0])

  async function handleMint() 
  {
    if (window.ethereum) 
    {
      // telling ethers that mmw is my web3 provider and connecting to the blockchain
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()  // getting mmw to sign the tx
      // giving ethers the application's smart contract address, the abi, and the signer
      const contract = new ethers.Contract(roboPunksNFTAddress, roboPunksNFT.abi, signer)
      try
      {
        const response = await contract.mint(BigNumber.from(mintAmount), {  //passing to the contract's mint function
          value: ethers.utils.parseEther((0.02 * mintAmount).toString())})  // setting mint price  
        console.log(response)
      }catch(err){console.log(err)}
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);  // if the minus button is pressed
  }

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);  // if the plus button is pressed
  }

  return(
    <Flex justify="center" align="center" height="100vh" paddingBottom = "150px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000000">RoboPunks</Text>
          <Text 
          fontSize="45px" letterSpacing="-2.5px" fontFamily="VT323" textShadow="0 2px 2px #000000">
            It's 2078. Can the RoboPunks save humans from the Decepticons?, Mint RoboPunks to find out
          </Text>
        </div>
        {
          isConnected ? (
            <div>
              <Flex align="center" justify="center">
                <Button 
                backgroundColor="#d6517d" borderRadius="5px" boxShadow="0 2px 2px 1px #0f0f0f" color="white" cursor="pointer"
                fontFamily="inherit" padding="15px" marginTop="10px"
                onClick={handleDecrement}
                >-</Button>
                <Input type="number" value={mintAmount} 
                  readOnly fontFamily="inherit" width="100px" textAlign="center" marginTop="10px" padding="6px 5px 6px 13px"
                />
                <Button 
                backgroundColor="#d6517d" borderRadius="5px" boxShadow="0 2px 2px 1px #0f0f0f" color="white" cursor="pointer"
                fontFamily="inherit" padding="15px" marginTop="10px"                
                onClick={handleIncrement}
                >+</Button>
              </Flex>
              <Button 
              backgroundColor="#d6517d" borderRadius="5px" boxShadow="0 2px 2px 1px #0f0f0f" color="white" cursor="pointer"
              fontFamily="inherit" padding="15px" marginTop="10px"               
              onClick={handleMint}
              >Mint Now</Button>
            </div>) : (<Text textShadow="0 3px #000000">..you must be connected to mint..</Text>)
        }
      </Box>
    </Flex>
  )
}

export default MainMint;