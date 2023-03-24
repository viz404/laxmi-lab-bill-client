import { Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoctorsList from "../components/DoctorsList";
import { loadDoctorsHelper } from "../reduxStore/doctor/doctorActions";

const Doctor = () => {
  const { doctors, total } = useSelector((store) => store.doctor);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const timerRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      dispatch(loadDoctorsHelper(toast, page, search));
    }, 500);
  }, [search, page]);

  return (
    <Box padding={3}>
      <Box margin="5rem auto" width="50vw">
        <Input
          placeholder="Enter Doctor name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
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
  );
};

export default Doctor;
