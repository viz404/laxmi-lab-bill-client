import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import React from "react";

const JobWorkSelector = ({
  typeOfWorks,
  selectTypeOfWork,
  selectedTypeOfWorks,
}) => {
  return (
    <Box
      borderWidth={1}
      borderRadius={15}
      padding={2}
      width="20vw"
      boxShadow="md"
    >
      <Flex
        maxHeight={"40vh"}
        overflowY="auto"
        direction="column"
        gap={2}
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {typeOfWorks?.map((el, index) => (
          <Checkbox
            key={index}
            size="lg"
            name={el.title}
            spacing="1rem"
            isChecked={selectedTypeOfWorks.includes(el.title)}
            onChange={(event) => selectTypeOfWork(event, el)}
          >
            <Text fontSize="xl">{el.title}</Text>
          </Checkbox>
        ))}
      </Flex>
    </Box>
  );
};

export default JobWorkSelector;
