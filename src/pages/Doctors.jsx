import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoctorsList from "../components/DoctorsList";
import { loadDoctorsHelper } from "../reduxStore/doctor/doctorActions";
import { Link } from "react-router-dom";

const Doctors = () => {
  const { doctors, total } = useSelector((store) => store.doctor);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const timerRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      dispatch(loadDoctorsHelper(toast, page, search, 20));
    }, 500);
  }, [search, page]);

  return (
    <Box padding={3}>
      <Flex margin="5rem auto" width="50vw" gap={10}>
        <Input
          placeholder="Enter Doctor name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/addDoctor">
          <Button colorScheme="blue">New Doctor</Button>
        </Link>
      </Flex>
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
      >
        <DoctorsList doctors={doctors} />
      </Box>
      <Flex
        justifyContent="space-between"
        width="70vw"
        margin="2rem auto"
        alignItems="center"
      >
        <Button
          colorScheme="blue"
          isDisabled={page == 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </Button>
        <Text>
          List: {page} of {Math.ceil(Number(total) / 20)}
        </Text>
        <Button
          colorScheme="blue"
          isDisabled={page == Math.ceil(Number(total) / 20)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default Doctors;
