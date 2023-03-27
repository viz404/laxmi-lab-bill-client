import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DoctorSelector from "../components/DoctorSelector";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [doctor, setDoctor] = useState({});

  const { total } = useSelector((store) => store.job);

  return (
    <Box padding={3}>
      <Box margin="5rem auto" width="50vw">
        <Input
          placeholder="Enter Patient name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Flex justifyContent="space-between">
        <Box>
          <DoctorSelector selectDoctor={setDoctor} />
        </Box>
        <Box>
          <Box
            margin="2rem 8rem"
            maxHeight="70vh"
            overflowY="auto"
            borderWidth={1}
            borderRadius={10}
            scrollBehavior="smooth"
            sx={{
              "&::-webkit-scrollbar": {
                width: "5px",
                borderRadius: "10px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10px",
                backgroundColor: `rgba(0, 0, 0, 0.3)`,
              },
            }}
          ></Box>
          <Flex justifyContent="space-between" width="70vw" margin="2rem auto">
            <Button
              colorScheme="blue"
              isDisabled={page == 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </Button>
            <Button
              colorScheme="blue"
              isDisabled={total - 10 * page < 0}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Jobs;
