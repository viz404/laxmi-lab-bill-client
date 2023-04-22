import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchTransactionsByDoctorId from "../apiHelpers/fetchTransactionsByDoctorId";
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
import fetchDoctorById from "../apiHelpers/fetchDoctorById";
import fetchAccountByDoctorId from "../apiHelpers/fetchAccountByDoctorId";

const Statement = () => {
  const [transactions, setTransactions] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [tillDate, setTillDate] = useState("");
  const [doctor, setDoctor] = useState({});
  const [account, setAccount] = useState({});

  const { doctorId } = useParams();
  const toast = useToast();

  useEffect(() => {
    if (doctorId) {
      fetchDoctorById(doctorId)
        .then(({ data: { response } }) => {
          setDoctor(response);
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: "Something went wrong",
            description: error.message,
            position: "top",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });

      fetchAccountByDoctorId(doctorId)
        .then(({ data: { response } }) => {
          setAccount(response);
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: "Something went wrong",
            description: error.message,
            position: "top",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, []);

  const handleGenerate = async (event) => {
    try {
      event.preventDefault();

      const {
        data: { response },
      } = await fetchTransactionsByDoctorId(doctorId, fromDate, tillDate);

      setTransactions([...response]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Box padding={10}>
      <Flex gap={10} marginBottom={10}>
        <form onSubmit={handleGenerate}>
          <Flex gap={10}>
            <Flex alignItems="center" gap={5}>
              <Text>
                <nobr> From Date: </nobr>
              </Text>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required={true}
              />
            </Flex>
            <Flex alignItems="center" gap={5}>
              <Text>
                <nobr> Till Date: </nobr>
              </Text>
              <Input
                type="date"
                value={tillDate}
                onChange={(e) => setTillDate(e.target.value)}
                required={true}
              />
            </Flex>
            <Flex alignItems="center" gap={5}>
              <Text>
                <nobr> Doctor: </nobr>
              </Text>
              <Text>
                <nobr> {doctor?.name} </nobr>
              </Text>
            </Flex>
            <Button type="submit" colorScheme="yellow">
              Generate
            </Button>
          </Flex>
        </form>
        <Button
          colorScheme="blue"
          isDisabled={transactions.length == 0}
          onClick={window.print}
        >
          Print
        </Button>
      </Flex>
      <Box id="section-to-print">
        <Table width="fit-content" variant="unstyled">
          <Tbody>
            <Tr>
              <Th fontSize={15} padding={0}>
                Doctor Name
              </Th>
              <Td padding={2}>: {doctor?.name}</Td>
            </Tr>
            <Tr>
              <Th fontSize={15} padding={0}>
                Contact
              </Th>
              <Td padding={2}>: {doctor?.phone}</Td>
            </Tr>
            <Tr>
              <Th fontSize={15} padding={0}>
                Address
              </Th>
              <Td padding={2}>: {doctor?.address}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Table marginTop={10}>
          <Thead>
            <Tr>
              <Th
                borderColor="silver"
                borderWidth={1}
                fontSize={15}
                color="black"
              >
                Particular
              </Th>
              <Th
                borderColor="silver"
                borderWidth={1}
                fontSize={15}
                color="black"
              >
                Bill Amount
              </Th>
              <Th
                borderColor="silver"
                borderWidth={1}
                fontSize={15}
                color="black"
              >
                Payment
              </Th>
              <Th
                borderColor="silver"
                borderWidth={1}
                fontSize={15}
                color="black"
              >
                Balance
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((el) => (
              <Tr key={el._id}>
                <Td borderColor="silver" borderWidth={1}>
                  {el?.particular}
                </Td>
                <Td borderColor="silver" borderWidth={1}>
                  {el?.bill?.totalAmount && "₹ " + el?.bill?.totalAmount}
                </Td>
                <Td borderColor="silver" borderWidth={1}>
                  {el?.payment?.amount && "₹ " + el?.payment?.amount}
                </Td>
                <Td borderColor="silver" borderWidth={1}>
                  ₹ {el?.balance}
                </Td>
              </Tr>
            ))}
            {transactions.length > 0 && (
              <Tr>
                <Th
                  fontSize={15}
                  colSpan={3}
                  borderColor="silver"
                  borderWidth={1}
                  color="black"
                >
                  Closing balance
                </Th>
                <Td fontWeight="bold" borderColor="silver" borderWidth={1}>
                  ₹ {account?.balance}
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Statement;
