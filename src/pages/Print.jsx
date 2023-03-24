import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import fetchBillById from "../apiHelpers/fetchBillById";
import numberToWord from "../calculationHelpers/numberToWord";
import trimDate from "../calculationHelpers/trimDate";

const Print = () => {
  const [bill, setBill] = useState({});

  const { id } = useParams();
  const toast = useToast();

  useEffect(() => {
    fetchBillById(id)
      .then(({ data }) => {
        setBill(data.response);
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
  }, []);

  let from = "";
  if (bill.fromDate) {
    from = bill.fromDate;
    from = from.split("T").shift().split("-");
    from = from[2] + "/" + from[1];
  }

  let till = "";
  if (bill.tillDate) {
    till = bill.tillDate;
    till = till.split("T").shift().split("-").reverse();
    till = till.join("/");
  }

  return (
    <Box padding={3}>
      <Flex gap={5}>
        <Button colorScheme="yellow" onClick={window.print}>
          Print
        </Button>
        <Link to="/printRemark" target="_blank">
          <Button colorScheme="blue">Print Remark</Button>
        </Link>
      </Flex>
      <Box id="section-to-print">
        <Flex>
          <Image
            boxSize="200px"
            objectFit="contain"
            src={process.env.PUBLIC_URL + "/laxmi.png"}
            alt="laxmi-image"
          />
          <Flex direction="column" gap={5} flexGrow={1}>
            <Flex direction="column" gap={3}>
              <Heading as="h4" size="md">
                SHREE LAXMI DENTAL LAB
              </Heading>
              <Box>
                <Text fontSize="md">Shanti Nivas, 14/3, Matoshri colony,</Text>
                <Text fontSize="md">Near Warje Jakat Nakha,</Text>
                <Text fontSize="md">Pune 411052 M: 9890401965, 9763269993</Text>
              </Box>
            </Flex>
            <Flex gap={2} justifyContent="space-between">
              <Table size="sm" width="fit-content">
                <Tbody>
                  <Tr>
                    <Td borderWidth={0} paddingLeft={0}>
                      <Heading as="h5" size="sm">
                        Doctor Name
                      </Heading>
                    </Td>
                    <Td borderWidth={0}>
                      <Text fontSize="md">{bill.doctorName}</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderWidth={0} paddingLeft={0}>
                      <Heading as="h5" size="sm">
                        Address
                      </Heading>
                    </Td>
                    <Td borderWidth={0}>
                      <Text fontSize="md">{bill.doctorAddress}</Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <Table size="sm" width="fit-content">
                <Tbody>
                  <Tr>
                    <Td borderWidth={0}>
                      <Heading as="h5" size="sm">
                        No
                      </Heading>
                    </Td>
                    <Td borderWidth={0}>
                      <Text fontSize="md">{bill._id}</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderWidth={0}>
                      <Heading as="h5" size="sm">
                        Date
                      </Heading>
                    </Td>
                    <Td borderWidth={0}>
                      <Text fontSize="md">{from + " - " + till}</Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Flex>
          </Flex>
        </Flex>
        <Box>
          <Table marginTop={5} borderWidth={1}>
            <Thead>
              <Tr>
                <Th borderRightWidth={1}>
                  <Heading as="h6" size="xs">
                    Date
                  </Heading>
                </Th>
                <Th borderRightWidth={1}>
                  <Heading as="h6" size="xs">
                    Job No
                  </Heading>
                </Th>
                <Th borderRightWidth={1}>
                  <Heading as="h6" size="xs">
                    Patient Name
                  </Heading>
                </Th>
                <Th borderRightWidth={1}>
                  <Heading as="h6" size="xs">
                    Type of work
                  </Heading>
                </Th>
                <Th borderRightWidth={1}>
                  <Heading as="h6" size="xs">
                    Description
                  </Heading>
                </Th>
                <Th>
                  <Heading as="h6" size="xs">
                    Amount
                  </Heading>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {bill?.jobs?.map((el, index) => (
                <Tr key={index}>
                  <Td borderRightWidth={1}>
                    <Text fontSize="sm">{trimDate(el.date)}</Text>
                  </Td>
                  <Td borderRightWidth={1}>
                    <Text fontSize="sm">{el.jobNo}</Text>
                  </Td>
                  <Td borderRightWidth={1}>
                    <Text fontSize="sm">{el.patientName}</Text>
                  </Td>
                  <Td borderRightWidth={1}>
                    <Text fontSize="sm">
                      {el.works.map((e) => e.title).join(", ")}
                    </Text>
                  </Td>
                  <Td borderRightWidth={1}>
                    <Flex direction="column" gap={3}>
                      {el.works.map((ele) => (
                        <Flex justifyContent="space-between" key={ele.title}>
                          <Text fontSize="sm">{ele.title}</Text>
                          <Table width="fit-content">
                            <Tbody>
                              <Tr>
                                <Td
                                  padding={0}
                                  borderRightWidth={1}
                                  borderColor="blackAlpha.500"
                                  paddingRight={1}
                                >
                                  <Text fontSize="sm"> {ele.topLeft}</Text>
                                </Td>
                                <Td
                                  padding={0}
                                  borderBottomWidth={1}
                                  borderColor="blackAlpha.500"
                                  paddingLeft={1}
                                >
                                  <Text fontSize="sm"> {ele.topRight}</Text>
                                </Td>
                              </Tr>
                              <Tr>
                                <Td
                                  padding={0}
                                  borderRightWidth={1}
                                  borderColor="blackAlpha.500"
                                  borderBottomWidth={0}
                                  paddingRight={1}
                                >
                                  <Text fontSize="sm">{ele.bottomLeft}</Text>
                                </Td>
                                <Td
                                  padding={0}
                                  borderBottomWidth={0}
                                  paddingLeft={1}
                                >
                                  <Text fontSize="sm">{ele.bottomRight}</Text>
                                </Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </Flex>
                      ))}
                    </Flex>
                  </Td>
                  <Td>
                    <Text fontSize="sm">₹ {el.price}</Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Box marginTop={5}>
          <Table width="fit-content">
            <Tbody>
              <Tr>
                <Th padding={0} borderRightWidth={1} borderWidth={0}>
                  <Heading as="h6" size="xs">
                    Total
                  </Heading>
                </Th>
                <Td borderWidth={0} padding={0} paddingLeft={3}>
                  <Text fontSize="sm" fontWeight="bold">
                    ₹ {bill.totalAmount}
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Th
                  padding={0}
                  borderRightWidth={1}
                  borderWidth={0}
                  paddingTop={3}
                >
                  <Heading as="h6" size="xs">
                    Total{"(in words)"}
                  </Heading>
                </Th>
                <Td borderWidth={0} padding={0} paddingLeft={3} paddingTop={3}>
                  <Text fontSize="sm" fontWeight="bold">
                    {numberToWord(bill.totalAmount)}
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Flex justifyContent="space-between" marginTop={5}>
          <Flex
            borderWidth={1}
            width="250px"
            height="150px"
            borderRadius={10}
            borderColor="blackAlpha.500"
            alignItems="end"
            justifyContent="center"
            padding={1}
          >
            Reciever's Signature
          </Flex>
          <Flex
            borderWidth={1}
            width="250px"
            height="150px"
            borderRadius={10}
            borderColor="blackAlpha.500"
            alignItems="end"
            justifyContent="center"
            padding={1}
          >
            For Shree Laxmi Dental Lab
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Print;
