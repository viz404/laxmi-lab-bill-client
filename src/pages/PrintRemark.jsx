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
import React from "react";

const PrintRemark = () => {
  return (
    <Flex direction="column" padding={3} height="90vh">
      <Flex gap={5}>
        <Button colorScheme="blue" onClick={window.print}>
          Print Remark
        </Button>
      </Flex>
      <Flex id="section-to-print" direction="column" flexGrow={1}>
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
                      <Text fontSize="md" textColor="white">
                        ___________________
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderWidth={0} paddingLeft={0}>
                      <Heading as="h5" size="sm">
                        Address
                      </Heading>
                    </Td>
                    <Td borderWidth={0}>
                      <Text fontSize="md" textColor="white">
                        ___________________
                      </Text>
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
                      <Text fontSize="md" textColor="white">
                        ___________________
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderWidth={0}>
                      <Heading as="h5" size="sm">
                        Date
                      </Heading>
                    </Td>
                    <Td borderWidth={0}>
                      <Text fontSize="md" textColor="white">
                        ___________________
                      </Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" marginTop={600}>
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
      </Flex>
    </Flex>
  );
};

export default PrintRemark;
