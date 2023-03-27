import { Checkbox, Flex } from "@chakra-ui/react";
import React from "react";

const JobWorkSelector = ({ typeOfWorks, selectTypeOfWork }) => {
  return (
    <Flex
      borderWidth={1}
      borderRadius={15}
      padding={2}
      direction="column"
      gap={3}
      minWidth="15vw"
      boxShadow="md"
    >
      <Flex
        maxHeight={"40vh"}
        overflowY="auto"
        direction="column"
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
            onChange={(event) => selectTypeOfWork(event, el)}
          >
            {el.title}
          </Checkbox>
        ))}
      </Flex>
    </Flex>
  );
};

export default JobWorkSelector;
