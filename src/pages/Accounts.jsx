import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useToast,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { loadDoctorsHelper } from "../reduxStore/doctor/doctorActions";
import AccountModal from "../components/AccountModal";

const Accounts = () => {
  const { doctors, total } = useSelector((store) => store.doctor);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const timerRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      dispatch(loadDoctorsHelper(toast, page, search, 20, "balance"));
    }, 500);
  }, [search, page]);

  const openModal = (index) => {
    setSelectedIndex(index);
    onOpen();
  };

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
        <Table variant="striped">
          <Thead position="sticky" top={0} bg="white">
            <Tr>
              <Th>
                <Heading as="h5" size="sm">
                  Name
                </Heading>
              </Th>
              <Th>
                <Heading as="h5" size="sm">
                  Area
                </Heading>
              </Th>
              <Th>
                <Heading as="h5" size="sm">
                  Balance
                </Heading>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {doctors.map((el, index) => (
              <Tr
                key={el._id}
                cursor="pointer"
                onClick={() => openModal(index)}
              >
                <Td borderRightWidth={1}>{el?.name}</Td>
                <Td borderRightWidth={1}>{el?.area}</Td>
                <Td>₹ {el?.balance}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
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
          isDisabled={Math.ceil(Number(total) / 20)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Flex>
      <AccountModal
        isOpen={isOpen}
        onClose={onClose}
        doctorName={doctors[selectedIndex]?.name}
        doctorId={doctors[selectedIndex]?._id}
        balance={doctors[selectedIndex]?.balance}
      />
    </Box>
  );
};

export default Accounts;
