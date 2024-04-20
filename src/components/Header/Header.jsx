import React from "react";
import { Box, Image, Link, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import img from "./weather_icon.png";
import SearchBar from "../SearchBar/SearchBar";

function Header({ onSelect }) {
  return (
    <Box
      display="flex"
      justifyContent={{ base: "space-between", md: "space-around" }}
      alignItems="center"
      p={4}
      position="sticky"
      top={0}
      zIndex={1}
      bg="teal"
      height={{ base: "64px", md: "80px" }}
    >
      <Box display={{ base: "block", md: "none" }}>
        <Link
          as={ReactRouterLink}
          to="/"
          textDecoration="none"
          _hover={{
            textDecoration: "none",
          }}
        >
          <Image src={img} boxSize="43px" objectFit="cover" mr={4} />
        </Link>
      </Box>

      <Box display={{ base: "none", md: "block" }}>
        <Link
          as={ReactRouterLink}
          to="/"
          textDecoration="none"
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontSize={{ base: "md", md: "xl" }}
            fontWeight="bold"
            letterSpacing="tight"
            color="white"
            transition="0.3s ease"
            _hover={{
              color: "#FBBC04",
            }}
          >
            Weather Wise
          </Text>
        </Link>
      </Box>

      <Box>
        <SearchBar onSelect={onSelect} />
      </Box>
    </Box>
  );
}

export default Header;
