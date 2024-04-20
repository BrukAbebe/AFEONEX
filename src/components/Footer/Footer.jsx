import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <Box
      bg="#2c3e50"
      color="white"
      width="100%"
      padding="0.5rem"
      borderTop="1px solid #fff"
      position="relative"
      bottom="0"
      left="0"
    >
      <Text textAlign="center" fontSize="xs">
        {" "}
        Designed by Biruk
      </Text>
      <Text textAlign="center" fontSize="xs">
        {" "}
        <Link href="https://t.me/BrookinHim" isExternal>
          Telegram
        </Link>{" "}
        |{" "}
        <Link href="https://www.linkedin.com/in/birukab" isExternal>
          LinkedIn
        </Link>
      </Text>
    </Box>
  );
}

export default Footer;
