import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <Box
      bg="#2c3e50"
      color="white"
      width="100%"
      borderTop="1px solid #fff"
      py={4} // Add some padding for better spacing
    >
      <Text textAlign="center" fontSize="xs">
        Designed by Biruk
      </Text>
      <Text textAlign="center" fontSize="xs">
        <Link href="https://t.me/BrookinHim" isExternal>
          Telegram
        </Link>{" "}
        |{" "}
        <Link href="https://www.linkedin.com/in/birukabebe" isExternal>
          LinkedIn
        </Link>
      </Text>
    </Box>
  );
}

export default Footer;