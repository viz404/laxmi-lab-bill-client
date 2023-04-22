import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useToast,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { loadAccountsHelper } from "../reduxStore/account/accountActions";

const Accounts = () => {
  const { accounts, total } = useSelector((store) => store.account);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const timerRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      dispatch(loadAccountsHelper(toast, page, search, 20));
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
            {accounts.map((el, index) => (
              <Tr key={el._id}>
                <Td borderRightWidth={1}>{el.doctorName}</Td>
                <Td borderRightWidth={1}>{el?.doctor?.area}</Td>
                <Td>₹ {el.balance}</Td>
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
    </Box>
  );
};

export default Accounts;
