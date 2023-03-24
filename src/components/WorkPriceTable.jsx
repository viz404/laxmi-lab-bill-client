import {
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

const WorkPriceTable = ({ typeOfWorks, updateWorkPrice }) => {
  return (
    <TableContainer borderRadius={15} borderWidth={1} flex={1}>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th borderRightWidth={1}>
              <Heading as="h2" size="md">
                Type of Work
              </Heading>
            </Th>
            <Th isNumeric>
              <Heading as="h2" size="md">
                Price
              </Heading>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {typeOfWorks.map((el, index) => (
            <Tr key={index}>
              <Td borderRightWidth={1}>{el.title}</Td>
              <Td>
                {updateWorkPrice ? (
                  <Input
                    borderColor="blackAlpha.500"
                    name={el.title}
                    type="number"
                    value={el.price || ""}
                    id={index}
                    onChange={updateWorkPrice}
                  />
                ) : (
                  <Text>₹ {el.price}</Text>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default WorkPriceTable;
