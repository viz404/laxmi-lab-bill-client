import { Button, Checkbox, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const JobWorkSelector = ({ typeOfWorks, selectTypeOfWork }) => {
  return (
    <Flex
      borderWidth={1}
      borderRadius={15}
      padding={5}
      direction="column"
      gap={3}
      width={"20vw"}
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
            id={el._id}
            name={el.title}
            onChange={selectTypeOfWork}
          >
            {el.title}
          </Checkbox>
        ))}
      </Flex>
    </Flex>
  );
};

export default JobWorkSelector;
