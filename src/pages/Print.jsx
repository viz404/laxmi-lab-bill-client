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
                      <Text fontSize="md">{bill?.doctor?.name}</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderWidth={0} paddingLeft={0}>
                      <Heading as="h5" size="sm">
                        Address
                      </Heading>
                    </Td>
                    <Td borderWidth={0}>
                      <Text fontSize="md">{bill?.doctor?.address}</Text>
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
          <Table marginTop={5} borderWidth={1} borderColor="grey">
            <Thead>
              <Tr>
                <Th borderRightWidth={1} borderColor="grey">
                  <Heading as="h6" size="xs">
                    Date
                  </Heading>
                </Th>
                <Th borderRightWidth={1} borderColor="grey">
                  <Heading as="h6" size="xs">
                    Job No
                  </Heading>
                </Th>
                <Th borderRightWidth={1} borderColor="grey">
                  <Heading as="h6" size="xs">
                    Patient Name
                  </Heading>
                </Th>
                <Th borderRightWidth={1} borderColor="grey">
                  <Heading as="h6" size="xs">
                    Description
                  </Heading>
                </Th>
                <Th borderColor="grey">
                  <Heading as="h6" size="xs">
                    Amount
                  </Heading>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {bill?.jobs?.map((el, index) => (
                <Tr key={index}>
                  <Td borderRightWidth={1} borderColor="grey">
                    <Text fontSize="sm">{trimDate(el.date)}</Text>
                  </Td>
                  <Td borderRightWidth={1} borderColor="grey">
                    <Text fontSize="sm">{el.jobNumber}</Text>
                  </Td>
                  <Td borderRightWidth={1} borderColor="grey">
                    <Text fontSize="sm">{el.patientName}</Text>
                  </Td>
                  <Td borderRightWidth={1} borderColor="grey">
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
                                  <Text fontSize="sm">
                                    {ele.topLeft?.replaceAll(",", " ")}
                                  </Text>
                                </Td>
                                <Td
                                  padding={0}
                                  borderBottomWidth={1}
                                  borderColor="blackAlpha.500"
                                  paddingLeft={1}
                                >
                                  <Text fontSize="sm">
                                    {ele.topRight?.replaceAll(",", " ")}
                                  </Text>
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
                                  <Text fontSize="sm">
                                    {ele.bottomLeft?.replaceAll(",", " ")}
                                  </Text>
                                </Td>
                                <Td
                                  padding={0}
                                  borderBottomWidth={0}
                                  paddingLeft={1}
                                >
                                  <Text fontSize="sm">
                                    {ele.bottomRight?.replaceAll(",", " ")}
                                  </Text>
                                </Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </Flex>
                      ))}
                    </Flex>
                  </Td>
                  <Td borderColor="grey">
                    <Text fontSize="sm">₹ {el.price}</Text>
                  </Td>
                </Tr>
              ))}
              <Tr>
                <Td
                  borderWidth={1}
                  borderRightWidth={0}
                  borderColor="blackAlpha.500"
                >
                  Total
                </Td>
                <Td
                  colSpan={5}
                  borderBottomWidth={1}
                  borderColor="blackAlpha.500"
                  textAlign="right"
                  fontWeight="bold"
                >
                  ₹ {bill.totalAmount}
                </Td>
              </Tr>
              <Tr>
                <Td
                  colSpan={2}
                  borderWidth={1}
                  borderRightWidth={0}
                  borderColor="blackAlpha.500"
                >
                  Total in Words
                </Td>
                <Td
                  colSpan={4}
                  borderBottomWidth={1}
                  borderColor="blackAlpha.500"
                  textAlign="right"
                  fontWeight="bold"
                >
                  {numberToWord(bill.totalAmount) + " Only"}
                </Td>
              </Tr>
              {bill?.previousBalance > 0 && (
                <Tr>
                  <Td
                    colSpan={2}
                    borderWidth={1}
                    borderRightWidth={0}
                    borderColor="blackAlpha.500"
                  >
                    Previous Balance
                  </Td>
                  <Td
                    colSpan={4}
                    borderBottomWidth={1}
                    borderColor="blackAlpha.500"
                    textAlign="right"
                    fontWeight="bold"
                  >
                    ₹ {bill.previousBalance}
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
        <Box
          width="fit-content"
          marginTop={7}
          sx={{
            pageBreakInside: "avoid",
          }}
        >
          <Table variant="unstyled">
            <Tbody>
              <Tr>
                <Td paddingX={0} paddingY={1}>
                  Lab's Bank Details
                </Td>
              </Tr>
              <Tr>
                <Td paddingX={0} paddingY={1} paddingRight={2}>
                  Bank Name:
                </Td>
                <Td paddingX={0} paddingY={1} paddingRight={2}>
                  <Text fontWeight="bold">Union Bank</Text>
                </Td>
              </Tr>
              <Tr>
                <Td paddingX={0} paddingY={1} paddingRight={2}>
                  A/c No:
                </Td>
                <Td paddingX={0} paddingY={1} paddingRight={2}>
                  <Text fontWeight="bold">560371000694883</Text>
                </Td>
              </Tr>
              <Tr>
                <Td paddingX={0} paddingY={1} paddingRight={2}>
                  Branch & IFSC Code:
                </Td>
                <Td paddingX={0} paddingY={1} paddingRight={2}>
                  <Text fontWeight="bold">Karvenagar & UBIN0905038</Text>
                </Td>
              </Tr>
              <Tr>
                <Td paddingX={0} paddingY={1} paddingRight={2}>
                  Google/Phone Pay:
                </Td>
                <Td paddingX={0} paddingY={1} paddingRight={2}>
                  <Text fontWeight="bold">9763269993</Text>
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
            sx={{
              pageBreakInside: "avoid",
            }}
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
            sx={{
              pageBreakInside: "avoid",
            }}
          >
            For Shree Laxmi Dental Lab
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Print;
