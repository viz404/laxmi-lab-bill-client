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
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import { loadPaymentsHelper } from "../reduxStore/payment/paymentActions";
import trimDate from "../calculationHelpers/trimDate";

const Payments = () => {
  const { payments, total } = useSelector((store) => store.payment);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const timerRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      dispatch(loadPaymentsHelper(toast, page, search, 20));
    }, 500);
  }, [search, page]);

  const showDescription = (mobile, cheque, notes) => {
    return (
      <Flex direction="column">
        <Text>{mobile ? "Mobile: " + mobile : "Cheque number: " + cheque}</Text>
        {notes && <Text>{notes}</Text>}
      </Flex>
    );
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
              <Th borderRightWidth={1}>
                <Heading as="h5" size="sm">
                  Date
                </Heading>
              </Th>
              <Th borderRightWidth={1}>
                <Heading as="h5" size="sm">
                  Name
                </Heading>
              </Th>
              <Th borderRightWidth={1}>
                <Heading as="h5" size="sm">
                  Mode
                </Heading>
              </Th>
              <Th borderRightWidth={1}>
                <Heading as="h5" size="sm">
                  Description
                </Heading>
              </Th>
              <Th>
                <Heading as="h5" size="sm">
                  Amount
                </Heading>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {payments.map((el, index) => (
              <Tr key={el._id}>
                <Td borderRightWidth={1}>{trimDate(el?.date)}</Td>
                <Td borderRightWidth={1}>{el?.doctor?.name}</Td>
                <Td borderRightWidth={1}>{el?.mode}</Td>
                <Td borderRightWidth={1}>
                  {showDescription(el?.mobile, el?.cheque, el?.notes)}
                </Td>
                <Td>₹ {el.amount}</Td>
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

export default Payments;
