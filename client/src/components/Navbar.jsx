import React from "react";
import {Box, Button, Flex, Image, Link, Spacer} from '@chakra-ui/react';
import Facebook from '../assets/social-media-icons/facebook_32x32.png';
import Twitter from '../assets/social-media-icons/twitter_32x32.png';
import Email from '../assets/social-media-icons/email_32x32.png';


const Navbar = ({accounts, setAccounts})=>{
  const isConnected = Boolean(accounts[0])  // if accounts[0] exists, isConnected will be True

  async function connectAccount()
  {
    if (window.ethereum)  // window.ethereum is metamasks injection into our website
    {
      const accounts = await window.ethereum.request({method: "eth_requestAccounts"}) // a request for mmw accounts
      // this gives us all the acounts in the metamask wallet ``in an array
      setAccounts(accounts)  // using setAccount to change state to the new array of accounts
    }
  }

  return(
    // using chakra we can say
    <Flex justify="space-between" align="center" padding="10px 20px"> 
      {/* left side of navbar -- social media icons*/}
      <Flex justify='space-around' width='40%' padding='20px 20px'>
        <Link href="https://www.facebook.com">
          <Image src={Facebook} boxSize="30px" margin="0 15px"/>
        </Link>
        <Link href="https://www.twitter.com">
          <Image src={Twitter} boxSize="30px" margin="0 15px"/>
        </Link>
        <Link href="https://www.gmail.com">
          <Image src={Email} boxSize="30px" margin="0 15px"/>
        </Link>
      </Flex>

      {/* Rght Side -- Sections and connect */}
      <Flex justify="space-around" align="center" width="50%" padding="20px 20px">
        <Box cursor="pointer" margin="0 5px">About</Box>
        <Spacer/>
        <Box cursor="pointer" margin="0 5px">Mint</Box>
        <Spacer/>
        <Box cursor="pointer" margin="0 5px">Team</Box>
        <Spacer/>
        {isConnected ? (<Box margin="0 15px">Connected</Box>) : (
          <Button 
          backgroundColor="#d6517d" 
          borderRadius="5px" 
          boxShadow="0px 2px 2px 1px #0f0f0f" 
          color="white" 
          cursor='pointer' 
          fontFamily='inherit' 
          padding="15px" 
          margin="0 1px" 
          onClick={connectAccount}
          >
            Connect
          </Button>)}
      </Flex>
    </Flex>
  )
}

export default Navbar