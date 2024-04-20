import React, { useEffect, useState } from "react";
import img1 from "./image1.jpg";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  Stack,
} from "@chakra-ui/react";
import SearchBar from "../../components/SearchBar/SearchBar";

function Home() {
  const navigate = useNavigate();

  const handleLocationSelect = (selectedLocation) => {
    if (selectedLocation && Object.keys(selectedLocation).length !== 0) {
      navigate("/weather", { state: selectedLocation });
    } else {
      console.log("Selected location is empty");
    }
  };

  return (
    <>
      <Box
        bgImage={`url(${img1})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        h="100vh"
        overflow="hidden"
        bgSize="cover"
      >
        <Container>
          <Box mt={20} textAlign={"center"}>
            <Heading as="h3" size="lg" color={"white"}>
              Welcome to WeatherWise!
            </Heading>
            <Box mt={20}>
              <SearchBar onSelect={handleLocationSelect} />
            </Box>
          </Box>
          <Stack mt={5} spacing="4">
            <Card
              align="center"
              color={"#333333"}
              backgroundColor={"#92B7D7"}
              borderRadius={7}
              boxShadow="1px 1px 3px rgba(0, 0, 0, 0.2)"
            >
              <CardHeader>
                <Heading size="md">Weather</Heading>
              </CardHeader>
              <CardBody>
                <Text pt="2" fontSize="sm">
                  Weather impacts everything from outdoor plans to health and
                  safety. Stay informed with real-time alerts, plan activities
                  confidently, protect your health, travel smarter, and explore
                  industry insights. Join our community for accurate and
                  reliable weather updates.
                </Text>
              </CardBody>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Home;
