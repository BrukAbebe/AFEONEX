import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import {
  fetchGeocodingData,
  fetchZipData,
} from "./../../utils/WeatherApi/WeatherApi";
import { Box, Button, List, ListItem } from "@chakra-ui/react";

import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSelect }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");

  const getSuggestions = async (inputValue) => {
    try {
      const data = await fetchGeocodingData(inputValue);
      if (data) {
        const filteredSuggestions = data.filter((suggestion) =>
          suggestion.name.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      setSuggestions([]);
      console.error(error);
    }
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <Box
      cursor="pointer"
      _hover={{ bg: "gray.100", color: "#FBBC04" }}
      onClick={() => onSelect(suggestion)}
      p={1}
    >
      {suggestion.name}, {suggestion.country}
    </Box>
  );

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    onSelect(suggestion);
  };

  const handleSearchClick = async () => {
    if (value.trim() !== "") {
      try {
        const inputValueAsNumber = parseFloat(value);

        if (!isNaN(inputValueAsNumber)) {
          const data = await fetchZipData(inputValueAsNumber);
          if (data) {
            onSelect(data);
          } else {
            alert("No data found for the provided zip code.");
          }
        } else {
          const data = await fetchGeocodingData(value);
          if (data) {
            onSelect(data[0]);
          } else {
            alert("No data found for the provided city name.");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const inputProps = {
    placeholder: "Search City or Zip code",
    value,
    onChange,
    onKeyDown: handleKeyDown,
    style: {
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#fff",
      padding: "4px",
      margin: "8px 0",
      width: "100%",
    },
  };

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
        theme={{
          container: {
            width: "100%",
            position: "relative",
          },
          suggestionsList: {
            color: "black",
            position: "absolute",
            zIndex: "1",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "white",
            border: "1px solid #E2E8F0",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "0",
            listStyleType: "none",
            margin: "0",
          },
          suggestion: {
            padding: "1px",
          },
        }}
      >
        <List>
          {suggestions.map((suggestion, index) => (
            <ListItem key={index}>{renderSuggestion(suggestion)}</ListItem>
          ))}
        </List>
      </Autosuggest>
      <Button
        w={4}
        ml={-8}
        variant="outline"
        borderColor="transparent"
        bg="transparent"
        _hover={{ bg: "transparent" }}
        d="flex"
        alignItems="center"
        onClick={handleSearchClick}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default SearchBar;
