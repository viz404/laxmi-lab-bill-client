import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loadBillHelper } from "../reduxStore/bill/billActions";
import trimDate from "../calculationHelpers/trimDate";

const Bill = () => {
  const { bills, total } = useSelector((store) => store.bill);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const timerRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      dispatch(loadBillHelper(toast, page, search));
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
      <Flex justifyContent="space-between" width="80vw" margin="1rem auto">
        <Flex alignItems="center" gap={3}>
          <Text>From:</Text>
          <Input type="date" />
        </Flex>
        <Flex alignItems="center" gap={3}>
          <Text>Till:</Text>
          <Input type="date" />
        </Flex>
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
        <Table variant="striped">
          <Thead position="sticky" top={0} bg="white">
            <Tr>
              <Th>
                <Heading as="h5" size="sm">
                  Created At
                </Heading>
              </Th>
              <Th>
                <Heading as="h5" size="sm">
                  Doctor
                </Heading>
              </Th>
              <Th>
                <Heading as="h5" size="sm">
                  Total
                </Heading>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {bills.map((el) => (
              <Tr
                key={el._id}
                cursor="pointer"
                onClick={() => {
                  navigate(`/print/${el._id}`);
                }}
              >
                <Td borderRightWidth={1}>{trimDate(el.createdAt)}</Td>
                <Td borderRightWidth={1}>{el.doctorName}</Td>
                <Td>₹ {el.totalAmount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
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

export default Bill;
